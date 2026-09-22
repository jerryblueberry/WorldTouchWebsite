import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import { siteConfig } from "@/data/site";

type CtaBandProps = {
  title: string;
  body: string;
};

export function CtaBand({ title, body }: CtaBandProps) {
  return (
    <section className="relative overflow-hidden bg-[color:var(--ink)] py-16 text-white sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(110,182,239,0.28),transparent_46%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl sm:text-4xl">{title}</h2>
          <p className="mt-3 text-white/75">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact/"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 bg-[color:var(--lagoon)] px-5 text-[color:var(--ink)] hover:bg-[color:var(--lagoon)]/90"
            )}
          >
            Plan with us
          </Link>
          <a
            href={siteConfig.whatsapp}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 border-white/30 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white"
            )}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
