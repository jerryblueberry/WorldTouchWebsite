"use client";

import { useMemo, useState } from "react";
import { OfferCard } from "@/components/site/offer-card";
import type { Tour } from "@/content/types";

export function TourBrowser({ tours }: { tours: Tour[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(tours.map((tour) => tour.category)))],
    [tours]
  );
  const [category, setCategory] = useState("All");
  const visible = tours.filter(
    (tour) => category === "All" || tour.category === category
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`rounded-full px-3 py-1.5 text-sm transition ${
              category === item
                ? "bg-[color:var(--ink)] text-white"
                : "bg-white text-[color:var(--ink)] ring-1 ring-[color:var(--line)]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((tour) => (
          <OfferCard
            key={tour.slug}
            href={`/tours/${tour.slug}/`}
            title={tour.title}
            summary={tour.summary}
            image={tour.image}
            imageAlt={tour.imageAlt}
            meta={tour.duration}
            priceFrom={tour.priceFrom}
            currency={tour.currency}
            kicker={tour.category}
          />
        ))}
      </div>
    </div>
  );
}
