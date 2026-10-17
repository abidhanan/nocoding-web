import "server-only";

import { get, put } from "@vercel/blob";
import { unstable_cache } from "next/cache";
import { newId, slugify } from "./format";
import { seedArticles } from "./seed";
import type { Article, ArticleInput, Block } from "./types";

// Everything lives in one private JSON file (all articles, drafts included) in a Vercel
// Blob store. Images live in the same private store and are served through /media/*.
const DATA_KEY = "data/articles.json";

const LOCAL_IMAGE = /^\/(media|articles|photos|projects)\/[a-zA-Z0-9._/-]+$/;

export function storeConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

/** Older saved articles had a single `category`; they now carry a list. */
function normalizeArticle(raw: Article & { category?: string }): Article {
  const { category, ...article } = raw;

  return { ...article, categories: Array.isArray(raw.categories) ? raw.categories : category ? [category] : [] };
}

async function readJson(useCache: boolean): Promise<Article[] | null> {
  if (!storeConfigured()) {
    return null;
  }

  try {
    const result = await get(DATA_KEY, { access: "private", useCache });

    if (!result || result.statusCode !== 200) {
      return null;
    }

    const parsed = JSON.parse(await new Response(result.stream).text());

    return Array.isArray(parsed) ? parsed.map(normalizeArticle) : null;
  } catch {
    return null;
  }
}

function sortNewestFirst(articles: Article[]) {
  return [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** Always-fresh read for the admin panel (drafts included). */
export async function readAllFresh(): Promise<Article[]> {
  return sortNewestFirst((await readJson(false)) ?? seedArticles);
}

const readPublishedCached = unstable_cache(
  async () => {
    const all = (await readJson(true)) ?? seedArticles;

    return sortNewestFirst(all.filter((article) => article.status === "published"));
  },
  ["published-articles"],
  { tags: ["articles"], revalidate: 300 },
);

export async function getPublishedArticles() {
  return readPublishedCached();
}

export async function getPublishedArticle(slug: string) {
  return (await getPublishedArticles()).find((article) => article.slug === slug) ?? null;
}

export async function getArticleById(id: string) {
  return (await readAllFresh()).find((article) => article.id === id) ?? null;
}

async function saveAll(articles: Article[]) {
  await put(DATA_KEY, JSON.stringify(articles), {
    access: "private",
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60,
  });
}

function uniqueSlug(base: string, articles: Article[], ownId?: string) {
  const root = slugify(base) || "artikel";
  let slug = root;
  let n = 2;

  while (articles.some((article) => article.slug === slug && article.id !== ownId)) {
    slug = `${root}-${n}`;
    n += 1;
  }

  return slug;
}

export async function saveArticle(input: ArticleInput): Promise<Article> {
  if (!storeConfigured()) {
    throw new Error("Penyimpanan artikel belum dikonfigurasi.");
  }

  const articles = await readAllFresh();
  const now = new Date().toISOString();
  const existing = input.id ? articles.find((article) => article.id === input.id) : undefined;

  const next: Article = {
    id: existing?.id ?? newId(),
    slug: uniqueSlug(input.slug || input.title, articles, existing?.id),
    title: input.title,
    excerpt: input.excerpt,
    categories: input.categories,
    cover: input.cover,
    status: input.status,
    // Keep the original publish date; a draft that goes live for the first time gets "now".
    publishedAt:
      existing && (existing.status === "published" || input.status === "draft") ? existing.publishedAt : now,
    updatedAt: now,
    author: existing?.author ?? "Tim Nocoding",
    blocks: input.blocks,
  };

  const rest = articles.filter((article) => article.id !== next.id);

  await saveAll([...rest, next]);

  return next;
}

export async function removeArticle(id: string) {
  if (!storeConfigured()) {
    throw new Error("Penyimpanan artikel belum dikonfigurasi.");
  }

  const articles = await readAllFresh();

  await saveAll(articles.filter((article) => article.id !== id));
}

const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export const MAX_IMAGE_BYTES = 3 * 1024 * 1024;

/** Stores an uploaded image and returns the path it is served from. */
export async function saveImage(file: File): Promise<string> {
  const ext = IMAGE_TYPES[file.type];

  if (!ext) {
    throw new Error("Format gambar harus JPG, PNG, WebP, atau GIF.");
  }

  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Ukuran gambar maksimal 3 MB.");
  }

  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "gambar";
  const blob = await put(`media/${base}.${ext}`, file, {
    access: "private",
    addRandomSuffix: true,
    contentType: file.type,
    cacheControlMaxAge: 60 * 60 * 24 * 365,
  });

  return `/${blob.pathname}`;
}

export async function readImage(pathname: string) {
  if (!storeConfigured() || !/^media\/[a-z0-9._-]+$/i.test(pathname)) {
    return null;
  }

  const result = await get(pathname, { access: "private" });

  return result && result.statusCode === 200 ? result : null;
}

export function sanitizeBlocks(blocks: unknown): Block[] {
  if (!Array.isArray(blocks)) {
    return [];
  }

  const clean: Block[] = [];

  for (const raw of blocks.slice(0, 200)) {
    if (!raw || typeof raw !== "object") {
      continue;
    }

    const block = raw as Record<string, unknown>;
    const id = typeof block.id === "string" && block.id ? block.id.slice(0, 40) : newId();
    const text = (value: unknown, max: number) => (typeof value === "string" ? value.slice(0, max) : "");

    switch (block.type) {
      case "h2":
      case "h3":
      case "p":
      case "quote": {
        const value = text(block.text, 8000).trim();

        if (value) {
          clean.push({ id, type: block.type, text: value });
        }

        break;
      }
      case "ul":
      case "ol": {
        const items = Array.isArray(block.items)
          ? block.items.map((item) => text(item, 1000).trim()).filter(Boolean).slice(0, 50)
          : [];

        if (items.length) {
          clean.push({ id, type: block.type, items });
        }

        break;
      }
      case "image": {
        const src = text(block.src, 300);

        // Only images served from this site (uploads or bundled files) are allowed.
        if (LOCAL_IMAGE.test(src)) {
          clean.push({ id, type: "image", src, alt: text(block.alt, 200), caption: text(block.caption, 300) || undefined });
        }

        break;
      }
      case "cta":
        clean.push({ id, type: "cta", text: text(block.text, 200) || undefined });
        break;
      default:
        break;
    }
  }

  return clean;
}

export function sanitizeCategories(value: unknown): string[] {
  const raw = Array.isArray(value) ? value : typeof value === "string" ? value.split(",") : [];
  const seen = new Set<string>();
  const clean: string[] = [];

  for (const item of raw) {
    const name = typeof item === "string" ? item.trim().slice(0, 40) : "";

    if (name && !seen.has(name.toLowerCase())) {
      seen.add(name.toLowerCase());
      clean.push(name);
    }
  }

  return clean.slice(0, 5);
}

export function sanitizeCover(cover: unknown): Article["cover"] {
  if (!cover || typeof cover !== "object") {
    return null;
  }

  const { src, alt, caption } = cover as { src?: unknown; alt?: unknown; caption?: unknown };

  if (typeof src !== "string" || !LOCAL_IMAGE.test(src)) {
    return null;
  }

  return {
    src,
    alt: typeof alt === "string" ? alt.slice(0, 200) : "",
    caption: typeof caption === "string" && caption.trim() ? caption.trim().slice(0, 300) : undefined,
  };
}
