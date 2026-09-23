"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export function ContactMap() {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setShowMap(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      className="border-t border-[color:var(--line)] bg-[color:var(--sand-cool)] py-12 sm:py-16"
      aria-labelledby="contact-map-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold tracking-[0.16em] text-[color:var(--lagoon-ink)] uppercase">
          Find us
        </p>
        <h2
          id="contact-map-heading"
          className="mt-2 font-display text-2xl tracking-tight text-[color:var(--ink)] sm:text-3xl"
        >
          World Touch Tour and Travels, Thamel
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[color:var(--muted-ink)]">
          {siteConfig.addressLine} · {siteConfig.hours}
        </p>
        <Link
          href={siteConfig.mapOpenUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block text-sm font-medium text-[color:var(--lagoon-ink)] hover:underline"
        >
          Open in Google Maps
        </Link>
        <div className="relative mt-6 overflow-hidden rounded-2xl bg-[color:var(--mist)] ring-1 ring-[color:var(--line)]">
          {!showMap ? (
            <div
              className="flex h-[min(450px,70vh)] w-full items-center justify-center text-sm text-[color:var(--muted-ink)]"
              aria-hidden
            >
              Loading map…
            </div>
          ) : (
            <iframe
              title="World Touch Tour and Travels, 1 Thamel Marg, Kathmandu"
              src={siteConfig.mapEmbed}
              className="h-[min(450px,70vh)] w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          )}
        </div>
      </div>
    </section>
  );
}
