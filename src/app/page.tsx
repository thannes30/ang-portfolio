import Image from "next/image";

import Gallery from "@/components/Gallery";
import { withBase } from "@/lib/basePath";
import { getArtworks, getBio } from "@/lib/content";

export default function Home() {
  const bio = getBio();
  const artworks = getArtworks();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24">
      <header className="mb-16 grid gap-10 sm:mb-24 md:grid-cols-[minmax(0,1fr)_20rem] md:items-center md:gap-16 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-stone-600">
            {bio.tagline}
          </p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight text-stone-900 sm:text-6xl">
            {bio.name}
          </h1>
          <div
            className="mt-8 space-y-4 text-lg leading-relaxed text-stone-700 [&_a]:font-medium [&_a]:text-stone-900 [&_a]:underline [&_a]:underline-offset-4"
            dangerouslySetInnerHTML={{ __html: bio.html }}
          />
          <p className="mt-4 text-lg">
            <a
              href={withBase("/Angelika-Erne-Resume.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-stone-900 underline underline-offset-4 hover:text-stone-600"
            >
              View Resume
            </a>
          </p>
        </div>
        <div className="hidden md:block">
          <Image
            src={withBase("/bio.jpg")}
            alt="The artist smiling in a paint-splattered white smock, reaching across a studio table covered with colorful papers and dried leaves."
            width={520}
            height={650}
            sizes="(min-width: 1024px) 384px, (min-width: 768px) 320px, 272px"
            loading="eager"
            fetchPriority="high"
            className="aspect-[4/5] h-auto w-full rounded-2xl object-cover shadow-xl shadow-stone-900/10 ring-1 ring-stone-900/5"
          />
        </div>
      </header>

      <section aria-labelledby="work-heading">
        <h2
          id="work-heading"
          className="mb-8 text-sm font-medium uppercase tracking-widest text-stone-600"
        >
          Selected work
        </h2>
        <Gallery artworks={artworks} />
      </section>

      <footer className="mt-24 border-t border-stone-200 pt-6 text-sm text-stone-600">
        <p>&copy; 2026 {bio.name}. Made in Zurich.</p>
      </footer>
    </main>
  );
}
