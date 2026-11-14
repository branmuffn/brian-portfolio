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
  captions?: boolean; // project panels: show each screenshot's caption under it
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
export function Gallery({ shots, sizes, className = "", style, plain = false, captions = false }: Props) {
  const [i, setI] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const n = shots.length;
  const Shot = plain ? Plain : ZoomImage;
  const caption = captions && shots[i].caption && (
    // min-h: room for two lines, so switching pictures doesn't make the panel jump
    <p className="mt-3 min-h-[3.4em] text-lg leading-snug text-ink">{shots[i].caption}</p>
  );
  if (n === 1)
    return (
      <div className={className} style={style}>
        <Shot {...shots[0]} sizes={sizes} />
        {caption}
      </div>
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
        <span
          className={`pointer-events-none absolute right-2 top-2 rounded bg-navy/85 px-2 py-1 font-mono text-xs text-ink ${plain ? "sr-only" : ""}`}
          aria-live="polite"
        >
          {i + 1} / {n}
        </span>
      </div>
      {caption}
      <div className={`flex ${captions ? "justify-start" : "justify-center"} ${plain ? "mt-1" : "mt-1"}`}>
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

// Phone screenshots side by side, each with its caption, scrolling sideways (swipe, or the arrows).
// Desktop shows three at a time; phones show one and a peek of the next.
export function Phones({ shots }: { shots: Shot[] }) {
  const row = useRef<HTMLDivElement>(null);
  const step = (d: number) => {
    const el = row.current;
    const item = el?.firstElementChild as HTMLElement | null;
    if (el && item) el.scrollBy({ left: d * (item.offsetWidth + 20), behavior: "smooth" });
  };
  const arrow =
    "absolute top-[40%] z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-navy/85 text-2xl leading-none text-ink shadow-lg ring-1 ring-white/25 transition hover:bg-navy hover:text-accent";
  return (
    <div className="relative" role="group" aria-roledescription="carousel" aria-label="Phone screenshots">
      <div ref={row} className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {shots.map((s) => (
          <figure key={s.src} className="m-0 shrink-0 basis-[72%] snap-start sm:basis-[calc((100%-2.5rem)/3)]">
            <ZoomImage
              {...s}
              sizes="(min-width: 1024px) 17rem, 72vw"
              className="mx-auto rounded-2xl border-4 border-[#1c2741] lg:max-w-[var(--phone-w)]"
              style={{ "--phone-w": `calc(var(--fit-h, 60dvh) * ${s.width / s.height})` } as React.CSSProperties}
            />
            <figcaption className="mt-3 text-center leading-snug text-ink">{s.caption}</figcaption>
          </figure>
        ))}
      </div>
      <button type="button" onClick={() => step(-1)} className={`${arrow} -left-3`} aria-label="Previous screenshots">
        <span aria-hidden>‹</span>
      </button>
      <button type="button" onClick={() => step(1)} className={`${arrow} -right-3`} aria-label="Next screenshots">
        <span aria-hidden>›</span>
      </button>
    </div>
  );
}
