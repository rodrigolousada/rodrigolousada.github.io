/** Display metadata for the nav's language selector, keyed by the same
 * locale codes used as top-level keys in site.json. A locale added to
 * site.json without an entry here still works — Nav.astro falls back to
 * showing its bare uppercased code instead of a flag, so nothing breaks,
 * it just looks a little plainer until a flag/label is added below. */
export const languageMeta: Record<string, { flag: string; label: string }> = {
  en: { flag: '🇬🇧', label: 'English' },
  pt: { flag: '🇵🇹', label: 'Português' },
  de: { flag: '🇩🇪', label: 'Deutsch' },
  es: { flag: '🇪🇸', label: 'Español' },
  fr: { flag: '🇫🇷', label: 'Français' },
};

export function getLanguageMeta(locale: string): { flag: string; label: string } {
  return languageMeta[locale] ?? { flag: '', label: locale.toUpperCase() };
}

/** Where a given locale's homepage lives: the default locale is served
 * unprefixed at "/", every other locale at "/<locale>/" — see
 * src/pages/[locale]/index.astro. */
export function localePath(locale: string, defaultLocale: string): string {
  return locale === defaultLocale ? '/' : `/${locale}/`;
}
