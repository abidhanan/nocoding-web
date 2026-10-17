"use client";

import { useMemo, useState } from "react";
import type { Article } from "../../lib/articles/types";
import ArticleCard from "./article-card";

const PER_PAGE = 6;

/** Article list with category filter pills and pagination (6 per page). */
export default function ArticleGrid({ articles }: { articles: Article[] }) {
  const [category, setCategory] = useState("Semua");
  const [page, setPage] = useState(1);
  const categories = useMemo(
    () => ["Semua", ...Array.from(new Set(articles.flatMap((article) => article.categories)))],
    [articles],
  );
  const filtered = category === "Semua" ? articles : articles.filter((article) => article.categories.includes(category));
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  function goTo(next: number) {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const pagerButton =
    "grid h-10 min-w-10 place-items-center rounded-full border px-3 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-brand-cyan disabled:cursor-not-allowed disabled:opacity-30";

  return (
    <div>
      {categories.length > 2 ? (
        <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2" role="group" aria-label="Filter kategori">
          {categories.map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={category === name}
              onClick={() => {
                setCategory(name);
                setPage(1);
              }}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-brand-cyan ${
                category === name
                  ? "border-brand-cyan bg-brand-cyan text-brand-dark"
                  : "border-white/15 text-slate-300 hover:border-brand-cyan hover:text-brand-cyan"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mx-auto mt-10 grid w-full max-w-[21.5rem] gap-5 sm:max-w-7xl md:grid-cols-2 lg:grid-cols-3">
        {visible.map((article, index) => (
          <ArticleCard key={article.id} article={article} priority={index < 3} />
        ))}
      </div>

      {pages > 1 ? (
        <nav aria-label="Halaman artikel" className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            aria-label="Halaman sebelumnya"
            disabled={current === 1}
            onClick={() => goTo(current - 1)}
            className={`${pagerButton} border-white/20 text-white hover:border-brand-cyan hover:text-brand-cyan`}
          >
            ←
          </button>
          {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
            <button
              key={number}
              type="button"
              aria-label={`Halaman ${number}`}
              aria-current={number === current ? "page" : undefined}
              onClick={() => goTo(number)}
              className={`${pagerButton} ${
                number === current
                  ? "border-brand-cyan bg-brand-cyan text-brand-dark"
                  : "border-white/20 text-white hover:border-brand-cyan hover:text-brand-cyan"
              }`}
            >
              {number}
            </button>
          ))}
          <button
            type="button"
            aria-label="Halaman berikutnya"
            disabled={current === pages}
            onClick={() => goTo(current + 1)}
            className={`${pagerButton} border-white/20 text-white hover:border-brand-cyan hover:text-brand-cyan`}
          >
            →
          </button>
        </nav>
      ) : null}
    </div>
  );
}
