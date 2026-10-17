import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://www.nocoding.web.id";
const siteDescription =
  "Jasa pembuatan website, aplikasi, dan automasi yang cepat, terjangkau, dan memuaskan.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Nocoding",
  // The browser tab always reads "Nocoding", whichever page is open.
  title: "Nocoding",
  description: siteDescription,
  keywords: [
    "nocoding",
    "jasa pembuatan website",
    "jasa pembuatan website profesional",
    "jasa buat website bisnis",
    "jasa website",
    "pembuatan landing page",
    "website bisnis",
    "company profile",
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
  alternates: {
    canonical: "/",
    languages: {
      "id-ID": "/",
      "en-US": "/",
    },
  },
  openGraph: {
    title: "Nocoding",
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
    title: "Nocoding",
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${siteUrl}/#organization`,
      name: "Nocoding",
      alternateName: ["nocoding_", "Nocoding Indonesia"],
      url: siteUrl,
      logo: `${siteUrl}/nocoding-logo.webp`,
      image: `${siteUrl}/nocoding-logo.webp`,
      description: siteDescription,
      email: contactEmail,
      areaServed: { "@type": "Country", name: "Indonesia" },
      priceRange: "Rp 2.500.000+",
      knowsAbout: [
        "Jasa pembuatan website",
        "Jasa pembuatan website profesional",
        "Portofolio online",
        "CV online",
        "Landing page",
        "Company profile",
        "Sistem informasi",
        "Sistem operasional",
        "Automasi",
        "No-code",
      ],
      sameAs: [
        "https://www.instagram.com/nocoding_id",
        "https://www.tiktok.com/@nocoding._",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: contactEmail,
        availableLanguage: ["id", "en"],
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
