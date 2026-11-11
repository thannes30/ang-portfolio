"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { withBase } from "@/lib/basePath";
import type { Artwork } from "@/lib/content";

const THUMB_WIDTH = 640;
const THUMB_HEIGHT = 800;

export default function Gallery({ artworks }: { artworks: Artwork[] }) {
  const [selected, setSelected] = useState<Artwork | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selected && dialog && !dialog.open) dialog.showModal();
  }, [selected]);

  return (
    <>
      <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {artworks.map((art) => (
          <li key={art.slug}>
            <button
              type="button"
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setSelected(art);
              }}
              aria-haspopup="dialog"
              className="group block w-full cursor-pointer overflow-hidden rounded-2xl bg-stone-100 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-800"
            >
              <span className="sr-only">View larger: </span>
              <Image
                src={withBase(art.thumb)}
                alt={art.alt}
                width={THUMB_WIDTH}
                height={THUMB_HEIGHT}
                sizes="(min-width: 1024px) 352px, (min-width: 640px) 45vw, 100vw"
                className="aspect-[4/5] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
              />
            </button>
            <p className="mt-3 text-sm font-medium text-stone-900">{art.title}</p>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-labelledby="art-modal-title"
        onClose={() => {
          setSelected(null);
          triggerRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="m-auto w-fit max-w-[94vw] max-h-[94vh] overflow-y-auto rounded-2xl bg-white p-0 text-stone-800 shadow-2xl backdrop:bg-stone-900/40 backdrop:backdrop-blur-sm"
      >
        {selected && (
          <div className="relative flex flex-col gap-5 p-4 sm:p-8">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/90 text-2xl text-stone-800 shadow hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-stone-800 sm:right-5 sm:top-5"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <Image
              src={withBase(selected.image)}
              alt={selected.alt}
              width={selected.width}
              height={selected.height}
              sizes="(min-width: 1024px) 960px, 94vw"
              className="block h-auto max-h-[65vh] w-auto max-w-[calc(94vw-2rem)] object-contain sm:max-w-[calc(94vw-4rem)]"
            />
            <div className="w-0 min-w-full">
              <h2 id="art-modal-title" className="text-2xl font-semibold text-stone-900">
                {selected.title}
              </h2>
              <div
                className="mt-3 space-y-3 leading-relaxed text-stone-700"
                dangerouslySetInnerHTML={{ __html: selected.html }}
              />
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
