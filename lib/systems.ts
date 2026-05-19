export const systemSlugs = [
  'hr',
  'attendance',
  'financial',
  'budget',
  'archiving',
  'procurement',
  'communications',
  'warehouse',
  'self-service',
  'biometric',
  'access',
  'mobile',
  'integration',
] as const;

export type SystemSlug = (typeof systemSlugs)[number];

export const systemIcons: Record<SystemSlug, string> = {
  hr: 'Users',
  attendance: 'Clock',
  financial: 'BarChart3',
  budget: 'PieChart',
  archiving: 'Archive',
  procurement: 'ShoppingCart',
  communications: 'MessageSquare',
  warehouse: 'Package',
  'self-service': 'UserCheck',
  biometric: 'Fingerprint',
  access: 'KeyRound',
  mobile: 'Smartphone',
  integration: 'GitMerge',
};

export const systemColors: Record<SystemSlug, string> = {
  hr: 'from-blue-500 to-blue-600',
  attendance: 'from-purple-500 to-purple-600',
  financial: 'from-emerald-500 to-emerald-600',
  budget: 'from-cyan-600 to-teal-700',
  archiving: 'from-orange-500 to-orange-600',
  procurement: 'from-rose-500 to-rose-600',
  communications: 'from-teal-500 to-teal-600',
  warehouse: 'from-yellow-500 to-yellow-600',
  'self-service': 'from-pink-500 to-pink-600',
  biometric: 'from-indigo-500 to-indigo-600',
  access: 'from-cyan-500 to-cyan-600',
  mobile: 'from-violet-500 to-violet-600',
  integration: 'from-sky-500 to-sky-600',
};

/**
 * Custom PNG covers (homepage cards) in public/images/. Hero may use stock (see public/images/stock/LICENSE.txt).
 * Detail-page gallery: real screenshots only for financial, attendance, and budget; other systems use illustrated mockups from copy.
 */
export function systemUsesPhotoGallery(slug: SystemSlug): boolean {
  return slug === 'financial' || slug === 'attendance' || slug === 'budget';
}

/** Custom covers for public/images/ — service grid only; detail gallery uses stock pairs below. */
export const attendanceCardImage = '/images/الحضور والانصراف.png';
/** Detail-page gallery for attendance — filenames as stored in public/images/ */
export const attendanceGalleryImage1 = '/images/صور نظام الحصور والانصراف الداخلية 1.png';
export const attendanceGalleryImage2 = '/images/صور نظام الحصور والانصراف الداخلية 2.png';
export const hrCardImage = '/images/الموارد البشرية.png';
export const financialCardImage = '/images/النظام المالي.png';
/** Detail-page gallery for financial — custom screens in public/images/ */
export const financialGalleryImage1 = '/images/صورة نظام المالية داخلي 1.png';
export const financialGalleryImage2 = '/images/صورة نظام المالية داخلي 2.png';
/** Budget system — services card cover */
export const budgetCardImage = '/images/الميزانية.png';
export const budgetGalleryImage1 = '/images/صورة نظام الميزانية الداخلية 1.png';
export const budgetGalleryImage2 = '/images/صورة نظام الميزانية الداخلية 2.png';
export const budgetGalleryImage3 = '/images/صورة نظام الميزانية الداخلية 3.png';
export const archivingCardImage = '/images/الارشيف الالكتروني.png';
export const procurementCardImage = '/images/المشتريات والعقود.png';
export const communicationsCardImage = '/images/الاتصالات الادارية.png';
export const warehouseCardImage = '/images/المستودعات.png';
export const selfServiceCardImage = '/images/الخدمات الالكترونية.png';
export const biometricCardImage = '/images/البصمة الحيوية.png';
export const accessCardImage = '/images/تصاريح الدخول.png';
export const mobileCardImage = '/images/تطبيقات جوال.png';
export const integrationCardImage = '/images/الربط والتكامل.png';

export const UNSPLASH_LICENSE_URL = 'https://unsplash.com/license';

/** Homepage / services section — one “external” image per system (not the detail-page gallery). */
export const systemCoverImages: Record<SystemSlug, string> = {
  hr: hrCardImage,
  attendance: attendanceCardImage,
  financial: financialCardImage,
  budget: budgetCardImage,
  archiving: archivingCardImage,
  procurement: procurementCardImage,
  communications: communicationsCardImage,
  warehouse: warehouseCardImage,
  'self-service': selfServiceCardImage,
  biometric: biometricCardImage,
  access: accessCardImage,
  mobile: mobileCardImage,
  integration: integrationCardImage,
};

function galleryForSlug(slug: SystemSlug): readonly string[] {
  if (slug === 'financial') return [financialGalleryImage1, financialGalleryImage2];
  if (slug === 'attendance') return [attendanceGalleryImage1, attendanceGalleryImage2];
  if (slug === 'budget') return [budgetGalleryImage1, budgetGalleryImage2, budgetGalleryImage3];
  return [];
}

/** System detail page — photo URLs when `systemUsesPhotoGallery`; otherwise empty (page renders text-based screen mockups). */
export const systemGalleryImages = Object.fromEntries(
  systemSlugs.map((s) => [s, galleryForSlug(s)])
) as Record<SystemSlug, readonly string[]>;

export const systemBgColors: Record<SystemSlug, string> = {
  hr: 'bg-blue-500/10 border-blue-500/20',
  attendance: 'bg-purple-500/10 border-purple-500/20',
  financial: 'bg-emerald-500/10 border-emerald-500/20',
  budget: 'bg-teal-500/10 border-teal-500/20',
  archiving: 'bg-orange-500/10 border-orange-500/20',
  procurement: 'bg-rose-500/10 border-rose-500/20',
  communications: 'bg-teal-500/10 border-teal-500/20',
  warehouse: 'bg-yellow-500/10 border-yellow-500/20',
  'self-service': 'bg-pink-500/10 border-pink-500/20',
  biometric: 'bg-indigo-500/10 border-indigo-500/20',
  access: 'bg-cyan-500/10 border-cyan-500/20',
  mobile: 'bg-violet-500/10 border-violet-500/20',
  integration: 'bg-sky-500/10 border-sky-500/20',
};
