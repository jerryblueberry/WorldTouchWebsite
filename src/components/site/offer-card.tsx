import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type OfferCardProps = {
  href: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  meta: string;
  kicker?: string;
};

export function OfferCard({
  href,
  title,
  summary,
  image,
  imageAlt,
  meta,
  kicker,
}: OfferCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_50px_-28px_rgba(10,35,66,0.45)] ring-1 ring-[color:var(--line)] transition duration-500 hover:-translate-y-1">
      <Link href={href} className="relative block aspect-[16/11] overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 85vw, 320px"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <Badge className="absolute top-3 left-3 border-0 bg-white/92 text-[color:var(--ink)]">
          {meta}
        </Badge>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {kicker ? (
          <p className="text-xs font-semibold tracking-[0.16em] text-[color:var(--lagoon-ink)] uppercase">
            {kicker}
          </p>
        ) : null}
        <h3 className="font-display text-2xl leading-tight text-[color:var(--ink)]">
          <Link href={href} className="hover:underline">
            {title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-[color:var(--muted-ink)]">
          {summary}
        </p>
        <div className="mt-auto flex items-end justify-end pt-3">
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-sm font-medium text-[color:var(--lagoon-ink)]"
          >
            Details
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
