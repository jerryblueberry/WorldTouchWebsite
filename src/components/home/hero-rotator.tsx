"use client";

import { useEffect, useState } from "react";
import { heroCopy } from "@/design/tokens";

/**
 * Soft crossfade rotator — one line at a time, no decorative gimmicks.
 */
export function HeroRotator() {
  const phrases = heroCopy.rotator;
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced || phrases.length < 2) return;

    let fadeTimeout: number | undefined;
    const id = window.setInterval(() => {
      setVisible(false);
      fadeTimeout = window.setTimeout(() => {
        setIndex((current) => (current + 1) % phrases.length);
        setVisible(true);
      }, 320);
    }, 3600);

    return () => {
      window.clearInterval(id);
      if (fadeTimeout) window.clearTimeout(fadeTimeout);
    };
  }, [reduced, phrases.length]);

  const active = phrases[index] ?? phrases[0];

  return (
    <div
      className="flex min-h-[2.5rem] w-full max-w-xl items-center justify-center px-3 sm:min-h-[2.75rem]"
      aria-live="polite"
    >
      <p
        className={`text-center text-[0.9375rem] leading-snug text-balance text-white/90 transition-all duration-300 ease-out sm:text-base ${
          visible ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
        }`}
      >
        {active}
      </p>
    </div>
  );
}
