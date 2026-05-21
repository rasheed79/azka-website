'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Building2, Crown, Landmark, Plane, GraduationCap, Shield, Scale } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection';

function getIcon(name: string) {
  if (name.includes('ملكي') || name.includes('Royal') || name.includes('Crown') || name.includes('Prince') || name.includes('سمو') || name.includes('ديوان') || name.includes('عيادة') || name.includes('قصور')) return Crown;
  if (name.includes('جامعة') || name.includes('University') || name.includes('دراسات') || name.includes('Studies')) return GraduationCap;
  if (name.includes('خطوط') || name.includes('Airlines') || name.includes('Saudia')) return Plane;
  if (name.includes('قضاء') || name.includes('Judicial') || name.includes('حقوق') || name.includes('Rights')) return Scale;
  if (name.includes('أمن') || name.includes('شرطة') || name.includes('Security') || name.includes('Police') || name.includes('حرس') || name.includes('Guard') || name.includes('مسلح') || name.includes('Armed')) return Shield;
  if (name.includes('وزارة') || name.includes('Ministry') || name.includes('مجلس') || name.includes('Council') || name.includes('هيئة') || name.includes('Commission') || name.includes('أمانة') || name.includes('Secretariat')) return Landmark;
  return Building2;
}

const LOGO_MAP: Record<string, string> = {
  'الديوان الملكي': '1.webp',
  'الشئون الخاصة لخادم الحرمين الشريفين': '1.webp',
  'الشئون الخاصة لسمو ولي العهد': '1.webp',
  'الخطوط الجوية العربية السعودية': 'سعودية.png',
  'وزارة التجارة': 'وزارة-التجارة.png',
  'الجامعة الإسلامية بالمدينة المنورة': 'الجامعة-الاسلامية.png',
  'المجلس الصحي السعودي': 'المجلس-الصحي.png',
  'هيئة حقوق الإنسان': '4.png',
  'هيئة الخبراء بمجلس الوزراء': '5.svg',
  'الأمانة العامة بمجلس الوزراء': '6.webp',
};

export default function Clients() {
  const t = useTranslations('clients');
  const list = t.raw('list') as string[];

  return (
    <section id="clients" className="py-16 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-50/40 dark:via-emerald-950/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {t('title')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-5">
            {t('title')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </AnimatedSection>

        {/* Cards Grid */}
        <StaggerContainer
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          staggerDelay={0.04}
        >
          {list.map((client: string) => {
            const Icon = getIcon(client);
            const logoFile = LOGO_MAP[client];
            const logoSrc = logoFile ? `/images/لوجو العملاء/${logoFile}` : null;

            return (
              <StaggerItem key={client}>
                <div className="group flex flex-col items-center text-center p-5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/50 hover:border-emerald-400/60 dark:hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/5 transition-all duration-300 cursor-default h-full backdrop-blur-sm">

                  {/* Logo area */}
                  <div className="w-full aspect-[16/9] mx-auto mb-4 rounded-xl overflow-hidden bg-white dark:bg-white border border-slate-100 dark:border-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-sm">
                    {logoSrc ? (
                      <Image
                        src={logoSrc}
                        alt={client}
                        width={400}
                        height={225}
                        quality={100}
                        className={`object-contain w-full h-full ${logoFile === '5.svg' ? 'p-1 scale-125' : 'p-3'}`}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                        <Icon
                          size={44}
                          strokeWidth={1.25}
                          className="text-emerald-500/70 dark:text-emerald-400/60 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300"
                        />
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="w-8 h-px bg-emerald-400/30 dark:bg-emerald-500/20 mb-3 group-hover:w-14 transition-all duration-300" />

                  {/* Name */}
                  <p className="text-slate-700 dark:text-slate-300 text-xs font-medium leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
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
