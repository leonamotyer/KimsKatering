// Email configuration and templates for Kim's Katering
export const EMAIL_CONFIG = {
  // Sender information
  fromEmail: process.env.FROM_EMAIL || 'onboarding@resend.dev', // Resend's verified domain
  fromName: process.env.FROM_NAME || 'Kim\'s Katering',
  
  // Recipients
  kimEmail: process.env.CONTACT_DEFAULT_TO || 'kimskateringstrathmore@gmail.com',
  
  // Brand colors (using CSS global variables)
  primaryColor: 'var(--baguette-dark)', // Main brown from website
  secondaryColor: 'var(--background)', // Background cream
  accentColor: 'var(--baguette-primary)', // Baguette primary
  lightColor: 'var(--baguette-light)', // Baguette light
  mediumColor: 'var(--baguette-medium)', // Baguette medium
  darkColor: 'var(--foreground)', // Foreground dark brown
  mutedColor: 'var(--muted-text)', // Muted text
  subtleColor: 'var(--muted-subtle)', // Muted subtle
  
  // Company info
  companyName: 'Kim\'s Katering',
  companyAddress: 'Bay #1 - 70 Slater Rd, Strathmore, Alberta',
  companyPhone: '403-497-9338',
  website: 'kims-Catering.vercel.app'
};

// Email templates
export const EMAIL_TEMPLATES = {
  // Inquiry email to Kim
  inquiryEmail: (data: {
    name: string;
    email: string;
    phone?: string;
    eventType?: string;
    eventDate?: string;
    guestCount?: string;
    eventBudget?: string;
    dietaryRestrictions?: string;
    message: string;
    hasMenuSelections: boolean;
    selectedItems?: Array<{itemName: string, categoryName: string, itemPrice: string}>;
  }) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Katering Inquiry</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    </head>
    <body style="margin: 0; padding: 0; background-color: ${EMAIL_CONFIG.secondaryColor}; font-family: 'Inter', Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, ${EMAIL_CONFIG.primaryColor} 0%, ${EMAIL_CONFIG.mediumColor} 100%); padding: 40px 30px; text-align: center; position: relative;">
          <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, ${EMAIL_CONFIG.accentColor}, ${EMAIL_CONFIG.lightColor}, ${EMAIL_CONFIG.accentColor});"></div>
          <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 600; font-family: 'Playfair Display', serif; letter-spacing: 1px;">
            ${EMAIL_CONFIG.companyName}
          </h1>
          <div style="width: 60px; height: 2px; background-color: ${EMAIL_CONFIG.lightColor}; margin: 15px auto;"></div>
          <p style="color: white; margin: 0; font-size: 16px; font-weight: 300; opacity: 0.9;">
            ${data.hasMenuSelections ? 'Menu Quote Request' : 'New Katering Inquiry'}
          </p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          
          <!-- Contact Information -->
          <div style="background-color: ${EMAIL_CONFIG.secondaryColor}; padding: 30px; border-radius: 12px; margin-bottom: 30px; border: 1px solid ${EMAIL_CONFIG.lightColor}; position: relative;">
            <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: linear-gradient(180deg, ${EMAIL_CONFIG.primaryColor}, ${EMAIL_CONFIG.accentColor}); border-radius: 12px 0 0 12px;"></div>
            <h3 style="color: ${EMAIL_CONFIG.darkColor}; margin: 0 0 20px 0; font-size: 22px; font-weight: 600; font-family: 'Playfair Display', serif;">
              Contact Information
            </h3>
            <div style="display: grid; gap: 12px;">
              <div style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid ${EMAIL_CONFIG.lightColor};">
                <div style="width: 8px; height: 8px; background-color: ${EMAIL_CONFIG.accentColor}; border-radius: 50%; margin-right: 15px;"></div>
                <div style="flex: 1;">
                  <span style="font-weight: 600; color: ${EMAIL_CONFIG.darkColor}; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Name</span>
                  <div style="color: ${EMAIL_CONFIG.mutedColor}; font-size: 16px; margin-top: 2px;">${data.name}</div>
                </div>
              </div>
              <div style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid ${EMAIL_CONFIG.lightColor};">
                <div style="width: 8px; height: 8px; background-color: ${EMAIL_CONFIG.accentColor}; border-radius: 50%; margin-right: 15px;"></div>
                <div style="flex: 1;">
                  <span style="font-weight: 600; color: ${EMAIL_CONFIG.darkColor}; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
                  <div style="margin-top: 2px;"><a href="mailto:${data.email}" style="color: ${EMAIL_CONFIG.primaryColor}; text-decoration: none; font-size: 16px; font-weight: 500;">${data.email}</a></div>
                </div>
              </div>
              ${data.phone ? `
              <div style="display: flex; align-items: center; padding: 12px 0;">
                <div style="width: 8px; height: 8px; background-color: ${EMAIL_CONFIG.accentColor}; border-radius: 50%; margin-right: 15px;"></div>
                <div style="flex: 1;">
                  <span style="font-weight: 600; color: ${EMAIL_CONFIG.darkColor}; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Phone</span>
                  <div style="margin-top: 2px;"><a href="tel:${data.phone}" style="color: ${EMAIL_CONFIG.primaryColor}; text-decoration: none; font-size: 16px; font-weight: 500;">${data.phone}</a></div>
                </div>
              </div>
              ` : ''}
            </div>
          </div>

          <!-- Event Details -->
          ${(data.eventType || data.eventDate || data.guestCount || data.eventBudget || data.dietaryRestrictions) ? `
          <div style="background-color: ${EMAIL_CONFIG.secondaryColor}; padding: 30px; border-radius: 12px; margin-bottom: 30px; border: 1px solid ${EMAIL_CONFIG.lightColor}; position: relative;">
            <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: linear-gradient(180deg, ${EMAIL_CONFIG.accentColor}, ${EMAIL_CONFIG.lightColor}); border-radius: 12px 0 0 12px;"></div>
            <h3 style="color: ${EMAIL_CONFIG.darkColor}; margin: 0 0 20px 0; font-size: 22px; font-weight: 600; font-family: 'Playfair Display', serif;">
              Event Details
            </h3>
            <div style="display: grid; gap: 12px;">
              ${data.eventType ? `
              <div style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid ${EMAIL_CONFIG.lightColor};">
                <div style="width: 8px; height: 8px; background-color: ${EMAIL_CONFIG.accentColor}; border-radius: 50%; margin-right: 15px;"></div>
                <div style="flex: 1;">
                  <span style="font-weight: 600; color: ${EMAIL_CONFIG.darkColor}; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Event Type</span>
                  <div style="color: ${EMAIL_CONFIG.mutedColor}; font-size: 16px; margin-top: 2px;">${data.eventType}</div>
                </div>
              </div>
              ` : ''}
              ${data.eventDate ? `
              <div style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid ${EMAIL_CONFIG.lightColor};">
                <div style="width: 8px; height: 8px; background-color: ${EMAIL_CONFIG.accentColor}; border-radius: 50%; margin-right: 15px;"></div>
                <div style="flex: 1;">
                  <span style="font-weight: 600; color: ${EMAIL_CONFIG.darkColor}; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Event Date</span>
                  <div style="color: ${EMAIL_CONFIG.mutedColor}; font-size: 16px; margin-top: 2px;">${data.eventDate}</div>
                </div>
              </div>
              ` : ''}
              ${data.guestCount ? `
              <div style="display: flex; align-items: center; padding: 12px 0; ${(data.eventBudget || data.dietaryRestrictions) ? 'border-bottom: 1px solid ' + EMAIL_CONFIG.lightColor + ';' : ''}">
                <div style="width: 8px; height: 8px; background-color: ${EMAIL_CONFIG.accentColor}; border-radius: 50%; margin-right: 15px;"></div>
                <div style="flex: 1;">
                  <span style="font-weight: 600; color: ${EMAIL_CONFIG.darkColor}; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Guest Count</span>
                  <div style="color: ${EMAIL_CONFIG.mutedColor}; font-size: 16px; margin-top: 2px;">${data.guestCount} people</div>
                </div>
              </div>
              ` : ''}
              ${data.eventBudget ? `
              <div style="display: flex; align-items: center; padding: 12px 0; ${data.dietaryRestrictions ? 'border-bottom: 1px solid ' + EMAIL_CONFIG.lightColor + ';' : ''}">
                <div style="width: 8px; height: 8px; background-color: ${EMAIL_CONFIG.accentColor}; border-radius: 50%; margin-right: 15px;"></div>
                <div style="flex: 1;">
                  <span style="font-weight: 600; color: ${EMAIL_CONFIG.darkColor}; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Event Budget</span>
                  <div style="color: ${EMAIL_CONFIG.mutedColor}; font-size: 16px; margin-top: 2px;">$${parseFloat(data.eventBudget || '0').toFixed(2)}</div>
                </div>
              </div>
              ` : ''}
              ${data.dietaryRestrictions ? `
              <div style="display: flex; align-items: flex-start; padding: 12px 0;">
                <div style="width: 8px; height: 8px; background-color: ${EMAIL_CONFIG.accentColor}; border-radius: 50%; margin-right: 15px; margin-top: 4px;"></div>
                <div style="flex: 1;">
                  <span style="font-weight: 600; color: ${EMAIL_CONFIG.darkColor}; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Dietary Restrictions & Allergies</span>
                  <div style="color: ${EMAIL_CONFIG.mutedColor}; font-size: 16px; margin-top: 2px; white-space: pre-wrap;">${data.dietaryRestrictions}</div>
                </div>
              </div>
              ` : ''}
            </div>
          </div>
          ` : ''}

          <!-- Message -->
          <div style="background-color: ${EMAIL_CONFIG.secondaryColor}; padding: 30px; border-radius: 12px; margin-bottom: 30px; border: 1px solid ${EMAIL_CONFIG.lightColor}; position: relative;">
            <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: linear-gradient(180deg, ${EMAIL_CONFIG.primaryColor}, ${EMAIL_CONFIG.accentColor}); border-radius: 12px 0 0 12px;"></div>
            <h3 style="color: ${EMAIL_CONFIG.darkColor}; margin: 0 0 20px 0; font-size: 22px; font-weight: 600; font-family: 'Playfair Display', serif;">
              ${data.hasMenuSelections ? 'Menu Quote Request' : 'Message'}
            </h3>
            <div style="color: ${EMAIL_CONFIG.mutedColor}; line-height: 1.7; white-space: pre-wrap; font-size: 16px; background-color: white; padding: 20px; border-radius: 8px; border: 1px solid ${EMAIL_CONFIG.lightColor};">${data.message}</div>
            ${data.hasMenuSelections && data.selectedItems && data.selectedItems.length > 0 ? `
              <div style="margin-top: 20px;">
                <h4 style="color: ${EMAIL_CONFIG.darkColor}; margin: 0 0 15px 0; font-size: 18px; font-weight: 600; font-family: 'Playfair Display', serif;">
                  Selected Menu Items
                </h4>
                <div style="background-color: white; border-radius: 8px; border: 1px solid ${EMAIL_CONFIG.lightColor}; overflow: hidden;">
                  ${data.selectedItems.map((item, index) => `
                    <div style="padding: 15px 20px; ${index < (data.selectedItems?.length || 0) - 1 ? `border-bottom: 1px solid ${EMAIL_CONFIG.lightColor};` : ''}">
                      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div style="flex: 1;">
                          <h5 style="margin: 0 0 5px 0; font-size: 16px; font-weight: 600; color: ${EMAIL_CONFIG.darkColor};">
                            ${item.itemName}
                          </h5>
                          <p style="margin: 0 0 5px 0; font-size: 14px; color: ${EMAIL_CONFIG.mutedColor};">
                            ${item.categoryName}
                          </p>
                        </div>
                        <div style="margin-left: 15px; text-align: right;">
                          <span style="font-size: 16px; font-weight: 600; color: ${EMAIL_CONFIG.accentColor};">
                            ${item.itemPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
                <div style="margin-top: 15px; padding: 15px; background: linear-gradient(135deg, ${EMAIL_CONFIG.accentColor}20, ${EMAIL_CONFIG.lightColor}20); border-radius: 8px; border: 2px solid ${EMAIL_CONFIG.accentColor};">
                  <div style="display: flex; align-items: center;">
                    <div style="width: 12px; height: 12px; background-color: ${EMAIL_CONFIG.accentColor}; border-radius: 50%; margin-right: 12px;"></div>
                    <p style="margin: 0; font-weight: 600; color: ${EMAIL_CONFIG.darkColor}; font-size: 14px;">
                      Customer has selected ${data.selectedItems?.length || 0} item${(data.selectedItems?.length || 0) !== 1 ? 's' : ''} for their quote request!
                    </p>
                  </div>
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Action Button -->
          <div style="text-align: center; margin: 40px 0;">
            <a href="mailto:${data.email}" style="background: linear-gradient(135deg, ${EMAIL_CONFIG.primaryColor}, ${EMAIL_CONFIG.mediumColor}); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; font-size: 16px; box-shadow: 0 4px 12px rgba(139, 93, 59, 0.3); transition: all 0.3s ease;">
              Reply to ${data.name}
            </a>
          </div>

        </div>

        <!-- Footer -->
        <div style="background: linear-gradient(135deg, ${EMAIL_CONFIG.subtleColor}, ${EMAIL_CONFIG.lightColor}); padding: 30px; text-align: center; border-top: 1px solid ${EMAIL_CONFIG.lightColor};">
          <div style="max-width: 400px; margin: 0 auto;">
            <p style="color: ${EMAIL_CONFIG.mutedColor}; font-size: 14px; margin: 0 0 15px 0; line-height: 1.5;">
              This inquiry was submitted through the ${EMAIL_CONFIG.companyName} website contact form.
            </p>
            <div style="border-top: 1px solid ${EMAIL_CONFIG.lightColor}; padding-top: 15px;">
              <p style="color: ${EMAIL_CONFIG.darkColor}; font-size: 16px; font-weight: 600; margin: 0 0 5px 0; font-family: 'Playfair Display', serif;">
                ${EMAIL_CONFIG.companyName}
              </p>
              <p style="color: ${EMAIL_CONFIG.mutedColor}; font-size: 14px; margin: 0 0 5px 0;">
                ${EMAIL_CONFIG.companyAddress}
              </p>
              <p style="color: ${EMAIL_CONFIG.primaryColor}; font-size: 14px; font-weight: 500; margin: 0;">
                ${EMAIL_CONFIG.companyPhone}
              </p>
            </div>
          </div>
        </div>

      </div>
    </body>
    </html>
  `,

  // Confirmation email to customer
  confirmationEmail: (data: { 
    name: string; 
    hasMenuSelections?: boolean;
    selectedItems?: Array<{itemName: string, categoryName: string, itemPrice: string}>;
  }) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You - ${EMAIL_CONFIG.companyName}</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    </head>
    <body style="margin: 0; padding: 0; background-color: ${EMAIL_CONFIG.secondaryColor}; font-family: 'Inter', Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, ${EMAIL_CONFIG.primaryColor} 0%, ${EMAIL_CONFIG.mediumColor} 100%); padding: 40px 30px; text-align: center; position: relative;">
          <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, ${EMAIL_CONFIG.accentColor}, ${EMAIL_CONFIG.lightColor}, ${EMAIL_CONFIG.accentColor});"></div>
          <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 600; font-family: 'Playfair Display', serif; letter-spacing: 1px;">
            ${EMAIL_CONFIG.companyName}
          </h1>
          <div style="width: 60px; height: 2px; background-color: ${EMAIL_CONFIG.lightColor}; margin: 15px auto;"></div>
          <p style="color: white; margin: 0; font-size: 16px; font-weight: 300; opacity: 0.9;">
            Thank You for Your Inquiry!
          </p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          
          <h2 style="color: ${EMAIL_CONFIG.darkColor}; margin: 0 0 25px 0; font-size: 28px; font-weight: 600; font-family: 'Playfair Display', serif;">Hi ${data.name}! 👋</h2>
          
          <p style="color: ${EMAIL_CONFIG.mutedColor}; line-height: 1.7; margin-bottom: 30px; font-size: 16px;">
            Thank you for your interest in our katering services! We've received your inquiry and Kim will get back to you within 24 hours.
          </p>

          <!-- What's Next -->
          <div style="background-color: ${EMAIL_CONFIG.secondaryColor}; padding: 30px; border-radius: 12px; margin: 30px 0; border: 1px solid ${EMAIL_CONFIG.lightColor}; position: relative;">
            <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: linear-gradient(180deg, ${EMAIL_CONFIG.accentColor}, ${EMAIL_CONFIG.lightColor}); border-radius: 12px 0 0 12px;"></div>
            <h3 style="color: ${EMAIL_CONFIG.darkColor}; margin: 0 0 20px 0; font-size: 22px; font-weight: 600; font-family: 'Playfair Display', serif;">
              What's Next?
            </h3>
            <div style="display: grid; gap: 12px;">
              <div style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid ${EMAIL_CONFIG.lightColor};">
                <div style="width: 8px; height: 8px; background-color: ${EMAIL_CONFIG.accentColor}; border-radius: 50%; margin-right: 15px;"></div>
                <span style="color: ${EMAIL_CONFIG.mutedColor}; font-size: 16px;">Kim will review your event details</span>
              </div>
              <div style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid ${EMAIL_CONFIG.lightColor};">
                <div style="width: 8px; height: 8px; background-color: ${EMAIL_CONFIG.accentColor}; border-radius: 50%; margin-right: 15px;"></div>
                <span style="color: ${EMAIL_CONFIG.mutedColor}; font-size: 16px;">She'll contact you to discuss your specific needs</span>
              </div>
              <div style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid ${EMAIL_CONFIG.lightColor};">
                <div style="width: 8px; height: 8px; background-color: ${EMAIL_CONFIG.accentColor}; border-radius: 50%; margin-right: 15px;"></div>
                <span style="color: ${EMAIL_CONFIG.mutedColor}; font-size: 16px;">You'll receive a custom quote tailored to your event</span>
              </div>
              <div style="display: flex; align-items: center; padding: 12px 0;">
                <div style="width: 8px; height: 8px; background-color: ${EMAIL_CONFIG.accentColor}; border-radius: 50%; margin-right: 15px;"></div>
                <span style="color: ${EMAIL_CONFIG.mutedColor}; font-size: 16px;">We'll help plan every delicious detail!</span>
              </div>
            </div>
          </div>

          ${data.hasMenuSelections && data.selectedItems && data.selectedItems.length > 0 ? `
          <!-- Selected Items Summary -->
          <div style="background-color: ${EMAIL_CONFIG.secondaryColor}; padding: 30px; border-radius: 12px; margin: 30px 0; border: 1px solid ${EMAIL_CONFIG.lightColor}; position: relative;">
            <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: linear-gradient(180deg, ${EMAIL_CONFIG.primaryColor}, ${EMAIL_CONFIG.accentColor}); border-radius: 12px 0 0 12px;"></div>
            <h3 style="color: ${EMAIL_CONFIG.darkColor}; margin: 0 0 20px 0; font-size: 22px; font-weight: 600; font-family: 'Playfair Display', serif;">
              Your Selected Menu Items
            </h3>
            <p style="color: ${EMAIL_CONFIG.mutedColor}; margin: 0 0 20px 0; font-size: 16px;">
              Here's a summary of the menu items you've selected for your quote request:
            </p>
            <div style="background-color: white; border-radius: 8px; border: 1px solid ${EMAIL_CONFIG.lightColor}; overflow: hidden;">
              ${data.selectedItems.map((item, index) => `
                <div style="padding: 15px 20px; ${index < (data.selectedItems?.length || 0) - 1 ? `border-bottom: 1px solid ${EMAIL_CONFIG.lightColor};` : ''}">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div style="flex: 1;">
                      <h5 style="margin: 0 0 5px 0; font-size: 16px; font-weight: 600; color: ${EMAIL_CONFIG.darkColor};">
                        ${item.itemName}
                      </h5>
                      <p style="margin: 0 0 5px 0; font-size: 14px; color: ${EMAIL_CONFIG.mutedColor};">
                        ${item.categoryName}
                      </p>
                    </div>
                    <div style="margin-left: 15px; text-align: right;">
                      <span style="font-size: 16px; font-weight: 600; color: ${EMAIL_CONFIG.accentColor};">
                        ${item.itemPrice}
                      </span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
            <div style="margin-top: 15px; padding: 15px; background: linear-gradient(135deg, ${EMAIL_CONFIG.accentColor}20, ${EMAIL_CONFIG.lightColor}20); border-radius: 8px; border: 2px solid ${EMAIL_CONFIG.accentColor};">
              <div style="display: flex; align-items: center;">
                <div style="width: 12px; height: 12px; background-color: ${EMAIL_CONFIG.accentColor}; border-radius: 50%; margin-right: 12px;"></div>
                <p style="margin: 0; font-weight: 600; color: ${EMAIL_CONFIG.darkColor}; font-size: 14px;">
                  Kim will prepare a custom quote for these ${data.selectedItems?.length || 0} item${(data.selectedItems?.length || 0) !== 1 ? 's' : ''}!
                </p>
              </div>
            </div>
          </div>
          ` : ''}

          <!-- Contact Info -->
          <div style="background-color: ${EMAIL_CONFIG.secondaryColor}; padding: 30px; border-radius: 12px; margin: 30px 0; border: 1px solid ${EMAIL_CONFIG.lightColor}; position: relative;">
            <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: linear-gradient(180deg, ${EMAIL_CONFIG.primaryColor}, ${EMAIL_CONFIG.accentColor}); border-radius: 12px 0 0 12px;"></div>
            <h3 style="color: ${EMAIL_CONFIG.darkColor}; margin: 0 0 20px 0; font-size: 22px; font-weight: 600; font-family: 'Playfair Display', serif;">
              Need Immediate Assistance?
            </h3>
            <p style="color: ${EMAIL_CONFIG.mutedColor}; margin: 0; font-size: 16px;">
              Feel free to call Kim directly at <strong><a href="tel:${EMAIL_CONFIG.companyPhone}" style="color: ${EMAIL_CONFIG.primaryColor}; text-decoration: none; font-weight: 600;">${EMAIL_CONFIG.companyPhone}</a></strong>
            </p>
          </div>

          <!-- Services -->
          <div style="background-color: ${EMAIL_CONFIG.secondaryColor}; padding: 30px; border-radius: 12px; margin: 30px 0; border: 1px solid ${EMAIL_CONFIG.lightColor}; position: relative;">
            <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: linear-gradient(180deg, ${EMAIL_CONFIG.accentColor}, ${EMAIL_CONFIG.lightColor}); border-radius: 12px 0 0 12px;"></div>
            <h3 style="color: ${EMAIL_CONFIG.darkColor}; margin: 0 0 20px 0; font-size: 22px; font-weight: 600; font-family: 'Playfair Display', serif;">
              Our Services
            </h3>
            <div style="display: grid; gap: 8px;">
              <div style="display: flex; align-items: center; padding: 8px 0;">
                <div style="width: 6px; height: 6px; background-color: ${EMAIL_CONFIG.accentColor}; border-radius: 50%; margin-right: 12px;"></div>
                <span style="color: ${EMAIL_CONFIG.mutedColor}; font-size: 16px;">Wedding Katering</span>
              </div>
              <div style="display: flex; align-items: center; padding: 8px 0;">
                <div style="width: 6px; height: 6px; background-color: ${EMAIL_CONFIG.accentColor}; border-radius: 50%; margin-right: 12px;"></div>
                <span style="color: ${EMAIL_CONFIG.mutedColor}; font-size: 16px;">Corporate Events</span>
              </div>
              <div style="display: flex; align-items: center; padding: 8px 0;">
                <div style="width: 6px; height: 6px; background-color: ${EMAIL_CONFIG.accentColor}; border-radius: 50%; margin-right: 12px;"></div>
                <span style="color: ${EMAIL_CONFIG.mutedColor}; font-size: 16px;">Birthday Parties</span>
              </div>
              <div style="display: flex; align-items: center; padding: 8px 0;">
                <div style="width: 6px; height: 6px; background-color: ${EMAIL_CONFIG.accentColor}; border-radius: 50%; margin-right: 12px;"></div>
                <span style="color: ${EMAIL_CONFIG.mutedColor}; font-size: 16px;">Family Reunions</span>
              </div>
              <div style="display: flex; align-items: center; padding: 8px 0;">
                <div style="width: 6px; height: 6px; background-color: ${EMAIL_CONFIG.accentColor}; border-radius: 50%; margin-right: 12px;"></div>
                <span style="color: ${EMAIL_CONFIG.mutedColor}; font-size: 16px;">Custom Cakes & Baking</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div style="background: linear-gradient(135deg, ${EMAIL_CONFIG.subtleColor}, ${EMAIL_CONFIG.lightColor}); padding: 30px; text-align: center; border-top: 1px solid ${EMAIL_CONFIG.lightColor};">
          <div style="max-width: 400px; margin: 0 auto;">
            <p style="color: ${EMAIL_CONFIG.mutedColor}; font-size: 14px; margin: 0 0 15px 0; line-height: 1.5;">
              This inquiry was submitted through the ${EMAIL_CONFIG.companyName} website contact form.
            </p>
            <div style="border-top: 1px solid ${EMAIL_CONFIG.lightColor}; padding-top: 15px;">
              <p style="color: ${EMAIL_CONFIG.darkColor}; font-size: 16px; font-weight: 600; margin: 0 0 5px 0; font-family: 'Playfair Display', serif;">
                ${EMAIL_CONFIG.companyName}
              </p>
              <p style="color: ${EMAIL_CONFIG.mutedColor}; font-size: 14px; margin: 0 0 5px 0;">
                ${EMAIL_CONFIG.companyAddress}
              </p>
              <p style="color: ${EMAIL_CONFIG.primaryColor}; font-size: 14px; font-weight: 500; margin: 0;">
                ${EMAIL_CONFIG.companyPhone}
              </p>
            </div>
          </div>
        </div>

      </div>
    </body>
    </html>
  `
};
