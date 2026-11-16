"use client";

import { useEffect, useRef, useState } from "react";
import { openTimelineEntry } from "./timeline-item";
import { glowOnLanding } from "./land-glow";

export type RailItem = { id: string; label: string; sub?: boolean };

// Press and drag (Brian, 2026-11-15): pressing the rail opens the outline at once. Slide the finger up or down and the
// row at that height lights up (only the height counts, so the finger can stay on the rail); let go to jump there.
// Letting go above or below the list closes it without moving. A quick tap leaves the outline open to pick from.
const HOLD_MS = 400; // a press at least this long counts as a hold: letting go jumps even without moving
const MOVE_PX = 8; // moving more than this also counts as a drag
const EDGE_PX = 36; // small screens: holding this close to the list's top or bottom edge scrolls it

function jumpTo(dialog: HTMLDialogElement | null, id: string) {
  dialog?.close();
  openTimelineEntry(id); // a job: its details open (they unfold below its top, so the scroll target doesn't move)
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  if (id === "top") window.scrollTo({ top: 0, behavior }); // the name row: the very top of the page, above About
  else document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
  glowOnLanding(id); // a project card or job lights up once you're there
}

// Phones only (Brian picked B, 2026-11-15): a scroll-spy table-of-contents rail. A thin column of ticks on the right
// edge, one per section (longer) and per project / job (shorter); the one you're reading turns amber. The bottom bar
// stays; desktop and tablets don't show it (the desktop sidebar already highlights the current section).
export function ScrollRail({ items }: { items: RailItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [pointed, setPointed] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const byTouch = useRef(false); // opened with a finger: on close, don't put focus back on the rail (it drew an amber box)

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

  // Press and drag. Touch events keep going to the rail for the whole press, even once the outline covers it.
  useEffect(() => {
    const btn = button.current;
    const dlg = dialog.current;
    if (!btn || !dlg) return;
    let drag: { y0: number; t0: number; y: number; moved: boolean; index: number | null; frame: number } | null = null;

    const rowAt = (y: number) => {
      const rows = dlg.querySelectorAll("li");
      for (let i = 0; i < rows.length; i++) {
        const r = rows[i].getBoundingClientRect();
        if (y >= r.top && y < r.bottom) return i;
      }
      return null;
    };
    const point = () => {
      if (!drag) return;
      const i = rowAt(drag.y);
      if (i === drag.index) return;
      drag.index = i;
      setPointed(i);
      if (i !== null) navigator.vibrate?.(5); // a light tick per row on Android; ignored elsewhere
    };
    const edgeScroll = () => {
      if (!drag) return;
      const r = dlg.getBoundingClientRect();
      const dy = drag.y < r.top + EDGE_PX ? drag.y - (r.top + EDGE_PX) : drag.y > r.bottom - EDGE_PX ? drag.y - (r.bottom - EDGE_PX) : 0;
      if (dy && dlg.scrollHeight > dlg.clientHeight) {
        dlg.scrollTop += Math.max(-14, Math.min(14, dy / 3));
        point();
      }
      drag.frame = requestAnimationFrame(edgeScroll);
    };
    const stop = () => {
      if (drag) cancelAnimationFrame(drag.frame);
      drag = null;
      setPointed(null);
    };

    const start = (e: TouchEvent) => {
      if (e.touches.length > 1) return;
      e.preventDefault(); // no page scroll, no long-press menu, and no click afterwards (the outline is already open)
      const y = e.touches[0].clientY;
      if (!dlg.open) {
        byTouch.current = true;
        dlg.showModal();
        dlg.focus({ preventScroll: true }); // focus the card, not the first row (which would show a focus ring)
      }
      drag = { y0: y, t0: performance.now(), y, moved: false, index: null, frame: 0 };
      point();
      drag.frame = requestAnimationFrame(edgeScroll);
    };
    const move = (e: TouchEvent) => {
      if (!drag) return;
      drag.y = e.touches[0].clientY;
      if (Math.abs(drag.y - drag.y0) > MOVE_PX) drag.moved = true;
      point();
    };
    const end = () => {
      if (!drag) return;
      const { moved, t0, index } = drag;
      stop();
      if (!moved && performance.now() - t0 < HOLD_MS) return; // a quick tap: leave the outline open
      if (index !== null && items[index]) jumpTo(dlg, items[index].id);
      else dlg.close(); // let go above or below the list: close without moving
    };

    btn.addEventListener("touchstart", start, { passive: false });
    btn.addEventListener("touchmove", move, { passive: false });
    btn.addEventListener("touchend", end);
    btn.addEventListener("touchcancel", stop);
    return () => {
      stop();
      btn.removeEventListener("touchstart", start);
      btn.removeEventListener("touchmove", move);
      btn.removeEventListener("touchend", end);
      btn.removeEventListener("touchcancel", stop);
    };
  }, [items]);

  const close = () => dialog.current?.close();

  return (
    <div className="sm:hidden print:hidden">
      <button
        ref={button}
        type="button"
        aria-label="Page outline"
        aria-haspopup="dialog"
        // Keyboard and mouse; touches are handled above.
        onClick={() => {
          byTouch.current = false;
          if (!dialog.current?.open) dialog.current?.showModal();
        }}
        // A wide, tall tap target; the ticks themselves sit 5px from the edge. touch-none: a drag here moves the
        // highlight, not the page (like the A-Z strip in a phone's contacts).
        className="fixed right-0 top-[30%] z-20 flex touch-none select-none flex-col items-end gap-[7px] py-2 pl-5 pr-[5px] [-webkit-touch-callout:none]"
        data-scroll-rail
      >
        {items.map((item) => {
          const on = item.id === active;
          return (
            <span
              key={item.id}
              aria-hidden
              // Sub-ticks (projects, jobs) short, thin and faint; sections longer and brighter (Brian picked S1, 2026-11-15).
              className={`block rounded-full transition-[width,background-color] duration-200 motion-reduce:transition-none ${
                on ? "h-[3px] w-4 bg-accent" : item.sub ? "h-[2px] w-1.5 bg-white/[0.22]" : "h-[3px] w-3.5 bg-white/[0.62]"
              }`}
            />
          );
        })}
      </button>

      <dialog
        ref={dialog}
        tabIndex={-1}
        aria-label="Page outline"
        // Keyboard: focus goes back to the rail. Finger: nowhere, so no focus box is left on the rail.
        onClose={() => (byTouch.current ? button.current?.blur() : button.current?.focus({ preventScroll: true }))}
        // Clicks on the dim area outside the card land on the <dialog> itself: close.
        onClick={(e) => e.target === e.currentTarget && close()}
        // Centred between the top of the screen and the bottom bar, as tall as it needs (compact rows, ~420px), so the
        // whole list fits on phones without scrolling and stays near the thumb.
        className="fixed inset-auto bottom-[calc(64px_+_env(safe-area-inset-bottom))] right-2.5 top-2.5 mx-0 my-auto h-fit max-h-[calc(100dvh_-_74px_-_env(safe-area-inset-bottom))] w-56 overflow-y-auto overscroll-contain rounded-2xl border outline-none! border-white/10 bg-navy-raised p-0 text-ink shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop:bg-black/45"
      >
        <nav aria-label="Page outline" className="p-1.5">
          <ul>
            {items.map((item, i) => {
              const on = item.id === active;
              const here = i === pointed; // under the finger while dragging
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => jumpTo(dialog.current, item.id)}
                    aria-current={on ? "location" : undefined}
                    // Compact rows (Brian, 2026-11-15): the whole list sits near the middle, within thumb reach.
                    className={`flex w-full items-center gap-2.5 rounded-lg text-left leading-5 ${
                      here ? "bg-accent text-navy" : on ? "bg-accent/10 text-accent" : item.sub ? "text-muted" : "text-ink"
                    } ${item.sub ? "py-[3px] pl-7 pr-3 text-[13px]" : "px-3 py-[5px] text-[15px] font-semibold"}`}
                  >
                    <span
                      aria-hidden
                      className={`block shrink-0 rounded-full ${item.sub ? "h-[2px] w-2" : "h-[3px] w-3.5"} ${here ? "bg-navy" : on ? "bg-accent" : "bg-white/35"}`}
                    />
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
