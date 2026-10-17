import React from 'react';
import { usePricing } from '../context/PricingContext';
import { PackagePricing } from '../types';
import { formatINR } from '../lib/utils';
import { MessageCircle, Info } from 'lucide-react';
import { getWhatsAppUrl } from '../data/resortConfig';

interface PriceBadgeProps {
  pricing: PackagePricing;
  itemTitle?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PriceBadge: React.FC<PriceBadgeProps> = ({
  pricing,
  itemTitle,
  size = 'md',
  className = '',
}) => {
  const { showPrices, priceMode, isDraft } = usePricing();

  if (!showPrices) {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
          Price on Request
        </span>
        <a
          href={getWhatsAppUrl(`Hello Sams Eden Resorts! Please share current pricing and package details for ${itemTitle || 'this package'}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-1 underline underline-offset-2"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Ask on WhatsApp</span>
        </a>
      </div>
    );
  }

  const activePrice = priceMode === 'discounted' ? pricing.discountedPrice : (pricing.brochurePrice || pricing.discountedPrice);
  const showDiscountSavings = priceMode === 'discounted' && pricing.brochurePrice && pricing.brochurePrice > pricing.discountedPrice;

  const fontSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl font-bold',
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
        {showDiscountSavings && (
          <span className="text-xs line-through text-stone-500 font-medium">
            {formatINR(pricing.brochurePrice!)}
          </span>
        )}
        <span className={`font-serif font-bold text-forest-900 ${fontSizes[size]}`}>
          {formatINR(activePrice)}
        </span>
        <span className="text-xs text-stone-700 font-medium">
          / {pricing.unit}
        </span>
      </div>

      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
        {showDiscountSavings && (
          <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Special Discount
          </span>
        )}
        {pricing.taxInclusive && (
          <span className="text-[10px] sm:text-[11px] font-medium text-forest-800 bg-forest-50 px-2 py-0.5 rounded border border-forest-200">
            Taxes Included
          </span>
        )}
        {isDraft && pricing.status === 'provisional' && (
          <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 flex items-center gap-0.5" title="Provisional rate">
            <Info className="w-2.5 h-2.5" />
            <span>Pending Confirmation</span>
          </span>
        )}
      </div>

      {pricing.notes && (
        <span className="text-[10px] sm:text-[11px] text-stone-600 mt-1 italic leading-tight">
          {pricing.notes}
        </span>
      )}
    </div>
  );
};
