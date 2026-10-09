import type { Metadata, Viewport } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import CenteredScrollLink from "./components/centered-scroll-link";
import LanguageController from "./components/language-controller";
import { LocalizedText } from "./components/localized-text";
import LanguageToggle from "./components/language-toggle";
import MobileNavbarMenu from "./components/mobile-navbar-menu";
import ScrollRevealController from "./components/scroll-reveal-controller";
import TypedBrand from "./components/typed-brand";
import { WhatsAppFloat } from "./components/whatsapp";
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
  title: {
    default: "Nocoding",
    template: "%s | Nocoding",
  },
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
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-brand-dark"
        >
          <LocalizedText id="skip.content">Lewati ke konten</LocalizedText>
        </a>
        <Navbar />
        <LanguageController />
        <ScrollRevealController />
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}

function Navbar() {
  const links = [
    { href: "#beranda", label: "Beranda", textId: "nav.home" },
    { href: "#layanan", label: "Layanan", textId: "nav.services" },
    { href: "#proses", label: "Proses", textId: "nav.process" },
    { href: "#project", label: "Project", textId: "nav.project" },
    { href: "#paket", label: "Biaya", textId: "nav.package" },
    { href: "#faq", label: "FAQ", textId: "nav.faq" },
    { href: "#kontak", label: "Kontak", textId: "nav.contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-brand-dark/88 backdrop-blur-xl">
      <nav aria-label="Navigasi utama" className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <a href="#beranda" className="flex items-center gap-3 text-white" aria-label="nocoding_ beranda">
          <span className="nocoding-logo-mark grid h-10 w-10 place-items-center">
            <Image
              src="/nocoding-logo.webp"
              alt=""
              width={40}
              height={40}
              className="nocoding-logo-mark__image h-10 w-10 object-contain"
              loading="eager"
              fetchPriority="high"
            />
          </span>
          <span className="flex h-10 -translate-y-0.5 items-center">
            <TypedBrand className="text-xl font-black leading-none" />
          </span>
        </a>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-4 lg:flex xl:gap-6">
          {links.map((link) => (
            <CenteredScrollLink
              key={link.href}
              href={link.href}
              activeClassName="nav-section-link--active"
              scrollBlock="start"
              className="nav-section-link text-xs font-semibold text-slate-300 transition hover:text-white xl:text-sm"
            >
              <LocalizedText id={link.textId}>{link.label}</LocalizedText>
            </CenteredScrollLink>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <LanguageToggle />
          <MobileNavbarMenu links={links} />
        </div>
      </nav>
    </header>
  );
}
