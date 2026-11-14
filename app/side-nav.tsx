"use client";

import { useEffect, useState } from "react";

type NavItem = { href: string; label: string };

// Highlights the section currently in view. Works without JS too (plain anchor links).
export function SideNav({ items }: { items: NavItem[] }) {
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

  return (
    <nav aria-label="Sections" className="mt-14 hidden lg:block [@media(max-height:880px)]:mt-8">
      <ul className="space-y-1">
        {items.map((item) => {
          const isActive = active === item.href;
          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className="group flex items-center gap-4 py-2.5 font-mono text-base font-semibold uppercase tracking-[0.16em]"
              >
                <span
                  aria-hidden
                  className={`h-px transition-all duration-300 ease-out motion-reduce:transition-none ${
                    isActive ? "w-20 bg-accent" : "w-10 bg-muted group-hover:w-20 group-hover:bg-ink group-focus-visible:w-20"
                  }`}
                />
                <span className={isActive ? "text-accent" : "text-muted group-hover:text-ink"}>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
