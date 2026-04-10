import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { NextRequest } from 'next/server';

// Mock Resend before importing
vi.mock('resend', () => {
  return {
    Resend: vi.fn(),
  };
});

describe('Email Service Integration Tests', () => {
  // Test email addresses - should be set in environment variables
  const TEST_EMAIL_TO = process.env.TEST_EMAIL_TO || 'test-recipient@example.com';
  const TEST_EMAIL_CUSTOMER = process.env.TEST_EMAIL_CUSTOMER || 'test-customer@example.com';
  const TEST_API_KEY = process.env.RESEND_API_KEY || 'test-api-key';

  let originalEnv: NodeJS.ProcessEnv;
  let mockResendInstance: any;
  let mockSend: any;
  let POST: typeof import('./route').POST;
  let Resend: typeof import('resend').Resend;

  beforeEach(async () => {
    // Save original environment
    originalEnv = { ...process.env };

    // Set test environment variables BEFORE importing modules
    // This ensures EMAIL_CONFIG reads the correct values
    process.env.RESEND_API_KEY = TEST_API_KEY;
    process.env.CONTACT_DEFAULT_TO = TEST_EMAIL_TO;
    process.env.FROM_EMAIL = 'test-from@example.com';
    process.env.FROM_NAME = "Kim's Katering";

    // Reset module cache to force re-evaluation of EMAIL_CONFIG
    vi.resetModules();

    // Setup mock Resend instance
    mockSend = vi.fn();
    mockResendInstance = {
      emails: {
        send: mockSend,
      },
    };

    // Import modules AFTER setting environment variables
    const resendModule = await import('resend');
    Resend = resendModule.Resend;
    
    // Mock Resend constructor
    vi.mocked(Resend).mockImplementation(() => mockResendInstance as any);

    // Import route AFTER environment is set and Resend is mocked
    const routeModule = await import('./route');
    POST = routeModule.POST;
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
    vi.clearAllMocks();
    vi.resetModules();
  });

  describe('Success Cases', () => {
    it('should send emails successfully for a custom quote with menu selections', async () => {
      // Mock successful email responses
      mockSend
        .mockResolvedValueOnce({
          data: { id: 'email-id-123' },
          error: null,
        })
        .mockResolvedValueOnce({
          data: { id: 'confirmation-id-456' },
          error: null,
        });

      // Create test request with custom quote data (matching customQuote/page.tsx format)
      const requestBody = {
        name: 'John Smith',
        email: TEST_EMAIL_CUSTOMER,
        phone: '403-555-1234',
        eventType: 'Wedding',
        eventDate: '2024-06-15',
        guestCount: '150',
        eventBudget: '5000.00',
        dietaryRestrictions: 'Vegetarian options needed for 20 guests',
        message: 'We are planning a beautiful outdoor wedding.',
        hasMenuSelections: true,
        selectedItems: [
          {
            itemName: 'Chicken Parmesan',
            categoryName: 'Main Courses',
            itemPrice: '$12.50 per person',
          },
          {
            itemName: 'Caesar Salad',
            categoryName: 'Salads',
            itemPrice: '$8.00 per person',
          },
          {
            itemName: 'Chocolate Cake',
            categoryName: 'Desserts',
            itemPrice: '$6.00 per person',
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

      // Verify response
      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.message).toBe('Email sent successfully');
      expect(responseData.emailId).toBe('email-id-123');
      expect(responseData.confirmationId).toBe('confirmation-id-456');

      // Verify Resend was called twice (inquiry email + confirmation email)
      expect(mockSend).toHaveBeenCalledTimes(2);

      // Verify first email (to Kim/test recipient) was called with correct parameters
      const firstCall = mockSend.mock.calls[0][0];
      expect(firstCall.to).toBe(TEST_EMAIL_TO);
      expect(firstCall.subject).toContain('Menu Quote Request');
      expect(firstCall.subject).toContain('John Smith');
      expect(firstCall.html).toContain('John Smith');
      expect(firstCall.html).toContain('Chicken Parmesan');
      expect(firstCall.html).toContain('Caesar Salad');

      // Verify second email (confirmation to customer) was called with correct parameters
      const secondCall = mockSend.mock.calls[1][0];
      expect(secondCall.to).toBe(TEST_EMAIL_CUSTOMER);
      expect(secondCall.subject).toContain('Thank you for contacting');
      expect(secondCall.html).toContain('John Smith');
    });

    it('should send emails successfully for an inquiry without menu selections', async () => {
      // Mock successful email responses
      mockSend
        .mockResolvedValueOnce({
          data: { id: 'email-id-789' },
          error: null,
        })
        .mockResolvedValueOnce({
          data: { id: 'confirmation-id-012' },
          error: null,
        });

      const requestBody = {
        name: 'Jane Doe',
        email: TEST_EMAIL_CUSTOMER,
        phone: '403-555-5678',
        eventType: 'Corporate Event',
        eventDate: '2024-07-20',
        guestCount: '50',
        message: 'We need catering for our corporate event. Please contact us.',
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

      // Verify response
      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.emailId).toBe('email-id-789');

      // Verify email subject for inquiry (not menu quote)
      const firstCall = mockSend.mock.calls[0][0];
      expect(firstCall.subject).toContain('New Katering Inquiry');
      expect(firstCall.subject).not.toContain('Menu Quote Request');
    });
  });

  describe('Validation Failures', () => {
    it('should return 400 error when required fields are missing', async () => {
      const requestBody = {
        name: 'John Smith',
        // Missing email and phone
        eventType: 'Wedding',
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

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Name, email, and phone number are required.');
      expect(mockSend).not.toHaveBeenCalled();
    });

    it('should return 400 error when name is missing', async () => {
      const requestBody = {
        email: TEST_EMAIL_CUSTOMER,
        phone: '403-555-1234',
        message: 'Test message',
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

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Name, email, and phone number are required.');
    });

    it('should return 400 error when email is missing', async () => {
      const requestBody = {
        name: 'John Smith',
        phone: '403-555-1234',
        message: 'Test message',
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

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Name, email, and phone number are required.');
    });

    it('should return 400 error when phone is missing', async () => {
      const requestBody = {
        name: 'John Smith',
        email: TEST_EMAIL_CUSTOMER,
        message: 'Test message',
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

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Name, email, and phone number are required.');
    });

    it('should return 400 error when no message and no selected items', async () => {
      const requestBody = {
        name: 'John Smith',
        email: TEST_EMAIL_CUSTOMER,
        phone: '403-555-1234',
        hasMenuSelections: false,
        // No message and no selectedItems
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

      expect(response.status).toBe(400);
      expect(responseData.error).toBe(
        'Please provide additional details about your event or select at least one menu item.'
      );
      expect(mockSend).not.toHaveBeenCalled();
    });

    it('should return 400 error when hasMenuSelections is true but selectedItems is empty', async () => {
      const requestBody = {
        name: 'John Smith',
        email: TEST_EMAIL_CUSTOMER,
        phone: '403-555-1234',
        hasMenuSelections: true,
        selectedItems: [],
        // No message
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

      expect(response.status).toBe(400);
      expect(responseData.error).toBe(
        'Please provide additional details about your event or select at least one menu item.'
      );
    });
  });

  describe('API Configuration Errors', () => {
    it('should return 500 error when RESEND_API_KEY is missing', async () => {
      // Remove API key
      delete process.env.RESEND_API_KEY;

      const requestBody = {
        name: 'John Smith',
        email: TEST_EMAIL_CUSTOMER,
        phone: '403-555-1234',
        message: 'Test message',
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

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Email service is not configured. Please contact the administrator.');
      expect(responseData.details).toBe('RESEND_API_KEY environment variable is missing');
      expect(mockSend).not.toHaveBeenCalled();
    });
  });

  describe('Resend API Errors', () => {
    it('should return 500 error when Resend API returns an error for inquiry email', async () => {
      // Mock Resend error response
      mockSend.mockResolvedValueOnce({
        data: null,
        error: {
          name: 'ResendError',
          message: 'Invalid API key',
          statusCode: 401,
        },
      });

      const requestBody = {
        name: 'John Smith',
        email: TEST_EMAIL_CUSTOMER,
        phone: '403-555-1234',
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

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to send email');
      expect(responseData.details).toContain('Invalid API key');
      expect(responseData.errorType).toBe('ResendError');
    });

    it('should still succeed if confirmation email fails (non-fatal)', async () => {
      // Mock: inquiry email succeeds, confirmation email fails
      mockSend
        .mockResolvedValueOnce({
          data: { id: 'email-id-success' },
          error: null,
        })
        .mockResolvedValueOnce({
          data: null,
          error: {
            name: 'ResendError',
            message: 'Invalid recipient email',
            statusCode: 422,
          },
        });

      const requestBody = {
        name: 'John Smith',
        email: 'invalid-email-format',
        phone: '403-555-1234',
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

      // Should still return success even if confirmation email fails
      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.emailId).toBe('email-id-success');
      expect(responseData.confirmationId).toBeUndefined();
    });
  });

  describe('Email Template Generation', () => {
    it('should generate inquiry email with all fields correctly', async () => {
      mockSend
        .mockResolvedValueOnce({
          data: { id: 'email-id' },
          error: null,
        })
        .mockResolvedValueOnce({
          data: { id: 'confirmation-id' },
          error: null,
        });

      const requestBody = {
        name: 'Test User',
        email: TEST_EMAIL_CUSTOMER,
        phone: '403-555-9999',
        eventType: 'Birthday Party',
        eventDate: '2024-08-10',
        guestCount: '25',
        eventBudget: '1500.00',
        dietaryRestrictions: 'Gluten-free options needed',
        message: 'We need catering for a birthday celebration.',
        hasMenuSelections: false,
      };

      const request = new NextRequest('http://localhost:3000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      await POST(request);

      const emailHtml = mockSend.mock.calls[0][0].html;

      // Verify all fields are present in the email HTML
      expect(emailHtml).toContain('Test User');
      expect(emailHtml).toContain(TEST_EMAIL_CUSTOMER);
      expect(emailHtml).toContain('403-555-9999');
      expect(emailHtml).toContain('Birthday Party');
      expect(emailHtml).toContain('2024-08-10');
      expect(emailHtml).toContain('25');
      expect(emailHtml).toContain('1500.00');
      expect(emailHtml).toContain('Gluten-free options needed');
      expect(emailHtml).toContain('We need catering for a birthday celebration.');
    });
  });
});

