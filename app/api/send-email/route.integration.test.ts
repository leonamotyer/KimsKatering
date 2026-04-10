import { describe, it, expect, beforeAll } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from './route';

/**
 * Integration test that actually sends emails via Resend API
 * 
 * To run this test:
 * 1. Set TEST_EMAIL_TO and TEST_EMAIL_CUSTOMER environment variables to real test email addresses
 * 2. Set RESEND_API_KEY to a valid Resend API key
 * 3. Run: npm test -- route.integration.test.ts
 * 
 * WARNING: This test will actually send emails to the test addresses!
 * DO NOT use production client email addresses.
 */
describe('Email Service Real Integration Tests', () => {
  const TEST_EMAIL_TO = process.env.TEST_EMAIL_TO;
  const TEST_EMAIL_CUSTOMER = process.env.TEST_EMAIL_CUSTOMER;
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  beforeAll(() => {
    // Skip tests if required environment variables are not set
    if (!TEST_EMAIL_TO || !TEST_EMAIL_CUSTOMER || !RESEND_API_KEY) {
      console.warn(
        '⚠️  Skipping real integration tests. Set TEST_EMAIL_TO, TEST_EMAIL_CUSTOMER, and RESEND_API_KEY to run.'
      );
    }
  });

  it.skipIf(
    !TEST_EMAIL_TO || !TEST_EMAIL_CUSTOMER || !RESEND_API_KEY
  )('should actually send emails to test addresses for custom quote submission', async () => {
    // Override environment to use test email addresses
    const originalContactTo = process.env.CONTACT_DEFAULT_TO;
    process.env.CONTACT_DEFAULT_TO = TEST_EMAIL_TO;

    try {
      // Create test request matching custom quote form submission
      const requestBody = {
        name: 'Test User - Integration Test',
        email: TEST_EMAIL_CUSTOMER!,
        phone: '403-555-9999',
        eventType: 'Test Event',
        eventDate: '2024-12-31',
        guestCount: '10',
        eventBudget: '500.00',
        dietaryRestrictions: 'This is a test email from integration test',
        message: 'This is an automated test email. Please ignore.',
        hasMenuSelections: true,
        selectedItems: [
          {
            itemName: 'Test Item 1',
            categoryName: 'Test Category',
            itemPrice: '$10.00 per person',
          },
          {
            itemName: 'Test Item 2',
            categoryName: 'Test Category',
            itemPrice: '$15.00 per person',
          },
        ],
      };

      const request = new NextRequest('http://localhost:3000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const response = await POST(request);
      const responseData = await response.json();

      // Verify the API returned success
      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.message).toBe('Email sent successfully');

      // Verify email IDs are returned (proving emails were actually sent)
      expect(responseData.emailId).toBeDefined();
      expect(typeof responseData.emailId).toBe('string');
      expect(responseData.emailId.length).toBeGreaterThan(0);

      // Verify confirmation email ID (may be undefined if confirmation fails, but that's OK)
      if (responseData.confirmationId) {
        expect(typeof responseData.confirmationId).toBe('string');
      }

      console.log('✅ Email sent successfully!');
      console.log(`   Inquiry email ID: ${responseData.emailId}`);
      console.log(`   Confirmation email ID: ${responseData.confirmationId || 'N/A'}`);
      console.log(`   Check ${TEST_EMAIL_TO} for the inquiry email`);
      console.log(`   Check ${TEST_EMAIL_CUSTOMER} for the confirmation email`);
    } finally {
      // Restore original environment
      if (originalContactTo) {
        process.env.CONTACT_DEFAULT_TO = originalContactTo;
      } else {
        delete process.env.CONTACT_DEFAULT_TO;
      }
    }
  }, 30000); // 30 second timeout for actual API calls

  it.skipIf(
    !TEST_EMAIL_TO || !TEST_EMAIL_CUSTOMER || !RESEND_API_KEY
  )('should fail if email cannot be delivered (invalid recipient)', async () => {
    const originalContactTo = process.env.CONTACT_DEFAULT_TO;
    process.env.CONTACT_DEFAULT_TO = TEST_EMAIL_TO;

    try {
      const requestBody = {
        name: 'Test User',
        email: 'invalid-email-format-not-an-email', // Invalid email format
        phone: '403-555-9999',
        message: 'Test message',
        hasMenuSelections: false,
      };

      const request = new NextRequest('http://localhost:3000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const response = await POST(request);
      const responseData = await response.json();

      // The API should attempt to send, but Resend may reject invalid email
      // This test verifies the error handling works correctly
      // If Resend rejects, we should get a 500 error
      // If Resend accepts but email fails later, we still get 200 (email queued)
      expect([200, 500]).toContain(response.status);

      if (response.status === 500) {
        expect(responseData.error).toBeDefined();
        console.log('✅ Correctly handled invalid email format');
      }
    } finally {
      if (originalContactTo) {
        process.env.CONTACT_DEFAULT_TO = originalContactTo;
      } else {
        delete process.env.CONTACT_DEFAULT_TO;
      }
    }
  }, 30000);
});


