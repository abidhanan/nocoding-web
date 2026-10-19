import { getPublishedArticles } from "../../lib/articles/store";

const siteUrl = "https://www.nocoding.web.id";

export const revalidate = 3600;

/** Plain-text summary of the site for AI assistants and answer engines (llmstxt.org). */
export async function GET() {
  const articles = await getPublishedArticles();

  const text = `# Nocoding

> Nocoding (nocoding_) is an Indonesian studio that builds websites, apps and business automation: fast, affordable and tailored to each client. Packages start at IDR 500,000 per year with free consultation, maintenance and a domain or hosting for the first year.

Nocoding adalah jasa pembuatan website, aplikasi, dan automasi yang cepat, terjangkau, dan memuaskan. Konsultasi selalu gratis, kapan pun.

## Services / Layanan
- Portofolio / CV pribadi: personal portfolio or online CV websites.
- Landing page / company profile: fast, convincing business websites with copywriting, responsive design and SEO setup.
- Sistem informasi & operasional: dashboards, portals and internal systems with user roles and data export.
- Automasi: automating repetitive work (notifications, tool integrations, workflows).

## Pricing / Biaya
- Paket Kecil (Small): from Rp 500.000 per year. Portfolio, CV or simple landing page; responsive design; technical SEO; contact form; free maintenance and domain for 1 year.
- Paket Besar (Big): from Rp 2.000.000 per year. Multi-page website or app; information and operations system; business process automation; user roles and access; free maintenance and hosting for 1 year.
- Final price is agreed after a free consultation. Visitors outside Indonesia see converted prices in their own currency.

## Process / Proses
1. Audit kebutuhan (requirements). 2. Cek rancangan (design review and approval). 3. Pengerjaan (build, including mobile view). 4. Uji dan revisi (testing and revisions). 5. Rilis (launch with basic SEO).
Simple websites are usually ready in 1-3 working days once materials are ready.

## Contact / Kontak
- WhatsApp: +62 853-2651-3324 (https://wa.me/6285326513324)
- Email: nocodingindonesia@gmail.com
- Instagram: https://www.instagram.com/nocoding_id
- TikTok: https://www.tiktok.com/@nocoding._
- Website: ${siteUrl} (available in 185 languages)

## Articles / Artikel
${articles.map((article) => `- [${article.title}](${siteUrl}/artikel/${article.slug}): ${article.excerpt}`).join("\n")}
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
