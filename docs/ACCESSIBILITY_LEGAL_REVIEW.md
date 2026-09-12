# Accessibility, legal & production-readiness review

A point-in-time review of the whole site (accessibility, legal/privacy, and
production readiness), turned into a prioritized todo list. Nothing here has
been acted on yet — this is a checklist to work through, not a changelog.

Priority reflects risk × effort, not severity alone — a few "medium impact"
items rank high because they're a cheap fix.

See also [`LAUNCH_CHECKLIST.md`](./LAUNCH_CHECKLIST.md) for the
content/merge blockers this review doesn't duplicate.

## P0 — High priority (cheap fixes, real user-facing impact)

- [x] **Remove opacity modifiers on small muted-text labels**
      (`text-[var(--color-muted)]/60`, `/70` in TechStack, IntentFlow,
      Organizations, PhoneMockup, DeviceDuo, Projects). Drops contrast to
      ~2.8–3.4:1, below AA. Fix is deleting the `/60`/`/70` suffix —
      full-opacity muted already passes comfortably (~5.5–5.9:1).
- [x] **Self-host Google Fonts** instead of linking
      `fonts.googleapis.com`/`fonts.gstatic.com`. Removes the one concrete
      GDPR exposure (visitor IP sent to Google, no consent) and is a
      contained, mechanical change. Done: `src/styles/fonts.css` +
      `public/fonts/*.woff2` (latin-only subset — every string in
      `site.json`, English/Portuguese/German proper nouns included, lives in
      that range), Layout.astro's Google Fonts `<link>`s removed.
- [x] **Give the tech-search input an accessible name** (`aria-label` or a
      visually-hidden `<label>` on `#tech-search` in `TechStack.astro`) —
      currently relies on placeholder-only, a known assistive-tech
      anti-pattern.
- [ ] **Flip GitHub repo Settings → Pages → Source to "GitHub Actions"**
      before any merge to `master` — the committed `deploy.yml` won't serve
      anything until this is switched. (Carried over from
      `LAUNCH_CHECKLIST.md`.) **Deliberately not done here** — this is a
      live-repo setting on the currently-served production site, and
      flipping it before `redesign` is actually merged (and a successful
      Actions run has deployed from `master`) risks taking the live site
      down rather than helping it. Do this as the last step, right before
      merging, as already planned in `LAUNCH_CHECKLIST.md`.

## P1 — Medium priority (real gaps, more surface area to touch)

- [x] **Fix keyboard/focus handling on the two custom popups** (Hero
      city-info, Organizations "studied at") — add Escape-to-close and move
      focus into the popup on open, or convert them to native `<dialog>`
      like every other overlay on the site already is (picks up
      focus-trap/Escape for free and removes the special-case JS). Done via
      the Escape+focus route (kept the existing plain-div structure).
- [x] **Add a pause/stop affordance to the lightbox's autoplay video**, or at
      minimum stop autoplaying it and require a click to start — currently
      `autoplay muted loop` with no visible controls. Added a dedicated
      play/pause button next to the close button.
- [x] **Add `robots.txt` and `sitemap.xml`** to `public/` for crawlability
      before launch.
- [x] **Add a custom 404 page** so a dead link doesn't fall through to
      GitHub Pages' default one.

## P2 — Low priority / good hygiene

- [x] **Compress/resize the profile photo** (currently 673KB, used as both
      the hero image and `og:image`) — done now (2545×2545 → 1200×1200,
      673KB → ~190KB); still worth swapping for the real replacement photo
      per `LAUNCH_CHECKLIST.md` whenever that lands.
- [ ] **Confirm consent from testimonial-givers** for their name/title/quote/
      photo being public — not fixable in code, just a check-with-people
      item. Still open — needs Rodrigo, not a code change.
- [x] **Reconsider the auto-popping `EngagementPrompt` modal firing on every
      page load** — gated behind a `localStorage` flag now, same pattern the
      language selector already used: shows at most once per visitor.

## Context / what was already checked and found fine

- `npx astro check` is clean: 0 errors, 0 warnings, 1 pre-existing hint
  (unused var in `Layout.astro:113`).
- No analytics, trackers, or cookies of any kind — grepped for GA/gtag/Meta
  pixel/Hotjar/etc., found nothing. No forms post data anywhere (contact is
  via `mailto:` only). This is the simplest possible legal posture short of
  fixing the Google Fonts item above.
- `localStorage` use (remembered language preference) is functionally
  necessary storage, normally exempt from consent requirements.
- Employer/brand logos (Klarna, IBM, Bankinter, Montepio, etc.) shown in a
  factual "worked at" context is standard, low-risk nominative use.
- All `target="_blank"` links already carry `rel="noopener noreferrer"`.
- Base color tokens (text/muted/accent against both `bg` and `surface`) all
  clear AA comfortably at full opacity.
- Decorative images correctly use `alt=""`; the lightbox's `<img>` alt is
  populated dynamically from the trigger's own alt text.
- No unlabeled icon-only buttons — all carry `aria-label`.
- `prefers-reduced-motion` is already respected where it matters most (Hero
  city-glow pulse, PhoneMockup's step animation, IntentFlow's trace
  animation) — worth preserving, not "fixing," when touching those files.
- No secrets, API keys, or server-side code in the repo — nothing to leak on
  a static GitHub Pages deploy.
