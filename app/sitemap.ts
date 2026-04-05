import { MetadataRoute } from 'next';
import { systemSlugs } from '@/lib/systems';

const BASE_URL = 'https://www.azka.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['ar', 'en'];

  const homePages = locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1,
  }));

  const systemPages = locales.flatMap((locale) =>
    systemSlugs.map((slug) => ({
      url: `${BASE_URL}/${locale}/systems/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  );

  return [...homePages, ...systemPages];
}
