import type { MetadataRoute } from "next";

const siteUrl = "https://www.nocoding.web.id";
const lastModified = new Date("2026-07-31");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
