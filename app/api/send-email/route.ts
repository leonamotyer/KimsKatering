import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { EMAIL_CONFIG, EMAIL_TEMPLATES, getFallbackLogoSrc, getLogoAttachment } from './email';

const LIMITS = {
  name: 100,
  email: 254,
  phone: 15,
  eventType: 50,
  message: 5000,
  dietaryRestrictions: 2000,
  maxGuests: 10000,
  maxBudget: 1_000_000,
  maxSelectedItems: 100,
};

// Returns an error message, or null if the input is acceptable.
function validateInput(body: Record<string, unknown>): string | null {
  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

  const name = str(body.name);
  const email = str(body.email);
  const phone = str(body.phone);

  if (name.length === 0 || name.length > LIMITS.name) {
    return 'Please provide a valid name.';
  }

  // Simple sanity check, not full RFC 5322 — real validation happens when Resend delivers.
  if (email.length > LIMITS.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return 'Please provide a valid email address.';
  }

  if (phone.length > 0) {
    const phoneDigits = phone.replace(/\D/g, '');
    if (phone.length > LIMITS.phone || phoneDigits.length < 7 || phoneDigits.length > 15) {
      return 'Please provide a valid phone number.';
    }
  }

  if (str(body.eventType).length > LIMITS.eventType) {
    return 'Event type is invalid.';
  }

  if (str(body.message).length > LIMITS.message) {
    return `Message is too long (maximum ${LIMITS.message} characters).`;
  }

  if (str(body.dietaryRestrictions).length > LIMITS.dietaryRestrictions) {
    return `Dietary restrictions text is too long (maximum ${LIMITS.dietaryRestrictions} characters).`;
  }

  const guestCountRaw = str(body.guestCount);
  if (guestCountRaw) {
    const guests = Number(guestCountRaw);
    if (!Number.isInteger(guests) || guests < 1 || guests > LIMITS.maxGuests) {
      return `Guest count must be a whole number between 1 and ${LIMITS.maxGuests}.`;
    }
  }

  const budgetRaw = str(body.eventBudget);
  if (budgetRaw) {
    const budget = Number(budgetRaw.replace(/[$,\s]/g, ''));
    if (!Number.isFinite(budget) || budget < 0 || budget > LIMITS.maxBudget) {
      return `Event budget must be a number between 0 and ${LIMITS.maxBudget.toLocaleString()}.`;
    }
  }

  const eventDateRaw = str(body.eventDate);
  if (eventDateRaw) {
    const eventDate = new Date(eventDateRaw);
    const now = new Date();
    const twoYearsOut = new Date(now.getFullYear() + 2, now.getMonth(), now.getDate());
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    if (isNaN(eventDate.getTime()) || eventDate < yesterday || eventDate > twoYearsOut) {
      return 'Event date must be a valid date within the next two years.';
    }
  }

  if (Array.isArray(body.selectedItems) && body.selectedItems.length > LIMITS.maxSelectedItems) {
    return 'Too many menu items selected.';
  }

  return null;
}

export async function POST(request: NextRequest) {
  console.log('📧 Email API route called');
  
  try {
    const body = await request.json();
    console.log('📝 Request body received:', JSON.stringify(body, null, 2));
    
    const { name, email, phone, eventType, eventDate, guestCount, eventBudget, dietaryRestrictions, message, hasMenuSelections, selectedItems: requestSelectedItems } = body;

    // Honeypot: hidden "website" field is invisible to humans; bots auto-fill it.
    // Return fake success so bots can't tell they were caught.
    if (typeof body.website === 'string' && body.website.trim().length > 0) {
      console.log('🍯 Honeypot triggered — dropping submission silently');
      return NextResponse.json(
        { success: true, message: 'Email sent successfully' },
        { status: 200 }
      );
    }

    const validationError = validateInput(body);
    if (validationError) {
      console.log('❌ Validation failed:', validationError);
      return NextResponse.json({ error: validationError }, { status: 400 });
    }
    
    // Use selected items from request body, or parse from message as fallback
    let selectedItems: Array<{itemName: string, categoryName: string, itemPrice: string}> = [];
    if (hasMenuSelections) {
      if (requestSelectedItems && Array.isArray(requestSelectedItems)) {
        // Use selected items from request body (new format)
        selectedItems = requestSelectedItems.map((item: {itemName: string, categoryName: string, itemPrice: string}) => ({
          itemName: item.itemName || '',
          categoryName: item.categoryName || '',
          itemPrice: item.itemPrice || ''
        }));
      } else if (message) {
        // Fallback: parse from message text (old format)
        const itemMatches = message.match(/•\s*([^(]+)\s*\(([^)]+)\)\s*-\s*([^\n]+)/g);
        if (itemMatches) {
          selectedItems = itemMatches.map((match: string) => {
            const parts = match.match(/•\s*([^(]+)\s*\(([^)]+)\)\s*-\s*([^\n]+)/);
            return {
              itemName: parts?.[1]?.trim() || '',
              categoryName: parts?.[2]?.trim() || '',
              itemPrice: parts?.[3]?.trim() || ''
            };
          });
        }
      }
    }

    console.log('✅ Validation passed for:', { name, email, eventType });

    // Check Resend API key
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('❌ RESEND_API_KEY is missing!');
      console.error('❌ Available env vars:', Object.keys(process.env).filter(k => k.includes('RESEND') || k.includes('EMAIL')));
      return NextResponse.json(
        { 
          error: 'Email service is not configured. Please contact the administrator.',
          details: 'RESEND_API_KEY environment variable is missing'
        },
        { status: 500 }
      );
    }
    
    console.log('🔑 Resend API Key status: Present');
    console.log('🔑 API Key preview:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET');
    
    // Re-initialize Resend with the API key to ensure it's fresh
    const resend = new Resend(apiKey);

    // Send email to Kim
    console.log('📤 Sending email to Kim...');
    console.log('📧 From:', `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.fromEmail}>`);
    console.log('📧 To:', EMAIL_CONFIG.kimEmail);
    console.log('📧 Environment:', process.env.NODE_ENV || 'unknown');
    console.log('📧 FROM_EMAIL env:', process.env.FROM_EMAIL || 'not set (using default)');
    console.log('📧 CONTACT_DEFAULT_TO env:', process.env.CONTACT_DEFAULT_TO || 'not set (using default)');
    
    const logoAttachment = getLogoAttachment();
    const logoSrc = logoAttachment ? undefined : getFallbackLogoSrc();

    const emailToKim = await resend.emails.send({
      from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.fromEmail}>`,
      to: EMAIL_CONFIG.kimEmail,
      subject: `${hasMenuSelections ? 'Menu Quote Request' : 'New Katering Inquiry'} from ${name}`,
      html: EMAIL_TEMPLATES.inquiryEmail({
        name,
        email,
        phone,
        eventType,
        eventDate,
        guestCount,
        eventBudget,
        dietaryRestrictions,
        message: message || '',
        hasMenuSelections,
        selectedItems,
        logoSrc,
      }),
      attachments: logoAttachment ? [logoAttachment] : undefined,
    });

    console.log('📧 Email to Kim result:', JSON.stringify(emailToKim, null, 2));
    
    if (emailToKim.error) {
      console.error('❌ Resend API error:', JSON.stringify(emailToKim.error, null, 2));
      return NextResponse.json(
        { 
          error: 'Failed to send email',
          details: emailToKim.error.message || JSON.stringify(emailToKim.error),
          errorType: emailToKim.error.name || 'Unknown',
          errorCode: (emailToKim.error as any)?.statusCode || 'Unknown',
          fullError: JSON.stringify(emailToKim.error)
        },
        { status: 500 }
      );
    }
    
    console.log('📧 Email to Kim ID:', emailToKim.data?.id);

    // Send confirmation email to customer
    console.log('📤 Sending confirmation email to customer...');
    const confirmationResult = await resend.emails.send({
      from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.fromEmail}>`,
      to: email,
      subject: `Thank you for contacting ${EMAIL_CONFIG.companyName}!`,
      html: EMAIL_TEMPLATES.confirmationEmail({
        name,
        hasMenuSelections,
        selectedItems,
        logoSrc,
      }),
      attachments: logoAttachment ? [logoAttachment] : undefined,
    });

    console.log('📧 Confirmation email result:', confirmationResult);
    
    if (confirmationResult.error) {
      console.error('❌ Confirmation email error (non-fatal):', confirmationResult.error);
      // Don't fail the whole request if confirmation email fails
    } else {
      console.log('📧 Confirmation email ID:', confirmationResult.data?.id);
    }

    const response = {
      success: true, 
      message: 'Email sent successfully',
      emailId: emailToKim.data?.id,
      confirmationId: confirmationResult.data?.id
    };

    console.log('✅ Success response:', response);
    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    console.error('❌ Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'Unknown',
      fullError: JSON.stringify(error, Object.getOwnPropertyNames(error))
    });
    
    // Check if it's a Resend-specific error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    let errorDetails = errorMessage;
    
    // Try to extract more details from the error
    if (error && typeof error === 'object') {
      const errorObj = error as any;
      if (errorObj.response) {
        errorDetails = `Resend API Error: ${JSON.stringify(errorObj.response)}`;
      } else if (errorObj.message) {
        errorDetails = errorObj.message;
      }
    }
    
    const errorResponse = { 
      error: 'Failed to send email',
      details: errorDetails,
      type: error instanceof Error ? error.name : 'Unknown',
      // Include environment check info for debugging
      envCheck: {
        hasApiKey: !!process.env.RESEND_API_KEY,
        nodeEnv: process.env.NODE_ENV,
        vercelEnv: process.env.VERCEL_ENV
      }
    };
    
    console.error('❌ Error response:', JSON.stringify(errorResponse, null, 2));
    return NextResponse.json(errorResponse, { status: 500 });
  }
}