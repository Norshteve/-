
import { Vendor, EventModel, RSVP, Dress, Region, VendorCategory, EventType, Review, PackageModel } from '../types';

// Specific Mock Data as requested
const MOCK_REVIEWS: Review[] = [
  { id: 'r1', userName: 'سارة', rating: 5, comment: 'خدمة ممتازة وأنصح الجميع بها!', date: '2023-10-15' },
  { id: 'r2', userName: 'أحمد', rating: 4, comment: 'جيد جداً ولكن السعر مرتفع قليلاً.', date: '2023-11-02' }
];

const MOCK_VENDORS: Vendor[] = [
  {
    id: 'v1',
    name: 'قاعة ليالي',
    category: VendorCategory.VENUE,
    subCategory: 'قاعات أفراح',
    region: Region.SOUTH,
    city: 'بئر السبع',
    addressText: 'طريق الخليل',
    latitude: 31.25,
    longitude: 34.79,
    wazeUrl: 'https://waze.com',
    description: 'قاعة ليالي للأفراح والمناسبات السعيدة.',
    minPrice: 3000,
    maxPrice: 3000,
    phone: '0501234567',
    whatsapp: '972501234567',
    ratingAverage: 4.8,
    ratingCount: 120,
    heroImageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800',
    galleryImages: [],
    reviews: [...MOCK_REVIEWS]
  },
  {
    id: 'v2',
    name: 'قاعة الماس',
    category: VendorCategory.VENUE,
    subCategory: 'قاعات أفراح',
    region: Region.SOUTH,
    city: 'رهط',
    addressText: 'المنطقة الصناعية',
    latitude: 31.39,
    longitude: 34.75,
    wazeUrl: 'https://waze.com',
    description: 'فخامة الاسم تكفي، قاعة الماس.',
    minPrice: 2800,
    maxPrice: 2800,
    phone: '0521112233',
    whatsapp: '972521112233',
    ratingAverage: 4.5,
    ratingCount: 85,
    heroImageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800',
    galleryImages: [],
    reviews: []
  },
  {
    id: 'v3',
    name: 'تصوير حفلات - أحمد',
    category: VendorCategory.PHOTOGRAPHY,
    subCategory: 'تصوير فوتوغرافي',
    region: Region.NORTH,
    city: 'طمرة',
    addressText: 'حي الجبل',
    latitude: 32.85,
    longitude: 35.2,
    wazeUrl: 'https://waze.com',
    description: 'توثيق لحظاتكم الجميلة بأعلى دقة.',
    minPrice: 1200,
    maxPrice: 1200,
    phone: '0525556666',
    whatsapp: '972525556666',
    ratingAverage: 4.9,
    ratingCount: 40,
    heroImageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
    galleryImages: [],
    reviews: []
  },
  {
    id: 'v4',
    name: 'فيديو - ستوديو فلاش',
    category: VendorCategory.PHOTOGRAPHY,
    subCategory: 'تصوير فيديو',
    region: Region.CENTER,
    city: 'الطيبة',
    addressText: 'وسط البلد',
    latitude: 32.26,
    longitude: 35.0,
    wazeUrl: 'https://waze.com',
    description: 'تصوير فيديو سينمائي ومونتاج احترافي.',
    minPrice: 1500,
    maxPrice: 1500,
    phone: '0533334444',
    whatsapp: '972533334444',
    ratingAverage: 4.7,
    ratingCount: 60,
    heroImageUrl: 'https://images.unsplash.com/photo-1533512930330-4ac257c86793?auto=format&fit=crop&q=80&w=800',
    galleryImages: [],
    reviews: []
  },
  {
    id: 'v5',
    name: 'DJ سامر',
    category: VendorCategory.ENTERTAINMENT,
    subCategory: 'دي جي (DJ)',
    region: Region.SOUTH,
    city: 'تل السبع',
    addressText: '-',
    latitude: 31.2,
    longitude: 34.8,
    wazeUrl: 'https://waze.com',
    description: 'أقوى الحفلات والأجواء.',
    minPrice: 700,
    maxPrice: 700,
    phone: '0544445555',
    whatsapp: '972544445555',
    ratingAverage: 4.6,
    ratingCount: 25,
    heroImageUrl: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80&w=800',
    galleryImages: [],
    reviews: []
  },
  {
    id: 'v6',
    name: 'بوفيه شهي',
    category: VendorCategory.FOOD,
    subCategory: 'بوفيه مفتوح',
    region: Region.CENTER,
    city: 'يافا',
    addressText: '-',
    latitude: 32.05,
    longitude: 34.75,
    wazeUrl: 'https://waze.com',
    description: 'أطيب المأكولات الشرقية.',
    minPrice: 25,
    maxPrice: 25, 
    phone: '0522223344',
    whatsapp: '972522223344',
    ratingAverage: 4.8,
    ratingCount: 150,
    heroImageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800',
    galleryImages: [],
    reviews: []
  },
  {
    id: 'v7',
    name: 'ملكة الورد',
    category: VendorCategory.DECORATION,
    subCategory: 'تنسيق زهور',
    region: Region.SOUTH,
    city: 'شقيب السلام',
    addressText: '-',
    latitude: 31.2,
    longitude: 34.8,
    wazeUrl: 'https://waze.com',
    description: 'تزيين قاعات وسيارات زفاف.',
    minPrice: 500,
    maxPrice: 2000,
    phone: '0505556677',
    whatsapp: '972505556677',
    ratingAverage: 4.9,
    ratingCount: 30,
    heroImageUrl: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=800',
    galleryImages: [],
    reviews: []
  },
  {
    id: 'v8',
    name: 'لمسة جمال',
    category: VendorCategory.BEAUTY,
    subCategory: 'صالونات وتجميل',
    region: Region.SOUTH,
    city: 'رهط',
    addressText: 'الحي 2',
    latitude: 31.39,
    longitude: 34.75,
    wazeUrl: 'https://waze.com',
    description: 'أحدث قصات الشعر والمكياج.',
    minPrice: 200,
    maxPrice: 800,
    phone: '0529876543',
    whatsapp: '972529876543',
    ratingAverage: 4.7,
    ratingCount: 55,
    heroImageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
    galleryImages: [],
    reviews: []
  }
];

const MOCK_DRESSES: Dress[] = [
  {
    id: 'd9',
    vendorId: 'v9',
    title: 'فستان ملكة',
    type: 'evening',
    forSale: true,
    forRent: false,
    priceSale: 250,
    size: 'L',
    color: 'أسود',
    region: Region.SOUTH,
    city: 'بئر السبع',
    mainImageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=600',
    description: 'فستان سهرة أنيق بحالة ممتازة.',
    reviews: []
  },
  {
    id: 'd10',
    vendorId: 'v10',
    title: 'فستان زفاف',
    type: 'wedding',
    forSale: true,
    forRent: true,
    priceSale: 1800,
    priceRent: 1000,
    size: '38',
    color: 'أبيض',
    region: Region.NORTH,
    city: 'سخنين',
    mainImageUrl: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&q=80&w=600',
    description: 'فستان زفاف ملكي مع طرحة.',
    reviews: []
  }
];

// GENERATE 3 PACKAGES FOR EACH OF THE 7 EVENT TYPES (Total 21)
const generatePackages = () => {
  const packages: PackageModel[] = [];
  const types = Object.values(EventType);
  let idCounter = 1;

  types.forEach(type => {
    // Package 1: Economy
    packages.push({
      id: `p${idCounter++}`,
      title: `باقة ${type === 'wedding' ? 'زفاف' : type === 'engagement' ? 'خطوبة' : 'مناسبة'} اقتصادية`,
      occasionType: type,
      description: 'باقة توفيرية تشمل الأساسيات لإقامة مناسبة جميلة وبسعر معقول.',
      price: 5000,
      includedServices: ['قاعة صغيرة/منزلية', 'ضيافة خفيفة', 'تصوير بسيط', 'سماعات'],
      images: ['https://images.unsplash.com/photo-1519225468359-2996bc01c083?auto=format&fit=crop&q=80&w=800'],
      city: 'بئر السبع',
      region: Region.SOUTH,
      latitude: 31.25,
      longitude: 34.79,
      wazeUrl: 'https://waze.com',
      ratingAverage: 4.2,
      ratingCount: 10,
      reviews: [],
      heroImageUrl: 'https://images.unsplash.com/photo-1519225468359-2996bc01c083?auto=format&fit=crop&q=80&w=800'
    });

    // Package 2: Standard
    packages.push({
      id: `p${idCounter++}`,
      title: `باقة ${type === 'wedding' ? 'زفاف' : 'مناسبة'} مميزة`,
      occasionType: type,
      description: 'الخيار الأفضل الذي يجمع بين الفخامة والسعر المناسب.',
      price: 15000,
      includedServices: ['قاعة متوسطة', 'بوفيه عشاء', 'تصوير فيديو وفوتو', 'DJ محترف', 'زينة'],
      images: ['https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800'],
      city: 'الناصرة',
      region: Region.NORTH,
      latitude: 32.7,
      longitude: 35.3,
      wazeUrl: 'https://waze.com',
      ratingAverage: 4.8,
      ratingCount: 35,
      reviews: [],
      heroImageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800'
    });

    // Package 3: Luxury
    packages.push({
      id: `p${idCounter++}`,
      title: `باقة ${type === 'wedding' ? 'زفاف' : 'مناسبة'} ملكية`,
      occasionType: type,
      description: 'كل ما تحلم به لمناسبة لا تنسى، فخامة بلا حدود.',
      price: 45000,
      includedServices: ['قاعة فخمة VIP', 'بوفيه فاخر جداً', 'تصوير سينمائي', 'فرقة موسيقية', 'ليموزين', 'ديكور خاص'],
      images: ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800'],
      city: 'يافا',
      region: Region.CENTER,
      latitude: 32.05,
      longitude: 34.75,
      wazeUrl: 'https://waze.com',
      ratingAverage: 5.0,
      ratingCount: 12,
      reviews: [],
      heroImageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800'
    });
  });

  return packages;
};

const MOCK_PACKAGES: PackageModel[] = generatePackages();

const MOCK_EVENTS: EventModel[] = [
  {
    id: 'e1',
    ownerId: 'u1',
    title: 'حفل زفاف أحمد وسارة',
    hostName: 'عائلة محمد',
    type: EventType.WEDDING,
    date: '2023-12-25',
    time: '19:00',
    region: Region.NORTH,
    city: 'الناصرة',
    addressText: 'قاعات الجليل',
    latitude: 32.7,
    longitude: 35.3,
    wazeUrl: 'https://waze.com',
    description: 'نتشرف بدعوتكم لحضور حفل زفافنا وتناول طعام العشاء.',
    coverImageUrl: 'https://images.unsplash.com/photo-1519225468359-2996bc01c083?auto=format&fit=crop&q=80&w=800',
    templateType: 'luxury',
    isPublic: true,
    attendees: []
  }
];

const SUGGESTED_VENDORS: Record<EventType, string[]> = {
  [EventType.WEDDING]: ['v1', 'v2', 'v3', 'v7', 'v8', 'd10'],
  [EventType.ENGAGEMENT]: ['v1', 'v3', 'v7', 'd9'],
  [EventType.BIRTHDAY]: ['v6', 'v5', 'v4'],
  [EventType.GRADUATION]: ['v3', 'v5', 'v6'],
  [EventType.BABY]: ['v6', 'v7'],
  [EventType.CORPORATE]: ['v1', 'v6'],
  [EventType.OTHER]: ['v6'],
};

// CRITICAL: New version tag to force reload and clean corruption
const DATA_VERSION = 'v5.0_CRITICAL_FIX';

// Helper for safe JSON parsing to avoid crashing on corrupted strings
const safeParse = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error parsing ${key}, resetting to fallback`, e);
    return fallback;
  }
};

const initStorage = () => {
  const currentVersion = localStorage.getItem('data_version');
  
  if (currentVersion !== DATA_VERSION) {
    console.log('Detected old or missing data version. Resetting storage to v5.0...');
    localStorage.clear();
    localStorage.setItem('data_version', DATA_VERSION);
    localStorage.setItem('vendors', JSON.stringify(MOCK_VENDORS));
    localStorage.setItem('events', JSON.stringify(MOCK_EVENTS));
    localStorage.setItem('dresses', JSON.stringify(MOCK_DRESSES));
    localStorage.setItem('packages', JSON.stringify(MOCK_PACKAGES));
  } else {
    // Re-ensure keys exist if they were manually deleted
    if (!localStorage.getItem('vendors')) localStorage.setItem('vendors', JSON.stringify(MOCK_VENDORS));
    if (!localStorage.getItem('packages')) localStorage.setItem('packages', JSON.stringify(MOCK_PACKAGES));
  }
};

initStorage();

export const StorageService = {
  getVendors: (): Vendor[] => safeParse('vendors', []),
  getVendorById: (id: string): Vendor | undefined => {
     const vendors = safeParse<Vendor[]>('vendors', []);
     return vendors.find(v => v.id === id);
  },
  getEvents: (): EventModel[] => safeParse('events', []),
  getEventById: (id: string): EventModel | undefined => {
    const events = safeParse<EventModel[]>('events', []);
    return events.find(e => e.id === id);
  },
  saveEvent: (event: EventModel) => {
    const events = safeParse<EventModel[]>('events', []);
    const existingIndex = events.findIndex(e => e.id === event.id);
    if (existingIndex >= 0) {
      events[existingIndex] = event;
    } else {
      events.push(event);
    }
    localStorage.setItem('events', JSON.stringify(events));
  },
  addRSVP: (eventId: string, rsvp: RSVP) => {
    const events = safeParse<EventModel[]>('events', []);
    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex >= 0) {
      events[eventIndex].attendees = [...(events[eventIndex].attendees || []), rsvp];
      localStorage.setItem('events', JSON.stringify(events));
    }
  },
  getDresses: (): Dress[] => safeParse('dresses', []),
  getDressById: (id: string): Dress | undefined => {
    const dresses = safeParse<Dress[]>('dresses', []);
    return dresses.find(d => d.id === id);
  },
  getPackagesByOccasion: (type: string): PackageModel[] => {
     const packages = safeParse<PackageModel[]>('packages', []);
     return packages.filter(p => p.occasionType === type);
  },
  getPackageById: (id: string): PackageModel | undefined => {
     const packages = safeParse<PackageModel[]>('packages', []);
     return packages.find(p => p.id === id);
  },
  getAllPackages: (): PackageModel[] => {
     return safeParse<PackageModel[]>('packages', []);
  },
  
  addReview: (targetId: string, review: Review, type: 'vendor' | 'dress' | 'package') => {
    let key = '';
    if (type === 'vendor') key = 'vendors';
    else if (type === 'dress') key = 'dresses';
    else if (type === 'package') key = 'packages';

    const items = safeParse<any[]>(key, []);
    const index = items.findIndex(i => i.id === targetId);
    if (index >= 0) {
      if (!items[index].reviews) items[index].reviews = [];
      items[index].reviews.unshift(review);
      if (type === 'vendor' || type === 'package') {
        const total = items[index].reviews.reduce((sum: number, r: Review) => sum + r.rating, 0);
        items[index].ratingCount = items[index].reviews.length;
        items[index].ratingAverage = parseFloat((total / items[index].ratingCount).toFixed(1));
      }
      localStorage.setItem(key, JSON.stringify(items));
    }
  },

  getSuggestions: (eventType: EventType): Vendor[] => {
    const ids = SUGGESTED_VENDORS[eventType] || [];
    const allVendors = safeParse<Vendor[]>('vendors', []);
    return allVendors.filter(v => ids.includes(v.id));
  }
};
