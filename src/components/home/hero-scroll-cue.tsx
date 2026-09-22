"use client";

import { useEffect, useState } from "react";

type HeroScrollCueProps = {
  targetId?: string;
  /** Hide while search dropdown / focus is active */
  suppressed?: boolean;
};

/**
 * Bottom-of-hero scroll cue — mouse on desktop, chevron on small screens.
 */
export function HeroScrollCue({
  targetId = "journeys",
  suppressed = false,
}: HeroScrollCueProps) {
  const [scrolledAway, setScrolledAway] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolledAway(window.scrollY > 48);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToNext() {
    const target = document.getElementById(targetId);
    if (!target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  }

  const hidden = scrolledAway || suppressed;

  return (
    <button
      type="button"
      onClick={scrollToNext}
      aria-label="Scroll to explore journeys below"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
      className={`absolute bottom-14 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center justify-center gap-2 text-white/90 transition-all duration-300 hover:text-white sm:bottom-16 ${
        hidden
          ? "pointer-events-none translate-y-2 opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <span className="pl-[0.22em] text-center text-[0.65rem] leading-none tracking-[0.22em] text-white uppercase drop-shadow-sm">
        Explore
      </span>

      {/* Desktop mouse — fixed size, truly centered under label */}
      <span
        className="relative mx-auto hidden h-9 w-5 shrink-0 rounded-full border-2 border-white/70 bg-white/5 sm:block"
        aria-hidden
      >
        <span className="absolute top-1.5 left-1/2 h-1.5 w-0.5 -translate-x-1/2 rounded-full bg-white/90 motion-safe:animate-scroll-wheel" />
      </span>

      {/* Mobile chevron */}
      <span
        className="mx-auto flex size-5 shrink-0 items-center justify-center sm:hidden motion-safe:animate-scroll-bounce"
        aria-hidden
      >
        <svg
          viewBox="0 0 24 24"
          className="size-5 opacity-90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M6 9l6 6 6-6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
