import { NextRequest, NextResponse } from 'next/server';
import { EMAIL_TEMPLATES } from '../send-email/email';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || 'inquiry';
  
  // Sample data for preview
  const sampleInquiryData = {
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '403-555-1234',
    eventType: 'Wedding',
    eventDate: '2024-06-15',
    guestCount: '150',
    eventBudget: '5000.00',
    dietaryRestrictions: 'Vegetarian options needed for 20 guests. One guest has a severe nut allergy.',
    message: 'We are planning a beautiful outdoor wedding in June. We would love to have a mix of appetizers, a main course buffet, and a dessert table. Please let us know if you can accommodate our event!',
    hasMenuSelections: true,
    selectedItems: [
      {
        itemName: 'Chicken Parmesan',
        categoryName: 'Main Courses',
        itemPrice: '$12.50 per person'
      },
      {
        itemName: 'Caesar Salad',
        categoryName: 'Salads',
        itemPrice: '$8.00 per person'
      },
      {
        itemName: 'Chocolate Cake',
        categoryName: 'Desserts',
        itemPrice: '$6.00 per person'
      }
    ]
  };

  const sampleConfirmationData = {
    name: 'John Smith',
    hasMenuSelections: true,
    selectedItems: sampleInquiryData.selectedItems
  };

  try {
    const html = type === 'inquiry' 
      ? EMAIL_TEMPLATES.inquiryEmail(sampleInquiryData)
      : EMAIL_TEMPLATES.confirmationEmail(sampleConfirmationData);

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate email preview' },
      { status: 500 }
    );
  }
}

