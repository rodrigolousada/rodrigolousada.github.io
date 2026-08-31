# "5 mins" / "Know more" toggle — plan

A plan only — nothing here is implemented yet. Goal: a toggle near the top
of the page that switches between two reading modes:

- **5 mins** (default for a first visit): only the essentials — the pitch a
  recruiter or hiring manager needs to decide whether to keep reading.
- **Know more**: the full site as it exists today.

## What "5 mins" mode shows

Per section, from `index.astro` top to bottom:

| Section | 5 mins | Know more |
|---|---|---|
| Hero | Full (name, title, one-liner, map) | Full |
| About | "Looking for" + intro. Strengths pills and the Technologies panel hidden. | Full |
| Projects | Only the primary project per career stop (flagged `highlight: true` in `site.json`), collapsed to name + tl;dr, no modal trigger for the rest | Full, all projects clickable |
| Speaking | Hidden entirely | Full |
| Contact | Full (it's the call to action) | Full |
| Testimonials | One, if any exist | Full |
| Organizations | Full (logos are low-cost to scan) | Full |

Rule of thumb: hide sections that reward browsing, keep sections that are
short by nature or are the call to action. Career-stop and project rows
already collapse behind a `<dialog>`, so in "5 mins" mode the row itself
stays but non-essential rows disappear rather than gaining a second level of
collapsing — avoids nested disclosure UI.

## Data model change

Add an optional flag per item that should survive into the trimmed view:

```jsonc
// site.json
"careerPath": [
  {
    "projects": [
      { "name": "Referral Program", "highlight": true, ... }
    ]
  }
]
```

Anything without `highlight: true` is a "know more" item. Sections with no
such concept (Speaking, Technologies) are just hidden outright in 5-min
mode — no per-item flag needed there.

## Implementation approach

1. **State**: a single `data-mode` attribute on `<html>` or `<body>`
   (`"brief"` | `"full"`), toggled by a small script in `Layout.astro`.
   Persist the choice in `localStorage` (`site-mode`) so a returning visitor
   keeps their preference; default to `"brief"` when nothing is stored.
2. **Toggle control**: a small pill switch in `Nav.astro` — "5 mins / Know
   more" — always visible, not just on first load, so a recruiter can flip
   back and forth.
3. **Hiding, not removing**: mark trimmable elements with a
   `data-brief-hide` (whole section) or `data-brief-optional` (individual
   item, e.g. non-highlighted project rows) attribute at build time from
   Astro components — no client-side re-fetch or conditional rendering
   needed, the HTML for "know more" is always present.
4. **CSS-only switch**, no JS re-render:
   ```css
   [data-mode="brief"] [data-brief-hide],
   [data-mode="brief"] [data-brief-optional] { display: none; }
   ```
   The toggle script only flips the attribute + writes localStorage — cheap,
   no layout thrash, no hydration.
5. **No SSR/CLS flash**: inline a tiny blocking script in `<head>` that reads
   `localStorage` and sets `data-mode` on `<html>` before first paint (same
   pattern already used for the dark theme, if any such flash-prevention
   script exists — otherwise add one here).

## Open questions for Rodrigo

- Should "5 mins" mode hide the Testimonials/Organizations sections too, or
  are those cheap enough to always show? (Current proposal: always show.)
- Which project(s) per company should carry `highlight: true`? Proposal:
  Klarna → Referral Program; IBM → M.A.R.I.A; Bankinter → BIA and Beatriz.
  Confirm before implementing.
- Should the toggle default to "5 mins" for every visitor, or only until
  they interact with the page once (i.e. scrolling/clicking implies "I want
  more," auto-expand)? Proposal: default "5 mins," no auto-expand — let the
  visitor choose explicitly.

## Estimated effort

Small — mostly `data-*` attributes sprinkled through existing components, a
localStorage-backed toggle in `Nav.astro`, and a few lines of CSS. No new
components, no content changes. Once the two open questions above are
answered, this is roughly a single focused pass.
