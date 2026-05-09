import type { MetadataRoute } from "next";

const siteUrl = "https://nocoding.id";
const lastModified = new Date("2026-05-09");

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
