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
    <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-line bg-navy-raised">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className="absolute inset-0 h-full w-full object-contain transition-transform duration-300 ease-out motion-safe:group-hover/card:scale-[1.02]"
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
    <p className="mt-3 min-h-[3.4em] text-lg leading-snug max-sm:mt-1.5 max-sm:min-h-0 max-sm:text-base">
      {shots[i].title && <span className="font-semibold text-ink">{shots[i].title}. </span>}
      {shots[i].caption}
    </p>
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
    `absolute top-1/2 z-10 grid ${plain ? "h-9 w-9 text-xl" : "h-11 w-11 text-2xl"} -translate-y-1/2 place-items-center rounded-full bg-navy/85 leading-none text-ink shadow-lg ring-1 ring-white/25 transition hover:bg-navy hover:text-accent ${plain ? "[@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/card:opacity-100 focus-visible:opacity-100" : ""}`;

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
      <div className={`flex ${captions ? "justify-start" : "justify-center"} mt-1 max-sm:mt-0`}>
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

// Phone app features: one big phone screen next to a numbered list of what each screen shows.
// Clicking a feature (or the arrows, or a swipe) swaps the screen, so every point is tied to its picture.
export function Features({ shots }: { shots: Shot[] }) {
  const [i, setI] = useState(0);
  const touch = useRef<number | null>(null);
  const n = shots.length;
  const go = (d: number) => setI((x) => (x + d + n) % n);
  const s = shots[i];
  const arrow =
    "absolute top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-navy/90 text-2xl leading-none text-ink shadow-lg ring-1 ring-white/25 transition hover:bg-navy hover:text-accent";
  return (
    <div className="grid items-center gap-6 sm:grid-cols-[auto_minmax(0,1fr)]" role="group" aria-roledescription="carousel" aria-label="App screens">
      <div
        className="relative mx-auto"
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const x = touch.current;
          touch.current = null;
          if (x === null || (e.target as HTMLElement).closest('[aria-pressed="true"]')) return;
          const dx = e.changedTouches[0].clientX - x;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
      >
        <ZoomImage
          key={s.src}
          {...s}
          sizes="(min-width: 1024px) 20rem, 75vw"
          className="w-[min(75vw,20rem)] rounded-[1.75rem] border-[6px] border-[#1c2741] shadow-2xl lg:w-[var(--phone-w)]"
          style={{ "--phone-w": `calc(var(--fit-h, 60dvh) * ${s.width / s.height})` } as React.CSSProperties}
        />
        <button type="button" onClick={() => go(-1)} className={`${arrow} -left-6`} aria-label="Previous screen">
          <span aria-hidden>‹</span>
        </button>
        <button type="button" onClick={() => go(1)} className={`${arrow} -right-6`} aria-label="Next screen">
          <span aria-hidden>›</span>
        </button>
      </div>
      <ol className="space-y-2">
        {shots.map((x, k) => (
          <li key={x.src}>
            <button
              type="button"
              onClick={() => setI(k)}
              aria-current={k === i}
              className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                k === i ? "border-accent/70 bg-accent/10" : "border-line/0 hover:border-line hover:bg-navy-raised"
              }`}
            >
              <span className="flex items-baseline gap-2">
                <span className={`font-mono text-xs ${k === i ? "text-accent" : "text-muted"}`}>0{k + 1}</span>
                <span className="font-semibold text-ink">{x.title}</span>
              </span>
              <span className="mt-0.5 block leading-snug">{x.caption}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
