
export enum UserRole {
  USER = 'user',
  VENDOR = 'vendor',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export enum Region {
  NORTH = 'north',
  CENTER = 'center',
  SOUTH = 'south',
}

export enum VendorCategory {
  VENUE = 'venue',
  FOOD = 'food',
  BEAUTY = 'beauty',
  PHOTOGRAPHY = 'photography',
  ENTERTAINMENT = 'entertainment',
  DECORATION = 'decoration',
  RENTAL = 'rental',
  DRESSES = 'dresses',
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  subCategory?: string;
  region: Region;
  city: string;
  addressText: string;
  latitude: number;
  longitude: number;
  wazeUrl: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  phone: string;
  whatsapp: string;
  ratingAverage: number;
  ratingCount: number;
  heroImageUrl: string;
  galleryImages: string[];
  reviews?: Review[];
}

export enum EventType {
  WEDDING = 'wedding',
  ENGAGEMENT = 'engagement',
  BIRTHDAY = 'birthday',
  GRADUATION = 'graduation',
  BABY = 'baby',
  CORPORATE = 'corporate',
  OTHER = 'other',
}

export interface RSVP {
  id: string;
  eventId: string;
  name: string;
  status: 'yes' | 'no' | 'maybe';
  count: number;
  notes?: string;
  timestamp?: string;
}

export interface EventModel {
  id: string;
  ownerId: string;
  title: string;
  hostName: string;
  type: EventType;
  date: string;
  time: string;
  region: Region;
  city: string;
  addressText: string;
  latitude: number;
  longitude: number;
  wazeUrl: string;
  description: string;
  coverImageUrl: string;
  templateType: string;
  isPublic: boolean;
  attendees: RSVP[];
}

export interface Dress {
  id: string;
  vendorId: string;
  title: string;
  type: 'wedding' | 'engagement' | 'evening' | 'kids';
  forSale: boolean;
  forRent: boolean;
  priceSale?: number;
  priceRent?: number;
  size: string;
  color: string;
  region: Region;
  city: string;
  mainImageUrl: string;
  description: string;
  reviews?: Review[];
}

export interface PackageModel {
  id: string;
  title: string;
  occasionType: EventType;
  description: string;
  price: number;
  includedServices: string[];
  images: string[];
  city: string;
  region: Region;
  latitude: number;
  longitude: number;
  wazeUrl: string;
  ratingAverage: number;
  ratingCount: number;
  reviews?: Review[];
  heroImageUrl: string;
}

export interface NotificationItem {
  id: string;
  kind: string; // 'offer' | 'message' | 'general' | 'booking'
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  category: EventType;
}

export interface NotificationSettings {
  enabled: boolean;
  pushEnabled: boolean;
  emailEnabled: boolean;
  soundEnabled: boolean;
  categories: EventType[];
  quietHours: {
    enabled: boolean;
    fromHour: number; // 0–23
    toHour: number;   // 0–23
  };
}
