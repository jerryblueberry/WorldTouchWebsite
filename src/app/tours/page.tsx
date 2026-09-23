import { PageHero } from "@/components/site/page-hero";
import { TourBrowser } from "@/components/tours/tour-browser";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import { tours } from "@/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Nepal Sightseeing Tours",
  description:
    "Kathmandu sightseeing, Pokhara lake days, and Chitwan wildlife tours — easy to pair with a Himalayan trek or the daily bus.",
  path: "/tours/",
  keywords: [
    "Nepal tours",
    "Kathmandu sightseeing",
    "Pokhara sightseeing",
    "Kathmandu heritage tour",
    "Chitwan tour",
  ],
});

export default function ToursPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Tours", path: "/tours/" },
        ])}
      />
      <PageHero
        eyebrow="Tours"
        title="Nepal, without the rush"
        description="City squares, a lake day in Pokhara, and the jungle at Chitwan. These tours stand alone or sit beside a trek and the daily bus."
        image="https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1800&q=80"
        imageAlt="Temple architecture in Kathmandu"
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <TourBrowser tours={tours} />
      </section>
    </>
  );
}
