"use client";

import Image from "next/image";
import Link from "next/link";
import ImageWatermark from "./image-watermark";
import { countsOf, useLiveStats } from "./live-stats";
import { LocalizedText } from "./localized-text";

export type PopularItem = { id: string; slug: string; title: string; cover: string | null };

const MAX_ITEMS = 4;

const stats = [
  { key: "views", label: "Dibaca", paths: ["M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z", "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"] },
  { key: "likes", label: "Disukai", paths: ["M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"] },
  {
    key: "shares",
    label: "Dibagikan",
    paths: ["M18 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z", "M6 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z", "M18 16a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z", "m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"],
  },
] as const;

/** The most read articles (maximum 4). Numbers and order follow the live counters. */
export default function PopularArticles({ items }: { items: PopularItem[] }) {
  const { counts } = useLiveStats();
  const score = (item: PopularItem) => {
    const value = countsOf(counts, item.id);

    return value.views + value.likes * 3 + value.shares * 2;
  };
  // `items` arrive newest first, so ties keep the newest article on top.
  const top = items
    .map((item, index) => ({ item, index }))
    .sort((a, b) => score(b.item) - score(a.item) || a.index - b.index)
    .slice(0, MAX_ITEMS)
    .map(({ item }) => item);

  if (top.length === 0) {
    return null;
  }

  return (
    <aside aria-labelledby="popular-title" className="lg:sticky lg:top-24 lg:self-start">
      <h2 id="popular-title" className="text-sm font-bold uppercase text-brand-cyan">
        <LocalizedText id="articles.popular">Artikel populer</LocalizedText>
      </h2>
      <ol className="mt-5 grid gap-4">
        {top.map((item) => {
          const value = countsOf(counts, item.id);

          return (
            <li key={item.id}>
              <Link
                href={`/artikel/${item.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition hover:border-brand-cyan/50 hover:bg-white/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
              >
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-brand-surface">
                  {item.cover ? <Image src={item.cover} alt="" fill sizes="96px" className="object-cover" /> : null}
                  <ImageWatermark size="xs" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold leading-snug text-white transition group-hover:text-brand-cyan">{item.title}</p>
                  <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                    {stats.map((stat) => (
                      <span key={stat.key} className="inline-flex items-center gap-1" title={stat.label}>
                        <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                          {stat.paths.map((d) => (
                            <path key={d} d={d} />
                          ))}
                        </svg>
                        <span className="sr-only">{stat.label}</span>
                        {value[stat.key].toLocaleString("id-ID")}
                      </span>
                    ))}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
