import Link from "next/link";
import { siteConfig } from "@/data/site";
import { cn } from "cn";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { href: "/treks/", label: "Treks" },
      { href: "/tours/", label: "Tours" },
      { href: "/bus/", label: "Bus & Rental" },
      { href: "/gallery/", label: "Gallery" },
    ],
  },
  {
    title: "Plan",
    links: [
      { href: "/about/", label: "About us" },
      { href: "/contact/", label: "Contact" },
      { href: "/treks/everest-base-camp/", label: "Everest Base Camp" },
    ],
  },
];

const socialButtonClass =
  "inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-[color:var(--lagoon)] focus-visible:outline-none";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M20.5 3.5A11 11 0 0 0 2.1 16.8L1 23l6.4-1.1A11 11 0 0 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.8.6.6-3.7-.2-.3A9.1 9.1 0 1 1 12 20.5Zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4 15 15 0 0 0 1.5.6 3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3Z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M13.5 22v-8.5H16l.5-3.5h-3V8.1c0-1 .3-1.7 1.8-1.7H16.5V3.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H8v3.5h2.3V22h3.2z" />
    </svg>
  );
}

function FooterSocialLinks() {
  return (
    <div className="mt-5">
      <p className="text-xs font-semibold tracking-[0.16em] text-white/45 uppercase">
        Connect
      </p>
      <div className="mt-3 flex gap-2">
        <a
          href={siteConfig.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`WhatsApp ${siteConfig.phone}`}
          className={cn(socialButtonClass, "hover:text-[#25D366]")}
        >
          <WhatsAppIcon className="size-[1.15rem]" />
        </a>
        <a
          href={siteConfig.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="World Touch on Facebook"
          className={socialButtonClass}
        >
          <FacebookIcon className="size-[1.15rem]" />
        </a>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[color:var(--line)] bg-[color:var(--ink)] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl tracking-tight">{siteConfig.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
            Kathmandu-based treks, tours, and the daily tourist bus to Pokhara.
          </p>
          <p className="mt-3 text-sm text-white/55">{siteConfig.addressLine}</p>
          <div className="mt-4 flex flex-col gap-1.5 text-sm">
            <a
              href={siteConfig.phoneHref}
              className="text-white/80 transition-colors hover:text-white"
            >
              {siteConfig.phone}
            </a>
            <a
              href={siteConfig.phoneAltHref}
              className="text-white/80 transition-colors hover:text-white"
            >
              {siteConfig.phoneAlt}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-white/80 transition-colors hover:text-white"
            >
              {siteConfig.email}
            </a>
          </div>
          <FooterSocialLinks />
        </div>
        {footerLinks.map((group) => (
          <div key={group.title}>
            <p className="text-xs font-semibold tracking-[0.18em] text-white/50 uppercase">
              {group.title}
            </p>
            <ul className="mt-4 space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6">
          <p>
            © {new Date().getUTCFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-white/45 sm:text-right">Made with love in Nepal</p>
        </div>
      </div>
    </footer>
  );
}
