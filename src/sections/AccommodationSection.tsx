import React, { useState } from 'react';
import { accommodationCategories, roomSharingCategories, getWhatsAppUrl } from '../data/resortConfig';
import { PriceBadge } from '../components/PriceBadge';
import { Users, Sparkles, MessageCircle, Moon, Check, Eye, AlertCircle, Info, Home, Tent, UtensilsCrossed } from 'lucide-react';
import { scrollToSection } from '../lib/utils';
import { AccommodationCategory, RoomSharingCategory } from '../types';

interface AccommodationSectionProps {
  onOpenImage?: (src: string, title: string) => void;
  onSelectVisitType?: (visitType: string) => void;
}

export const AccommodationSection: React.FC<AccommodationSectionProps> = ({
  onOpenImage,
  onSelectVisitType,
}) => {
  const [stayView, setStayView] = useState<'presentation' | 'sharing'>('presentation');

  const handleBookPresentationStay = (category: AccommodationCategory) => {
    if (onSelectVisitType) {
      if (category.id === 'tent-stay') onSelectVisitType('Tent Stay');
      else if (category.id === 'dormitory-stay') onSelectVisitType('Dormitory Stay');
      else if (category.id === 'four-sharing-cottage') onSelectVisitType('Four-Sharing Cottage');
      else if (category.id === 'couple-cottage') onSelectVisitType('Couple Cottage');
    }
    scrollToSection('enquiry');
  };

  const handleBookRoomSharing = (room: RoomSharingCategory) => {
    if (onSelectVisitType) {
      onSelectVisitType(`${room.sharingType} Room`);
    }
    scrollToSection('enquiry');
  };

  return (
    <section id="accommodation" className="py-16 sm:py-24 bg-white relative border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-forest-700 bg-forest-50 px-3.5 py-1.5 rounded-full border border-forest-200 mb-3">
            <Moon className="w-3.5 h-3.5 text-gold" />
            <span>22-Hour Overnight Experiences</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-forest-950 tracking-tight">
            Comfortable Stays in Nature
          </h2>
          <p className="text-stone-700 text-xs sm:text-base mt-3 leading-relaxed">
            All stay packages include a full 22-hour resort experience: four grand buffet meals (lunch, hi-tea, dinner & breakfast), starlit bonfire with music, swimming pool, and full access to our 14 rope challenges.
          </p>

          {/* Switcher Toggle: Presentation Stays vs Website Sharing Categories */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="inline-flex p-1.5 bg-cream-200 rounded-2xl border border-stone-300 shadow-inner max-w-full overflow-x-auto">
              <button
                type="button"
                onClick={() => setStayView('presentation')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  stayView === 'presentation'
                    ? 'bg-forest-900 text-white shadow-md'
                    : 'text-stone-700 hover:text-forest-950 hover:bg-cream-300/60'
                }`}
                aria-pressed={stayView === 'presentation'}
              >
                <Tent className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Presentation Stays (Provisional Rates)</span>
              </button>
              <button
                type="button"
                onClick={() => setStayView('sharing')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  stayView === 'sharing'
                    ? 'bg-forest-900 text-white shadow-md'
                    : 'text-stone-700 hover:text-forest-950 hover:bg-cream-300/60'
                }`}
                aria-pressed={stayView === 'sharing'}
              >
                <Home className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Room Sharing Categories (CP / MAP / AP Plans)</span>
              </button>
            </div>
          </div>

          {/* Context Banner */}
          <div className="mt-4 max-w-2xl mx-auto p-3 bg-cream-50 rounded-xl border border-stone-200 text-left text-xs text-stone-600 flex items-start gap-2.5 shadow-xs">
            <Info className="w-4 h-4 text-forest-700 flex-shrink-0 mt-0.5" />
            <div>
              {stayView === 'presentation' ? (
                <span>
                  <strong>Presentation Stays:</strong> Provisional discounted prices include all taxes and 4 buffet meals. Couple Cottage pricing basis (per person vs per couple) is pending client confirmation.
                </span>
              ) : (
                <span>
                  <strong>Room-Sharing Configurations:</strong> Sourced from official website (samedenresort.com). Tariffs are quoted on enquiry with meal plan choices: <strong>CP</strong> (Breakfast), <strong>MAP</strong> (Breakfast + Lunch or Dinner), or <strong>AP</strong> (All Meals).
                </span>
              )}
            </div>
          </div>
        </div>

        {/* VIEW 1: Presentation Stays (4 Cards) */}
        {stayView === 'presentation' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 animate-fade-in">
            {accommodationCategories.map((acc) => (
              <div
                key={acc.id}
                className="bg-cream-50 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-stone-200 flex flex-col justify-between group hover:-translate-y-1"
              >
                {/* Photo Header */}
                <div className="relative aspect-[16/10] sm:h-72 overflow-hidden bg-stone-200">
                  <img
                    src={acc.image}
                    alt={acc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                    onClick={() => onOpenImage && onOpenImage(acc.image, acc.name)}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent pointer-events-none" />

                  {/* Occupancy Badge */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-forest-900/90 backdrop-blur-md text-white text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1.5 border border-gold/40">
                    <Users className="w-3.5 h-3.5 text-gold" />
                    <span>{acc.occupancy}</span>
                  </div>

                  {/* Lightbox Trigger Icon */}
                  {onOpenImage && (
                    <button
                      onClick={() => onOpenImage(acc.image, acc.name)}
                      className="absolute top-3 sm:top-4 right-3 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all transform active:scale-95"
                      aria-label={`View photo of ${acc.name}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}

                  {/* Bottom Overlay Title */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white pointer-events-none">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide">
                      {acc.name}
                    </h3>
                    <p className="text-xs text-cream-200 line-clamp-1 mt-0.5">
                      {acc.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-7 lg:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-5">
                      {acc.description}
                    </p>

                    <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900 mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-gold" />
                      <span>Included in Stay</span>
                    </h4>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700 mb-5">
                      {acc.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Charging Basis Notice for Couple Cottage */}
                    {acc.chargingBasisNote && (
                      <div className="mb-5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                        <span>{acc.chargingBasisNote}</span>
                      </div>
                    )}
                  </div>

                  {/* Pricing & Booking Actions */}
                  <div className="pt-5 border-t border-stone-200">
                    <div className="mb-4 sm:mb-5">
                      <PriceBadge
                        pricing={acc.pricing}
                        itemTitle={acc.name}
                        size="md"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      <a
                        href={getWhatsAppUrl(acc.whatsappMessage, { packageTitle: acc.name })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[46px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl sm:rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-98"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Enquire on WhatsApp</span>
                      </a>

                      <button
                        onClick={() => handleBookPresentationStay(acc)}
                        className="min-h-[46px] flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl sm:rounded-2xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-md active:scale-98"
                      >
                        <span>Book Online Form</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 2: Room Sharing Categories from Website (4 Cards) */}
        {stayView === 'sharing' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 animate-fade-in">
            {roomSharingCategories.map((room) => (
              <div
                key={room.id}
                className="bg-cream-50 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-stone-200 flex flex-col justify-between group hover:-translate-y-1"
              >
                {/* Photo Header */}
                <div className="relative aspect-[16/10] sm:h-72 overflow-hidden bg-stone-200">
                  <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                    onClick={() => onOpenImage && onOpenImage(room.image, room.title)}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent pointer-events-none" />

                  {/* Sharing Type Badge */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-forest-900/90 backdrop-blur-md text-white text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1.5 border border-gold/40">
                    <Users className="w-3.5 h-3.5 text-gold" />
                    <span>{room.capacity}</span>
                  </div>

                  {/* Lightbox Trigger Icon */}
                  {onOpenImage && (
                    <button
                      onClick={() => onOpenImage(room.image, room.title)}
                      className="absolute top-3 sm:top-4 right-3 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all transform active:scale-95"
                      aria-label={`View photo of ${room.title}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}

                  {/* Bottom Overlay Title */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white pointer-events-none">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold-light bg-forest-950/60 px-2 py-0.5 rounded-sm">
                      {room.sharingType}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide mt-1">
                      {room.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-7 lg:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4">
                      {room.description}
                    </p>

                    {/* Room Amenities */}
                    <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900 mb-2.5 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-gold" />
                      <span>Room Highlights</span>
                    </h4>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-700 mb-5">
                      {room.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Meal Plan Options Box (CP, MAP, AP) */}
                    <div className="bg-white rounded-xl p-3.5 border border-stone-200 mb-5 shadow-xs">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900 mb-2 flex items-center gap-1.5">
                        <UtensilsCrossed className="w-3.5 h-3.5 text-gold" />
                        <span>Available Meal Plans</span>
                      </h4>
                      <div className="space-y-1.5 text-xs text-stone-700">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-forest-900 bg-cream-200 px-1.5 py-0.5 rounded text-[10px]">CP</span>
                          <span>{room.mealPlans.cp}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-forest-900 bg-cream-200 px-1.5 py-0.5 rounded text-[10px]">MAP</span>
                          <span>{room.mealPlans.map}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-forest-900 bg-cream-200 px-1.5 py-0.5 rounded text-[10px]">AP</span>
                          <span>{room.mealPlans.ap}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tariff Notice */}
                    <div className="mb-5 p-3 rounded-xl bg-stone-100 border border-stone-200 text-stone-600 text-xs flex items-start gap-2">
                      <Info className="w-4 h-4 text-stone-500 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Tariff on Request:</strong> {room.notes}
                      </span>
                    </div>
                  </div>

                  {/* Booking & Enquiry Actions */}
                  <div className="pt-4 border-t border-stone-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      <a
                        href={getWhatsAppUrl(room.whatsappMessage, { packageTitle: room.title })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[46px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl sm:rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-98"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Enquire Meal Plans</span>
                      </a>

                      <button
                        onClick={() => handleBookRoomSharing(room)}
                        className="min-h-[46px] flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl sm:rounded-2xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-md active:scale-98"
                      >
                        <span>Book Online Form</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Meal Plans Reference Legend */}
        <div className="mt-12 bg-cream-50 rounded-2xl p-5 sm:p-6 border border-stone-200 max-w-4xl mx-auto text-xs text-stone-700">
          <h4 className="font-bold text-forest-950 uppercase tracking-wider text-xs mb-2 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-gold-dark" />
            <span>Hospitality Meal Plan Guide</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="bg-white p-3 rounded-xl border border-stone-200">
              <span className="font-bold text-forest-900">CP (Continental Plan)</span>
              <p className="text-stone-600 mt-0.5">Includes overnight room accommodation plus fresh morning breakfast buffet.</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-stone-200">
              <span className="font-bold text-forest-900">MAP (Modified American Plan)</span>
              <p className="text-stone-600 mt-0.5">Includes overnight room accommodation, morning breakfast, and choice of lunch or dinner.</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-stone-200">
              <span className="font-bold text-forest-900">AP (American Plan)</span>
              <p className="text-stone-600 mt-0.5">Includes overnight room accommodation and all buffet meals (breakfast, lunch, hi-tea, dinner).</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
