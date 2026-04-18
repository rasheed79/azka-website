import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { systemSlugs, systemIcons, systemColors, systemSpecImages, type SystemSlug } from '@/lib/systems';
import { ArrowRight, ArrowLeft, CheckCircle2, Zap } from 'lucide-react';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const locales = ['ar', 'en'];
  return locales.flatMap((locale) =>
    systemSlugs.map((slug) => ({ locale, slug }))
  );
}

export default async function SystemPage({ params }: PageProps) {
  const { locale, slug } = await params;

  if (!systemSlugs.includes(slug as SystemSlug)) {
    notFound();
  }

  const typedSlug = slug as SystemSlug;
  const t = await getTranslations({ locale, namespace: 'systems' });
  const tDetails = await getTranslations({ locale, namespace: `systems.details.${slug}` });
  const isRtl = locale === 'ar';

  const iconName = systemIcons[typedSlug] as keyof typeof LucideIcons;
  const Icon = (LucideIcons[iconName] as React.ComponentType<{ size?: number; className?: string }>) || LucideIcons.Settings;
  const gradient = systemColors[typedSlug];

  const features = tDetails.raw('features') as string[];
  const benefits = tDetails.raw('benefits') as string[];

  const BackIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-green-800 dark:text-slate-400 dark:hover:text-white text-sm mb-10 group transition-colors"
        >
          <BackIcon size={16} className={`group-hover:translate-x-${isRtl ? '1' : '-1'} transition-transform`} />
          {t('back')}
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <div className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} items-center justify-center mb-6 shadow-lg`}>
            <Icon size={30} className="text-white" />
          </div>
          <div className="mb-3">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-500 uppercase tracking-widest">{t('all_systems')}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {tDetails('name')}
          </h1>
          <p className="text-xl text-green-400 font-medium mb-6">{tDetails('tagline')}</p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg max-w-2xl">
            {tDetails('description')}
          </p>
        </div>

        <section
          className="mb-10 sm:mb-14"
          aria-labelledby="system-spec-gallery-heading"
        >
          <h2
            id="system-spec-gallery-heading"
            className="text-lg font-bold text-slate-900 dark:text-white mb-4"
          >
            {t('spec_gallery')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {([0, 1] as const).map((idx) => {
              const src = systemSpecImages[typedSlug][idx];
              return (
                <figure
                  key={src}
                  className="relative aspect-video w-full overflow-hidden rounded-2xl border border-emerald-200/70 bg-slate-100 dark:border-slate-700/50 dark:bg-slate-900/60 shadow-sm dark:shadow-none"
                >
                  <Image
                    src={src}
                    alt={`${tDetails('name')} — ${t('spec_alt', { index: idx + 1 })}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </figure>
              );
            })}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 mb-10 sm:mb-14">
          {/* Features */}
          <div className="p-7 rounded-2xl bg-white/90 border border-emerald-200/70 dark:bg-slate-800/50 dark:border-slate-700/50 shadow-sm dark:shadow-none">
            <h2 className="text-slate-900 dark:text-white font-bold text-xl mb-6 flex items-center gap-2">
              <Zap size={18} className="text-green-400" />
              {t('features')}
            </h2>
            <ul className="space-y-3">
              {features.map((feature: string) => (
                <li key={feature} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm">
                  <CheckCircle2 size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="p-7 rounded-2xl bg-white/90 border border-emerald-200/70 dark:bg-slate-800/50 dark:border-slate-700/50 shadow-sm dark:shadow-none">
            <h2 className="text-slate-900 dark:text-white font-bold text-xl mb-6 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-400" />
              {t('benefits')}
            </h2>
            <ul className="space-y-3">
              {benefits.map((benefit: string) => (
                <li key={benefit} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-green-100/90 to-emerald-50 border border-green-200/80 dark:from-green-700/20 dark:to-blue-800/10 dark:border-green-500/20 text-center">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{t('cta_title')}</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">{t('cta_body')}</p>
          <Link
            href={`/${locale}#contact`}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-green-700 hover:bg-green-600 rounded-xl transition-all duration-200 shadow-lg shadow-green-600/20 hover:shadow-green-600/30"
          >
            {t('cta_btn')}
          </Link>
        </div>
      </div>
    </div>
  );
}
