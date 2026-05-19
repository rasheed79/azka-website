# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Run production build
npm run lint     # ESLint check
```

No test suite is configured.

## Architecture

This is a **Next.js 16 App Router** company website for Azka, supporting Arabic (default, RTL) and English via `next-intl`.

### Routing

All user-facing routes live under `app/[locale]/`. The root `app/layout.tsx` and `app/page.tsx` are pass-throughs that redirect to the locale-prefixed equivalents. Static generation uses `generateStaticParams()` in each dynamic route.

- Homepage: `app/[locale]/page.tsx` — renders Hero → About → VMV → Services → Stats → Contact
- System detail: `app/[locale]/systems/[slug]/page.tsx` — one page per system product

### Internationalization

- Locales: `ar` (default, RTL) and `en` (LTR), configured in `i18n/routing.ts`
- Translations live in `messages/ar.json` and `messages/en.json`
- Server components use `getTranslations({ locale, namespace })` (async)
- Client components use the `useTranslations(namespace)` hook
- Navigation (Link, useRouter, redirect) must be imported from `@/i18n/navigation`, not `next/navigation`, to preserve locale prefixing
- Locale layout applies `dir="rtl"` and switches fonts (Noto Kufi Arabic for `ar`, Inter for `en`)

### Theme System

Cookie-based dark mode (`azka-theme` cookie, 1-year expiry).

- `lib/theme.ts` — cookie read/write helpers
- `ThemeHydrationSync` (client) — runs in `useLayoutEffect` to apply the `dark` class and sync localStorage → cookie before first paint, preventing hydration flicker
- `ThemeToggle` (client) — toggles `dark` class on `<html>` and writes cookie
- The locale layout reads the cookie server-side and sets the initial `dark` class on `<html>`

### Systems / Products

13 system slugs are defined in `lib/systems.ts`: `hr`, `attendance`, `financial`, `budget`, `archiving`, `procurement`, `communications`, `warehouse`, `self-service`, `biometric`, `access`, `mobile`, `integration`.

Each slug maps to: Lucide icon name, gradient Tailwind classes, accent background classes, gallery image path, and a flag for whether the detail gallery uses real screenshots (`systemUsesPhotoGallery()`) or generated SVG illustrations.

Localized content for each system lives under `systems.details.{slug}` in the messages files (name, tagline, description, features[], benefits[]).

### Chatbot

- `components/chatbot/ChatWidget.tsx` — client component, full UI with message history, quick replies, attention pulse animation (every 30 s when closed)
- `lib/chatbotResolveAnswer.ts` — matching engine: normalizes Arabic text (strips diacritics, unifies variant characters), then tries exact match → normalized exact → intent keyword match → substring search
- Content lives entirely in the messages files under `chatbot.answers`, `chatbot.intent_routes`, `chatbot.quick_replies`, and `chatbot.fallback`
- Supports RTL/LTR based on locale

### Key Patterns

- **Server components by default.** Only add `"use client"` when you need hooks or browser APIs.
- **Fonts**: Both `notoKufiArabic` and `inter` are loaded in the locale layout and applied via inline `fontFamily` style (not just a CSS class) to avoid flash of unstyled text on locale switch.
- **Images**: Use Next.js `<Image>` with explicit `sizes` for responsive behavior. Arabic-named image files live in `public/images/`.
- **Tailwind dark mode**: Class-based (`dark:` prefix). Dark mode is toggled by adding/removing the `dark` class on `<html>`.
