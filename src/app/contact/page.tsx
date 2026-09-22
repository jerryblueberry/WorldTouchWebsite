import { ContactForm } from "@/components/contact/contact-form";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact World Touch in Kathmandu for treks, tours, and Kathmandu–Pokhara bus seats. WhatsApp, phone, and a Thamel office.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <div className="pt-24">
      <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
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
              <dt className="tracking-[0.14em] text-[color:var(--muted-ink)] uppercase">Email</dt>
              <dd className="mt-1">{siteConfig.email}</dd>
            </div>
            <div>
              <dt className="tracking-[0.14em] text-[color:var(--muted-ink)] uppercase">Phone</dt>
              <dd className="mt-1">
                <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
              </dd>
            </div>
            <div>
              <dt className="tracking-[0.14em] text-[color:var(--muted-ink)] uppercase">WhatsApp</dt>
              <dd className="mt-1">
                <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer">
                  Message the desk
                </a>
              </dd>
            </div>
            <div>
              <dt className="tracking-[0.14em] text-[color:var(--muted-ink)] uppercase">Office</dt>
              <dd className="mt-1">{siteConfig.addressLine}</dd>
              <dd className="text-[color:var(--muted-ink)]">{siteConfig.hours}</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </section>
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <iframe
          title="World Touch office in Thamel, Kathmandu"
          src={siteConfig.mapEmbed}
          className="h-72 w-full rounded-2xl border-0 ring-1 ring-[color:var(--line)]"
          loading="lazy"
        />
      </div>
    </div>
  );
}
