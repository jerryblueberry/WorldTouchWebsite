import { ContactForm } from "@/components/contact/contact-form";
import { ContactMap } from "@/components/contact/contact-map";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";

export const metadata = buildMetadata({
  title: "Contact Our Kathmandu Desk",
  description:
    "Write or call World Touch at 1 Thamel Marg, Kathmandu for Himalayan treks, sightseeing tours, and daily Kathmandu–Pokhara bus seats.",
  path: "/contact/",
  keywords: [
    "Kathmandu travel agency contact",
    "book Nepal trek",
    "Kathmandu Pokhara bus booking",
  ],
});

export default function ContactPage() {
  return (
    <div className="pt-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact/" },
        ])}
      />
      <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:pb-16">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-[color:var(--lagoon-ink)] uppercase">
            Contact
          </p>
          <h1 className="mt-2 font-display text-4xl text-[color:var(--ink)] sm:text-5xl">
            Write from wherever you are
          </h1>
          <p className="mt-4 max-w-md leading-relaxed text-[color:var(--muted-ink)]">
            Trek dates, a Pokhara bus seat, or a day in the valley. We reply within
            one business day, Nepal time.
          </p>
          <dl className="mt-10 space-y-5 text-sm">
            <div>
              <dt className="tracking-[0.14em] text-[color:var(--muted-ink)] uppercase">
                Email
              </dt>
              <dd className="mt-1">
                <a href={`mailto:${siteConfig.email}`} className="hover:underline">
                  {siteConfig.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="tracking-[0.14em] text-[color:var(--muted-ink)] uppercase">
                Phone
              </dt>
              <dd className="mt-1 flex flex-col gap-1">
                <a href={siteConfig.phoneHref} className="hover:underline">
                  {siteConfig.phone}
                </a>
                <a href={siteConfig.phoneAltHref} className="hover:underline">
                  {siteConfig.phoneAlt}
                </a>
              </dd>
            </div>
            <div>
              <dt className="tracking-[0.14em] text-[color:var(--muted-ink)] uppercase">
                WhatsApp
              </dt>
              <dd className="mt-1">
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  {siteConfig.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="tracking-[0.14em] text-[color:var(--muted-ink)] uppercase">
                Office
              </dt>
              <dd className="mt-1">{siteConfig.addressLine}</dd>
              <dd className="text-[color:var(--muted-ink)]">{siteConfig.hours}</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </section>
      <ContactMap />
    </div>
  );
}
