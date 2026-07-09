"use client";

import { useState } from "react";
import menuData from "../data/menu.json";
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

export default function Menu() {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const toggleItemSelection = (categoryId: string, categoryName: string, item: MenuItem) => {
    const isSelected = selectedItems.some(selected => 
      selected.categoryId === categoryId && selected.itemName === item.name
    );

    if (isSelected) {
      setSelectedItems(prev => prev.filter(selected => 
        !(selected.categoryId === categoryId && selected.itemName === item.name)
      ));
    } else {
      setSelectedItems(prev => [...prev, {
        categoryId,
        categoryName,
        itemName: item.name,
        itemDescription: item.description,
        itemPrice: item.price || ''
      }]);
    }
  };

  const isItemSelected = (categoryId: string, itemName: string) => {
    return selectedItems.some(selected => 
      selected.categoryId === categoryId && selected.itemName === itemName
    );
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const handleQuoteRequest = () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one menu item before requesting a quote.');
      return;
    }
    setShowQuoteModal(true);
  };

  const removeItem = (categoryId: string, itemName: string) => {
    setSelectedItems(prev => prev.filter(selected => 
      !(selected.categoryId === categoryId && selected.itemName === itemName)
    ));
  };

  const handlePopupQuoteRequest = () => {
    const itemsParam = encodeURIComponent(JSON.stringify(selectedItems));
    const customQuoteUrl = `/contact/customQuote?items=${itemsParam}`;
    window.location.href = customQuoteUrl;
  };

  return (
    <div className="page-shell">
      {/* Floating Selected Items Popup */}
      <SelectedItemsPopup
        selectedItems={selectedItems}
        onRemoveItem={removeItem}
        onClearAll={clearSelection}
        onRequestQuote={handlePopupQuoteRequest}
      />

      {/* Hero Section */}
      <section className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-6 text-6xl text-[var(--foreground)] md:text-7xl">
            Menu
          </h1>
          <div className="ui-divider" aria-hidden="true"><span /></div>
          <p className="text-lg text-[var(--muted-text)] max-w-2xl mx-auto leading-relaxed">
            Fresh, homemade goodness crafted with love
          </p>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-20">
            {menuData.menuCategories.map((category) => (
              <div key={category.id} className="group">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg width="20" height="20" viewBox="0 0 20 20" className="text-[var(--baguette-medium)] group-hover:text-[var(--baguette-dark)] transition-colors">
                      {/* Outer diamond outline */}
                      <path d="M10 2 L18 10 L10 18 L2 10 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      {/* Inner diamond */}
                      <path d="M10 4 L16 10 L10 16 L4 10 Z" stroke="currentColor" strokeWidth="1" fill="none"/>
                      {/* Center dot */}
                      <circle cx="10" cy="10" r="2" fill="currentColor"/>
                      {/* Corner accents */}
                      <circle cx="10" cy="2" r="1" fill="currentColor"/>
                      <circle cx="18" cy="10" r="1" fill="currentColor"/>
                      <circle cx="10" cy="18" r="1" fill="currentColor"/>
                      <circle cx="2" cy="10" r="1" fill="currentColor"/>
                      {/* Decorative lines */}
                      <path d="M10 2 L10 4" stroke="currentColor" strokeWidth="0.8"/>
                      <path d="M18 10 L16 10" stroke="currentColor" strokeWidth="0.8"/>
                      <path d="M10 18 L10 16" stroke="currentColor" strokeWidth="0.8"/>
                      <path d="M2 10 L4 10" stroke="currentColor" strokeWidth="0.8"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-3xl text-[var(--foreground)]">
                      {category.name}
                    </h3>
                    <p className="text-[var(--muted-text)] mt-2">{category.description}</p>
                  </div>
                </div>

                <div className="ml-16 pl-8 border-l border-[var(--baguette-primary)]/30">
                  <div className="space-y-6">
                    {category.items.map((item, index) => {
                      const isSelected = isItemSelected(category.id, item.name);
                      return (
                        <div key={index} className={`group/item p-5 rounded-2xl border transition-all duration-300 ${
                          isSelected 
                            ? 'border-[var(--baguette-dark)] bg-[var(--baguette-subtle)] shadow-[0_8px_30px_rgba(107,93,79,0.12)]' 
                            : 'border-[var(--muted-medium)] bg-white shadow-[0_4px_20px_rgba(107,93,79,0.05)] hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(107,93,79,0.12)]'
                        }`}>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-medium text-[var(--baguette-dark)] group-hover/item:text-[var(--baguette-dark)] transition-colors">
                              {item.name}
                            </h4>
                          </div>
                          <p className="text-[var(--baguette-muted)] text-sm leading-relaxed mb-3">
                            {item.description}
                          </p>
                          <button
                            onClick={() => toggleItemSelection(category.id, category.name, item)}
                            className={`px-5 py-2 text-sm font-medium rounded-full transition-colors ${
                              isSelected
                                ? 'bg-[var(--baguette-dark)] text-white hover:bg-[var(--baguette-medium)]'
                                : 'bg-white text-[var(--baguette-dark)] border border-[var(--baguette-primary)]/40 hover:bg-[var(--baguette-subtle)]'
                            }`}
                          >
                            {isSelected ? '✓ Selected' : 'Add to Custom Quote'}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {category.addOns && category.addOns.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-[var(--baguette-subtle)]">
                      <h5 className="text-sm font-medium text-[var(--baguette-muted)] mb-4 uppercase tracking-wide">Add-ons</h5>
                      <div className="space-y-4">
                        {category.addOns.map((addon, index) => (
                          <div key={index} className="flex justify-between items-start">
                            <div>
                              <h6 className="text-sm font-medium text-[var(--baguette-dark)]">{addon.name}</h6>
                              <p className="text-xs text-[var(--baguette-muted)]">{addon.description}</p>
                            </div>
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

      {/* Selection Summary */}
      {selectedItems.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--baguette-subtle)]">
          <div className="max-w-4xl mx-auto">
            <div className="ui-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl text-[var(--foreground)]">
                  Selected Items ({selectedItems.length})
                </h2>
                <button
                  onClick={clearSelection}
                  className="text-sm text-[var(--baguette-muted)] hover:text-[var(--baguette-dark)] transition-colors"
                >
                  Clear All
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                {selectedItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-[var(--baguette-subtle)] rounded-lg">
                    <div>
                      <h4 className="font-medium text-[var(--baguette-dark)]">{item.itemName}</h4>
                      <p className="text-sm text-[var(--baguette-muted)]">{item.categoryName}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-[var(--baguette-muted)]">{item.itemPrice}</span>
                      <button
                        onClick={() => toggleItemSelection(item.categoryId, item.categoryName, {
                          name: item.itemName,
                          description: item.itemDescription,
                          price: item.itemPrice
                        })}
                        className="text-[var(--baguette-muted)] hover:text-red-500 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    const itemsParam = encodeURIComponent(JSON.stringify(selectedItems));
                    const customQuoteUrl = `/contact/customQuote?items=${itemsParam}`;
                    window.location.href = customQuoteUrl;
                  }}
                  className="ui-btn-primary"
                >
                  Request Quote for Selected Items
                </button>
                <a 
                  href="tel:403-497-9338" 
                  className="ui-btn-secondary text-center"
                >
                  Call Kim: 403-497-9338
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="ui-cta-panel">
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full border border-white/10" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full border border-white/10" aria-hidden="true" />
            <h2 className="mb-4 text-3xl text-white">
              Custom Menu Planning
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/85">
              Kim is available to customize your menu for any special occasion. 
              Select from any of our menu items or call us for personalized meal planning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleQuoteRequest}
                className="ui-btn-white"
              >
                Request Custom Quote
              </button>
              <a 
                href="tel:403-497-9338" 
                className="ui-btn-outline-white"
              >
                Call Kim: 403-497-9338
              </a>
              <a 
                href="/events" 
                className="ui-btn-outline-white"
              >
                View Events
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Request Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="ui-card max-w-md w-full p-6">
            <h3 className="mb-4 text-xl text-[var(--foreground)]">
              Request Quote
            </h3>
            <p className="text-[var(--baguette-muted)] mb-6">
              You&apos;ve selected {selectedItems.length} menu item{selectedItems.length !== 1 ? 's' : ''}. 
              Kim will contact you with a custom quote based on your selections.
            </p>
            
            <div className="space-y-3 mb-6">
              <h4 className="font-medium text-[var(--baguette-dark)]">Selected Items:</h4>
              {selectedItems.map((item, index) => (
                <div key={index} className="text-sm text-[var(--baguette-muted)]">
                  • {item.itemName} ({item.categoryName})
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowQuoteModal(false);
                  // Redirect to custom quote page with selected items
                  const itemsParam = encodeURIComponent(JSON.stringify(selectedItems));
                  const customQuoteUrl = `/contact/customQuote?items=${itemsParam}`;
                  window.location.href = customQuoteUrl;
                }}
                className="flex-1 ui-btn-primary !px-4 !py-2 !text-sm !normal-case !tracking-normal rounded-full"
              >
                Continue to Quote Form
              </button>
              <button
                onClick={() => setShowQuoteModal(false)}
                className="ui-btn-secondary !px-4 !py-2 !text-sm !normal-case !tracking-normal rounded-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
