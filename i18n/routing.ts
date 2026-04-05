import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ar', 'en'] as const,
  defaultLocale: 'ar',
});

export type Locale = (typeof routing.locales)[number];
