import React, { useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { GalleryItem } from '../types';

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  if (currentIndex === null || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const activeThumbRef = useRef<HTMLButtonElement>(null);

  // Circular navigation helpers
  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    },
    [handlePrev, handleNext, onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, [handleKeyDown]);

  // Keep active thumbnail centered in the scroll strip
  useEffect(() => {
    if (activeThumbRef.current) {
      activeThumbRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [currentIndex]);

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Media Lightbox"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between select-none animate-fade-in pt-[max(0.75rem,env(safe-area-inset-top,0.75rem))] pb-[max(0.75rem,env(safe-area-inset-bottom,0.75rem))] pl-[max(0.75rem,env(safe-area-inset-left,0.75rem))] pr-[max(0.75rem,env(safe-area-inset-right,0.75rem))]"
    >
      {/* 1. Top Header Bar with Safe Spacing */}
      <div className="w-full flex items-center justify-between text-white/90 py-2 px-2 sm:px-4 z-20">
        <div className="flex items-center gap-3">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-gold bg-forest-900/90 px-3 py-1 rounded-full border border-gold/40 shadow-sm">
            {currentItem.category}
          </span>
          <span className="text-xs text-stone-300 font-mono tracking-wider">
            {currentIndex + 1} / {items.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold"
          aria-label="Close full-screen view"
          title="Close (Escape)"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* 2. Fixed Screen-Centered Navigation Arrows (Safe from Notch / Dynamic Island) */}
      <button
        onClick={handlePrev}
        className="fixed left-[max(0.75rem,calc(env(safe-area-inset-left,0px)+0.75rem))] top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-forest-950/80 hover:bg-forest-900 text-gold-light hover:text-white border-2 border-gold/40 hover:border-gold flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-200 transform hover:scale-110 active:scale-95 focus:outline-none"
        aria-label="Previous image"
        title="Previous (Arrow Left)"
      >
        <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
      </button>

      <button
        onClick={handleNext}
        className="fixed right-[max(0.75rem,calc(env(safe-area-inset-right,0px)+0.75rem))] top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-forest-950/80 hover:bg-forest-900 text-gold-light hover:text-white border-2 border-gold/40 hover:border-gold flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-200 transform hover:scale-110 active:scale-95 focus:outline-none"
        aria-label="Next image"
        title="Next (Arrow Right)"
      >
        <ChevronRight className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* 3. Main Stage Container with Constant Height */}
      <div
        className="relative w-full flex-1 flex items-center justify-center my-1 max-h-[65svh] sm:max-h-[72vh] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          key={currentItem.id}
          className="relative max-w-5xl max-h-full flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl animate-fade-in"
        >
          {currentItem.type === 'video' ? (
            <video
              src={currentItem.src}
              controls
              autoPlay
              playsInline
              webkit-playsinline="true"
              className="max-h-[62svh] sm:max-h-[70vh] max-w-[85vw] sm:max-w-4xl rounded-2xl object-contain bg-black"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={currentItem.src}
              alt={currentItem.title}
              className="max-h-[65vh] sm:max-h-[70vh] max-w-[85vw] sm:max-w-4xl object-contain rounded-2xl transition-all duration-300"
            />
          )}
        </div>
      </div>

      {/* 4. Fixed-Height Caption & Thumbnail Strip (Prevents vertical shifts) */}
      <div className="w-full max-w-4xl flex flex-col items-center gap-1.5 text-center text-white pb-1 z-20">
        <div className="min-h-[48px] sm:min-h-[54px] flex flex-col items-center justify-center px-4">
          <h3 className="font-serif text-base sm:text-lg font-bold tracking-wide text-cream-50">
            {currentItem.title}
          </h3>
          {currentItem.caption && (
            <p className="text-xs text-stone-300 max-w-2xl line-clamp-2 mt-0.5 font-light">
              {currentItem.caption}
            </p>
          )}
        </div>

        {/* Thumbnail Strip with Auto-centering */}
        <div
          ref={thumbnailContainerRef}
          className="flex gap-2 mt-1 overflow-x-auto max-w-full py-2 px-3 no-scrollbar"
        >
          {items.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={item.id}
                ref={isActive ? activeThumbRef : null}
                onClick={() => onNavigate(idx)}
                className={`relative flex-shrink-0 w-13 h-13 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  isActive
                    ? 'border-gold scale-105 opacity-100 shadow-lg ring-2 ring-gold/40'
                    : 'border-white/10 opacity-50 hover:opacity-90 hover:border-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}: ${item.title}`}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to item.src if thumbnail fails
                    if ((e.target as HTMLImageElement).src !== item.src) {
                      (e.target as HTMLImageElement).src = item.src;
                    }
                  }}
                />
                {item.type === 'video' && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 text-gold fill-gold" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
