"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import VictorianBorder from "../../componenets/victorian-animation";

interface SelectedItem {
  categoryId: string;
  categoryName: string;
  itemName: string;
  itemDescription: string;
  itemPrice: string;
}

function CustomQuoteForm() {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    dietaryRestrictions: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const searchParams = useSearchParams();

  // Parse selected items from URL parameters
  useEffect(() => {
    const itemsParam = searchParams.get('items');
    if (itemsParam) {
      try {
        // Try to parse as JSON first (from menu page)
        const parsedItems = JSON.parse(decodeURIComponent(itemsParam));
        setSelectedItems(parsedItems);
      } catch {
        // Fallback: parse individual item parameters (from events page)
        const items: SelectedItem[] = [];
        let index = 0;
        while (true) {
          const itemParam = searchParams.get(`item${index}`);
          if (!itemParam) break;
          
          const [itemName, itemDescription, itemPrice] = itemParam.split('|');
          items.push({
            categoryId: 'funeral',
            categoryName: 'Funerals',
            itemName: itemName || '',
            itemDescription: itemDescription || '',
            itemPrice: itemPrice || ''
          });
          index++;
        }
        setSelectedItems(items);
      }
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Auto-capitalize name field
    let processedValue = value;
    if (name === 'name') {
      processedValue = value.replace(/\b\w/g, (char) => char.toUpperCase());
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const removeItem = (categoryId: string, itemName: string) => {
    setSelectedItems(prev => prev.filter(item => 
      !(item.categoryId === categoryId && item.itemName === itemName)
    ));
  };

  const clearAllItems = () => {
    setSelectedItems([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          message: formData.message, // Don't add selected items to message - they'll be displayed separately in email template
          hasMenuSelections: selectedItems.length > 0,
          selectedItems: selectedItems // Pass selected items separately
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          eventDate: '',
          guestCount: '',
          dietaryRestrictions: '',
          message: ''
        });
        setSelectedItems([]);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-light text-[var(--baguette-dark)] mb-8 tracking-tight">
            Custom Quote
          </h1>
          <div className="w-24 h-0.5 bg-gray-300 mx-auto mb-8"></div>
          <p className="text-lg text-[var(--baguette-muted)] max-w-2xl mx-auto leading-relaxed">
            Get a personalized quote for your selected menu items
          </p>
        </div>
      </section>

      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Contact Form */}
          <div className="bg-[var(--background)] rounded-lg shadow-lg border border-[var(--baguette-light)] p-6 mb-8">
              <h2 className="text-2xl font-light text-[var(--baguette-dark)] mb-6">
                Contact Information
              </h2>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">
                    Thank you! Your quote request has been sent. Kim will contact you soon.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">
                    There was an error sending your request. Please try again or call us directly.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-[var(--baguette-light)] rounded-md focus:ring-2 focus:ring-[var(--baguette-primary)] focus:border-transparent bg-[var(--background)] text-[var(--foreground)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-[var(--baguette-light)] rounded-md focus:ring-2 focus:ring-[var(--baguette-primary)] focus:border-transparent bg-[var(--background)] text-[var(--foreground)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[var(--baguette-light)] rounded-md focus:ring-2 focus:ring-[var(--baguette-primary)] focus:border-transparent bg-[var(--background)] text-[var(--foreground)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="eventType" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                      Event Type
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[var(--baguette-light)] rounded-md focus:ring-2 focus:ring-[var(--baguette-primary)] focus:border-transparent bg-[var(--background)] text-[var(--foreground)]"
                    >
                      <option value="">Select event type</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Corporate Event">Corporate Event</option>
                      <option value="Birthday Party">Birthday Party</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Holiday Party">Holiday Party</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                      Event Date
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[var(--baguette-light)] rounded-md focus:ring-2 focus:ring-[var(--baguette-primary)] focus:border-transparent bg-[var(--background)] text-[var(--foreground)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="guestCount" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                      Guest Count
                    </label>
                    <input
                      type="number"
                      id="guestCount"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-4 py-2 border border-[var(--baguette-light)] rounded-md focus:ring-2 focus:ring-[var(--baguette-primary)] focus:border-transparent bg-[var(--background)] text-[var(--foreground)]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    Dietary Restrictions & Allergies
                  </label>
                  <textarea
                    id="dietaryRestrictions"
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Please list any dietary restrictions, allergies, or special dietary needs for your guests..."
                    className="w-full px-4 py-2 border border-[var(--baguette-light)] rounded-md focus:ring-2 focus:ring-[var(--baguette-primary)] focus:border-transparent bg-[var(--background)] text-[var(--foreground)] resize-vertical"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    Additional Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us more about your event or any special requests..."
                    className="w-full px-4 py-2 border border-[var(--baguette-light)] rounded-md focus:ring-2 focus:ring-[var(--baguette-primary)] focus:border-transparent bg-[var(--background)] text-[var(--foreground)] resize-vertical"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-[var(--baguette-dark)] text-[var(--background)] px-6 py-3 text-sm font-medium hover:bg-[var(--baguette-medium)] transition-colors tracking-wide uppercase rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Request Quote'}
                  </button>
                  <a 
                    href="tel:403-497-9338" 
                    className="border border-[var(--baguette-light)] text-[var(--baguette-dark)] px-6 py-3 text-sm font-medium hover:bg-[var(--baguette-subtle)] transition-colors tracking-wide uppercase rounded-md text-center"
                  >
                    Call Kim: 403-497-9338
                  </a>
                </div>
              </form>
          </div>

          {/* Selected Items Panel */}
          <div className="bg-[var(--background)] rounded-lg shadow-lg border border-[var(--baguette-light)] p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light text-[var(--baguette-dark)]">
                Selected Items ({selectedItems.length})
              </h2>
              {selectedItems.length > 0 && (
                <button
                  onClick={clearAllItems}
                  className="text-sm text-[var(--baguette-muted)] hover:text-[var(--baguette-dark)] transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            {selectedItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-[var(--baguette-muted)] mb-4">No items selected</p>
                <a 
                  href="/menu" 
                  className="inline-block bg-[var(--baguette-dark)] text-[var(--background)] px-6 py-2 text-sm font-medium hover:bg-[var(--baguette-medium)] transition-colors rounded-md"
                >
                  Browse Menu
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedItems
                  .sort((a, b) => {
                    // Sort by category name first, then by item name
                    if (a.categoryName !== b.categoryName) {
                      return a.categoryName.localeCompare(b.categoryName);
                    }
                    return a.itemName.localeCompare(b.itemName);
                  })
                  .map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-start justify-between p-3 bg-[var(--baguette-subtle)] rounded-lg border border-[var(--baguette-light)]"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-[var(--foreground)] text-sm truncate">
                        {item.itemName}
                      </h4>
                      <p className="text-xs text-[var(--muted-text)] truncate">
                        {item.categoryName}
                      </p>
                      <p className="text-xs font-medium text-[var(--baguette-primary)] mt-1">
                        {item.itemPrice}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.categoryId, item.itemName)}
                      className="ml-2 text-[var(--muted-text)] hover:text-[var(--baguette-dark)] transition-colors text-xs flex-shrink-0"
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Victorian Page Border */}
      <VictorianBorder />
    </div>
  );
}

export default function CustomQuote() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomQuoteForm />
    </Suspense>
  );
}
