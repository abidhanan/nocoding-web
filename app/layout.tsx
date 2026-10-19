import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "optional",
});

const siteUrl = "https://www.nocoding.web.id";
const siteDescription =
  "Jasa pembuatan website, aplikasi, dan automasi yang cepat, terjangkau, dan memuaskan. Paket mulai Rp 500 ribu, konsultasi gratis, plus maintenance dan domain atau hosting 1 tahun.";
const siteTitle = "Nocoding - Jasa Pembuatan Website, Aplikasi & Automasi";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Nocoding",
  // The home page title carries the keywords; other pages read "Page name - Nocoding".
  title: {
    default: siteTitle,
    template: "%s - Nocoding",
  },
  description: siteDescription,
  keywords: [
    "nocoding",
    "jasa pembuatan website",
    "jasa pembuatan website profesional",
    "jasa pembuatan website murah",
    "jasa buat website bisnis",
    "jasa website",
    "jasa pembuatan aplikasi",
    "jasa automasi bisnis",
    "pembuatan sistem informasi",
    "pembuatan landing page",
    "website company profile",
    "website UMKM",
    "website portofolio",
    "CV online",
    "katalog online",
    "no-code",
    "digitalisasi bisnis",
  ],
  authors: [{ name: "Nocoding", url: siteUrl }],
  creator: "Nocoding",
  publisher: "Nocoding",
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  manifest: "/manifest.webmanifest",
  // One URL serves every language (the visitor picks one in the page), so there are no per-language
  // alternates to declare. llms.txt is a plain-text summary written for AI assistants.
  alternates: {
    canonical: "/",
    types: { "text/plain": [{ url: "/llms.txt", title: "Nocoding for AI assistants (llms.txt)" }] },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Nocoding",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Nocoding - Jasa pembuatan website, aplikasi, dan automasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07111f",
  colorScheme: "dark",
};

const contactEmail = "nocodingindonesia@gmail.com";
const contactPhone = "+6285326513324";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${siteUrl}/#organization`,
      name: "Nocoding",
      alternateName: ["nocoding_", "Nocoding Indonesia"],
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/nocoding-logo.webp`, width: 640, height: 586 },
      image: `${siteUrl}/opengraph-image.png`,
      description: [
        { "@language": "id", "@value": siteDescription },
        {
          "@language": "en",
          "@value":
            "Nocoding builds websites, apps and business automation that are fast, affordable and tailored to each client. Packages start at IDR 500,000 with free consultation, maintenance and a domain or hosting for the first year.",
        },
      ],
      slogan: "Jasa pembuatan website, aplikasi, dan automasi",
      email: contactEmail,
      telephone: contactPhone,
      areaServed: [{ "@type": "Country", name: "Indonesia" }, { "@type": "Place", name: "Worldwide (remote)" }],
      priceRange: "Rp 500.000 - Rp 2.000.000+",
      currenciesAccepted: "IDR",
      knowsAbout: [
        "Jasa pembuatan website",
        "Jasa pembuatan website profesional",
        "Portofolio online",
        "CV online",
        "Landing page",
        "Company profile",
        "Sistem informasi",
        "Sistem operasional",
        "Automasi bisnis",
        "No-code",
        "SEO teknis",
      ],
      sameAs: [
        "https://www.instagram.com/nocoding_id",
        "https://www.tiktok.com/@nocoding._",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: contactEmail,
        telephone: contactPhone,
        availableLanguage: ["Indonesian", "English"],
        areaServed: "ID",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Nocoding",
      description: siteDescription,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "id-ID",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.variable} bg-brand-dark font-sans text-slate-200 antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
