'use client';

import { useTranslations } from 'next-intl';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection';
import { systemSlugs, systemIcons, systemBgColors, type SystemSlug } from '@/lib/systems';
import { ArrowUpRight, Users, Clock, BarChart3, Archive, ShoppingCart, MessageSquare, Package, UserCheck, Fingerprint, KeyRound, Smartphone, GitMerge } from 'lucide-react';
import Link from 'next/link';

const iconMap = {
  Users, Clock, BarChart3, Archive, ShoppingCart, MessageSquare,
  Package, UserCheck, Fingerprint, KeyRound, Smartphone, GitMerge,
};

interface ServicesProps {
  locale: string;
}

export default function Services({ locale }: ServicesProps) {
  const t = useTranslations('services');

  return (
    <section id="services" className="py-16 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-600/10 border border-green-500/20 text-green-400 text-xs font-medium uppercase tracking-wider mb-6">
            {t('badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-5">{t('title')}</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto">{t('subtitle')}</p>
        </AnimatedSection>

        {/* Grid */}
        <StaggerContainer staggerDelay={0.07} className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {systemSlugs.map((slug: SystemSlug) => {
            const iconName = systemIcons[slug] as keyof typeof iconMap;
            const Icon = iconMap[iconName];
            const bgClass = systemBgColors[slug];
            const name = t(`items.${slug}.name`);
            const desc = t(`items.${slug}.desc`);

            return (
              <StaggerItem key={slug}>
                <Link
                  href={`/${locale}/systems/${slug}`}
                  className="group block p-6 rounded-2xl bg-white/90 border border-emerald-200/70 hover:border-green-500/50 hover:bg-emerald-50/80 dark:bg-slate-800/50 dark:border-slate-700/50 dark:hover:border-green-500/40 dark:hover:bg-slate-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/5 dark:hover:shadow-blue-500/5 shadow-sm dark:shadow-none"
                >
                  <div className={`w-12 h-12 rounded-xl ${bgClass} border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon size={22} className="text-current" />
                  </div>
                  <h3 className="text-slate-900 dark:text-white font-semibold text-base mb-2 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors leading-snug">
                    {name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{desc}</p>
                  <div className="flex items-center gap-1 text-green-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {t('learn_more')}
                    <ArrowUpRight size={13} />
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
