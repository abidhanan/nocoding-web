import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleBody, { CtaBox, PhotoCredit } from "../../../components/article-body";
import { ArticleDate, ArticleToc, ArticleTranslationProvider, CategoryName, ReadTime, Tr, TranslatedBody } from "../../../components/article-i18n";
import ArticleCard from "../../../components/article-card";
import ArticleEngagement from "../../../components/article-engagement";
import { skeletonOf } from "../../../../lib/articles/skeleton";
import ImageWatermark from "../../../components/image-watermark";
import CalendarIcon from "../../../components/calendar-icon";
import { LiveStatsProvider } from "../../../components/live-stats";
import PopularArticles from "../../../components/popular-articles";
import { LocalizedText } from "../../../components/localized-text";
import { Footer } from "../../../components/site-footer";
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
    title: article.title,
    description: article.excerpt,
    keywords: [...article.categories, "nocoding", "jasa pembuatan website"],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      section: article.categories[0],
      tags: article.categories,
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
  const sections = article.blocks.flatMap((block) => (block.type === "h2" ? [{ id: block.id, text: block.text }] : []));
  const words = article.blocks.reduce((total, block) => {
    const text = "items" in block ? block.items.join(" ") : "text" in block ? (block.text ?? "") : "";

    return total + text.split(/\s+/).filter(Boolean).length;
  }, article.title.split(/\s+/).length);
  const minutes = Math.max(1, Math.round(words / 200));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        url,
        headline: article.title,
        description: article.excerpt,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        inLanguage: "id-ID",
        articleSection: article.categories,
        keywords: article.categories.join(", "),
        wordCount: words,
        timeRequired: `PT${minutes}M`,
        isAccessibleForFree: true,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: { "@id": `${siteUrl}/#organization` },
        publisher: { "@id": `${siteUrl}/#organization` },
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: article.categories.map((name) => ({ "@type": "Thing", name })),
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "[data-speakable]"] },
        image: article.cover ? [`${siteUrl}${article.cover.src}`] : undefined,
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
        <ArticleTranslationProvider id={article.id} skeleton={skeletonOf(article.blocks)}>
        <div className="px-6 pb-16 pt-28 sm:pt-32">
          <LiveStatsProvider initial={counts}>
            <div className="mx-auto grid w-full max-w-[21.5rem] gap-12 sm:max-w-7xl lg:grid-cols-[minmax(0,1fr)_20rem]">
            <article className="min-w-0">
              <nav aria-label="Breadcrumb" data-i18n-aria="aria.breadcrumb" className="text-sm text-slate-400">
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <li>
                    <Link prefetch={false} href="/" className="transition hover:text-brand-cyan">
                      <LocalizedText id="nav.home">Beranda</LocalizedText>
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link prefetch={false} href="/artikel" className="transition hover:text-brand-cyan">
                      <LocalizedText id="articles.eyebrow">Artikel</LocalizedText>
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="min-w-0 font-semibold text-brand-cyan">
                    <Tr field="title">{article.title}</Tr>
                  </li>
                </ol>
              </nav>

              <header className="mt-6">
                {article.categories.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {article.categories.map((name) => (
                      <span key={name} className="inline-flex rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-1 text-xs font-bold text-brand-cyan">
                        <CategoryName name={name} />
                      </span>
                    ))}
                  </div>
                ) : null}
                <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-5xl">
                  <Tr field="title">{article.title}</Tr>
                </h1>
                <p data-speakable className="mt-4 text-justify text-lg leading-8 text-slate-300">
                  <Tr field="excerpt">{article.excerpt}</Tr>
                </p>
                <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-slate-400">
                  <span className="inline-flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <ArticleDate iso={article.publishedAt} />
                  </span>
                  <span>
                    <ReadTime minutes={minutes} />
                  </span>
                </p>
              </header>

              {article.cover ? (
                <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-brand-surface">
                  <Image
                    src={article.cover.src}
                    alt={article.cover.alt}
                    fill
                    loading="eager"
                    fetchPriority="high"
                    sizes="(min-width: 1152px) 44rem, (min-width: 640px) 90vw, 100vw"
                    className="object-cover"
                  />
                  <ImageWatermark size="md" />
                </div>
              ) : null}
              {article.cover && (article.cover.caption || article.cover.alt) ? (
                <p className="mt-3 text-center text-sm text-slate-400">
                  <Tr field="caption">{article.cover.caption || article.cover.alt}</Tr>
                </p>
              ) : null}
              {article.cover ? <PhotoCredit src={article.cover.src} /> : null}

              {sections.length >= 3 ? <ArticleToc items={sections} /> : null}

              <div className="mt-10">
                <TranslatedBody>
                  <ArticleBody blocks={article.blocks} />
                </TranslatedBody>
              </div>

              <ArticleEngagement id={article.id} title={article.title} url={url} />
            </article>

            <PopularArticles items={popularItems} />
            </div>
          </LiveStatsProvider>
        </div>

        {cta ? (
          <div className="px-6 pb-16">
            <div className="mx-auto w-full max-w-[21.5rem] sm:max-w-7xl">
              <CtaBox>
                <Tr field="cta">{cta.text || <LocalizedText id="article.ctaDefault">Konsultasi gratis lewat WhatsApp, kapan pun Anda butuh.</LocalizedText>}</Tr>
              </CtaBox>
            </div>
          </div>
        ) : null}

        {related.length > 0 ? (
          <section aria-labelledby="related-title" className="px-6 pb-14">
            <div className="mx-auto flex w-full max-w-[21.5rem] items-baseline justify-between gap-4 sm:max-w-7xl">
              <h2 id="related-title" className="text-2xl font-black text-white">
                <LocalizedText id="articles.related">Artikel Lainnya</LocalizedText>
              </h2>
              <Link
                prefetch={false}
                href="/artikel"
                className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-full border border-white/20 px-5 py-2 text-sm font-bold text-white transition hover:border-brand-cyan hover:text-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan"
              >
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
        </ArticleTranslationProvider>
      </main>
      <Footer />
    </>
  );
}
