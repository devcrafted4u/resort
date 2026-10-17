import React, { useState } from 'react';
import { ArrowRight, Compass, ShieldCheck, Sparkles, MapPin, Play } from 'lucide-react';
import { scrollToSection } from '../lib/utils';
import { resortConfig } from '../data/resortConfig';

export const HeroSection: React.FC = () => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-[88vh] min-h-[88svh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-forest-950 text-white w-full"
    >
      {/* Background Media */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {isPlayingVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
            ref={(el) => {
              if (el) {
                el.muted = true;
                el.volume = 0;
              }
            }}
            poster="/images/pool/resort-pool.webp"
            className="w-full h-full object-cover object-center pointer-events-none"
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src="/videos/resort-video-1.mp4" type="video/mp4" />
          </video>
        ) : (
          <img
            src="/images/pool/resort-pool.webp"
            alt="Sams Eden Resorts Swimming Pool and Grounds"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        )}

        {/* Multi-layered Dark Overlay for High Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/75 to-forest-950/65" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-forest-950/30 to-forest-950/90" />
      </div>

      {/* Video Control Pill (Top Right, responsive positioning - strictly silent ambient video) */}
      <div className="absolute top-[max(4.75rem,calc(env(safe-area-inset-top,0px)+3.75rem))] sm:top-24 right-[max(0.75rem,calc(env(safe-area-inset-right,0px)+0.75rem))] sm:right-6 lg:right-8 z-20 flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={() => setIsPlayingVideo(!isPlayingVideo)}
          className="flex items-center gap-1.5 sm:gap-2 bg-black/50 hover:bg-black/70 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/20 text-[11px] sm:text-xs font-medium text-cream-100 transition-all active:scale-95 shadow-md min-h-[38px]"
          title={isPlayingVideo ? "Switch to Photo Background" : "Play Resort Drone Video (Silent Ambient)"}
        >
          <Play className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isPlayingVideo ? 'text-gold fill-gold' : 'text-white'}`} />
          <span>{isPlayingVideo ? "Photo" : "Video Tour"}</span>
        </button>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-16 flex flex-col items-center w-full">
        {/* Destination Pill */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-forest-900/85 border border-gold/40 text-gold-light text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide mb-4 sm:mb-6 backdrop-blur-md animate-fade-in max-w-full">
          <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0" />
          <span className="truncate">Premier Tropical Nature Resort</span>
          <span className="hidden xs:inline-block text-white/40">•</span>
          <span className="hidden xs:inline-flex items-center gap-1 text-white/90">
            <MapPin className="w-3 h-3 text-gold" /> Karnataka
          </span>
        </div>

        {/* Responsive Headline with Fluid Typography */}
        <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-cream-50 leading-[1.12] mb-4 sm:mb-6 max-w-4xl drop-shadow-md">
          Escape the Ordinary. <br />
          <span className="italic font-normal text-gold-light">Embrace Nature.</span>
        </h1>

        {/* Description */}
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-cream-200 max-w-xl mx-auto font-light leading-relaxed mb-8 sm:mb-10 drop-shadow">
          Discover a refreshing getaway filled with adventure, relaxation, and memorable experiences at Sams Eden Resorts.
        </p>

        {/* Dual Primary & Secondary CTAs (Stacked on mobile, side-by-side on sm+) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mb-10 sm:mb-14 max-w-xs sm:max-w-none mx-auto">
          <button
            onClick={() => scrollToSection('packages')}
            className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-forest-950 font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-xs sm:text-sm md:text-base group"
          >
            <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-forest-950 group-hover:rotate-45 transition-transform duration-300 flex-shrink-0" />
            <span>Explore the Resort</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-forest-950 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </button>

          <button
            onClick={() => scrollToSection('enquiry')}
            className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-cream-50 font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-white/30 backdrop-blur-md transition-all text-xs sm:text-sm md:text-base hover:border-gold/60 active:scale-95"
          >
            <span>Book Your Experience</span>
          </button>
        </div>

        {/* Three Compact Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 w-full max-w-4xl border-t border-white/15 pt-6 sm:pt-8 text-left">
          <div className="flex items-start gap-3 bg-forest-900/60 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 backdrop-blur-sm hover:border-gold/30 transition-colors">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gold/20 flex items-center justify-center text-gold flex-shrink-0">
              <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-white text-sm sm:text-base">Adventure Activities</h4>
              <p className="text-[11px] sm:text-xs text-cream-300 mt-0.5 sm:mt-1 leading-snug">
                14 rope obstacles, zipline, wall climbing tower & archery.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-forest-900/60 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 backdrop-blur-sm hover:border-gold/30 transition-colors">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gold/20 flex items-center justify-center text-gold flex-shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-white text-sm sm:text-base">Relaxing Stays</h4>
              <p className="text-[11px] sm:text-xs text-cream-300 mt-0.5 sm:mt-1 leading-snug">
                22-hour experiences in cottages, dormitory, or camping tents.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-forest-900/60 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 backdrop-blur-sm hover:border-gold/30 transition-colors">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gold/20 flex items-center justify-center text-gold flex-shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-white text-sm sm:text-base">Group Experiences</h4>
              <p className="text-[11px] sm:text-xs text-cream-300 mt-0.5 sm:mt-1 leading-snug">
                Corporate team-building lawns, party lawns, rain dance & pool.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
