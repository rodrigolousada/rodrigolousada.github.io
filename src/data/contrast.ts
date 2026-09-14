// WCAG contrast-ratio helpers, plus a small read-through of the theme's
// actual surface color from global.css. Pulled out of TechPill.astro (the
// only consumer today, deciding whether a brand icon color is too close to
// the pill background to read) so a leaf display component isn't also the
// one doing filesystem access and color-science math, and so this is
// reusable if another icon-bearing component ever needs the same check.
import fs from 'node:fs';
import path from 'node:path';

/** WCAG relative luminance of a `#rrggbb` hex color (0 = black, 1 = white). */
export function relativeLuminance(hex: string): number {
  const [r, g, b] = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)].map((h) => parseInt(h, 16) / 255);
  const lin = (v: number) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** WCAG contrast ratio between two `#rrggbb` hex colors (1 = identical, 21 = black vs. white). */
export function contrastRatio(hexA: string, hexB: string): number {
  const [la, lb] = [relativeLuminance(hexA), relativeLuminance(hexB)];
  const [lighter, darker] = la > lb ? [la, lb] : [lb, la];
  return (lighter + 0.05) / (darker + 0.05);
}

/** Today's known --color-surface value, used only if the read below ever fails. */
const FALLBACK_SURFACE_COLOR = '#131318';

/** The theme's `--color-surface` token, read straight from global.css rather
 * than hand-copied here, so retheming the surface color can't silently
 * desync a caller's contrast check from what actually renders. Resolved
 * from the project root (where `astro dev`/`astro build` always run), not
 * the caller's own file — a relative `import.meta.url` path breaks once
 * that file gets bundled somewhere else under `dist/` during a production
 * build. Falls back to today's known value if the file or token is ever
 * missing/renamed, so a build never breaks over it. */
export function getSurfaceColor(): string {
  try {
    const globalCss = fs.readFileSync(path.join(process.cwd(), 'src/styles/global.css'), 'utf-8');
    return globalCss.match(/--color-surface:\s*(#[0-9a-fA-F]{3,8})/)?.[1] ?? FALLBACK_SURFACE_COLOR;
  } catch {
    return FALLBACK_SURFACE_COLOR;
  }
}
