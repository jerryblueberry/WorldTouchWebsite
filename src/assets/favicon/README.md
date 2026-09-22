# Brand favicon source pack

Canonical production icons live in Next.js conventions:

| File | Role |
| --- | --- |
| `src/app/favicon.ico` | Browser tab / legacy |
| `src/app/icon.png` | Modern PNG favicon (32×32) |
| `src/app/apple-icon.png` | Apple touch icon (180×180) |
| `public/icons/icon-192.png` | PWA / Android |
| `public/icons/icon-512.png` | PWA / Android (any + maskable) |
| `src/app/manifest.ts` | Web app manifest |

Re-export or replace those paths when updating the brand mark. Keep this folder as the raw RealFaviconGenerator (or similar) export.
