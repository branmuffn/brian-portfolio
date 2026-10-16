# Brian Tea portfolio: project context

@AGENTS.md

Frontier Commons Build Bootcamp, Week 1. A one-page personal portfolio for Brian Tea, P.E.
(technical program manager and analyst; ex-Dow Chemical, TD Bank intern, Georgia Tech M.S. Analytics).

## Where everything lives

| Piece | Where | Notes |
|---|---|---|
| Code | this folder; GitHub `branmuffn/brian-portfolio` (`main`, **public**) | Push to `main` and Vercel deploys production automatically |
| Live site | https://brian-portfolio-amber.vercel.app | Vercel project `branmuffn/brian-portfolio` (linked in `.vercel/`) |
| Page text | `app/content.ts` | Profile, projects, timeline, skills, contact. Edit here first |
| Layout / styles | `app/page.tsx`, `app/globals.css`, `app/layout.tsx` | Accent color token `--color-accent` (#1d4ed8) |
| Headshot | `public/headshot.jpg` (resized 714×1000) | The full-size original `Headshot.jpg` is git- and Vercel-ignored |
| Source facts | `resume.pdf`, `about-me.md` in this folder | **Private: git-ignored and Vercel-ignored. Never commit or deploy them** |

No database, no env vars, no API keys. Supabase belongs to the Splitwise clone, not this site.

## Working rules (the user's preferences)

- **Facts only.** Use only facts from `resume.pdf`, `about-me.md`, or what Brian says in chat. Never
  invent. If something is missing, ask (don't leave visible TODOs on the live site anymore).
- **Never publish private info:** no phone number, no resume PDF, no `about-me.md`. The email
  (briantea716@gmail.com) and LinkedIn are intentionally public.
- **Voice:** concise, direct, structured, builder framing. **No em dashes** in site copy.
- **Design:** white background, one accent color, strong typography, no stock photos, must work at
  phone width (~390px).
- **Stack:** Next.js (App Router) + TypeScript + Tailwind only. No libraries beyond what
  create-next-app installs.
- **Ask before acting** on anything outward-facing (new repos, making things public, deleting).
  The user likes all questions batched up front, then one pass of changes.
- The user isn't deeply technical: explain status plainly (done / what to check / what's next).
- For logins (GitHub, Vercel), the user runs the command in their own Terminal. Never ask for
  passwords or use `sudo`.

## Commands

```bash
npm run dev                  # local dev at http://localhost:3000
npm run build && npm run lint
npx tsc --noEmit
git push                     # deploys to production (Vercel Git integration)
npx vercel --prod --yes      # manual deploy fallback
```

Verify a deploy: `curl -s "https://brian-portfolio-amber.vercel.app/?v=$RANDOM" | grep -c "<text>"`
(the query string avoids a cached copy).
Phone-width screenshot: headless Chrome won't go below ~500px wide, so load the page in a 390px
`<iframe>` inside a local HTML file and screenshot that.

## Gotchas learned the hard way

- **Next.js 16**: read `node_modules/next/dist/docs/` before using unfamiliar APIs (see AGENTS.md).
- **macOS is case-insensitive:** an ignore rule `Headshot.jpg` also matched `public/headshot.jpg`
  and broke a deploy. Anchor root-only rules with a leading slash (`/Headshot.jpg`).
- `~/.config` was owned by root, so `gh auth login` couldn't save. The user fixed this with
  `sudo chown` in their own Terminal.
- `create-next-app` refuses non-empty folders: scaffold in a subfolder, then move it up.

## Current site content (as of 2026-10-16)

Hero (headshot, name, headline, 2-sentence intro) → Projects → Experience & education timeline +
skills → Contact → footer with "Source on GitHub".

Projects, in order:
1. **OnBoard** (featured): Gloo AI Hackathon 2026, Best of the Ministry Track, $20,000 team prize,
   ongoing. Card shows the 5-of-7 tester stat, Brian's role, the team, the stack, and links.
   Use **7 survey responses**, not "8 testers" (the user chose the survey numbers).
2. **TD Bank synthetic identity fraud analysis** (featured): ~0.25% of accounts, ~7% of loss dollars.
3. **Splitwise clone** (Live): https://splitwise-clone-three-theta.vercel.app, GitHub
   `branmuffn/splitwise-clone`. Code is in `~/fc/splitwise-clone` (has its own CLAUDE.md).
4. **Pledge reconciliation dashboard**: Streamlit https://klrju2rpjcgffbf5yktsqp.streamlit.app/,
   GitHub `branmuffn/fc-dashboard`.
5. **Cloud-based AI vendor risk assessment** (Azure, from resume; no link).
6. **Self-hosted automation and local AI** (n8n, Docker, Ollama, MLX, llama.cpp; no link).

Decisions: `about-me.md` contains three AI-written profiles; the third ("aspiring entrepreneur")
contradicts the resume and is ignored. The degree is "M.S. Analytics" (the resume's education section).

## Open items

- **OnBoard GitHub link is broken for visitors.** `thanizmy/OnBoard` (team repo, linked on the card)
  and the fork `branmuffn/OnBoard` are both **private** (404 when logged out). The user hasn't
  decided yet: remove the link, or ask Thanh to make the team repo public. A private fork can't
  be made public on its own.
- Optional: add the "two installable apps (worker + partner)" and "three privacy levels" details
  to the OnBoard card (both in the OnBoard README).
- Optional: custom domain, social link-preview image, n8n repo links if they exist.
- The original `Headshot.jpg` exists in early git history (no location data). Purging it would
  need a force push; only do that if the user asks.
