import Link from "next/link";
import { GalleryBrowser } from "@/components/gallery/gallery-browser";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import { gallery } from "@/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: gallery.metaTitle,
  description: gallery.metaDescription,
  path: "/gallery/",
  image: gallery.heroImage,
  keywords: [
    "World Touch Tour and Travels photos",
    "Kathmandu Pokhara tourist bus",
    "Nepal vehicle rental",
    "Himalayan trek photos",
  ],
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery/" },
        ])}
      />
      <PageHero
        eyebrow="Gallery"
        title="Buses, rentals & the road to the mountains"
        description="Real photos from our tourist coaches, private hires, and the treks and tours they connect."
        image={gallery.heroImage}
        imageAlt={gallery.heroAlt}
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="max-w-3xl space-y-4 text-base leading-[1.75] text-[color:var(--muted-ink)]">
          {gallery.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
          <p className="text-sm">
            Need seats or a vehicle? See our{" "}
            <Link href="/bus/" className="font-medium text-[color:var(--lagoon-ink)] hover:underline">
              bus &amp; rental page
            </Link>{" "}
            or{" "}
            <Link href="/contact/" className="font-medium text-[color:var(--lagoon-ink)] hover:underline">
              contact the desk
            </Link>
            .
          </p>
        </div>
        <div className="mt-12">
          <GalleryBrowser gallery={gallery} />
        </div>
      </section>
      <CtaBand
        title="Plan your road days"
        body="Pokhara bus, Chitwan bus, or a private car, jeep, van, or coach — tell us your dates from Thamel."
      />
    </>
  );
}
