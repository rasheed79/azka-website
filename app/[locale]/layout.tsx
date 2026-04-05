import type { Metadata } from 'next';
import { Noto_Kufi_Arabic } from 'next/font/google';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chatbot/ChatWidget';
import Script from 'next/script';

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
  const title = isAr ? 'أزكى لتقنية المعلومات | Azka IT' : 'Azka for Information Technology';
  const description = t('subtitle');

  return {
    title,
    description,
    keywords: isAr
      ? ['أزكى', 'تقنية المعلومات', 'أنظمة آلية', 'موارد بشرية', 'جدة', 'السعودية']
      : ['Azka', 'Information Technology', 'Automated Systems', 'HR', 'Jeddah', 'Saudi Arabia'],
    authors: [{ name: 'Azka for Information Technology' }],
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
      languages: {
        ar: '/ar',
        en: '/en',
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

  const messages = await getMessages();
  const isRtl = locale === 'ar';
  const fontClass = isRtl ? notoKufiArabic.variable : inter.variable;

  return (
    <html
      lang={locale}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={fontClass}
      data-scroll-behavior="smooth"
      style={{ scrollBehavior: 'smooth', fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-inter)' }}
    >
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Azka for Information Technology',
              alternateName: 'أزكى لتقنية المعلومات',
              url: 'https://www.azka.com',
              email: 'connect@azka.com',
              telephone: '+966126500223',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'P.O.Box 1485',
                addressLocality: 'Jeddah',
                postalCode: '21431',
                addressCountry: 'SA',
              },
              foundingDate: '1989',
              description:
                'Azka for Information Technology provides planning, design, building, and management of automated systems in Saudi Arabia.',
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0B1A10] text-[#F0FDF4] antialiased">
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
