"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
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
  { href: "/bus/", label: "Bus" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[color:var(--ink)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="font-display min-w-0 flex-1 truncate text-[0.95rem] leading-tight tracking-tight text-white transition-opacity hover:opacity-90 sm:flex-none sm:text-lg md:text-xl"
        >
          <span className="sm:hidden">{siteConfig.shortName}</span>
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm tracking-wide text-white/75 transition-colors hover:text-white",
                  active && "text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact/"
            className={cn(
              buttonVariants(),
              "bg-[color:var(--lagoon)] text-[color:var(--ink)] hover:bg-[color:var(--lagoon)]/90"
            )}
          >
            Plan a trip
          </Link>
        </nav>

        <div className="shrink-0 md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-full",
                "border border-white/40 bg-white/15 text-white shadow-sm",
                "backdrop-blur-sm transition-all duration-200",
                "hover:border-white/60 hover:bg-white/25 active:scale-95",
                "focus-visible:ring-2 focus-visible:ring-[color:var(--lagoon)] focus-visible:outline-none"
              )}
            >
              <Menu className="size-5 stroke-[2]" aria-hidden />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-l border-white/10 bg-[color:var(--ink)] text-white duration-300"
            >
              <SheetHeader>
                <SheetTitle className="font-display text-left text-base leading-snug text-white">
                  {siteConfig.name}
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
                {navItems.map((item) => {
                  const active =
                    pathname === item.href || pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-xl px-3 py-3 text-lg transition-colors",
                        active
                          ? "bg-white/10 text-white"
                          : "text-white/85 hover:bg-white/8 hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <Link
                  href="/contact/"
                  onClick={() => setOpen(false)}
                  className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-[color:var(--lagoon)] px-4 text-sm font-medium text-[color:var(--ink)] transition-transform active:scale-[0.98]"
                >
                  Plan a trip
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
