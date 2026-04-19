function trimLine(text: string, max = 52): string {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

interface SystemGalleryIllustrationProps {
  name: string;
  tagline: string;
  features: readonly string[];
  benefits: readonly string[];
  /** Tailwind gradient classes for the fake window header (same as system hero icon). */
  accentGradient: string;
  /** First panel: sidebar + list; second: metrics + chart + short list */
  variant: 'a' | 'b';
  dir: 'rtl' | 'ltr';
  /** Accessible illustration label */
  ariaLabel: string;
}

/**
 * Text-only “screen” mockup for system detail gallery when no product screenshots exist.
 * Styled as a generic app window so it reads as illustrative, not a stock photo.
 */
export default function SystemGalleryIllustration({
  name,
  tagline,
  features,
  benefits,
  accentGradient,
  variant,
  dir,
  ariaLabel,
}: SystemGalleryIllustrationProps) {
  const featRows = features.slice(0, 6).map(trimLine);
  const benefitRows = benefits.slice(0, 5).map(trimLine);

  return (
    <figure
      role="img"
      aria-label={ariaLabel}
      className="relative aspect-video w-full overflow-hidden rounded-2xl border border-emerald-200/70 bg-gradient-to-b from-slate-50 to-slate-100 shadow-sm dark:border-slate-700/50 dark:from-slate-900 dark:to-slate-950 dark:shadow-none"
    >
      <div className="absolute inset-0 flex flex-col text-start" dir={dir}>
        {/* Title bar */}
        <div
          className={`flex h-9 shrink-0 items-center gap-2 bg-gradient-to-r px-3 ${accentGradient}`}
        >
          <div className="flex gap-1" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-white/35" />
            <span className="h-2 w-2 rounded-full bg-white/35" />
            <span className="h-2 w-2 rounded-full bg-white/35" />
          </div>
          <span className="min-w-0 flex-1 truncate text-[11px] font-semibold text-white/95 sm:text-xs">
            {trimLine(name, 44)}
          </span>
        </div>

        {variant === 'a' ? (
          <div className="flex min-h-0 flex-1">
            {/* Sidebar */}
            <div
              className="hidden w-[22%] shrink-0 border-e border-slate-200/90 bg-white/80 py-2 ps-2 pe-1 dark:border-slate-700/80 dark:bg-slate-800/50 sm:flex sm:flex-col sm:gap-1.5"
              aria-hidden
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-2 rounded bg-slate-200/90 dark:bg-slate-600/80"
                  style={{ width: `${68 + (i % 3) * 8}%` }}
                />
              ))}
            </div>
            {/* Main list from features */}
            <div className="flex min-w-0 flex-1 flex-col gap-1.5 overflow-hidden p-2.5 sm:p-3">
              <p className="mb-0.5 text-[10px] font-medium text-green-700 dark:text-green-400 sm:text-xs">
                {trimLine(tagline, 64)}
              </p>
              <div className="flex flex-col gap-1.5 overflow-y-auto">
                {featRows.map((row, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 rounded-lg border border-slate-200/80 bg-white/90 px-2 py-1.5 dark:border-slate-700/60 dark:bg-slate-800/70"
                  >
                    <span className="mt-0.5 h-3 w-3 shrink-0 rounded border border-emerald-300/80 bg-emerald-500/15 dark:border-emerald-500/40" />
                    <span className="text-[10px] leading-snug text-slate-700 dark:text-slate-200 sm:text-[11px]">
                      {row}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden p-2.5 sm:gap-2.5 sm:p-3">
            {/* Metric tiles */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2" aria-hidden>
              {[72, 54, 88].map((w, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-slate-200/80 bg-white/90 px-2 py-1.5 dark:border-slate-700/60 dark:bg-slate-800/70"
                >
                  <div className="mb-1 h-1.5 w-[55%] rounded bg-slate-200 dark:bg-slate-600" />
                  <div className="h-2 rounded bg-emerald-500/25" style={{ width: `${w}%` }} />
                </div>
              ))}
            </div>
            {/* Fake chart */}
            <div
              className="flex h-[28%] min-h-[3.5rem] items-end justify-between gap-1 rounded-lg border border-slate-200/80 bg-white/90 px-2 py-1.5 dark:border-slate-700/60 dark:bg-slate-800/70"
              aria-hidden
            >
              {[40, 65, 45, 80, 55, 70, 50].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-t from-emerald-600/35 to-green-400/50 dark:from-emerald-500/30 dark:to-green-300/35"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            {/* Lines from benefits */}
            <ul className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
              {benefitRows.map((row, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 rounded-md border border-slate-200/70 bg-slate-50/90 px-2 py-1 text-[10px] text-slate-600 dark:border-slate-700/50 dark:bg-slate-800/40 dark:text-slate-300 sm:text-[11px]"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/80" />
                  <span className="min-w-0 leading-snug">{row}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </figure>
  );
}
