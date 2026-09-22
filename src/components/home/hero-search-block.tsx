"use client";

import { useState } from "react";
import Link from "next/link";
import { HeroSearch } from "@/components/home/hero-search";
import { cn } from "cn";
import { heroCopy } from "@/design/tokens";

type HeroSearchBlockProps = {
  onActiveChange?: (active: boolean) => void;
};

/**
 * Search + quick links as one unit — links fade while search is active
 * so the floating suggestion panel never feels like it “pushes” content.
 */
export function HeroSearchBlock({ onActiveChange }: HeroSearchBlockProps) {
  const [active, setActive] = useState(false);

  function handleActiveChange(next: boolean) {
    setActive(next);
    onActiveChange?.(next);
  }

  return (
    <div className="relative z-30 flex w-full flex-col items-center">
      <HeroSearch onActiveChange={handleActiveChange} />

      <ul
        className={cn(
          "mt-3 flex min-h-[1.5rem] flex-wrap items-center justify-center gap-x-5 gap-y-1.5 transition-all duration-200 sm:mt-3.5",
          active
            ? "pointer-events-none translate-y-1 opacity-0"
            : "translate-y-0 opacity-100"
        )}
        aria-hidden={active}
      >
        {heroCopy.quickLinks.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              tabIndex={active ? -1 : 0}
              className="text-[0.8125rem] tracking-[0.02em] text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline sm:text-sm"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
