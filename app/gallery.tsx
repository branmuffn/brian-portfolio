"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Shot } from "./content";
import { ZoomImage } from "./zoom-image";

type Props = {
  shots: Shot[];
  sizes: string;
  className?: string;
  style?: React.CSSProperties;
  plain?: boolean; // project cards: no zoom (a click on the image opens the panel), smaller arrows
};

// A card screenshot without zoom.
function Plain({ src, alt, width, height, sizes }: Shot & { sizes: string }) {
  return (
    <div className="overflow-hidden rounded-md border border-line">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className="block h-auto w-full transition-transform duration-300 ease-out motion-safe:group-hover/card:scale-[1.02]"
      />
    </div>
  );
}

// A few screenshots with arrows, dots and swipe, like a product or Instagram carousel.
// Each one still zooms in place (see ZoomImage). One screenshot = no arrows.
export function Gallery({ shots, sizes, className = "", style, plain = false }: Props) {
  const [i, setI] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const n = shots.length;
  const Shot = plain ? Plain : ZoomImage;
  if (n === 1)
    return plain ? (
      <div className={className} style={style}>
        <Plain {...shots[0]} sizes={sizes} />
      </div>
    ) : (
      <ZoomImage {...shots[0]} sizes={sizes} className={className} style={style} />
    );

  const go = (d: number) => setI((x) => (x + d + n) % n);
  const zoomedIn = (t: EventTarget) => Boolean((t as HTMLElement).closest('[aria-pressed="true"]'));
  const arrow =
    `absolute top-1/2 z-10 grid ${plain ? "h-9 w-9 text-xl" : "h-11 w-11 text-2xl"} -translate-y-1/2 place-items-center rounded-full bg-navy/85 leading-none text-ink shadow-lg ring-1 ring-white/25 transition hover:bg-navy hover:text-accent`;

  return (
    <div className={className} style={style} role="group" aria-roledescription="carousel" aria-label="Screenshots">
      <div
        className="group/gal relative"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") go(-1);
          if (e.key === "ArrowRight") go(1);
        }}
        onTouchStart={(e) => {
          if (!zoomedIn(e.target)) touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }}
        onTouchEnd={(e) => {
          const s = touch.current;
          touch.current = null;
          if (!s) return;
          const dx = e.changedTouches[0].clientX - s.x, dy = e.changedTouches[0].clientY - s.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
        }}
      >
        <Shot key={shots[i].src} {...shots[i]} sizes={sizes} />
        <button type="button" onClick={() => go(-1)} className={`${arrow} left-2`} aria-label="Previous screenshot">
          <span aria-hidden>‹</span>
        </button>
        <button type="button" onClick={() => go(1)} className={`${arrow} right-2`} aria-label="Next screenshot">
          <span aria-hidden>›</span>
        </button>
        <span className="pointer-events-none absolute right-2 top-2 rounded bg-navy/85 px-2 py-1 font-mono text-xs text-ink" aria-live="polite">
          {i + 1} / {n}
        </span>
      </div>
      <div className={`flex justify-center ${plain ? "mt-1" : "mt-2"}`}>
        {shots.map((s, k) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setI(k)}
            aria-label={`Screenshot ${k + 1} of ${n}`}
            aria-current={k === i}
            className="grid h-8 w-8 place-items-center"
          >
            <span className={`block h-2 rounded-full transition-all ${k === i ? "w-5 bg-accent" : "w-2 bg-muted/60 hover:bg-ink"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
