import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { EMAIL_CONFIG, EMAIL_TEMPLATES } from './email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  console.log('📧 Email API route called');
  
  try {
    const body = await request.json();
    console.log('📝 Request body received:', JSON.stringify(body, null, 2));
    
    const { name, email, phone, eventType, eventDate, guestCount, eventBudget, dietaryRestrictions, message, hasMenuSelections, selectedItems: requestSelectedItems } = body;
    
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
    
    console.log('🍽️ Has menu selections:', hasMenuSelections);
    console.log('📋 Selected items:', selectedItems);

    // Validate required fields - only name, email, and phone are required
    if (!name || !email || !phone) {
      console.log('❌ Validation failed - missing required fields:', { name: !!name, email: !!email, phone: !!phone });
      return NextResponse.json(
        { error: 'Name, email, and phone number are required.' },
        { status: 400 }
      );
    }

    console.log('✅ Validation passed for:', { name, email, eventType });

    // Check Resend API key
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY is missing!');
      return NextResponse.json(
        { 
          error: 'Email service is not configured. Please contact the administrator.',
          details: 'RESEND_API_KEY environment variable is missing'
        },
        { status: 500 }
      );
    }
    
    console.log('🔑 Resend API Key status: Present');
    console.log('🔑 API Key preview:', `${process.env.RESEND_API_KEY.substring(0, 10)}...`);

    // Send email to Kim
    console.log('📤 Sending email to Kim...');
    console.log('📧 From:', `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.fromEmail}>`);
    console.log('📧 To:', EMAIL_CONFIG.kimEmail);
    console.log('📧 Environment:', process.env.NODE_ENV || 'unknown');
    console.log('📧 FROM_EMAIL env:', process.env.FROM_EMAIL || 'not set (using default)');
    console.log('📧 CONTACT_DEFAULT_TO env:', process.env.CONTACT_DEFAULT_TO || 'not set (using default)');
    
    const emailToKim = await resend.emails.send({
      from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.fromEmail}>`,
      to: EMAIL_CONFIG.kimEmail,
      subject: `${hasMenuSelections ? '🍽️ Menu Quote Request' : '🍽️ New Katering Inquiry'} from ${name}`,
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
        selectedItems
      }),
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
        selectedItems
      }),
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
    
    const errorResponse = { 
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error',
      type: error instanceof Error ? error.name : 'Unknown'
    };
    
    console.error('❌ Error response:', JSON.stringify(errorResponse, null, 2));
    return NextResponse.json(errorResponse, { status: 500 });
  }
}