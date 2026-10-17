import React, { useState } from 'react';
import { activitiesList, activityAlbums } from '../data/resortConfig';
import { Compass, Waves, Trophy, HeartHandshake, Eye, Sparkles, Folder, Grid, ChevronRight, Layers, ShieldCheck } from 'lucide-react';
import { ActivityItem, ActivityAlbum } from '../types';

interface ActivitiesSectionProps {
  onOpenImage?: (src: string, title: string) => void;
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ onOpenImage }) => {
  const [viewMode, setViewMode] = useState<'albums' | 'grid'>('albums');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    { id: 'All', label: 'All Activities', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'Adventure', label: 'Adventure', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'Pool & Recreation', label: 'Pool & Water', icon: <Waves className="w-3.5 h-3.5" /> },
    { id: 'Sports & Games', label: 'Sports & Games', icon: <Trophy className="w-3.5 h-3.5" /> },
    { id: 'Family & Group', label: 'Family & Group', icon: <HeartHandshake className="w-3.5 h-3.5" /> },
  ];

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case 'Adventure':
        return <Compass className="w-4 h-4 text-amber-600 flex-shrink-0" />;
      case 'Pool & Recreation':
        return <Waves className="w-4 h-4 text-cyan-600 flex-shrink-0" />;
      case 'Sports & Games':
        return <Trophy className="w-4 h-4 text-orange-600 flex-shrink-0" />;
      case 'Family & Group':
        return <HeartHandshake className="w-4 h-4 text-emerald-600 flex-shrink-0" />;
      default:
        return <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />;
    }
  };

  const filteredAlbums = selectedCategory === 'All'
    ? activityAlbums
    : activityAlbums.filter((album) => album.category === selectedCategory);

  const filteredGridItems = selectedCategory === 'All'
    ? activitiesList
    : activitiesList.filter((item) => item.category === selectedCategory);

  const handleOpenAlbumFirstPhoto = (album: ActivityAlbum) => {
    if (!onOpenImage) return;
    const firstAct = activitiesList.find((a) => album.activityIds.includes(a.id));
    if (firstAct) {
      onOpenImage(firstAct.image, firstAct.name);
    }
  };

  return (
    <section id="activities" className="py-16 sm:py-24 bg-cream-50 relative border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-forest-700 bg-forest-100 px-3.5 py-1.5 rounded-full border border-forest-200 mb-3">
            <Layers className="w-3.5 h-3.5 text-gold" />
            <span>Curated Activity Collections</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-forest-950 tracking-tight">
            Activities & Amenities
          </h2>
          <p className="text-stone-700 text-xs sm:text-base mt-3 leading-relaxed">
            From the rush of 14 high-rope obstacles and ziplining to peaceful poolside lounging and friendly cricket matches. Swipe through albums on mobile to explore without endless vertical scrolling.
          </p>
        </div>

        {/* View Mode & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 sm:mb-10 pb-4 border-b border-stone-200/80">
          
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full pb-1 no-scrollbar w-full md:w-auto">
            {categories.map((cat) => {
              const count = cat.id === 'All'
                ? activitiesList.length
                : activitiesList.filter((a) => a.category === cat.id).length;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`min-h-[40px] px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 active:scale-95 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-forest-900 text-white shadow-md border border-gold/40'
                      : 'bg-white text-stone-700 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-0.5 ${
                    isSelected ? 'bg-gold text-forest-950' : 'bg-stone-100 text-stone-700'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode Switcher: Albums vs Grid */}
          <div className="flex items-center gap-1 bg-cream-200/80 p-1 rounded-xl self-end md:self-auto flex-shrink-0 border border-stone-200">
            <button
              onClick={() => setViewMode('albums')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'albums'
                  ? 'bg-forest-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Album card view with swipeable horizontal cards (recommended for mobile)"
            >
              <Folder className="w-3.5 h-3.5" />
              <span>Albums</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'grid'
                  ? 'bg-forest-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Classic expanded grid of all activities"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>All Grid</span>
            </button>
          </div>

        </div>

        {/* 1. ALBUMS VIEW (Default: Solves the long phone scroll problem with horizontal swipe rows!) */}
        {viewMode === 'albums' && (
          <div className="space-y-8 sm:space-y-10 animate-fade-in">
            {filteredAlbums.map((album) => {
              const albumActivities = activitiesList.filter((a) => album.activityIds.includes(a.id));

              return (
                <div
                  key={album.id}
                  className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-stone-200 shadow-sm transition-all hover:shadow-md"
                >
                  {/* Album Header */}
                  <div className="flex items-start justify-between pb-3.5 mb-3.5 border-b border-stone-100 gap-2">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-cream-100 border border-stone-200 flex items-center justify-center shadow-xs flex-shrink-0 mt-0.5">
                        {getCategoryIcon(album.category)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-serif text-sm sm:text-lg font-bold text-forest-950">
                            {album.title}
                          </h3>
                          <span className="text-[10px] font-bold text-forest-900 bg-forest-100 px-2 py-0.5 rounded-full border border-forest-200 flex-shrink-0">
                            {albumActivities.length} Activities
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 line-clamp-1 mt-0.5">
                          {album.tagline}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenAlbumFirstPhoto(album)}
                      className="min-h-[32px] sm:min-h-[36px] flex-shrink-0 inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-xl bg-cream-50 hover:bg-forest-900 hover:text-white border border-stone-300 text-forest-900 text-xs font-semibold transition-all shadow-xs active:scale-95 mt-0.5"
                    >
                      <span className="hidden sm:inline">View Photos ({albumActivities.length})</span>
                      <span className="sm:hidden text-[11px] font-medium">Photos ({albumActivities.length})</span>
                      <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>

                  {/* Horizontal Touch-Swipeable Activities Row (No endless vertical scrolling on phones!) */}
                  <div className="flex gap-3.5 overflow-x-auto pb-2 pt-1 no-scrollbar snap-x snap-mandatory scroll-smooth">
                    {albumActivities.map((act) => (
                      <div
                        key={act.id}
                        className="w-60 xs:w-68 sm:w-72 md:w-80 flex-shrink-0 snap-start bg-cream-50/60 rounded-xl sm:rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group hover:-translate-y-0.5"
                      >
                        {/* Card Image */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                          <img
                            src={act.image}
                            alt={act.name}
                            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 cursor-pointer"
                            onClick={() => onOpenImage && onOpenImage(act.image, act.name)}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/75 via-transparent to-transparent pointer-events-none" />

                          {act.badge && (
                            <span className="absolute top-2.5 left-2.5 bg-forest-900/90 text-gold-light text-[10px] font-bold px-2 py-0.5 rounded-full border border-gold/30 shadow-xs">
                              {act.badge}
                            </span>
                          )}

                          {onOpenImage && (
                            <button
                              onClick={() => onOpenImage(act.image, act.name)}
                              className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 hover:bg-forest-900 text-white flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity active:scale-95 shadow-md"
                              aria-label={`View photo of ${act.name}`}
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <div className="absolute bottom-2 left-2.5 right-2.5 text-white pointer-events-none">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-gold-light">
                              {act.category}
                            </span>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between bg-white">
                          <div>
                            <h4 className="font-serif text-sm sm:text-base font-bold text-forest-950 group-hover:text-forest-700 transition-colors">
                              {act.name}
                            </h4>
                            <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                              {act.description}
                            </p>
                          </div>
                          <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                            <span className="font-medium text-forest-800">Included in Package</span>
                            {onOpenImage && (
                              <button
                                onClick={() => onOpenImage(act.image, act.name)}
                                className="text-gold-dark hover:underline font-semibold flex items-center gap-0.5"
                              >
                                Enlarge <ChevronRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile Swipe Hint */}
                  <div className="sm:hidden flex items-center justify-between text-[11px] text-stone-500 mt-2 pt-1 border-t border-stone-100">
                    <span>Swipe left/right to browse {albumActivities.length} activities</span>
                    <span className="text-gold-dark font-medium">Touch to enlarge</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. ALL ACTIVITIES GRID VIEW (Alternative full layout) */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 animate-fade-in">
            {filteredGridItems.map((act) => (
              <div
                key={act.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200 flex flex-col group hover:-translate-y-1"
              >
                {/* Photo with Badge */}
                <div className="relative aspect-[16/10] sm:h-48 overflow-hidden bg-stone-100">
                  <img
                    src={act.image}
                    alt={act.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                    onClick={() => onOpenImage && onOpenImage(act.image, act.name)}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent pointer-events-none" />

                  {act.badge && (
                    <span className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 bg-forest-900/90 text-gold-light text-[10px] font-bold px-2.5 py-1 rounded-full border border-gold/30">
                      {act.badge}
                    </span>
                  )}

                  {onOpenImage && (
                    <button
                      onClick={() => onOpenImage(act.image, act.name)}
                      className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity active:scale-95"
                      aria-label={`View ${act.name}`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <div className="absolute bottom-2 sm:bottom-2.5 left-3 right-3 text-white pointer-events-none">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gold-light">
                      {act.category}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-forest-950 group-hover:text-forest-700 transition-colors">
                      {act.name}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1.5 sm:mt-2 leading-relaxed">
                      {act.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span className="font-medium text-forest-800">Included in Package</span>
                    {onOpenImage && (
                      <button
                        onClick={() => onOpenImage(act.image, act.name)}
                        className="text-gold-dark hover:underline font-semibold"
                      >
                        Enlarge
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Safety & Gear Guarantee Banner */}
        <div className="mt-10 sm:mt-12 p-3.5 sm:p-4 rounded-2xl bg-white border border-stone-200 text-center max-w-xl mx-auto flex items-center justify-center gap-2 text-xs text-stone-700 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-forest-800 flex-shrink-0" />
          <span>All adventure rope activities and climbing include certified safety harnesses, tested belays, and trained instructors.</span>
        </div>

      </div>
    </section>
  );
};
