
import { Region, VendorCategory, EventType } from './types';

export const CITIES = {
  [Region.NORTH]: [
    'الناصرة', 'طمرة', 'شفاعمرو', 'سخنين', 
    'عرابة', 'دير حنا', 'كفر كنا', 'كفر ياسيف', 
    'أم الفحم', 'باقة الغربية', 'جت', 'عارة', 'كفر قرع'
  ],
  [Region.CENTER]: [
    'يافا', 'اللد', 'رملة', 'كفر قاسم', 
    'الطيبة', 'الطيرة', 'قلنسوة', 'جلجولية'
  ],
  [Region.SOUTH]: [
    'رهط', 'تل السبع', 'حورة', 'كسيفة', 
    'شقيب السلام', 'عرعرة النقب', 'اللقية', 'بئر السبع'
  ]
};

export const CATEGORY_LABELS: Record<VendorCategory, string> = {
  [VendorCategory.VENUE]: 'قاعات وأماكن',
  [VendorCategory.FOOD]: 'بوفيهات',
  [VendorCategory.PHOTOGRAPHY]: 'تصوير',
  [VendorCategory.BEAUTY]: 'صالونات وتجميل',
  [VendorCategory.DECORATION]: 'ديكور وزهور',
  [VendorCategory.ENTERTAINMENT]: 'ترفيه وموسيقى',
  [VendorCategory.DRESSES]: 'فساتين وأزياء',
  [VendorCategory.RENTAL]: 'تأجير معدات',
};

export const SUBCATEGORIES: Record<VendorCategory, string[]> = {
  [VendorCategory.VENUE]: ['قاعات أفراح', 'حدائق مفتوحة', 'فنادق', 'استراحات'],
  [VendorCategory.FOOD]: ['بوفيه مفتوح', 'حلويات', 'قهوة وعصائر', 'شيف خاص'],
  [VendorCategory.BEAUTY]: ['مكياج عروس', 'تصفيف شعر', 'عناية بالبشرة', 'سبا'],
  [VendorCategory.PHOTOGRAPHY]: ['تصوير فوتوغرافي', 'تصوير فيديو', 'تصوير درون'],
  [VendorCategory.ENTERTAINMENT]: ['دي جي (DJ)', 'فرقة موسيقية', 'زفة'],
  [VendorCategory.DECORATION]: ['تنسيق زهور', 'بالونات', 'إضاءة', 'ديكور مدخل'],
  [VendorCategory.RENTAL]: ['كراسي وطاولات', 'خيام', 'مولدات'],
  [VendorCategory.DRESSES]: ['فساتين زفاف', 'فساتين سهرة', 'بدلات رجالي'],
};

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  [EventType.WEDDING]: 'زفاف',
  [EventType.ENGAGEMENT]: 'خطوبة',
  [EventType.BIRTHDAY]: 'عيد ميلاد',
  [EventType.GRADUATION]: 'تخرج',
  [EventType.BABY]: 'استقبال مولود',
  [EventType.CORPORATE]: 'مناسبة شركات',
  [EventType.OTHER]: 'مناسبة أخرى',
};

export const REGION_LABELS: Record<Region, string> = {
  [Region.NORTH]: 'الشمال',
  [Region.CENTER]: 'المركز',
  [Region.SOUTH]: 'الجنوب',
};
