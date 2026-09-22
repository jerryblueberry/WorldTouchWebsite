"use client";

import { useEffect, useRef, useState } from "react";
import { heroMedia, heroRules } from "@/design/tokens";

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function prefersSaveData() {
  if (typeof navigator === "undefined") return false;
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean };
    }
  ).connection;
  return Boolean(connection?.saveData);
}

function isMobileViewport() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(max-width: 768px)").matches;
}

/**
 * Full-bleed background video — eco MP4 from Cloudinary.
 * Loads only when visible; pauses off-screen; poster-only for reduced motion / Save-Data.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || prefersSaveData()) {
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setShouldLoad(true);
          setSrc(isMobileViewport() ? heroMedia.videoMobile : heroMedia.videoDesktop);
          void videoRef.current?.play().catch(() => {
            /* Autoplay can fail; poster remains visible. */
          });
        } else if (heroRules.pauseWhenHidden) {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.15, rootMargin: "80px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || !src) return;
    const video = videoRef.current;
    if (!video) return;
    video.load();
    void video.play().catch(() => undefined);
  }, [shouldLoad, src]);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Poster always present — instant paint, no layout shift */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={heroMedia.poster}
        alt=""
        className="absolute inset-0 size-full object-cover"
        fetchPriority="high"
        decoding="async"
      />

      {shouldLoad && src ? (
        <video
          ref={videoRef}
          className="absolute inset-0 size-full object-cover"
          poster={heroMedia.poster}
          muted={heroRules.videoMuted}
          playsInline
          loop
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}

      {/* Legibility scrim — consistent with design tokens */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,28,26,0.5)_0%,rgba(8,28,26,0.28)_38%,rgba(8,28,26,0.55)_72%,rgba(243,246,245,0.92)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.32)_0%,transparent_68%)]" />
    </div>
  );
}
