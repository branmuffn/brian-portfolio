import Image from "next/image";
import headshot from "../public/headshot.jpg";
import { profile, projects, howIBuild, timeline, skills, type Project } from "./content";
import { SideNav } from "./side-nav";

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

function SectionLabel({ id, title }: { id: string; title: string }) {
  // On phones the label sticks to the top while its section scrolls; on desktop it is a quiet eyebrow.
  return (
    <div className="sticky top-0 z-20 -mx-6 mb-6 bg-navy/90 px-6 py-4 backdrop-blur sm:-mx-10 sm:px-10 lg:static lg:mx-0 lg:mb-8 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
      <h2 id={`${id}-title`} className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-ink">
        <span className="text-accent">/</span> {title}
      </h2>
    </div>
  );
}

function Tools({ list }: { list: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tools">
      {list.map((t) => (
        <li key={t} className="rounded-full bg-accent/10 px-3 py-1 font-mono text-xs font-medium text-accent">
          {t}
        </li>
      ))}
    </ul>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="group relative grid gap-4 rounded-lg p-0 transition-colors duration-200 sm:grid-cols-[9rem_1fr] sm:gap-8 lg:-mx-5 lg:p-5 lg:hover:bg-navy-raised lg:hover:shadow-[inset_0_1px_0_0_rgba(232,237,247,0.06)]">
      <div className="pt-1">
        <p className="font-mono text-xs uppercase leading-relaxed tracking-wider text-muted">{p.context}</p>
        {(p.featured || p.status) && (
          <div className="mt-2 flex flex-wrap gap-2">
            {p.featured && (
              <span className="rounded bg-accent px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-navy">
                Featured
              </span>
            )}
            {p.status && (
              <span className="rounded border border-accent/60 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-accent">
                {p.status}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="min-w-0">
        <h3 className="text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-accent">
          {p.title}
        </h3>
        {p.award && <p className="mt-1 text-sm font-medium text-accent">{p.award}</p>}

        {p.metric && (
          <div className="mt-4 flex items-baseline gap-4 border-l-2 border-accent pl-4">
            <p className="whitespace-nowrap text-3xl font-bold tracking-tight text-ink">{p.metric.value}</p>
            <p className="text-sm leading-snug text-muted">{p.metric.label}</p>
          </div>
        )}

        {p.summary && <p className="mt-4 leading-relaxed">{p.summary}</p>}
        {p.details && (
          <ul className="mt-3 space-y-2 text-sm leading-relaxed">
            {p.details.map((d) => (
              <li key={d} className="relative pl-5">
                <span aria-hidden className="absolute left-0 top-[0.55em] h-1.5 w-1.5 rotate-45 bg-accent" />
                {d}
              </li>
            ))}
          </ul>
        )}

        {(p.role || p.team) && (
          <dl className="mt-4 space-y-1 text-sm">
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

        {p.links && (
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {p.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                {...ext}
                className="inline-flex items-center gap-1 text-sm font-semibold text-ink underline decoration-accent/50 decoration-2 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                {l.label} <span aria-hidden>↗</span>
              </a>
            ))}
          </div>
        )}

        {p.tools && <Tools list={p.tools} />}
      </div>
    </article>
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
            <p className="mt-4 max-w-sm leading-relaxed">{profile.headline}</p>
            <p className="mt-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
              <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-accent" />
              {profile.location}
            </p>
            <SideNav items={nav} />
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium lg:mt-12" aria-label="Links">
            <li>
              <a href={`mailto:${profile.email}`} className="flex items-center gap-2 text-muted transition-colors hover:text-accent">
                <Icon name="mail" /> Email
              </a>
            </li>
            <li>
              <a href={profile.linkedin} {...ext} className="flex items-center gap-2 text-muted transition-colors hover:text-accent">
                <Icon name="linkedin" /> LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.github} {...ext} className="flex items-center gap-2 text-muted transition-colors hover:text-accent">
                <Icon name="github" /> GitHub
              </a>
            </li>
            <li>
              <a href={profile.resume} {...ext} className="flex items-center gap-2 text-muted transition-colors hover:text-accent">
                <Icon name="file" /> Resume (PDF)
              </a>
            </li>
          </ul>
        </header>

        {/* Right column: scrolls */}
        <main id="content" className="pt-16 lg:w-[54%] lg:py-20">
          <section id="about" aria-labelledby="about-title" className="scroll-mt-16 pb-20 lg:scroll-mt-20">
            <SectionLabel id="about" title="About" />
            <div className="space-y-4 text-lg leading-relaxed">
              {profile.intro.map((s) => (
                <p key={s}>{s}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={profile.resume}
                {...ext}
                className="rounded-md border border-accent px-5 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent/10"
              >
                Resume (PDF)
              </a>
              <a
                href="#contact"
                className="rounded-md px-5 py-3 text-sm font-semibold text-ink transition-colors hover:text-accent"
              >
                Get in touch →
              </a>
            </div>
          </section>

          <section id="projects" aria-labelledby="projects-title" className="scroll-mt-16 pb-20 lg:scroll-mt-20">
            <SectionLabel id="projects" title="Projects" />
            <div className="space-y-14 lg:space-y-6">
              {projects.map((p) => (
                <ProjectCard key={p.title} p={p} />
              ))}
            </div>
          </section>

          <section id="how-i-build" aria-labelledby="how-i-build-title" className="scroll-mt-16 pb-20 lg:scroll-mt-20">
            <SectionLabel id="how-i-build" title="How I build with AI" />
            <ol className="space-y-8">
              {howIBuild.map((h, i) => (
                <li key={h.title} className="grid grid-cols-[2.5rem_1fr] gap-2">
                  <span aria-hidden className="font-mono text-sm text-accent">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{h.title}</h3>
                    <p className="mt-1 leading-relaxed">{h.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="experience" aria-labelledby="experience-title" className="scroll-mt-16 pb-20 lg:scroll-mt-20">
            <SectionLabel id="experience" title="Experience & education" />
            <ol className="space-y-10">
              {timeline.map((t) => (
                <li key={t.org + t.dates} className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-8">
                  <p className="pt-1 font-mono text-xs uppercase tracking-wider text-muted">{t.dates}</p>
                  <div>
                    <h3 className="font-semibold leading-snug text-ink">
                      {t.org}
                      <span className="ml-2 align-middle text-[11px] font-semibold uppercase tracking-wider text-accent">
                        {t.kind === "work" ? "Work" : "Education"}
                      </span>
                    </h3>
                    <p className="mt-1 text-sm">
                      {t.title}
                      {t.place && <span className="text-muted"> · {t.place}</span>}
                    </p>
                    {t.points && (
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                        {t.points.map((pt) => (
                          <li key={pt} className="relative pl-5">
                            <span aria-hidden className="absolute left-0 top-[0.55em] h-1.5 w-1.5 rotate-45 bg-accent" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-14 space-y-8">
              {Object.entries(skills).map(([group, list]) => (
                <div key={group} className="sm:grid sm:grid-cols-[9rem_1fr] sm:gap-8">
                  <h3 className="pt-1 font-mono text-xs uppercase tracking-wider text-muted">{group}</h3>
                  <Tools list={list} />
                </div>
              ))}
            </div>
          </section>

          <section id="contact" aria-labelledby="contact-title" className="scroll-mt-16 pb-16 lg:scroll-mt-20">
            <SectionLabel id="contact" title="Contact" />
            <p className="max-w-xl text-lg leading-relaxed">
              Email is the fastest way to reach me. My{" "}
              <a
                href={profile.resume}
                {...ext}
                className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
              >
                resume (PDF)
              </a>{" "}
              has the details.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-8 inline-block break-all text-2xl font-bold tracking-tight text-ink transition-colors hover:text-accent sm:text-3xl"
            >
              {profile.email}
            </a>
            <div className="mt-6 flex flex-col gap-3 text-sm font-medium sm:flex-row sm:gap-8">
              <a href={profile.linkedin} {...ext} className="flex items-center gap-2 text-muted hover:text-accent">
                <Icon name="linkedin" /> {profile.linkedinLabel} <span aria-hidden>↗</span>
              </a>
              <a href={profile.github} {...ext} className="flex items-center gap-2 text-muted hover:text-accent">
                <Icon name="github" /> {profile.githubLabel} <span aria-hidden>↗</span>
              </a>
            </div>
          </section>

          <footer className="border-t border-line pb-16 pt-8 text-sm text-muted">
            Built by Brian Tea with Next.js ·{" "}
            <a href="https://github.com/branmuffn/brian-portfolio" {...ext} className="hover:text-accent">
              Source on GitHub ↗
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
}
