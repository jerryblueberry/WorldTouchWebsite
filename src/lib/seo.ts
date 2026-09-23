import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

/** Mountain still from the home film, cropped for link previews. */
const defaultOgImage =
  "https://res.cloudinary.com/dgsphdhns/video/upload/so_0,w_1200,h_630,c_fill,g_auto,q_auto,f_jpg/v1763720502/sushil2_gbwnph.jpg";

type BuildMetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: readonly string[];
  /** Skip the layout title template. Use on the home page. */
  absolute?: boolean;
  noIndex?: boolean;
};

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `${siteConfig.url}/`;
  return `${siteConfig.url}${normalized}`;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image = defaultOgImage,
  keywords = siteConfig.keywords,
  absolute = false,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const isDefaultImage = image === defaultOgImage;
  const fullTitle = absolute ? title : `${title} | ${siteConfig.name}`;

  return {
    title: absolute ? { absolute: title } : title,
    description,
    keywords: [...keywords],
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [
        {
          url: image,
          alt: `${fullTitle}`,
          ...(isDefaultImage ? { width: 1200, height: 630 } : {}),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
