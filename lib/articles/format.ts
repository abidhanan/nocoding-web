import type { Article, ArticlePreview, Block } from "./types";

const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

const monthsEnglish = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "14 Oktober 2026" or, in English, "October 14, 2026" (independent of the server locale). */
export function formatDate(iso: string, language: "id" | "en" = "id") {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  if (language === "en") {
    return `${monthsEnglish[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
  }

  return `${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

function blockText(block: Block): string {
  switch (block.type) {
    case "ul":
    case "ol":
      return block.items.join(" ");
    case "image":
      return block.caption ?? "";
    case "cta":
      return block.text ?? "";
    default:
      return block.text;
  }
}

export function readingMinutes(blocks: Block[]) {
  const words = blocks.map(blockText).join(" ").split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.round(words / 200));
}

export function toPreview(article: Article): ArticlePreview {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    categories: article.categories,
    publishedAt: article.publishedAt,
    cover: article.cover ? { src: article.cover.src, alt: article.cover.alt } : null,
  };
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function newId() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}
