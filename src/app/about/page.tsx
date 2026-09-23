import { PageHero } from "@/components/site/page-hero";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Our Kathmandu Team",
  description:
    "World Touch Tour and Travels plans Himalayan treks, Kathmandu and Pokhara sightseeing, and the daily tourist bus from a Thamel desk.",
  path: "/about/",
  keywords: [
    "Kathmandu trekking company",
    "Nepal tour operator",
    "World Touch Tour and Travels",
  ],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about/" },
        ])}
      />
      <PageHero
        eyebrow="About"
        title="A Thamel desk that still answers the phone"
        description="We plan Himalayan treks, valley days, and the morning bus to Pokhara for travelers who want one local team instead of a chain of agents."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2">
        <div className="space-y-4 leading-relaxed text-[color:var(--muted-ink)]">
          <p>
            World Touch started as a trekking desk in Kathmandu and grew into the
            thing guests actually needed: permits in the morning, a honest opinion
            about fitness, and a reserved seat when the trek ends in Pokhara.
          </p>
          <p>
            The people you meet are Nepali guides and office staff. English is the
            working language of the briefings because most of our guests fly in
            from elsewhere.
          </p>
          <p>
            We are registered for tourism work in Nepal and operate with TAAN-aligned
            guiding practice. Restricted areas are sold only with the permits the
            rules require.
          </p>
        </div>
        <dl className="grid gap-4 sm:grid-cols-2">
          {[
            ["Years", siteConfig.trust.years],
            ["Travelers", siteConfig.trust.travelers],
            ["Base", "Thamel, Kathmandu"],
            ["Also", "Daily KTM–Pokhara bus"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-white p-5 ring-1 ring-[color:var(--line)]">
              <dt className="text-xs tracking-[0.16em] text-[color:var(--lagoon-ink)] uppercase">
                {label}
              </dt>
              <dd className="mt-2 font-display text-2xl text-[color:var(--ink)]">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
