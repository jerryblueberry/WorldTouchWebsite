import Image from "next/image";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import { bus, formatPrice } from "@/content";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: bus.metaTitle,
  description: bus.metaDescription,
  path: "/bus/",
  image: bus.heroImage,
});

export default function BusPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Bus", path: "/bus/" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "BusTrip",
            name: bus.title,
            description: bus.summary,
            provider: {
              "@type": "TravelAgency",
              name: siteConfig.name,
              telephone: siteConfig.phone,
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: bus.classes[0]?.priceFrom,
              url: `${siteConfig.url}/bus/`,
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: bus.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]}
      />
      <PageHero
        eyebrow="Daily bus"
        title="Kathmandu ↔ Pokhara, every morning"
        description={bus.summary}
        image={bus.heroImage}
        imageAlt={bus.heroAlt}
      />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="max-w-3xl space-y-4 leading-relaxed text-[color:var(--muted-ink)]">
          {bus.overview.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 grid gap-6 rounded-2xl bg-white p-6 ring-1 ring-[color:var(--line)] sm:grid-cols-3">
          <div>
            <p className="text-xs tracking-[0.16em] text-[color:var(--lagoon-ink)] uppercase">Highway</p>
            <p className="mt-2 font-medium">{bus.route.highway}</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.16em] text-[color:var(--lagoon-ink)] uppercase">Distance</p>
            <p className="mt-2 font-medium">{bus.route.distance}</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.16em] text-[color:var(--lagoon-ink)] uppercase">Time</p>
            <p className="mt-2 font-medium">{bus.route.duration}</p>
          </div>
        </div>
        <ul className="mt-6 space-y-2 text-sm text-[color:var(--muted-ink)]">
          {bus.route.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>

        <h2 className="mt-14 font-display text-3xl">Departures</h2>
        <div className="mt-6 overflow-x-auto rounded-2xl ring-1 ring-[color:var(--line)]">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-[color:var(--mist)] text-[color:var(--ink)]">
              <tr>
                <th className="px-4 py-3 font-medium">Direction</th>
                <th className="px-4 py-3 font-medium">Departs</th>
                <th className="px-4 py-3 font-medium">Arrives</th>
                <th className="px-4 py-3 font-medium">Pickup</th>
              </tr>
            </thead>
            <tbody>
              {bus.departures.map((row) => (
                <tr key={`${row.direction}-${row.departs}`} className="border-t border-[color:var(--line)] bg-white">
                  <td className="px-4 py-3">{row.direction}</td>
                  <td className="px-4 py-3">{row.departs}</td>
                  <td className="px-4 py-3">{row.arrives}</td>
                  <td className="px-4 py-3">{row.pickup}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-14 font-display text-3xl">Coaches</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {bus.classes.map((coach) => (
            <article key={coach.name} className="overflow-hidden rounded-2xl bg-white ring-1 ring-[color:var(--line)]">
              <div className="relative aspect-[16/10]">
                <Image src={coach.image} alt={coach.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl">{coach.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-ink)]">{coach.summary}</p>
                <p className="mt-3 font-semibold">From {formatPrice(coach.priceFrom)}</p>
                <ul className="mt-3 space-y-1 text-sm text-[color:var(--muted-ink)]">
                  {coach.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <h2 className="mt-14 font-display text-3xl">On board</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {bus.amenities.map((item) => (
            <li key={item} className="rounded-xl bg-white px-4 py-3 text-sm ring-1 ring-[color:var(--line)]">
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-14 font-display text-3xl">How the route feels</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-[color:var(--muted-ink)]">{bus.history}</p>

        <h2 className="mt-14 font-display text-3xl">Policies</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {bus.policies.map((policy) => (
            <div key={policy.title} className="rounded-2xl bg-white p-5 ring-1 ring-[color:var(--line)]">
              <h3 className="font-medium">{policy.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-ink)]">{policy.detail}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-display text-3xl">Questions</h2>
        <div className="mt-4 space-y-5">
          {bus.faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="font-medium">{faq.question}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[color:var(--muted-ink)]">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBand
        title="Reserve a seat"
        body="Tell us the date, direction, and whether you want a tourist, deluxe, or sofa seat."
      />
    </>
  );
}
