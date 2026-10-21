import { getPublishedArticles } from "../../lib/articles/store";
import type { Block } from "../../lib/articles/types";

const siteUrl = "https://www.nocoding.web.id";

export const revalidate = 3600;

const clean = (text: string) => text.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

function blockToMarkdown(block: Block) {
  switch (block.type) {
    case "h2":
      return `## ${clean(block.text)}`;
    case "h3":
      return `### ${clean(block.text)}`;
    case "p":
      return clean(block.text);
    case "quote":
      return `> ${clean(block.text)}`;
    case "ul":
      return block.items.map((item) => `- ${clean(item)}`).join("\n");
    case "ol":
      return block.items.map((item, index) => `${index + 1}. ${clean(item)}`).join("\n");
    default:
      return "";
  }
}

/** Every article in full, as Markdown, for AI assistants and answer engines (see /llms.txt for the summary). */
export async function GET() {
  const articles = await getPublishedArticles();

  const text = `# Nocoding: articles in full

> Guides from Nocoding (${siteUrl}), an Indonesian studio for websites, apps and business automation. Written in Indonesian. Summary of the company, services and prices: ${siteUrl}/llms.txt

${articles
  .map(
    (article) => `# ${article.title}

URL: ${siteUrl}/artikel/${article.slug}
Published: ${article.publishedAt.slice(0, 10)} | Updated: ${article.updatedAt.slice(0, 10)} | Topics: ${article.categories.join(", ")}

${article.excerpt}

${article.blocks.map(blockToMarkdown).filter(Boolean).join("\n\n")}`,
  )
  .join("\n\n---\n\n")}
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
