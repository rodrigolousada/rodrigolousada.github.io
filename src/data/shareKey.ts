import { slugify } from './slug';

/** The `?p=` deep-link key for a project nested under a career stop
 * (ProjectRow.astro) — `<stop-slug>.<slugified-project-name>`, using
 * `shortName` over the full `name` when one exists (e.g. "m-a-r-i-a" rather
 * than the full "m-a-r-i-a-ibm-watson-voice-assistant"). `undefined` for a
 * `hidden` project: those have no share button and no page of their own
 * (see ProjectRow.astro/GameCartridge.astro, and `src/pages/p/[key].astro`,
 * which build their static project list by filtering out exactly this).
 *
 * Pulled out into its own module (rather than left inline in ProjectRow.astro,
 * where it used to live) so the same logic can also build the *complete* list
 * of shareable projects at build time, for `src/pages/p/[key].astro`'s static
 * per-project preview pages — that list has to derive the exact same keys
 * ProjectRow's own share button produces, or a shared link would 404. */
export function careerProjectShareKey(
  stopSlug: string | undefined,
  project: { name: string; shortName?: string; hidden?: boolean }
): string | undefined {
  return project.hidden ? undefined : `${stopSlug ?? 'side'}.${slugify(project.shortName ?? project.name)}`;
}

/** Same idea as `careerProjectShareKey`, for a side project (GameCartridge.astro):
 * always `side.<slugified-title>`, no owning stop to qualify it with. */
export function sideProjectShareKey(project: { title: string; hidden?: boolean }): string | undefined {
  return project.hidden ? undefined : `side.${slugify(project.title)}`;
}
