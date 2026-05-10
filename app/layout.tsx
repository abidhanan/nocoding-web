import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import CenteredScrollLink from "./components/centered-scroll-link";
import { LocalizedText } from "./components/i18n";
import LanguageToggle from "./components/language-toggle";
import MobileNavbarMenu from "./components/mobile-navbar-menu";
import ScrollRevealController from "./components/scroll-reveal-controller";
import TypedBrand from "./components/typed-brand";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl = "https://nocoding.id";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "nocoding. | Website bisnis tanpa proses berbelit",
    template: "%s | nocoding.",
  },
  description:
    "nocoding membantu bisnis membuat website, landing page, katalog, dan sistem operasional yang responsif, cepat, dan siap launch.",
  keywords: [
    "nocoding",
    "jasa website",
    "landing page",
    "website bisnis",
    "no-code",
    "digitalisasi bisnis",
  ],
  authors: [{ name: "nocoding." }],
  creator: "nocoding.",
  publisher: "nocoding.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "nocoding. | Website bisnis tanpa proses berbelit",
    description:
      "Bangun website profesional, landing page, katalog, dan sistem operasional yang siap dikembangkan.",
    url: "/",
    siteName: "nocoding.",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "nocoding. | Website bisnis tanpa proses berbelit",
    description:
      "Website bisnis siap jalan, tampak serius, dan mudah dikembangkan.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.variable} bg-brand-dark font-sans text-slate-200 antialiased`}>
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-brand-dark"
        >
          <LocalizedText id="skip.content">Lewati ke konten</LocalizedText>
        </a>
        <Navbar />
        <ScrollRevealController />
        {children}
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
    { href: "#paket", label: "Paket", textId: "nav.package" },
    { href: "#faq", label: "FAQ", textId: "nav.faq" },
    { href: "#kontak", label: "Kontak", textId: "nav.contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-brand-dark/88 backdrop-blur-xl">
      <nav aria-label="Navigasi utama" className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <a href="#beranda" className="flex items-center gap-3 text-white" aria-label="nocoding beranda">
          <span className="nocoding-logo-mark grid h-10 w-10 place-items-center">
            <Image
              src="/nocoding-logo.png"
              alt=""
              width={40}
              height={37}
              className="nocoding-logo-mark__image h-10 w-10 object-contain"
              priority
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
              scrollBlock={["#beranda", "#project", "#kontak"].includes(link.href) ? "start" : "center"}
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
