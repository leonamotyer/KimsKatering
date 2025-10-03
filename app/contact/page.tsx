"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import VictorianBorder from "../componenets/victorian-animation";

function ContactForm() {
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    dietaryRestrictions: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle URL parameters for pre-filling form
  useEffect(() => {
    const messageParam = searchParams.get('message');
    const eventTypeParam = searchParams.get('eventType');
    const guestCountParam = searchParams.get('guestCount');
    
    if (messageParam || eventTypeParam || guestCountParam) {
      setFormData(prev => ({
        ...prev,
        message: messageParam ? decodeURIComponent(messageParam) : prev.message,
        eventType: eventTypeParam ? decodeURIComponent(eventTypeParam) : prev.eventType,
        guestCount: guestCountParam ? decodeURIComponent(guestCountParam) : prev.guestCount,
      }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    let value = e.target.value;
    
    // Auto-capitalize name field
    if (e.target.name === 'name') {
      value = value.replace(/\b\w/g, (char) => char.toUpperCase());
    }
    
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('📝 Form submitted with data:', formData);
    setIsSubmitting(true);
    
    try {
      console.log('📤 Sending request to /api/send-email...');
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);
      
      const result = await response.json();
      console.log('📡 Response data:', result);

      if (response.ok) {
        console.log('✅ Email sent successfully!');
        setIsSubmitted(true);
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            eventType: "",
            eventDate: "",
            guestCount: "",
            dietaryRestrictions: "",
            message: ""
          });
        }, 5000);
      } else {
        console.error('❌ Error sending email:', result.error);
        console.error('❌ Full error result:', result);
        alert(`Sorry, there was an error sending your message: ${result.error || result.details || 'Unknown error'}. Please try again or call us directly at 403-497-9338.`);
      }
    } catch (error) {
      console.error('❌ Network/parsing error:', error);
      alert('Sorry, there was an error sending your message. Please try again or call us directly at 403-497-9338.');
    } finally {
      console.log('🏁 Form submission process completed');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-light text-[var(--baguette-dark)] mb-8 tracking-tight">
            Contact
          </h1>
          <div className="w-24 h-0.5 bg-gray-300 mx-auto mb-8"></div>
          <p className="text-lg text-[var(--baguette-muted)] max-w-2xl mx-auto leading-relaxed">
            Ready to plan your special event? Get in touch with Kim for personalized consultation and custom Catering.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--baguette-subtle)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-[var(--baguette-dark)] mb-8">
              Get In Touch
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Phone Contact */}
            <div className="text-center">
              <a 
                href="tel:403-497-9338" 
                className="w-16 h-16 bg-white rounded-full mx-auto mb-6 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <svg className="w-8 h-8 text-[var(--baguette-light)] hover:text-[var(--baguette-primary)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
              <h3 className="text-xl font-medium text-[var(--baguette-dark)] mb-4">Call Kim Directly</h3>
              <a 
                href="tel:403-497-9338" 
                className="text-2xl font-light text-[var(--baguette-muted)] hover:text-[var(--baguette-dark)] transition-colors block mb-2"
              >
                403-497-9338
              </a>
              <p className="text-sm text-[var(--baguette-muted)]">Available for consultations and quotes</p>
            </div>

            {/* Email Contact */}
            <div className="text-center">
              <a 
                href="mailto:kim@kimsCatering.ca" 
                className="w-16 h-16 bg-white rounded-full mx-auto mb-6 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <svg className="w-8 h-8 text-[var(--baguette-light)] hover:text-[var(--baguette-primary)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <h3 className="text-xl font-medium text-[var(--baguette-dark)] mb-4">Send an Email</h3>
              <a 
                href="mailto:kim@kimsCatering.ca" 
                className="text-lg font-light text-[var(--baguette-muted)] hover:text-[var(--baguette-dark)] transition-colors block mb-2"
              >
                kim@kimsCatering.ca
              </a>
              <p className="text-sm text-[var(--baguette-muted)]">We&apos;ll respond within 24 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-[var(--baguette-dark)] mb-4">
              Request a Quote
            </h2>
            <p className="text-[var(--baguette-muted)]">
              Tell us about your event and we&apos;ll create a custom Catering plan just for you.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-[var(--baguette-dark)] mb-2">Thank You!</h3>
              <p className="text-[var(--baguette-muted)] mb-4">We&apos;ve received your message and Kim will get back to you within 24 hours.</p>
              <p className="text-sm text-[var(--baguette-muted)]">You should also receive a confirmation email shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--baguette-dark)] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[var(--baguette-light)] rounded-lg focus:ring-2 focus:ring-[var(--baguette-primary)] focus:border-transparent transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--baguette-dark)] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[var(--baguette-light)] rounded-lg focus:ring-2 focus:ring-[var(--baguette-primary)] focus:border-transparent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[var(--baguette-dark)] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[var(--baguette-light)] rounded-lg focus:ring-2 focus:ring-[var(--baguette-primary)] focus:border-transparent transition-colors"
                    placeholder="(403) 555-0123"
                  />
                </div>
                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium text-[var(--baguette-dark)] mb-2">
                    Event Type
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[var(--baguette-light)] rounded-lg focus:ring-2 focus:ring-[var(--baguette-primary)] focus:border-transparent transition-colors"
                  >
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="birthday">Birthday</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="funeral">Funeral/Celebration of Life</option>
                    <option value="family-reunion">Family Reunion</option>
                    <option value="fundraiser">Fundraiser</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium text-[var(--baguette-dark)] mb-2">
                    Event Date
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[var(--baguette-light)] rounded-lg focus:ring-2 focus:ring-[var(--baguette-primary)] focus:border-transparent transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="guestCount" className="block text-sm font-medium text-[var(--baguette-dark)] mb-2">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    id="guestCount"
                    name="guestCount"
                    min="1"
                    value={formData.guestCount}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[var(--baguette-light)] rounded-lg focus:ring-2 focus:ring-[var(--baguette-primary)] focus:border-transparent transition-colors"
                    placeholder="50"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-[var(--baguette-dark)] mb-2">
                  Dietary Restrictions & Allergies
                </label>
                <textarea
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  rows={3}
                  value={formData.dietaryRestrictions}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[var(--baguette-light)] rounded-lg focus:ring-2 focus:ring-[var(--baguette-primary)] focus:border-transparent transition-colors resize-none"
                  placeholder="Please list any dietary restrictions, allergies, or special dietary needs for your guests..."
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--baguette-dark)] mb-2">
                  Tell us about your event
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[var(--baguette-light)] rounded-lg focus:ring-2 focus:ring-[var(--baguette-primary)] focus:border-transparent transition-colors resize-none"
                  placeholder="Please share any specific requirements or special requests for your event..."
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[var(--baguette-dark)] text-white px-8 py-4 text-sm font-medium hover:bg-[var(--baguette-medium)] disabled:bg-[var(--baguette-light)] transition-colors tracking-wide uppercase"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--baguette-subtle)]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-lg font-medium text-[var(--baguette-dark)] mb-2">Response Time</h3>
              <p className="text-[var(--baguette-muted)]">We typically respond within 24 hours</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[var(--baguette-dark)] mb-2">Free Consultation</h3>
              <p className="text-[var(--baguette-muted)]">Complimentary event planning consultation</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[var(--baguette-dark)] mb-2">Custom Menus</h3>
              <p className="text-[var(--baguette-muted)]">Personalized Catering for your special day</p>
            </div>
          </div>
        </div>
      </section>

      {/* Victorian Page Border */}
      <VictorianBorder />
    </div>
  );
}

export default function Contact() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactForm />
    </Suspense>
  );
}
