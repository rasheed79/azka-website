'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection';
import { Eye, Target, Star } from 'lucide-react';

type Tab = 'vision' | 'mission' | 'values';

export default function VMV() {
  const t = useTranslations('vmv');
  const [active, setActive] = useState<Tab>('vision');

  const tabs: { id: Tab; label: string; icon: typeof Eye }[] = [
    { id: 'vision', label: t('vision_tab'), icon: Eye },
    { id: 'mission', label: t('mission_tab'), icon: Target },
    { id: 'values', label: t('values_tab'), icon: Star },
  ];

  const valuesRaw = t.raw('values') as { title: string; desc: string }[];

  return (
    <section className="py-16 lg:py-28 relative bg-gradient-to-b from-transparent via-emerald-100/40 dark:via-slate-900/20 to-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-10 sm:mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium uppercase tracking-wider mb-6">
            {t('badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">{t('title')}</h2>
        </AnimatedSection>

        {/* Tab Buttons */}
        <AnimatedSection delay={0.15} className="flex justify-center mb-8 sm:mb-12">
          <div className="inline-flex items-center p-1 rounded-2xl bg-white/90 border border-emerald-200/80 dark:bg-slate-800/60 dark:border-slate-700/50 w-full sm:w-auto overflow-x-auto shadow-sm dark:shadow-none">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className="relative px-4 sm:px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 flex-1 sm:flex-none justify-center whitespace-nowrap"
              >
                {active === id && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 bg-green-700 rounded-xl shadow-lg shadow-green-600/20"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 flex items-center gap-2 ${active === id ? 'text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'}`}>
                  <Icon size={15} />
                  {label}
                </span>
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {active !== 'values' ? (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-5">
                {t(`${active}_title`)}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                {t(`${active}_body`)}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="values"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {valuesRaw.map((value) => (
                  <StaggerItem key={value.title}>
                    <div className="p-6 rounded-2xl bg-white/90 border border-emerald-200/70 hover:border-green-500/40 dark:bg-slate-800/50 dark:border-slate-700/50 dark:hover:border-green-500/30 dark:hover:bg-slate-800/80 transition-all duration-200 group shadow-sm dark:shadow-none">
                      <div className="w-8 h-8 rounded-lg bg-green-600/10 border border-green-500/20 flex items-center justify-center mb-4">
                        <Star size={14} className="text-green-400 fill-green-400/30" />
                      </div>
                      <h4 className="text-slate-900 dark:text-white font-semibold mb-2 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">{value.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{value.desc}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
