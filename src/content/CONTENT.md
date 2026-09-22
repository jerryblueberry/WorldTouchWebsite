# Content guide

Edit copy here. Pages read these files at build time — no CMS.

| File | What it feeds |
| --- | --- |
| `src/content/treks.json` | `/treks` and `/treks/[slug]`, home carousel |
| `src/content/tours.json` | `/tours` and `/tours/[slug]`, home carousel |
| `src/content/bus.json` | `/bus` and the home schedule teaser |
| `src/data/site.ts` | Name, phone, WhatsApp, Thamel address, trust figures |

## Add a trek or tour

1. Copy an existing object in the JSON array.
2. Set a unique `slug` (this becomes the URL).
3. Set `featured: true` to show it in the home carousel.
4. Write a unique `overview` — do not duplicate another trek’s paragraphs.
5. Fill `metaTitle` and `metaDescription` for that page only.
6. Run `npm run build`.

## Voice

Kathmandu company, international readers. Concrete (permits, hours, highway) over slogans. Prices are “from” in USD.

## Images

Remote URLs are fine while the site uses static export (`images.unoptimized`). Swap in your own Cloudinary or `/public` photos by changing the `image` fields.
