"use client";

import { useRef, type ReactNode } from "react";

// A project card. Clicking anywhere on it (outside its links and images), or its
// "View details" button, opens a panel with the whole project on one screen.
// Esc, the Close button, or a click outside the panel closes it.
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
  const dialog = useRef<HTMLDialogElement>(null);
  const open = () => dialog.current?.showModal();

  return (
    <article
      className={`${className} ${panel ? "cursor-pointer" : ""}`}
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
          className="m-0 h-dvh max-h-none w-screen max-w-none cursor-default bg-transparent p-0 text-body backdrop:bg-black/75"
        >
          <div
            className="flex h-full w-full items-center justify-center p-2 sm:p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) dialog.current?.close();
            }}
          >
            <div className="relative max-h-full w-full max-w-[1600px] overflow-auto rounded-2xl border border-line bg-navy p-5 shadow-2xl sm:p-8">
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                className="absolute right-3 top-3 rounded-md px-3 py-2 text-sm font-semibold text-muted hover:text-accent"
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
