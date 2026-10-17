import React, { createContext, useContext, useState, useEffect } from 'react';
import { resortConfig } from '../data/resortConfig';

interface PricingContextType {
  showPrices: boolean;
  setShowPrices: (show: boolean) => void;
  priceMode: 'discounted' | 'brochure';
  setPriceMode: (mode: 'discounted' | 'brochure') => void;
  isDraft: boolean;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export const PricingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showPrices, setShowPrices] = useState<boolean>(() => {
    const saved = localStorage.getItem('sams_eden_show_prices');
    return saved !== null ? JSON.parse(saved) : resortConfig.pricingSettings.showPrices;
  });

  const [priceMode, setPriceMode] = useState<'discounted' | 'brochure'>(() => {
    const saved = localStorage.getItem('sams_eden_price_mode');
    return (saved as 'discounted' | 'brochure') || (resortConfig.pricingSettings.showDiscountedPrices ? 'discounted' : 'brochure');
  });

  useEffect(() => {
    localStorage.setItem('sams_eden_show_prices', JSON.stringify(showPrices));
  }, [showPrices]);

  useEffect(() => {
    localStorage.setItem('sams_eden_price_mode', priceMode);
  }, [priceMode]);

  return (
    <PricingContext.Provider
      value={{
        showPrices,
        setShowPrices,
        priceMode,
        setPriceMode,
        isDraft: resortConfig.pricingSettings.pricesPendingConfirmation,
      }}
    >
      {children}
    </PricingContext.Provider>
  );
};

export const usePricing = () => {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
};
