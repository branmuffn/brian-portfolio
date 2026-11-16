import Image from "next/image";
import headshot from "../public/headshot.jpg";
import { profile, projects, timeline, skills, type Project } from "./content";
import { TimelineItem } from "./timeline-item";
import { SideNav, BottomNav } from "./side-nav";
import { Gallery, Features } from "./gallery";
import { ClickableCard } from "./clickable-card";
import { ScrollRail, type RailItem } from "./scroll-rail";

const nav = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

// Anchors for the phone scroll rail: every section, project and job, and the first school ("Education").
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const projectAnchor = (p: Project) => `project-${slug(p.title)}`;
const firstSchool = timeline.find((t) => t.kind === "education");
const timelineAnchor = (t: (typeof timeline)[number]) =>
  t.kind === "work" ? `job-${slug(t.org)}` : t === firstSchool ? "education" : undefined;
const rail: RailItem[] = [
  { id: "top", label: profile.name.replace(/,.*$/, "") }, // "Brian Tea" (no ", P.E.") // the very top (headshot and name), above About (Brian picked T1, 2026-11-15)
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  ...projects.map((p) => ({ id: projectAnchor(p), label: p.navLabel ?? p.title, sub: true })),
  { id: "experience", label: "Experience" },
  ...timeline.filter((t) => t.kind === "work").map((t) => ({ id: timelineAnchor(t)!, label: t.navLabel ?? t.org, sub: true })),
  ...(firstSchool ? [{ id: "education", label: "Education", sub: true }] : []),
  { id: "contact", label: "Contact" },
];

// Desktop sidebar ticks (V2): the rail's projects and jobs, grouped under their section ("#projects", "#experience").
const sideSubs: Record<string, RailItem[]> = {};
let railSection = "";
for (const item of rail) {
  if (!item.sub) railSection = item.id;
  else (sideSubs[`#${railSection}`] ??= []).push(item);
}

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

// "Built with" describes the project, not a skills claim.
function BuiltWith({ list }: { list: string[] }) {
  return (
    <p className="mt-4 text-sm text-muted">
      <span className="font-semibold text-body">Built with:</span> {list.join(", ")}
    </p>
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
          {p.title}{"\u00a0"}<span aria-hidden className="text-lg text-accent">↗</span>
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
    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-6 max-sm:mt-3.5">
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

// What's being worked on now: its own small block with a pulsing dot, so it reads as in progress.
function InProgress({ items }: { items: string[] }) {
  return (
    <div className="mt-4 rounded-lg border border-dashed border-accent/50 bg-accent/5 px-4 py-2.5 max-sm:mt-3">
      {items.map((t) => (
        <p key={t} className="leading-relaxed max-sm:leading-normal">
          <span className="mr-2 inline-flex items-center gap-2 align-[0.05em] font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            <span aria-hidden className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            In progress
          </span>
          {t}
        </p>
      ))}
    </div>
  );
}

function Metric({ p }: { p: Project }) {
  if (!p.metric) return null;
  return (
    <div className="mt-5 flex items-baseline gap-3 border-l-2 border-accent pl-4 max-sm:mt-3.5">
      <p className="whitespace-nowrap text-3xl font-bold max-sm:text-[1.6rem] tracking-tight text-ink">{p.metric.value}</p>
      <p className="leading-snug text-muted">{p.metric.label}</p>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 leading-relaxed">
      {items.map((d) => (
        <li key={d} className="relative pl-5">
          <span aria-hidden className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rotate-45 bg-accent" />
          {d}
        </li>
      ))}
    </ul>
  );
}

function RoleTeam({ p }: { p: Project }) {
  if (!p.role && !p.team) return null;
  return (
    <dl className="mt-5 space-y-2 max-sm:mt-3.5">
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
  );
}

// The panel: big screenshots with a caption each (or phone screenshots side by side) and a short text column.
// Projects without screenshots get a single readable text column. fit() in ClickableCard keeps it on one screen.
function ProjectPanel({ p }: { p: Project }) {
  const visual = Boolean(p.phones || p.shots);
  const first = p.shots?.[0];
  return (
    <div>
      <div className="pr-32 max-sm:pr-14">
        <p className="font-mono text-sm uppercase tracking-wider text-muted max-sm:text-xs">{p.context}</p>
        <div className="mt-1">
          <ProjectTitle p={p} size="lg" />
        </div>
        {p.award && <p className="font-medium text-accent max-sm:mt-0.5 max-sm:text-[0.9rem] max-sm:leading-snug">{p.award}</p>}
      </div>

      <div className={`mt-5 grid gap-x-8 gap-y-5 max-sm:mt-3.5 max-sm:gap-y-3 ${visual ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:group-data-[wide=1]/sheet:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:grid-rows-[auto_1fr] lg:content-start" : "max-w-3xl"}`}>
        {p.phones ? (
          <div className="lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:group-data-[meta=left]/sheet:row-span-1">
            <Features shots={p.phones} />
          </div>
        ) : (
          first && (
            <Gallery
              shots={p.shots!}
              sizes="(min-width: 1024px) 52rem, 100vw"
              captions
              // Desktop: the panel sets --fit-h so everything fits on screen (see ClickableCard's fit()).
              className="lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:max-w-[var(--fit-w)] lg:group-data-[meta=left]/sheet:row-span-1"
              style={{ "--fit-w": `calc(var(--fit-h, 60dvh) * ${first.width / first.height})` } as React.CSSProperties}
            />
          )
        )}
        <div className={`min-w-0 ${visual ? "lg:col-start-2 lg:row-start-1 lg:group-data-[meta=left]/sheet:row-span-2" : ""}`}>
          {p.summary && <p className={visual ? "leading-relaxed max-sm:leading-normal" : "text-lg leading-relaxed max-sm:leading-normal"}>{p.summary}</p>}
          {p.details && <Bullets items={p.details} />}
          <Metric p={p} />
        </div>
        {/* Role, team, tools and links: under the summary, or under the screenshot when the text column runs long (fit()) */}
        <div className={`min-w-0 [&>*:first-child]:mt-0 ${visual ? "lg:col-start-2 lg:row-start-2 lg:group-data-[meta=left]/sheet:col-start-1" : ""}`}>
          <RoleTeam p={p} />
          {p.tools && <BuiltWith list={p.tools} />}
          {p.next && <InProgress items={p.next} />}
          <Links p={p} />
        </div>
      </div>
    </div>
  );
}

// A card without screenshots shows its key number, or what it's built with, in the picture's place.
function Tile({ p }: { p: Project }) {
  return (
    <div className="grid aspect-[16/10] place-items-center rounded-md border border-line bg-[linear-gradient(135deg,#16223d,#0e172b)] p-5 text-center max-sm:p-1">
      {p.metric ? (
        <div>
          <p className="text-5xl font-bold tracking-tight text-accent max-sm:text-[1.7rem]">{p.metric.value}</p>
          <p className="mt-2 text-sm font-medium text-muted max-sm:mt-0.5 max-sm:text-[0.6rem] max-sm:leading-tight">{p.metric.label}</p>
        </div>
      ) : (
        <p className="font-mono text-lg font-semibold uppercase tracking-wider text-accent max-sm:text-[0.6rem] max-sm:leading-tight">{p.tools?.join(" · ")}</p>
      )}
    </div>
  );
}

// Main page: a short card in a two-column grid. Everything else lives in the panel it opens.
// Phones: a compact row instead (small picture beside the title, the one-liner below) to cut scrolling.
function ProjectCard({ p }: { p: Project }) {
  return (
    <ClickableCard
      id={projectAnchor(p)}
      title={p.title}
      panel={<ProjectPanel p={p} />}
      className="scroll-mt-6 flex flex-col rounded-2xl border border-line bg-navy-raised/60 p-4 max-sm:grid max-sm:grid-cols-[8rem_minmax(0,1fr)] max-sm:grid-rows-[auto_1fr_auto] max-sm:gap-x-3.5 max-sm:p-3 transition duration-200 ease-out hover:border-accent/40 motion-safe:lg:hover:-translate-y-0.5 lg:hover:shadow-[0_16px_32px_-16px_rgba(0,0,0,0.6)]"
    >
      <div className="relative max-sm:row-span-2 max-sm:[&_button]:hidden">
        {p.shots ? <Gallery plain shots={p.shots} sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 8rem" /> : <Tile p={p} />}
        {(p.cardBadge ?? p.status) && (
          <span className="pointer-events-none absolute left-2 top-2 z-10 rounded bg-navy/90 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-accent ring-1 ring-accent/60 max-sm:static max-sm:mt-1.5 max-sm:inline-block max-sm:px-1.5 max-sm:text-[0.62rem] max-sm:leading-snug">
            {p.cardBadge ?? p.status}
          </span>
        )}
      </div>
      <p className="mt-3 font-mono text-xs uppercase tracking-wider text-muted max-sm:mt-0 max-sm:text-[0.68rem]">{p.context}</p>
      <div className="mt-1 max-sm:[&_h3]:text-lg">
        <ProjectTitle p={p} size="md" />
      </div>
      <p className="mt-1.5 leading-relaxed max-sm:col-span-2 max-sm:mt-2.5 max-sm:text-[0.9rem] max-sm:leading-normal">{p.oneLine}</p>
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
      {/* Phones and tablets: section links in a bar at the bottom, within thumb reach (desktop uses the sidebar) */}
      <BottomNav items={nav} />
      {/* Phones only: scroll-spy rail on the right edge; tap it for an outline of every section, project and job */}
      <ScrollRail items={rail} />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:flex lg:justify-between lg:gap-16 lg:px-16">
        {/* Left column: sticky on desktop */}
        <header id="top" className="pt-16 lg:sticky lg:top-0 lg:z-10 lg:flex lg:h-screen lg:w-[42%] lg:flex-col lg:justify-between lg:pb-20 lg:pt-12 lg:[@media(max-height:880px)]:py-10 lg:[@media(max-height:760px)]:py-6">
          <div>
            <Image
              src={headshot}
              alt="Headshot of Brian Tea"
              priority
              sizes="224px"
              className="h-[184px] w-[184px] rounded-full lg:h-[224px] lg:w-[224px] lg:[@media(max-height:880px)]:h-[160px] lg:[@media(max-height:880px)]:w-[160px] lg:[@media(max-height:760px)]:h-[112px] lg:[@media(max-height:760px)]:w-[112px] lg:max-xl:[@media(max-height:740px)]:h-[112px]! lg:max-xl:[@media(max-height:740px)]:w-[112px]! object-cover object-top ring-2 ring-accent/70 ring-offset-4 ring-offset-navy"
            />
            <h1 className="mt-8 text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:max-xl:mt-6 lg:max-xl:text-4xl lg:[@media(max-height:760px)]:mt-5 lg:[@media(max-height:760px)]:text-4xl">{profile.name}</h1>
            <p className="mt-3 text-lg font-medium text-accent sm:text-xl">{profile.tagline}</p>
            <p className="mt-4 max-w-sm text-lg leading-relaxed lg:max-xl:mt-3 lg:max-xl:text-base lg:[@media(max-height:760px)]:mt-2">{profile.headline}</p>
            <p className="mt-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
              <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-accent" />
              {profile.location}
            </p>
            <SideNav items={nav} subs={sideSubs} />
          </div>

          {/* Narrow laptops (1024-1279px wide): tighter so the column fits the window (it ran up to 69px past the bottom), and the
              four links fit one row (Brian picked B, 2026-11-15: "Resume" without "(PDF)", smaller gaps, same text size) */}
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-6 font-medium lg:mt-12 lg:max-xl:mt-8 lg:max-xl:gap-x-[10px] lg:max-xl:text-[15px] lg:[@media(max-height:760px)]:mt-6 lg:max-xl:[@media(max-height:700px)]:mt-3!" aria-label="Links">
            <li>
              <a href={`mailto:${profile.email}`} className="relative -my-3 flex items-center gap-2 py-3 text-muted transition-colors hover:text-accent lg:max-xl:gap-1.5">
                <Icon name="mail" /> Email
              </a>
            </li>
            <li>
              <a href={profile.linkedin} {...ext} className="relative -my-3 flex items-center gap-2 py-3 text-muted transition-colors hover:text-accent lg:max-xl:gap-1.5">
                <Icon name="linkedin" /> LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.github} {...ext} className="relative -my-3 flex items-center gap-2 py-3 text-muted transition-colors hover:text-accent lg:max-xl:gap-1.5">
                <Icon name="github" /> GitHub
              </a>
            </li>
            <li>
              <a href={profile.resume} {...ext} className="relative -my-3 flex items-center gap-2 py-3 text-muted transition-colors hover:text-accent lg:max-xl:gap-1.5">
                <Icon name="file" /> <span>Resume<span className="lg:max-xl:hidden"> (PDF)</span></span>
              </a>
            </li>
          </ul>
        </header>

        {/* Right column: scrolls */}
        <main id="content" className="pb-20 pt-6 lg:w-[54%] lg:py-20">

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
            <div className="grid gap-5 max-sm:gap-3 sm:grid-cols-2">
              {projects.map((p) => (
                <ProjectCard key={p.title} p={p} />
              ))}
            </div>
          </section>

          <section id="experience" aria-labelledby="experience-title" className="scroll-mt-16 border-t border-line pb-24 pt-20 lg:scroll-mt-20">
            <SectionHeading id="experience" index="03" title="Experience & education" />
            <ol className="relative space-y-10 border-l border-line pl-8">
              {timeline.map((t) => (
                <TimelineItem key={t.org + t.dates} t={t} anchor={timelineAnchor(t)} />
              ))}
            </ol>

            <h3 className="mt-20 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-ink">Skills</h3>
            {/* Short text lines instead of tags (Brian, 2026-11-15): same facts, about half a phone screen shorter */}
            <dl className="mt-6 space-y-4 rounded-xl border border-line p-5">
              {Object.entries(skills).map(([group, list]) => (
                <div key={group}>
                  <dt className="font-semibold text-ink">{group}</dt>
                  <dd className="mt-1 leading-relaxed">{list.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="contact" aria-labelledby="contact-title" className="scroll-mt-16 pb-16 lg:scroll-mt-20">
            <div className="rounded-2xl border border-accent/40 bg-[linear-gradient(135deg,rgba(242,180,90,0.10),rgba(17,28,51,0.9)_55%)] p-6 sm:p-10">
              <SectionHeading id="contact" index="04" title="Let's talk" />
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
