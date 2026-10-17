import React, { useState } from 'react';
import { PricingProvider } from './context/PricingContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { PackageOverview } from './sections/PackageOverview';
import { AboutSection } from './sections/AboutSection';
import { AccommodationSection } from './sections/AccommodationSection';
import { ActivitiesSection } from './sections/ActivitiesSection';
import { DayOutingSection } from './sections/DayOutingSection';
import { DiningSection } from './sections/DiningSection';
import { EventsSection } from './sections/EventsSection';
import { GallerySection } from './sections/GallerySection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { LeadFormSection } from './sections/LeadFormSection';
import { LocationSection } from './sections/LocationSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ClientPricingDrawer } from './components/ClientPricingDrawer';
import { Lightbox } from './components/Lightbox';
import { galleryItems } from './data/resortConfig';

export const App: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedVisitType, setSelectedVisitType] = useState<string>('Day Outing (With Breakfast) - ₹1,000');

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleOpenImageDirectly = (src: string, title: string) => {
    const existingIndex = galleryItems.findIndex((g) => g.src === src || g.thumbnail === src);
    if (existingIndex !== -1) {
      setLightboxIndex(existingIndex);
    } else {
      setLightboxIndex(0);
    }
  };

  return (
    <PricingProvider>
      <div className="min-h-screen bg-cream-50 text-stone-800 flex flex-col font-sans relative selection:bg-gold selection:text-white">
        
        {/* Sticky Responsive Header */}
        <Navbar />

        {/* Main Content Sections adhering strictly to Homepage Structure */}
        <main className="flex-1">
          {/* 1. Immersive Resort Hero */}
          <HeroSection />

          {/* 2. Package Overview */}
          <PackageOverview />

          {/* 3. About the Resort */}
          <AboutSection />

          {/* 4. Accommodation (Presentation Stays & Room Sharing Categories) */}
          <AccommodationSection
            onOpenImage={handleOpenImageDirectly}
            onSelectVisitType={setSelectedVisitType}
          />

          {/* 5. Adventure Activities and Amenities */}
          <ActivitiesSection onOpenImage={handleOpenImageDirectly} />

          {/* 6. Day-Outing Packages (Promotional & Standard Silver/Gold/Diamond) */}
          <DayOutingSection />

          {/* 7. Dedicated Dining & Multi-Course Buffets */}
          <DiningSection />

          {/* 8. Weddings, Events & Retreats */}
          <EventsSection onSelectEventType={setSelectedVisitType} />

          {/* 9. Image and Video Gallery */}
          <GallerySection onOpenLightbox={handleOpenLightbox} />

          {/* 10. Verified Customer Testimonials & Reviews */}
          <TestimonialsSection />

          {/* 11. Functional Lead Generation Enquiry Form */}
          <LeadFormSection initialVisitType={selectedVisitType} />

          {/* 12. Google Maps and Contact Information */}
          <LocationSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating WhatsApp Action Button */}
        <FloatingWhatsApp />

        {/* Client Pricing Configuration Drawer */}
        <ClientPricingDrawer />

        {/* Fullscreen Accessible Lightbox */}
        <Lightbox
          items={galleryItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIndex) => setLightboxIndex(newIndex)}
        />
      </div>
    </PricingProvider>
  );
};

export default App;
