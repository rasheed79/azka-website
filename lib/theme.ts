export const THEME_COOKIE = 'azka-theme';

export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export type ThemePreference = 'light' | 'dark';

export function themeCookieHeader(value: ThemePreference): string {
  return `${THEME_COOKIE}=${value}; Path=/; Max-Age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax`;
}
