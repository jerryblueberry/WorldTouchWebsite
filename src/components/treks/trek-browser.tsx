"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { OfferCard } from "@/components/site/offer-card";
import type { Trek } from "@/content/types";

const difficulties = ["All", "Easy", "Moderate", "Challenging", "Strenuous"] as const;

const fieldClass =
  "h-11 w-full appearance-none rounded-xl border border-[color:var(--line)] bg-white pr-10 pl-3.5 text-sm leading-none text-[color:var(--ink)] outline-none transition-colors hover:border-[color:var(--muted-ink)] focus-visible:border-[color:var(--lagoon-ink)] focus-visible:ring-2 focus-visible:ring-[color:var(--lagoon)]/40 sm:w-48";

function FilterField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}) {
  return (
    <label className="flex w-full flex-col gap-1.5 text-xs font-medium tracking-wide text-[color:var(--muted-ink)] sm:w-48">
      {label}
      <span className="relative block">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={fieldClass}
        >
          {options.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[color:var(--muted-ink)]"
          aria-hidden
        />
      </span>
    </label>
  );
}

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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <FilterField
          label="Region"
          value={region}
          onChange={setRegion}
          options={regions}
        />
        <FilterField
          label="Difficulty"
          value={difficulty}
          onChange={(value) =>
            setDifficulty(value as (typeof difficulties)[number])
          }
          options={difficulties}
        />
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
