export type Faq = { question: string; answer: string };

export type ItineraryDay = { day: string; title: string; detail: string };

export type Trek = {
  slug: string;
  title: string;
  region: string;
  duration: string;
  durationDays: number;
  maxAltitude: string;
  difficulty: "Easy" | "Moderate" | "Challenging" | "Strenuous";
  bestSeason: string;
  groupSize: string;
  startPoint: string;
  featured: boolean;
  summary: string;
  overview: string[];
  image: string;
  imageAlt: string;
  itinerary: ItineraryDay[];
  includes: string[];
  excludes: string[];
  permits: string[];
  packing: string[];
  faqs: Faq[];
  metaTitle: string;
  metaDescription: string;
};

export type Tour = {
  slug: string;
  title: string;
  category: string;
  duration: string;
  difficulty: "Easy" | "Moderate";
  groupSize: string;
  featured: boolean;
  summary: string;
  overview: string[];
  highlights: string[];
  image: string;
  imageAlt: string;
  itinerary: ItineraryDay[];
  includes: string[];
  excludes: string[];
  faqs: Faq[];
  metaTitle: string;
  metaDescription: string;
};

export type BusClass = {
  name: string;
  summary: string;
  image: string;
  imageAlt: string;
  features: string[];
};

export type BusDeparture = {
  direction: string;
  departs: string;
  arrives: string;
  duration: string;
  pickup: string;
};

export type BusGalleryImage = {
  image: string;
  imageAlt: string;
  caption: string;
};

export type BusRoute = {
  id: string;
  title: string;
  tagline: string;
  highway: string;
  distance: string;
  duration: string;
  notes: string[];
  departures: BusDeparture[];
};

export type BusRental = {
  name: string;
  summary: string;
  image: string;
  imageAlt: string;
  features: string[];
};

export type BusContent = {
  slug: string;
  title: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  heroAlt: string;
  overview: string[];
  history: string;
  routes: BusRoute[];
  classes: BusClass[];
  gallery: BusGalleryImage[];
  rentals: BusRental[];
  amenities: string[];
  policies: { title: string; detail: string }[];
  faqs: Faq[];
};

export type GalleryCategoryId = "all" | "bus" | "rental" | "journey";

export type GalleryItem = {
  id: string;
  category: Exclude<GalleryCategoryId, "all">;
  featured: boolean;
  title: string;
  image: string;
  imageAlt: string;
  caption: string;
};

export type GalleryContent = {
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  heroAlt: string;
  intro: string[];
  categories: { id: GalleryCategoryId; label: string }[];
  items: GalleryItem[];
};
