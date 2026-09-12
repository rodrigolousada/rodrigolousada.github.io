/** Kebab-case a display string into a stable, URL-safe key — used to build
 * the `?p=` deep-link for a project (see ProjectRow.astro / GameCartridge.astro
 * and the resolver in Organizations.astro). Not unique on its own: callers
 * combine it with a parent scope (a career stop's own slug, or the literal
 * "side" prefix for side projects) since two projects can share a name. */
export function slugify(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip combining diacritics (é -> e)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
