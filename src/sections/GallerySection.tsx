import React, { useState } from 'react';
import { galleryItems, galleryAlbums } from '../data/resortConfig';
import { Play, Eye, Film, Sparkles, Folder, Grid, Waves, Home, Compass, Utensils, ArrowRight, ChevronRight, Layers } from 'lucide-react';
import { GalleryItem, GalleryAlbum } from '../types';

interface GallerySectionProps {
  onOpenLightbox: (index: number) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenLightbox }) => {
  const [viewMode, setViewMode] = useState<'albums' | 'grid'>('albums');
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>('all');

  const getAlbumIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves':
        return <Waves className="w-4 h-4 text-cyan-600 flex-shrink-0" />;
      case 'Home':
        return <Home className="w-4 h-4 text-emerald-600 flex-shrink-0" />;
      case 'Compass':
        return <Compass className="w-4 h-4 text-amber-600 flex-shrink-0" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />;
      case 'Utensils':
        return <Utensils className="w-4 h-4 text-orange-600 flex-shrink-0" />;
      case 'Film':
        return <Film className="w-4 h-4 text-rose-600 flex-shrink-0" />;
      default:
        return <Folder className="w-4 h-4 text-forest-700 flex-shrink-0" />;
    }
  };

  const filteredAlbums = selectedAlbumId === 'all'
    ? galleryAlbums
    : galleryAlbums.filter((album) => album.id === selectedAlbumId);

  const filteredGridItems = selectedAlbumId === 'all'
    ? galleryItems
    : (() => {
        const targetAlbum = galleryAlbums.find((a) => a.id === selectedAlbumId);
        return targetAlbum
          ? galleryItems.filter((item) => targetAlbum.itemIds.includes(item.id))
          : galleryItems;
      })();

  const handleOpenAlbum = (album: GalleryAlbum) => {
    const firstItemId = album.itemIds[0];
    const index = galleryItems.findIndex((g) => g.id === firstItemId);
    onOpenLightbox(index !== -1 ? index : 0);
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-white relative border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-forest-700 bg-forest-50 px-3.5 py-1.5 rounded-full border border-forest-200 mb-3">
            <Layers className="w-3.5 h-3.5 text-gold" />
            <span>Curated Photo & Video Albums</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-forest-950 tracking-tight">
            Resort Gallery Albums
          </h2>
          <p className="text-stone-700 text-xs sm:text-base mt-3 leading-relaxed">
            Browse our resort photo collections grouped neatly by experience. Swipe through albums on mobile to explore without endless vertical scrolling.
          </p>
        </div>

        {/* View Mode & Album Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 sm:mb-10 pb-4 border-b border-stone-100">
          
          {/* Album Category Filter Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full pb-1 no-scrollbar w-full md:w-auto">
            <button
              onClick={() => setSelectedAlbumId('all')}
              className={`min-h-[40px] px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 active:scale-95 flex items-center gap-1.5 ${
                selectedAlbumId === 'all'
                  ? 'bg-forest-900 text-white shadow-md border border-gold/30'
                  : 'bg-cream-100 text-stone-700 hover:text-stone-900 hover:bg-cream-200'
              }`}
            >
              <Folder className="w-3.5 h-3.5 text-gold" />
              <span>All Albums</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-forest-800 text-gold-light ml-0.5">
                {galleryAlbums.length}
              </span>
            </button>

            {galleryAlbums.map((album) => (
              <button
                key={album.id}
                onClick={() => setSelectedAlbumId(album.id)}
                className={`min-h-[40px] px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 active:scale-95 flex items-center gap-1.5 ${
                  selectedAlbumId === album.id
                    ? 'bg-forest-900 text-white shadow-md border border-gold/30'
                    : 'bg-cream-100 text-stone-700 hover:text-stone-900 hover:bg-cream-200'
                }`}
              >
                {getAlbumIcon(album.icon)}
                <span>{album.title.split('&')[0].trim()}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/10 text-stone-700 font-bold ml-0.5">
                  {album.itemIds.length}
                </span>
              </button>
            ))}
          </div>

          {/* View Mode Switcher: Albums vs Grid */}
          <div className="flex items-center gap-1 bg-cream-200 p-1 rounded-xl self-end md:self-auto flex-shrink-0">
            <button
              onClick={() => setViewMode('albums')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'albums'
                  ? 'bg-forest-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Album card view with swipeable photo strips (recommended for mobile)"
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
              title="Classic expanded grid of all photos"
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
              const albumItems = galleryItems.filter((item) => album.itemIds.includes(item.id));
              return (
                <div
                  key={album.id}
                  className="bg-cream-50/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-stone-200 shadow-sm transition-all hover:shadow-md"
                >
                  {/* Album Header */}
                  <div className="flex flex-col xs:flex-row xs:items-center justify-between pb-3.5 mb-3.5 border-b border-stone-200/80 gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center shadow-xs">
                        {getAlbumIcon(album.icon)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif text-base sm:text-lg font-bold text-forest-950">
                            {album.title}
                          </h3>
                          <span className="text-[10px] font-bold text-forest-900 bg-forest-100 px-2 py-0.5 rounded-full border border-forest-200">
                            {albumItems.length} {albumItems.some(i => i.type === 'video') ? 'Media' : 'Photos'}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 line-clamp-1 mt-0.5">
                          {album.tagline}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenAlbum(album)}
                      className="self-start xs:self-auto min-h-[38px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-forest-900 hover:text-white border border-stone-300 text-forest-900 text-xs font-semibold transition-all shadow-xs active:scale-95"
                    >
                      <span>Open Album ({albumItems.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Horizontal Touch-Swipeable Album Photo Row (No vertical scrolling needed on phone!) */}
                  <div className="flex gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar snap-x snap-mandatory scroll-smooth">
                    {albumItems.map((item) => {
                      const globalIdx = galleryItems.findIndex((g) => g.id === item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => onOpenLightbox(globalIdx)}
                          className="group relative flex-shrink-0 w-44 xs:w-52 sm:w-60 md:w-64 aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-stone-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer snap-start border border-stone-200 active:scale-98"
                        >
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                          {/* Video Badge */}
                          {item.type === 'video' && (
                            <div className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                              <Film className="w-3 h-3" />
                              <span>Video</span>
                            </div>
                          )}

                          {/* Center Touch Indicator */}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {item.type === 'video' ? (
                              <div className="w-10 h-10 rounded-full bg-gold/95 text-forest-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Play className="w-4 h-4 fill-forest-950 ml-0.5" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-white/85 text-forest-950 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110">
                                <Eye className="w-4 h-4" />
                              </div>
                            )}
                          </div>

                          {/* Caption */}
                          <div className="absolute bottom-2 left-2.5 right-2.5 text-white pointer-events-none">
                            <h4 className="font-serif text-xs font-medium line-clamp-1">
                              {item.title}
                            </h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mobile Swipe Hint */}
                  <div className="sm:hidden flex items-center justify-between text-[11px] text-stone-500 mt-1 pt-1">
                    <span>Swipe left/right to browse {albumItems.length} photos</span>
                    <span className="text-gold-dark font-medium">Touch to enlarge</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. ALL PHOTOS GRID VIEW (Alternative full layout) */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 animate-fade-in">
            {filteredGridItems.map((item) => {
              const originalIndex = galleryItems.findIndex((g) => g.id === item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => onOpenLightbox(originalIndex)}
                  className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer aspect-square sm:aspect-[4/3] flex items-center justify-center border border-stone-200 active:scale-98"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {item.type === 'video' && (
                    <div className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                      <Film className="w-3.5 h-3.5" />
                      <span>Video Tour</span>
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {item.type === 'video' ? (
                      <div className="w-12 h-12 rounded-full bg-gold/95 text-forest-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-forest-950 ml-0.5" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 text-forest-950 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110">
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white opacity-95 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gold-light">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-xs sm:text-sm font-semibold line-clamp-1 mt-0.5">
                      {item.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Full-screen lightbox callout */}
        <div className="mt-10 sm:mt-12 p-3.5 sm:p-4 rounded-2xl bg-cream-50 border border-stone-200 text-center max-w-xl mx-auto flex items-center justify-center gap-2 text-xs text-stone-700">
          <Film className="w-4 h-4 text-forest-800 flex-shrink-0" />
          <span>Tap any photo or album to view in high resolution with smooth circular navigation and video playback.</span>
        </div>

      </div>
    </section>
  );
};
