"use client";

import type { ReactNode } from "react";

// Clicking anywhere on a card (outside its links, buttons and images) opens or closes
// its "More details" section. Keyboard users use the "More details" toggle itself.
export function ClickableCard({ className, children }: { className: string; children: ReactNode }) {
  return (
    <article
      className={className}
      // A quick second click is a double-click, which would select a word instead of closing the details.
      onMouseDown={(e) => {
        if (e.detail > 1 && !(e.target as HTMLElement).closest("a, button, summary, dialog")) e.preventDefault();
      }}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest("a, button, summary, dialog")) return;
        if (window.getSelection()?.toString()) return; // don't toggle while selecting text
        const details = e.currentTarget.querySelector("details");
        if (details) details.open = !details.open;
      }}
    >
      {children}
    </article>
  );
}
