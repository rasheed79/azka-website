'use client';

import { useTranslations } from 'next-intl';
import { Building2, Crown, Landmark, Plane, GraduationCap, Shield, Scale } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection';

function getIcon(name: string) {
  if (name.includes('ملكي') || name.includes('Royal') || name.includes('Crown') || name.includes('Prince') || name.includes('سمو') || name.includes('ديوان') || name.includes('عيادة') || name.includes('قصور')) {
    return Crown;
  }
  if (name.includes('جامعة') || name.includes('University') || name.includes('دراسات') || name.includes('Studies')) {
    return GraduationCap;
  }
  if (name.includes('خطوط') || name.includes('Airlines') || name.includes('Saudia')) {
    return Plane;
  }
  if (name.includes('قضاء') || name.includes('Judicial') || name.includes('حقوق') || name.includes('Rights')) {
    return Scale;
  }
  if (name.includes('أمن') || name.includes('شرطة') || name.includes('Security') || name.includes('Police') || name.includes('حرس') || name.includes('Guard') || name.includes('مسلح') || name.includes('Armed') || name.includes('دفاع') || name.includes('Defense')) {
    return Shield;
  }
  if (name.includes('وزارة') || name.includes('Ministry') || name.includes('مجلس') || name.includes('Council') || name.includes('هيئة') || name.includes('Commission') || name.includes('أمانة') || name.includes('Secretariat')) {
    return Landmark;
  }
  return Building2;
}

export default function Clients() {
  const t = useTranslations('clients');
  const list = t.raw('list') as string[];

  return (
    <section id="clients" className="py-16 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-50/30 dark:via-emerald-900/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium uppercase tracking-wider mb-6">
            {t('title')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-5">
            {t('title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.05}>
          {list.map((client: string) => {
            const Icon = getIcon(client);
            return (
              <StaggerItem key={client}>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/90 border border-emerald-200/60 hover:border-emerald-400/50 hover:shadow-md dark:bg-slate-800/50 dark:border-slate-700/50 dark:hover:border-emerald-500/30 transition-all duration-300 h-full">
                  <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mt-0.5">
                    <Icon size={18} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-snug">
                    {client}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
