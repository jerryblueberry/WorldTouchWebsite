import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import { formatPrice, getTour, tours } from "@/content";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/tours/[slug]">) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) return {};
  return buildMetadata({
    title: tour.metaTitle,
    description: tour.metaDescription,
    path: `/tours/${tour.slug}/`,
    image: tour.image,
  });
}

export default async function TourPage({
  params,
}: PageProps<"/tours/[slug]">) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Tours", path: "/tours/" },
            { name: tour.title, path: `/tours/${tour.slug}/` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            name: tour.title,
            description: tour.summary,
            image: tour.image,
            url: `${siteConfig.url}/tours/${tour.slug}/`,
            offers: {
              "@type": "Offer",
              price: tour.priceFrom,
              priceCurrency: tour.currency,
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: tour.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]}
      />
      <PageHero
        eyebrow={tour.category}
        title={tour.title}
        description={tour.summary}
        image={tour.image}
        imageAlt={tour.imageAlt}
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          {tour.overview.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="mt-4 leading-relaxed text-[color:var(--muted-ink)] first:mt-0"
            >
              {paragraph}
            </p>
          ))}
          <h2 className="mt-10 font-display text-2xl">Highlights</h2>
          <ul className="mt-3 space-y-2 text-sm text-[color:var(--muted-ink)]">
            {tour.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2 className="mt-10 font-display text-2xl">Plan</h2>
          <div className="mt-4 space-y-4">
            {tour.itinerary.map((item) => (
              <div key={item.title}>
                <p className="text-xs tracking-wide text-[color:var(--lagoon-ink)] uppercase">
                  {item.day}
                </p>
                <p className="font-medium">{item.title}</p>
                <p className="mt-1 text-sm text-[color:var(--muted-ink)]">{item.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl">Includes</h2>
              <ul className="mt-3 space-y-2 text-sm text-[color:var(--muted-ink)]">
                {tour.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl">Excludes</h2>
              <ul className="mt-3 space-y-2 text-sm text-[color:var(--muted-ink)]">
                {tour.excludes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <h2 className="mt-10 font-display text-2xl">Questions</h2>
          {tour.faqs.map((faq) => (
            <div key={faq.question} className="mt-4">
              <h3 className="font-medium">{faq.question}</h3>
              <p className="mt-1 text-sm text-[color:var(--muted-ink)]">{faq.answer}</p>
            </div>
          ))}
        </div>
        <aside className="h-fit rounded-2xl border border-[color:var(--line)] bg-white p-6 lg:sticky lg:top-24">
          <p className="text-xs tracking-[0.16em] text-[color:var(--muted-ink)] uppercase">From</p>
          <p className="mt-1 font-display text-4xl">{formatPrice(tour.priceFrom, tour.currency)}</p>
          <p className="mt-2 text-sm text-[color:var(--muted-ink)]">
            {tour.duration} · {tour.groupSize} · {tour.difficulty}
          </p>
          <Link
            href="/contact/"
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-[color:var(--ink)] text-sm font-medium text-white"
          >
            Inquire about this tour
          </Link>
        </aside>
      </section>
      <CtaBand title={tour.title} body="Tell us your hotel and dates. We will confirm the guide and vehicle." />
    </>
  );
}
