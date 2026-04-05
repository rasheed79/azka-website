'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useInView } from 'framer-motion';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { FolderOpen, MapPin, Users, CalendarDays } from 'lucide-react';

function useCounter(end: number, duration = 2000, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, started]);
  return count;
}

interface StatCardProps {
  icon: typeof FolderOpen;
  num: number;
  label: string;
  suffix?: string;
  started: boolean;
  delay: number;
}

function StatCard({ icon: Icon, num, label, suffix = '+', started, delay }: StatCardProps) {
  const count = useCounter(num, 1800, started);
  return (
    <AnimatedSection delay={delay} className="text-center">
      <div className="inline-flex flex-col items-center p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-green-500/30 transition-all duration-300 w-full">
        <div className="w-14 h-14 rounded-2xl bg-green-600/10 border border-green-500/20 flex items-center justify-center mb-5">
          <Icon size={26} className="text-green-400" />
        </div>
        <div className="text-5xl font-bold text-white mb-2">
          {count}
          <span className="text-green-400">{suffix}</span>
        </div>
        <p className="text-slate-400 text-sm font-medium">{label}</p>
      </div>
    </AnimatedSection>
  );
}

export default function Stats() {
  const t = useTranslations('stats');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { icon: FolderOpen, num: parseInt(t('projects_num')), label: t('projects_label'), delay: 0.1 },
    { icon: MapPin, num: parseInt(t('offices_num')), label: t('offices_label'), delay: 0.2 },
    { icon: Users, num: parseInt(t('professionals_num')), label: t('professionals_label'), delay: 0.3 },
    { icon: CalendarDays, num: parseInt(t('years_num')), label: t('years_label'), delay: 0.4 },
  ];

  return (
    <section id="stats" className="py-16 lg:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium uppercase tracking-wider mb-6">
            {t('badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">{t('title')}</h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">{t('subtitle')}</p>
        </AnimatedSection>

        {/* Stats Grid */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} started={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
