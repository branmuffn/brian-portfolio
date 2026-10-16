import Image from "next/image";
import headshot from "../public/headshot.jpg";
import { profile, projects, timeline, skills, type Project } from "./content";

const nav = [
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-10 flex items-baseline gap-4 border-b border-neutral-900 pb-3">
      <span className="font-mono text-sm text-accent">{index}</span>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <article
      className={`flex flex-col rounded-xl border p-6 transition-colors hover:border-neutral-900 ${
        p.featured ? "border-neutral-900 md:col-span-2" : "border-neutral-200"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-xs uppercase tracking-wider text-neutral-500">{p.context}</p>
        <div className="flex gap-2">
        {p.featured && (
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-white">
            Featured
          </span>
        )}
        {p.status && (
          <span className="rounded-full border border-accent px-2.5 py-0.5 text-xs font-semibold text-accent">
            {p.status}
          </span>
        )}
        </div>
      </div>
      <h3 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">{p.title}</h3>
      {p.award && <p className="mt-2 font-semibold text-accent">{p.award}</p>}

      <div className={p.featured ? "mt-4 grid gap-6 md:grid-cols-[auto_1fr] md:items-start" : "mt-3"}>
        {p.metric && (
          <div className={p.featured ? "md:border-r md:border-neutral-200 md:pr-6" : "mb-3"}>
            <p className={`font-bold tracking-tight text-accent ${p.featured ? "text-6xl sm:text-7xl" : "text-4xl"}`}>
              {p.metric.value}
            </p>
            <p className="mt-1 max-w-[16rem] text-sm text-neutral-600">{p.metric.label}</p>
          </div>
        )}
        <div>
          {p.summary && <p className="leading-relaxed text-neutral-700">{p.summary}</p>}
          {p.details && (
            <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-neutral-600">
              {p.details.map((d) => (
                <li key={d} className="flex gap-2">
                  <span className="text-accent">→</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {(p.role || p.team) && (
        <dl className="mt-4 space-y-1 text-sm text-neutral-600">
          {p.role && (
            <div>
              <dt className="inline font-semibold text-neutral-900">My role: </dt>
              <dd className="inline">{p.role}</dd>
            </div>
          )}
          {p.team && (
            <div>
              <dt className="inline font-semibold text-neutral-900">Team: </dt>
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
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-accent hover:underline"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      )}

      {p.tools && (
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {p.tools.map((t) => (
            <li key={t} className="rounded bg-neutral-100 px-2 py-0.5 font-mono text-xs text-neutral-700">
              {t}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 sm:px-8">
          <a href="#top" className="font-bold tracking-tight">
            Brian Tea
          </a>
          <ul className="flex gap-4 text-sm font-medium text-neutral-600 sm:gap-7">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-accent">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-5xl px-5 sm:px-8">
        {/* Hero */}
        <section className="grid items-center gap-10 py-16 sm:py-24 md:grid-cols-[1fr_auto] md:gap-14">
          <Image
            src={headshot}
            alt="Headshot of Brian Tea"
            priority
            sizes="(min-width: 768px) 288px, 160px"
            className="aspect-[4/5] w-40 rounded-2xl object-cover object-top md:order-last md:w-72"
          />
          <div>
            <p className="font-mono text-sm text-accent">{profile.location}</p>
            <h1 className="mt-4 text-5xl font-extrabold leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl">
              {profile.name}
            </h1>
            <p className="mt-6 max-w-3xl text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
              {profile.headline}
            </p>
            <div className="mt-6 max-w-2xl space-y-1 text-lg leading-relaxed text-neutral-600">
              {profile.intro.map((s) => (
                <p key={s}>{s}</p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                See my work
              </a>
              <a
                href="#contact"
                className="rounded-full border border-neutral-900 px-6 py-3 text-sm font-semibold hover:bg-neutral-900 hover:text-white"
              >
                Get in touch
              </a>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="scroll-mt-20 py-16">
          <SectionHeading index="01" title="Projects" />
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.title} p={p} />
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="scroll-mt-20 py-16">
          <SectionHeading index="02" title="Experience & education" />
          <ol className="relative border-l-2 border-neutral-200">
            {timeline.map((t) => (
              <li key={t.org + t.dates} className="relative pb-10 pl-6 last:pb-0 sm:pl-8">
                <span
                  className={`absolute -left-[7px] top-1.5 h-3 w-3 rounded-full ${
                    t.kind === "work" ? "bg-accent" : "border-2 border-accent bg-white"
                  }`}
                />
                <div className="grid gap-1 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <p className="font-mono text-xs uppercase tracking-wider text-neutral-500 sm:pt-1">{t.dates}</p>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight">{t.org}</h3>
                    <p className="text-neutral-700">
                      {t.title}
                      {t.place && <span className="text-neutral-500"> · {t.place}</span>}
                    </p>
                    {t.points && (
                      <ul className="mt-2 space-y-1 text-sm leading-relaxed text-neutral-600">
                        {t.points.map((pt) => (
                          <li key={pt} className="flex gap-2">
                            <span className="text-accent">→</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {Object.entries(skills).map(([group, list]) => (
              <div key={group}>
                <h3 className="font-mono text-xs uppercase tracking-wider text-accent">{group}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">{list.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-20 py-16">
          <SectionHeading index="03" title="Contact" />
          <p className="max-w-xl text-lg text-neutral-600">Email is the fastest way to reach me.</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-10">
            <a href={`mailto:${profile.email}`} className="group">
              <span className="block font-mono text-xs uppercase tracking-wider text-neutral-500">Email</span>
              <span className="break-all text-xl font-semibold group-hover:text-accent sm:text-2xl">
                {profile.email}
              </span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="group">
              <span className="block font-mono text-xs uppercase tracking-wider text-neutral-500">LinkedIn</span>
              <span className="text-xl font-semibold group-hover:text-accent sm:text-2xl">
                {profile.linkedinLabel} ↗
              </span>
            </a>
          </div>
        </section>
      </main>

      <footer className="mx-auto w-full max-w-5xl border-t border-neutral-200 px-5 py-8 text-sm text-neutral-500 sm:px-8">
        Built by Brian Tea with Next.js ·{" "}
        <a
          href="https://github.com/branmuffn/brian-portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent"
        >
          Source on GitHub ↗
        </a>
      </footer>
    </>
  );
}
