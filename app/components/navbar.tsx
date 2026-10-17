import Image from "next/image";
import CenteredScrollLink from "./centered-scroll-link";
import LanguageToggle from "./language-toggle";
import { LocalizedText } from "./localized-text";
import MobileNavbarMenu from "./mobile-navbar-menu";
import { testimonials } from "./testimonials-data";
import TypedBrand from "./typed-brand";

export default function Navbar() {
  const links = [
    { href: "/#beranda", label: "Beranda", textId: "nav.home" },
    { href: "/#layanan", label: "Layanan", textId: "nav.services" },
    { href: "/#proses", label: "Proses", textId: "nav.process" },
    { href: "/#project", label: "Project", textId: "nav.project" },
    ...(testimonials.length > 0 ? [{ href: "/#testimoni", label: "Testimoni", textId: "nav.testimonials" }] : []),
    { href: "/#paket", label: "Biaya", textId: "nav.package" },
    { href: "/#faq", label: "FAQ", textId: "nav.faq" },
    { href: "/#artikel", label: "Artikel", textId: "nav.articles", activePath: "/artikel" },
    { href: "/#kontak", label: "Kontak", textId: "nav.contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-brand-dark/88 backdrop-blur-xl">
      <nav aria-label="Navigasi utama" className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <CenteredScrollLink href="/#beranda" scrollBlock="start" className="flex items-center gap-3 text-white" aria-label="nocoding_ beranda">
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
        </CenteredScrollLink>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-4 lg:flex xl:gap-6">
          {links.map((link) => (
            <CenteredScrollLink
              key={link.href}
              href={link.href}
              activePath={"activePath" in link ? link.activePath : undefined}
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
