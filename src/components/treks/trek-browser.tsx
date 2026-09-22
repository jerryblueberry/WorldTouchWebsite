"use client";

import { useMemo, useState } from "react";
import { OfferCard } from "@/components/site/offer-card";
import type { Trek } from "@/content/types";

const difficulties = ["All", "Easy", "Moderate", "Challenging", "Strenuous"] as const;

export function TrekBrowser({ treks }: { treks: Trek[] }) {
  const regions = useMemo(
    () => ["All", ...Array.from(new Set(treks.map((trek) => trek.region)))],
    [treks]
  );
  const [region, setRegion] = useState("All");
  const [difficulty, setDifficulty] = useState<(typeof difficulties)[number]>("All");

  const visible = treks.filter((trek) => {
    const regionOk = region === "All" || trek.region === region;
    const difficultyOk = difficulty === "All" || trek.difficulty === difficulty;
    return regionOk && difficultyOk;
  });

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <label className="text-sm text-[color:var(--muted-ink)]">
          Region
          <select
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            className="mt-1 block h-10 rounded-xl border border-[color:var(--line)] bg-white px-3 text-[color:var(--ink)]"
          >
            {regions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="text-sm text-[color:var(--muted-ink)]">
          Difficulty
          <select
            value={difficulty}
            onChange={(event) =>
              setDifficulty(event.target.value as (typeof difficulties)[number])
            }
            className="mt-1 block h-10 rounded-xl border border-[color:var(--line)] bg-white px-3 text-[color:var(--ink)]"
          >
            {difficulties.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((trek) => (
          <OfferCard
            key={trek.slug}
            href={`/treks/${trek.slug}/`}
            title={trek.title}
            summary={trek.summary}
            image={trek.image}
            imageAlt={trek.imageAlt}
            meta={`${trek.duration} · ${trek.maxAltitude}`}
            priceFrom={trek.priceFrom}
            currency={trek.currency}
            kicker={trek.region}
          />
        ))}
      </div>
      {visible.length === 0 ? (
        <p className="mt-8 text-sm text-[color:var(--muted-ink)]">
          No treks match those filters. Try another region or difficulty.
        </p>
      ) : null}
    </div>
  );
}
