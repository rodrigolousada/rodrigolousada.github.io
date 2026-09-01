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