import busJson from "@/content/bus.json";
import galleryJson from "@/content/gallery.json";
import treksJson from "@/content/treks.json";
import toursJson from "@/content/tours.json";
import type { BusContent, GalleryContent, Trek, Tour } from "@/content/types";

export const treks = treksJson as Trek[];
export const tours = toursJson as Tour[];
export const bus = busJson as BusContent;
export const gallery = galleryJson as GalleryContent;

export function getTrek(slug: string) {
  return treks.find((trek) => trek.slug === slug);
}

export function getTour(slug: string) {
  return tours.find((tour) => tour.slug === slug);
}

export function getFeaturedTreks() {
  return treks.filter((trek) => trek.featured);
}

export function getFeaturedTours() {
  return tours.filter((tour) => tour.featured);
}

export function getRelatedTreks(slug: string, limit = 3) {
  const current = getTrek(slug);
  return treks
    .filter((trek) => trek.slug !== slug)
    .sort((a, b) => {
      const aScore = a.region === current?.region ? 0 : 1;
      const bScore = b.region === current?.region ? 0 : 1;
      return aScore - bScore;
    })
    .slice(0, limit);
}

export type SearchHit = {
  label: string;
  href: string;
  kind: "Trek" | "Tour" | "Bus";
};

export function getSearchIndex(): SearchHit[] {
  return [
    ...treks.map((trek) => ({
      label: trek.title,
      href: `/treks/${trek.slug}/`,
      kind: "Trek" as const,
    })),
    ...tours.map((tour) => ({
      label: tour.title,
      href: `/tours/${tour.slug}/`,
      kind: "Tour" as const,
    })),
    {
      label: "Kathmandu to Pokhara tourist bus",
      href: "/bus/",
      kind: "Bus" as const,
    },
    {
      label: "Kathmandu to Chitwan tourist bus",
      href: "/bus/",
      kind: "Bus" as const,
    },
    {
      label: "Vehicle rental Kathmandu",
      href: "/bus/",
      kind: "Bus" as const,
    },
    {
      label: "Photo gallery",
      href: "/gallery/",
      kind: "Tour" as const,
    },
  ];
}
