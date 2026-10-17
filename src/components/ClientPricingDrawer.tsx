import React, { useState } from 'react';
import { usePricing } from '../context/PricingContext';
import { Sliders, Eye, EyeOff, ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';

export const ClientPricingDrawer: React.FC = () => {
  const { showPrices, setShowPrices, priceMode, setPriceMode } = usePricing();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-[max(4.5rem,calc(env(safe-area-inset-bottom,0px)+4.5rem))] sm:bottom-24 left-[max(0.75rem,calc(env(safe-area-inset-left,0px)+0.75rem))] sm:left-4 z-40 max-w-[calc(100vw-1.5rem)] sm:max-w-sm">
      {/* Minimized Pill */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-forest-900/90 text-white text-xs font-medium px-3.5 py-2 rounded-full shadow-lg border border-gold/40 hover:bg-forest-950 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          title="Client Pricing Configuration Panel"
        >
          <Sliders className="w-3.5 h-3.5 text-gold flex-shrink-0" />
          <span>Pricing Settings</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
        </button>
      ) : (
        /* Expanded Control Card - constrained to viewport width on small phones */
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-forest-900/20 p-3.5 sm:p-4 text-stone-800 animate-fade-in w-[calc(100vw-1.5rem)] max-w-xs sm:w-80">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-forest-800 flex-shrink-0" />
              <h4 className="font-serif font-bold text-sm text-forest-950">Client Pricing Mode</h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-stone-100 rounded-lg text-stone-500 hover:text-stone-800 min-w-[32px] min-h-[32px] flex items-center justify-center"
              aria-label="Close pricing controls"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 space-y-3 text-xs">
            {/* Toggle 1: Show/Hide Prices */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-stone-900">Display Prices</p>
                <p className="text-[11px] text-stone-700">Hide until client approves</p>
              </div>
              <button
                onClick={() => setShowPrices(!showPrices)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition-colors ${
                  showPrices
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-stone-200 text-stone-700 border border-stone-300'
                }`}
              >
                {showPrices ? (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Visible</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Hidden</span>
                  </>
                )}
              </button>
            </div>

            {/* Toggle 2: Discounted vs Brochure */}
            {showPrices && (
              <div className="pt-2 border-t border-stone-100">
                <p className="font-semibold text-stone-900 mb-1.5">Active Rate Card</p>
                <div className="grid grid-cols-2 gap-1.5 bg-stone-100 p-1 rounded-xl">
                  <button
                    onClick={() => setPriceMode('discounted')}
                    className={`py-1.5 text-center rounded-lg font-medium transition-all ${
                      priceMode === 'discounted'
                        ? 'bg-forest-800 text-white shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Discounted (Draft)
                  </button>
                  <button
                    onClick={() => setPriceMode('brochure')}
                    className={`py-1.5 text-center rounded-lg font-medium transition-all ${
                      priceMode === 'brochure'
                        ? 'bg-forest-800 text-white shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Brochure Card
                  </button>
                </div>
              </div>
            )}

            {/* Notice regarding provisional prices */}
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] leading-tight">
                All draft prices are configured in <code className="font-mono bg-white px-1 rounded">resortConfig.ts</code>. Couple Cottage charging basis is pending client confirmation.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100 flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="text-[11px] font-semibold text-forest-800 hover:underline flex items-center gap-1"
            >
              <span>Minimize Panel</span>
              <ChevronUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
