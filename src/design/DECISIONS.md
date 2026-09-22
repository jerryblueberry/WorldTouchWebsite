# World Touch Tour and Travels — design decisions

## Brand orientation

**World Touch Tour and Travels** is a Nepal-focused travel brand: Himalayan treks, guided tours, and practical transport (daily bus Kathmandu → Pokhara). The first viewport must read as **one centered composition** — brand, one message, search — over full-bleed video.

Nav / compact UI may use the short name **World Touch**.

## Color

| Token | Hex | Use |
| --- | --- | --- |
| Primary | `#0a2342` | Navy brand ink, buttons on light surfaces |
| Primary on dark | `#6eb6ef` | Hero CTAs, accents on video |
| Secondary | `#e7f1fa` | Soft section backgrounds |
| Accent | `#6eb6ef` | Highlights, focus rings |
| Hero text | `#ffffff` | All hero copy (never dark text on video) |
| Hero muted | `rgba(255,255,255,0.90)` | Support / rotator |

Do **not** introduce purple gradients, cream+terracotta, or dark-mode-first hero treatments.

## Typography

| Role | Family | Notes |
| --- | --- | --- |
| Display / brand | **Fraunces** (`--font-display`) | Hero wordmark + section titles |
| Body / UI | **Outfit** (`--font-sans`) | Nav, search, paragraphs |

Hero scale (responsive; long brand name):

- Brand: ~30px mobile → ~60px desktop (wraps cleanly, centered)
- Headline: ~16px → ~24px
- Support / rotator: ~15px → ~18px
- Search: 15px

## Hero section rules

1. **Full-bleed video** — covers 100% width and `100svh` height (`object-cover`).
2. **Brand first** — full company name is the strongest text signal; headline must not overpower it.
3. **Center aligned** — brand, headline, rotator, search, and quick links are centered on all breakpoints.
4. **Content budget** — brand, headline, rotating line, search, optional quick links only.
5. **Visibility** — stronger video scrim + light text shadow (`hero-text-glow`) so white type stays readable on bright frames.
6. **Video performance** — eco MP4, muted, poster-first, pause off-screen, respect reduced motion / Save-Data.
7. **Search** — glass panel, high contrast, centered under the copy stack.

## Source of truth

Runtime tokens: `src/design/tokens.ts`  
CSS variables: `src/app/globals.css`
