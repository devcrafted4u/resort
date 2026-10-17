import React from 'react';
import { resortConfig, getWhatsAppUrl } from '../data/resortConfig';
import { MapPin, Phone, MessageCircle, Mail, Globe, Clock, ShieldAlert, ExternalLink, Navigation, CheckCircle2 } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-forest-700 bg-forest-50 px-3.5 py-1.5 rounded-full border border-forest-200">
            Find & Visit Us
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-forest-950 mt-4 tracking-tight">
            Location & Contact Information
          </h2>
          <p className="text-stone-700 text-xs sm:text-base mt-3 leading-relaxed">
            Conveniently situated in Bidadi Hobli, Ramanagara district near Bengaluru. Escape into tranquil nature and open landscapes for memorable getaways.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column: Contact & Navigation Details */}
          <div className="lg:col-span-6 bg-cream-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-stone-200 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-forest-900">
                  Front Office & Reservations
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest-950 mb-2">
                {resortConfig.name}
              </h3>
              <p className="text-xs text-stone-600 mb-6">
                Formerly known as Sams Eden Resorts • Registered Hospitality Destination
              </p>

              <div className="space-y-5 text-sm text-stone-700">
                {/* 1. Official Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-stone-200 flex items-center justify-center text-forest-800 flex-shrink-0 shadow-xs">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900">
                      Official Resort Address
                    </h4>
                    <p className="text-stone-800 text-xs sm:text-sm mt-0.5 font-medium leading-relaxed">
                      {resortConfig.address}
                    </p>
                    <span className="text-[11px] text-stone-500 block mt-0.5">
                      Ramanagara District, Karnataka — 562109
                    </span>
                  </div>
                </div>

                {/* 2. Official Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-stone-200 flex items-center justify-center text-forest-800 flex-shrink-0 shadow-xs">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900">
                      Official Email Address
                    </h4>
                    <a
                      href={`mailto:${resortConfig.email}`}
                      className="text-xs sm:text-sm font-semibold text-forest-900 hover:text-gold transition-colors block mt-0.5"
                    >
                      {resortConfig.email}
                    </a>
                    <span className="text-[11px] text-stone-500">
                      For corporate proposals, group inquiries & invoices
                    </span>
                  </div>
                </div>

                {/* 3. Official Contact Numbers (All 3 Displayed with Attribution) */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-stone-200 flex items-center justify-center text-forest-800 flex-shrink-0 shadow-xs">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div className="w-full">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900 mb-2">
                      Verified Contact & Booking Lines
                    </h4>

                    {/* Primary Booking Line (Presentation) */}
                    <div className="p-3 bg-white rounded-xl border border-emerald-200 mb-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
                          Primary Booking Desk & WhatsApp
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                          Presentation Source
                        </span>
                      </div>
                      <a
                        href={`tel:${resortConfig.contactNumbers.pptBookingLine.number}`}
                        className="text-base sm:text-lg font-bold text-forest-900 hover:text-gold transition-colors block mt-1"
                      >
                        {resortConfig.contactNumbers.pptBookingLine.display}
                      </a>
                      <span className="text-[11px] text-emerald-700 flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Active WhatsApp desk for instant booking confirmations
                      </span>
                    </div>

                    {/* Old Website Lines */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 bg-white rounded-xl border border-stone-200">
                        <span className="text-[10px] text-stone-500 font-semibold uppercase block">
                          Website Helpline 1
                        </span>
                        <a
                          href={`tel:${resortConfig.contactNumbers.websiteAlternate1.number}`}
                          className="font-bold text-forest-900 hover:text-gold block mt-0.5"
                        >
                          {resortConfig.contactNumbers.websiteAlternate1.display}
                        </a>
                      </div>

                      <div className="p-2.5 bg-white rounded-xl border border-stone-200">
                        <span className="text-[10px] text-stone-500 font-semibold uppercase block">
                          Website Helpline 2
                        </span>
                        <a
                          href={`tel:${resortConfig.contactNumbers.websiteAlternate2.number}`}
                          className="font-bold text-forest-900 hover:text-gold block mt-0.5"
                        >
                          {resortConfig.contactNumbers.websiteAlternate2.display}
                        </a>
                      </div>
                    </div>

                    <div className="mt-2 text-[11px] text-stone-500 italic">
                      * Contact numbers are preserved from client presentation & official site. Please confirm preferred production routing with management.
                    </div>
                  </div>
                </div>

                {/* 4. Operating Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-stone-200 flex items-center justify-center text-forest-800 flex-shrink-0 shadow-xs">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900">
                      Timings
                    </h4>
                    <p className="text-xs text-stone-700 mt-0.5">
                      • <strong>Day Outing:</strong> 9:00 AM – 6:00 PM
                    </p>
                    <p className="text-xs text-stone-700">
                      • <strong>22-Hour Stay:</strong> Standard 22-hour duration
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-5 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={getWhatsAppUrl("Hello Sam Eden Resort! I am reaching out regarding bookings and directions.")}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[46px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message on WhatsApp</span>
              </a>

              <a
                href={resortConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[46px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-forest-800 text-forest-900 hover:bg-forest-900 hover:text-white font-semibold text-xs sm:text-sm transition-all active:scale-98"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Location View */}
          <div className="lg:col-span-6 bg-cream-50 rounded-2xl sm:rounded-3xl overflow-hidden border border-stone-200 shadow-sm flex flex-col justify-between">
            {/* Real Google Map Embed Container */}
            <div className="relative w-full h-72 sm:h-96 lg:h-full min-h-[300px] bg-stone-200 overflow-hidden">
              <iframe
                title="Sam Eden Resort Google Maps Pin Location"
                src={resortConfig.embedMapsUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter saturate-90 contrast-105"
              />

              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-stone-200 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span className="text-xs font-semibold text-stone-800">
                  Bidadi Hobli, Ramanagara
                </span>
              </div>
            </div>

            {/* Route & Directions Assistance Footer */}
            <div className="p-4 sm:p-6 bg-white border-t border-stone-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-forest-950">
                    Traveling from Bengaluru
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Convenient drive via Bengaluru–Mysuru Expressway or Kanakapura Road.
                  </p>
                </div>
                <a
                  href={resortConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-800 hover:text-gold transition-colors whitespace-nowrap self-start sm:self-auto"
                >
                  <span>Get Driving Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
