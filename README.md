# WorldTouch

Static, SEO-optimized travel & tour website built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

## Stack

- Next.js App Router with `output: "export"` (fully static HTML)
- Tailwind CSS v4 + shadcn/ui
- Metadata, Open Graph, `sitemap.xml`, `robots.txt`, and JSON-LD

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Static build

```bash
npm run build
```

Static files are emitted to the `out/` directory — ready for any static host (Netlify, Cloudflare Pages, S3, etc.).

## Site content

Edit tour and destination copy in:

- `src/data/tours.ts`
- `src/data/destinations.ts`
- `src/data/site.ts` (brand, contact, canonical URL)
