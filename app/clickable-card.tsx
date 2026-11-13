"use client";

import type { ReactNode } from "react";

// Clicking anywhere on a card (outside its links, buttons and images) opens or closes
// its "More details" section. Keyboard users use the "More details" toggle itself.
export function ClickableCard({ className, children }: { className: string; children: ReactNode }) {
  return (
    <article
      className={className}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest("a, button, summary, dialog, details[open] > :not(summary)")) return;
        if (window.getSelection()?.toString()) return; // don't toggle while selecting text
        const details = e.currentTarget.querySelector("details");
        if (details) details.open = !details.open;
      }}
    >
      {children}
    </article>
  );
}
