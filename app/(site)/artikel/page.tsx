import type { Metadata } from "next";
import Link from "next/link";
import ArticleGrid from "../../components/article-grid";
import DocumentTitle from "../../components/document-title";
import { LocalizedText } from "../../components/localized-text";
import { Footer } from "../../components/site-footer";
import { toPreview } from "../../../lib/articles/format";
import { getPublishedArticles } from "../../../lib/articles/store";

export const revalidate = 300;

const siteUrl = "https://www.nocoding.web.id";

export const metadata: Metadata = {
  title: "Artikel",
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Artikel Nocoding",
    url: `${siteUrl}/artikel`,
    inLanguage: "id-ID",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/artikel/${article.slug}`,
        name: article.title,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DocumentTitle id="title.articles" fallback="Artikel" />
      <main id="konten" className="min-h-screen">
        <section className="px-6 pb-16 pt-28 sm:pb-20 sm:pt-32">
          <nav aria-label="Breadcrumb" data-i18n-aria="aria.breadcrumb" className="mx-auto w-full max-w-[21.5rem] text-sm text-slate-400 sm:max-w-7xl">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li>
                <Link prefetch={false} href="/" className="transition hover:text-brand-cyan">
                  <LocalizedText id="nav.home">Beranda</LocalizedText>
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-brand-cyan">
                <LocalizedText id="articles.eyebrow">Artikel</LocalizedText>
              </li>
            </ol>
          </nav>

          <header className="mx-auto mt-6 w-full max-w-[21.5rem] text-center sm:max-w-3xl">
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
            <ArticleGrid articles={articles.map(toPreview)} />
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
