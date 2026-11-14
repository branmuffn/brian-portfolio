"use client";

import { useRef, type ReactNode } from "react";

// A project card. Clicking anywhere on it (outside its links), or its "View details" button,
// opens a panel with the whole project on one screen. The panel grows out of the card and
// shrinks back into it on close. Esc, the Close button, or a click outside the panel closes it.
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
    if (calm()) return d.close();
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
          onCancel={(e) => {
            e.preventDefault(); // Esc: animate out instead of vanishing
            close();
          }}
          className="m-0 h-dvh max-h-none w-screen max-w-none cursor-default bg-transparent p-0 text-body backdrop:bg-black/75"
        >
          <div
            className="flex h-full w-full items-center justify-center p-2 sm:p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <div
              ref={sheet}
              tabIndex={-1}
              style={{ transformOrigin: "top left", outline: "none" }}
              className="relative max-h-full w-full max-w-[1500px] overflow-auto rounded-2xl border border-line bg-navy p-5 focus-visible:outline-none shadow-2xl sm:p-8"
            >
              <button
                type="button"
                onClick={close}
                className="absolute right-3 top-3 z-10 rounded-md px-3 py-2 text-sm font-semibold text-muted hover:text-accent"
              >
                Close ✕
              </button>
              {panel}
            </div>
          </div>
        </dialog>
      )}
    </article>
  );
}
