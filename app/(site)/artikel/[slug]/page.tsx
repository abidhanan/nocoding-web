import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleBody, { CtaBox } from "../../../components/article-body";
import ArticleCard from "../../../components/article-card";
import ArticleEngagement from "../../../components/article-engagement";
import ImageWatermark from "../../../components/image-watermark";
import CalendarIcon from "../../../components/calendar-icon";
import { LiveStatsProvider } from "../../../components/live-stats";
import PopularArticles from "../../../components/popular-articles";
import { LocalizedText } from "../../../components/localized-text";
import { Footer } from "../../../components/site-footer";
import { formatDate } from "../../../../lib/articles/format";
import { getPublishedArticle, getPublishedArticles } from "../../../../lib/articles/store";
import { getAllCounts } from "../../../../lib/articles/stats";

export const revalidate = 300;

const siteUrl = "https://www.nocoding.web.id";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const articles = await getPublishedArticles();

  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);

  if (!article) {
    return {};
  }

  const url = `/artikel/${article.slug}`;

  return {
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: article.cover ? [{ url: article.cover.src, alt: article.cover.alt }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: article.cover ? [article.cover.src] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);

  if (!article) {
    notFound();
  }

  const others = (await getPublishedArticles()).filter((item) => item.id !== article.id);
  const related = others.slice(0, 3);
  const counts = await getAllCounts();
  // Every other article is a candidate; the list ranks them by the live counters and shows 4.
  const popularItems = others.map((item) => ({ id: item.id, slug: item.slug, title: item.title, cover: item.cover?.src ?? null }));
  const cta = article.blocks.find((block) => block.type === "cta");
  const url = `${siteUrl}/artikel/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.excerpt,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        inLanguage: "id-ID",
        articleSection: article.categories,
        mainEntityOfPage: url,
        author: { "@type": "Organization", name: "Nocoding", url: siteUrl },
        publisher: { "@type": "Organization", name: "Nocoding", url: siteUrl },
        image: article.cover ? `${siteUrl}${article.cover.src}` : undefined,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Artikel", item: `${siteUrl}/artikel` },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main id="konten" className="min-h-screen">
        <div className="px-6 pb-16 pt-28 sm:pt-32">
          <LiveStatsProvider initial={counts}>
            <div className="mx-auto grid w-full max-w-[21.5rem] gap-12 sm:max-w-6xl lg:grid-cols-[minmax(0,1fr)_20rem]">
            <article className="min-w-0">
              <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <li>
                    <Link href="/" className="transition hover:text-brand-cyan">
                      <LocalizedText id="nav.home">Beranda</LocalizedText>
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href="/artikel" className="transition hover:text-brand-cyan">
                      <LocalizedText id="articles.eyebrow">Artikel</LocalizedText>
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="min-w-0 font-semibold text-brand-cyan">
                    {article.title}
                  </li>
                </ol>
              </nav>

              <header className="mt-6">
                {article.categories.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {article.categories.map((name) => (
                      <span key={name} className="inline-flex rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-1 text-xs font-bold text-brand-cyan">
                        {name}
                      </span>
                    ))}
                  </div>
                ) : null}
                <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-5xl">{article.title}</h1>
                <p className="mt-4 text-lg leading-8 text-slate-300">{article.excerpt}</p>
                <p className="mt-5 inline-flex items-center gap-2 text-sm text-slate-400">
                  <CalendarIcon className="h-4 w-4" />
                  <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                </p>
              </header>

              {article.cover ? (
                <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-brand-surface">
                  <Image
                    src={article.cover.src}
                    alt={article.cover.alt}
                    fill
                    priority
                    sizes="(min-width: 1152px) 44rem, (min-width: 640px) 90vw, 100vw"
                    className="object-cover"
                  />
                  <ImageWatermark size="md" />
                </div>
              ) : null}
              {article.cover && (article.cover.caption || article.cover.alt) ? (
                <p className="mt-3 text-center text-sm text-slate-400">{article.cover.caption || article.cover.alt}</p>
              ) : null}

              <div className="mt-10">
                <ArticleBody blocks={article.blocks} />
              </div>

              <ArticleEngagement id={article.id} title={article.title} url={url} />
            </article>

            <PopularArticles items={popularItems} />
            </div>
          </LiveStatsProvider>
        </div>

        {cta ? (
          <div className="px-6 pb-16">
            <div className="mx-auto w-full max-w-[21.5rem] sm:max-w-4xl">
              <CtaBox text={cta.text} />
            </div>
          </div>
        ) : null}

        {related.length > 0 ? (
          <section aria-labelledby="related-title" className="px-6 pb-14">
            <div className="mx-auto flex w-full max-w-[21.5rem] items-baseline justify-between gap-4 sm:max-w-7xl">
              <h2 id="related-title" className="text-2xl font-black text-white">
                <LocalizedText id="articles.related">Artikel Lainnya</LocalizedText>
              </h2>
              <Link href="/artikel" className="shrink-0 text-sm font-bold text-brand-lime transition hover:text-brand-cyan">
                <LocalizedText id="articles.seeAll">Lihat Semua</LocalizedText>
              </Link>
            </div>
            <div className="mx-auto mt-8 grid w-full max-w-[21.5rem] gap-5 sm:max-w-7xl md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ArticleCard key={item.id} article={item} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
