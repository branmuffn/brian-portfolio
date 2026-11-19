"use client";

import { useEffect, useRef, useState } from "react";
import { openTimelineEntry } from "./timeline-item";
import { glowOnLanding } from "./land-glow";

type NavItem = { href: string; label: string; short?: string };

// Which section is in view. Works without JS too (plain anchor links).
function useActive(items: NavItem[]) {
  const [active, setActive] = useState<string>(items[0]?.href ?? "");

  useEffect(() => {
    const sections = items
      .map((i) => document.querySelector<HTMLElement>(i.href))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return active;
}

// Phones and tablets: a bar fixed to the bottom of the screen, like an app's tab bar.
export function BottomNav({ items }: { items: NavItem[] }) {
  const active = useActive(items);
  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-navy/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden land:hidden"
    >
      <ul className="mx-auto flex max-w-xl justify-between px-2">
        {items.map((n) => {
          const on = active === n.href;
          return (
            <li key={n.href}>
              <a
                href={n.href}
                aria-current={on ? "location" : undefined}
                className={`relative block px-1.5 py-4 font-mono text-[13px] font-semibold uppercase tracking-wide sm:text-sm ${on ? "text-accent" : "text-muted hover:text-ink"}`}
              >
                <span aria-hidden className={`absolute inset-x-1.5 top-0 h-0.5 rounded-full bg-accent transition-opacity ${on ? "opacity-100" : "opacity-0"}`} />
                {n.short ?? n.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export type SubItem = { id: string; label: string };

// Which project / job is in view: the last one whose top has passed a line near the top of the screen. Desktop project
// cards sit two to a row, so a row counts as its left card. A tick that was just clicked stays current until the
// visitor scrolls on their own (wheel, keys, touch, click), even if it's the right-hand card or a short job entry.
function useCurrentSub(subs: Record<string, SubItem[]>) {
  const [current, setCurrent] = useState<string | null>(null);
  const picked = useRef<string | null>(null);

  useEffect(() => {
    const ids = Object.values(subs).flat().map((s) => s.id);
    let frame = 0;
    const update = () => {
      frame = 0;
      if (picked.current) return setCurrent(picked.current);
      const line = Math.min(window.innerHeight * 0.3, 200);
      let best: string | null = null;
      let bestTop = -Infinity;
      for (const id of ids) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line && top > bestTop + 2) [best, bestTop] = [id, top];
      }
      setCurrent(best);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const release = () => {
      if (!picked.current) return;
      picked.current = null;
      schedule();
    };
    const releaseOn = ["wheel", "keydown", "touchmove", "pointerdown"] as const;
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    releaseOn.forEach((e) => window.addEventListener(e, release, { passive: true }));
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      releaseOn.forEach((e) => window.removeEventListener(e, release));
      cancelAnimationFrame(frame);
    };
  }, [subs]);

  const pick = (id: string) => {
    picked.current = id;
    setCurrent(id);
  };
  return [current, pick] as const;
}

// Desktop sidebar: highlights the section currently in view. Beside the current section, a small column of ticks, one
// per project / job (Brian picked V2, 2026-11-15); the one in view is the long amber tick. A tick's name shows only on
// hover or keyboard focus, and clicking a tick jumps there. The column floats beside the label, so the menu never moves.
// Pointing at (or tabbing to) another section with ticks shows that section's column instead (Brian, 2026-11-15), so a
// job can be picked straight from the Projects section; leaving the menu brings back the current section's column.
export function SideNav({ items, subs = {} }: { items: NavItem[]; subs?: Record<string, SubItem[]> }) {
  const active = useActive(items);
  const [currentSub, pick] = useCurrentSub(subs);
  const [peek, setPeek] = useState<string | null>(null);
  const shown = peek && subs[peek]?.length ? peek : active;

  // Phones held sideways (Brian, 2026-11-19): press and drag over the menu. Touching a section shows its ticks, sliding
  // over a tick shows its name, and lifting the finger jumps to whatever is under it (like the right-hand rail).
  const drag = useRef<string | null | undefined>(undefined); // undefined = no touch drag
  const eatClick = useRef(false);
  const [dragTick, setDragTick] = useState<string | null>(null);
  const under = (x: number, y: number) =>
    (document.elementFromPoint(x, y) as Element | null)?.closest('nav[aria-label="Sections"] a[href^="#"]')?.getAttribute("href") ?? null;
  const follow = (x: number, y: number) => {
    const href = under(x, y);
    drag.current = href;
    if (href && items.some((i) => i.href === href)) {
      setPeek(href);
      setDragTick(null);
    } else setDragTick(href ? href.slice(1) : null);
  };
  const jump = (href: string) => {
    const id = href.slice(1);
    const isTick = !items.some((i) => i.href === href);
    if (isTick) {
      pick(id);
      openTimelineEntry(id);
      glowOnLanding(id);
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", href);
  };

  return (
    <nav
      aria-label="Sections"
      className="mt-8 hidden lg:block land:col-span-2 land:mt-2 land:block land:touch-none land:select-none [@media(max-height:880px)]:mt-6 [@media(max-height:760px)]:mt-5"
      onPointerDown={(e) => {
        if (e.pointerType !== "touch") return;
        follow(e.clientX, e.clientY);
      }}
      onPointerMove={(e) => {
        if (e.pointerType === "touch" && drag.current !== undefined) follow(e.clientX, e.clientY);
      }}
      onPointerUp={(e) => {
        if (e.pointerType !== "touch" || drag.current === undefined) return;
        const href = drag.current;
        drag.current = undefined;
        setDragTick(null);
        eatClick.current = true;
        setTimeout(() => (eatClick.current = false), 400);
        if (href) jump(href);
      }}
      onPointerCancel={() => {
        drag.current = undefined;
        setDragTick(null);
      }}
      onClickCapture={(e) => {
        if (eatClick.current) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      onMouseLeave={() => setPeek(null)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setPeek(null)}
    >
      <ul className="space-y-1">
        {items.map((item) => {
          const isActive = active === item.href;
          const list = item.href === shown ? subs[item.href] : undefined;
          // Pointed-at section with ticks: its line stays long while the mouse moves over to the ticks (otherwise
          // the line shrinks back and the column slides away from the mouse).
          const peeked = Boolean(list) && !isActive;
          return (
            <li key={item.href} className="flex items-center" onFocus={() => setPeek(item.href)}>
              <a
                href={item.href}
                // Only the name and line switch columns (not the empty row beside them), so moving the mouse slantwise
                // to a far tick of a tall column (Projects) can't switch to the next section on the way.
                onMouseEnter={() => setPeek(item.href)}
                aria-current={isActive ? "location" : undefined}
                className="group flex items-center gap-4 py-2.5 font-mono text-base font-semibold uppercase tracking-[0.16em] [@media(max-height:760px)]:py-1.5 land:py-[3px] land:text-sm"
              >
                <span
                  aria-hidden
                  className={`h-px transition-all duration-300 ease-out motion-reduce:transition-none ${
                    isActive
                      ? "w-20 bg-accent"
                      : peeked
                        ? "w-20 bg-ink"
                        : "w-10 bg-muted group-hover:w-20 group-hover:bg-ink group-focus-visible:w-20"
                  }`}
                />
                <span className={isActive ? "text-accent" : peeked ? "text-ink" : "text-muted group-hover:text-ink"}>{item.label}</span>
              </a>
              {list?.length ? (
                // Zero-height holder: the column is centred on the label and takes no room in the menu.
                // Phones held sideways (land:) show no ticks (Brian 2026-11-19, option A: names were cut off and the
                // right-hand rail already jumps to each project/job).
                <div className="relative ml-5 self-stretch land:hidden">
                  {/* While the mouse is over a tick, only that tick's name shows (not also a keyboard-focused one). */}
                  <ul aria-label={item.label} className="absolute left-0 top-1/2 -translate-y-1/2 [&:hover_a:not(:hover)_.tick-name]:opacity-0">
                    {list.map((s) => {
                      const on = isActive && s.id === currentSub;
                      const touched = s.id === dragTick;
                      return (
                        <li key={s.id}>
                          <a
                            href={`#${s.id}`}
                            onClick={() => {
                              pick(s.id);
                              openTimelineEntry(s.id); // a job: its details open
                              glowOnLanding(s.id); // and the card or job lights up once you're there
                            }}
                            aria-current={on ? "location" : undefined}
                            className="group/t relative flex h-2.5 w-8 items-center px-1.5 outline-none"
                          >
                            <span
                              aria-hidden
                              className={`block h-[3px] rounded-full transition-[width,background-color] duration-200 motion-reduce:transition-none ${
                                on || touched
                                  ? `w-5 ${touched ? "bg-ink" : "bg-accent"}`
                                  : "w-3 bg-white/40 group-hover/t:w-5 group-hover/t:bg-ink group-focus-visible/t:w-5 group-focus-visible/t:bg-ink"
                              }`}
                            />
                            <span
                              // A navy backing so the name stays readable where it reaches the page content on
                              // narrow laptops (1024px wide).
                              className={`tick-name pointer-events-none absolute left-full top-1/2 z-10 -translate-y-1/2 whitespace-nowrap rounded bg-navy px-1 text-[15px] leading-5 group-hover/t:opacity-100 group-focus-visible/t:opacity-100 ${touched ? "opacity-100" : "opacity-0"} ${
                                on ? "text-accent" : "text-ink"
                              }`}
                            >
                              {s.label}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
