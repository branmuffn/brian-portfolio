"use client";

import { useId, useState } from "react";
import type { TimelineItem as Entry } from "./content";

// One job or school on the Experience timeline (Brian, 2026-11-14): date, organization and title show; the bullets fold
// behind a ▸ on every screen size (click or tap the entry or the ▸ to open). Brian is trying "folded everywhere" first.
export function TimelineItem({ t }: { t: Entry }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const points = t.points ?? [];
  const toggle = () => setOpen((o) => !o);
  return (
    <li className="relative">
      <span
        aria-hidden
        className={`absolute -left-[2.4rem] top-1.5 h-3 w-3 rounded-full ring-4 ring-navy ${t.kind === "work" ? "bg-accent" : "bg-ink"}`}
      />
      <div onClick={points.length ? toggle : undefined} className={points.length ? "cursor-pointer" : undefined}>
        <p className="font-mono text-sm uppercase tracking-wider text-muted">
          {t.dates} · {t.kind === "work" ? "Work" : "Education"}
        </p>
        <h3 className="mt-1 flex items-start justify-between gap-3 text-xl font-semibold leading-snug text-ink">
          {t.org}
          {points.length > 0 && (
            <button
              type="button"
              aria-expanded={open}
              aria-controls={id}
              aria-label={`${open ? "Hide" : "Show"} details: ${t.org}`}
              onClick={(e) => {
                e.stopPropagation();
                toggle();
              }}
              className="-my-2.5 -mr-2 grid h-11 w-11 shrink-0 place-items-center text-lg text-accent"
            >
              <span aria-hidden className={`transition-transform motion-reduce:transition-none ${open ? "rotate-90" : ""}`}>
                ▸
              </span>
            </button>
          )}
        </h3>
        <p className="mt-1">
          {t.title}
          {t.place && <span className="text-muted"> · {t.place}</span>}
        </p>
      </div>
      {points.length > 0 && (
        <ul id={id} className={`mt-3 space-y-2 leading-relaxed ${open ? "" : "hidden"}`}>
          {points.map((pt) => (
            <li key={pt} className="relative pl-5">
              <span aria-hidden className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rotate-45 bg-accent" />
              {pt}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
