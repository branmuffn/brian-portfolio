import Image from "next/image";
import headshot from "../public/headshot.jpg";
import { profile, projects, howIBuild, timeline, skills, type Project } from "./content";
import { SideNav } from "./side-nav";
import { ZoomImage } from "./zoom-image";
import { ClickableCard } from "./clickable-card";

const nav = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#how-i-build", label: "How I build" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function Icon({ name }: { name: "mail" | "github" | "linkedin" | "file" }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", "aria-hidden": true, className: "shrink-0" };
  if (name === "github")
    return (
      <svg {...common} fill="currentColor">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    );
  if (name === "linkedin")
    return (
      <svg {...common} fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-1.8 3.4-1.8 3.63 0 4.24 2.2 4.24 5.07v6.23h-4v-5.5c0-1.31-.02-3-1.83-3-1.84 0-2.12 1.43-2.12 2.9v5.6h-3.55v-11Z" />
      </svg>
    );
  if (name === "mail")
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    );
  return (
    <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </svg>
  );
}

// Section heading: a small numbered label plus a real heading. The heading links to its own
// section (shareable URL like /#projects); a "#" appears on hover.
function SectionHeading({ id, index, title }: { id: string; index: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-accent">{index}</p>
      <h2 id={`${id}-title`} className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        <a href={`#${id}`} className="group/h relative -my-1 inline-flex items-baseline gap-3 py-1 hover:text-accent">
          {title}
          <span aria-hidden className="text-2xl text-muted opacity-0 transition-opacity group-hover/h:opacity-100">
            #
          </span>
        </a>
      </h2>
    </div>
  );
}

function Chips({ list }: { list: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {list.map((t) => (
        <li key={t} className="rounded-full bg-accent/10 px-3 py-1 font-mono text-sm font-medium text-accent">
          {t}
        </li>
      ))}
    </ul>
  );
}

// "Built with" describes the project, not a skills claim.
function BuiltWith({ list }: { list: string[] }) {
  return (
    <p className="mt-4 text-sm text-muted">
      <span className="font-semibold text-body">Built with:</span> {list.join(", ")}
    </p>
  );
}

function Badges({ p }: { p: Project }) {
  if (!p.status) return null;
  return (
    <span className="rounded border border-accent/60 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-accent">
      {p.status}
    </span>
  );
}

// Project title links to the project itself (first link) when there is one.
function ProjectTitle({ p, size }: { p: Project; size: "lg" | "md" }) {
  const cls = size === "lg" ? "text-2xl" : "text-xl";
  const main = p.links?.[0];
  return (
    <h3 className={`${cls} font-bold leading-snug tracking-tight text-ink`}>
      {main ? (
        <a href={main.href} {...ext} className="relative -my-2 inline-block py-2 hover:text-accent">
          {p.title} <span aria-hidden className="text-lg text-accent">↗</span>
        </a>
      ) : (
        p.title
      )}
    </h3>
  );
}

function Links({ p }: { p: Project }) {
  if (!p.links) return null;
  return (
    // py-3 -my-3: 44px-tall tap areas without moving the layout; gap-y-6 keeps them from overlapping when wrapped.
    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-6">
      {p.links.map((l) => (
        <span key={l.href} className="inline-flex flex-wrap items-baseline gap-x-1.5">
          <a
            href={l.href}
            {...ext}
            className="relative -my-3 inline-flex items-center gap-1 py-3 font-semibold text-ink underline decoration-accent/50 decoration-2 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            {l.label} <span aria-hidden>↗</span>
          </a>
          {l.note && <span className="text-sm text-muted">({l.note})</span>}
        </span>
      ))}
    </div>
  );
}

// Bullets, role and team sit behind a native disclosure, so cards stay short.
function MoreDetails({ p }: { p: Project }) {
  if (!p.details && !p.role && !p.team) return null;
  return (
    <details className="group/d mt-4">
      <summary className="relative -my-2 inline-flex cursor-pointer list-none items-center gap-2 py-2 font-semibold text-ink hover:text-accent [&::-webkit-details-marker]:hidden">
        <span className="group-open/d:hidden">More details</span>
        <span className="hidden group-open/d:inline">Fewer details</span>
        <span aria-hidden className="transition-transform group-open/d:rotate-180">▾</span>
      </summary>
      {p.details && (
        <ul className="mt-3 space-y-2 leading-relaxed">
          {p.details.map((d) => (
            <li key={d} className="relative pl-5">
              <span aria-hidden className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rotate-45 bg-accent" />
              {d}
            </li>
          ))}
        </ul>
      )}
      {(p.role || p.team) && (
        <dl className="mt-4 space-y-1">
          {p.role && (
            <div>
              <dt className="inline font-semibold text-ink">My role: </dt>
              <dd className="inline">{p.role}</dd>
            </div>
          )}
          {p.team && (
            <div>
              <dt className="inline font-semibold text-ink">Team: </dt>
              <dd className="inline">{p.team}</dd>
            </div>
          )}
        </dl>
      )}
    </details>
  );
}

const hasDetails = (p: Project) => Boolean(p.details || p.role || p.team);

function FeaturedCard({ p }: { p: Project }) {
  return (
    <ClickableCard className={`rounded-2xl border border-line bg-navy-raised/60 p-5 transition duration-200 ease-out hover:border-accent/40 sm:p-7 motion-safe:lg:hover:-translate-y-1 lg:hover:shadow-[0_16px_32px_-16px_rgba(0,0,0,0.6)] ${hasDetails(p) ? "cursor-pointer" : ""}`}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <p className="font-mono text-sm uppercase tracking-wider text-muted">{p.context}</p>
        <Badges p={p} />
      </div>
      <div className="mt-3">
        <ProjectTitle p={p} size="lg" />
      </div>
      {p.award && <p className="mt-1 font-medium text-accent">{p.award}</p>}

      {p.image && (
        <ZoomImage {...p.image} sizes="(min-width: 1024px) 40rem, 100vw" className="mt-5" />
      )}

      {p.metric && (
        <div className="mt-5 flex items-baseline gap-4 border-l-2 border-accent pl-4">
          <p className="whitespace-nowrap text-4xl font-bold tracking-tight text-ink">{p.metric.value}</p>
          <p className="leading-snug text-muted">{p.metric.label}</p>
        </div>
      )}

      {p.summary && <p className="mt-5 text-lg leading-relaxed">{p.summary}</p>}
      {p.tools && <BuiltWith list={p.tools} />}
      <Links p={p} />
      <MoreDetails p={p} />
    </ClickableCard>
  );
}

// "More projects": full-width rows, small screenshot on the left (stacks on phones).
function CompactCard({ p }: { p: Project }) {
  return (
    <ClickableCard
      className={`grid gap-5 rounded-xl border border-line p-5 transition duration-200 ease-out hover:border-accent/40 hover:bg-navy-raised/60 ${p.image ? "sm:grid-cols-[13rem_1fr]" : ""} ${hasDetails(p) ? "cursor-pointer" : ""}`}
    >
      {p.image && <ZoomImage {...p.image} sizes="(min-width: 640px) 13rem, 100vw" className="self-start" />}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className="font-mono text-xs uppercase tracking-wider text-muted">{p.context}</p>
          <Badges p={p} />
        </div>
        <div className="mt-2">
          <ProjectTitle p={p} size="md" />
        </div>
        {p.summary && <p className="mt-2 leading-relaxed">{p.summary}</p>}
        {p.tools && <BuiltWith list={p.tools} />}
        <Links p={p} />
        <MoreDetails p={p} />
      </div>
    </ClickableCard>
  );
}

export default function Home() {
  return (
    <div className="relative">
      {/* Soft glow behind the sidebar, purely decorative */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(60rem_40rem_at_0%_0%,rgba(242,180,90,0.08),transparent_60%)]"
      />
      <a
        href="#content"
        className="sr-only z-50 rounded bg-accent px-4 py-2 font-semibold text-navy focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:flex lg:justify-between lg:gap-16 lg:px-16">
        {/* Left column: sticky on desktop */}
        <header className="pt-16 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[42%] lg:flex-col lg:justify-between lg:py-20">
          <div>
            <Image
              src={headshot}
              alt="Headshot of Brian Tea"
              priority
              sizes="112px"
              className="h-28 w-28 rounded-full object-cover object-top ring-2 ring-accent/70 ring-offset-4 ring-offset-navy"
            />
            <h1 className="mt-8 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{profile.name}</h1>
            <p className="mt-3 text-lg font-medium text-accent sm:text-xl">{profile.tagline}</p>
            <p className="mt-4 max-w-sm text-lg leading-relaxed">{profile.headline}</p>
            <p className="mt-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
              <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-accent" />
              {profile.location}
            </p>
            <SideNav items={nav} />
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-6 font-medium lg:mt-12" aria-label="Links">
            <li>
              <a href={`mailto:${profile.email}`} className="relative -my-3 flex items-center gap-2 py-3 text-muted transition-colors hover:text-accent">
                <Icon name="mail" /> Email
              </a>
            </li>
            <li>
              <a href={profile.linkedin} {...ext} className="relative -my-3 flex items-center gap-2 py-3 text-muted transition-colors hover:text-accent">
                <Icon name="linkedin" /> LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.github} {...ext} className="relative -my-3 flex items-center gap-2 py-3 text-muted transition-colors hover:text-accent">
                <Icon name="github" /> GitHub
              </a>
            </li>
            <li>
              <a href={profile.resume} {...ext} className="relative -my-3 flex items-center gap-2 py-3 text-muted transition-colors hover:text-accent">
                <Icon name="file" /> Resume (PDF)
              </a>
            </li>
          </ul>
        </header>

        {/* Right column: scrolls */}
        <main id="content" className="pt-6 lg:w-[54%] lg:py-20">
          {/* Phone and tablet: sticky section links (desktop uses the sidebar nav) */}
          <nav
            aria-label="Sections"
            className="sticky top-0 z-30 -mx-6 mb-6 border-b border-line bg-navy/90 backdrop-blur sm:-mx-10 lg:hidden"
          >
            <ul className="flex gap-1 overflow-x-auto px-4 sm:px-8">
              {nav.map((n) => (
                <li key={n.href} className="shrink-0">
                  <a href={n.href} className="block px-2 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-muted hover:text-accent">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <section id="about" aria-labelledby="about-title" className="scroll-mt-16 pb-24 lg:scroll-mt-20">
            <SectionHeading id="about" index="01" title="About" />
            <div className="space-y-5 text-lg leading-relaxed sm:text-xl">
              {profile.intro.map((s) => (
                <p key={s}>{s}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={profile.resume}
                {...ext}
                className="rounded-md border border-accent px-5 py-3 font-semibold text-accent transition-colors hover:bg-accent/10"
              >
                Resume (PDF)
              </a>
              <a href="#projects" className="rounded-md px-5 py-3 font-semibold text-ink transition-colors hover:text-accent">
                See my projects ↓
              </a>
            </div>
          </section>

          <section id="projects" aria-labelledby="projects-title" className="scroll-mt-16 border-t border-line pb-24 pt-20 lg:scroll-mt-20">
            <SectionHeading id="projects" index="02" title="Projects" />
            <div className="space-y-8">
              {projects
                .filter((p) => p.featured)
                .map((p) => (
                  <FeaturedCard key={p.title} p={p} />
                ))}
            </div>
            <h3 className="mt-16 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-ink">More projects</h3>
            <div className="mt-6 space-y-5">
              {projects
                .filter((p) => !p.featured)
                .map((p) => (
                  <CompactCard key={p.title} p={p} />
                ))}
            </div>
          </section>

          <section id="how-i-build" aria-labelledby="how-i-build-title" className="scroll-mt-16 lg:scroll-mt-20">
            <div className="-mx-6 bg-navy-raised px-6 py-20 sm:-mx-10 sm:px-10 lg:mx-0 lg:rounded-2xl lg:px-8">
              <SectionHeading id="how-i-build" index="03" title="How I build with AI" />
              <ol className="grid gap-5 sm:grid-cols-3">
                {howIBuild.map((h, i) => (
                  <li key={h.title} className="rounded-xl border border-line bg-navy p-5">
                    <span aria-hidden className="font-mono text-2xl font-bold text-accent">
                      0{i + 1}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold leading-snug text-ink">{h.title}</h3>
                    <p className="mt-2 leading-relaxed">{h.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section id="experience" aria-labelledby="experience-title" className="scroll-mt-16 pb-24 pt-24 lg:scroll-mt-20">
            <SectionHeading id="experience" index="04" title="Experience & education" />
            <ol className="relative space-y-10 border-l border-line pl-8">
              {timeline.map((t) => (
                <li key={t.org + t.dates} className="relative">
                  <span
                    aria-hidden
                    className={`absolute -left-[2.4rem] top-1.5 h-3 w-3 rounded-full ring-4 ring-navy ${t.kind === "work" ? "bg-accent" : "bg-ink"}`}
                  />
                  <p className="font-mono text-sm uppercase tracking-wider text-muted">
                    {t.dates} · {t.kind === "work" ? "Work" : "Education"}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold leading-snug text-ink">{t.org}</h3>
                  <p className="mt-1">
                    {t.title}
                    {t.place && <span className="text-muted"> · {t.place}</span>}
                  </p>
                  {t.points && (
                    <ul className="mt-3 space-y-2 leading-relaxed">
                      {t.points.map((pt) => (
                        <li key={pt} className="relative pl-5">
                          <span aria-hidden className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rotate-45 bg-accent" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>

            <h3 className="mt-20 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-ink">Skills</h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {Object.entries(skills).map(([group, list]) => (
                <div key={group} className="rounded-xl border border-line p-5">
                  <h4 className="mb-3 font-semibold text-ink">{group}</h4>
                  <Chips list={list} />
                </div>
              ))}
            </div>
          </section>

          <section id="contact" aria-labelledby="contact-title" className="scroll-mt-16 pb-16 lg:scroll-mt-20">
            <div className="rounded-2xl border border-accent/40 bg-[linear-gradient(135deg,rgba(242,180,90,0.10),rgba(17,28,51,0.9)_55%)] p-6 sm:p-10">
              <SectionHeading id="contact" index="05" title="Let's talk" />
              <p className="max-w-xl text-lg leading-relaxed">
                Email is the fastest way to reach me. My{" "}
                <a
                  href={profile.resume}
                  {...ext}
                  className="relative -my-3 inline-block py-3 font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
                >
                  resume (PDF)
                </a>{" "}
                has the details.
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="relative mt-8 -mb-1.5 inline-block break-all py-1.5 text-2xl font-bold tracking-tight text-ink transition-colors hover:text-accent sm:text-3xl"
              >
                {profile.email}
              </a>
              <div className="mt-6 flex flex-col gap-6 font-medium sm:flex-row sm:gap-8">
                <a href={profile.linkedin} {...ext} className="relative -my-3 flex items-center gap-2 py-3 text-muted hover:text-accent">
                  <Icon name="linkedin" /> {profile.linkedinLabel} <span aria-hidden>↗</span>
                </a>
                <a href={profile.github} {...ext} className="relative -my-3 flex items-center gap-2 py-3 text-muted hover:text-accent">
                  <Icon name="github" /> {profile.githubLabel} <span aria-hidden>↗</span>
                </a>
              </div>
            </div>
          </section>

          <footer className="border-t border-line pb-16 pt-8 text-sm text-muted">
            Built by Brian Tea with Next.js ·{" "}
            <a href="https://github.com/branmuffn/brian-portfolio" {...ext} className="relative -my-3 inline-block py-3 hover:text-accent">
              Source on GitHub ↗
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
}
