"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Props = { src: string; alt: string; width: number; height: number; sizes: string; className?: string; style?: React.CSSProperties };

const ZOOM = 2.5; // screenshots are 2x, so this stays sharp
const clamp = (n: number) => Math.min(100, Math.max(0, n));

// A screenshot that zooms in place, like a store's product photos.
// Mouse: click to zoom in where you clicked, move the mouse to look around, click (or move off the image) to zoom out.
// Touch: tap to zoom in, drag to look around, tap again to zoom out.
// Keyboard: Enter or Space toggles zoom. No libraries.
export function ZoomImage({ src, alt, width, height, sizes, className = "", style }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 }); // the point that stays put, in % of the image
  const touch = useRef({ active: false, moved: false, x: 0, y: 0, ox: 50, oy: 50 });

  const pointAt = (clientX: number, clientY: number) => {
    const r = box.current!.getBoundingClientRect();
    return { x: clamp(((clientX - r.left) / r.width) * 100), y: clamp(((clientY - r.top) / r.height) * 100) };
  };

  return (
    <div
      ref={box}
      role="button"
      tabIndex={0}
      aria-label={zoomed ? `Zoom out: ${alt}` : `Zoom in: ${alt}`}
      aria-pressed={zoomed}
      className={`group/zoom relative select-none overflow-hidden rounded-md border border-line ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"} ${className}`}
      style={{ touchAction: zoomed ? "none" : "manipulation", ...style }}
      onPointerDown={(e) => {
        if (e.pointerType === "mouse") return;
        touch.current = { active: true, moved: false, x: e.clientX, y: e.clientY, ox: origin.x, oy: origin.y };
      }}
      onPointerMove={(e) => {
        if (!zoomed) return;
        if (e.pointerType === "mouse") return setOrigin(pointAt(e.clientX, e.clientY));
        const t = touch.current;
        if (!t.active) return;
        const r = box.current!.getBoundingClientRect();
        const dx = e.clientX - t.x, dy = e.clientY - t.y;
        if (Math.abs(dx) + Math.abs(dy) > 6) t.moved = true;
        // Moving the zoom origin against the finger makes the image follow the finger.
        setOrigin({ x: clamp(t.ox - (dx / r.width) * 100 / (ZOOM - 1)), y: clamp(t.oy - (dy / r.height) * 100 / (ZOOM - 1)) });
      }}
      onPointerUp={() => (touch.current.active = false)}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setZoomed(false);
      }}
      onClick={(e) => {
        if (touch.current.moved) return void (touch.current.moved = false); // a drag is not a tap
        if (zoomed) return setZoomed(false);
        setOrigin(pointAt(e.clientX, e.clientY));
        setZoomed(true);
      }}
      onKeyDown={(e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        setOrigin({ x: 50, y: 50 });
        setZoomed((z) => !z);
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        draggable={false}
        style={{ transform: zoomed ? `scale(${ZOOM})` : "none", transformOrigin: `${origin.x}% ${origin.y}%` }}
        className="block h-auto w-full transition-transform duration-300 ease-out motion-reduce:transition-none"
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute bottom-2 right-2 rounded bg-navy/85 px-2 py-1 font-mono text-xs text-ink transition-opacity ${
          zoomed ? "opacity-0" : "opacity-0 group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100"
        }`}
      >
        Click to zoom
      </span>
    </div>
  );
}
