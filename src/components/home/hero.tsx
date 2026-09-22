"use client";

import { useState } from "react";
import { HeroRotator } from "@/components/home/hero-rotator";
import { HeroScrollCue } from "@/components/home/hero-scroll-cue";
import { HeroSearchBlock } from "@/components/home/hero-search-block";
import { HeroVideo } from "@/components/home/hero-video";
import { heroCopy, heroRules } from "@/design/tokens";

/**
 * Home hero — full-viewport Cloudinary video, white type, search.
 * Layout & copy follow `src/design/DECISIONS.md` and `src/design/tokens.ts`.
 */
export function HomeHero() {
  const [searchActive, setSearchActive] = useState(false);

  return (
    <section
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-x-hidden"
      style={{ minHeight: heroRules.minHeight }}
      aria-label="World Touch Tour and Travels Nepal travel hero"
    >
      <HeroVideo />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 pt-20 pb-28 text-center sm:px-6 sm:pt-24 sm:pb-32">
        <div className="flex w-full flex-col items-center gap-3 sm:gap-3.5">
          <p className="hero-text-glow animate-rise px-2 text-center font-display font-medium text-white">
            <span
              className="block leading-[1.05] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.125rem, 6.2vw, 4.75rem)" }}
            >
              {heroCopy.brandPrimary}
            </span>
            <span
              className="mt-2 block font-normal tracking-[0.2em] text-white/88 uppercase sm:mt-2.5 sm:tracking-[0.24em]"
              style={{ fontSize: "clamp(0.7rem, 1.4vw, 0.95rem)" }}
            >
              {heroCopy.brandSecondary}
            </span>
          </p>

          <h1 className="hero-text-glow animate-rise-delay max-w-md px-3 font-display text-base leading-snug font-normal tracking-tight text-white/95 sm:max-w-xl sm:text-lg md:text-xl">
            {heroCopy.headline}
          </h1>

          <div className="animate-rise-delay-2 flex w-full justify-center">
            <HeroRotator />
          </div>

          <div className="animate-rise-delay-2 mt-1 w-full sm:mt-1.5">
            <HeroSearchBlock onActiveChange={setSearchActive} />
          </div>
        </div>
      </div>

      <HeroScrollCue targetId="journeys" suppressed={searchActive} />
    </section>
  );
}
