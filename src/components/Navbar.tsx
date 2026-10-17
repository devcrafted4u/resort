import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle, Calendar } from 'lucide-react';
import { ResortLogo } from './ResortLogo';
import { resortConfig, getWhatsAppUrl } from '../data/resortConfig';
import { scrollToSection } from '../lib/utils';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open (bulletproof iOS Safari fix)
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [mobileMenuOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: 'hero' },
    { label: 'About', href: 'about' },
    { label: 'Packages', href: 'day-outings' },
    { label: 'Stays', href: 'accommodation' },
    { label: 'Activities', href: 'activities' },
    { label: 'Dining', href: 'dining' },
    { label: 'Events', href: 'events' },
    { label: 'Gallery', href: 'gallery' },
    { label: 'Reviews', href: 'reviews' },
    { label: 'Contact', href: 'contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    scrollToSection(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full pt-[max(0.6rem,env(safe-area-inset-top,0px))] pl-[env(safe-area-inset-left,0px)] pr-[env(safe-area-inset-right,0px)] ${
          isScrolled
            ? 'bg-forest-900/95 backdrop-blur-md shadow-lg pb-2.5 sm:pb-3 text-white border-b border-gold/20'
            : 'bg-gradient-to-b from-forest-950/95 via-forest-950/70 to-transparent pb-3 sm:pb-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            
            {/* Logo */}
            <div onClick={() => handleLinkClick('hero')} className="cursor-pointer flex-shrink-0">
              <ResortLogo variant="dark" />
            </div>

            {/* Desktop Navigation (Visible on Large Screens 1024px+) */}
            <nav className="hidden xl:flex items-center gap-6 2xl:gap-8" role="navigation" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-xs 2xl:text-sm font-medium text-cream-100 hover:text-gold transition-colors tracking-wide relative group py-1 whitespace-nowrap"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* Action CTAs Desktop */}
            <div className="hidden lg:flex items-center gap-2.5 2xl:gap-3 flex-shrink-0">
              <a
                href={`tel:${resortConfig.phone}`}
                className="flex items-center gap-1.5 2xl:gap-2 text-xs font-medium text-cream-200 hover:text-white px-3 py-2 rounded-full border border-white/20 hover:border-gold/50 transition-all whitespace-nowrap"
                title="Call Resort Reception"
              >
                <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>{resortConfig.phoneDisplay}</span>
              </a>

              <button
                onClick={() => handleLinkClick('enquiry')}
                className="flex items-center gap-1.5 2xl:gap-2 bg-gold hover:bg-gold-light text-forest-950 text-xs 2xl:text-sm font-bold px-4 2xl:px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>Book Your Stay</span>
              </button>
            </div>

            {/* Tablet & Mobile Header Actions (<1280px / <1024px) */}
            <div className="flex items-center gap-1.5 sm:gap-2 xl:hidden flex-shrink-0">
              {/* Quick WhatsApp button for mobile/tablet */}
              <a
                href={getWhatsAppUrl("Hello Sams Eden Resorts! I would like to enquire about packages.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow-sm"
                aria-label="WhatsApp quick chat"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              {/* Hamburger Menu Toggle Button */}
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 hover:bg-white/20 text-cream-100 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Collapsible Mobile & Tablet Drawer */}
        <div
          className={`xl:hidden transition-all duration-300 ease-in-out overflow-hidden border-t ${
            mobileMenuOpen
              ? 'max-h-[85vh] max-h-[85svh] opacity-100 border-gold/20'
              : 'max-h-0 opacity-0 pointer-events-none border-transparent'
          } bg-forest-950/98 backdrop-blur-2xl px-4 pt-3 pb-[max(2.5rem,calc(env(safe-area-inset-bottom,0px)+2rem))] shadow-2xl overflow-y-auto no-scrollbar`}
        >
          <div className="flex flex-col gap-1 max-w-lg mx-auto">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="text-left px-4 py-3.5 rounded-xl text-base font-semibold text-cream-100 hover:text-gold hover:bg-white/5 transition-all flex items-center justify-between border-b border-white/5"
              >
                <span>{link.label}</span>
                <span className="text-gold text-xs">→</span>
              </button>
            ))}

            <div className="mt-4 pt-4 flex flex-col gap-3">
              <button
                onClick={() => handleLinkClick('enquiry')}
                className="w-full min-h-[48px] flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-forest-950 font-bold py-3.5 px-4 rounded-2xl shadow-lg transition-all text-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Your Stay / Enquire</span>
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:${resortConfig.phone}`}
                  className="min-h-[44px] flex items-center justify-center gap-2 py-3 px-3 rounded-xl border border-white/20 text-cream-100 text-xs font-semibold hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="truncate">Call Desk</span>
                </a>

                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 xl:hidden animate-fade-in"
          aria-hidden="true"
        />
      )}
    </>
  );
};
