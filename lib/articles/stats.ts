import "server-only";

import { get, put } from "@vercel/blob";
import { revalidateTag, unstable_cache } from "next/cache";
import { storeConfigured } from "./store";

// View and like counters live in one small JSON file in the same private Blob store.
// Every counted action is one Blob write, and the free plan only allows a limited number of
// writes per month, so writes are capped to leave room for the admin panel.
const STATS_KEY = "data/stats.json";
const MONTHLY_WRITE_CAP = 1200;

export type ArticleCounts = { views: number; likes: number; shares: number };

type StatsFile = { month: string; writes: number; items: Record<string, ArticleCounts> };

const emptyCounts: ArticleCounts = { views: 0, likes: 0, shares: 0 };

function normalizeCounts(value: Partial<ArticleCounts> | undefined): ArticleCounts {
  return { views: value?.views ?? 0, likes: value?.likes ?? 0, shares: value?.shares ?? 0 };
}

function currentMonth() {
  return new Date().toISOString().slice(0, 7);
}

async function readStats(useCache: boolean): Promise<StatsFile> {
  const fallback: StatsFile = { month: currentMonth(), writes: 0, items: {} };

  if (!storeConfigured()) {
    return fallback;
  }

  try {
    const result = await get(STATS_KEY, { access: "private", useCache });

    if (!result || result.statusCode !== 200) {
      return fallback;
    }

    const parsed = JSON.parse(await new Response(result.stream).text()) as Partial<StatsFile>;

    if (!parsed || typeof parsed !== "object" || typeof parsed.items !== "object" || !parsed.items) {
      return fallback;
    }

    const month = currentMonth();

    return {
      month,
      // A new month starts a fresh write budget.
      writes: parsed.month === month && typeof parsed.writes === "number" ? parsed.writes : 0,
      items: Object.fromEntries(
        Object.entries(parsed.items as Record<string, Partial<ArticleCounts>>).map(([key, value]) => [key, normalizeCounts(value)]),
      ),
    };
  } catch {
    return fallback;
  }
}

/** Counters for all articles, refreshed at most every 5 minutes (or right after a change). */
export const getAllCounts = unstable_cache(async () => (await readStats(true)).items, ["article-stats"], {
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

  const { items } = await readStats(false);

  live = { at: Date.now(), items };

  return items;
}

export type StatAction = "view" | "like" | "unlike" | "share";

export async function recordAction(id: string, action: StatAction): Promise<ArticleCounts> {
  if (!storeConfigured()) {
    return emptyCounts;
  }

  const stats = await readStats(false);
  const current = stats.items[id] ?? emptyCounts;

  if (stats.writes >= MONTHLY_WRITE_CAP) {
    return current;
  }

  const next: ArticleCounts = {
    views: current.views + (action === "view" ? 1 : 0),
    likes: Math.max(0, current.likes + (action === "like" ? 1 : action === "unlike" ? -1 : 0)),
    shares: current.shares + (action === "share" ? 1 : 0),
  };

  try {
    await put(
      STATS_KEY,
      JSON.stringify({ month: stats.month, writes: stats.writes + 1, items: { ...stats.items, [id]: next } }),
      { access: "private", allowOverwrite: true, contentType: "application/json", cacheControlMaxAge: 60 },
    );
    live = { at: Date.now(), items: { ...stats.items, [id]: next } };
    revalidateTag("stats", { expire: 0 });
  } catch {
    return current;
  }

  return next;
}
