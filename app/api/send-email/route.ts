import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration - customize these values
const EMAIL_CONFIG = {
  // Sender information
  fromEmail: 'kim@kimskatering.ca', // Your domain email
  fromName: 'Kim\'s Catering',
  
  // Recipients
  kimEmail: 'rlmotyer@gmail.com',
  
  // Brand colors (matching your website)
  primaryColor: '#8B4513', // Brown color from your site
  secondaryColor: '#f9f9f9', // Light gray background
  textColor: '#333333',
  mutedColor: '#666666',
  
  // Company info
  companyName: 'Kim\'s Catering',
  companyAddress: 'Bay #1 - 70 Slater Rd, Strathmore, Alberta',
  companyPhone: '403-497-9338',
  website: 'kims-katering.vercel.app'
};

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
      from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.fromEmail}>`,
      to: EMAIL_CONFIG.kimEmail,
      subject: `🍽️ New Catering Inquiry from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Catering Inquiry</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #ffffff; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            
            <!-- Header -->
            <div style="background-color: ${EMAIL_CONFIG.primaryColor}; padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
                🍽️ ${EMAIL_CONFIG.companyName}
              </h1>
              <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">
                New Catering Inquiry
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 30px;">
              
              <!-- Contact Information -->
              <div style="background-color: ${EMAIL_CONFIG.secondaryColor}; padding: 25px; border-radius: 10px; margin-bottom: 25px; border-left: 4px solid ${EMAIL_CONFIG.primaryColor};">
                <h3 style="color: ${EMAIL_CONFIG.primaryColor}; margin: 0 0 15px 0; font-size: 20px; font-weight: bold;">
                  📞 Contact Information
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: ${EMAIL_CONFIG.textColor}; width: 80px;">Name:</td>
                    <td style="padding: 8px 0; color: ${EMAIL_CONFIG.textColor};">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: ${EMAIL_CONFIG.textColor};">Email:</td>
                    <td style="padding: 8px 0; color: ${EMAIL_CONFIG.textColor};"><a href="mailto:${email}" style="color: ${EMAIL_CONFIG.primaryColor}; text-decoration: none;">${email}</a></td>
                  </tr>
                  ${phone ? `
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: ${EMAIL_CONFIG.textColor};">Phone:</td>
                    <td style="padding: 8px 0; color: ${EMAIL_CONFIG.textColor};"><a href="tel:${phone}" style="color: ${EMAIL_CONFIG.primaryColor}; text-decoration: none;">${phone}</a></td>
                  </tr>
                  ` : ''}
                </table>
              </div>

              <!-- Event Details -->
              <div style="background-color: ${EMAIL_CONFIG.secondaryColor}; padding: 25px; border-radius: 10px; margin-bottom: 25px; border-left: 4px solid ${EMAIL_CONFIG.primaryColor};">
                <h3 style="color: ${EMAIL_CONFIG.primaryColor}; margin: 0 0 15px 0; font-size: 20px; font-weight: bold;">
                  🎉 Event Details
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                  ${eventType ? `
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: ${EMAIL_CONFIG.textColor}; width: 120px;">Event Type:</td>
                    <td style="padding: 8px 0; color: ${EMAIL_CONFIG.textColor};">${eventType}</td>
                  </tr>
                  ` : ''}
                  ${eventDate ? `
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: ${EMAIL_CONFIG.textColor};">Event Date:</td>
                    <td style="padding: 8px 0; color: ${EMAIL_CONFIG.textColor};">${eventDate}</td>
                  </tr>
                  ` : ''}
                  ${guestCount ? `
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: ${EMAIL_CONFIG.textColor};">Guests:</td>
                    <td style="padding: 8px 0; color: ${EMAIL_CONFIG.textColor};">${guestCount} people</td>
                  </tr>
                  ` : ''}
                </table>
              </div>

              <!-- Message -->
              <div style="background-color: ${EMAIL_CONFIG.secondaryColor}; padding: 25px; border-radius: 10px; margin-bottom: 25px; border-left: 4px solid ${EMAIL_CONFIG.primaryColor};">
                <h3 style="color: ${EMAIL_CONFIG.primaryColor}; margin: 0 0 15px 0; font-size: 20px; font-weight: bold;">
                  💬 Message
                </h3>
                <div style="color: ${EMAIL_CONFIG.textColor}; line-height: 1.6; white-space: pre-wrap;">${message}</div>
              </div>

              <!-- Action Button -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:${email}" style="background-color: ${EMAIL_CONFIG.primaryColor}; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                  📧 Reply to ${name}
                </a>
              </div>

            </div>

            <!-- Footer -->
            <div style="background-color: ${EMAIL_CONFIG.secondaryColor}; padding: 20px; text-align: center; border-top: 1px solid #ddd;">
              <p style="color: ${EMAIL_CONFIG.mutedColor}; font-size: 14px; margin: 0;">
                This inquiry was submitted through the ${EMAIL_CONFIG.companyName} website contact form.<br>
                <strong>${EMAIL_CONFIG.companyName}</strong> | ${EMAIL_CONFIG.companyAddress} | ${EMAIL_CONFIG.companyPhone}
              </p>
            </div>

          </div>
        </body>
        </html>
      `,
    });

    // Send confirmation email to customer
    await resend.emails.send({
      from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.fromEmail}>`,
      to: email,
      subject: `Thank you for contacting ${EMAIL_CONFIG.companyName}!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You - ${EMAIL_CONFIG.companyName}</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #ffffff; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            
            <!-- Header -->
            <div style="background-color: ${EMAIL_CONFIG.primaryColor}; padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
                🍽️ ${EMAIL_CONFIG.companyName}
              </h1>
              <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">
                Thank You for Your Inquiry!
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 30px;">
              
              <h2 style="color: ${EMAIL_CONFIG.primaryColor}; margin: 0 0 20px 0;">Hi ${name}! 👋</h2>
              
              <p style="color: ${EMAIL_CONFIG.textColor}; line-height: 1.6; margin-bottom: 20px;">
                Thank you for your interest in our catering services! We've received your inquiry and Kim will get back to you within 24 hours.
              </p>

              <!-- What's Next -->
              <div style="background-color: ${EMAIL_CONFIG.secondaryColor}; padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 4px solid ${EMAIL_CONFIG.primaryColor};">
                <h3 style="color: ${EMAIL_CONFIG.primaryColor}; margin: 0 0 15px 0; font-size: 20px; font-weight: bold;">
                  🎯 What's Next?
                </h3>
                <ul style="color: ${EMAIL_CONFIG.textColor}; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li>Kim will review your event details</li>
                  <li>She'll contact you to discuss your specific needs</li>
                  <li>You'll receive a custom quote tailored to your event</li>
                  <li>We'll help plan every delicious detail!</li>
                </ul>
              </div>

              <!-- Contact Info -->
              <div style="background-color: ${EMAIL_CONFIG.secondaryColor}; padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 4px solid ${EMAIL_CONFIG.primaryColor};">
                <h3 style="color: ${EMAIL_CONFIG.primaryColor}; margin: 0 0 15px 0; font-size: 20px; font-weight: bold;">
                  📞 Need Immediate Assistance?
                </h3>
                <p style="color: ${EMAIL_CONFIG.textColor}; margin: 0;">
                  Feel free to call Kim directly at <strong><a href="tel:${EMAIL_CONFIG.companyPhone}" style="color: ${EMAIL_CONFIG.primaryColor}; text-decoration: none;">${EMAIL_CONFIG.companyPhone}</a></strong>
                </p>
              </div>

              <!-- Services -->
              <div style="background-color: ${EMAIL_CONFIG.secondaryColor}; padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 4px solid ${EMAIL_CONFIG.primaryColor};">
                <h3 style="color: ${EMAIL_CONFIG.primaryColor}; margin: 0 0 15px 0; font-size: 20px; font-weight: bold;">
                  🍰 Our Services
                </h3>
                <div style="color: ${EMAIL_CONFIG.textColor}; line-height: 1.6;">
                  <p style="margin: 0 0 10px 0;">• Wedding Catering</p>
                  <p style="margin: 0 0 10px 0;">• Corporate Events</p>
                  <p style="margin: 0 0 10px 0;">• Birthday Parties</p>
                  <p style="margin: 0 0 10px 0;">• Family Reunions</p>
                  <p style="margin: 0 0 10px 0;">• Custom Cakes & Baking</p>
                </div>
              </div>

            </div>

            <!-- Footer -->
            <div style="background-color: ${EMAIL_CONFIG.secondaryColor}; padding: 20px; text-align: center; border-top: 1px solid #ddd;">
              <p style="color: ${EMAIL_CONFIG.mutedColor}; font-size: 14px; margin: 0;">
                <strong>${EMAIL_CONFIG.companyName}</strong><br>
                ${EMAIL_CONFIG.companyAddress}<br>
                Phone: ${EMAIL_CONFIG.companyPhone} | Website: ${EMAIL_CONFIG.website}
              </p>
            </div>

          </div>
        </body>
        </html>
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