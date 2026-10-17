export interface PackagePricing {
  discountedPrice: number;
  brochurePrice?: number;
  unit: string;
  taxInclusive: boolean;
  status: 'provisional' | 'approved';
  notes?: string;
}

export interface DayOutingPackage {
  id: string;
  title: string;
  subtitle: string;
  timing: string;
  pricing: PackagePricing;
  image: string;
  popular?: boolean;
  inclusions: string[];
  exclusions?: string[];
  whatsappMessage: string;
}

export interface StandardDayPackage {
  id: string;
  tier: 'Silver' | 'Gold' | 'Diamond';
  title: string;
  subtitle: string;
  timing: string;
  publishedPrice: number;
  taxRateNote: string;
  image: string;
  badge?: string;
  inclusions: string[];
  whatsappMessage: string;
}

export interface AccommodationCategory {
  id: string;
  name: string;
  tagline: string;
  occupancy: string;
  pricing: PackagePricing;
  image: string;
  galleryImages: string[];
  description: string;
  features: string[];
  chargingBasisNote?: string;
  whatsappMessage: string;
}

export interface RoomSharingCategory {
  id: string;
  title: string;
  sharingType: '2-Sharing' | '4-Sharing' | '7-Sharing' | '10-Sharing';
  capacity: string;
  tagline: string;
  description: string;
  image: string;
  galleryImages: string[];
  features: string[];
  mealPlans: {
    cp: string; // Continental Plan (Breakfast)
    map: string; // Modified American Plan (Breakfast + Lunch or Dinner)
    ap: string; // American Plan (All Meals)
  };
  notes: string;
  whatsappMessage: string;
}

export interface ActivityItem {
  id: string;
  name: string;
  category: 'Adventure' | 'Pool & Recreation' | 'Sports & Games' | 'Family & Group';
  description: string;
  image: string;
  badge?: string;
}

export interface ActivityAlbum {
  id: string;
  category: 'Adventure' | 'Pool & Recreation' | 'Sports & Games' | 'Family & Group';
  title: string;
  tagline: string;
  icon: string;
  badge?: string;
  activityIds: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Resort Overview' | 'Swimming Pool' | 'Accommodation' | 'Adventure Activities' | 'Food & Dining' | 'Events & Celebrations';
  type: 'image' | 'video';
  src: string;
  thumbnail: string;
  caption: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  coverImage: string;
  itemIds: string[];
}

export interface EventPackage {
  id: string;
  title: string;
  category: 'corporate' | 'weddings' | 'birthdays' | 'student' | 'dayout';
  description: string;
  image: string;
  suitableFor: string;
  highlights: string[];
  whatsappMessage: string;
}

export interface LeadFormData {
  fullName: string;
  phone: string;
  visitType: string;
  preferredDate: string;
  guestCount: number;
  message?: string;
}

export interface ContactNumberInfo {
  number: string;
  display: string;
  label: string;
  source: 'presentation' | 'website';
  whatsappEnabled: boolean;
  notes: string;
}

export interface ResortConfig {
  name: string;
  tagline: string;
  slogan: string;
  category: string;
  address: string;
  email: string;
  officialWebsite: string;
  contactNumbers: {
    pptBookingLine: ContactNumberInfo;
    websiteAlternate1: ContactNumberInfo;
    websiteAlternate2: ContactNumberInfo;
  };
  activeBookingPhone: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  mapsUrl: string;
  embedMapsUrl: string;
  pricingSettings: {
    showPrices: boolean;
    showDiscountedPrices: boolean;
    pricesPendingConfirmation: boolean;
    taxInclusiveNote: string;
  };
}
