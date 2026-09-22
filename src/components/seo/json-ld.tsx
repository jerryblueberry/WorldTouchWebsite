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

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    sameAs: Object.values(siteConfig.social),
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
  priceFrom: number;
  currency: string;
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
    offers: {
      "@type": "Offer",
      priceCurrency: tour.currency,
      price: tour.priceFrom,
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/tours/${tour.slug}/`,
    },
    itinerary: {
      "@type": "ItemList",
      name: `${tour.title} itinerary`,
      description: `${tour.duration} guided journey`,
    },
  };
}
