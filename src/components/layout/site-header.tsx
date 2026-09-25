"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "cn";
import { siteConfig } from "@/data/site";

const navItems = [
  { href: "/treks/", label: "Treks" },
  { href: "/tours/", label: "Tours" },
  { href: "/bus/", label: "Bus & Rental" },
  { href: "/gallery/", label: "Gallery" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

const navUnderline = "nav-underline";

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

function WhatsAppButton({
  className,
  fullWidth = false,
  onNavigate,
}: {
  className?: string;
  fullWidth?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <a
      href={siteConfig.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label={`WhatsApp ${siteConfig.phone}`}
      onClick={onNavigate}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#25D366] font-medium text-[#07341c] transition duration-300 hover:-translate-y-0.5 hover:bg-[#3dde74]",
        fullWidth ? "h-12 w-full text-sm" : "h-9 px-3.5 text-sm",
        className
      )}
    >
      <WhatsAppIcon className="size-4 shrink-0" />
      <span>{fullWidth ? `WhatsApp · ${siteConfig.phone}` : "WhatsApp"}</span>
    </a>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[color:var(--ink)]/80 backdrop-blur-md">
      <div className="mx-auto flex min-h-14 max-w-6xl items-center justify-between gap-2 px-4 py-2 sm:min-h-16 sm:gap-3 sm:px-6 sm:py-2.5 xl:h-[4.5rem] xl:gap-4 xl:py-0">
        <Link
          href="/"
          className="min-w-0 flex-1 pr-2 transition-opacity hover:opacity-90 xl:flex-initial xl:pr-0"
        >
          <span className="block font-display text-[0.68rem] leading-[1.3] tracking-tight text-balance text-white min-[380px]:text-xs sm:text-sm md:text-base xl:text-lg 2xl:text-xl">
            {siteConfig.name}
          </span>
          <span className="mt-0.5 hidden font-sans text-xs font-normal tracking-wide text-pretty text-white/65 xl:block xl:max-w-md 2xl:max-w-sm">
            {siteConfig.tagline}
          </span>
        </Link>

        <nav
          className="hidden shrink-0 flex-nowrap items-center gap-4 2xl:gap-6 xl:flex"
          aria-label="Primary"
        >
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  navUnderline,
                  "inline-flex whitespace-nowrap text-sm tracking-wide text-white/75 transition-colors hover:text-white",
                  active && "text-white"
                )}
                data-active={active ? "true" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <WhatsAppButton />
          <Link
            href="/contact/"
            className="plan-trip h-9 shrink-0 px-3.5 text-sm whitespace-nowrap 2xl:px-4"
          >
            <span className="plan-trip-sheen" aria-hidden />
            <span className="plan-trip-label relative">Plan a trip</span>
            <ArrowUpRight className="plan-trip-arrow" aria-hidden />
          </Link>
        </nav>

        <div className="flex shrink-0 items-center xl:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className={cn(
                "inline-flex size-10 items-center justify-center text-white",
                "transition-opacity duration-200 hover:opacity-80",
                "focus-visible:ring-2 focus-visible:ring-[color:var(--lagoon)] focus-visible:outline-none"
              )}
            >
              <Menu className="size-6 stroke-[1.75]" aria-hidden />
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="flex h-full w-[min(100%,22rem)] flex-col gap-0 border-l border-white/10 bg-[color:var(--ink)] p-0 text-white duration-300 sm:max-w-sm"
            >
              <div className="relative border-b border-white/10 px-5 pb-5 pt-[max(1.25rem,env(safe-area-inset-top,0px))] sm:px-6 sm:pb-6 sm:pt-6">
                <div
                  className="pointer-events-none absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_top_right,rgba(110,182,239,0.14),transparent_55%)]"
                  aria-hidden
                />
                <SheetClose
                  aria-label="Close menu"
                  className="absolute right-3 top-[max(0.75rem,env(safe-area-inset-top,0px))] z-10 inline-flex size-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-[color:var(--lagoon)] focus-visible:outline-none sm:right-4"
                >
                  <X className="size-5 stroke-[2]" aria-hidden />
                </SheetClose>
                <SheetHeader className="relative space-y-2 p-0 pr-12 text-left sm:pr-14">
                  <SheetTitle className="font-display text-left text-[0.95rem] font-normal leading-[1.4] tracking-tight text-balance break-words text-white min-[380px]:text-base sm:text-lg sm:leading-[1.35]">
                    {siteConfig.name}
                  </SheetTitle>
                  <p className="text-[0.8rem] leading-relaxed text-pretty text-white/60 sm:text-sm">
                    {siteConfig.tagline}
                  </p>
                </SheetHeader>
              </div>
              <nav
                className="flex flex-1 flex-col px-6 py-6 sm:px-7 sm:py-7"
                aria-label="Mobile"
              >
                <div className="flex flex-col gap-0.5">
                  {navItems.map((item) => {
                    const active =
                      pathname === item.href || pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "group relative px-1 py-3.5 text-[1.05rem] tracking-wide transition-colors sm:py-4 sm:text-lg",
                          active
                            ? "text-white"
                            : "text-white/75 hover:text-white"
                        )}
                      >
                        <span
                          className={cn(
                            navUnderline,
                            "pb-0.5",
                            active && "text-white"
                          )}
                          data-active={active ? "true" : undefined}
                        >
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-6 border-t border-white/10 pt-6 sm:mt-8 sm:pt-7">
                  <WhatsAppButton
                    fullWidth
                    onNavigate={() => setOpen(false)}
                  />
                </div>
                <div className="mt-auto flex flex-col gap-3 pt-6 sm:pt-8">
                  <Link
                    href="/contact/"
                    onClick={() => setOpen(false)}
                    className="plan-trip h-12 w-full px-4 text-sm tracking-wide"
                  >
                    <span className="plan-trip-sheen" aria-hidden />
                    <span className="plan-trip-label relative">Plan a trip</span>
                    <ArrowUpRight className="plan-trip-arrow" aria-hidden />
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
