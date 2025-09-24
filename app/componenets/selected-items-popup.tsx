"use client";

import { useState, useEffect } from "react";

interface SelectedItem {
  categoryId: string;
  categoryName: string;
  itemName: string;
  itemDescription: string;
  itemPrice: string;
}

interface SelectedItemsPopupProps {
  selectedItems: SelectedItem[];
  onRemoveItem: (categoryId: string, itemName: string) => void;
  onClearAll: () => void;
  onRequestQuote: () => void;
}

export default function SelectedItemsPopup({
  selectedItems,
  onRemoveItem,
  onClearAll,
  onRequestQuote
}: SelectedItemsPopupProps) {
  const [isExpanded, setIsExpanded] = useState(true); // Auto-open by default
  const [screenSize, setScreenSize] = useState<'mobile' | 'desktop'>('desktop');

  // Auto-expand when first item is selected
  useEffect(() => {
    if (selectedItems.length === 1) {
      setIsExpanded(true);
    }
  }, [selectedItems.length]);

  // Check screen size and adjust behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const isMobile = window.innerWidth < 768;
      setScreenSize(isMobile ? 'mobile' : 'desktop');
      
      // On mobile, minimize by default; on desktop, keep expanded
      if (isMobile) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 left-4 z-50 transition-all duration-300">
      {/* Main Popup Container */}
      <div 
        className={`bg-[var(--background)] rounded-lg shadow-lg border border-[var(--baguette-light)] transition-all duration-300 ${
          isExpanded 
            ? screenSize === 'mobile' ? 'w-72' : 'w-80' 
            : 'w-16'
        }`}
        style={{
          maxHeight: 'calc(100vh - 6rem)',
          overflow: 'hidden'
        }}
      >
        {/* Header - Always Visible */}
        <div 
          className={`bg-[var(--baguette-dark)] text-[var(--background)] p-3 rounded-t-lg flex items-center justify-between ${
            screenSize === 'mobile' ? 'cursor-pointer' : ''
          }`}
          onClick={() => {
            // Only allow collapsing on mobile screens
            if (screenSize === 'mobile') {
              setIsExpanded(!isExpanded);
            }
          }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-[var(--background)] rounded-full flex items-center justify-center">
              <span className="text-[var(--baguette-dark)] text-sm font-bold">
                {selectedItems.length}
              </span>
            </div>
            {isExpanded && (
              <span className="text-sm font-medium">Selected Items</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {isExpanded && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClearAll();
                }}
                className="text-[var(--background)] hover:text-[var(--baguette-light)] transition-colors text-xs"
                title="Clear All"
              >
                ✕
              </button>
            )}
            {screenSize === 'mobile' && (
              <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                ▼
              </div>
            )}
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="p-4 max-h-96 overflow-y-auto">
            {/* Items List */}
            <div className="space-y-3 mb-4">
              {selectedItems.map((item, index) => (
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
                    onClick={() => onRemoveItem(item.categoryId, item.itemName)}
                    className="ml-2 text-[var(--muted-text)] hover:text-[var(--baguette-dark)] transition-colors text-xs flex-shrink-0"
                    title="Remove item"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={onRequestQuote}
                className="w-full bg-[var(--baguette-dark)] text-[var(--background)] px-4 py-2 text-sm font-medium hover:bg-[var(--baguette-medium)] transition-colors rounded-md"
              >
                Request Quote ({selectedItems.length} items)
              </button>
              <button
                onClick={onClearAll}
                className="w-full border border-[var(--baguette-light)] text-[var(--foreground)] px-4 py-2 text-sm font-medium hover:bg-[var(--baguette-subtle)] transition-colors rounded-md"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Collapsed State Indicator - Only on Mobile */}
      {screenSize === 'mobile' && !isExpanded && (
        <div className="mt-2 text-center">
          <div className="w-2 h-2 bg-[var(--baguette-primary)] rounded-full mx-auto animate-pulse"></div>
        </div>
      )}
    </div>
  );
}
