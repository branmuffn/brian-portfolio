"use client";

import { useEffect, useRef, useState } from "react";

export type RailItem = { id: string; label: string; sub?: boolean };

// Phones only (Brian picked B, 2026-11-15): a scroll-spy table-of-contents rail. A thin column of ticks on the right
// edge, one per section (longer) and per project / job (shorter); the one you're reading turns amber. Tapping it opens
// an outline to jump to any of them. The bottom bar stays; desktop and tablets don't show it (the desktop sidebar
// already highlights the current section).
export function ScrollRail({ items }: { items: RailItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const dialog = useRef<HTMLDialogElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  // Scroll-spy: the current item is the last one whose top has passed a line near the top of the screen (a quarter of
  // the height, at most 150px). Phone project cards are short, so a lower line would light up the next card instead.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = Math.min(window.innerHeight * 0.25, 150);
      let current = items[0]?.id ?? "";
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= line) current = item.id;
      }
      // At the very bottom the last section may never reach the line.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = items.at(-1)?.id ?? current;
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  const close = () => dialog.current?.close();
  const jump = (id: string) => {
    close();
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="sm:hidden print:hidden">
      <button
        ref={button}
        type="button"
        aria-label="Page outline"
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
        // A wide, tall tap target; the ticks themselves sit 5px from the edge.
        className="fixed right-0 top-[30%] z-20 flex flex-col items-end gap-[7px] py-2 pl-5 pr-[5px]"
        data-scroll-rail
      >
        {items.map((item) => {
          const on = item.id === active;
          return (
            <span
              key={item.id}
              aria-hidden
              className={`block h-[3px] rounded-full transition-[width,background-color] duration-200 motion-reduce:transition-none ${
                on ? "w-4 bg-accent" : item.sub ? "w-2 bg-white/30" : "w-3 bg-white/55"
              }`}
            />
          );
        })}
      </button>

      <dialog
        ref={dialog}
        aria-label="Page outline"
        onClose={() => button.current?.focus({ preventScroll: true })}
        // Clicks on the dim area outside the card land on the <dialog> itself: close.
        onClick={(e) => e.target === e.currentTarget && close()}
        className="fixed inset-auto right-2.5 top-[14dvh] m-0 max-h-[72dvh] w-64 overflow-y-auto rounded-2xl border border-white/10 bg-navy-raised p-0 text-ink shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop:bg-black/45"
      >
        <nav aria-label="Page outline" className="p-1.5">
          <ul>
            {items.map((item) => {
              const on = item.id === active;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => jump(item.id)}
                    aria-current={on ? "location" : undefined}
                    className={`flex w-full items-center gap-2.5 rounded-lg py-2 text-left ${on ? "bg-accent/10 text-accent" : item.sub ? "text-body" : "text-ink"} ${
                      item.sub ? "pl-7 pr-3 text-sm" : "px-3 font-semibold"
                    }`}
                  >
                    <span aria-hidden className={`block h-[3px] shrink-0 rounded-full ${item.sub ? "w-2.5" : "w-3.5"} ${on ? "bg-accent" : "bg-white/35"}`} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </dialog>
    </div>
  );
}
