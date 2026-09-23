import { siteConfig } from "@/data/site";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const organizationId = `${siteConfig.url}/#organization`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": organizationId,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: [siteConfig.phone, siteConfig.phoneAlt],
    image: `${siteConfig.url}/icons/icon-512.png`,
    logo: `${siteConfig.url}/icons/icon-512.png`,
    slogan: siteConfig.tagline,
    knowsAbout: [
      "Himalayan trekking",
      "Nepal mountain treks",
      "Kathmandu sightseeing",
      "Pokhara sightseeing",
      "Kathmandu to Pokhara daily tourist bus",
    ],
    areaServed: [
      { "@type": "Country", name: "Nepal" },
      { "@type": "City", name: "Kathmandu" },
      { "@type": "City", name: "Pokhara" },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [siteConfig.social.facebook],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: `${siteConfig.url}/`,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: { "@id": organizationId },
  };
}

export function servicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Nepal treks, sightseeing, and the Kathmandu–Pokhara bus",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Himalayan treks in Nepal",
        url: `${siteConfig.url}/treks/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Kathmandu and Pokhara sightseeing tours",
        url: `${siteConfig.url}/tours/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Daily Kathmandu to Pokhara tourist bus",
        url: `${siteConfig.url}/bus/`,
      },
    ],
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function tourJsonLd(tour: {
  title: string;
  description: string;
  slug: string;
  image: string;
  duration: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.description,
    image: tour.image,
    url: `${siteConfig.url}/tours/${tour.slug}/`,
    touristType: "Adventure travelers",
    itinerary: {
      "@type": "ItemList",
      name: `${tour.title} itinerary`,
      description: `${tour.duration} guided journey`,
    },
  };
}
