"use client";

import Image from "next/image";
import { useRef } from "react";

type Props = { src: string; alt: string; width: number; height: number; sizes: string; className?: string };

// A screenshot that opens full size in a native <dialog>. Esc, the close button,
// or a click outside the image closes it. No libraries.
export function ZoomImage({ src, alt, width, height, sizes, className = "" }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);

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
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        className="m-auto w-[96vw] max-w-[1600px] overflow-visible bg-transparent p-0 backdrop:bg-black/85"
        aria-label={alt}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="96vw"
          className="mx-auto h-auto max-h-[86vh] w-full rounded-md object-contain"
        />
        <form method="dialog" className="mt-3 text-center">
          <button className="rounded-md bg-ink px-5 py-3 text-sm font-semibold text-navy hover:bg-accent">Close</button>
        </form>
      </dialog>
    </>
  );
}
