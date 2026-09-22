import { PageHero } from "@/components/site/page-hero";
import { TourBrowser } from "@/components/tours/tour-browser";
import { tours } from "@/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Nepal Tours",
  description:
    "Kathmandu heritage tours, Pokhara days, and Chitwan wildlife stays arranged by World Touch Tour and Travels.",
  path: "/tours/",
});

export default function ToursPage() {
  return (
    <>
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
