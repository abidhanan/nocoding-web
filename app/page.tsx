import ProjectsSection from "./components/projects-section";
import CenteredScrollLink from "./components/centered-scroll-link";
import { LocalizedText } from "./components/i18n";
import MobilePackageSlider from "./components/mobile-package-slider";
import TypedBrand from "./components/typed-brand";
import Image from "next/image";
import type { ReactNode } from "react";

type IconName =
  | "arrow"
  | "audit"
  | "bolt"
  | "briefcase"
  | "check"
  | "code"
  | "layers"
  | "mail"
  | "monitor"
  | "rocket"
  | "search"
  | "shield"
  | "spark"
  | "storefront"
  | "workflow";

type SocialIconName = "instagram" | "tiktok";

const services = [
  {
    title: "Website bisnis",
    description:
      "Landing page, company profile, katalog, dan halaman kampanye yang cepat diluncurkan tanpa mengorbankan kualitas visual.",
    icon: "monitor",
    items: ["Copywriting halaman", "Desain responsif", "Setup SEO dasar"],
  },
  {
    title: "Sistem operasional",
    description:
      "Dashboard internal, form order, portal klien, dan automasi proses harian yang disesuaikan dengan cara kerja tim Anda.",
    icon: "workflow",
    items: ["Alur kerja rapi", "Role pengguna", "Export data"],
  },
  {
    title: "Digital commerce",
    description:
      "Katalog produk, halaman promo, checkout ringan, dan integrasi kontak penjualan untuk mempercepat konversi.",
    icon: "storefront",
    items: ["Struktur katalog", "CTA penjualan", "Analytics siap pakai"],
  },
] satisfies Array<{
  title: string;
  description: string;
  icon: IconName;
  items: string[];
}>;

const process = [
  {
    title: "Audit kebutuhan",
    description:
      "Kami memetakan target bisnis, referensi visual, fitur utama, dan prioritas peluncuran.",
    icon: "audit",
  },
  {
    title: "Rancang pengalaman",
    description:
      "Struktur halaman, copy, komponen, dan alur konversi dirapikan sebelum masuk produksi.",
    icon: "layers",
  },
  {
    title: "Bangun dan uji",
    description:
      "Website dibuat responsif, diuji performa dasar, dan disiapkan untuk update konten berikutnya.",
    icon: "code",
  },
  {
    title: "Launch terukur",
    description:
      "Publikasi, metadata, sitemap, dan arahan optimasi pasca-launch diselesaikan bersama.",
    icon: "rocket",
  },
] satisfies Array<{
  title: string;
  description: string;
  icon: IconName;
}>;

const packages = [
  {
    name: "Starter",
    price: "Mulai Rp2,5 jt",
    description: "Untuk bisnis yang butuh halaman profesional cepat tayang.",
    features: [
      "1 landing page responsif",
      "Copywriting struktur utama",
      "SEO teknis dasar",
      "Form kontak via email",
    ],
  },
  {
    name: "Growth",
    price: "Mulai Rp7,5 jt",
    description: "Untuk brand yang butuh beberapa halaman dan alur konversi matang.",
    features: [
      "Hingga 5 halaman inti",
      "Desain komponen khusus",
      "Integrasi analytics",
      "Dokumentasi update konten",
    ],
    featured: true,
  },
  {
    name: "System",
    price: "By scope",
    description: "Untuk workflow internal, portal, katalog, atau dashboard bisnis.",
    features: [
      "Mapping proses bisnis",
      "Dashboard atau portal",
      "Role dan akses pengguna",
      "Roadmap iterasi fitur",
    ],
  },
] satisfies Array<{
  name: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
}>;

const faqs = [
  {
    question: "Apakah benar tanpa coding dari sisi klien?",
    answer:
      "Ya. Tim nocoding menangani struktur teknis, desain, dan deployment. Setelah launch, konten penting dibuat mudah diperbarui sesuai kebutuhan proyek.",
  },
  {
    question: "Berapa lama proses pembuatan website?",
    answer:
      "Landing page sederhana umumnya 5-10 hari kerja setelah materi siap. Sistem atau website multi-halaman mengikuti scope, jumlah integrasi, dan ritme feedback.",
  },
  {
    question: "Apakah bisa lanjut maintenance?",
    answer:
      "Bisa. Setelah website tayang, Anda dapat memilih dukungan update konten, peningkatan performa, halaman baru, atau pengembangan fitur lanjutan.",
  },
  {
    question: "Apa yang perlu disiapkan sebelum mulai?",
    answer:
      "Cukup siapkan gambaran bisnis, layanan utama, referensi visual, dan kontak yang ingin ditampilkan. Jika belum ada materi lengkap, kami bantu rapikan strukturnya.",
  },
] satisfies Array<{
  question: string;
  answer: string;
}>;

const contactEmail = "nocodingindonesia@gmail.com";
const contactEmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${contactEmail}&su=Konsultasi%20Website%20nocoding`;

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

export default function Home() {
  return (
    <main id="konten" className="min-h-screen overflow-hidden">
      <Hero />
      <ServicesSection />
      <ProcessSection />
      <ProjectsSection />
      <PackagesSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}

function Hero() {
  return (
    <section id="beranda" className="relative isolate overflow-hidden border-b border-white/10 bg-brand-dark px-6 pb-16 pt-28 sm:pt-32 lg:min-h-[82svh] lg:pb-20">
      <div aria-hidden="true" className="absolute inset-0 bg-page-grid opacity-35" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-80" />
      <HeroScene />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center text-center lg:items-start lg:text-left">
        <div className="w-full max-w-[21.5rem] sm:max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-200 backdrop-blur">
            <span className="h-2 w-2 bg-brand-lime" aria-hidden="true" />
            <LocalizedText id="hero.eyebrow">Studio website no-code dan custom system</LocalizedText>
          </p>
          <h1 aria-label="nocoding_" className="text-6xl font-black leading-[0.95] text-white lg:text-7xl">
            <TypedBrand />
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            <LocalizedText id="hero.description">
              Website bisnis siap jalan, tampak serius, dan mudah dikembangkan.
              Kami bantu dari strategi halaman, desain, konten, sampai launch.
            </LocalizedText>
          </p>

          <div className="mt-9 flex w-full max-w-[21.5rem] flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center lg:justify-start">
            <CenteredScrollLink
              href="#kontak"
              scrollBlock="start"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-dark transition hover:bg-brand-lime focus:outline-none focus:ring-2 focus:ring-brand-lime focus:ring-offset-2 focus:ring-offset-brand-dark sm:w-auto"
            >
              <LocalizedText id="hero.cta.contact">Konsultasi gratis</LocalizedText>
              <Icon name="arrow" className="h-4 w-4" />
            </CenteredScrollLink>
            <CenteredScrollLink
              href="#layanan"
              scrollBlock="start"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:border-brand-cyan hover:text-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2 focus:ring-offset-brand-dark sm:w-auto"
            >
              <LocalizedText id="hero.cta.services">Lihat layanan</LocalizedText>
              <Icon name="search" className="h-4 w-4" />
            </CenteredScrollLink>
          </div>
        </div>

        <div className="mt-12 grid w-full max-w-[21.5rem] grid-cols-1 border border-white/10 bg-white/[0.03] sm:max-w-2xl sm:grid-cols-3">
          <Stat value="5-10" label="hari kerja untuk landing page awal" textId="hero.stat.days" />
          <Stat value="3" label="lapis pekerjaan: strategi, desain, launch" textId="hero.stat.layers" />
          <Stat value="100%" label="responsif untuk mobile dan desktop" textId="hero.stat.responsive" />
        </div>
      </div>
    </section>
  );
}

function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
      <div className="absolute right-[7%] top-1/2 w-[430px] -translate-y-1/2 border border-white/10 bg-brand-surface/80 p-4 shadow-2xl shadow-black/30 backdrop-blur">
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-coral" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-amber" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-lime" />
          </div>
          <span className="text-xs font-semibold uppercase text-slate-400">
            <LocalizedText id="hero.board.title">Launch board</LocalizedText>
          </span>
        </div>

        <div className="grid gap-3">
          <MockRow label="Homepage" labelId="hero.board.homepage" value="96%" tone="cyan" />
          <MockRow label="Copywriting" labelId="hero.board.copywriting" value="Ready" valueId="hero.board.ready" tone="lime" />
          <MockRow label="SEO setup" labelId="hero.board.seo" value="Mapped" valueId="hero.board.mapped" tone="amber" />
        </div>

        <div className="mt-5 grid grid-cols-[1fr_120px] gap-3">
          <div className="border border-white/10 bg-brand-dark/70 p-4">
            <span className="block text-xs text-slate-400">
              <LocalizedText id="hero.board.path">Conversion path</LocalizedText>
            </span>
            <div className="mt-3 flex items-center gap-2">
              <span className="h-8 w-8 bg-brand-blue/25" />
              <span className="h-px flex-1 bg-white/20" />
              <span className="h-8 w-8 bg-brand-mint/25" />
              <span className="h-px flex-1 bg-white/20" />
              <span className="h-8 w-8 bg-brand-lime/25" />
            </div>
          </div>
          <div className="border border-brand-cyan/30 bg-brand-cyan/10 p-4 text-right">
            <span className="block text-2xl font-black text-white">A+</span>
            <span className="text-xs text-slate-300">
              <LocalizedText id="hero.board.readiness">readiness</LocalizedText>
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}

function ServicesSection() {
  return (
    <section id="layanan" className="bg-brand-dark px-6 py-20 sm:py-24">
      <SectionHeader
        eyebrow="Layanan"
        eyebrowId="services.eyebrow"
        description="Kami menggabungkan strategi konten, desain antarmuka, dan implementasi teknis agar website bukan sekadar online, tapi benar-benar bekerja."
        descriptionId="services.description"
      />

      <div className="mx-auto mt-12 grid w-full max-w-[21.5rem] gap-4 sm:max-w-7xl md:grid-cols-3">
        {services.map((service, serviceIndex) => (
          <article key={service.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-6 transition hover:border-brand-cyan/60 hover:bg-white/[0.05]">
            <div className="mb-6 grid h-11 w-11 place-items-center bg-brand-cyan/10 text-brand-cyan">
              <Icon name={service.icon} className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-white">
              <LocalizedText id={`services.${serviceIndex}.title`}>{service.title}</LocalizedText>
            </h3>
            <p className="mt-3 leading-7 text-slate-400">
              <LocalizedText id={`services.${serviceIndex}.description`}>{service.description}</LocalizedText>
            </p>
            <ul className="mt-6 space-y-3">
              {service.items.map((item, itemIndex) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                  <Icon name="check" className="h-4 w-4 text-brand-lime" />
                  <LocalizedText id={`services.${serviceIndex}.item.${itemIndex}`}>{item}</LocalizedText>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="proses" className="border-y border-white/10 bg-brand-night px-6 py-20 sm:py-24">
      <SectionHeader
        eyebrow="Proses"
        eyebrowId="process.eyebrow"
        description="Setiap fase punya output yang bisa dilihat, diuji, dan disetujui. Anda tahu pekerjaan bergerak ke mana."
        descriptionId="process.description"
      />

      <div className="process-mobile-timeline mx-auto mt-12 grid w-full max-w-[21.5rem] gap-4 sm:max-w-7xl lg:grid-cols-4">
        {process.map((step, index) => (
          <article key={step.title} className="process-timeline-card rounded-lg border border-white/10 bg-brand-dark p-6">
            <div className="flex items-center justify-between">
              <div className="grid h-11 w-11 place-items-center bg-white/5 text-brand-mint">
                <Icon name={step.icon} className="h-5 w-5" />
              </div>
              <span className="text-sm font-black text-slate-600">0{index + 1}</span>
            </div>
            <h3 className="mt-8 text-lg font-bold text-white">
              <LocalizedText id={`process.${index}.title`}>{step.title}</LocalizedText>
            </h3>
            <p className="mt-3 leading-7 text-slate-400">
              <LocalizedText id={`process.${index}.description`}>{step.description}</LocalizedText>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PackagesSection() {
  return (
    <section id="paket" className="border-y border-white/10 bg-brand-night px-6 py-20 sm:py-24">
      <SectionHeader
        eyebrow="Paket"
        eyebrowId="packages.eyebrow"
        description="Paket dapat disesuaikan setelah sesi konsultasi agar budget, timeline, dan hasilnya tetap masuk akal."
        descriptionId="packages.description"
      />

      <MobilePackageSlider packages={packages} />

      <div className="mx-auto mt-12 hidden w-full max-w-[21.5rem] gap-4 sm:max-w-7xl lg:grid lg:grid-cols-3">
        {packages.map((item, packageIndex) => (
          <article
            key={item.name}
            className={`rounded-lg border p-6 ${
              item.featured
                ? "border-brand-lime bg-brand-lime text-brand-dark"
                : "border-white/10 bg-brand-dark text-slate-200"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className={`text-xl font-black ${item.featured ? "text-brand-dark" : "text-white"}`}>{item.name}</h3>
                <p className={`mt-2 text-sm ${item.featured ? "text-brand-dark/75" : "text-slate-400"}`}>
                  <LocalizedText id={`packages.${packageIndex}.description`}>{item.description}</LocalizedText>
                </p>
              </div>
              {item.featured ? (
                <span className="bg-brand-dark px-2 py-1 text-xs font-black text-white">
                  <LocalizedText id="packages.1.badge">Populer</LocalizedText>
                </span>
              ) : null}
            </div>

            <p className={`mt-8 text-3xl font-black ${item.featured ? "text-brand-dark" : "text-white"}`}>
              <LocalizedText id={`packages.${packageIndex}.price`}>{item.price}</LocalizedText>
            </p>

            <ul className="mt-8 space-y-3">
              {item.features.map((feature, featureIndex) => (
                <li key={feature} className="flex gap-3 text-sm font-medium">
                  <Icon name="check" className={`mt-0.5 h-4 w-4 ${item.featured ? "text-brand-dark" : "text-brand-lime"}`} />
                  <span>
                    <LocalizedText id={`packages.${packageIndex}.feature.${featureIndex}`}>{feature}</LocalizedText>
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="flex min-h-[calc(100svh-4rem)] items-center bg-brand-dark px-6 py-16">
      <div className="mx-auto grid w-full max-w-[21.5rem] gap-10 sm:max-w-7xl lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="text-center lg:text-left">
          <p className="text-sm font-bold uppercase text-brand-cyan">
            <LocalizedText id="faq.eyebrow">FAQ</LocalizedText>
          </p>
          <h2 className="mt-4 text-4xl font-black leading-tight text-white">
            <LocalizedText id="faq.title">Pertanyaan yang biasanya muncul sebelum mulai.</LocalizedText>
          </h2>
          <p className="mt-5 leading-8 text-slate-400">
            <LocalizedText id="faq.description">
              Jika kebutuhan Anda belum tercakup di sini, sesi konsultasi awal akan membantu menentukan scope paling efisien.
            </LocalizedText>
          </p>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((faq, faqIndex) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-left text-lg font-bold text-white">
                <LocalizedText id={`faq.${faqIndex}.question`}>{faq.question}</LocalizedText>
                <span className="grid h-8 w-8 shrink-0 place-items-center border border-white/10 text-brand-cyan transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                <LocalizedText id={`faq.${faqIndex}.answer`}>{faq.answer}</LocalizedText>
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="kontak" className="flex min-h-[calc(100svh-4rem)] flex-col border-y border-white/10 bg-brand-dark text-brand-dark">
      <div className="flex flex-1 items-center bg-white px-6 py-12">
        <div className="mx-auto grid w-full max-w-[21.5rem] gap-6 text-center sm:max-w-7xl lg:grid-cols-[1fr_0.9fr] lg:items-center lg:text-left">
          <div>
            <p className="text-sm font-black uppercase text-brand-blue">
              <LocalizedText id="contact.eyebrow">Mulai proyek</LocalizedText>
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight">
              <LocalizedText id="contact.title">Ceritakan kebutuhan website Anda. Kami bantu rapikan jalannya.</LocalizedText>
            </h2>
          </div>
          <div className="space-y-5">
            <p className="text-base leading-8 text-slate-700">
              <LocalizedText id="contact.description">
                Kirim gambaran singkat tentang bisnis, target halaman, dan timeline yang diinginkan. Balasan awal akan berisi rekomendasi scope dan langkah berikutnya.
              </LocalizedText>
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href={contactEmailHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
              >
                <Icon name="mail" className="h-4 w-4" />
                {contactEmail}
              </a>
              <CenteredScrollLink
                href="#paket"
                scrollBlock="center"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand-dark/20 px-6 py-3 text-sm font-bold text-brand-dark transition hover:border-brand-blue hover:text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
              >
                <LocalizedText id="contact.package">Bandingkan paket</LocalizedText>
                <Icon name="arrow" className="h-4 w-4" />
              </CenteredScrollLink>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-dark px-6 py-7 text-xs text-slate-400">
      <div className="mx-auto w-full max-w-[21.5rem] sm:max-w-7xl">
        <div className="grid gap-6 text-center md:grid-cols-3 md:items-start md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <a href="#konten" className="inline-flex h-9 items-center gap-2.5 text-white" aria-label="nocoding_ beranda">
              <span className="nocoding-logo-mark grid h-9 w-9 place-items-center">
                <Image
                  src="/nocoding-logo.png"
                  alt=""
                  width={36}
                  height={34}
                  className="nocoding-logo-mark__image h-9 w-9 object-contain"
                />
              </span>
              <span className="flex h-9 -translate-y-0.5 items-center text-lg font-black leading-none">
                <TypedBrand />
              </span>
            </a>
            <p className="mt-3 max-w-[17rem] leading-6 text-slate-500">
              <LocalizedText id="footer.tagline">Website bisnis siap jalan, tampak serius, dan mudah dikembangkan.</LocalizedText>
            </p>
          </div>

          <div className="flex flex-col items-center md:text-center">
            <p className="flex h-9 items-center text-xs font-black uppercase tracking-[0.32em] text-brand-cyan">
              <LocalizedText id="footer.contact">Kontak</LocalizedText>
            </p>
            <a
              href={contactEmailHref}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex min-h-9 items-center gap-2.5 text-sm font-semibold text-white transition hover:text-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2 focus:ring-offset-brand-dark"
            >
              <Icon name="mail" className="h-4 w-4 text-brand-cyan" />
              {contactEmail}
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end md:text-right">
            <p className="flex h-9 items-center text-xs font-black uppercase tracking-[0.22em] text-brand-cyan sm:tracking-[0.32em]">
              <LocalizedText id="footer.connect">Mari Terhubung</LocalizedText>
            </p>
            <div className="mt-3 flex justify-center md:justify-end">
              <SocialLinks tone="light" />
            </div>
          </div>
        </div>

        <div className="mt-7 border-t border-white/10 pt-4 text-center text-[0.72rem] text-slate-500">
          <p>
            <LocalizedText id="footer.copyright">&copy; 2026 Nocoding - Semua hak cipta dilindungi.</LocalizedText>
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

function SectionHeader({
  descriptionId,
  eyebrow,
  eyebrowId,
  description,
}: {
  eyebrow: string;
  eyebrowId: string;
  description: string;
  descriptionId: string;
}) {
  return (
    <div className="mx-auto w-full max-w-[21.5rem] text-center sm:max-w-3xl">
      <p className="text-sm font-bold uppercase text-brand-cyan">
        <LocalizedText id={eyebrowId}>{eyebrow}</LocalizedText>
      </p>
      <p className="mt-4 leading-8 text-slate-400">
        <LocalizedText id={descriptionId}>{description}</LocalizedText>
      </p>
    </div>
  );
}

function Stat({ label, textId, value }: { label: string; textId: string; value: string }) {
  return (
    <div className="border-white/10 p-5 sm:border-r sm:last:border-r-0">
      <p className="text-3xl font-black text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        <LocalizedText id={textId}>{label}</LocalizedText>
      </p>
    </div>
  );
}

function MockRow({
  label,
  labelId,
  tone,
  value,
  valueId,
}: {
  label: string;
  labelId: string;
  tone: "cyan" | "lime" | "amber";
  value: string;
  valueId?: string;
}) {
  const toneClass = {
    cyan: "bg-brand-cyan",
    lime: "bg-brand-lime",
    amber: "bg-brand-amber",
  }[tone];

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4 border border-white/10 bg-white/[0.03] p-3">
      <div>
        <span className="text-sm font-semibold text-white">
          <LocalizedText id={labelId}>{label}</LocalizedText>
        </span>
        <span className="mt-2 block h-1.5 overflow-hidden bg-white/10">
          <span className={`block h-full w-4/5 ${toneClass}`} />
        </span>
      </div>
      <span className="text-xs font-bold text-slate-300">
        {valueId ? <LocalizedText id={valueId}>{value}</LocalizedText> : value}
      </span>
    </div>
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

function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    audit: (
      <>
        <path d="M9 11h6" />
        <path d="M9 15h4" />
        <path d="M6 3h9l3 3v15H6z" />
        <path d="M14 3v4h4" />
      </>
    ),
    bolt: <path d="M13 2 4 14h7l-1 8 10-13h-7z" />,
    briefcase: (
      <>
        <path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1" />
        <path d="M4 7h16v12H4z" />
        <path d="M4 12h16" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    code: (
      <>
        <path d="m8 9-4 3 4 3" />
        <path d="m16 9 4 3-4 3" />
        <path d="m14 4-4 16" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 9 5-9 5-9-5z" />
        <path d="m3 12 9 5 9-5" />
        <path d="m3 16 9 5 9-5" />
      </>
    ),
    mail: (
      <>
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    monitor: (
      <>
        <path d="M4 5h16v11H4z" />
        <path d="M9 21h6" />
        <path d="M12 16v5" />
      </>
    ),
    rocket: (
      <>
        <path d="M14 4c3 1 5 3 6 6l-4 4-6-6z" />
        <path d="M10 8 6 9l-3 5 5-1" />
        <path d="M16 14 15 18l-5 3 1-5" />
        <path d="M9 15l-4 4" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 4 4" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6z" />
        <path d="m9 12 2 2 4-5" />
      </>
    ),
    spark: (
      <>
        <path d="M12 3v5" />
        <path d="M12 16v5" />
        <path d="M3 12h5" />
        <path d="M16 12h5" />
        <path d="m6 6 3 3" />
        <path d="m15 15 3 3" />
        <path d="m18 6-3 3" />
        <path d="m9 15-3 3" />
      </>
    ),
    storefront: (
      <>
        <path d="M4 10h16l-2-5H6z" />
        <path d="M6 10v10h12V10" />
        <path d="M9 20v-6h6v6" />
      </>
    ),
    workflow: (
      <>
        <path d="M6 7h5" />
        <path d="M13 7h5v5" />
        <path d="M18 17h-5" />
        <path d="M11 17H6v-5" />
        <circle cx="6" cy="7" r="2" />
        <circle cx="18" cy="17" r="2" />
      </>
    ),
  };

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
      {paths[name]}
    </svg>
  );
}
