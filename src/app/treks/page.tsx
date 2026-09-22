import { PageHero } from "@/components/site/page-hero";
import { TrekBrowser } from "@/components/treks/trek-browser";
import { treks } from "@/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Nepal Treks",
  description:
    "Guided treks in Nepal from a Kathmandu team — Everest Base Camp, Annapurna, Langtang, Manaslu, and shorter Pokhara trails.",
  path: "/treks/",
});

export default function TreksPage() {
  return (
    <>
      <PageHero
        eyebrow="Treks"
        title="Himalayan treks, arranged in Kathmandu"
        description="Every route below is run with a licensed guide, teahouse lodging, and permits sorted before you leave the city. Filter by region or difficulty, then read the day-by-day plan."
        image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=80"
        imageAlt="High mountain ridge in Nepal"
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="max-w-3xl text-[color:var(--muted-ink)] leading-relaxed">
          <p>
            Trekking in Nepal is still a walking holiday with a roof each night — not an
            expedition, unless you choose one. Autumn and spring are the clear seasons.
            Monsoon greens the trails and hides the peaks. Winter is quiet and cold above
            the tree line.
          </p>
          <p className="mt-4">
            World Touch is based in Thamel. That matters for permits, Lukla flights, and
            the morning you need a seat to Pokhara before Annapurna Base Camp or Poon Hill.
            Prices shown are per person from, in a small group, and shift with season and
            hotel standard in Kathmandu.
          </p>
        </div>
        <div className="mt-10">
          <TrekBrowser treks={treks} />
        </div>
      </section>
    </>
  );
}
