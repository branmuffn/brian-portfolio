"use client";

import { useEffect, useRef, type ReactNode } from "react";

// A project card. Clicking anywhere on it (outside its links), or its "View details" button,
// opens a panel with the whole project on one screen. The panel grows out of the card and
// shrinks back into it on close. Esc, the Close button, or a click outside the panel closes it.
//
// No scrolling inside the panel on desktop: fit() shrinks the screenshot (via --fit-h) until the
// whole panel fits the window. It runs on open and on every resize, so longer text can't bring the
// scrollbar back. Phones and tablets get a full-height sheet that scrolls, as apps do.
export function ClickableCard({
  className,
  title,
  panel,
  children,
}: {
  className: string;
  title: string;
  panel?: ReactNode;
  children: ReactNode;
}) {
  const card = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const closing = useRef(false);

  const calm = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const fit = () => {
    const el = sheet.current;
    if (!el) return;
    el.style.removeProperty("--fit-h");
    el.style.zoom = "";
    if (window.innerWidth < 1024) return;
    const over = () => el.scrollHeight > el.clientHeight + 1;
    const setH = (h: number) => el.style.setProperty("--fit-h", `${h}px`);
    const keep = Math.max(260, Math.round(window.innerHeight * 0.42)); // don't shrink the screenshot below this at first
    // Shrink the screenshot until the panel fits (or hits `floor`); returns the height reached.
    const shrink = (meta: "left" | "right", floor: number) => {
      el.dataset.meta = meta; // role/team/links under the image (left) or under the text (right)
      let h = Math.round(window.innerHeight * 0.6);
      setH(h);
      while (over() && h > floor) setH((h -= 12));
      return { h, fits: !over() };
    };
    const left = shrink("left", keep);
    const right = shrink("right", keep);
    const best = right.fits && (!left.fits || right.h > left.h) ? "right" : left.fits ? "left" : "right";
    shrink(best, keep);
    // Short screens: scale the whole panel down a little, then shrink the screenshot further if still needed.
    let z = 1;
    while (over() && z > 0.8) {
      z -= 0.025;
      el.style.zoom = String(z);
    }
    let h = parseInt(el.style.getPropertyValue("--fit-h"));
    while (over() && h > 160) setH((h -= 12));
  };


  useEffect(() => {
    const onResize = () => dialog.current?.open && fit();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Where the card sits, as a transform of the panel: same left edge, top and width.
  const fromCard = () => {
    const a = card.current!.getBoundingClientRect();
    const p = sheet.current!.getBoundingClientRect();
    return `translate(${a.left - p.left}px, ${a.top - p.top}px) scale(${a.width / p.width})`;
  };

  const open = () => {
    const d = dialog.current;
    if (!d || d.open) return;
    d.showModal();
    document.documentElement.style.overflow = "hidden"; // the page behind stays put
    fit();
    sheet.current!.focus({ preventScroll: true }); // keyboard focus starts on the panel, not the Close button
    if (calm()) return;
    sheet.current!.animate(
      [{ transform: fromCard(), opacity: 0.3 }, { transform: "none", opacity: 1 }],
      { duration: 320, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
    );
    d.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320, pseudoElement: "::backdrop" });
  };

  const close = () => {
    const d = dialog.current;
    if (!d?.open || closing.current) return;
    if (calm()) return d.close(); // onClose unlocks the page
    closing.current = true;
    const anim = sheet.current!.animate([{ transform: "none", opacity: 1 }, { transform: fromCard(), opacity: 0 }], {
      duration: 220,
      easing: "cubic-bezier(0.4, 0, 1, 1)",
      fill: "forwards",
    });
    d.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, pseudoElement: "::backdrop", fill: "forwards" });
    anim.onfinish = () => {
      d.close();
      d.getAnimations({ subtree: true }).forEach((a) => a.cancel());
      closing.current = false;
    };
  };

  return (
    <article
      ref={card}
      className={`group/card ${className} ${panel ? "cursor-pointer" : ""}`}
      // A quick second click would otherwise select a word.
      onMouseDown={(e) => {
        if (e.detail > 1 && !(e.target as HTMLElement).closest("a, button, dialog")) e.preventDefault();
      }}
      onClick={(e) => {
        if (!panel) return;
        const t = e.target as HTMLElement;
        if (t.closest("dialog")) return;
        if (t.closest("[data-open-details]")) return open();
        if (t.closest("a, button")) return;
        if (window.getSelection()?.toString()) return; // don't open while selecting text
        open();
      }}
    >
      {children}
      {panel && (
        <dialog
          ref={dialog}
          aria-label={title}
          onClose={() => (document.documentElement.style.overflow = "")}
          onCancel={(e) => {
            e.preventDefault(); // Esc: animate out instead of vanishing
            close();
          }}
          className="m-0 h-dvh max-h-none w-screen max-w-none cursor-default bg-transparent p-0 text-body backdrop:bg-black/75"
        >
          {/* The dark margin around the panel is a big target: clicking it closes the panel. */}
          <div
            className="flex h-full w-full items-center justify-center p-2 sm:p-6 lg:px-16 lg:py-10"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <div
              ref={sheet}
              tabIndex={-1}
              style={{ transformOrigin: "top left", outline: "none" }}
              className="group/sheet relative max-h-full w-full max-w-[1200px] overflow-auto overscroll-contain rounded-2xl border border-line bg-navy p-5 shadow-2xl sm:p-7"
            >
              <button
                type="button"
                onClick={close}
                className="absolute right-3 top-3 z-10 inline-flex min-h-12 items-center gap-2 rounded-xl border border-line bg-navy-raised px-5 text-base font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Close <span aria-hidden className="text-lg leading-none">✕</span>
              </button>
              {panel}
            </div>
          </div>
        </dialog>
      )}
    </article>
  );
}
