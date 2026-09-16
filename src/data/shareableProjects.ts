import { getSite, locales, type Locale } from './site';
import { careerProjectShareKey, sideProjectShareKey } from './shareKey';

/** site.json's own project entries are heterogeneous object literals (a
 * project with a `shortName` and one without infer as two distinct types,
 * not one type with an optional field), so TypeScript won't let a `.forEach`
 * over the array access a field that isn't present on every single literal.
 * This is exactly the shape ProjectRow.astro's own `Props.project` already
 * declares for the same reason — mirrored narrowly here rather than
 * imported, since exporting it from a `.astro` file isn't possible. */
interface CareerProjectLike {
  name: string;
  shortName?: string;
  hidden?: boolean;
  tldr: string;
}

export interface ShareableProject {
  /** Same `?p=` key ProjectRow.astro/GameCartridge.astro's own share buttons
   * produce (see shareKey.ts) — this is also the [key] param `src/pages/p/
   * [key].astro` and `src/pages/[locale]/p/[key].astro` build a static page
   * for, so a shared link and its preview page always agree. */
  key: string;
  /** One shared 1200x630 card for every locale, not four — see
   * public/img/og/README.md for how it was built and how to add one for a
   * project that doesn't have one yet (any shareable project missing here
   * quietly falls back to the sitewide card in getProjectImage below,
   * rather than a broken image). */
  image: string;
  /** Per-locale <title>/description text for this project's own preview
   * page, keyed the same way every other per-locale lookup on this site is
   * (getSite(locale), getUI(locale), ...). */
  byLocale: Record<Locale, { title: string; description: string }>;
}

/** The image is optional per project (falls back to the sitewide card) since
 * a freshly un-hidden project won't have one yet until someone regenerates
 * public/img/og/ (see the README there) — better a generic thumbnail for a
 * few days than a 404'd one. */
function cardImage(key: string): string | undefined {
  const KNOWN = new Set([
    'ibm-consulting.m-a-r-i-a',
    'instituto-de-telecomunicacoes.ml-trading-simulator-spy-options',
    'side.magic-mirror',
    'side.space-invaders',
    'side.nobel-prizes',
  ]);
  return KNOWN.has(key) ? `/img/og/${key}.png` : undefined;
}

/** Leading clause of a longer description, for use as a meta description
 * where the full paragraph (side projects' own `description` field, written
 * for the detail dialog) would run well past what search/social previews
 * show before truncating. Stops at whichever comes first: a sentence-ending
 * mark, or a colon introducing the rest of the detail (most of these
 * descriptions open with "A thing built like this: <all the specifics>" —
 * the part before the colon is already a complete, punchier description on
 * its own). Falls back to the whole string if neither appears. */
function firstSentence(text: string): string {
  const match = text.match(/^.*?[.!?:](?=\s|$)/);
  return match ? match[0].replace(/:$/, '.') : text;
}

/** Walks every locale's career stops and side projects once, pulling out
 * only the ones with a real (non-hidden) share key, and pairs each with its
 * own per-locale title/description. English structures the walk (`locales`
 * order and which projects exist are identical across locales by
 * construction — every translation is a parallel array, same length, same
 * order, see site.json) so this only has to loop the data once instead of
 * hand-matching a project across four separately-keyed locale blocks. */
export function getShareableProjects(): ShareableProject[] {
  const byKey = new Map<string, ShareableProject>();

  for (const locale of locales) {
    const site = getSite(locale);

    site.careerPath.forEach((stop) => {
      stop.projects.forEach((raw) => {
        const project = raw as CareerProjectLike;
        const key = careerProjectShareKey(stop.slug, project);
        if (!key) return; // hidden project, no share button, no page
        const entry = byKey.get(key) ?? {
          key,
          image: cardImage(key) ?? '/img/og-image.png',
          byLocale: {} as Record<Locale, { title: string; description: string }>,
        };
        entry.byLocale[locale] = {
          title: project.shortName ?? project.name,
          description: project.tldr,
        };
        byKey.set(key, entry);
      });
    });

    site.sideProjects.forEach((project) => {
      const key = sideProjectShareKey(project);
      if (!key) return;
      const entry = byKey.get(key) ?? {
        key,
        image: cardImage(key) ?? '/img/og-image.png',
        byLocale: {} as Record<Locale, { title: string; description: string }>,
      };
      entry.byLocale[locale] = {
        title: project.title,
        description: firstSentence(project.description),
      };
      byKey.set(key, entry);
    });
  }

  return [...byKey.values()];
}
