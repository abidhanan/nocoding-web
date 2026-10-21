import type { MetadataRoute } from "next";
import { getPublishedArticles } from "../lib/articles/store";

const siteUrl = "https://www.nocoding.web.id";
const lastModified = new Date("2026-07-31");

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getPublishedArticles();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/artikel`,
      lastModified: articles[0] ? new Date(articles[0].updatedAt) : lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...articles.map((article) => ({
      url: `${siteUrl}/artikel/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      images: article.cover ? [`${siteUrl}${article.cover.src}`] : undefined,
    })),
  ];
}
