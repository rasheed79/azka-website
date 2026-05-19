'use client';

import { useTranslations } from 'next-intl';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection';
import { Award, Building2, Calendar, CheckCircle2 } from 'lucide-react';

export default function About() {
  const t = useTranslations('about');

  const badges = [
    { icon: Building2, label: t('partner_ms'), color: 'text-green-400', bg: 'bg-green-600/10 border-green-500/20' },
    { icon: Building2, label: t('partner_ibm'), color: 'text-slate-600 dark:text-slate-300', bg: 'bg-slate-500/10 border-slate-500/20' },
    { icon: Award, label: t('award'), color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { icon: Calendar, label: t('founded'), color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  ];

  return (
    <section id="about" className="py-16 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <AnimatedSection delay={0.1}>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-600/10 border border-green-500/20 text-green-400 text-xs font-medium uppercase tracking-wider mb-6">
                {t('badge')}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                {t('title')}
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="space-y-5 text-slate-600 dark:text-slate-400 leading-relaxed text-[15px]">
                <p>{t('body1')}</p>
                <p>{t('body2')}</p>
                <p>{t('body3')}</p>
              </div>
            </AnimatedSection>
          </div>

          {/* Right: Badges Grid */}
          <StaggerContainer staggerDelay={0.12} className="grid grid-cols-2 gap-4">
            {badges.map(({ icon: Icon, label, color, bg }) => (
              <StaggerItem key={label}>
                <div className={`rounded-2xl border p-6 ${bg} hover:scale-105 transition-transform duration-200`}>
                  <Icon size={28} className={`${color} mb-4`} />
                  <p className="text-slate-900 dark:text-white text-sm font-medium leading-snug">{label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
