import Image from "next/image";
import Link from "next/link";
import CenteredScrollLink from "./centered-scroll-link";
import { LocalizedText } from "./localized-text";
import { createWhatsAppHref, whatsappDisplay } from "./projects-data";
import TypedBrand from "./typed-brand";
import { WhatsAppIcon } from "./whatsapp";

type SocialIconName = "instagram" | "tiktok";

export const contactWhatsAppHref = createWhatsAppHref(
  "Halo Nocoding, saya ingin konsultasi kebutuhan website untuk bisnis saya. Mohon info langkah berikutnya.",
);

const contactEmail = "nocodingindonesia@gmail.com";
const contactEmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${contactEmail}&su=${encodeURIComponent(
  "Konsultasi Website Nocoding",
)}&body=${encodeURIComponent(
  "Halo Nocoding, saya ingin konsultasi kebutuhan website untuk bisnis saya. Mohon info langkah berikutnya.",
)}`;


const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/nocoding_id?igsh=MTBtdWZsN2doODVtYw==",
    icon: "instagram",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@nocoding._?_r=1&_t=ZS-96EiIaXYvbu",
    icon: "tiktok",
  },
] satisfies Array<{
  name: string;
  href: string;
  icon: SocialIconName;
}>;


export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-dark px-6 pt-7 pb-0 text-xs text-slate-400">
      <div className="mx-auto w-full max-w-[21.5rem] sm:max-w-7xl">
        <div className="grid gap-6 text-center md:grid-cols-3 md:items-start md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <CenteredScrollLink
              href="/#beranda"
              scrollBlock="start"
              className="inline-flex h-9 items-center gap-2.5 text-white"
              aria-label="nocoding_ beranda"
              data-i18n-aria="aria.home"
            >
              <span className="nocoding-logo-mark grid h-9 w-9 place-items-center">
                <Image
                  src="/nocoding-logo.webp"
                  alt=""
                  width={36}
                  height={36}
                  className="nocoding-logo-mark__image h-9 w-9 object-contain"
                />
              </span>
              <span className="flex h-9 -translate-y-0.5 items-center text-lg font-black leading-none">
                <TypedBrand />
              </span>
            </CenteredScrollLink>
            <p className="mt-3 w-full max-w-[21.5rem] leading-6 text-slate-400">
              <span className="block">
                <LocalizedText id="hero.description.line1">Jasa pembuatan website, aplikasi, dan automasi</LocalizedText>
              </span>
              <span className="block">
                <LocalizedText id="hero.description.line2">yang cepat, terjangkau, dan memuaskan.</LocalizedText>
              </span>
            </p>
          </div>

          <div className="flex flex-col items-center md:text-center">
            <p className="flex h-9 items-center text-xs font-black uppercase tracking-[0.22em] text-brand-cyan sm:tracking-[0.32em]">
              <LocalizedText id="footer.connect">Mari Terhubung</LocalizedText>
            </p>
            <div className="mt-3 flex justify-center">
              <SocialLinks tone="light" />
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex flex-col items-center md:items-start md:text-left">
              <p className="flex h-9 items-center text-xs font-black uppercase tracking-[0.32em] text-brand-cyan">
                <LocalizedText id="footer.contact">Kontak</LocalizedText>
              </p>
              <a
                href={contactWhatsAppHref}
                data-i18n-wa="wa.contact"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2.5 text-sm font-normal leading-6 text-white transition hover:text-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2 focus:ring-offset-brand-dark"
              >
                <WhatsAppIcon className="h-4 w-4 text-brand-cyan" />
                {whatsappDisplay}
              </a>
              <a
                href={contactEmailHref}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center gap-2.5 text-sm font-normal leading-6 text-white transition hover:text-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2 focus:ring-offset-brand-dark"
              >
                <MailIcon className="h-4 w-4 text-brand-cyan" />
                {contactEmail}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-7 flex min-h-[4.75rem] flex-col items-center justify-center gap-2 border-t border-white/10 py-4 text-center text-[0.72rem] text-slate-400">
          <nav aria-label="Informasi legal" data-i18n-aria="aria.legal" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            {[
              { href: "/kebijakan-privasi", id: "legal.privacy", label: "Kebijakan Privasi" },
              { href: "/syarat-ketentuan", id: "legal.terms", label: "Syarat dan Ketentuan" },
              { href: "/kebijakan-cookie", id: "legal.cookies", label: "Kebijakan Cookie" },
            ].map((item) => (
              <Link
                key={item.href}
                prefetch={false}
                href={item.href}
                className="transition hover:text-brand-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
              >
                <LocalizedText id={item.id}>{item.label}</LocalizedText>
              </Link>
            ))}
          </nav>
          <p>
            <LocalizedText id="footer.copyright.prefix">&copy; 2026 Nocoding - Dibuat oleh</LocalizedText>{" "}
            <a
              href="https://www.abidhanan.my.id/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-slate-300 transition hover:text-brand-cyan"
            >
              Abid Hanan Wicaksono
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLinks({ className = "", tone }: { className?: string; tone: "dark" | "light" }) {
  const toneClass =
    tone === "dark"
      ? "border-brand-dark/15 text-brand-dark hover:border-brand-blue hover:bg-brand-blue hover:text-white focus:ring-brand-blue"
      : "border-white/10 text-slate-300 hover:border-brand-cyan hover:bg-brand-cyan hover:text-brand-dark focus:ring-brand-cyan focus:ring-offset-brand-dark";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Buka ${social.name} nocoding`}
          className={`grid h-9 w-9 place-items-center rounded-full border transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${toneClass}`}
        >
          <SocialIcon name={social.icon} className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}

function MailIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function SocialIcon({ name, className = "h-5 w-5" }: { name: SocialIconName; className?: string }) {
  if (name === "instagram") {
    return (
      <svg
        aria-hidden="true"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect width="16" height="16" x="4" y="4" rx="4" />
        <circle cx="12" cy="12" r="3.2" />
        <path d="M16.8 7.2h.01" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M16.9 3.2c.4 2.3 1.8 3.8 4 4v3.5c-1.6.1-3.1-.4-4.1-1.2v5.9c0 3.4-2.3 5.6-5.7 5.6-3.1 0-5.5-2.1-5.5-5.1 0-3.2 2.7-5.3 6.2-5v3.6c-1.5-.2-2.6.5-2.6 1.7 0 1 .8 1.6 1.9 1.6 1.2 0 2-.7 2-2.2V3.2h3.8Z" />
    </svg>
  );
}
