"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = { src: string; alt: string; width: number; height: number; sizes: string; className?: string };

const ZOOM = 2.5;

// A screenshot that opens full screen in a native <dialog>.
// Click the image to zoom in (centered where you clicked), drag or scroll to pan, click again to zoom out.
// Clicking anywhere outside the image, the Close button, or Esc closes it. No libraries.
export function ZoomImage({ src, alt, width, height, sizes, className = "" }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const focus = useRef({ x: 0.5, y: 0.5 }); // where to center after zooming in (0-1)
  const drag = useRef({ active: false, moved: false, x: 0, y: 0, left: 0, top: 0 });

  // After zooming in, scroll so the clicked point is in the middle.
  useEffect(() => {
    const el = scroller.current;
    if (!zoomed || !el) return;
    el.scrollLeft = focus.current.x * el.scrollWidth - el.clientWidth / 2;
    el.scrollTop = focus.current.y * el.scrollHeight - el.clientHeight / 2;
  }, [zoomed]);

  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        className={`group/zoom relative block w-full cursor-zoom-in overflow-hidden rounded-md border border-line ${className}`}
        aria-label={`Enlarge image: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className="w-full object-cover object-top transition-transform duration-300 ease-out motion-safe:group-hover/zoom:scale-[1.02]"
        />
        <span
          aria-hidden
          className="absolute bottom-2 right-2 rounded bg-navy/85 px-2 py-1 font-mono text-xs text-ink opacity-0 transition-opacity group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100"
        >
          Click to enlarge
        </span>
      </button>

      <dialog
        ref={dialog}
        onClose={() => setZoomed(false)}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-black/85"
        aria-label={alt}
      >
        {/* Full-screen layer: a click on it (not on the image or the buttons) closes the viewer. */}
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-3 p-[2vw]"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          {!zoomed ? (
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes="96vw"
              onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                focus.current = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
                setZoomed(true);
              }}
              // As large as fits: 96% of the width, or 82% of the height at this image's shape.
              style={{ width: `min(96vw, calc(82dvh * ${width / height}))`, height: "auto" }}
              className="block cursor-zoom-in rounded-md"
            />
          ) : (
            <div
              ref={scroller}
              className="max-h-[82dvh] max-w-full cursor-grab overflow-auto rounded-md active:cursor-grabbing"
              onPointerDown={(e) => {
                if (e.pointerType !== "mouse") return; // touch screens pan natively
                const el = e.currentTarget;
                drag.current = { active: true, moved: false, x: e.clientX, y: e.clientY, left: el.scrollLeft, top: el.scrollTop };
              }}
              onPointerMove={(e) => {
                const d = drag.current;
                if (!d.active) return;
                const dx = e.clientX - d.x, dy = e.clientY - d.y;
                if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
                e.currentTarget.scrollLeft = d.left - dx;
                e.currentTarget.scrollTop = d.top - dy;
              }}
              onPointerUp={() => (drag.current.active = false)}
              onPointerLeave={() => (drag.current.active = false)}
            >
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes={`${Math.round(width * ZOOM)}px`}
                draggable={false}
                onClick={() => {
                  if (!drag.current.moved) setZoomed(false); // a drag is not a click
                }}
                style={{ width: Math.round(width * ZOOM), maxWidth: "none", height: "auto" }}
                className="block select-none"
              />
            </div>
          )}

          <div className="flex items-center gap-3">
            <p className="hidden font-mono text-xs text-muted sm:block">
              {zoomed ? "Drag to move · click to zoom out" : "Click the image to zoom in"}
            </p>
            <button
              type="button"
              onClick={() => {
                focus.current = { x: 0.5, y: 0.5 };
                setZoomed((z) => !z);
              }}
              className="rounded-md border border-ink/60 px-4 py-3 text-sm font-semibold text-ink hover:border-accent hover:text-accent"
            >
              {zoomed ? "Zoom out" : "Zoom in"}
            </button>
            <button
              type="button"
              onClick={close}
              className="rounded-md bg-ink px-5 py-3 text-sm font-semibold text-navy hover:bg-accent"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
