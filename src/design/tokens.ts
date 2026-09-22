/**
 * WorldTouch design tokens & hero rules
 * --------------------------------------
 * Single source of truth for brand color, type scale, and hero behavior.
 * CSS mirrors key values in `src/app/globals.css` as custom properties.
 */

export const colors = {
  /** Primary brand — premium navy */
  primary: "#0a2342",
  /** Primary on dark surfaces (hero CTAs, accents) */
  primaryOnDark: "#6eb6ef",
  /** Secondary — cool mist / soft surfaces */
  secondary: "#e7f1fa",
  /** Accent */
  accent: "#6eb6ef",
  accentInk: "#1a5f9e",
  /** Neutrals */
  ink: "#0a2342",
  muted: "#5c6d82",
  line: "#d4e2f0",
  surface: "#f4f7fb",
  white: "#ffffff",
  /** Hero text stack (always light on video) */
  heroText: "#ffffff",
  heroTextMuted: "rgba(255, 255, 255, 0.78)",
  heroTextSoft: "rgba(255, 255, 255, 0.62)",
  /** Scrim over video for legibility */
  heroScrimTop: "rgba(8, 28, 26, 0.55)",
  heroScrimBottom: "rgba(8, 28, 26, 0.88)",
} as const;

export const fonts = {
  /** UI / body — Outfit via next/font → `--font-sans` */
  sans: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
  /** Display / brand — Fraunces via next/font → `--font-display` */
  display: "var(--font-display), ui-serif, Georgia, serif",
} as const;

/** Type scale (rem). Use these names in components for consistency. */
export const typeScale = {
  /** Hero brand lockup */
  heroBrand: {
    primary: "clamp(2.125rem, 6.2vw, 4.75rem)",
    secondary: "clamp(0.7rem, 1.35vw, 0.95rem)",
    weight: 500,
    tracking: "-0.03em",
    secondaryTracking: "0.22em",
  },
  /** Main headline under brand */
  heroHeadline: {
    mobile: "1.125rem",
    desktop: "1.5rem",
    weight: 400,
    tracking: "-0.01em",
  },
  /** Supporting line / rotator */
  heroSupport: {
    mobile: "0.9375rem",
    desktop: "1.125rem",
    weight: 400,
  },
  /** Search input */
  heroSearch: {
    size: "0.9375rem",
    weight: 400,
  },
  /** Eyebrow / micro labels */
  eyebrow: {
    size: "0.6875rem",
    weight: 600,
    tracking: "0.18em",
  },
  body: {
    size: "1rem",
    leading: 1.65,
  },
  sectionTitle: {
    mobile: "1.75rem",
    desktop: "2.25rem",
  },
} as const;

export const heroRules = {
  /** Full viewport height, edge-to-edge media */
  minHeight: "100svh",
  /** Keep brand as the strongest first-viewport signal */
  brandFirst: true,
  /** Center the hero stack on all breakpoints */
  contentAlign: "center" as const,
  /** One headline + trust marks + search — no rotating gimmicks */
  contentBudget: ["brand", "headline", "rotator", "search", "quickLinks"] as const,
  /** White text only on hero media */
  textColor: colors.heroText,
  /** Video must cover section (object-cover) at full width/height */
  mediaObjectFit: "cover" as const,
  /** Never autoplay with sound */
  videoMuted: true,
  /** Respect reduced motion / data-saver: poster only */
  respectReducedMotion: true,
  /** Pause when off-screen to save CPU/battery */
  pauseWhenHidden: true,
  /** Cloudinary eco delivery — prefer transformed MP4 over raw .mov */
  preferOptimizedDelivery: true,
} as const;

export const heroCopy = {
  brand: "World Touch Tour and Travels",
  brandPrimary: "World Touch",
  brandSecondary: "Tour and Travels",
  headline: "Journeys that stay with you — long after the mountains fade.",
  /** Rotating lines — fade between; catch the eye without gimmicks */
  rotator: [
    "Stand on ridgelines most people only dream about",
    "Walk Everest & Annapurna with guides who call them home",
    "Travel Nepal at your pace — trek, tour, or scenic coach",
    "From Kathmandu mornings to Pokhara sunsets, handled with care",
  ],
  searchPlaceholder: "Where do you want to go in Nepal?",
  quickLinks: [
    { label: "Himalayan treks", href: "/treks/" },
    { label: "Nepal tours", href: "/tours/" },
    { label: "Kathmandu → Pokhara", href: "/bus/" },
  ],
} as const;

/** Cloudinary media — optimized delivery URLs (never hotlink raw .mov in prod). */
export const heroMedia = {
  cloudName: "dgsphdhns",
  publicId: "sushil2_gbwnph",
  version: "v1763720502",
  /**
   * Poster frame (still) — tiny payload, shows immediately.
   * `so_0` = first frame.
   */
  poster:
    "https://res.cloudinary.com/dgsphdhns/video/upload/so_0,w_1600,c_limit,q_auto,f_jpg/v1763720502/sushil2_gbwnph.jpg",
  /**
   * Mobile: capped width + eco quality H.264 MP4.
   */
  videoMobile:
    "https://res.cloudinary.com/dgsphdhns/video/upload/f_mp4,vc_h264,q_auto:eco,w_720,c_limit/v1763720502/sushil2_gbwnph.mp4",
  /**
   * Desktop: higher res still eco-encoded (far lighter than source .mov).
   */
  videoDesktop:
    "https://res.cloudinary.com/dgsphdhns/video/upload/f_mp4,vc_h264,q_auto:eco,w_1600,c_limit/v1763720502/sushil2_gbwnph.mp4",
} as const;
