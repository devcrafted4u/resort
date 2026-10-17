import React, { useState } from 'react';
import { dayOutingPackages, standardDayPackages, buffetMenu, getWhatsAppUrl } from '../data/resortConfig';
import { PriceBadge } from '../components/PriceBadge';
import { Check, Clock, Utensils, MessageCircle, Sparkles, ChevronRight, Info, ShieldCheck, Tag } from 'lucide-react';
import { scrollToSection } from '../lib/utils';

export const DayOutingSection: React.FC = () => {
  const [packageView, setPackageView] = useState<'promotional' | 'standard'>('promotional');
  const [activeMenuTab, setActiveMenuTab] = useState<'breakfast' | 'lunch' | 'hitea'>('lunch');

  return (
    <section id="day-outings" className="py-16 sm:py-24 bg-cream-100 relative border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-forest-700 bg-forest-200/50 px-3.5 py-1.5 rounded-full border border-forest-300">
            Day Outing Getaways
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-forest-950 mt-4 tracking-tight">
            Full-Day Refreshment & Adventure
          </h2>
          <p className="text-stone-700 text-xs sm:text-base mt-3 leading-relaxed">
            Recharge with colleagues, friends, or family. Enjoy our 14 rope challenges, climbing tower, crystal swimming pool, lively rain dance with music, sports courts, and authentic multi-course buffet feasts.
          </p>

          {/* Package Source Switcher Toggle */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="inline-flex p-1.5 bg-stone-200/80 rounded-2xl border border-stone-300 shadow-inner max-w-full overflow-x-auto">
              <button
                type="button"
                onClick={() => setPackageView('promotional')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  packageView === 'promotional'
                    ? 'bg-forest-900 text-white shadow-md'
                    : 'text-stone-700 hover:text-forest-950 hover:bg-stone-300/50'
                }`}
                aria-pressed={packageView === 'promotional'}
              >
                <Tag className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Special Promotional Rates (Tax Inclusive)</span>
              </button>
              <button
                type="button"
                onClick={() => setPackageView('standard')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  packageView === 'standard'
                    ? 'bg-forest-900 text-white shadow-md'
                    : 'text-stone-700 hover:text-forest-950 hover:bg-stone-300/50'
                }`}
                aria-pressed={packageView === 'standard'}
              >
                <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Website Packages (Silver / Gold / Diamond)</span>
              </button>
            </div>
          </div>

          {/* Pricing Source Explanation Banner */}
          <div className="mt-4 max-w-2xl mx-auto p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-stone-200 text-left text-xs text-stone-600 flex items-start gap-2.5 shadow-xs">
            <Info className="w-4 h-4 text-forest-700 flex-shrink-0 mt-0.5" />
            <div>
              {packageView === 'promotional' ? (
                <span>
                  <strong>Presentation Draft Rates:</strong> Sourced from client deck. As stated, these promotional prices are <strong>inclusive of taxes</strong> (₹850 without breakfast / ₹1,000 with breakfast).
                </span>
              ) : (
                <span>
                  <strong>Official Website Packages:</strong> Published on samedenresort.com under Silver (₹850), Gold (₹999), and Diamond (₹1,500) tiers, each subject to <strong>+ 18% GST</strong>.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* VIEW 1: Promotional Draft Packages (2 Cards) */}
        {packageView === 'promotional' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto mb-12 sm:mb-16 animate-fade-in">
            {dayOutingPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border flex flex-col justify-between ${
                  pkg.popular
                    ? 'border-gold ring-2 ring-gold/20'
                    : 'border-stone-200'
                }`}
              >
                {/* Popular Flag */}
                {pkg.popular && (
                  <div className="bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-forest-950 font-bold text-[11px] sm:text-xs uppercase tracking-widest py-1.5 text-center flex items-center justify-center gap-1.5 shadow-sm px-2">
                    <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Most Popular • Complete Day Experience</span>
                  </div>
                )}

                {/* Card Header & Photo */}
                <div className="relative aspect-[16/10] sm:h-64 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                    <div className="flex items-center gap-2 text-xs text-gold-light mb-1">
                      <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{pkg.timing}</span>
                    </div>
                    <h3 className="font-serif text-lg sm:text-2xl font-bold">
                      {pkg.title}
                    </h3>
                  </div>
                </div>

                {/* Inclusions & Pricing Body */}
                <div className="p-4 sm:p-7 lg:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-5">
                      {pkg.subtitle}
                    </p>

                    <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900 mb-3 flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-gold flex-shrink-0" />
                      <span>Package Inclusions</span>
                    </h4>

                    <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700 mb-6">
                      {pkg.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span className="leading-tight">{inc}</span>
                        </li>
                      ))}
                      {pkg.exclusions?.map((exc, i) => (
                        <li key={`exc-${i}`} className="flex items-start gap-2.5 text-stone-500 line-through">
                          <div className="w-4 h-4 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-[10px] font-bold">✕</span>
                          </div>
                          <span className="leading-tight">{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price Display and CTAs */}
                  <div className="pt-5 border-t border-stone-100">
                    <div className="mb-5">
                      <PriceBadge
                        pricing={pkg.pricing}
                        itemTitle={pkg.title}
                        size="md"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      <a
                        href={getWhatsAppUrl(pkg.whatsappMessage, { packageTitle: pkg.title })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[46px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl sm:rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-98"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp Enquiry</span>
                      </a>

                      <button
                        onClick={() => scrollToSection('enquiry')}
                        className="min-h-[46px] flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl sm:rounded-2xl border border-forest-800 text-forest-900 hover:bg-forest-900 hover:text-white font-semibold text-xs sm:text-sm transition-all active:scale-98"
                      >
                        <span>Book Online</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 2: Website Standard Packages (Silver, Gold, Diamond - 3 Cards) */}
        {packageView === 'standard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12 sm:mb-16 animate-fade-in">
            {standardDayPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border flex flex-col justify-between ${
                  pkg.tier === 'Gold'
                    ? 'border-gold ring-2 ring-gold/25'
                    : 'border-stone-200'
                }`}
              >
                {/* Badge if available */}
                {pkg.badge && (
                  <div className="bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-forest-950 font-bold text-[11px] sm:text-xs uppercase tracking-widest py-1.5 text-center flex items-center justify-center gap-1.5 shadow-sm px-2">
                    <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{pkg.badge}</span>
                  </div>
                )}

                {/* Card Header & Photo */}
                <div className="relative aspect-[16/10] sm:h-56 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                    <div className="flex items-center gap-2 text-xs text-gold-light mb-1">
                      <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{pkg.timing}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                        pkg.tier === 'Silver' ? 'bg-slate-200 text-slate-800' :
                        pkg.tier === 'Gold' ? 'bg-gold-light text-forest-950' :
                        'bg-purple-100 text-purple-900'
                      }`}>
                        {pkg.tier} Tier
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-bold">
                        {pkg.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Inclusions & Pricing Body */}
                <div className="p-4 sm:p-6 lg:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-stone-700 leading-relaxed mb-4">
                      {pkg.subtitle}
                    </p>

                    <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900 mb-3 flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-gold flex-shrink-0" />
                      <span>Package Inclusions</span>
                    </h4>

                    <ul className="space-y-2 text-xs text-stone-700 mb-6">
                      {pkg.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span className="leading-tight">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Standard Price Display and CTAs */}
                  <div className="pt-4 border-t border-stone-100">
                    <div className="mb-4">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs font-semibold text-stone-500">₹</span>
                        <span className="text-2xl sm:text-3xl font-serif font-bold text-forest-950">
                          {pkg.publishedPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-stone-600">/ person</span>
                      </div>
                      <div className="text-[11px] font-medium text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md inline-block mt-1">
                        {pkg.taxRateNote}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      <a
                        href={getWhatsAppUrl(pkg.whatsappMessage, { packageTitle: pkg.title })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all active:scale-98"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Enquire on WhatsApp</span>
                      </a>

                      <button
                        onClick={() => scrollToSection('enquiry')}
                        className="min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-forest-800 text-forest-900 hover:bg-forest-900 hover:text-white font-semibold text-xs transition-all active:scale-98"
                      >
                        <span>Book Online Form</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Verified Buffet Menu Section */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 shadow-lg border border-stone-200 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 sm:pb-6 border-b border-stone-100 gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gold-dark">
                Authentic Taste
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest-950 mt-1">
                Included Buffet Meals
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Freshly prepared, authentic South & North Indian multi-course buffet spreads.
              </p>
            </div>

            {/* Menu Tabs: Grid 3-col on mobile, flex on desktop */}
            <div className="grid grid-cols-3 w-full sm:w-auto sm:flex bg-cream-200 p-1 rounded-xl sm:rounded-2xl gap-1">
              <button
                onClick={() => setActiveMenuTab('breakfast')}
                className={`min-h-[38px] px-3 py-2 text-xs font-semibold rounded-lg sm:rounded-xl transition-all text-center ${
                  activeMenuTab === 'breakfast'
                    ? 'bg-forest-900 text-white shadow-sm'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Breakfast
              </button>
              <button
                onClick={() => setActiveMenuTab('lunch')}
                className={`min-h-[38px] px-3 py-2 text-xs font-semibold rounded-lg sm:rounded-xl transition-all text-center ${
                  activeMenuTab === 'lunch'
                    ? 'bg-forest-900 text-white shadow-sm'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Lunch
              </button>
              <button
                onClick={() => setActiveMenuTab('hitea')}
                className={`min-h-[38px] px-3 py-2 text-xs font-semibold rounded-lg sm:rounded-xl transition-all text-center ${
                  activeMenuTab === 'hitea'
                    ? 'bg-forest-900 text-white shadow-sm'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Hi-Tea
              </button>
            </div>
          </div>

          {/* Menu Items List */}
          <div className="pt-6">
            {activeMenuTab === 'breakfast' && (
              <div className="animate-fade-in">
                <p className="text-xs text-stone-600 mb-4 italic">
                  Served with Day Outing (With Breakfast) and all Overnight Stays:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {buffetMenu.breakfast.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-800">
                      <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeMenuTab === 'lunch' && (
              <div className="animate-fade-in grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-emerald-800 uppercase tracking-wider mb-3 pb-1 border-b border-emerald-100 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Vegetarian Selections</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-stone-800">
                    {buffetMenu.lunch.veg.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-gold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-rose-800 uppercase tracking-wider mb-3 pb-1 border-b border-rose-100 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>Non-Vegetarian Delicacies</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-stone-800">
                    {buffetMenu.lunch.nonVeg.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-gold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeMenuTab === 'hitea' && (
              <div className="animate-fade-in">
                <p className="text-xs text-stone-600 mb-4 italic">
                  Served fresh in the afternoon (4:30 PM - 5:30 PM):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {buffetMenu.hiTea.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-800">
                      <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
