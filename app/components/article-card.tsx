import Image from "next/image";
import Link from "next/link";
import type { ArticlePreview } from "../../lib/articles/types";
import { ArticleDate, ArticleText, CategoryName } from "./article-i18n";
import CalendarIcon from "./calendar-icon";
import ImageWatermark from "./image-watermark";
import { LocalizedText } from "./localized-text";

/** One article preview card, used on the home page and on the article list. */
export default function ArticleCard({
  article,
  priority = false,
  eager = false,
  headingLevel = "h3",
}: {
  article: ArticlePreview;
  /** The first card of a page: fetched at high priority (it is usually the largest element on screen). */
  priority?: boolean;
  eager?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-brand-cyan/50 hover:bg-white/[0.05]">
      <Link prefetch={false} href={`/artikel/${article.slug}`} className="flex h-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan">
        <div className="relative aspect-[16/9] overflow-hidden bg-brand-surface">
          {article.cover ? (
            <Image
              src={article.cover.src}
              alt={article.cover.alt}
              fill
              sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 92vw"
              loading={eager || priority ? "eager" : undefined}
              fetchPriority={priority ? "high" : undefined}
              className="object-cover transition duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="grid h-full place-items-center bg-gradient-to-br from-brand-surface to-brand-dark text-3xl font-black text-brand-cyan">
              nocoding_
            </div>
          )}
          <ImageWatermark />
        </div>
        <div className="flex grow flex-col p-5">
          {article.categories.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {article.categories.map((name) => (
                <span key={name} className="rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-1 text-xs font-bold text-brand-cyan">
                  <CategoryName name={name} />
                </span>
              ))}
            </div>
          ) : null}
          <Heading className="mt-3 text-xl font-black leading-snug text-white"><ArticleText id={article.id} field="title">{article.title}</ArticleText></Heading>
          <p className="mt-2 grow text-sm leading-6 text-slate-400">
            <ArticleText id={article.id} field="excerpt">{article.excerpt}</ArticleText>
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-xs text-slate-400">
            <CalendarIcon className="h-3.5 w-3.5" />
            <ArticleDate iso={article.publishedAt} />
          </span>
          <span className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-brand-lime">
            <LocalizedText id="articles.readMore">Baca Selengkapnya</LocalizedText>
            <svg aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-1" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  );
}
