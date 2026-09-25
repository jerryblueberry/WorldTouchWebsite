import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { HomeHero } from "@/components/home/hero";
import { RevealOnScroll } from "@/components/home/reveal-on-scroll";
import { CardCarousel } from "@/components/site/card-carousel";
import { CtaBand } from "@/components/site/cta-band";
import { OfferCard } from "@/components/site/offer-card";
import { JsonLd, servicesJsonLd } from "@/components/seo/json-ld";
import { getFeaturedTours, getFeaturedTreks } from "@/content";
import { bus } from "@/content";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${siteConfig.name} | Himalayan Treks, Nepal Tours & Pokhara Bus`,
  description: siteConfig.description,
  path: "/",
  absolute: true,
  keywords: siteConfig.keywords,
});

const paths = [
  {
    href: "/treks/",
    index: "01",
    title: "Treks",
    body: "Everest, Annapurna, Langtang, and quieter trails — guided from Kathmandu.",
    image:
      "https://res.cloudinary.com/dgsphdhns/image/upload/v1790269797/WhatsApp_Image_2026-09-24_at_16.59.15_gn2esy.jpg",
    imageAlt: "Trekker at the Everest Base Camp marker at 5,364 m",
  },
  {
    href: "/tours/",
    index: "02",
    title: "Tours",
    body: "Heritage days, Pokhara, and Chitwan, paced for first visits and layover days.",
    image:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Temple architecture in Kathmandu",
  },
  {
    href: "/bus/",
    index: "03",
    title: "Bus & Rental",
    body: "Daily Kathmandu–Pokhara and Kathmandu–Chitwan tourist coaches, plus private car, jeep, and van hire.",
    image: bus.heroImage,
    imageAlt: bus.heroAlt,
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
      <JsonLd data={servicesJsonLd()} />
      <HomeHero />

      <section
        id="journeys"
        className="scroll-mt-20 border-t border-[color:var(--line)] bg-[color:var(--sand-cool)] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <RevealOnScroll>
            <p className="text-xs font-semibold tracking-[0.18em] text-[color:var(--lagoon-ink)] uppercase">
              Ways to travel
            </p>
            <h2 className="mt-2 max-w-xl font-display text-3xl tracking-tight text-[color:var(--ink)] sm:text-4xl">
              Treks, tours, and coaches to Pokhara &amp; Chitwan
            </h2>
          </RevealOnScroll>
          <div className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-3 md:gap-6">
            {paths.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_50px_-28px_rgba(10,35,66,0.45)] ring-1 ring-[color:var(--line)] transition duration-500 hover:-translate-y-1"
              >
                <span className="relative block aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-white/92 px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.16em] text-[color:var(--ink)]">
                    {item.index}
                  </span>
                </span>
                <span className="flex flex-1 flex-col p-5 sm:p-6">
                  <span className="font-display text-2xl tracking-tight text-[color:var(--ink)]">
                    {item.title}
                  </span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-[color:var(--muted-ink)]">
                    {item.body}
                  </span>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[color:var(--lagoon-ink)]">
                    Explore
                    <ArrowUpRight className="size-3.5 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
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
            Pokhara &amp; Chitwan, every morning
          </h2>
          <p className="mt-4 leading-relaxed text-[color:var(--muted-ink)]">
            {bus.summary}
          </p>
          <Link
            href="/bus/"
            className="mt-6 inline-flex text-sm font-medium text-[color:var(--lagoon-ink)] underline-offset-4 hover:underline"
          >
            See times and coaches
          </Link>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {bus.routes
            .flatMap((route) => route.departures.slice(0, 2))
            .slice(0, 4)
            .map((row) => (
            <li
              key={`${row.direction}-${row.departs}-${row.pickup}`}
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
