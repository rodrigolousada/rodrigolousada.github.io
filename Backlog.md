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

- I want you to add a new side project called Magic Mirror, check the public repo on git. I won't provide any code for it, but I will provide a video and picture maybe. This way you can explain that I assemble my own Magic Mirror at home, and then using a Raspberry Pi, an old monitor, and some cheap material, all under 50€. Also, you can add a list of my favorite MMM-Modules, which I will provide later.
- On technologies: My recent skills should be: AWS, Typescript (with zod), React, React Native, Node.js, TailwindCSS, Python, FastAPI, Kafka, RDS, PostegreSQL, Jenkins, Datadog, Docker, SentinelOne, Sentry.
- For my favorite stack, you are not including analytics, monitoring and/or reporting as sections. therefore this is not compelte. I also want to separate data from storage. 