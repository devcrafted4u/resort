import React from 'react';
import { ResortLogo } from './ResortLogo';
import { resortConfig, getWhatsAppUrl } from '../data/resortConfig';
import { scrollToSection } from '../lib/utils';
import { Phone, MessageCircle, MapPin, Mail, ExternalLink, ArrowUp, Calendar, Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Home', href: 'hero' },
    { label: 'About Resort', href: 'about' },
    { label: 'Packages', href: 'packages' },
    { label: 'Day Outings', href: 'day-outings' },
    { label: 'Accommodation', href: 'accommodation' },
    { label: 'Activities & Amenities', href: 'activities' },
    { label: 'Dining & Buffets', href: 'dining' },
    { label: 'Events & Weddings', href: 'events' },
    { label: 'Photo & Video Gallery', href: 'gallery' },
    { label: 'Verified Reviews', href: 'reviews' },
    { label: 'Location & Directions', href: 'contact' },
    { label: 'Booking Enquiry', href: 'enquiry' },
  ];

  return (
    <footer className="bg-forest-950 text-cream-200 border-t border-gold/20 pt-16 pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          
          {/* Col 1: Brand & Purpose */}
          <div className="lg:col-span-4 space-y-4">
            <ResortLogo variant="dark" />
            
            <p className="text-xs sm:text-sm text-cream-300 leading-relaxed max-w-sm mt-3">
              Sam Eden Resort (formerly Sams Eden Resorts) offers an authentic nature retreat for families, friends, and corporate gatherings. Featuring 14 high-rope challenges, climbing wall, swimming pool, rain dance with music, and grand buffet feasts.
            </p>

            <div className="pt-2">
              <span className="inline-block text-[11px] font-mono tracking-wider text-gold-light bg-forest-900/80 px-3 py-1 rounded-full border border-gold/30">
                {resortConfig.slogan}
              </span>
            </div>

            <div className="pt-2 text-xs text-cream-400 space-y-1">
              <p className="font-semibold text-white">Registered Address:</p>
              <p className="text-cream-300 leading-relaxed">
                {resortConfig.address}
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-white font-bold text-sm sm:text-base tracking-wider uppercase">
              Resort Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-cream-300 hover:text-gold transition-colors text-left py-1.5 block w-full active:text-gold"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Attributed Lines */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-serif text-white font-bold text-sm sm:text-base tracking-wider uppercase">
              Direct Inquiries & Helpdesk
            </h4>

            <div className="space-y-3 text-xs">
              {/* Primary Booking Line (Presentation) */}
              <div className="p-3 bg-forest-900/80 rounded-xl border border-gold/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-gold-light font-bold uppercase tracking-wider">
                    Primary Booking Desk & WhatsApp
                  </span>
                  <span className="text-[9px] bg-forest-950 text-cream-300 px-2 py-0.5 rounded">
                    Presentation Source
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`tel:${resortConfig.contactNumbers.pptBookingLine.number}`}
                    className="text-sm sm:text-base font-bold text-white hover:text-gold transition-colors"
                  >
                    {resortConfig.contactNumbers.pptBookingLine.display}
                  </a>
                  <a
                    href={getWhatsAppUrl("Hello Sam Eden Resort! I would like to enquire about bookings.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Website Helpdesk Lines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="p-2.5 bg-forest-900/50 rounded-xl border border-white/10">
                  <span className="text-[10px] text-cream-400 block font-medium">Website Helpline 1</span>
                  <a
                    href={`tel:${resortConfig.contactNumbers.websiteAlternate1.number}`}
                    className="text-xs font-bold text-cream-100 hover:text-gold transition-colors block mt-0.5"
                  >
                    {resortConfig.contactNumbers.websiteAlternate1.display}
                  </a>
                </div>

                <div className="p-2.5 bg-forest-900/50 rounded-xl border border-white/10">
                  <span className="text-[10px] text-cream-400 block font-medium">Website Helpline 2</span>
                  <a
                    href={`tel:${resortConfig.contactNumbers.websiteAlternate2.number}`}
                    className="text-xs font-bold text-cream-100 hover:text-gold transition-colors block mt-0.5"
                  >
                    {resortConfig.contactNumbers.websiteAlternate2.display}
                  </a>
                </div>
              </div>

              {/* Official Email */}
              <a
                href={`mailto:${resortConfig.email}`}
                className="flex items-center gap-2.5 text-cream-300 hover:text-gold transition-colors py-1"
              >
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="font-medium">{resortConfig.email}</span>
              </a>

              {/* Google Maps Link */}
              <a
                href={resortConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-cream-300 hover:text-gold transition-colors py-1"
              >
                <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="hover:underline flex items-center gap-1">
                  Bidadi Hobli, Ramanagara (Open Google Maps)
                  <ExternalLink className="w-3 h-3" />
                </span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => scrollToSection('enquiry')}
                className="w-full min-h-[46px] flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-forest-950 font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-98"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Your Experience</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Notice & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream-400">
          <div className="text-center md:text-left space-y-1">
            <p>
              © {currentYear} {resortConfig.name}. All rights reserved.
            </p>
            <p className="text-[11px] text-cream-400/80">
              * Promotional rates from presentation include taxes. Standard website tiers (Silver / Gold / Diamond) subject to +18% GST.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection('hero')}
              className="min-h-[40px] flex items-center gap-1.5 px-3 py-2 rounded-full bg-forest-900 hover:bg-forest-800 text-cream-200 hover:text-white transition-colors active:scale-95"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 text-gold" />
              <span className="text-xs">Back to Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
