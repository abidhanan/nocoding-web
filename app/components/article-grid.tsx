"use client";

import { useMemo, useState } from "react";
import type { ArticlePreview } from "../../lib/articles/types";
import ArticleCard from "./article-card";
import { CategoryName } from "./article-i18n";
import { useLocalizedText } from "./i18n";
import { LocalizedText } from "./localized-text";

const PER_PAGE = 6;

/** Article list with category filter pills and pagination (6 per page). */
export default function ArticleGrid({ articles }: { articles: ArticlePreview[] }) {
  const filterLabel = useLocalizedText("filter.category", "Filter kategori");
  const pagerLabel = useLocalizedText("pager.nav", "Halaman artikel");
  const previousLabel = useLocalizedText("pager.prev", "Halaman sebelumnya");
  const nextLabel = useLocalizedText("pager.next", "Halaman berikutnya");
  const pageLabel = useLocalizedText("pager.page", "Halaman {n}");
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
        <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2" role="group" aria-label={filterLabel}>
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
              {name === "Semua" ? <LocalizedText id="articles.all">Semua</LocalizedText> : <CategoryName name={name} />}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mx-auto mt-10 grid w-full max-w-[21.5rem] gap-5 sm:max-w-7xl md:grid-cols-2 lg:grid-cols-3">
        {visible.map((article, index) => (
          <ArticleCard key={article.id} article={article} priority={index === 0} eager={index < 3} headingLevel="h2" />
        ))}
      </div>

      {pages > 1 ? (
        <nav aria-label={pagerLabel} className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            aria-label={previousLabel}
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
              aria-label={pageLabel.replace("{n}", String(number))}
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
            aria-label={nextLabel}
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
