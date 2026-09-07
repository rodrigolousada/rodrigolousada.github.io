# Launch checklist

What's left before `redesign` is ready to merge into `master` and go live.
Split into what only Rodrigo can supply (content/decisions) and the
technical steps to actually flip the switch. See [HANDOVER.md](./HANDOVER.md)
for how the site is put together.

This list is kept in sync with the "Blocked" / "Optional polish" sections
at the top of `Backlog.md` — that's the more detailed, always-current
version if this drifts; update both when something here gets resolved.

## Content Rodrigo needs to provide

- [ ] **Profile picture.** `hero.photo` / `contact.personal.photo`
      (`public/img/profile.jpg`) is still the original photo from the old
      site. A replacement was mentioned as coming but hasn't landed in
      `public/img/` yet.
- [ ] **CourtKit demo footage.** The Apple Watch + iPhone frames are built
      and ready (`sideProjects[0].deviceDemo` in `site.json`, rendered by
      `DeviceDuo.astro`) but currently show "Add Apple Watch recording" /
      "Add iPhone recording" placeholders. Send screen recordings of each
      and they drop straight into `deviceDemo.watch.video` /
      `deviceDemo.phone.video`.
- [ ] **CourtKit App Store link.** Once the app is actually live, add the
      link as `appDownloadUrl` on the CourtKit entry — a QR code to
      download it is then generated automatically, no other change needed.
- [ ] **Magic Mirror photo/video.** Currently rendering two placeholder
      slots (`demoPlaceholders: ["Photo", "Video"]` on the Magic Mirror
      side project) — send a real photo of the finished mirror and/or a
      short clip of the dashboard running.
- [ ] **Hero stats, reworded around impact.** Currently 3 generic stats
      (4–6 devs led, 2x FTE savings, 70% workload cut). The plan is to
      reframe them as "what I can do for you" — e.g. total FTEs saved
      across every automation project, and revenue/cost impact brought in
      — but that needs the real numbers from you (CV, or from memory).
- [ ] **Grades on the "Studied at" balloons.** The organization balloon
      already supports an optional grade line under the program (e.g.
      "Grade: 17/20") but no real numbers are filled in yet, for any of:
      IST, TU Berlin, Humboldt-Universität, AESE Business School, Externato
      S. José. Send whichever ones you actually want shown — leave any
      institution out and it just won't display a grade line.
- [ ] **Full copy review pass.** Every visible string on the site lives in
      `src/data/site.json` — worth a straight read-through (bios,
      taglines, project descriptions, testimonial quotes) to confirm
      wording, seniority framing, and that nothing's stale, since most of
      it was drafted from context an agent had rather than dictated by you
      line by line.
- [x] **Klarna work — more current/detailed info.** Done: the Klarna
      career-stop entry now lists your 5 actual current projects
      (Referrals & Deals, Cursor Data Modeler, Data Modeling Platform,
      Data Modeling Chatbot, Klarna Knowledge Management Platform) with
      real tech and achievements, replacing the old 2-project draft.

## Optional polish (not blocking — say the word on any of these)

- [ ] **AESE program blurb** could mention the specific pitch you gave
      there (proposal to Luís Simões on reducing truck drivers'
      loneliness) instead of the generic "Executive education programme".
- [ ] **LinkedIn certifications/skills.** LinkedIn lists ~35 certifications
      and a long skills list; only a subset is reflected on the site.
      Flag any specific ones worth surfacing (AWS Cloud Practitioner was
      floated as a candidate) rather than trying to list all 35.

## Technical steps before merging `redesign` → `master`

- [ ] Run `npx astro check` and `npm run build` clean on `redesign` (no
      errors) as a final sanity check.
- [ ] Do a full scroll-through in a real browser (not just headless
      screenshots) at mobile, tablet, and laptop widths — dialogs, flip
      cards, nav anchor jumps, and the Technologies search/pin state all
      involve JS behavior that's worth eyeballing live once more.
- [ ] **Flip GitHub repo Settings → Pages → Source from "Deploy from a
      branch" to "GitHub Actions"** before merging. It's currently left on
      the old branch-deploy setting from the previous Jekyll-style site;
      the `deploy.yml` workflow (withastro/action + actions/deploy-pages)
      is already committed and only triggers on pushes to `master`, but it
      won't actually serve anything until the Pages source is switched.
- [ ] Merge `redesign` into `master`, push, and confirm the Actions run
      deploys successfully and `rodrigolousada.me` (see `public/CNAME`)
      resolves to the new site.
- [ ] After confirming the new site is live and correct, clean up stray
      local `worktree-agent-*` branches left over from earlier
      parallel-agent sessions (check each for unmerged work first, then
      delete).

## Known non-blocking gaps (carried from `AGENTS.md`)

These were flagged during the original build and don't need to hold up
launch, but are worth remembering if they come up:

- No standalone Montepio pelican icon mark was found online — the current
  wordmark logo is used as-is even in small chip contexts.
- LinkedIn's full profile content wasn't scraped (authenticated, no access)
  — anything from there beyond what's already in `site.json` needs to be
  pasted in directly by Rodrigo.
