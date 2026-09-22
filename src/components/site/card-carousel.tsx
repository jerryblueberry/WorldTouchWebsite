"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

type CardCarouselProps = {
  children: ReactNode;
  label: string;
};

export function CardCarousel({ children, label }: CardCarouselProps) {
  const scroller = useRef<HTMLDivElement>(null);

  function move(direction: -1 | 1) {
    const node = scroller.current;
    if (!node) return;
    const amount = Math.min(node.clientWidth * 0.85, 360);
    node.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div className="mb-4 flex justify-end gap-2">
        <button
          type="button"
          aria-label={`Previous ${label}`}
          onClick={() => move(-1)}
          className="inline-flex size-9 items-center justify-center rounded-full border border-[color:var(--line)] bg-white text-[color:var(--ink)] transition hover:bg-[color:var(--mist)]"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          aria-label={`Next ${label}`}
          onClick={() => move(1)}
          className="inline-flex size-9 items-center justify-center rounded-full border border-[color:var(--line)] bg-white text-[color:var(--ink)] transition hover:bg-[color:var(--mist)]"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
      <div
        ref={scroller}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  );
}
