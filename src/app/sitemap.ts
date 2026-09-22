import type { MetadataRoute } from "next";
import { tours, treks } from "@/content";
import { siteConfig } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/treks/", "/tours/", "/bus/", "/about/", "/contact/"].map(
    (path) => ({
      url: `${siteConfig.url}${path || "/"}`,
      lastModified: now,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.8,
    })
  );

  const trekRoutes = treks.map((trek) => ({
    url: `${siteConfig.url}/treks/${trek.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const tourRoutes = tours.map((tour) => ({
    url: `${siteConfig.url}/tours/${tour.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...trekRoutes, ...tourRoutes];
}
