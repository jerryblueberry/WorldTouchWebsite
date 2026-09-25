import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import { bus } from "@/content";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: bus.metaTitle,
  description: bus.metaDescription,
  path: "/bus/",
  image: bus.heroImage,
  keywords: [
    "Kathmandu to Pokhara bus",
    "Kathmandu to Chitwan bus",
    "Pokhara to Kathmandu bus",
    "Nepal car rental with driver",
    "jeep van microbus hire Kathmandu",
    "tourist bus Nepal",
  ],
});

export default function BusPage() {
  const pokharaRoute = bus.routes.find((r) => r.id === "pokhara") ?? bus.routes[0];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Bus & Rental", path: "/bus/" },
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
        eyebrow="Tourist coaches & private hire"
        title={bus.title}
        description={bus.summary}
        image={bus.heroImage}
        imageAlt={bus.heroAlt}
      />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-start">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-[0.18em] text-[color:var(--lagoon-ink)] uppercase">
              Overland travel
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-[color:var(--ink)] sm:text-4xl">
              Tourist buses &amp; Thamel bookings
            </h2>
            <div className="mt-6 space-y-4 text-[0.98rem] leading-[1.75] text-[color:var(--muted-ink)] sm:text-base">
              {bus.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <Link
              href="/gallery/"
              className="mt-6 inline-flex text-sm font-medium text-[color:var(--lagoon-ink)] underline-offset-4 hover:underline"
            >
              View photo gallery — buses, rentals &amp; journeys
            </Link>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-2xl bg-white p-6 ring-1 ring-[color:var(--line)] sm:p-7">
              <p className="text-xs font-semibold tracking-[0.16em] text-[color:var(--lagoon-ink)] uppercase">
                {pokharaRoute.title}
              </p>
              <p className="mt-1 text-sm text-[color:var(--muted-ink)]">
                {pokharaRoute.tagline}
              </p>
              <dl className="mt-5 grid gap-5 border-b border-[color:var(--line)] pb-6">
                <div>
                  <dt className="text-xs tracking-[0.14em] text-[color:var(--muted-ink)] uppercase">
                    Highway
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium leading-snug text-[color:var(--ink)]">
                    {pokharaRoute.highway}
                  </dd>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-xs tracking-[0.14em] text-[color:var(--muted-ink)] uppercase">
                      Distance
                    </dt>
                    <dd className="mt-1.5 text-sm font-medium text-[color:var(--ink)]">
                      {pokharaRoute.distance}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs tracking-[0.14em] text-[color:var(--muted-ink)] uppercase">
                      Time
                    </dt>
                    <dd className="mt-1.5 text-sm font-medium text-[color:var(--ink)]">
                      {pokharaRoute.duration}
                    </dd>
                  </div>
                </div>
              </dl>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-[color:var(--muted-ink)]">
                {pokharaRoute.notes.map((note) => (
                  <li key={note} className="flex gap-2.5">
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-[color:var(--lagoon)]"
                      aria-hidden
                    />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {bus.routes.map((route) => (
          <div key={route.id} className="mt-16 sm:mt-20">
            <h2 className="font-display text-3xl tracking-tight text-[color:var(--ink)]">
              {route.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[color:var(--muted-ink)]">
              {route.tagline} · {route.distance} · {route.duration}
            </p>
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
                  {route.departures.map((row) => (
                    <tr
                      key={`${route.id}-${row.direction}-${row.departs}`}
                      className="border-t border-[color:var(--line)] bg-white"
                    >
                      <td className="px-4 py-3">{row.direction}</td>
                      <td className="px-4 py-3">{row.departs}</td>
                      <td className="px-4 py-3">{row.arrives}</td>
                      <td className="px-4 py-3">{row.pickup}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {route.notes.map((note) => (
                <li
                  key={note}
                  className="rounded-xl bg-[color:var(--sand-cool)]/80 px-3 py-2 text-sm text-[color:var(--muted-ink)]"
                >
                  {note}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <h2 className="mt-16 font-display text-3xl tracking-tight text-[color:var(--ink)] sm:mt-20">
          Vehicle rental with driver
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[color:var(--muted-ink)]">
          Private hire from Kathmandu — quoted per route or day. Tell us passengers,
          luggage, and whether you need Pokhara, Chitwan, valley sightseeing, or a
          multi-day loop.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bus.rentals.map((vehicle) => (
            <article
              key={vehicle.name}
              className="overflow-hidden rounded-2xl bg-white ring-1 ring-[color:var(--line)]"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={vehicle.image}
                  alt={vehicle.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl text-[color:var(--ink)]">
                  {vehicle.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-ink)]">
                  {vehicle.summary}
                </p>
                <ul className="mt-3 space-y-1 text-sm text-[color:var(--muted-ink)]">
                  {vehicle.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <h2 className="mt-16 font-display text-3xl tracking-tight text-[color:var(--ink)] sm:mt-20">
          The coach
        </h2>
        <div className="mt-6 grid gap-6">
          {bus.classes.map((coach) => (
            <article
              key={coach.name}
              className="overflow-hidden rounded-2xl bg-white ring-1 ring-[color:var(--line)] lg:grid lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[280px]">
                <Image
                  src={coach.image}
                  alt={coach.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col justify-center p-5 sm:p-7">
                <h3 className="font-display text-2xl">{coach.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-ink)]">
                  {coach.summary}
                </p>
                <ul className="mt-4 space-y-1.5 text-sm text-[color:var(--muted-ink)]">
                  {coach.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <h2 className="mt-16 font-display text-3xl tracking-tight text-[color:var(--ink)] sm:mt-20">
          On the road
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[color:var(--muted-ink)]">
          {bus.history}{" "}
          <Link href="/gallery/" className="font-medium text-[color:var(--lagoon-ink)] hover:underline">
            More photos in the gallery
          </Link>
          .
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bus.gallery.map((item) => (
            <figure
              key={item.image}
              className="overflow-hidden rounded-2xl bg-white ring-1 ring-[color:var(--line)]"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <figcaption className="p-4 text-sm leading-relaxed text-[color:var(--muted-ink)]">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <h2 className="mt-16 font-display text-3xl tracking-tight text-[color:var(--ink)] sm:mt-20">
          On board &amp; hire
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {bus.amenities.map((item) => (
            <li
              key={item}
              className="rounded-xl bg-white px-4 py-3 text-sm ring-1 ring-[color:var(--line)]"
            >
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-16 font-display text-3xl tracking-tight text-[color:var(--ink)] sm:mt-20">
          Policies
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {bus.policies.map((policy) => (
            <div
              key={policy.title}
              className="rounded-2xl bg-white p-5 ring-1 ring-[color:var(--line)]"
            >
              <h3 className="font-medium">{policy.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-ink)]">
                {policy.detail}
              </p>
            </div>
          ))}
        </div>

        <h2 className="mt-16 font-display text-3xl tracking-tight text-[color:var(--ink)] sm:mt-20">
          Questions
        </h2>
        <div className="mt-4 space-y-5">
          {bus.faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="font-medium">{faq.question}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[color:var(--muted-ink)]">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
      <CtaBand
        title="Reserve a seat or a vehicle"
        body="Pokhara bus, Chitwan bus, or rental car, jeep, van, microbus, or coach — tell us dates and pickup from Thamel."
      />
    </>
  );
}
