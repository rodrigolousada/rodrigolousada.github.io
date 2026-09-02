Use this to complete the website a bit more

(Everything from the original list has been addressed on the `redesign`
branch except what's below.)

# Blocked — needs input from you
- **CourtKit demo footage**: the Apple Watch / iPhone frames are in place on
  the CourtKit cartridge, waiting on the actual screen recordings — send
  them over and I'll drop them in.
- **CourtKit App Store link**: once the app is live, send the link and a QR
  code to download it will appear automatically on the cartridge.
- **Profile picture**: you mentioned uploading a new one to `img` — hasn't
  shown up yet, current one is still the original from the old site.
- **Hero numbers, reworded around impact**: still on the current 3 stats
  (4–6 devs led, 2x FTE savings, 70% workload cut) — to rework them as "what
  I can do for you" (total FTEs saved across every automation project, and
  revenue brought in), I need the actual numbers from you (or a CV pass to
  find them). Flagging so it doesn't get lost; not blocking anything else.
- **Grades on the "Studied at" balloons**: the balloon now supports an
  optional grade line under the program (e.g. "Grade: 17/20"), but I don't
  have real numbers for IST, TU Berlin, Humboldt, AESE, or Externato S. José
  — send whichever ones you want shown and I'll add them (leave any out you
  don't want displayed).

# Optional polish — found while checking LinkedIn and the old site
Not gaps, just small enrichments spotted while cross-checking your LinkedIn
profile and the old Bootstrap site (`master`) against `site.json`. Nothing
here is missing exactly — say the word on any of these and I'll add it:
- AESE program blurb could mention the specific pitch you did there (a
  proposal to Luís Simões on reducing truck drivers' loneliness) instead of
  the generic "Executive education programme".
- LinkedIn lists 35 certifications and lots of skills; I didn't see a clean
  way to add most of them without cluttering the site, but flagging in case
  a couple (AWS Cloud Practitioner?) are worth a specific mention somewhere.


# Feedback
- **Done** — About is gone as its own 2-column section. The "7 years..." bio
  now lives in the Hero as one line ("Project Engineering Manager with
  {years} years..." — years still computed live from `about.softwareSince`,
  not hardcoded), the roleLine under your name reads "Software Engineer @
  Klarna · Berlin, Germany", and the headline is "I lead teams that ship!".
  "Looking for" and Clifton Strengths moved into the Hero too, right after
  the numbers, with no section wrapper around either. Technologies is now
  its own top-level section (nav link renamed "Tech").
  **My call on Clifton Strengths** (you asked for a proposal): kept it
  minimal, right under "Looking for" in the Hero, same small-pill style,
  no heading treatment of its own — say the word if you'd rather it get
  more visual weight or move somewhere else entirely.
- **Done** — Business cards now stack and spread from the middle instead of
  sliding in from the left.
- **Done** — Tech badges reworked like nathanbrachotte.dev: no more white
  circle behind the logo, everything sized up a bit, hover grows the whole
  pill, and clicking one opens that tech's official docs in a new tab (a
  `url` was added per entry in `techIcons.ts`). A few very dark brand colors
  (GitHub, Kafka, Pandas, Flask, Three.js) now render in the theme's muted
  gray instead of their literal (near-invisible-on-dark) brand color.
- **Done** — The scroll-into-view jump now opens the second-level project
  modal 0.5s after highlighting it (was 0.9s) — top-level timing (scroll →
  highlight 1s → open) was already on spec.
- **Done** — Fixed the Klarna/IBM gap in "Associated with": Klarna's logo
  was scaled up via a CSS transform, which grows the pixels without growing
  the layout box, so it visually crept into IBM's space. Scale is now baked
  into the logo's real height instead, so every gap is even.
- **Done** — Inside a career stop's modal (IBM, etc.): KPIs and Achievements
  are now side-by-side columns on larger screens, and the gap between every
  subsection (KPIs, Achievements, Projects, stack, Focus, Badges) is roughly
  doubled for readability.
- **Done** — Added "Chatbots Data Pipeline (E2E)" as an IBM project (data
  ingestion → cleaning → processing → OLTP→OLAP → dashboards for devs,
  management, clients and CXOs), with the 3 FTEs saved / 100x more insights
  / hundreds of fixes / roadmap-investment achievements you gave me.
- **Done** — Added Sales, Product Design, and Social Media as new focus-area
  categories (Data Science already existed). SINFO is now mostly Sales with
  Project Managing and a bit of Social Media; IBM has a small Sales slice;
  Klarna's Data Engineering is down a touch, Data Science is at 0%, and
  Product Design picked up the difference.


-------

- **Done** — Headline changed to "I lead developers that ship" (dropped the
  exclamation). The bio paragraph under it is now justified and a bit wider
  so it doesn't wrap onto a new line so early.
- **Done** — Technologies "recent" set now matches exactly what you listed:
  AWS, TypeScript, React, React Native, Node.js, Tailwind CSS, Python,
  FastAPI, Kafka, RDS, PostgreSQL, Jenkins, Datadog, Docker, SentinelOne,
  Sentry. Added React Native, Node.js, Tailwind CSS, RDS, and SentinelOne as
  new technologies (they didn't exist on the site before); also fixed a bug
  where a tech only showed in the compact "recent" row if it lived in the
  `items` list specifically — `extra` is now checked too.
- **Done** — Tech icons: added the real (missing) Docker logo, plus Node.js,
  Tailwind CSS, Sentry, React Native, and Raspberry Pi. RDS and SentinelOne
  have no official open-license mark anywhere, so those use a generic
  database/shield icon tinted their brand color, same approach already used
  for AWS/IBM. Also found and fixed the actual bug behind "some are just
  grey" — the grey fallback was triggering off raw color darkness instead of
  actual contrast against the pill's background, wrongly greying out
  Datadog's purple, Terraform, OpenSearch, and WikiData even though they're
  perfectly readable; it now only kicks in for genuinely low-contrast marks
  (Kafka, GitHub, Flask, Three.js, Pandas, LangChain, Sentry). Note on
  Jenkins specifically: that colored butler-head "drawing" you're picturing
  doesn't exist as an open-license asset — Simple Icons (the source for
  every brand mark here) only publishes single-color silhouettes, and that
  red one is the official Jenkins mark as published. If you want it to look
  more like the plaid butler, that'd mean sourcing (or drawing) a bespoke
  multi-color asset for just that one icon — happy to if it's worth it to
  you.
- **Done** — "My preferred stack" now has Storage split out from Data
  (PostgreSQL/RDS/Neo4j vs. Kafka/OpenSearch), plus a new Analytics /
  Monitoring / Reporting tier (Datadog, Sentry, Power BI) between that and
  Infra.
- **Done** — Added "Magic Mirror" as a side project: built at home with a
  Raspberry Pi and an old monitor behind two-way mirror glass, running the
  open-source MagicMirror² platform, all in for well under €50. No public
  repo of your own for it, so it shows "not open source yet" like any other
  closed project — flag if you'd rather it credit/link the MagicMirror²
  project itself. Added placeholder photo/video slots and a "Favorite
  Modules" list slot in the cartridge (currently empty, ready whenever you
  send over the modules list, plus the picture/video).
- **Done** — Clifton Strengths moved out of the Hero, now sits right below
  "What people say" as its own row. Each pill is clickable and pops up a
  balloon with that theme's real Gallup/CliftonStrengths description (the
  same wording that's on the certificate).
- **Done** — Inside a career stop's modal, Achievements now takes about 1/3
  of the width next to KPIs (was an even 50/50 split).


-------

- **Done** — "Looking for" is gone from the Hero; it now shows up as the
  newest entry in the Projects timeline, right before Klarna: a dashed
  "What's next" card with the same text, styled as an open/incomplete
  project. Clicking it opens a pre-filled email to you instead of a modal.
- **Done** — Icon quality pass, round two. Jenkins now uses the real
  multi-color butler illustration (sourced from Devicon, MIT license)
  instead of Simple Icons' flat single-color silhouette — this is the
  actual fix for "Jenkins is a drawing but shows one color." Datadog was
  left as-is: its real brand mark genuinely is a flat single-color
  silhouette, so there was nothing to fix there. IBM Watson's stand-in icon
  (it has no public brand mark to reproduce) was swapped from a blurry
  single-color robot glyph to a crisp two-tone CPU chip, since the actual
  complaint turned out to be legibility at small size rather than color.
- **Done** — "My preferred stack" rebuilt with the full picture you asked
  for: a "Consumers" row up top (Mobile Users, Web Users, Stakeholders),
  with Power BI/Excel's Reporting layer specifically wired to Stakeholders
  (Mobile/Web Users wire to Frontend) rather than a generic "everything
  connects to everything" line. Infra (AWS, Docker, Terraform, plus Datadog
  and Sentry moved in as cross-cutting observability) is now drawn as one
  box wrapping the whole stack instead of its own tier. Added a new Data
  Science layer (scikit-learn, Pandas, NumPy). Added a separate,
  deliberately disconnected "Experimentation" box (Jupyter, TensorFlow,
  Keras, k6) with no lines into the main diagram, for tools you use to try
  things out rather than ones that are actually wired into the stack.
- **Done** — Clifton Strengths pills now respond to hover instead of
  requiring a click, and each balloon has a "See certificate →" link that
  opens your actual CliftonStrengths certificate right on the site (same
  pop-up pattern as the APC recommendation letter) — I generated the image
  from the `CliftonStrengths.pdf` already in the repo, so no new file is
  needed from you.


-------

- **Done** — Removed the company-wide "Technologies" pill row from inside
  each career-stop modal (IBM, Klarna, etc.) — each project underneath it
  already lists its own Technologies, so the company-level row was just
  repeating the same logos with no added info.
- **Done** — Datadog, for real this time: last round's read of "already a
  flat single color, nothing to fix" was only half right. The mark itself
  (confirmed identical on both Simple Icons and Devicon) is genuinely
  detailed — a dog-and-chart illustration, not a plain silhouette — and it
  turned to mud at the pill row's normal 18px. It now renders at 28px, the
  smallest size the detail actually holds together at, while every other
  icon stays at the normal size.
- **Done** — Widened the "All Technologies" pop-up (42rem → 54rem) so the
  preferred-stack diagram has more breathing room.
- **Done** — Added React Native to the Frontend layer of "My preferred
  stack." Backend now shows two side-by-side options — Python + FastAPI, or
  Node.js + TypeScript — joined by an explicit "OR" badge so it reads as
  "either one" rather than "all of this at once."
- **Done** — Klarna business card's front now uses the same top/bottom
  layout as the personal card (contact block pinned to the top, links
  pinned to the bottom) instead of everything bunched at the top with dead
  space below — same rhythm on both cards now.
- **Done** — Side-project cartridges now sit in a 4-column grid sized to
  the row's actual width instead of fixed-width boxes wrapping unevenly —
  4 fit exactly per row with no stranded 4th cartridge and no leftover gap.
  Past 4 side projects, a "Show more" toggle appears (same pattern as the
  career timeline's); not visible yet since there are exactly 4. CourtKit
  is now the first cartridge.
- **Done** — "Studied at" balloons can now show an optional grade line
  under the program — see the Blocked section above, need real numbers
  from you before any actually show up.


-------

- **Done** — "I lead developers that ship" now fits on one line from the
  sm breakpoint up (was breaking after "that", stranding "ship" alone) —
  sized down a notch specifically at sm/md, measured against the actual
  column width so it holds one line without shrinking the mobile size.
- **Done** — Added a search bar to the "All Technologies" pop-up's full
  list — typing filters the badges live and hides any category with no
  match, so it stays usable as the list grows.
- **Done** — Fixed a real overflow bug in the "My preferred stack" diagram:
  at the previous width, "OpenSearch"'s badge spilled a couple pixels past
  its box. Widened the whole diagram (max-w-xl → max-w-2xl) so every row,
  including Data/Storage/AI/LLMs/Data Science, has enough room.
- **Done** — Backend's Python/Node.js options now live inside one shared
  box (labelled "Backend", with an "or" badge between the two) instead of
  two separate boxes glued together — reads as "one decision, two ways."
- **Done** — Reporting no longer visually feeds through Backend. Split what
  used to be the "Data" layer into its own "Data Pipeline" box (Kafka,
  OpenSearch) sitting next to Backend, and rewired the diagram so Frontend
  feeds Backend while Reporting feeds Data Pipeline specifically — matches
  how Power BI/Excel actually get their numbers (off the data pipeline,
  not the live API).

-------

- **Full mobile audit** (real headless Chrome at phone widths — 375/390/430px
  — via Playwright, not just code review): checked every section, dialog,
  and animation for overflow, contrast, and layout issues. Most of the
  site holds up well at phone widths — nav, hero, career/project/side-project
  modals, the flip-card contact section, and the footer logo grid all
  reflow cleanly with zero horizontal overflow anywhere on the page itself.
  Two real bugs found and fixed:
  - **Done** — The "My preferred stack" diagram's tier boxes (Storage,
    AI/LLMs, Data Science, etc.) had no real minimum width, so on a phone
    they got squeezed narrower than a single tech pill — labels ellipsized
    ("DATA SCIE...") and pills rendered half outside their own box. Gave
    each box a real floor width so every label and pill renders in full;
    the diagram still scrolls horizontally inside its own bordered box on
    phones (unavoidable — it's a wide diagram), but now added a small
    "↔ scroll to see all" hint (phone-only) so that's discoverable instead
    of looking like a cut-off bug.
  - **Done** — The Magic Mirror side-project cartridge (the one project
    without a real screenshot, so it falls back to a plain text label) had
    its "Insert →" corner label hardcoded to white — invisible against that
    cartridge's light cyan label background. Switched it to the same dark
    neutral tone the fallback label's own title/subtitle already use.
  Nothing else needed changing — false leads chased down and ruled out
  along the way: an icon strip that looked like a stray overlay near the
  hero stats turned out to be Astro's own dev-mode toolbar (won't exist in
  the production build); overlapping "click me to rotate" text on the
  Klarna card was the screenshot catching the card's reveal animation
  mid-flip, not a real rendering bug; the Watch/iPhone demo mockups being
  different sizes and bottom-aligned is the intended design, not a layout
  bug.

-------

- **Done** — Hero's three stat numbers ("4-6", "2x", "70%") are a size
  smaller on phones specifically, with tighter margins/gaps around them —
  they were eating a lot of the fold for supporting detail, not the
  headline. Desktop is untouched (still text-3xl at the old spacing).
- **Done** — "My preferred stack" diagram no longer shows on phones at all
  (hidden below the sm breakpoint) — it's a nice-to-have, and even widened
  it needs more room than a phone gives it. Desktop unaffected.
- **Done** — Career-stop rows (Klarna, IBM Consulting, etc.): the period
  now always breaks onto its own line under the org name on phones,
  instead of wrapping wherever it ran out of horizontal room — which had
  been splitting mid-date ("· 2018" / "– 2020" on separate lines) for the
  longer org names. Desktop keeps org and period on one line as before.
- **Done** — "What's next" → "What's next?" and dropped the ", ideally at
  a fintech or scale-up" qualifier from the blurb beside it.
- **Done** — That same "What's next" card now scrolls to Get In Touch
  (`#contact`) instead of opening an email client directly — the actual
  email is still one click away from there.

-------

- **Done** — "Associated with" logo strip (worked at / clients / studied
  at) is 2/3 its previous size on phones — it's a low-priority credibility
  strip, not worth a big chunk of a phone screen. Unchanged at sm+.
- **Done** — Added a small "Download my CV" link under the Get In Touch
  intro, next to the two contact cards.
- **Done** — Every dialog (Technologies, career stops, side-project
  cartridges, and the nested project modal inside a career stop) now goes
  full-screen on phones — edge to edge, no rounded corners or margin —
  instead of a centered card with wasted space around it. Unchanged at
  sm+ (still the centered card).
- **Done** — The project modal that opens from inside a career-stop modal
  (a "popup inside a popup") now has a "← Back" button in its top-left
  corner alongside the usual ✕ — since the career-stop modal is still open
  underneath it, closing this one reads better labeled as going back to it.
- **Found and fixed along the way**: going full-screen on phones exposed a
  pre-existing bug in the two-phone "handoff" demo mockup (used by the
  Klarna Referral Program project) — its fixed-width phone frames needed
  432px and had nowhere to go on a phone, spilling off both edges. Narrower
  frames and a tighter gap below the sm breakpoint fix it; unchanged at
  sm+.

-------

- **Fixed a regression from the full-screen-dialog round**: closing the
  Technologies "View more" pop-up stopped actually hiding it — the ✕ (and
  Escape) still marked the dialog closed, but it stayed fully visible and
  laid out on screen. Cause: making that one dialog `flex` (for the
  sticky-header layout) put a `display` utility directly on the `<dialog>`
  element, which outranks the browser's own `dialog { display: none }`
  rule once `open` is removed — none of the other pop-ups were touched
  this way, so this was isolated to the Technologies one. Fixed by scoping
  it to Tailwind's `open:flex` variant instead, which only sets `display`
  while the dialog is actually open. Verified open + close by hand and via
  script on all four dialog types; only Technologies was ever affected.

-------

- **Done** — Fixed a text jump on page load: the Google Fonts link used
  `display=swap`, so the page first painted in a fallback font and then
  visibly reflowed to Inter/Space Grotesk once they downloaded (different
  metrics between the two). Switched to `display=optional`, which gives
  the webfont a short window before first paint and otherwise keeps the
  fallback for that visit — no later swap, no jump.
- **Done** — Tightened the gap between the "Associated with" logos on
  phones (`gap-x-5`, was `gap-x-10`) — shrinking the logos themselves in
  the last round left them looking scattered rather than grouped at the
  old spacing. Unchanged at sm+.
- **Done** — Reverted two of the four full-screen-on-phone dialogs back to
  their previous compact centered-card style, per feedback that the
  full-screen treatment should only apply to pop-ups that actually feel
  crowded: the Technologies "View more" list and the side-project
  cartridge modal are back to a centered card with native scrolling.
  Career-stop and nested-project modals stay full-screen.

-------

- **Done** — A career stop with a long project list (e.g. six at IBM
  Consulting) now shows only the first 3 by default, with a "View more"
  toggle for the rest — same pattern already used for the career timeline
  and side-projects grid.
- **Done** — Clicking a technology pill no longer opens its docs page; it
  toggles a pinned/highlighted state instead, so someone can mark several
  technologies they're interested in while browsing. Pinned pills also
  stay visible when searching the "All Technologies" list, instead of
  disappearing the moment the search term doesn't match them.
- **Done** — Fixed a flicker on the home section text on a clean-cache
  reload: the Google Fonts stylesheet was a plain render-blocking
  `<link>`, so on a cold cache the whole page sat blank until it
  round-tripped to Google's server, then painted everything at once.
  Switched to the standard `media="print"` + `onload` non-blocking-style
  trick (with a `<noscript>` fallback) so the page paints immediately in
  the fallback font instead of waiting on it.
- **Done** — Capped the career-stop and nested-project dialogs at
  `max-h-[85vh]` on sm+ (matching the Technologies dialog) — without it, a
  stop with enough content grew right up to the browser's own
  near-100%-of-viewport default on laptop widths too, reading as another
  full-screen popup instead of a compact scrolling card.
- **Done** — "Download my CV" in Get In Touch now uses the same accent
  blue as "View more" on Technologies, instead of a muted underline style.
- **Done** — The "Focus this era" legend now only lists categories that
  are actually present that era, matching the bar chart above it (which
  already filtered out 0% categories) — e.g. Klarna no longer lists Data
  Science, Sales, or Social when none of them are part of that stop.
- **Done** — Clicking anything that jumps to "Get in touch" (or any other
  in-page section link) no longer leaves `#contact` (or `#projects`, etc.)
  in the address bar — a site-wide script intercepts same-page anchor
  clicks and scrolls to the target itself instead of letting the browser
  navigate to the hash. A direct link with a hash already in the URL
  still jumps there correctly on load.
- **Done** — Enlarged the Klarna logo inside its career-timeline chip
  (`logoScale` 1.15 → 1.45) — it was reading noticeably smaller than the
  IBM and Instituto de Telecomunicações logos in the same-sized chips.

-------

- **Done.** Fixed the Clifton Strengths hover popup getting stuck open.
  Clicking the strength badge (or the nested "See certificate" link) left
  it focused, and clicking elsewhere doesn't blur a focused element in
  Chrome/Safari, so the popup stayed open until something else stole
  focus. It now blurs on mouseleave, so hovering away always closes it,
  and Tab-based keyboard access is untouched.
- **Done.** The Technologies search now accepts a bulk-pasted list, split
  on commas or semicolons (e.g. "react, node, aws"), each term matched
  independently. It also understands common alternate spellings via a
  small alias table, so "ReactJS", "React.js" and "React JS" all find
  "React".
- **Done.** Wired in the real screen recording for the Klarna Referral
  Program's "friend redeems" phone. Along the way, fixed two bugs in the
  handoff animation: the friend's phase wasn't held on screen long enough
  for the actual clip length, and the video's own playback clock ran
  independently of when the animation revealed it, so it looked like it
  started mid-clip and could restart while still visible. The whole
  handoff timeline is now driven by one scheduler that resets and starts
  a step's video at the exact instant it becomes visible.

-------

- **Done.** Full sweep for hardcoded values that should live in data
  instead, at your request. Fixed:
  - The profile photo path was a literal string repeated in three places
    (Hero, both Contact cards) plus the social-share image, with no way
    to use a different photo per spot. Each of the three now has its own
    `photo` field in site.json (all pointing at the same file today), so
    any of them can be swapped independently.
  - The world-map city markers were keyed by a hand-maintained coordinate
    table matched to site.json by name, so adding a new city there
    without also adding its pixel position would crash the page.
    Pre-plotted Madrid, Barcelona, London and Edinburgh (fitted from real
    coordinates against the two live pins), and a city without a match
    now just gets skipped instead of crashing.
  - The Technologies search categories and the "Worked at / Clients /
    Studied at" groups were both hardcoded lists that had to match
    site.json's category values exactly, or a new category would silently
    vanish from the page. Both now fall back to auto-generating a group
    for any category they don't already know about.
  - The trophy vs. medal icon on career honors was decided by testing
    whether the label contained the word "champion". Replaced with an
    explicit `type: "trophy"` field on the honor itself.
  - A tech pill's icon-contrast check duplicated the surface color from
    global.css as a hand-copied hex string, which could silently drift if
    the theme's color ever changed. It now reads the real value straight
    out of global.css at build time.
  - The Klarna Referral Program's phone-to-phone handoff animation was
    hardcoded to exactly one shape (phone 1, bubble, phone 2, phone 1
    again). Rewrote `PhoneMockup` around an ordered `steps` array instead:
    each step just says which phone it's on, its video/caption, how long
    to hold it, and whether the message bubble should travel into it, so
    any sequence (more steps, different phone order, more than one bubble
    hop) works from data alone.