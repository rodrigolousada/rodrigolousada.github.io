# Handover — rodrigolousada.me

This is Rodrigo's personal site: a portfolio/CV positioned for Engineering
Manager / Tech Lead job hunting. It was rebuilt from an old Bootstrap/Jekyll
template into Astro + Tailwind v4 on the `redesign` branch, largely through
iterative rounds of feedback with an AI agent. This document is for whoever
(human or agent) picks the project up next: what exists, why it's built the
way it is, and where to find the reasoning behind less obvious decisions.

For the running history of every change made round by round, see
`Backlog.md` at the repo root — it's the changelog and also currently holds
the live "what's blocked on Rodrigo" list (see [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md)
for the distilled version). For working conventions specific to running
this as a multi-agent Claude Code session (parallel worktrees, verifying
rendered output, common footguns), see `AGENTS.md` / `CLAUDE.md` at the
repo root — that file is process notes for whoever is *driving* an agent
on this repo; this one is about the site itself.

## Branch layout

- `master` — the live site (GitHub Pages, custom domain via `public/CNAME`).
  Left untouched until `redesign` is deliberately merged in.
- `redesign` — all work described here happens on this branch.
- Stray `worktree-agent-*` branches may exist locally, left over from
  parallel-agent sessions (see `AGENTS.md` point 3). They're harmless
  clutter, not part of the project history that matters; safe to delete
  once confirmed to have nothing unmerged worth keeping.

Before merging `redesign` into `master` and going live, see the deployment
step in [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) — the GitHub Pages
source setting needs to be flipped from "Deploy from a branch" to "GitHub
Actions" first, or the new build won't actually get served.

## Stack

- **Astro** (static output, no SSR/adapter) + **Tailwind v4** via the Vite
  plugin (`@tailwindcss/vite`) — no `tailwind.config.js`; theme tokens live
  in `src/styles/global.css`'s `@theme` block instead (Tailwind v4's
  CSS-first config).
- No UI framework (no React/Vue/etc.) — every component is a plain `.astro`
  file, with inline `<script>` blocks for the bits of interactivity that
  need JS (flip cards, dialogs, scroll-driven highlight, tech-pill
  pinning).
- `qrcode` npm package generates the App Store QR code for side projects,
  server-side at build time (see `GameCartridge.astro`).
- TypeScript is used for the data-only `.ts` files (`icons.ts`,
  `techIcons.ts`, `techAliases.ts`) and inline component `<script>` blocks;
  `astro check` is the type-checking entry point (no separate `tsc` step).

Run it:

```
npm install
astro dev --background     # localhost:4321; see AGENTS.md for daemon management
npm run build               # -> dist/
npm run preview             # serve dist/ over HTTP — never open dist/index.html via file://, see Gotchas
npx astro check              # type-check
```

## Architecture: `site.json` as the single source of truth

Every piece of visible copy — names, taglines, bios, project descriptions,
testimonial quotes, nav labels, contact links — lives in
`src/data/site.json`. Components read from it and render; they don't
hardcode text. This means:

- **To change what the site says, edit `site.json`, not a component.** The
  one common exception is copy that's structural/computed rather than
  authored (e.g. Hero's "N years of experience" is computed live from
  `about.softwareSince`, not stored as a string — see the comment at the
  top of `Hero.astro`).
- **Adding a new item to a repeated list** (a new side project, a new
  testimonial, a new career stop, a new organization logo) is usually just
  a new object appended to the relevant array in `site.json` — the
  rendering component (`Projects.astro`, `Testimonials.astro`,
  `Organizations.astro`, etc.) iterates the array rather than having a
  fixed number of slots.
- **Two lists are *not* auto-derived from each other and must be kept in
  sync by hand**: `nav.links` (the header's link order) and the actual
  `<section>` order inside `<main>` in `src/components/HomePage.astro`. The
  page's section order is the source of truth (it's what the visitor
  actually scrolls through); `nav.links` is edited to match it, not the
  reverse — see the comment block at the top of `HomePage.astro`. They
  can't just be generated from one list because not every section has a
  nav entry (Hero and Organizations don't).

### Multi-language structure

Everything described above sits one level deeper than it looks at first
glance: `site.json`'s actual top level is a map of language code → the
whole object described above, e.g. `{"en": {"site": ..., "hero": ...,
"careerPath": ..., ...}}`. `src/data/site.ts` is the only place that reads
that top level directly (`getSite(locale)`, `locales`, `defaultLocale`);
every component takes a `locale` prop and calls `getSite(locale)` rather
than importing `site.json` itself, so a component's own code never needs
to know how many languages exist.

Routing follows the same data: `src/pages/index.astro` renders the default
locale ("en") at `/`; `src/pages/[locale]/index.astro` uses
`getStaticPaths()` over `locales` (minus the default) to generate a page
at `/<locale>/` for every other language — both just render
`HomePage.astro` with a different `locale`. **Adding a language is a data
change, not a code change**: copy the `"en"` block in `site.json` to a new
key and translate its values, and the new page and its nav entry both
appear automatically at the next build.

The nav's flag dropdown (`LanguageSelector.astro`) reads `locales` the
same way and renders nothing at all when there's only one — `site.json`
currently defines `"en"` and `"pt"`, so the dropdown shows today.
`src/data/languages.ts` maps a locale code to its flag emoji + label for
that dropdown (pt/de/es/fr are already in there); a locale added to
`site.json` without an entry there still works, it just shows its bare
uppercased code until one's added.

The choice is sticky: picking a language in the dropdown writes it to
`localStorage` (`preferredLocale`), and an inline synchronous script at
the very top of `Layout.astro`'s `<head>` redirects to that locale's page
before anything paints if it differs from the one being served —
deliberately with no `navigator.language`/`Accept-Language` sniffing, so a
first-time visitor always lands on English regardless of browser
language.

Section headings, button/badge microcopy, and aria-labels (anything that
isn't per-content data) live in a second locale-map file, `src/data/ui.json`
— same `{"en": {...}, "pt": {...}}` shape as `site.json`, read the same
way via `src/data/ui.ts`'s `getUI(locale)`. It's a separate file rather
than folded into `site.json` because it's UI chrome, not content: every
component that renders any of it takes `locale` (or already had it) and
calls `getUI(locale)` alongside `getSite(locale)`. A few strings are
built at runtime rather than being static (`ui.organizations.grade`:
`"Grade: {grade}"`, `ui.cartridge.scanToDownload`: `"Scan to download
{title}"`, etc.) — filled in via plain `.replace('{token}', value)`, the
same template-substitution pattern `Hero.astro`'s `about.bioSummary` uses
for the computed years-of-experience sentence. One spot needed an extra
step: `Organizations.astro`'s cross-link "jump to timeline" popup is built
by a plain, normally-bundled `<script>` (real TypeScript syntax in it, so
it can't be made `is:inline`/`define:vars` without breaking that syntax
at runtime) — its slice of `ui.organizations` copy is serialized onto the
section's own `data-jump-ui` attribute and read back with `JSON.parse` at
click time instead.

Two other data files support `site.json`:

- `src/data/icons.ts` — small hand-written SVG path strings for UI chrome
  (mail/linkedin/github icons, star badge, etc.) — not brand logos.
- `src/data/techIcons.ts` — brand-colored logo paths for every badge shown
  in the Technologies section, sourced from Simple Icons (CC0-licensed).
  Each entry also carries the docs URL a tech pill's icon used to link to
  (see `TechPill.astro`'s comment — clicking now toggles a pinned state
  instead) and a category used to group the "All Technologies" popup.
- `src/data/techAliases.ts` — alternate search terms so the "All
  Technologies" search bar matches on things like "JS" → JavaScript.

A few trademarked marks (IBM, AWS, Docker, OpenAI) were pulled from Simple
Icons after takedown requests upstream; where the site needs one of those,
it renders a text-only badge instead of guessing at an unofficial mark.

## Design system

- **Dark theme only** — no light mode, no toggle. `color-scheme: dark` is
  set globally; there is no `prefers-color-scheme` branching anywhere.
- Color tokens, fonts, etc. are all defined once in `src/styles/global.css`
  under `@theme` (Tailwind v4 CSS-first config) and referenced via
  `var(--color-*)` / the generated utility classes — not hardcoded hex
  values scattered through components.
- Fonts: Inter (sans/body), Space Grotesk (display/headings), Source Serif
  4 (serif accents), Press Start 2P (pixel/monospace accents like the
  "cartridge" side-project theme).

## Key patterns worth knowing before you touch things

- **Native `<dialog>` + `showModal()` for every expandable panel** (career
  stop details, project cartridges, side-project cartridges, the
  Technologies "View more" popup, a testimonial's full letter). No JS modal
  library — the browser's own dialog element handles focus trapping,
  `::backdrop`, and Esc-to-close for free. `global.css` has one shared
  `dialog[open]` pop-in animation used by all of them.
- **One component per repeated item, not one hand-copied block per
  instance.** `CareerStopRow.astro`, `ProjectRow.astro` /
  `GameCartridge.astro`, and `TestimonialCard.astro` each render one row/card
  from one object in `site.json`'s corresponding array, the same way you'd
  expect a list to render. Adding a fourth testimonial or a fifth side
  project is a data change, not a markup change.
- **"Show more" past the first N items** is a repeated pattern (career
  timeline, side-project cartridges past 4, testimonials past 2) — same
  interaction shape reused rather than reinvented per section.
- **Placeholder system for footage that doesn't exist yet.** `PhoneMockup.astro`
  and `DeviceDuo.astro` render a real phone/watch frame with a dashed-border
  "drop footage here" placeholder (play icon + caption) whenever a
  video isn't supplied, and swap in the real `<video>` the moment one is.
  This is why several side projects currently show placeholder frames
  instead of broken embeds — see [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md)
  for exactly which ones are still waiting on real footage.
- **QR code generation is automatic, not a manual step.** `GameCartridge.astro`
  generates a QR code (via the `qrcode` package) the moment a project's
  `appDownloadUrl` is set in `site.json` — nothing else needs to change.
- **`scroll-padding-top` (global.css), not per-section `scroll-margin-top`.**
  A single `html { scroll-padding-top: 40px }` rule, scoped to the
  `min-width: 640px` media query (the width where the header is actually
  sticky — below that it's hidden in favor of a floating hamburger button),
  offsets every anchor jump site-wide so a section heading doesn't land
  flush against the sticky header. Chosen over adding `scroll-margin-top`
  to five separate section elements.
- **Tech pills pin instead of navigate.** Clicking a `TechPill` used to open
  that tech's docs in a new tab; it now toggles a pinned/highlighted state
  instead (so a visitor can mark several favorites without leaving the
  page), and pinned pills survive the "All Technologies" search filter.
- **The Contact section's two flip cards animate as one stacked unit** on
  scroll into view (`IntersectionObserver`, threshold 0.35): they start
  stacked and face-down, spread apart, then reveal their fronts on a
  staggered timer sequence; scrolling back out reverses it. Both cards'
  front-face link blocks are top-anchored with a fixed gap rather than
  `justify-between`, specifically so a card with only one link (Klarna,
  just email) lines up with the personal card's three links instead of
  the lone link drifting to the bottom of the card.

## Gotchas

- **Never open `dist/index.html` via `file://`.** Absolute asset paths
  (`/img/...`, `/_astro/*.css`) resolve against the filesystem root and
  break. Always serve over HTTP (`astro preview`) when checking a build.
- **`astro dev --background` / `astro preview --background` daemons outlive
  the session that started them**, and Astro has no `strictPort` — if 4321
  is taken it silently moves to 4322, 4323, etc. Run `astro dev stop` /
  `astro preview stop` when done; if a previously-working dev URL stops
  responding, check `lsof -i :4321` (and neighboring ports) for a stray
  process before assuming something broke.
- **Headless Chrome screenshots above ~5500px window height get garbled**
  (duplicated/misplaced content near the top) — a known Chrome headless
  bug, not a site bug. Screenshot at a normal height and scroll, or use a
  `<base href="...">` + negative-margin trick to isolate one section.
- `Backlog.md` is long; if you need to search it, prefer `grep` over
  reading it in full — it's mostly a chronological log of already-resolved
  rounds.

## Where to look next

- [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) — everything that's known to
  be missing or waiting on Rodrigo before this can go live.
- `Backlog.md` — full round-by-round change history, plus the current
  "Blocked" / "Optional polish" lists (kept in sync with the checklist).
- `AGENTS.md` / `CLAUDE.md` — process notes for running this repo as an
  agent session (worktree hygiene, verification tooling, common failure
  modes seen so far).
