import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { unstable_cache } from "next/cache";
import { newId, slugify } from "./format";
import { getRedis, storeConfigured } from "./redis";
import { seedArticles } from "./seed";
import type { Article, ArticleInput, Block } from "./types";

const DATA_KEY = "nocoding:articles:v1";

const LOCAL_IMAGE = /^\/(media|articles|photos|projects)\/[a-zA-Z0-9._/-]+$/;

export { storeConfigured } from "./redis";

/** Older saved articles had a single `category`; they now carry a list. */
function normalizeArticle(raw: Article & { category?: string }): Article {
  const { category, ...article } = raw;

  return { ...article, categories: Array.isArray(raw.categories) ? raw.categories : category ? [category] : [] };
}

async function readJson(): Promise<Article[] | null> {
  if (!storeConfigured()) {
    return null;
  }

  try {
    const parsed = await getRedis().get<Article[]>(DATA_KEY);

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
  return sortNewestFirst((await readJson()) ?? seedArticles);
}

const readPublishedCached = unstable_cache(
  async () => {
    const all = (await readJson()) ?? seedArticles;

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
  await getRedis().set(DATA_KEY, articles);
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

async function getMediaStore() {
  const { env } = await getCloudflareContext({ async: true });

  if (!env.MEDIA_KV) {
    throw new Error("Cloudflare KV belum dikonfigurasi.");
  }

  return env.MEDIA_KV;
}

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
  const suffix = crypto.randomUUID().replaceAll("-", "").slice(0, 12);
  const pathname = `media/${base}-${suffix}.${ext}`;
  const media = await getMediaStore();

  await media.put(pathname, await file.arrayBuffer(), {
    metadata: { contentType: file.type },
  });

  return `/${pathname}`;
}

export async function readImage(pathname: string) {
  if (!/^media\/[a-z0-9._-]+$/i.test(pathname)) {
    return null;
  }

  try {
    const result = await (await getMediaStore()).getWithMetadata<{ contentType?: string }>(pathname, "arrayBuffer");

    return result.value
      ? { body: result.value, size: result.value.byteLength, contentType: result.metadata?.contentType }
      : null;
  } catch {
    return null;
  }
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
