# Project share cards

One 1200x630 JPEG per shareable project (`src/data/shareableProjects.ts`
decides what's shareable: any non-`hidden` career-stop or side project),
named after its own `?p=` share key with dots kept as-is
(`ibm-consulting.m-a-r-i-a.jpg`, `side.magic-mirror.jpg`, ...). Used as the
`og:image`/`twitter:image` on that project's own `/p/<key>/` preview page
(see `src/layouts/ShareRedirect.astro`).

JPEG, not PNG: a link-preview crawler (WhatsApp, iMessage, Slack, ...)
fetches this image synchronously the first time a link is ever shared, and
often loses the race against the message actually sending, which is why
that first share sometimes shows no card at all while a second send (now
cached by the app) does. These cards are photo-and-gradient graphics, not
flat icon art, so a quality-85 JPEG (`sips -s format jpeg -s
formatOptions 85 in.png --out out.jpg`) cuts the ~250-330KB a PNG came out
to down to ~70-120KB with no visible quality loss, shortening that fetch.

`default.jpg` is the fallback for any shareable project not named in the
`KNOWN` set below ("Look at this cool project from Rodrigo", no
project-specific details baked into the image since it's shared across
whichever projects land here). **This is the rule to keep in mind:**
un-hiding a project, or adding a brand-new one, automatically gives it a
share button and a `/p/<key>/` page the moment `hidden` is false/absent —
nobody has to remember a separate step for that to work. What's easy to
forget is the *dedicated* card: skip the steps below and the project's
preview quietly (and correctly) uses `default.jpg` instead of a broken
image, so nothing breaks, but every shared link for it looks the same
generic way until someone comes back and does this.

Not generated at build time (no headless browser step in CI) — built once,
by hand, and committed as static assets, same as the sitewide card
(`public/img/og-image.jpg`, used only on the homepage itself, never as a
project fallback — that's `default.jpg`'s job). To add a dedicated one for
a project that doesn't have one yet:

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
   after a `--window-size=1200,630` capture), then convert that PNG to a
   quality-85 JPEG (`sips -s format jpeg -s formatOptions 85 out.png --out
   out.jpg`) for the size/fetch-speed reasons above.
3. Save it here as `<share-key>.jpg` and add that key to the `KNOWN` set in
   `src/data/shareableProjects.ts`'s `cardImage()` — until it's in that set,
   the project's preview page keeps using `default.jpg` rather than a
   broken image link.
