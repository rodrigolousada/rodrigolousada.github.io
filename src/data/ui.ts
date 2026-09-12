import data from './ui.json';
import { defaultLocale } from './site';

/** Shape of one language's worth of UI chrome copy — section headings,
 * button/badge microcopy, aria-labels — everything that isn't per-content
 * data (that lives in site.json) but still renders as visible text.
 * Mirrors site.ts's split: one flat file keyed by locale, so a new language
 * only needs a new top-level key here, same as site.json. */
export type UIData = (typeof data)['en'];

/** Resolves a locale to its UI copy, falling back to the default locale for
 * a locale that doesn't have UI copy yet (e.g. a newly added site.json
 * locale whose chrome translations haven't been written yet) or an unknown
 * code. */
export function getUI(locale?: string): UIData {
  return (data as Record<string, UIData>)[locale ?? ''] ?? data[defaultLocale];
}
