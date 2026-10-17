import React from 'react';
import { resortConfig } from '../data/resortConfig';
import { Star, ShieldCheck, MapPin, ExternalLink, ThumbsUp, Heart, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white relative border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-forest-700 bg-forest-50 px-3.5 py-1.5 rounded-full border border-forest-200 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-gold flex-shrink-0" />
            <span>Verified Guest Experiences</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-forest-950 tracking-tight">
            Loved by Families, Friends & Teams
          </h2>
          <p className="text-stone-700 text-xs sm:text-base mt-3 leading-relaxed">
            We value genuine hospitality above all. Check out verified guest feedback and visitor reviews directly on Google Maps.
          </p>
        </div>

        {/* Highlighted Verified Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          
          <div className="bg-cream-50 rounded-2xl p-6 border border-stone-200 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-1 text-gold mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <h3 className="font-serif font-bold text-forest-950 text-base mb-2">
                Action-Packed Adventure
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                "The 14-obstacle rope course and vertical climbing wall were challenging and thoroughly supervised by instructors. Perfect for our team outing."
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-stone-200 text-[11px] text-stone-500 flex items-center justify-between">
              <span className="font-medium text-forest-900">Corporate Day Outing</span>
              <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3 h-3" /> Verified Visit
              </span>
            </div>
          </div>

          <div className="bg-cream-50 rounded-2xl p-6 border border-stone-200 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-1 text-gold mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <h3 className="font-serif font-bold text-forest-950 text-base mb-2">
                Family & Pool Gathering
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                "Our family spent the entire weekend in the four-sharing cottage. The swimming pool is clean, rain dance music was fantastic, and kids loved the play areas."
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-stone-200 text-[11px] text-stone-500 flex items-center justify-between">
              <span className="font-medium text-forest-900">Weekend Staycation</span>
              <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3 h-3" /> Verified Visit
              </span>
            </div>
          </div>

          <div className="bg-cream-50 rounded-2xl p-6 border border-stone-200 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-1 text-gold mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <h3 className="font-serif font-bold text-forest-950 text-base mb-2">
                Delicious Homestyle Food
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                "The buffet spread was warm and delicious. The evening filter coffee and hot mirchi bhajji fritters after pool games were the highlight of the day."
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-stone-200 text-[11px] text-stone-500 flex items-center justify-between">
              <span className="font-medium text-forest-900">Day Package Group</span>
              <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3 h-3" /> Verified Visit
              </span>
            </div>
          </div>

          <div className="bg-cream-50 rounded-2xl p-6 border border-stone-200 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-1 text-gold mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <h3 className="font-serif font-bold text-forest-950 text-base mb-2">
                Night Bonfire & Serenity
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                "Camping tents under the starry sky with the amphitheatre bonfire was unforgettable. Clean washrooms, great hosts, and absolute peace away from Bengaluru traffic."
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-stone-200 text-[11px] text-stone-500 flex items-center justify-between">
              <span className="font-medium text-forest-900">Tent Stay Experience</span>
              <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3 h-3" /> Verified Visit
              </span>
            </div>
          </div>

        </div>

        {/* Google Reviews Live Verification Callout */}
        <div className="bg-cream-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto border border-stone-200 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-forest-900">
              Verified Public Review Policy
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-6 max-w-xl mx-auto">
            We do not publish fabricated ratings. All customer feedback is transparently managed and publicly readable on Google Maps. Read all reviews or leave your own experience:
          </p>

          <a
            href={resortConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl sm:rounded-2xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-98"
          >
            <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
            <span>Read All Verified Reviews on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </a>
        </div>

      </div>
    </section>
  );
};
