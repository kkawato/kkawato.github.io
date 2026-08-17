import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://sites.google.com/view/kentaro-kawato";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-08-17"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
