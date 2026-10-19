import Link from "next/link";
import { toPreview } from "../../lib/articles/format";
import { getPublishedArticles } from "../../lib/articles/store";
import ArticlesCarousel from "./articles-carousel";
import { LocalizedText } from "./localized-text";

/** "Artikel" block on the home page. Renders nothing while there are no published articles. */
export default async function ArticlesSection() {
  const articles = await getPublishedArticles();

  if (articles.length === 0) {
    return null;
  }

  return (
    <section id="artikel" aria-labelledby="articles-title" className="flex flex-col justify-center border-b border-white/10 px-6 py-8 sm:py-10">
      <header className="mx-auto w-full max-w-[21.5rem] text-center sm:max-w-3xl">
        <h2 id="articles-title" className="text-sm font-bold uppercase text-brand-cyan">
          <LocalizedText id="articles.eyebrow">Artikel</LocalizedText>
        </h2>
        <p className="mt-4 leading-8 text-slate-400">
          <LocalizedText id="articles.description">
            Tips dan panduan seputar website, automasi, dan cara mengembangkan usaha secara online.
          </LocalizedText>
        </p>
      </header>

      <ArticlesCarousel articles={articles.map(toPreview)} />

      <div className="mt-10 flex justify-center">
        <Link
          prefetch={false}
          href="/artikel"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3 text-sm font-bold text-white transition hover:border-brand-cyan hover:text-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2 focus:ring-offset-brand-dark"
        >
          <LocalizedText id="articles.viewAll">Lihat Semua Artikel</LocalizedText>
        </Link>
      </div>
    </section>
  );
}
