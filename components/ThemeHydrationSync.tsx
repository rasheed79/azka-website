'use client';

import { useLayoutEffect } from 'react';
import { THEME_COOKIE, themeCookieHeader, type ThemePreference } from '@/lib/theme';

/** Syncs legacy localStorage-only preference to the DOM + cookie (no inline scripts in layout). */
export default function ThemeHydrationSync() {
  useLayoutEffect(() => {
    try {
      const ls = localStorage.getItem(THEME_COOKIE) as ThemePreference | null;
      if (ls !== 'dark' && ls !== 'light') return;
      const wantDark = ls === 'dark';
      const isDark = document.documentElement.classList.contains('dark');
      if (wantDark !== isDark) {
        document.documentElement.classList.toggle('dark', wantDark);
        document.cookie = themeCookieHeader(ls);
      }
    } catch {
      /* private mode / disabled storage */
    }
  }, []);
  return null;
}
