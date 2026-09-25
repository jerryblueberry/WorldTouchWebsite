"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, LayoutGrid, GalleryHorizontal } from "lucide-react";
import type { GalleryCategoryId, GalleryContent } from "@/content/types";
import { cn } from "cn";

type GalleryView = "carousel" | "grid";

type GalleryBrowserProps = {
  gallery: GalleryContent;
};

export function GalleryBrowser({ gallery }: GalleryBrowserProps) {
  const [category, setCategory] = useState<GalleryCategoryId>("all");
  const [view, setView] = useState<GalleryView>("grid");
  const carouselRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (category === "all") return gallery.items;
    return gallery.items.filter((item) => item.category === category);
  }, [category, gallery.items]);

  function scrollCarousel(direction: -1 | 1) {
    const node = carouselRef.current;
    if (!node) return;
    const amount = Math.min(node.clientWidth * 0.9, 420);
    node.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-[color:var(--lagoon-ink)] uppercase">
            Photos
          </p>
          <h2 className="mt-2 font-display text-2xl tracking-tight text-[color:var(--ink)] sm:text-3xl">
            Buses, rentals &amp; journeys
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div
            className="inline-flex rounded-full bg-white p-1 ring-1 ring-[color:var(--line)]"
            role="group"
            aria-label="Gallery layout"
          >
            <button
              type="button"
              aria-pressed={view === "grid"}
              onClick={() => setView("grid")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition",
                view === "grid"
                  ? "bg-[color:var(--ink)] text-white"
                  : "text-[color:var(--muted-ink)] hover:text-[color:var(--ink)]"
              )}
            >
              <LayoutGrid className="size-4" aria-hidden />
              Grid
            </button>
            <button
              type="button"
              aria-pressed={view === "carousel"}
              onClick={() => setView("carousel")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition",
                view === "carousel"
                  ? "bg-[color:var(--ink)] text-white"
                  : "text-[color:var(--muted-ink)] hover:text-[color:var(--ink)]"
              )}
            >
              <GalleryHorizontal className="size-4" aria-hidden />
              Carousel
            </button>
          </div>
        </div>
      </div>

      <div
        className="mt-4 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter gallery by category"
      >
        {gallery.categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={category === cat.id}
            onClick={() => setCategory(cat.id)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition",
              category === cat.id
                ? "bg-[color:var(--ink)] text-white"
                : "bg-white text-[color:var(--muted-ink)] ring-1 ring-[color:var(--line)] hover:text-[color:var(--ink)]"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {view === "carousel" ? (
        <div className="relative mt-6">
          <div className="mb-3 flex justify-end gap-2">
            <button
              type="button"
              aria-label="Previous photos"
              onClick={() => scrollCarousel(-1)}
              className="inline-flex size-9 items-center justify-center rounded-full border border-[color:var(--line)] bg-white text-[color:var(--ink)] transition hover:bg-[color:var(--mist)]"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next photos"
              onClick={() => scrollCarousel(1)}
              className="inline-flex size-9 items-center justify-center rounded-full border border-[color:var(--line)] bg-white text-[color:var(--ink)] transition hover:bg-[color:var(--mist)]"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
          <div
            ref={carouselRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {filtered.map((item) => (
              <figure
                key={item.id}
                className="w-[min(78vw,320px)] shrink-0 snap-start overflow-hidden rounded-2xl ring-1 ring-[color:var(--line)]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 78vw, 320px"
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 columns-2 gap-3 sm:gap-4 lg:columns-3">
          {filtered.map((item, index) => (
            <figure
              key={item.id}
              className="mb-3 break-inside-avoid overflow-hidden rounded-2xl ring-1 ring-[color:var(--line)] sm:mb-4"
            >
              <div
                className={cn(
                  "relative w-full",
                  index % 5 === 0 ? "aspect-[3/4]" : index % 3 === 0 ? "aspect-square" : "aspect-[4/3]"
                )}
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="object-cover transition duration-500 hover:scale-[1.02]"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
