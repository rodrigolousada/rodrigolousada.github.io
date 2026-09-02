# rodrigolousada.me

Rodrigo Lousada's personal site — Astro + Tailwind v4, statically built and
deployed to GitHub Pages.

## Docs

- [`docs/HANDOVER.md`](docs/HANDOVER.md) — architecture, key decisions, and
  onboarding for anyone (human or agent) picking this project up.
- [`docs/LAUNCH_CHECKLIST.md`](docs/LAUNCH_CHECKLIST.md) — what's still
  missing before this can go live (content Rodrigo needs to supply, plus
  the deployment steps).
- [`docs/quick-view-toggle-plan.md`](docs/quick-view-toggle-plan.md) — a
  not-yet-implemented feature plan for a "5 mins" / "Know more" reading
  mode toggle.
- [`Backlog.md`](Backlog.md) — full round-by-round change history.
- [`AGENTS.md`](AGENTS.md) (aliased as `CLAUDE.md`) — process notes for
  running this repo as an AI agent session.

## Commands

All commands run from the repo root:

| Command             | Action                                        |
| :------------------- | :--------------------------------------------- |
| `npm install`         | Install dependencies                           |
| `astro dev --background` | Start the dev server at `localhost:4321` (background daemon — see `AGENTS.md`) |
| `npm run build`       | Build the production site to `./dist/`         |
| `npm run preview`     | Preview `dist/` locally over HTTP              |
| `npx astro check`     | Type-check the project                         |

## Branches

- `master` — the live site.
- `redesign` — active development branch; not yet merged. See the launch
  checklist above before merging.
