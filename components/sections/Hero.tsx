'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowDown, Zap } from 'lucide-react';
import Image from 'next/image';

/** Hero background — self-hosted; see public/images/stock/LICENSE.txt */
const HERO_IMAGE = '/images/stock/site-hero-bg.jpg';

export default function Hero() {
  const t = useTranslations('hero');
  const tStats = useTranslations('stats');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Photography background */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          className="object-cover object-center scale-105 sm:scale-100"
          sizes="100vw"
        />
      </div>

      {/* Readability: light mode — bright wash so dark typography stays crisp */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/92 via-emerald-50/88 to-white/94 dark:hidden"
        aria-hidden
      />
      {/* Readability: dark mode — deep veil + cool green cast */}
      <div
        className="absolute inset-0 hidden bg-gradient-to-b from-black/72 via-emerald-950/82 to-[#050a08]/96 dark:block"
        aria-hidden
      />

      {/* Brand tint (both themes) */}
      <div
        className="absolute inset-0 bg-gradient-to-tr from-green-800/[0.06] via-transparent to-amber-500/[0.05] dark:from-green-900/25 dark:to-amber-900/10 pointer-events-none"
        aria-hidden
      />

      {/* Grid over photo */}
      <div className="absolute inset-0 bg-grid opacity-[0.35] dark:opacity-[0.22]" aria-hidden />

      {/* Soft orbs (subtle depth; toned down vs. flat gradient-only hero) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50 dark:opacity-35">
        <div className="orb-1 absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-green-600/15 blur-[100px] dark:bg-green-500/12" />
        <div className="orb-2 absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-400/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-800/10 blur-[120px] dark:bg-emerald-900/25" />
      </div>

      {/* Vignette for scroll area + bottom stats */}
      <div
        className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-emerald-900/[0.07] dark:to-black/45 pointer-events-none"
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-green-600/25 text-green-800 text-sm font-medium mb-8 shadow-sm dark:bg-green-950/40 dark:border-green-500/30 dark:text-green-300 dark:shadow-none"
        >
          <Zap size={14} className="fill-green-600 dark:fill-green-400" />
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
            <span className="text-slate-900 dark:text-white block [text-shadow:0_1px_2px_rgb(255_255_255_/_0.65)] dark:[text-shadow:0_2px_24px_rgb(0_0_0_/_0.5)]">
              {t('title_1')}
            </span>
            <span className="hero-title-accent block dark:drop-shadow-md">{t('title_2')}</span>
            <span className="text-slate-900 dark:text-white block [text-shadow:0_1px_2px_rgb(255_255_255_/_0.65)] dark:[text-shadow:0_2px_24px_rgb(0_0_0_/_0.5)]">
              {t('title_3')}
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base sm:text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-7 px-2 drop-shadow-sm dark:drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]"
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
            className="px-8 py-4 text-base font-semibold text-slate-800 hover:text-green-900 border border-slate-400/80 hover:border-slate-500 bg-white/55 backdrop-blur-sm hover:bg-white/85 dark:text-slate-200 dark:hover:text-white dark:border-slate-500/60 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:border-slate-400 rounded-xl transition-all duration-200 text-center shadow-sm"
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
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">{tStats('projects_label')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-white" dir="ltr">35+</div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">{tStats('years_label')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-white" dir="ltr">67+</div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">{tStats('professionals_label')}</div>
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
        <span className="text-slate-600 dark:text-slate-400 text-xs drop-shadow-sm">{t('scroll')}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} className="text-slate-600 dark:text-slate-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
