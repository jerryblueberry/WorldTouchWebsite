"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "cn";
import { getSearchIndex } from "@/content";
import { heroCopy } from "@/design/tokens";

type HeroSearchProps = {
  onActiveChange?: (active: boolean) => void;
};

/**
 * Hero search — suggestions overlay (no layout shift).
 * Opens only after the user types, so focus alone never disturbs the stack.
 */
export function HeroSearch({ onActiveChange }: HeroSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return getSearchIndex()
      .filter((item) => {
        const hay = `${item.label} ${item.kind}`.toLowerCase();
        if (hay.includes(q)) return true;
        if (
          (q.includes("bus") || q.includes("pokhara") || q.includes("ktm")) &&
          item.kind === "Bus"
        ) {
          return true;
        }
        if (q.includes("trek") && item.kind === "Trek") return true;
        if (q.includes("tour") && item.kind === "Tour") return true;
        return false;
      })
      .slice(0, 6);
  }, [query]);

  const showPanel = focused && query.trim().length > 0 && suggestions.length > 0;

  function setActive(next: boolean) {
    onActiveChange?.(next);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const first = suggestions[0];
    if (first) {
      router.push(first.href);
      return;
    }
    if (query.trim()) {
      router.push(`/tours/`);
      return;
    }
    router.push("/tours/");
  }

  return (
    <div className="relative z-30 mx-auto w-full max-w-xl">
      <form
        onSubmit={onSubmit}
        className={cn(
          "relative z-30 flex items-stretch rounded-full border border-white/40 bg-black/35 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.65)] backdrop-blur-md transition-[border-color,box-shadow] duration-200",
          focused && "border-white/60 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.75)]"
        )}
        role="search"
        aria-label="Search treks, tours, and buses"
        aria-expanded={showPanel}
      >
        <div className="relative flex min-w-0 flex-1 items-center">
          <Search
            className="pointer-events-none absolute left-3.5 size-4 text-white/70"
            aria-hidden
          />
          <Input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            onFocus={() => {
              setFocused(true);
              setActive(true);
            }}
            onBlur={() => {
              window.setTimeout(() => {
                setFocused(false);
                setActive(false);
              }, 160);
            }}
            placeholder={heroCopy.searchPlaceholder}
            className="h-11 rounded-none border-0 bg-transparent pr-2 pl-10 text-[0.9375rem] text-white shadow-none ring-0 placeholder:text-white/60 focus-visible:border-transparent focus-visible:ring-0 sm:h-12 dark:bg-transparent"
            autoComplete="off"
            name="q"
            aria-autocomplete="list"
            aria-controls="hero-search-results"
          />
        </div>
        <Button
          type="submit"
          className="m-1 h-9 shrink-0 rounded-full bg-[color:var(--lagoon)] px-5 text-[color:var(--ink)] hover:bg-[color:var(--lagoon)]/90"
        >
          Search
        </Button>
      </form>

      {/* Absolutely positioned — never pushes hero content */}
      <div
        id="hero-search-results"
        role="listbox"
        className={cn(
          "absolute inset-x-0 top-[calc(100%+0.4rem)] z-40 origin-top transition-all duration-200",
          showPanel
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"
        )}
      >
        <ul className="max-h-[min(40vh,16rem)] overflow-y-auto overscroll-contain rounded-2xl border border-white/20 bg-[color:var(--ink)]/95 py-1 text-left shadow-[0_24px_50px_-18px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          {suggestions.map((item) => (
            <li key={`${item.kind}-${item.href}`} role="option">
              <Link
                href={item.href}
                className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-white/90 transition-colors hover:bg-white/10"
                onMouseDown={(event) => event.preventDefault()}
              >
                <span className="truncate">{item.label}</span>
                <span className="shrink-0 text-[0.65rem] tracking-[0.14em] text-white/45 uppercase">
                  {item.kind}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
