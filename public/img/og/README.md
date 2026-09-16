# Project share cards

One 1200x630 PNG per shareable project (`src/data/shareableProjects.ts`
decides what's shareable: any non-`hidden` career-stop or side project),
named after its own `?p=` share key with dots kept as-is
(`ibm-consulting.m-a-r-i-a.png`, `side.magic-mirror.png`, ...). Used as the
`og:image`/`twitter:image` on that project's own `/p/<key>/` preview page
(see `src/layouts/ShareRedirect.astro`) instead of falling back to the
sitewide `og-image.png`.

Not generated at build time (no headless browser step in CI) — built once,
by hand, and committed as static assets, same as the sitewide card. To add
one for a project that doesn't have one yet (a newly un-hidden project, or
a new one entirely):

1. Pick an accent color and, for a career project, its company logo (see
   `logoInvert`/`chipClass` on the owning stop in `site.json` for whether
   the mark reads better on a white chip or inverted to white directly).
2. Render an HTML file at 1200x630 following the existing cards' layout
   (dark background, blurred accent blob top-left + faint fuchsia
   bottom-right, 48px grid at 5% opacity, the project's own logo or a
   colored chip top-left next to an eyebrow line, title, one-line tagline,
   up to ~5 tech pills, `rodrigolousada.me` bottom-right) via a headless
   Chrome screenshot at `--force-device-scale-factor=2` then downscaled
   back to 1200x630 for crisp text (`sips -z 630 1200 in.png --out out.png`
   after a `--window-size=1200,630` capture).
3. Save it here as `<share-key>.png` and add that key to the `KNOWN` set in
   `src/data/shareableProjects.ts`'s `cardImage()` — until it's in that set,
   the project's preview page keeps using the sitewide card rather than a
   broken image link.
