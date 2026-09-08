import data from './site.json';

/** Shape of a single language's worth of content — everything that used to
 * live at the top level of site.json now lives under one language code, so
 * this type describes one of those, not the file as a whole. */
export type SiteData = (typeof data)['en'];

/** Which language a page renders in is always resolved to one of these. */
export type Locale = keyof typeof data;

/** Every language currently present in site.json, in the order they're
 * defined there. This is the single source of truth for which languages the
 * site offers: add a new top-level key (e.g. "pt") to site.json with the
 * same shape as "en" and it automatically gets a route (see
 * src/pages/[locale]/index.astro) and, once there's more than one language,
 * shows up in the nav's language selector (see Nav.astro) — nothing else
 * needs to change. */
export const locales = Object.keys(data) as Locale[];

/** Served unprefixed at "/" (every other locale gets its own "/<locale>/"
 * page — see src/pages/[locale]/index.astro). Hardcoded rather than
 * "locales[0]" so reordering keys in site.json can't silently change which
 * language is the default. */
export const defaultLocale: Locale = 'en';

/** Resolves a locale code to its content, falling back to the default
 * locale for an unknown or missing code (e.g. a stale link to a language
 * that's since been removed from site.json). */
export function getSite(locale?: string): SiteData {
  return (data as Record<string, SiteData>)[locale ?? ''] ?? data[defaultLocale];
}
