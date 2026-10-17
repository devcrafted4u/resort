import React, { useState } from 'react';
import { eventPackages, getWhatsAppUrl } from '../data/resortConfig';
import { MessageCircle, Check, Calendar, Sparkles, Filter, ChevronRight, GraduationCap, Briefcase, HeartHandshake, Cake, Sun } from 'lucide-react';
import { scrollToSection } from '../lib/utils';
import { EventPackage } from '../types';

interface EventsSectionProps {
  onSelectEventType?: (eventType: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onSelectEventType }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'All Gatherings (5)', icon: Sparkles },
    { id: 'corporate', label: 'Corporate & Teams', icon: Briefcase },
    { id: 'weddings', label: 'Weddings & Sangeet', icon: HeartHandshake },
    { id: 'birthdays', label: 'Birthdays & Family', icon: Cake },
    { id: 'student', label: 'Student Excursions', icon: GraduationCap },
    { id: 'dayout', label: 'Weekend Getaways', icon: Sun },
  ];

  const filteredEvents = selectedFilter === 'all'
    ? eventPackages
    : eventPackages.filter((pkg) => pkg.category === selectedFilter);

  const handleEnquire = (event: EventPackage) => {
    if (onSelectEventType) {
      onSelectEventType(event.title);
    }
    scrollToSection('enquiry');
  };

  return (
    <section id="events" className="py-16 sm:py-24 bg-cream-50 relative border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-forest-700 bg-forest-100 px-3.5 py-1.5 rounded-full border border-forest-200">
            Celebrations & Group Retreats
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-forest-950 mt-4 tracking-tight">
            Weddings, Corporate & Group Events
          </h2>
          <p className="text-stone-700 text-xs sm:text-base mt-3 leading-relaxed">
            From focused corporate summits and energetic team outings to starlit wedding celebrations and student educational camps, our vast manicured lawns and dedicated event facilities provide the perfect venue.
          </p>

          {/* Interactive Event Filter Tabs */}
          <div className="mt-8 flex items-center justify-center">
            <div className="flex items-center gap-1.5 p-1.5 bg-stone-200/80 rounded-2xl border border-stone-300 max-w-full overflow-x-auto">
              {filterTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = selectedFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedFilter(tab.id)}
                    className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-forest-900 text-white shadow-md'
                        : 'text-stone-700 hover:text-stone-950 hover:bg-stone-300/60'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-gold' : 'text-stone-500'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200 flex flex-col justify-between group hover:-translate-y-1"
            >
              {/* Photo Header */}
              <div className="relative aspect-[16/10] sm:h-60 overflow-hidden bg-stone-100">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent pointer-events-none" />
                
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-forest-900/90 text-gold-light text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gold/30 line-clamp-1 max-w-[85%]">
                  <span>{event.suitableFor}</span>
                </div>

                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white pointer-events-none">
                  <h3 className="font-serif text-lg sm:text-xl font-bold">
                    {event.title}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-6 lg:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4">
                    {event.description}
                  </p>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900 mb-2.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span>Venue Highlights</span>
                  </h4>

                  <ul className="space-y-1.5 text-xs text-stone-700 mb-6">
                    {event.highlights.map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTAs with minimum 46px touch target */}
                <div className="pt-4 border-t border-stone-100 grid grid-cols-1 gap-2.5">
                  <a
                    href={getWhatsAppUrl(event.whatsappMessage, { packageTitle: event.title })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[46px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-98"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enquire on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => handleEnquire(event)}
                    className="min-h-[46px] flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-forest-800 text-forest-900 hover:bg-forest-900 hover:text-white font-semibold text-xs sm:text-sm transition-all active:scale-98"
                  >
                    <span>Request Event Quotation</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate & Large Gathering Hospitality Note */}
        <div className="mt-12 p-6 bg-white rounded-2xl border border-stone-200 shadow-xs max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif font-bold text-forest-950 text-base sm:text-lg">
              Planning a Large Gathering (50+ to 500+ Guests)?
            </h4>
            <p className="text-xs text-stone-600 mt-1">
              Customized event staging, sound systems, specialized banqueting, and dedicated coordinator assistance are available.
            </p>
          </div>
          <button
            onClick={() => scrollToSection('enquiry')}
            className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs transition-all shadow-sm active:scale-95"
          >
            Contact Event Desk
          </button>
        </div>

      </div>
    </section>
  );
};
