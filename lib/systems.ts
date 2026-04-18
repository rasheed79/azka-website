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

/** Cover art shown on each system card (replace with photos under /public/systems/ if desired). */
export const systemCoverImages: Record<SystemSlug, string> = {
  hr: '/systems/hr.svg',
  attendance: '/systems/attendance.svg',
  financial: '/systems/financial.svg',
  archiving: '/systems/archiving.svg',
  procurement: '/systems/procurement.svg',
  communications: '/systems/communications.svg',
  warehouse: '/systems/warehouse.svg',
  'self-service': '/systems/self-service.svg',
  biometric: '/systems/biometric.svg',
  access: '/systems/access.svg',
  mobile: '/systems/mobile.svg',
  integration: '/systems/integration.svg',
};

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
