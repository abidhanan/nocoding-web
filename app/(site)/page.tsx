import ArticlesSection from "../components/articles-section";
import ProjectsSection from "../components/projects-section";
import TestimonialsSection from "../components/testimonials-section";
import CenteredScrollLink from "../components/centered-scroll-link";
import DetailBlocks, { type DetailBlock } from "../components/detail-blocks";
import { detailLabels, processDetails, serviceDetails } from "../components/detail-data";
import { Illustration, type IllustrationName } from "../components/illustrations";
import { LocalizedText } from "../components/localized-text";
import LazyPackageSlider from "../components/lazy-package-slider";
import { createWhatsAppHref } from "../components/projects-data";
import { Footer, contactWhatsAppHref } from "../components/site-footer";
import TypedBrand from "../components/typed-brand";
import { WhatsAppIcon } from "../components/whatsapp";
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

const photoSet = (name: string): DetailBlock["collage"] => [
  `/photos/${name}-1.webp`,
  `/photos/${name}-2.webp`,
  `/photos/${name}-3.webp`,
];

const serviceCollages = ["layanan-1", "layanan-2", "layanan-3", "layanan-4"].map(photoSet);

const processCollages = ["proses-1", "proses-2", "proses-3", "proses-4", "proses-5"].map(photoSet);

const serviceBlocks: DetailBlock[] = services.map((service, index) => ({
  kicker: detailLabels["services.kicker"],
  kickerId: "services.kicker",
  title: service.title,
  titleId: `services.${index}.title`,
  summary: service.description,
  summaryId: `services.${index}.description`,
  body: serviceDetails[index].long,
  bodyId: `services.${index}.long`,
  listHeading: detailLabels["services.getTitle"],
  listHeadingId: "services.getTitle",
  list: serviceDetails[index].details.map((text, detailIndex) => ({ text, id: `services.${index}.detail.${detailIndex}` })),
  notes: [
    {
      heading: detailLabels["services.forTitle"],
      headingId: "services.forTitle",
      text: serviceDetails[index].forWho,
      textId: `services.${index}.for`,
    },
  ],
  pills: service.items
    .map((text, itemIndex) => ({ text, id: `services.${index}.item.${itemIndex}` }))
    .filter((pill) => pill.text !== "dan lain-lain"),
  collage: serviceCollages[index],
}));

const processBlocks: DetailBlock[] = process.map((step, index) => ({
  kicker: detailLabels["process.kicker"],
  kickerId: "process.kicker",
  title: step.title,
  titleId: `process.${index}.title`,
  summary: step.description,
  summaryId: `process.${index}.description`,
  body: processDetails[index].long,
  bodyId: `process.${index}.long`,
  listHeading: detailLabels["process.doTitle"],
  listHeadingId: "process.doTitle",
  list: processDetails[index].does.map((text, doIndex) => ({ text, id: `process.${index}.do.${doIndex}` })),
  notes: [
    {
      heading: detailLabels["process.youTitle"],
      headingId: "process.youTitle",
      text: processDetails[index].you,
      textId: `process.${index}.you`,
    },
    {
      heading: detailLabels["process.resultTitle"],
      headingId: "process.resultTitle",
      text: processDetails[index].result,
      textId: `process.${index}.result`,
    },
  ],
  collage: processCollages[index],
}));

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

export const revalidate = 300;

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
        <TestimonialsSection />
        <PackagesSection />
        <FaqSection />
        <ArticlesSection />
        <ContactSection />
      </main>
    </>
  );
}

function Hero() {
  return (
    <section id="beranda" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden border-b border-white/10 px-6 pb-16 pt-24">
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
              <LocalizedText id="hero.cta.contact">Konsultasi Gratis</LocalizedText>
              <Icon name="arrow" className="h-4 w-4" />
            </CenteredScrollLink>
            <CenteredScrollLink
              href="#layanan"
              scrollBlock="start"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:border-brand-cyan hover:text-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2 focus:ring-offset-brand-dark sm:w-auto"
            >
              <LocalizedText id="hero.cta.services">Lihat Layanan</LocalizedText>
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
    <section id="layanan" aria-labelledby="services-title" className="border-b border-white/10 px-6 py-8 sm:py-10">
      <SectionHeader
        headingId="services-title"
        eyebrow="Layanan"
        eyebrowId="services.eyebrow"
        description="Kami menggabungkan strategi konten, desain antarmuka, dan implementasi teknis agar website bukan sekadar online, tapi benar-benar bekerja."
        descriptionId="services.description"
      />

      <DetailBlocks blocks={serviceBlocks} />
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="proses" aria-labelledby="process-title" className="border-b border-white/10 px-6 py-8 sm:py-10">
      <SectionHeader
        headingId="process-title"
        eyebrow="Proses"
        eyebrowId="process.eyebrow"
        description="Setiap fase punya output yang bisa dilihat, diuji, dan disetujui. Anda tahu pekerjaan bergerak ke mana."
        descriptionId="process.description"
      />

      <DetailBlocks blocks={processBlocks} />
    </section>
  );
}

function PackagesSection() {
  return (
    <section id="paket" aria-labelledby="packages-title" className="border-b border-white/10 px-6 py-8 sm:py-10">
      <SectionHeader
        headingId="packages-title"
        eyebrow="Biaya"
        eyebrowId="packages.eyebrow"
        description="Biaya dapat disesuaikan setelah sesi konsultasi agar budget, timeline, dan hasilnya tetap masuk akal."
        descriptionId="packages.description"
      />

      <LazyPackageSlider packages={packages} />

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
    <section id="faq" aria-labelledby="faq-title" className="flex min-h-[calc(100svh-4rem)] items-center border-b border-white/10 px-6 py-16">
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
    <section id="kontak" aria-labelledby="contact-title" className="flex min-h-[calc(100svh-4rem)] flex-col border-b border-white/10">
      <div className="flex flex-1 items-center px-6 py-12">
        <div className="mx-auto grid w-full max-w-[21.5rem] gap-6 text-center sm:max-w-7xl lg:grid-cols-[1fr_0.9fr] lg:items-center lg:text-left">
          <div>
            <p className="text-sm font-black uppercase text-brand-cyan">
              <LocalizedText id="contact.eyebrow">Mulai proyek</LocalizedText>
            </p>
            <h2 id="contact-title" className="mt-4 text-4xl font-black leading-tight text-white">
              <LocalizedText id="contact.title">Ceritakan kebutuhan website Anda. Kami bantu rapikan jalannya.</LocalizedText>
            </h2>
          </div>
          <div className="space-y-5">
            <p className="text-base leading-8 text-slate-400">
              <LocalizedText id="contact.description">
                Kirim gambaran singkat tentang bisnis, target halaman, dan timeline yang diinginkan. Balasan awal akan berisi rekomendasi scope dan langkah berikutnya.
              </LocalizedText>
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href={contactWhatsAppHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-dark transition hover:bg-brand-lime focus:outline-none focus:ring-2 focus:ring-brand-lime focus:ring-offset-2 focus:ring-offset-brand-dark"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <LocalizedText id="contact.whatsapp">Konsultasi Sekarang</LocalizedText>
              </a>
              <CenteredScrollLink
                href="#paket"
                scrollBlock="start"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition hover:border-brand-cyan hover:text-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2 focus:ring-offset-brand-dark"
              >
                <LocalizedText id="contact.package">Bandingkan Biaya</LocalizedText>
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
