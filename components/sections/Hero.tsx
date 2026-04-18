'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowDown, Zap } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('hero');
  const tStats = useTranslations('stats');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb-1 absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-green-700/20 blur-[100px]" />
        <div className="orb-2 absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-900/20 blur-[120px]" />
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-emerald-50/90 dark:to-[#0B1A10]/80" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600/10 border border-green-500/20 text-green-400 text-sm font-medium mb-8"
        >
          <Zap size={14} className="fill-green-400" />
          {t('badge')}
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
            <span className="text-slate-900 dark:text-white block">{t('title_1')}</span>
            <span className="gradient-text block">{t('title_2')}</span>
            <span className="text-slate-900 dark:text-white block">{t('title_3')}</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-7 px-2"
        >
          {t('subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4"
        >
          <a
            href="#services"
            className="group px-8 py-4 text-base font-semibold text-white bg-green-700 hover:bg-green-600 rounded-xl transition-all duration-200 shadow-lg shadow-green-600/25 hover:shadow-green-600/40 hover:scale-105 text-center"
          >
            {t('cta_primary')}
          </a>
          <a
            href="#contact"
            className="px-8 py-4 text-base font-semibold text-slate-700 hover:text-green-900 border border-slate-300 hover:border-slate-500 dark:text-slate-300 dark:hover:text-white dark:border-slate-600 dark:hover:border-slate-400 rounded-xl transition-all duration-200 hover:bg-white/80 dark:hover:bg-white/5 text-center"
          >
            {t('cta_secondary')}
          </a>
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 mb-20 grid grid-cols-3 gap-4 max-w-lg mx-auto"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-white" dir="ltr">77+</div>
            <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">{tStats('projects_label')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-white" dir="ltr">35+</div>
            <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">{tStats('years_label')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-white" dir="ltr">67+</div>
            <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">{tStats('professionals_label')}</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-slate-500 dark:text-slate-500 text-xs">{t('scroll')}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} className="text-slate-500 dark:text-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
