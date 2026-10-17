import React from 'react';

interface ResortLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showTagline?: boolean;
}

export const ResortLogo: React.FC<ResortLogoProps> = ({
  variant = 'light',
  className = '',
  showTagline = true,
}) => {
  const isDark = variant === 'dark';

  return (
    <a href="#" className={`flex items-center gap-2.5 sm:gap-3 group ${className}`}>
      {/* Real Emblem Image */}
      <div className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 flex-shrink-0 rounded-full overflow-hidden bg-white/95 p-1 shadow-sm border border-gold/40">
        <img
          src="/logo/logo-transparent.png"
          alt="Sam Eden Resort Emblem"
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col min-w-0">
        <span
          className={`font-serif tracking-wider font-bold text-base sm:text-lg md:text-xl leading-none truncate ${
            isDark ? 'text-white' : 'text-forest-900'
          }`}
        >
          SAM EDEN
        </span>
        <span
          className={`text-[9px] sm:text-[10px] tracking-[0.25em] font-semibold uppercase mt-0.5 ${
            isDark ? 'text-gold-light' : 'text-gold-dark'
          }`}
        >
          RESORT
        </span>
        {showTagline && (
          <span
            className={`text-[9px] italic font-serif tracking-wide hidden md:inline-block ${
              isDark ? 'text-stone-300' : 'text-stone-600'
            }`}
          >
            Escape • Explore • Experience
          </span>
        )}
      </div>
    </a>
  );
};
