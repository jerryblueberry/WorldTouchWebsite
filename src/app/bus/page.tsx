import Image from "next/image";
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
    "Pokhara to Kathmandu bus",
    "daily tourist bus Nepal",
    "Kathmandu Pokhara tourist coach",
  ],
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

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-start">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-[0.18em] text-[color:var(--lagoon-ink)] uppercase">
              The journey
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-[color:var(--ink)] sm:text-4xl">
              Scenic road to Pokhara
            </h2>
            <div className="mt-6 space-y-4 text-[0.98rem] leading-[1.75] text-[color:var(--muted-ink)] sm:text-base">
              {bus.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-2xl bg-white p-6 ring-1 ring-[color:var(--line)] sm:p-7">
              <p className="text-xs font-semibold tracking-[0.16em] text-[color:var(--lagoon-ink)] uppercase">
                Route at a glance
              </p>
              <dl className="mt-5 grid gap-5 border-b border-[color:var(--line)] pb-6 sm:grid-cols-3 lg:grid-cols-1">
                <div>
                  <dt className="text-xs tracking-[0.14em] text-[color:var(--muted-ink)] uppercase">
                    Highway
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium leading-snug text-[color:var(--ink)]">
                    {bus.route.highway}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.14em] text-[color:var(--muted-ink)] uppercase">
                    Distance
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium text-[color:var(--ink)]">
                    {bus.route.distance}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.14em] text-[color:var(--muted-ink)] uppercase">
                    Time
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium text-[color:var(--ink)]">
                    {bus.route.duration}
                  </dd>
                </div>
              </dl>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-[color:var(--muted-ink)]">
                {bus.route.notes.map((note) => (
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

        <h2 className="mt-16 font-display text-3xl tracking-tight text-[color:var(--ink)] sm:mt-20">
          Departures
        </h2>
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

        <h2 className="mt-16 font-display text-3xl tracking-tight text-[color:var(--ink)] sm:mt-20">
          The coach
        </h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {bus.classes.map((coach) => (
            <article
              key={coach.name}
              className="overflow-hidden rounded-2xl bg-white ring-1 ring-[color:var(--line)] lg:col-span-2 lg:grid lg:grid-cols-2"
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
          Trishuli River bends, hill terraces, and — when the clouds lift — Himalayan
          skylines toward Pokhara.
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
          On board
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {bus.amenities.map((item) => (
            <li key={item} className="rounded-xl bg-white px-4 py-3 text-sm ring-1 ring-[color:var(--line)]">
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-16 font-display text-3xl tracking-tight text-[color:var(--ink)] sm:mt-20">
          How the route feels
        </h2>
        <p className="mt-4 max-w-3xl leading-[1.75] text-[color:var(--muted-ink)]">
          {bus.history}
        </p>

        <h2 className="mt-16 font-display text-3xl tracking-tight text-[color:var(--ink)] sm:mt-20">
          Policies
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {bus.policies.map((policy) => (
            <div key={policy.title} className="rounded-2xl bg-white p-5 ring-1 ring-[color:var(--line)]">
              <h3 className="font-medium">{policy.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-ink)]">{policy.detail}</p>
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
              <p className="mt-1 text-sm leading-relaxed text-[color:var(--muted-ink)]">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBand
        title="Reserve a seat"
        body="Tell us the date, direction, and pickup hotel — we confirm your AC tourist coach and reserved sofa seat."
      />
    </>
  );
}
