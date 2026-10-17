import React, { useState } from 'react';
import { buffetMenu, getWhatsAppUrl } from '../data/resortConfig';
import { Utensils, Coffee, Sparkles, Check, Clock, ChevronRight, MessageCircle, HeartHandshake } from 'lucide-react';
import { scrollToSection } from '../lib/utils';

export const DiningSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'breakfast' | 'lunch' | 'hitea'>('all');

  return (
    <section id="dining" className="py-16 sm:py-24 bg-cream-50 relative border-b border-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-forest-700 bg-forest-100 px-3.5 py-1.5 rounded-full border border-forest-200 mb-3">
            <Utensils className="w-3.5 h-3.5 text-gold flex-shrink-0" />
            <span>Farm-Fresh Resort Gastronomy</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-forest-950 tracking-tight">
            Authentic Dining & Multi-Course Buffets
          </h2>
          <p className="text-stone-700 text-xs sm:text-base mt-3 leading-relaxed">
            Feast on authentic South Indian delicacies, fragrant rice preparations, rich gravies, and hot Karnataka evening fritters. Every meal is freshly prepared with quality ingredients and generous hospitality.
          </p>
        </div>

        {/* Feature Split Showcase: Atmosphere & Culinary Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left: Atmospheric Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[16/10] bg-forest-950">
              <img
                src="/images/dining/dining-pavilion-night.webp"
                alt="Sam Eden Resort Dining Pavilion and Open-Air Hall"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-gold-light bg-forest-900/80 px-2.5 py-1 rounded-md">
                  Covered Pavilion & Open Lawn Dining
                </span>
                <h3 className="font-serif text-lg sm:text-2xl font-bold mt-1.5">
                  Dining Under the Palms & Night Ambience
                </h3>
              </div>
            </div>

            {/* Inset Badge */}
            <div className="absolute -bottom-4 right-4 sm:-bottom-5 sm:right-6 bg-white rounded-2xl p-3 sm:p-4 shadow-xl border border-stone-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center text-forest-900 flex-shrink-0">
                <Coffee className="w-5 h-5 text-gold-dark" />
              </div>
              <div>
                <p className="text-[10px] text-stone-500 font-semibold uppercase tracking-wider">Hi-Tea Specialty</p>
                <p className="text-xs sm:text-sm font-bold text-forest-950">Hot Mirchi & Heerekayi Bhajji</p>
              </div>
            </div>
          </div>

          {/* Right: Culinary Highlights */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-3">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest-950">
                A True Taste of Karnataka & Homestyle Comfort
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                Whether you arrive for our Day Outing With Breakfast package or stay overnight in our cottages and dormitories, your stay is anchored by multi-course buffet feasts. We cater with separate vegetarian and non-vegetarian serving counters to honor all dietary preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
                <h4 className="font-bold text-xs uppercase tracking-wider text-forest-900 mb-1 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Morning Breakfast</span>
                </h4>
                <p className="text-xs text-stone-600">
                  Hot idli-vada, set dosa, flavored bath, eggs, toast, and freshly brewed filter coffee.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
                <h4 className="font-bold text-xs uppercase tracking-wider text-forest-900 mb-1 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Grand Lunch Buffet</span>
                </h4>
                <p className="text-xs text-stone-600">
                  Crispy starters, aromatic chicken gravies, paneer curries, dal, rasam, and desserts.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
                <h4 className="font-bold text-xs uppercase tracking-wider text-forest-900 mb-1 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Afternoon Hi-Tea</span>
                </h4>
                <p className="text-xs text-stone-600">
                  Fresh brewed coffee & tea served with steaming hot local mirchi, ridge gourd, and brinjal bhajji.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
                <h4 className="font-bold text-xs uppercase tracking-wider text-forest-900 mb-1 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Starlit Dinner & Bonfire</span>
                </h4>
                <p className="text-xs text-stone-600">
                  Multi-course evening dinner buffet served alongside night campfire under the open sky.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={getWhatsAppUrl("Hello Sam Eden Resort! I would like to enquire about your dining arrangements, menus, and special catering options.")}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[46px] inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire Dining on WhatsApp</span>
              </a>

              <button
                onClick={() => scrollToSection('enquiry')}
                className="min-h-[46px] inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl border border-forest-800 text-forest-900 hover:bg-forest-900 hover:text-white font-semibold text-xs sm:text-sm transition-all active:scale-98"
              >
                <span>Plan Group Meal Event</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Full Buffet Menus Card Grid */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[11px] font-bold uppercase tracking-widest text-gold-dark">
              Full Verified Spread
            </span>
            <h3 className="font-serif text-xl sm:text-3xl font-bold text-forest-950 mt-1">
              Course-by-Course Buffet Breakdown
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Included across Day Outing packages and 22-Hour Stays
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* 1. Breakfast */}
            <div className="bg-cream-50 rounded-2xl p-5 sm:p-6 border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-forest-900 text-gold flex items-center justify-center font-bold text-xs">
                      1
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-forest-950 text-base sm:text-lg">
                        Morning Breakfast
                      </h4>
                      <p className="text-[11px] text-stone-500">8:30 AM – 10:30 AM</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-stone-600 italic mb-4">
                  Served fresh with Day Outing (With Breakfast) and all Overnight Stays:
                </p>

                <ul className="space-y-2 text-xs text-stone-700">
                  {buffetMenu.breakfast.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t border-stone-200/80 text-[11px] text-stone-500">
                Freshly prepared South & North Indian breakfast favorites.
              </div>
            </div>

            {/* 2. Lunch */}
            <div className="bg-cream-50 rounded-2xl p-5 sm:p-6 border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-forest-900 text-gold flex items-center justify-center font-bold text-xs">
                      2
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-forest-950 text-base sm:text-lg">
                        Grand Lunch Buffet
                      </h4>
                      <p className="text-[11px] text-stone-500">1:00 PM – 3:00 PM</p>
                    </div>
                  </div>
                </div>

                {/* Veg Subheading */}
                <h5 className="font-bold text-[11px] uppercase tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>Vegetarian Courses</span>
                </h5>
                <ul className="space-y-1.5 text-xs text-stone-700 mb-4">
                  {buffetMenu.lunch.veg.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-gold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Non-Veg Subheading */}
                <h5 className="font-bold text-[11px] uppercase tracking-wider text-rose-800 mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-600" />
                  <span>Non-Vegetarian Courses</span>
                </h5>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  {buffetMenu.lunch.nonVeg.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-gold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t border-stone-200/80 text-[11px] text-stone-500">
                Separate serving counters for vegetarian and non-vegetarian selections.
              </div>
            </div>

            {/* 3. Hi-Tea & Evening */}
            <div className="bg-cream-50 rounded-2xl p-5 sm:p-6 border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-forest-900 text-gold flex items-center justify-center font-bold text-xs">
                      3
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-forest-950 text-base sm:text-lg">
                        Afternoon Hi-Tea & Snacks
                      </h4>
                      <p className="text-[11px] text-stone-500">4:30 PM – 5:30 PM</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-stone-600 italic mb-4">
                  Served piping hot right after afternoon adventures and pool time:
                </p>

                <ul className="space-y-2.5 text-xs text-stone-700 mb-6">
                  {buffetMenu.hiTea.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-3 bg-white rounded-xl border border-stone-200 text-xs text-stone-700">
                  <p className="font-bold text-forest-950 mb-1">Night Stay Campfire & Dinner:</p>
                  <p className="text-stone-600">
                    Overnight guests enjoy an additional grand evening dinner buffet and bonfire setup under starlit skies.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-stone-200/80 text-[11px] text-stone-500">
                Piping hot filter coffee & freshly fried local fritters.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
