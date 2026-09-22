import Link from "next/link";
import { Bus, Compass, Mountain } from "lucide-react";
import { HomeHero } from "@/components/home/hero";
import { RevealOnScroll } from "@/components/home/reveal-on-scroll";
import { CardCarousel } from "@/components/site/card-carousel";
import { CtaBand } from "@/components/site/cta-band";
import { OfferCard } from "@/components/site/offer-card";
import { formatPrice, getFeaturedTours, getFeaturedTreks } from "@/content";
import { bus } from "@/content";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/",
});

const paths = [
  {
    href: "/treks/",
    title: "Treks",
    body: "Everest, Annapurna, Langtang, and quieter trails — guided from Kathmandu.",
    icon: Mountain,
  },
  {
    href: "/tours/",
    title: "Tours",
    body: "Heritage days, Pokhara, and Chitwan, paced for first visits and layover days.",
    icon: Compass,
  },
  {
    href: "/bus/",
    title: "KTM ↔ Pokhara bus",
    body: "Daily tourist coaches both ways, with reserved seats and a known pickup.",
    icon: Bus,
  },
];

const reasons = [
  {
    title: "Kathmandu desk",
    body: "Briefings, permits, and bus seats are arranged in Thamel before you leave the city.",
  },
  {
    title: "Licensed guiding",
    body: "Treks run with licensed guides. Restricted areas are never offered as a shortcut.",
  },
  {
    title: "One itinerary",
    body: "Trek, city days, and the Pokhara bus can sit on the same plan instead of three vendors.",
  },
  {
    title: "Straight answers",
    body: "We tell you when a route is too hard, a pass is closed, or a same-day bus is full.",
  },
];

export default function HomePage() {
  const featuredTreks = getFeaturedTreks();
  const featuredTours = getFeaturedTours();

  return (
    <>
      <HomeHero />

      <section id="journeys" className="scroll-mt-20 bg-[color:var(--sand-cool)] py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-3 sm:px-6">
          {paths.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl bg-white p-5 ring-1 ring-[color:var(--line)] transition hover:-translate-y-0.5"
            >
              <item.icon className="size-5 text-[color:var(--lagoon-ink)]" aria-hidden />
              <h2 className="mt-4 font-display text-2xl text-[color:var(--ink)]">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-ink)]">
                {item.body}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <RevealOnScroll>
          <p className="text-xs font-semibold tracking-[0.18em] text-[color:var(--lagoon-ink)] uppercase">
            Featured treks
          </p>
          <h2 className="mt-2 font-display text-3xl text-[color:var(--ink)] sm:text-4xl">
            Routes we are asked for most
          </h2>
        </RevealOnScroll>
        <div className="mt-8">
          <CardCarousel label="treks">
            {featuredTreks.map((trek) => (
              <div
                key={trek.slug}
                className="w-[min(86vw,320px)] shrink-0 snap-start"
              >
                <OfferCard
                  href={`/treks/${trek.slug}/`}
                  title={trek.title}
                  summary={trek.summary}
                  image={trek.image}
                  imageAlt={trek.imageAlt}
                  meta={trek.duration}
                  priceFrom={trek.priceFrom}
                  currency={trek.currency}
                  kicker={trek.region}
                />
              </div>
            ))}
          </CardCarousel>
        </div>
      </section>

      <section className="border-y border-[color:var(--line)] bg-[color:var(--mist)]/70 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <RevealOnScroll>
            <p className="text-xs font-semibold tracking-[0.18em] text-[color:var(--lagoon-ink)] uppercase">
              Featured tours
            </p>
            <h2 className="mt-2 font-display text-3xl text-[color:var(--ink)] sm:text-4xl">
              Days in the valley, the lake, and the jungle
            </h2>
          </RevealOnScroll>
          <div className="mt-8">
            <CardCarousel label="tours">
              {featuredTours.map((tour) => (
                <div
                  key={tour.slug}
                  className="w-[min(86vw,320px)] shrink-0 snap-start"
                >
                  <OfferCard
                    href={`/tours/${tour.slug}/`}
                    title={tour.title}
                    summary={tour.summary}
                    image={tour.image}
                    imageAlt={tour.imageAlt}
                    meta={tour.duration}
                    priceFrom={tour.priceFrom}
                    currency={tour.currency}
                    kicker={tour.category}
                  />
                </div>
              ))}
            </CardCarousel>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-[color:var(--lagoon-ink)] uppercase">
            Daily bus
          </p>
          <h2 className="mt-2 font-display text-3xl text-[color:var(--ink)] sm:text-4xl">
            Kathmandu and Pokhara, both mornings
          </h2>
          <p className="mt-4 leading-relaxed text-[color:var(--muted-ink)]">
            {bus.summary} Tourist seats from {formatPrice(bus.classes[0]?.priceFrom ?? 18)}.
          </p>
          <Link
            href="/bus/"
            className="mt-6 inline-flex text-sm font-medium text-[color:var(--lagoon-ink)] underline-offset-4 hover:underline"
          >
            See times, coaches, and prices
          </Link>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {bus.departures.slice(0, 4).map((row) => (
            <li
              key={`${row.direction}-${row.departs}`}
              className="rounded-2xl bg-white p-4 ring-1 ring-[color:var(--line)]"
            >
              <p className="text-xs tracking-wide text-[color:var(--lagoon-ink)] uppercase">
                {row.direction}
              </p>
              <p className="mt-2 font-display text-2xl text-[color:var(--ink)]">
                {row.departs}
              </p>
              <p className="text-sm text-[color:var(--muted-ink)]">{row.duration}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-[color:var(--ink)] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl sm:text-4xl">Why travelers stay with us</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason) => (
              <div key={reason.title} className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/10">
                <h3 className="font-display text-xl">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{reason.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-white/60">
            {siteConfig.trust.years} years · {siteConfig.trust.travelers} travelers ·{" "}
            {siteConfig.trust.registrations.join(" · ")}
          </p>
        </div>
      </section>

      <CtaBand
        title="Tell us the dates. We will shape the rest."
        body="A trek, a valley day, a bus seat — or all three. Write from Kathmandu time and we reply within a business day."
      />
    </>
  );
}
