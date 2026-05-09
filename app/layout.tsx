import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
          Lewati ke konten
        </a>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

function Navbar() {
  const links = [
    { href: "#layanan", label: "Layanan" },
    { href: "#proses", label: "Proses" },
    { href: "#paket", label: "Paket" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-brand-dark/88 backdrop-blur-xl">
      <nav aria-label="Navigasi utama" className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <a href="#konten" className="flex items-center gap-3 text-white" aria-label="nocoding beranda">
          <span className="grid h-9 w-9 place-items-center bg-brand-gradient text-lg font-black text-white">N</span>
          <span className="text-xl font-black">
            nocoding<span className="text-brand-cyan">.</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-semibold text-slate-300 transition hover:text-white">
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#kontak"
          className="hidden min-h-10 items-center justify-center rounded-full bg-brand-cyan px-4 py-2 text-sm font-bold text-brand-dark transition hover:bg-brand-lime focus:outline-none focus:ring-2 focus:ring-brand-lime focus:ring-offset-2 focus:ring-offset-brand-dark sm:inline-flex"
        >
          Mulai
        </a>
      </nav>
    </header>
  );
}
