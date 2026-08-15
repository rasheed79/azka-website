import type { Metadata } from 'next';
import { Noto_Kufi_Arabic } from 'next/font/google';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import '../globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chatbot/ChatWidget';
import ThemeHydrationSync from '@/components/ThemeHydrationSync';

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  const isAr = locale === 'ar';
  const title = isAr ? 'أزكى الوطنية لتقنية المعلومات | Azka IT' : 'Azka National for Information Technology';
  const description = t('subtitle');

  return {
    metadataBase: new URL('https://www.azka.com'),
    title,
    description,
    keywords: isAr
      ? ['أزكى', 'تقنية المعلومات', 'أنظمة آلية', 'موارد بشرية', 'جدة', 'السعودية']
      : ['Azka', 'Information Technology', 'Automated Systems', 'HR', 'Jeddah', 'Saudi Arabia'],
    authors: [{ name: 'Azka National for Information Technology' }],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isAr ? 'ar_SA' : 'en_US',
      siteName: 'Azka IT',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        ar: '/ar/',
        en: '/en/',
        'x-default': '/ar/',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'ar' | 'en')) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const isRtl = locale === 'ar';
  const fontClass = isRtl ? notoKufiArabic.variable : inter.variable;

  return (
    <html
      lang={locale}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={cn(fontClass)}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      style={{ scrollBehavior: 'smooth', fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-inter)' }}
    >
      <head>
        <link
          rel="alternate"
          type="application/ld+json"
          href="/schema/organization.json"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <ThemeHydrationSync />
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
          <ChatWidget locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
