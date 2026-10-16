# How to pick this project back up

A plain-language guide to stopping, restarting, and finding everything for your portfolio site.

---

## The places your project lives

| Part | What it is | Link / location | When you'll need it |
|---|---|---|---|
| **This folder** | All the code, plus your private `resume.pdf` and `about-me.md` | `~/fc/brian-portfolio` on this Mac | Every time. Always start Claude here. |
| **GitHub** | Public copy of the code. Pushing to it publishes the site | https://github.com/branmuffn/brian-portfolio | Rarely. Claude pushes for you. |
| **Vercel** | Hosts the live website | https://brian-portfolio-amber.vercel.app (dashboard: https://vercel.com, project `brian-portfolio`) | Only if a deploy fails or you add a custom domain. |

How they connect: **code in this folder → pushed to GitHub → Vercel builds and publishes it automatically.**

The portfolio has no database. **Supabase** is only used by the Splitwise clone
(`~/fc/splitwise-clone`, see its own `RESUME.md`).

---

## Your other linked projects

| Project | Live | Code | Keep in mind |
|---|---|---|---|
| Splitwise clone | https://splitwise-clone-three-theta.vercel.app | https://github.com/branmuffn/splitwise-clone (local: `~/fc/splitwise-clone`) | Supabase pauses free projects after ~1 week of no use. Before a demo, open the site; if it errors, go to supabase.com and click **Restore project**. |
| Pledge dashboard | https://klrju2rpjcgffbf5yktsqp.streamlit.app/ | https://github.com/branmuffn/fc-dashboard | Streamlit apps sleep after ~12 hours. Open it before a demo and click the wake-up button. |
| OnBoard | (no permanent live link) | https://github.com/thanizmy/OnBoard (team repo, **private**) | Visitors can't open the GitHub link yet. Decide: remove it, or ask Thanh to make the repo public. |

---

## Stopping

1. Type `/exit` in Claude Code (or press `Ctrl+C` twice).
2. That's it. The website keeps running on its own, even with your laptop off.

---

## Starting again

1. Open **Terminal**.
2. Run:
   ```
   cd ~/fc/brian-portfolio
   claude
   ```
   Starting in this folder makes Claude automatically read `CLAUDE.md`, the project's instructions
   and history.
3. A good first message:
   > Read CLAUDE.md and RESUME.md. Then [describe what you want to change].

**Other ways to restart:**
- `claude --continue`: reopens your most recent conversation where it left off.
- `claude --resume`: pick from a list of past conversations.
- A fresh `claude` session is usually best; `CLAUDE.md` has the full context.

---

## Check you're still connected

Run these in your own Terminal (or in Claude Code with `!` in front):

| Check | Command | Good result |
|---|---|---|
| GitHub | `gh auth status` | "Logged in to github.com account branmuffn" |
| Vercel | `npx vercel whoami` | Your Vercel username |

If either isn't logged in, run `gh auth login` or `npx vercel login` **in your own Terminal** and
follow the prompts. You never need to give Claude a password.

---

## Common tasks and what to say

| You want to… | Tell Claude… |
|---|---|
| Add or edit a project | "Update the [project] card: [details]. Facts only, no em dashes. Commit and push." |
| Change your intro or headline | "Rewrite the hero intro to say [idea]. Show me before pushing." |
| Add a new job or degree | "Add [role, org, dates] to the timeline." |
| Check the live site | "Check the live site and tell me if anything is broken." |
| Undo a bad change | "The last change broke [thing]. Roll it back." |

Everything visible on the page is in **`app/content.ts`**. You can also edit that file yourself,
then run `git push` to publish.

---

## If something goes wrong

| Problem | What to do |
|---|---|
| Claude can't push to GitHub | Run `gh auth status` in Terminal. If logged out, run `gh auth login`. |
| Claude can't deploy / Vercel asks you to log in | Run `npx vercel login` in Terminal. |
| The site shows errors after a change | Tell Claude what you saw. Vercel keeps old versions and can roll back. |
| `gh` says "permission denied" on `~/.config` | In your own Terminal: `sudo chown -R briantea:staff ~/.config` |

---

## Working on a different computer

1. Install Node.js, the GitHub CLI (`brew install gh`), and Claude Code.
2. In Terminal:
   ```
   gh auth login
   git clone https://github.com/branmuffn/brian-portfolio.git
   cd brian-portfolio
   npm install
   npx vercel login
   npx vercel link        # pick the brian-portfolio project
   ```
3. Copy `resume.pdf` and `about-me.md` over yourself if you want Claude to use them. They are
   **not** on GitHub on purpose.

---

## Never share

- `resume.pdf` and `about-me.md` (phone number and private notes). They're kept off GitHub and Vercel.
- Your passwords or login codes. Claude never needs them.
