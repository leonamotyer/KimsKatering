"use client";

import { useState } from 'react';

export default function EmailPreviewPage() {
  const [activeTab, setActiveTab] = useState<'inquiry' | 'confirmation'>('inquiry');
  
  // Sample data for preview (for display purposes)
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

  // Use API route to get email HTML (avoids client-side import issues)
  const inquiryEmailUrl = `/api/preview-email?type=inquiry`;
  const confirmationEmailUrl = `/api/preview-email?type=confirmation`;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Email Template Preview</h1>
        
        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('inquiry')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'inquiry'
                  ? 'border-[var(--baguette-primary)] text-[var(--baguette-dark)]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Inquiry Email (to Kim)
            </button>
            <button
              onClick={() => setActiveTab('confirmation')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'confirmation'
                  ? 'border-[var(--baguette-primary)] text-[var(--baguette-dark)]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Confirmation Email (to Customer)
            </button>
          </nav>
        </div>

        {/* Email Preview */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {activeTab === 'inquiry' ? 'Inquiry Email Preview' : 'Confirmation Email Preview'}
            </h2>
            <div className="text-sm text-gray-500">
              {activeTab === 'inquiry' ? 'This is what Kim receives' : 'This is what the customer receives'}
            </div>
          </div>
          
          {/* Email Container */}
          <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
            <div className="bg-white max-w-2xl mx-auto">
              <iframe
                src={activeTab === 'inquiry' ? inquiryEmailUrl : confirmationEmailUrl}
                className="w-full h-[800px] border-0"
                title="Email Preview"
              />
            </div>
          </div>

          {/* Sample Data Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Sample Data Used:</h3>
            <pre className="text-xs text-blue-800 overflow-x-auto">
              {JSON.stringify(activeTab === 'inquiry' ? sampleInquiryData : sampleConfirmationData, null, 2)}
            </pre>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="font-semibold text-yellow-900 mb-2">💡 Tips:</h3>
          <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
            <li>This preview uses sample data. Edit the sample data in this file to test different scenarios.</li>
            <li>Email clients may render HTML differently. Test in actual email clients for final verification.</li>
            <li>The preview updates automatically when you modify the email templates.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

