"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

export type Counts = { views: number; likes: number; shares: number };

const zero: Counts = { views: 0, likes: 0, shares: 0 };

const POLL_MS = 15_000;
// Stops refreshing after a while on one page load, so a forgotten open tab does not keep going.
const POLL_BUDGET_MS = 2 * 60_000;
// A number the visitor just changed is not overwritten by a refresh that may predate the change.
const LOCAL_CHANGE_GRACE_MS = 8_000;

type LiveStats = {
  counts: Record<string, Counts>;
  setCountsFor: (id: string, next: Counts | ((current: Counts) => Counts)) => void;
};

const LiveStatsContext = createContext<LiveStats>({ counts: {}, setCountsFor: () => undefined });

export const useLiveStats = () => useContext(LiveStatsContext);

export const countsOf = (counts: Record<string, Counts>, id: string): Counts => counts[id] ?? zero;

/**
 * Keeps the view, like and share numbers on the page up to date: it starts from the numbers the
 * page was built with, fetches fresh ones right away, then refreshes every few seconds while the
 * tab is visible.
 */
export function LiveStatsProvider({ initial, children }: { initial: Record<string, Counts>; children: ReactNode }) {
  const [counts, setCounts] = useState(initial);
  const touched = useRef<Record<string, number>>({});

  const setCountsFor = useCallback<LiveStats["setCountsFor"]>((id, next) => {
    touched.current[id] = Date.now();
    setCounts((current) => ({
      ...current,
      [id]: typeof next === "function" ? next(current[id] ?? zero) : next,
    }));
  }, []);

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;
    let spent = 0;

    async function refresh() {
      try {
        const response = await fetch("/api/articles", { cache: "no-store" });

        if (!response.ok || cancelled) {
          return;
        }

        const fresh = (await response.json()) as Record<string, Counts>;
        const now = Date.now();

        setCounts((current) => {
          const merged = { ...current };

          for (const [id, value] of Object.entries(fresh)) {
            if (now - (touched.current[id] ?? 0) > LOCAL_CHANGE_GRACE_MS) {
              merged[id] = value;
            }
          }

          return merged;
        });
      } catch {
        // Keep showing the numbers we already have.
      }
    }

    function schedule() {
      window.clearTimeout(timer);

      if (cancelled || spent >= POLL_BUDGET_MS || document.visibilityState !== "visible") {
        return;
      }

      timer = window.setTimeout(async () => {
        spent += POLL_MS;
        await refresh();
        schedule();
      }, POLL_MS);
    }

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        void refresh();
        schedule();
      }
    };

    void refresh();
    schedule();
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const value = useMemo(() => ({ counts, setCountsFor }), [counts, setCountsFor]);

  return <LiveStatsContext.Provider value={value}>{children}</LiveStatsContext.Provider>;
}
