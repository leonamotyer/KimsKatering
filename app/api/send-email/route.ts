import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, eventType, eventDate, guestCount, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Send email to Kim
    const emailToKim = await resend.emails.send({
      from: 'Kim\'s Catering <onboarding@resend.dev>',
      to: 'rlmotyer@gmail.com',
      subject: `New Catering Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B4513;">New Catering Inquiry</h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8B4513; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8B4513; margin-top: 0;">Event Details</h3>
            ${eventType ? `<p><strong>Event Type:</strong> ${eventType}</p>` : ''}
            ${eventDate ? `<p><strong>Event Date:</strong> ${eventDate}</p>` : ''}
            ${guestCount ? `<p><strong>Number of Guests:</strong> ${guestCount}</p>` : ''}
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8B4513; margin-top: 0;">Message</h3>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 14px;">
            This inquiry was submitted through the Kim's Catering website contact form.
          </p>
        </div>
      `,
    });

    // Send confirmation email to customer
    await resend.emails.send({
      from: 'Kim\'s Catering <onboarding@resend.dev>',
      to: email,
      subject: 'Thank you for your catering inquiry!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B4513;">Thank you for contacting Kim's Catering!</h2>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for your interest in our catering services! We've received your inquiry and Kim will get back to you within 24 hours.</p>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8B4513; margin-top: 0;">What's Next?</h3>
            <ul>
              <li>Kim will review your event details</li>
              <li>She'll contact you to discuss your specific needs</li>
              <li>You'll receive a custom quote tailored to your event</li>
            </ul>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8B4513; margin-top: 0;">Need immediate assistance?</h3>
            <p>Feel free to call Kim directly at <strong>403-497-9338</strong></p>
          </div>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 14px;">
            Kim's Catering - Professional catering services for your special events<br>
            Bay #1 - 70 Slater Rd, Strathmore, Alberta<br>
            Phone: 403-497-9338
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully',
        emailId: emailToKim.data?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
