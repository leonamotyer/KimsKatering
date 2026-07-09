"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import eventsData from "../data/events.json";
import SelectedItemsPopup from "../componenets/selected-items-popup";

interface MenuItem {
  name: string;
  description: string;
  price?: string;
}

interface SelectedItem {
  categoryId: string;
  categoryName: string;
  itemName: string;
  itemDescription: string;
  itemPrice: string;
}

export default function Events() {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const toggleItemSelection = (item: MenuItem, eventName: string) => {
    setSelectedItems(prev => {
      const isSelected = prev.some(selected => selected.itemName === item.name);
      if (isSelected) {
        return prev.filter(selected => selected.itemName !== item.name);
      } else {
        const selectedItem: SelectedItem = {
          categoryId: 'funeral',
          categoryName: eventName,
          itemName: item.name,
          itemDescription: item.description,
          itemPrice: item.price || ''
        };
        return [...prev, selectedItem];
      }
    });
  };

  const isItemSelected = (item: MenuItem) => {
    return selectedItems.some(selected => selected.itemName === item.name);
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const handleQuoteRequest = () => {
    if (selectedItems.length === 0) return;
    
    // Create URL parameter with JSON-encoded selected items (same format as menu page)
    const itemsParam = encodeURIComponent(JSON.stringify(selectedItems));
    const customQuoteUrl = `/contact/customQuote?items=${itemsParam}`;
    router.push(customQuoteUrl);
  };

  const removeItem = (categoryId: string, itemName: string) => {
    setSelectedItems(prev => prev.filter(item => item.itemName !== itemName));
  };

  return (
    <div className="page-shell">
      <section className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-6 text-6xl text-[var(--foreground)] md:text-7xl">
            Events
          </h1>
          <div className="ui-divider" aria-hidden="true"><span /></div>
          <p className="text-lg text-[var(--muted-text)] max-w-2xl mx-auto leading-relaxed">
            {eventsData.generalInfo.philosophy}
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-16">
            {eventsData.events.map((event) => (
              <div key={event.id} className="group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-6 h-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg width="16" height="16" viewBox="0 0 16 16" className="text-[var(--baguette-medium)] group-hover:text-[var(--baguette-dark)] transition-colors">
                        {/* Outer diamond outline */}
                        <path d="M8 2 L14 8 L8 14 L2 8 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        {/* Inner diamond */}
                        <path d="M8 4 L12 8 L8 12 L4 8 Z" stroke="currentColor" strokeWidth="1" fill="none"/>
                        {/* Center dot */}
                        <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                        {/* Corner accents */}
                        <circle cx="8" cy="2" r="0.8" fill="currentColor"/>
                        <circle cx="14" cy="8" r="0.8" fill="currentColor"/>
                        <circle cx="8" cy="14" r="0.8" fill="currentColor"/>
                        <circle cx="2" cy="8" r="0.8" fill="currentColor"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl text-[var(--foreground)]">
                      {event.name}
                    </h3>
                  </div>
                </div>
                
                <div className="ml-16 pl-8 border-l border-[var(--baguette-primary)]/30">
                  <p className="text-[var(--muted-text)] leading-relaxed mb-6">
                    {event.description}
                  </p>
                  
                  {event.customization && (
                    <div className="mb-4">
                      <p className="text-sm text-[var(--baguette-muted)] font-medium mb-1">Customization</p>
                      <p className="text-sm text-[var(--baguette-muted)]">{event.customization}</p>
                    </div>
                  )}
                  
                  {event.capacity && (
                    <div className="mb-4">
                      <p className="text-sm text-[var(--baguette-muted)] font-medium mb-1">Capacity</p>
                      <p className="text-sm text-[var(--baguette-muted)]">{event.capacity}</p>
                    </div>
                  )}

                  {event.specialServices && (
                    <div className="mb-4">
                      <p className="text-sm text-[var(--baguette-muted)] font-medium mb-2">Special Services</p>
                      <ul className="text-sm text-[var(--baguette-muted)] space-y-1">
                        {event.specialServices.map((service, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-[var(--baguette-light)] mr-2">•</span>
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {event.menus && (
                    <div className="mb-4">
                      <p className="text-sm text-[var(--baguette-muted)] font-medium mb-3">Menu Options</p>
                      <div className="space-y-3">
                        {event.menus.map((menu, idx) => (
                          <div key={idx} className="ui-card p-5">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-sm font-medium text-[var(--baguette-dark)]">{menu.name}</h4>
                            </div>
                            <p className="text-sm text-[var(--baguette-muted)] mb-3">{menu.description}</p>
                            <button
                              onClick={() => toggleItemSelection(menu, event.name)}
                              className={`w-full py-2 px-4 text-sm font-medium rounded-full transition-colors ${
                                isItemSelected(menu)
                                  ? 'bg-[var(--baguette-dark)] text-white hover:bg-[var(--baguette-medium)]'
                                  : 'bg-[var(--baguette-subtle)] text-[var(--baguette-dark)] hover:bg-[var(--baguette-light)] border border-[var(--baguette-primary)]/40'
                              }`}
                            >
                              {isItemSelected(menu) ? '✓ Selected' : 'Add to Custom Quote'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="ui-cta-panel">
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full border border-white/10" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full border border-white/10" aria-hidden="true" />
            <h2 className="mb-4 text-3xl text-white">
              Ready to Plan Your Event?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/85">
              {eventsData.generalInfo.customization}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:403-497-9338" 
                className="ui-btn-white"
              >
                Call Kim: 403-497-9338
              </a>
              <a 
                href="/menu" 
                className="ui-btn-outline-white"
              >
                View Menu
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Items Popup */}
      {selectedItems.length > 0 && (
        <SelectedItemsPopup
          selectedItems={selectedItems}
          onRemoveItem={removeItem}
          onClearAll={clearSelection}
          onRequestQuote={handleQuoteRequest}
        />
      )}
    </div>
  );
}
