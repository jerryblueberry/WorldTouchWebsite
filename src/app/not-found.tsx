import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Page not found",
  description: "This page is not on the World Touch site.",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-start justify-center px-4 pt-24 sm:px-6">
      <p className="text-xs font-semibold tracking-[0.18em] text-[color:var(--lagoon-ink)] uppercase">
        404
      </p>
      <h1 className="mt-2 font-display text-4xl text-[color:var(--ink)]">
        This path isn&apos;t on the map
      </h1>
      <p className="mt-3 max-w-md text-[color:var(--muted-ink)]">
        The page you&apos;re looking for may have moved. Try treks, tours, or the Pokhara bus.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className={cn(
            buttonVariants(),
            "bg-[color:var(--ink)] text-white hover:bg-[color:var(--ink)]/90"
          )}
        >
          Home
        </Link>
        <Link
          href="/tours/"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "border-[color:var(--ink)]/15"
          )}
        >
          Browse tours
        </Link>
      </div>
    </div>
  );
}
