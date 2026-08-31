## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project handover — personal site redesign

This is Rodrigo's personal site, rebuilt from an old Bootstrap template into
Astro + Tailwind v4, positioned for Engineering Manager / Tech Lead job
hunting. All work happens on the `redesign` branch — `master` is the old
live site, untouched until `redesign` is deliberately merged.

**Architecture**: every piece of visible copy lives in `src/data/site.json`
— components render it, they don't hardcode text. `src/data/icons.ts` holds
small hand-written SVG paths (contact links, star badge); `src/data/techIcons.ts`
holds brand-colored logo paths for the Technologies section, sourced from
Simple Icons (CC0). Design is dark-theme-only, tokens in
`src/styles/global.css`'s `@theme` block. Expandable content (career stops,
projects, side-project cartridges) uses native `<dialog>` + `showModal()` —
no JS modal library.

### Lessons learned running this as a multi-agent session

1. **Verify rendered output, don't trust code review alone.** Use real
   headless Chrome, not `qlmanage` (macOS Quick Look) — it doesn't execute
   JS or Tailwind's CDN build and gives false-looking renders.
   `claude-in-chrome` MCP tools (navigate/computer/find) are the easiest
   path for interactive checks (clicking things open, verifying modals).
   For a quick static screenshot:
   `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome --headless
   --disable-gpu --screenshot=out.png --window-size=W,H URL` — but avoid
   window heights above ~5500px, Chrome's headless screenshot mode garbles
   very tall pages (duplicated/misplaced content near the top). Use normal
   heights and scroll, or a CSS negative-margin-top trick with a
   `<base href="http://localhost:PORT/">` tag if you need one specific
   section rendered without a live browser.
2. **`file://` opening of `dist/index.html` breaks absolute asset paths**
   (`/img/...`, `/_astro/*.css` resolve against the filesystem root). Always
   use `astro preview` over HTTP, or inject a `<base>` tag into a saved copy.
3. **Parallel agents in git worktrees are powerful but fragile under this
   session's rate/session limits.** Several agents launched via
   `Agent({subagent_type: "fork", isolation: "worktree"})` lost their
   worktrees entirely across a session-limit reset (the worktree directories
   were gone, `ListAgents` no longer listed them, and they were unreachable
   — not resumable). Net effect: hours of orchestration produced almost no
   merged work. **If you spawn parallel agents, check back on them soon and
   often** rather than assuming they'll survive a long unattended stretch;
   don't treat a launched agent as "in flight" indefinitely.
4. **When an agent worktree goes stale/orphaned**, before deleting it: `git
   -C <worktree> log --oneline redesign..HEAD` and `git status --short` to
   see if there's committed or uncommitted work worth harvesting (`cp` the
   file, or `git diff > patch; git apply patch` elsewhere) before `git
   worktree remove --force` it.
5. **Every agent prompt should include a worktree-safety check**: confirm
   `pwd` is under `.claude/worktrees/` before editing, and that recent
   `git log` matches the assigned scope — self-correct with `git reset
   --hard redesign` if not. One agent broke isolation and edited the main
   working directory directly; recovery required `git stash push -u`,
   merging the properly-isolated branch cleanly, then `git stash pop` to
   reconcile (conflicts only where both sides touched the same file).
6. **Destructive git actions (force branch delete, etc.) get blocked by the
   permission classifier even when correct** (e.g. cleaning up a branch
   whose worktree was already removed). Don't fight it — `git worktree
   remove --force` on the worktree itself is usually enough; leftover local
   branch pointers are harmless clutter, not a blocker.
7. **For real biographical/company facts, verify with `WebFetch`/`WebSearch`
   rather than guessing** — several news article titles/dates and multiple
   real logo assets (Generali, AESE Business School, Externato S. José)
   were sourced this way in one pass rather than fabricated. Simple Icons
   (`raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/<slug>.svg`)
   is a good source for brand logos, but several trademarked corporate
   marks (IBM, AWS, Docker, OpenAI) were removed from that project after
   takedown requests — for those, render a text-only badge instead of
   guessing at an unofficial mark.
8. **Known open gaps** (ask Rodrigo, don't fabricate): CourtKit needs a
   one-line description of what it does before it can be added as a side
   project; the IT/Master Thesis project needs its actual URL; no
   standalone Montepio pelican icon mark was found online (current wordmark
   used as-is in the small chip contexts); LinkedIn content wasn't checked
   (authenticated site, no scraping access — Rodrigo would need to paste
   relevant text directly).
9. **Before merging to `master`** (going live on GitHub Pages), flip the
   repo's Settings → Pages → Source to "GitHub Actions" — it's currently
   set to deploy from a branch (leftover from the old Jekyll-style site).
   A `deploy.yml` workflow (withastro/action + actions/deploy-pages) is
   already committed and only triggers on pushes to `master`.
10. **`astro dev --background` / `astro preview --background` daemons
    outlive the session that started them.** Astro has no `strictPort`
    config — if 4321 is taken it silently starts on 4322, 4323, etc.
    Found two orphaned preview daemons still bound to random ports days
    after the sessions that launched them had ended, which is why the
    dev URL kept moving on refresh. Always run `astro dev stop` /
    `astro preview stop` when done with a server, and if a URL that used
    to work stops responding, check `ps aux | grep astro` /
    `lsof -i :4321` for a stray process before assuming something broke.
