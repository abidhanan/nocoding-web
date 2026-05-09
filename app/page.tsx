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

const showcases = [
  "Company profile premium",
  "Katalog produk UMKM",
  "Dashboard order internal",
  "Landing page campaign",
];

export default function Home() {
  return (
    <main id="konten" className="min-h-screen overflow-hidden">
      <Hero />
      <TrustBar />
      <ServicesSection />
      <ProcessSection />
      <ShowcaseSection />
      <PackagesSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-brand-dark px-6 pb-16 pt-28 sm:pt-32 lg:min-h-[82svh] lg:pb-20">
      <div aria-hidden="true" className="absolute inset-0 bg-page-grid opacity-35" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-80" />
      <HeroScene />

      <div className="relative mx-0 flex w-full max-w-7xl flex-col items-start sm:mx-auto">
        <div className="w-full max-w-[21.5rem] sm:max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-200 backdrop-blur">
            <span className="h-2 w-2 bg-brand-lime" aria-hidden="true" />
            Studio website no-code dan custom system
          </p>
          <h1 className="text-5xl font-black leading-[0.95] text-white sm:text-6xl lg:text-7xl">
            nocoding<span className="text-brand-cyan">.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            Website bisnis siap jalan, tampak serius, dan mudah dikembangkan.
            Kami bantu dari strategi halaman, desain, konten, sampai launch.
          </p>

          <div className="mt-9 flex w-full max-w-[21.5rem] flex-col gap-3 sm:max-w-none sm:flex-row">
            <a
              href="#kontak"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-dark transition hover:bg-brand-lime focus:outline-none focus:ring-2 focus:ring-brand-lime focus:ring-offset-2 focus:ring-offset-brand-dark sm:w-auto"
            >
              Konsultasi gratis
              <Icon name="arrow" className="h-4 w-4" />
            </a>
            <a
              href="#layanan"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:border-brand-cyan hover:text-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2 focus:ring-offset-brand-dark sm:w-auto"
            >
              Lihat layanan
              <Icon name="search" className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-12 grid w-full max-w-[21.5rem] grid-cols-1 border border-white/10 bg-white/[0.03] sm:max-w-2xl sm:grid-cols-3">
          <Stat value="5-10" label="hari kerja untuk landing page awal" />
          <Stat value="3" label="lapis pekerjaan: strategi, desain, launch" />
          <Stat value="100%" label="responsif untuk mobile dan desktop" />
        </div>
      </div>
    </section>
  );
}

function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
      <div className="absolute right-[7%] top-28 w-[430px] border border-white/10 bg-brand-surface/80 p-4 shadow-2xl shadow-black/30 backdrop-blur">
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-coral" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-amber" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-lime" />
          </div>
          <span className="text-xs font-semibold uppercase text-slate-400">Launch board</span>
        </div>

        <div className="grid gap-3">
          <MockRow label="Homepage" value="96%" tone="cyan" />
          <MockRow label="Copywriting" value="Ready" tone="lime" />
          <MockRow label="SEO setup" value="Mapped" tone="amber" />
        </div>

        <div className="mt-5 grid grid-cols-[1fr_120px] gap-3">
          <div className="border border-white/10 bg-brand-dark/70 p-4">
            <span className="block text-xs text-slate-400">Conversion path</span>
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
            <span className="text-xs text-slate-300">readiness</span>
          </div>
        </div>
      </div>

    </div>
  );
}

function TrustBar() {
  return (
    <section className="border-b border-white/10 bg-brand-night px-6 py-6">
      <div className="mx-0 flex w-full max-w-[21.5rem] flex-col gap-4 text-sm text-slate-300 sm:mx-auto sm:max-w-7xl md:flex-row md:items-center md:justify-between">
        <p className="font-semibold text-white">Dibuat untuk bisnis yang ingin online tanpa proses berbelit.</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <span>UMKM</span>
          <span>Jasa profesional</span>
          <span>Retail</span>
          <span>Edukasi</span>
          <span>Operasional internal</span>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="layanan" className="bg-brand-dark px-6 py-20 sm:py-24">
      <SectionHeader
        eyebrow="Layanan"
        title="Semua yang dibutuhkan untuk membuat bisnis Anda siap tampil."
        description="Kami menggabungkan strategi konten, desain antarmuka, dan implementasi teknis agar website bukan sekadar online, tapi benar-benar bekerja."
      />

      <div className="mx-0 mt-12 grid w-full max-w-[21.5rem] gap-4 sm:mx-auto sm:max-w-7xl md:grid-cols-3">
        {services.map((service) => (
          <article key={service.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-6 transition hover:border-brand-cyan/60 hover:bg-white/[0.05]">
            <div className="mb-6 grid h-11 w-11 place-items-center bg-brand-cyan/10 text-brand-cyan">
              <Icon name={service.icon} className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-white">{service.title}</h3>
            <p className="mt-3 leading-7 text-slate-400">{service.description}</p>
            <ul className="mt-6 space-y-3">
              {service.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                  <Icon name="check" className="h-4 w-4 text-brand-lime" />
                  {item}
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
        title="Jelas dari brief pertama sampai website tayang."
        description="Setiap fase punya output yang bisa dilihat, diuji, dan disetujui. Anda tahu pekerjaan bergerak ke mana."
      />

      <div className="mx-0 mt-12 grid w-full max-w-[21.5rem] gap-4 sm:mx-auto sm:max-w-7xl lg:grid-cols-4">
        {process.map((step, index) => (
          <article key={step.title} className="rounded-lg border border-white/10 bg-brand-dark p-6">
            <div className="flex items-center justify-between">
              <div className="grid h-11 w-11 place-items-center bg-white/5 text-brand-mint">
                <Icon name={step.icon} className="h-5 w-5" />
              </div>
              <span className="text-sm font-black text-slate-600">0{index + 1}</span>
            </div>
            <h3 className="mt-8 text-lg font-bold text-white">{step.title}</h3>
            <p className="mt-3 leading-7 text-slate-400">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ShowcaseSection() {
  return (
    <section className="bg-brand-dark px-6 py-20 sm:py-24">
      <div className="mx-0 grid w-full max-w-[21.5rem] gap-10 sm:mx-auto sm:max-w-7xl lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase text-brand-lime">Siap dibangun</p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
            Dari halaman promosi sampai sistem kerja internal.
          </h2>
          <p className="mt-5 leading-8 text-slate-400">
            nocoding membantu Anda memilih scope yang paling berdampak dulu,
            lalu menyiapkan struktur yang mudah dikembangkan saat bisnis tumbuh.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {showcases.map((showcase) => (
              <div key={showcase} className="flex items-center gap-3 border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-slate-200">
                <Icon name="spark" className="h-4 w-4 text-brand-amber" />
                {showcase}
              </div>
            ))}
          </div>
        </div>

        <div className="border border-white/10 bg-brand-night p-4">
          <div className="grid gap-4 sm:grid-cols-[1fr_0.8fr]">
            <div className="min-h-64 border border-white/10 bg-brand-dark p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-sm font-bold text-white">Campaign preview</span>
                <span className="bg-brand-lime px-2 py-1 text-xs font-black text-brand-dark">LIVE</span>
              </div>
              <div className="mt-5 h-24 bg-gradient-to-br from-brand-blue via-brand-cyan to-brand-mint" />
              <div className="mt-5 space-y-3">
                <span className="block h-3 w-11/12 bg-white/15" />
                <span className="block h-3 w-8/12 bg-white/10" />
                <span className="block h-3 w-9/12 bg-white/10" />
              </div>
              <div className="mt-6 flex gap-3">
                <span className="h-10 w-32 rounded-full bg-white" />
                <span className="h-10 w-24 rounded-full border border-white/20" />
              </div>
            </div>

            <div className="grid gap-4">
              <MiniMetric label="Leads" value="+38%" />
              <MiniMetric label="Load target" value="<2s" />
              <MiniMetric label="Pages" value="5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PackagesSection() {
  return (
    <section id="paket" className="border-y border-white/10 bg-brand-night px-6 py-20 sm:py-24">
      <SectionHeader
        eyebrow="Paket"
        title="Mulai dari kebutuhan paling penting, lalu kembangkan bertahap."
        description="Paket dapat disesuaikan setelah sesi konsultasi agar budget, timeline, dan hasilnya tetap masuk akal."
      />

      <div className="mx-0 mt-12 grid w-full max-w-[21.5rem] gap-4 sm:mx-auto sm:max-w-7xl lg:grid-cols-3">
        {packages.map((item) => (
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
                <p className={`mt-2 text-sm ${item.featured ? "text-brand-dark/75" : "text-slate-400"}`}>{item.description}</p>
              </div>
              {item.featured ? (
                <span className="bg-brand-dark px-2 py-1 text-xs font-black text-white">Populer</span>
              ) : null}
            </div>

            <p className={`mt-8 text-3xl font-black ${item.featured ? "text-brand-dark" : "text-white"}`}>{item.price}</p>

            <ul className="mt-8 space-y-3">
              {item.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm font-medium">
                  <Icon name="check" className={`mt-0.5 h-4 w-4 ${item.featured ? "text-brand-dark" : "text-brand-lime"}`} />
                  <span>{feature}</span>
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
    <section id="faq" className="bg-brand-dark px-6 py-20 sm:py-24">
      <div className="mx-0 grid w-full max-w-[21.5rem] gap-10 sm:mx-auto sm:max-w-7xl lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-bold uppercase text-brand-cyan">FAQ</p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
            Pertanyaan yang biasanya muncul sebelum mulai.
          </h2>
          <p className="mt-5 leading-8 text-slate-400">
            Jika kebutuhan Anda belum tercakup di sini, sesi konsultasi awal akan membantu menentukan scope paling efisien.
          </p>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-left text-lg font-bold text-white">
                {faq.question}
                <span className="grid h-8 w-8 shrink-0 place-items-center border border-white/10 text-brand-cyan transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="kontak" className="border-y border-white/10 bg-white px-6 py-20 text-brand-dark sm:py-24">
      <div className="mx-0 grid w-full max-w-[21.5rem] gap-10 sm:mx-auto sm:max-w-7xl lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase text-brand-blue">Mulai proyek</p>
          <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
            Ceritakan kebutuhan website Anda. Kami bantu rapikan jalannya.
          </h2>
        </div>
        <div className="space-y-4">
          <p className="leading-8 text-slate-700">
            Kirim gambaran singkat tentang bisnis, target halaman, dan timeline yang diinginkan. Balasan awal akan berisi rekomendasi scope dan langkah berikutnya.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:halo@nocoding.com?subject=Konsultasi%20Website%20nocoding"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
            >
              <Icon name="mail" className="h-4 w-4" />
              halo@nocoding.com
            </a>
            <a
              href="#paket"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand-dark/20 px-6 py-3 text-sm font-bold text-brand-dark transition hover:border-brand-blue hover:text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
            >
              Bandingkan paket
              <Icon name="arrow" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-brand-dark px-6 py-10 text-sm text-slate-500">
      <div className="mx-0 flex w-full max-w-[21.5rem] flex-col gap-4 sm:mx-auto sm:max-w-7xl md:flex-row md:items-center md:justify-between">
        <p className="font-semibold text-white">
          nocoding<span className="text-brand-cyan">.</span>
        </p>
        <p>2026 nocoding. Semua hak cipta dilindungi.</p>
      </div>
    </footer>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-0 w-full max-w-[21.5rem] text-center sm:mx-auto sm:max-w-3xl">
      <p className="text-sm font-bold uppercase text-brand-cyan">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-5 leading-8 text-slate-400">{description}</p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-white/10 p-5 sm:border-r sm:last:border-r-0">
      <p className="text-3xl font-black text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{label}</p>
    </div>
  );
}

function MockRow({ label, value, tone }: { label: string; value: string; tone: "cyan" | "lime" | "amber" }) {
  const toneClass = {
    cyan: "bg-brand-cyan",
    lime: "bg-brand-lime",
    amber: "bg-brand-amber",
  }[tone];

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4 border border-white/10 bg-white/[0.03] p-3">
      <div>
        <span className="text-sm font-semibold text-white">{label}</span>
        <span className="mt-2 block h-1.5 overflow-hidden bg-white/10">
          <span className={`block h-full w-4/5 ${toneClass}`} />
        </span>
      </div>
      <span className="text-xs font-bold text-slate-300">{value}</span>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 bg-brand-dark p-5">
      <span className="text-sm text-slate-400">{label}</span>
      <strong className="mt-3 block text-3xl font-black text-white">{value}</strong>
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
