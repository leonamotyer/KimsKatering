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

    // Validate required fields
    if (!name || !email || !message) {
      console.log('❌ Validation failed - missing required fields:', { name: !!name, email: !!email, message: !!message });
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    console.log('✅ Validation passed for:', { name, email, eventType });

    // Check Resend API key
    console.log('🔑 Resend API Key status:', process.env.RESEND_API_KEY ? 'Present' : 'Missing');
    console.log('🔑 API Key preview:', process.env.RESEND_API_KEY ? `${process.env.RESEND_API_KEY.substring(0, 10)}...` : 'Not found');

    // Send email to Kim
    console.log('📤 Sending email to Kim...');
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
        message,
        hasMenuSelections,
        selectedItems
      }),
    });

    console.log('📧 Email to Kim result:', emailToKim);
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
    console.log('📧 Confirmation email ID:', confirmationResult.data?.id);

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
      name: error instanceof Error ? error.name : 'Unknown'
    });
    
    const errorResponse = { 
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
    
    console.error('❌ Error response:', errorResponse);
    return NextResponse.json(errorResponse, { status: 500 });
  }
}