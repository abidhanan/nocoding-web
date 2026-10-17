import type { Metadata } from "next";
import ArticleGrid from "../../components/article-grid";
import { LocalizedText } from "../../components/localized-text";
import { Footer } from "../../components/site-footer";
import { getPublishedArticles } from "../../../lib/articles/store";

export const revalidate = 300;

export const metadata: Metadata = {
  description:
    "Tips dan panduan seputar website, automasi, dan cara mengembangkan usaha secara online dari tim Nocoding.",
  alternates: { canonical: "/artikel" },
  openGraph: {
    title: "Artikel Nocoding",
    description: "Tips dan panduan seputar website, automasi, dan cara mengembangkan usaha secara online.",
    url: "/artikel",
    type: "website",
  },
};

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();

  return (
    <>
      <main id="konten" className="min-h-screen">
        <section className="px-6 pb-16 pt-28 sm:pb-20 sm:pt-32">
          <header className="mx-auto w-full max-w-[21.5rem] text-center sm:max-w-3xl">
            <h1 className="text-sm font-bold uppercase text-brand-cyan">
              <LocalizedText id="articles.eyebrow">Artikel</LocalizedText>
            </h1>
            <p className="mt-4 leading-8 text-slate-400">
              <LocalizedText id="articles.description">
                Tips dan panduan seputar website, automasi, dan cara mengembangkan usaha secara online.
              </LocalizedText>
            </p>
          </header>

          {articles.length > 0 ? (
            <ArticleGrid articles={articles} />
          ) : (
            <p className="mt-12 text-center text-slate-400">
              <LocalizedText id="articles.empty">Belum ada artikel. Silakan kembali lagi nanti.</LocalizedText>
            </p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
