export const systemSlugs = [
  'hr',
  'attendance',
  'financial',
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
 * Thematic stock photos (homepage cards + detail gallery).
 * Unsplash License: https://unsplash.com/license — free use including commercial;
 * attribution appreciated; do not compile into a competing photo service.
 */
function stockPhoto(id: string, width = 1200) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;
}

export const UNSPLASH_LICENSE_URL = 'https://unsplash.com/license';

/** IDs verified via HEAD against images.unsplash.com (invalid IDs return 404 in production). */
export const systemSpecImages: Record<SystemSlug, readonly [string, string]> = {
  hr: [stockPhoto('photo-1522071820081-009f0129c71c'), stockPhoto('photo-1551434678-e076c223a692')],
  attendance: [stockPhoto('photo-1486312338219-ce68d2c6f44d'), stockPhoto('photo-1521737604893-d14cc237f11d')],
  financial: [stockPhoto('photo-1551288049-bebda4e38f71'), stockPhoto('photo-1554224154-22dec7ec8818')],
  archiving: [stockPhoto('photo-1450101499163-c8848c66ca85'), stockPhoto('photo-1454165804606-c3d57bc86b40')],
  procurement: [stockPhoto('photo-1556742049-0cfed4f6a45d'), stockPhoto('photo-1556761175-4b46a572b786')],
  communications: [stockPhoto('photo-1563986768609-322da13575f3'), stockPhoto('photo-1531482615713-2afd69097998')],
  warehouse: [stockPhoto('photo-1581092160562-40aa08e78837'), stockPhoto('photo-1553413077-190dd305871c')],
  'self-service': [stockPhoto('photo-1517694712202-14dd9538aa97'), stockPhoto('photo-1523240795612-9a054b0db644')],
  biometric: [stockPhoto('photo-1555949963-aa79dcee981c'), stockPhoto('photo-1581091226825-a6a2a5aee158')],
  access: [stockPhoto('photo-1506126613408-eca07ce68773'), stockPhoto('photo-1486406146926-c627a92ad1ab')],
  mobile: [stockPhoto('photo-1512941937669-90a1b58e7e9c'), stockPhoto('photo-1553877522-43269d4ea984')],
  integration: [stockPhoto('photo-1460925895917-afdab827c52f'), stockPhoto('photo-1544197150-b99a580bb7a8')],
};

/** Homepage service cards: same primary mock as specs page image 1 (single source). */
export const systemCoverImages: Record<SystemSlug, string> = Object.fromEntries(
  systemSlugs.map((slug) => [slug, systemSpecImages[slug][0]])
) as Record<SystemSlug, string>;

export const systemBgColors: Record<SystemSlug, string> = {
  hr: 'bg-blue-500/10 border-blue-500/20',
  attendance: 'bg-purple-500/10 border-purple-500/20',
  financial: 'bg-emerald-500/10 border-emerald-500/20',
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
