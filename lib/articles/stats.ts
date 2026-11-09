import "server-only";

import { revalidateTag, unstable_cache } from "next/cache";
import { getRedis, storeConfigured } from "./redis";

const STATS_KEY = "nocoding:article-stats:v1";

export type ArticleCounts = { views: number; likes: number; shares: number };

const emptyCounts: ArticleCounts = { views: 0, likes: 0, shares: 0 };

function normalizeCounts(value: Partial<ArticleCounts> | undefined): ArticleCounts {
  return { views: value?.views ?? 0, likes: value?.likes ?? 0, shares: value?.shares ?? 0 };
}

async function readStats(): Promise<Record<string, ArticleCounts>> {
  if (!storeConfigured()) {
    return {};
  }

  try {
    const fields = (await getRedis().hgetall<Record<string, number | string>>(STATS_KEY)) ?? {};
    const items: Record<string, ArticleCounts> = {};

    for (const [field, value] of Object.entries(fields)) {
      const separator = field.lastIndexOf(":");
      const id = field.slice(0, separator);
      const metric = field.slice(separator + 1);

      if (!id || !["views", "likes", "shares"].includes(metric)) {
        continue;
      }

      items[id] ??= { ...emptyCounts };
      items[id][metric as keyof ArticleCounts] = Math.max(0, Number(value) || 0);
    }

    return items;
  } catch {
    return {};
  }
}

/** Counters for all articles, refreshed at most every 5 minutes (or right after a change). */
export const getAllCounts = unstable_cache(readStats, ["article-stats"], {
  tags: ["stats"],
  revalidate: 300,
});

// Live numbers are read straight from the store (never from a CDN or Next.js cache). To keep the
// number of reads down, one server instance reuses what it read for a few seconds, and a write
// updates that copy right away so the change shows up on the next refresh.
const LIVE_REUSE_MS = 4000;
let live: { at: number; items: Record<string, ArticleCounts> } | null = null;

export async function getLiveCounts(): Promise<Record<string, ArticleCounts>> {
  if (live && Date.now() - live.at < LIVE_REUSE_MS) {
    return live.items;
  }

  const items = await readStats();

  live = { at: Date.now(), items };

  return items;
}

export type StatAction = "view" | "like" | "unlike" | "share";

export async function recordAction(id: string, action: StatAction): Promise<ArticleCounts> {
  if (!storeConfigured()) {
    return emptyCounts;
  }

  const items = await readStats();
  const current = items[id] ?? emptyCounts;
  const metric = action === "view" ? "views" : action === "share" ? "shares" : "likes";
  const delta = action === "unlike" ? -1 : 1;
  const field = `${id}:${metric}`;

  try {
    let value = await getRedis().hincrby(STATS_KEY, field, delta);

    if (value < 0) {
      await getRedis().hset(STATS_KEY, { [field]: 0 });
      value = 0;
    }

    const next = normalizeCounts({ ...current, [metric]: value });
    live = { at: Date.now(), items: { ...items, [id]: next } };
    revalidateTag("stats", { expire: 0 });
  } catch {
    return current;
  }

  return live.items[id];
}
