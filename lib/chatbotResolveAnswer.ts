export type ChatbotIntentRoute = {
  /** Must match a key in `answers` for the active locale */
  answer: string;
  keywords: string[];
};

/**
 * Normalize user text and FAQ keys for loose matching (Arabic + Latin).
 */
export function normalizeForMatch(input: string): string {
  let s = input.trim().toLowerCase();
  s = s.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '');
  s = s.replace(/[آأإٱ]/g, 'ا');
  s = s.replace(/ى/g, 'ي');
  s = s.replace(/ة/g, 'ه');
  s = s.replace(/ؤ/g, 'و');
  s = s.replace(/ئ/g, 'ي');
  s = s.replace(/\s+/g, ' ');
  return s;
}

const MIN_KEYWORD_LEN = 3;

/**
 * Resolve a free-text question to a canned answer when possible.
 * Order: exact → normalized exact → intent keywords → key substring in query → query substring in key.
 */
export function resolveChatbotAnswer(
  rawQuery: string,
  answers: Record<string, string>,
  routes: ChatbotIntentRoute[]
): string | null {
  const trimmed = rawQuery.trim();
  if (!trimmed) return null;

  const direct = answers[trimmed];
  if (direct) return direct;

  const q = normalizeForMatch(trimmed);
  if (!q) return null;

  const normToKey = new Map<string, string>();
  for (const key of Object.keys(answers)) {
    normToKey.set(normalizeForMatch(key), key);
  }
  const byNorm = normToKey.get(q);
  if (byNorm) return answers[byNorm] ?? null;

  const sortedRoutes = [...routes].sort((a, b) => {
    const maxA = Math.max(0, ...a.keywords.map((k) => k.length));
    const maxB = Math.max(0, ...b.keywords.map((k) => k.length));
    return maxB - maxA;
  });

  for (const route of sortedRoutes) {
    const text = answers[route.answer];
    if (!text) continue;
    const kws = [...route.keywords].sort((a, b) => b.length - a.length);
    for (const kw of kws) {
      const nk = normalizeForMatch(kw);
      if (nk.length < MIN_KEYWORD_LEN) continue;
      if (q.includes(nk)) return text;
    }
  }

  for (const key of Object.keys(answers)) {
    const kn = normalizeForMatch(key);
    if (kn.length < 8) continue;
    const slice = kn.slice(0, Math.min(28, kn.length));
    if (slice.length >= 8 && q.includes(slice)) return answers[key] ?? null;
  }

  if (q.length >= 4) {
    for (const key of Object.keys(answers)) {
      const kn = normalizeForMatch(key);
      if (kn.length >= 10 && kn.includes(q)) return answers[key] ?? null;
    }
  }

  return null;
}
