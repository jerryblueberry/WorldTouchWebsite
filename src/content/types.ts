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
  route: {
    highway: string;
    distance: string;
    duration: string;
    notes: string[];
  };
  departures: BusDeparture[];
  classes: BusClass[];
  gallery: BusGalleryImage[];
  amenities: string[];
  policies: { title: string; detail: string }[];
  faqs: Faq[];
};
