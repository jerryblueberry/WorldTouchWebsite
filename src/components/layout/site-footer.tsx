import Link from "next/link";
import { siteConfig } from "@/data/site";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { href: "/treks/", label: "Treks" },
      { href: "/tours/", label: "Tours" },
      { href: "/bus/", label: "KTM–Pokhara bus" },
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
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>{siteConfig.email}</p>
        </div>
      </div>
    </footer>
  );
}
