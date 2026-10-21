import { ImageResponse } from "next/og";
import { getPublishedArticle, getPublishedArticles } from "../../../../lib/articles/store";

// A PNG share card per article (webp covers are not shown by every social network).
export const alt = "Artikel Nocoding";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const articles = await getPublishedArticles();

  return articles.map((article) => ({ slug: article.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  const title = article?.title ?? "Nocoding";
  const category = article?.categories[0] ?? "Artikel";
  const fontSize = title.length > 90 ? 56 : title.length > 60 ? 64 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #07111f 0%, #0b1a2e 60%, #07111f 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              padding: "10px 26px",
              borderRadius: 999,
              border: "2px solid rgba(34,211,238,0.5)",
              background: "rgba(34,211,238,0.12)",
              color: "#22d3ee",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            {category}
          </div>
        </div>
        <div style={{ display: "flex", fontSize, fontWeight: 800, lineHeight: 1.15 }}>{title}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 38, color: "#94a3b8" }}>
          <div style={{ display: "flex" }}>
            <span style={{ color: "#ffffff", fontWeight: 800 }}>nocoding</span>
            <span style={{ color: "#22d3ee", fontWeight: 800 }}>_</span>
          </div>
          <div style={{ display: "flex", fontSize: 30 }}>www.nocoding.web.id</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
