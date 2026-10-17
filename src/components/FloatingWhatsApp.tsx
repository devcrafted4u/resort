import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { resortConfig, getWhatsAppUrl } from '../data/resortConfig';

export const FloatingWhatsApp: React.FC = () => {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  return (
    <div className="fixed bottom-[max(1rem,calc(env(safe-area-inset-bottom,0px)+1rem))] sm:bottom-6 right-[max(0.875rem,calc(env(safe-area-inset-right,0px)+0.875rem))] sm:right-6 z-40 flex items-center gap-3 pointer-events-none">
      {/* Gentle Tooltip callout (Desktop/Tablet only) */}
      {!tooltipDismissed && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-forest-950 px-3.5 py-2 rounded-2xl shadow-xl border border-stone-200 text-xs font-medium animate-bounce duration-1000 pointer-events-auto">
          <span>Need help planning? Chat on WhatsApp</span>
          <button
            onClick={() => setTooltipDismissed(true)}
            className="text-stone-600 hover:text-stone-900 ml-1 p-0.5 rounded-full hover:bg-stone-100"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button with min 48px touch target */}
      <a
        href={getWhatsAppUrl("Hello Sams Eden Resorts! I would like to enquire about your packages and booking availability.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Sams Eden Resorts on WhatsApp"
        className="pointer-events-auto group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3 sm:h-3.5 sm:w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 sm:h-3.5 sm:w-3.5 bg-emerald-300 border-2 border-white"></span>
        </span>
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
      </a>
    </div>
  );
};
