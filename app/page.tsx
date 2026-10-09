import ProjectsSection from "./components/projects-section";
import CenteredScrollLink from "./components/centered-scroll-link";
import { Illustration, type IllustrationName } from "./components/illustrations";
import { LocalizedText } from "./components/localized-text";
import MobilePackageSlider from "./components/mobile-package-slider";
import { createWhatsAppHref, whatsappDisplay } from "./components/projects-data";
import TypedBrand from "./components/typed-brand";
import { WhatsAppIcon } from "./components/whatsapp";
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
    title: "Portofolio / CV Pribadi",
    description:
      "Website portofolio atau CV pribadi untuk menampilkan profil, pengalaman, dan karya Anda secara profesional.",
    icon: "briefcase",
    illustration: "portfolio",
    items: ["Profil & pengalaman", "Galeri karya", "CV siap unduh", "dan lain-lain"],
  },
  {
    title: "Landing Page / Profil Perusahaan",
    description:
      "Landing page atau company profile yang cepat tayang, meyakinkan, dan siap mendatangkan client.",
    icon: "monitor",
    illustration: "landing",
    items: ["Copywriting halaman", "Desain responsif dan interaktif", "Setup SEO", "dan lain-lain"],
  },
  {
    title: "Sistem Informasi & Operasional",
    description:
      "Dashboard, portal, dan sistem internal untuk mengelola data serta operasional bisnis sehari-hari.",
    icon: "workflow",
    illustration: "system",
    items: ["Alur kerja rapi", "Role pengguna", "Export data", "dan lain-lain"],
  },
  {
    title: "Automasi",
    description:
      "Automasi proses berulang seperti notifikasi, integrasi tools, dan alur kerja agar tim lebih hemat waktu.",
    icon: "bolt",
    illustration: "automation",
    items: ["Integrasi tools", "Notifikasi otomatis", "Alur kerja otomatis", "dan lain-lain"],
  },
] satisfies Array<{
  title: string;
  description: string;
  icon: IconName;
  illustration: IllustrationName;
  items: string[];
}>;

const process = [
  {
    title: "Audit Kebutuhan",
    description:
      "Kami memetakan target bisnis, referensi visual, fitur utama, dan prioritas pengerjaan.",
    icon: "audit",
    illustration: "audit",
  },
  {
    title: "Cek Rancangan",
    description:
      "Struktur, desain, dan alur ditinjau serta disetujui bersama sebelum masuk produksi.",
    icon: "layers",
    illustration: "design",
  },
  {
    title: "Proses Pengerjaan",
    description:
      "Website, aplikasi, atau automasi dibuat responsif sesuai rancangan yang sudah disetujui.",
    icon: "code",
    illustration: "build",
  },
  {
    title: "Cek Hasil",
    description:
      "Hasil diperiksa bersama, direvisi bila perlu, dan diuji sampai siap tayang.",
    icon: "search",
    illustration: "review",
  },
  {
    title: "Peluncuran & Penyerahan",
    description:
      "Produk dipublikasikan, metadata & SEO disiapkan, lalu akses dan panduan diserahkan ke Anda.",
    icon: "rocket",
    illustration: "launch",
  },
] satisfies Array<{
  title: string;
  description: string;
  icon: IconName;
  illustration: IllustrationName;
}>;

const contactWhatsAppHref = createWhatsAppHref(
  "Halo Nocoding, saya ingin konsultasi kebutuhan website untuk bisnis saya. Mohon info langkah berikutnya.",
);

const contactEmail = "nocodingindonesia@gmail.com";
const contactEmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${contactEmail}&su=${encodeURIComponent(
  "Konsultasi Website Nocoding",
)}&body=${encodeURIComponent(
  "Halo Nocoding, saya ingin konsultasi kebutuhan website untuk bisnis saya. Mohon info langkah berikutnya.",
)}`;

function createPackageWhatsAppHref(packageName: string) {
  return createWhatsAppHref(
    `Halo Nocoding, saya tertarik memilih paket ${packageName}. Mohon info langkah berikutnya.`,
  );
}

const packages: Array<{
  name: string;
  nameId: string;
  price: string;
  description: string;
  selectionHref: string;
  features: string[];
  illustration: IllustrationName;
  featured?: boolean;
}> = [
  {
    name: "Kecil",
    nameId: "packages.0.name",
    price: "Rp 500 ribu",
    illustration: "price-small",
    description: "Website portofolio, CV pribadi, atau landing page sederhana yang cepat tayang.",
    selectionHref: createPackageWhatsAppHref("Kecil"),
    features: [
      "Portofolio / CV / landing page",
      "Desain responsif",
      "SEO teknis",
      "Form kontak",
      "Gratis maintenance + domain 1 tahun",
    ],
  },
  {
    name: "Besar",
    nameId: "packages.1.name",
    price: "Rp 2 juta",
    illustration: "price-big",
    description: "Profil perusahaan, sistem informasi & operasional, atau automasi sesuai kebutuhan.",
    selectionHref: createPackageWhatsAppHref("Besar"),
    features: [
      "Website / aplikasi multi-halaman",
      "Sistem informasi & operasional",
      "Automasi proses bisnis",
      "Role & akses pengguna",
      "Gratis maintenance + hosting 1 tahun",
    ],
  },
];

const faqs = [
  {
    question: "Layanan apa saja yang bisa dibuat oleh Nocoding?",
    answer:
      "Kami melayani pembuatan website portofolio atau CV pribadi, landing page atau company profile, sistem informasi dan operasional, serta automasi proses bisnis.",
  },
  {
    question: "Berapa lama proses pengerjaannya?",
    answer:
      "Website portofolio, CV pribadi, atau landing page sederhana umumnya selesai dalam 1-3 hari kerja setelah materi siap. Project yang lebih besar mengikuti kebutuhan fitur, integrasi, dan ritme feedback.",
  },
  {
    question: "Apakah desain dan fitur bisa di-request?",
    answer:
      "Bisa. Desain, struktur halaman, fitur, dan alur kerja dapat disesuaikan dengan kebutuhan. Rancangan akan ditinjau bersama sebelum masuk ke tahap pengerjaan.",
  },
  {
    question: "Apa saja yang termasuk dalam biaya?",
    answer:
      "Biaya mencakup pengerjaan sesuai paket dan scope yang disepakati. Paket Kecil mendapat gratis maintenance dan domain selama 1 tahun, sedangkan Paket Besar mendapat gratis maintenance dan hosting selama 1 tahun.",
  },
] satisfies Array<{
  question: string;
  answer: string;
}>;

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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main id="konten" className="min-h-screen overflow-hidden">
        <Hero />
        <ServicesSection />
        <ProcessSection />
        <ProjectsSection />
        <PackagesSection />
        <FaqSection />
        <ContactSection />
      </main>
    </>
  );
}

function Hero() {
  return (
    <section id="beranda" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden border-b border-white/10 bg-brand-dark px-6 pb-16 pt-24">
      <div aria-hidden="true" className="absolute inset-0 bg-page-grid opacity-35" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-80" />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <div className="w-full max-w-[21.5rem] sm:max-w-3xl">
          <span className="nocoding-logo-mark mx-auto mb-4 grid h-16 w-16 place-items-center sm:h-20 sm:w-20">
            <Image
              src="/nocoding-logo.webp"
              alt=""
              width={80}
              height={80}
              className="nocoding-logo-mark__image h-full w-full object-contain"
              loading="eager"
              fetchPriority="high"
            />
          </span>
          <h1 id="hero-title" aria-label="nocoding_" className="text-6xl font-black leading-[0.95] text-white lg:text-7xl">
            <TypedBrand />
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            <span className="block">
              <LocalizedText id="hero.description.line1">Jasa pembuatan website, aplikasi, dan automasi</LocalizedText>
            </span>
            <span className="block">
              <LocalizedText id="hero.description.line2">yang cepat, terjangkau, dan memuaskan.</LocalizedText>
            </span>
          </p>

          <div className="mt-8 flex w-full max-w-[21.5rem] flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
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

        <div className="mx-auto mt-8 grid w-full max-w-[21.5rem] grid-cols-1 border border-white/10 bg-white/[0.03] sm:max-w-xl sm:grid-cols-2">
          <Stat value="1-3 hari" valueId="hero.stat.turnaround.value" label="proses pengerjaan" textId="hero.stat.turnaround" />
          <Stat value="100%" label="bebas request sesuai keinginan" textId="hero.stat.freedom" />
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="layanan" aria-labelledby="services-title" className="bg-brand-dark px-6 py-8 sm:py-10">
      <SectionHeader
        headingId="services-title"
        eyebrow="Layanan"
        eyebrowId="services.eyebrow"
        description="Kami menggabungkan strategi konten, desain antarmuka, dan implementasi teknis agar website bukan sekadar online, tapi benar-benar bekerja."
        descriptionId="services.description"
      />

      <div className="mx-auto mt-12 grid w-full max-w-[21.5rem] gap-4 sm:max-w-7xl md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, serviceIndex) => (
          <article key={service.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-6 transition hover:border-brand-cyan/60 hover:bg-white/[0.05]">
            <div className="mb-5 aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-brand-surface to-brand-dark">
              <Illustration name={service.illustration} className="h-full w-full" />
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
    <section id="proses" aria-labelledby="process-title" className="border-y border-white/10 bg-brand-night px-6 py-8 sm:py-10">
      <SectionHeader
        headingId="process-title"
        eyebrow="Proses"
        eyebrowId="process.eyebrow"
        description="Setiap fase punya output yang bisa dilihat, diuji, dan disetujui. Anda tahu pekerjaan bergerak ke mana."
        descriptionId="process.description"
      />

      <div className="process-mobile-timeline mx-auto mt-12 grid w-full max-w-[21.5rem] gap-4 sm:max-w-7xl lg:grid-cols-5">
        {process.map((step, index) => (
          <article key={step.title} className="process-timeline-card rounded-lg border border-white/10 bg-brand-dark p-6">
            <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-brand-surface to-brand-dark">
              <Illustration name={step.illustration} className="h-full w-full" />
              <span className="absolute right-2 top-2 rounded-md bg-brand-dark/80 px-2 py-0.5 text-xs font-black text-brand-mint backdrop-blur">
                0{index + 1}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-bold text-white">
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
    <section id="paket" aria-labelledby="packages-title" className="border-y border-white/10 bg-brand-night px-6 py-8 sm:py-10">
      <SectionHeader
        headingId="packages-title"
        eyebrow="Biaya"
        eyebrowId="packages.eyebrow"
        description="Biaya dapat disesuaikan setelah sesi konsultasi agar budget, timeline, dan hasilnya tetap masuk akal."
        descriptionId="packages.description"
      />

      <MobilePackageSlider packages={packages} />

      <div className="mx-auto mt-12 hidden w-full max-w-[21.5rem] gap-4 sm:max-w-3xl lg:grid lg:grid-cols-2">
        {packages.map((item, packageIndex) => (
          <article
            key={item.name}
            className={`flex h-full flex-col rounded-lg border p-6 ${
              item.featured
                ? "border-brand-lime bg-brand-lime text-brand-dark"
                : "border-white/10 bg-brand-dark text-slate-200"
            }`}
          >
            <div className="mb-5 aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-brand-surface to-brand-dark">
              <Illustration name={item.illustration} className="h-full w-full" />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-white">
                  <LocalizedText id={item.nameId}>{item.name}</LocalizedText>
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  <LocalizedText id={`packages.${packageIndex}.description`}>{item.description}</LocalizedText>
                </p>
              </div>
            </div>

            <div className="mt-8">
              <span className="block text-xs font-bold uppercase tracking-wide text-slate-400">
                <LocalizedText id="packages.price.from">Mulai dari</LocalizedText>
              </span>
              <p className="mt-1 text-3xl font-black text-white">
                <LocalizedText id={`packages.${packageIndex}.price`}>{item.price}</LocalizedText>
                <span className="ml-1 text-sm font-semibold text-slate-400">
                  <LocalizedText id="packages.price.period">/ tahun</LocalizedText>
                </span>
              </p>
            </div>

            <ul className="mt-8 grow space-y-3">
              {item.features.map((feature, featureIndex) => (
                <li key={feature} className="flex gap-3 text-sm font-medium">
                  <Icon name="check" className={`mt-0.5 h-4 w-4 ${item.featured ? "text-brand-dark" : "text-brand-lime"}`} />
                  <span>
                    <LocalizedText id={`packages.${packageIndex}.feature.${featureIndex}`}>{feature}</LocalizedText>
                  </span>
                </li>
              ))}
            </ul>

            <a
              href={item.selectionHref}
              target="_blank"
              rel="noreferrer"
              className={`mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-black transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                item.featured
                  ? "bg-brand-dark text-white hover:bg-brand-blue focus:ring-brand-dark focus:ring-offset-brand-lime"
                  : "bg-brand-cyan text-brand-dark hover:bg-brand-lime focus:ring-brand-cyan focus:ring-offset-brand-dark"
              }`}
            >
              <LocalizedText id="packages.select">Pilih</LocalizedText>
              <Icon name="arrow" className="h-4 w-4" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="flex min-h-[calc(100svh-4rem)] items-center bg-brand-dark px-6 py-16">
      <div className="mx-auto grid w-full max-w-[21.5rem] gap-10 sm:max-w-7xl lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="text-center lg:text-left">
          <p className="text-sm font-bold uppercase text-brand-cyan">
            <LocalizedText id="faq.eyebrow">FAQ</LocalizedText>
          </p>
          <h2 id="faq-title" className="mt-4 text-4xl font-black leading-tight text-white">
            <LocalizedText id="faq.title">Pertanyaan yang biasanya muncul sebelum mulai.</LocalizedText>
          </h2>
          <p className="mt-5 leading-8 text-slate-400">
            <LocalizedText id="faq.description">
              Jika pertanyaan Anda belum terjawab di sini, sesi konsultasi dapat membantu menentukan kebutuhan Anda.
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
    <section id="kontak" aria-labelledby="contact-title" className="flex min-h-[calc(100svh-4rem)] flex-col border-y border-white/10 bg-brand-dark text-brand-dark">
      <div className="flex flex-1 items-center bg-white px-6 py-12">
        <div className="mx-auto grid w-full max-w-[21.5rem] gap-6 text-center sm:max-w-7xl lg:grid-cols-[1fr_0.9fr] lg:items-center lg:text-left">
          <div>
            <p className="text-sm font-black uppercase text-brand-blue">
              <LocalizedText id="contact.eyebrow">Mulai proyek</LocalizedText>
            </p>
            <h2 id="contact-title" className="mt-4 text-4xl font-black leading-tight">
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
                href={contactWhatsAppHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <LocalizedText id="contact.whatsapp">Konsultasi sekarang</LocalizedText>
              </a>
              <CenteredScrollLink
                href="#paket"
                scrollBlock="start"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand-dark/20 px-6 py-3 text-sm font-bold text-brand-dark transition hover:border-brand-blue hover:text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
              >
                <LocalizedText id="contact.package">Bandingkan biaya</LocalizedText>
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
    <footer className="border-t border-white/10 bg-brand-dark px-6 pt-7 pb-0 text-xs text-slate-400">
      <div className="mx-auto w-full max-w-[21.5rem] sm:max-w-7xl">
        <div className="grid gap-6 text-center md:grid-cols-3 md:items-start md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <CenteredScrollLink
              href="#beranda"
              scrollBlock="start"
              className="inline-flex h-9 items-center gap-2.5 text-white"
              aria-label="nocoding_ beranda"
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

        <div className="mt-7 flex min-h-[4.75rem] items-center justify-center border-t border-white/10 text-center text-[0.72rem] text-slate-400">
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

function SectionHeader({
  descriptionId,
  eyebrow,
  eyebrowId,
  headingId,
  description,
}: {
  eyebrow: string;
  eyebrowId: string;
  headingId: string;
  description: string;
  descriptionId: string;
}) {
  return (
    <header className="mx-auto w-full max-w-[21.5rem] text-center sm:max-w-3xl">
      <h2 id={headingId} className="text-sm font-bold uppercase text-brand-cyan">
        <LocalizedText id={eyebrowId}>{eyebrow}</LocalizedText>
      </h2>
      <p className="mt-4 leading-8 text-slate-400">
        <LocalizedText id={descriptionId}>{description}</LocalizedText>
      </p>
    </header>
  );
}

function Stat({
  label,
  textId,
  value,
  valueId,
}: {
  label: string;
  textId: string;
  value: string;
  valueId?: string;
}) {
  return (
    <div className="border-white/10 px-3 py-5 sm:border-r sm:last:border-r-0">
      <p className="text-3xl font-black text-white">
        {valueId ? <LocalizedText id={valueId}>{value}</LocalizedText> : value}
      </p>
      <p className="mt-2 whitespace-nowrap text-xs leading-6 text-slate-400">
        <LocalizedText id={textId}>{label}</LocalizedText>
      </p>
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
