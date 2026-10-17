import React from 'react';
import { PriceBadge } from '../components/PriceBadge';
import { getWhatsAppUrl } from '../data/resortConfig';
import { scrollToSection } from '../lib/utils';
import { MessageCircle, ArrowRight, Sun, Tent, Users, Home } from 'lucide-react';

interface OverviewCardData {
  id: string;
  targetSection: string;
  icon: React.ReactNode;
  title: string;
  badge: string;
  description: string;
  image: string;
  pricing: {
    discountedPrice: number;
    brochurePrice?: number;
    unit: string;
    taxInclusive: boolean;
    status: 'provisional' | 'approved';
    notes?: string;
  };
  whatsappMsg: string;
}

export const PackageOverview: React.FC = () => {
  const cards: OverviewCardData[] = [
    {
      id: "day-outing",
      targetSection: "day-outings",
      icon: <Sun className="w-4 h-4 text-gold" />,
      title: "Day Outing Packages",
      badge: "Full Day Experience",
      description: "Buffet lunch, hi-tea, swimming pool, rain dance, 14 rope activities & outdoor sports.",
      image: "/images/pool/resort-pool.webp",
      pricing: {
        discountedPrice: 850,
        brochurePrice: 1200,
        unit: "person (from)",
        taxInclusive: true,
        status: "provisional",
        notes: "Starting rate without breakfast. ₹1,000 with breakfast.",
      },
      whatsappMsg: "Hello Sams Eden Resorts! I am interested in the Day Outing package (starting at ₹850/person). Please share package details and availability.",
    },
    {
      id: "tent-stay",
      targetSection: "accommodation",
      icon: <Tent className="w-4 h-4 text-gold" />,
      title: "Camping Tent Stay",
      badge: "22-Hour Stay Experience",
      description: "Adventure lawn camping under starry skies with all 4 buffet meals, bonfire & music.",
      image: "/images/accommodation/tent-stay.webp",
      pricing: {
        discountedPrice: 1800,
        brochurePrice: 2242,
        unit: "person",
        taxInclusive: true,
        status: "provisional",
        notes: "Includes all buffet meals & full activity privileges",
      },
      whatsappMsg: "Hello Sams Eden Resorts! I am interested in the Camping Tent Stay (₹1,800/person). Please share availability and details.",
    },
    {
      id: "dormitory-stay",
      targetSection: "accommodation",
      icon: <Users className="w-4 h-4 text-gold" />,
      title: "Dormitory Stay",
      badge: "Group & Corporate Lodge",
      description: "Air-conditioned multi-bed accommodation with modern bedding, buffet meals & bonfire.",
      image: "/images/accommodation/dormitory-room.webp",
      pricing: {
        discountedPrice: 2000,
        brochurePrice: 2832,
        unit: "person",
        taxInclusive: true,
        status: "provisional",
        notes: "Includes all buffet meals & full activity privileges",
      },
      whatsappMsg: "Hello Sams Eden Resorts! I am interested in the Dormitory Stay (₹2,000/person). Please share availability and details.",
    },
    {
      id: "cottage-stay",
      targetSection: "accommodation",
      icon: <Home className="w-4 h-4 text-gold" />,
      title: "Cottage Stay",
      badge: "Luxury Cottages",
      description: "Private air-conditioned cottages with dual queen beds or private couple rooms & garden views.",
      image: "/images/accommodation/four-sharing-cottage.webp",
      pricing: {
        discountedPrice: 2700,
        brochurePrice: 3540,
        unit: "person (starting)",
        taxInclusive: true,
        status: "provisional",
        notes: "₹2,700 for 4-sharing; ₹3,000 for couple cottage",
      },
      whatsappMsg: "Hello Sams Eden Resorts! I would like to enquire about your Cottage Stay options and rates.",
    },
  ];

  return (
    <section id="packages" className="py-16 sm:py-20 lg:py-24 bg-cream-50 relative z-10 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-forest-700 bg-forest-100/70 px-3.5 py-1.5 rounded-full border border-forest-200">
            Transparent Pricing & Real Packages
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-forest-950 mt-4 tracking-tight">
            Curated Experiences for Every Getaway
          </h2>
          <p className="text-stone-700 text-xs sm:text-base mt-3 leading-relaxed">
            All overnight stays include a complete 22-hour experience with grand buffet meals, night bonfire with music, and full access to our 14 rope activities, climbing wall, and swimming pool.
          </p>
        </div>

        {/* 4 Cards Grid: 1 col on mobile, 2 cols on tablet, 4 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200 flex flex-col group hover:-translate-y-1"
            >
              {/* Image with Tag */}
              <div className="relative aspect-[16/10] sm:h-52 overflow-hidden bg-stone-100">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3 bg-forest-900/90 backdrop-blur-sm text-gold-light text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-gold/30">
                  {card.icon}
                  <span>{card.badge}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-forest-950 group-hover:text-forest-700 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1.5 sm:mt-2 line-clamp-2 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-stone-100">
                  <PriceBadge
                    pricing={card.pricing}
                    itemTitle={card.title}
                    size="sm"
                  />
                </div>

                {/* Dual Buttons with 44px minimum touch target height */}
                <div className="grid grid-cols-2 gap-2 mt-4 sm:mt-5">
                  <button
                    onClick={() => scrollToSection(card.targetSection)}
                    className="min-h-[44px] flex items-center justify-center gap-1 py-2.5 px-2 rounded-xl border border-forest-800 text-forest-900 hover:bg-forest-800 hover:text-white text-xs font-semibold transition-all active:scale-98"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                  </button>

                  <a
                    href={getWhatsAppUrl(card.whatsappMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] flex items-center justify-center gap-1 py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-sm hover:shadow active:scale-98"
                  >
                    <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
