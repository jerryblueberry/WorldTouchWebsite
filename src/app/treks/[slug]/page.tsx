import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/page-hero";
import { CtaBand } from "@/components/site/cta-band";
import { OfferCard } from "@/components/site/offer-card";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import {
  getRelatedTreks,
  getTrek,
  treks,
} from "@/content";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";

export function generateStaticParams() {
  return treks.map((trek) => ({ slug: trek.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/treks/[slug]">) {
  const { slug } = await params;
  const trek = getTrek(slug);
  if (!trek) return {};
  return buildMetadata({
    title: trek.metaTitle,
    description: trek.metaDescription,
    path: `/treks/${trek.slug}/`,
    image: trek.image,
    keywords: [
      trek.title,
      `${trek.region} trek`,
      "Nepal trekking",
      "Himalayas",
      "Kathmandu",
    ],
  });
}

export default async function TrekPage({
  params,
}: PageProps<"/treks/[slug]">) {
  const { slug } = await params;
  const trek = getTrek(slug);
  if (!trek) notFound();
  const related = getRelatedTreks(trek.slug);

  const facts = [
    ["Duration", trek.duration],
    ["Max altitude", trek.maxAltitude],
    ["Difficulty", trek.difficulty],
    ["Best season", trek.bestSeason],
    ["Group size", trek.groupSize],
    ["Starts", trek.startPoint],
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Treks", path: "/treks/" },
            { name: trek.title, path: `/treks/${trek.slug}/` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            name: trek.title,
            description: trek.summary,
            image: trek.image,
            url: `${siteConfig.url}/treks/${trek.slug}/`,
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: trek.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]}
      />
      <PageHero
        eyebrow={trek.region}
        title={trek.title}
        description={trek.summary}
        image={trek.image}
        imageAlt={trek.imageAlt}
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          {trek.overview.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="mt-4 leading-relaxed text-[color:var(--muted-ink)] first:mt-0"
            >
              {paragraph}
            </p>
          ))}
          <h2 className="mt-10 font-display text-2xl text-[color:var(--ink)]">
            Itinerary
          </h2>
          <div className="mt-4 divide-y divide-[color:var(--line)]">
            {trek.itinerary.map((day) => (
              <details key={day.day} className="group py-3" open>
                <summary className="cursor-pointer list-none font-medium text-[color:var(--ink)]">
                  <span className="mr-2 text-xs tracking-wide text-[color:var(--lagoon-ink)] uppercase">
                    {day.day}
                  </span>
                  {day.title}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-ink)]">
                  {day.detail}
                </p>
              </details>
            ))}
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl">Includes</h2>
              <ul className="mt-3 space-y-2 text-sm text-[color:var(--muted-ink)]">
                {trek.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl">Excludes</h2>
              <ul className="mt-3 space-y-2 text-sm text-[color:var(--muted-ink)]">
                {trek.excludes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <h2 className="mt-10 font-display text-2xl">Permits</h2>
          <ul className="mt-3 space-y-2 text-sm text-[color:var(--muted-ink)]">
            {trek.permits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2 className="mt-10 font-display text-2xl">Packing notes</h2>
          <ul className="mt-3 space-y-2 text-sm text-[color:var(--muted-ink)]">
            {trek.packing.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2 className="mt-10 font-display text-2xl">Questions</h2>
          <div className="mt-4 space-y-4">
            {trek.faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-medium text-[color:var(--ink)]">{faq.question}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[color:var(--muted-ink)]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
        <aside className="h-fit rounded-2xl border border-[color:var(--line)] bg-white p-6 lg:sticky lg:top-24">
          <dl className="space-y-3 text-sm">
            {facts.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4">
                <dt className="text-[color:var(--muted-ink)]">{label}</dt>
                <dd className="text-right font-medium text-[color:var(--ink)]">{value}</dd>
              </div>
            ))}
          </dl>
          <Link
            href="/contact/"
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-[color:var(--ink)] text-sm font-medium text-white"
          >
            Inquire about this trek
          </Link>
        </aside>
      </section>
      {related.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <h2 className="font-display text-3xl text-[color:var(--ink)]">Related treks</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <OfferCard
                key={item.slug}
                href={`/treks/${item.slug}/`}
                title={item.title}
                summary={item.summary}
                image={item.image}
                imageAlt={item.imageAlt}
                meta={item.duration}
                kicker={item.region}
              />
            ))}
          </div>
        </section>
      ) : null}
      <CtaBand
        title={`Ask about ${trek.title}`}
        body="Share your dates and group size. We will confirm season, flights, and whether this route fits."
      />
    </>
  );
}
