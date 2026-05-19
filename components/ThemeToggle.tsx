'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { THEME_COOKIE, themeCookieHeader, type ThemePreference } from '@/lib/theme';

function applyTheme(nextDark: boolean) {
  const pref: ThemePreference = nextDark ? 'dark' : 'light';
  document.documentElement.classList.toggle('dark', nextDark);
  try {
    localStorage.setItem(THEME_COOKIE, pref);
  } catch {
    /* ignore */
  }
  document.cookie = themeCookieHeader(pref);
}

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const t = useTranslations('nav');
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains('dark');
    setDark(next);
    applyTheme(next);
  };

  if (!mounted) {
    return (
      <span
        className={cn(
          'inline-flex h-9 w-9 shrink-0 rounded-lg border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-transparent',
          className
        )}
        aria-hidden
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors',
        'border-slate-200 text-slate-700 hover:bg-slate-100',
        'dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5',
        className
      )}
      aria-label={dark ? t('theme_to_light') : t('theme_to_dark')}
    >
      {dark ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
    </button>
  );
}
