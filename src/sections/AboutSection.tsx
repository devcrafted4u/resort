import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Trees, Shield } from 'lucide-react';
import { scrollToSection } from '../lib/utils';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Genuine Resort Photography Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Photo: Resort Lawn & Adventure Tower */}
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-cream-200 aspect-[4/3] relative">
                <img
                  src="/images/resort/resort-lawn-path.webp"
                  alt="Sams Eden Resorts Lush Lawns and Activity Grounds"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Inset Photo Card (Campfire & Amphitheatre) - visible on tablet and desktop */}
              <div className="hidden sm:block absolute -bottom-6 -right-4 w-44 md:w-52 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src="/images/resort/campfire-pit.webp"
                  alt="Sams Eden Resort Bonfire and Gathering Pit"
                  className="w-full h-32 md:h-36 object-cover"
                  loading="lazy"
                />
                <div className="p-2 bg-forest-900 text-white text-center">
                  <p className="text-[10px] md:text-[11px] font-medium tracking-wide">Outdoor Bonfire Gathering</p>
                </div>
              </div>

              {/* Decorative Accent Pill - safely positioned */}
              <div className="absolute -top-3 left-2 sm:-left-3 bg-forest-900 text-gold-light text-xs font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg border border-gold/30 flex items-center gap-1.5">
                <Trees className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>Nature • Adventure • Hospitality</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Resort Purpose */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-forest-700 bg-forest-50 px-3.5 py-1.5 rounded-full border border-forest-200 self-start mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span>Welcome to Sams Eden Resorts</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-forest-950 tracking-tight leading-tight mb-4 sm:mb-6">
              A Place to Relax, Explore, and Reconnect.
            </h2>

            <div className="space-y-3 sm:space-y-4 text-stone-700 text-xs sm:text-base leading-relaxed">
              <p>
                Sams Eden Resorts offers an invigorating retreat designed to bring family, friends, and corporate teams together. Surrounded by open skies and tropical greenery, our grounds combine the thrill of outdoor adventure with the unhurried comfort of leisure hospitality.
              </p>
              <p>
                Whether you arrive for a full-day team outing complete with multi-course buffet meals and water activities, or check in for a 22-hour stay in our air-conditioned cottages, modern dormitory, or camping tents, every moment is crafted for connection and memorable joy.
              </p>
            </div>

            {/* Factual Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 mt-6 sm:mt-8 mb-8 sm:mb-10">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-stone-900">22-Hour Stay Experience</h4>
                  <p className="text-xs text-stone-600">Lunch, Hi-Tea, Dinner & Breakfast buffets included.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-stone-900">14 Obstacle Rope Park</h4>
                  <p className="text-xs text-stone-600">Tire courses, plank walks, climbing tower & zipline.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-stone-900">Swimming Pool & Rain Dance</h4>
                  <p className="text-xs text-stone-600">Clean waters and music stage for energetic fun.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-stone-900">Group & Corporate Retreats</h4>
                  <p className="text-xs text-stone-600">Spacious lawns for team building and milestones.</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <button
                onClick={() => scrollToSection('activities')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-forest-900 hover:bg-forest-800 text-white font-semibold px-7 py-3.5 rounded-full shadow-lg transition-all duration-300 min-h-[48px] active:scale-98"
              >
                <span>Discover All Experiences</span>
                <ArrowRight className="w-4 h-4 text-gold flex-shrink-0" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
