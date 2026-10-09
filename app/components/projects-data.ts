export type Project = {
  name: string;
  category: string;
  categoryId: string;
  description: string;
  descriptionId: string;
  image: string;
  imageAlt: string;
};

export const projects = [
  {
    name: "Ecoswap",
    category: "Website jual beli barang bekas",
    categoryId: "project.category.ecoswap",
    description:
      "Marketplace pre-loved yang membantu pengguna menjual dan membeli barang bekas dengan tampilan modern, pesan brand yang jelas, dan pengalaman responsif.",
    descriptionId: "project.description.ecoswap",
    image: "/projects/ecoswap-website-jual-beli-barang-bekas.webp",
    imageAlt: "Mockup website Ecoswap di laptop dan ponsel",
  },
  {
    name: "Wiboost Store",
    category: "Website layanan digital",
    categoryId: "project.category.wiboost",
    description:
      "Website layanan suntik sosmed, top up game, isi paket data, dan aplikasi premium dengan tampilan ringan, ramah mobile, dan alur pembelian yang langsung jelas.",
    descriptionId: "project.description.wiboost",
    image: "/projects/wiboost-store-website-layanan-digital.webp",
    imageAlt: "Mockup website Wiboost Store di laptop dan ponsel",
  },
  {
    name: "AHAWI Portfolio",
    category: "Website portofolio",
    categoryId: "project.category.ahawi",
    description:
      "Website portofolio personal untuk menampilkan profil profesional, pengalaman, aktivitas, sertifikat, dan kontak dalam tampilan visual yang responsif.",
    descriptionId: "project.description.ahawi",
    image: "/projects/ahawi-portfolio-website-portofolio.webp",
    imageAlt: "Mockup website portofolio AHAWI di laptop dan ponsel",
  },
  {
    name: "Abdi Dalem Keraton Kasunanan Surakarta Hadiningrat",
    category: "Website manajemen database",
    categoryId: "project.category.abdi",
    description:
      "Portal manajemen database abdi dalem untuk pendaftaran, pengelolaan biodata, verifikasi, dan pencetakan ID Card dengan tampilan resmi dan mudah digunakan.",
    descriptionId: "project.description.abdi",
    image: "/projects/abdi-dalem-keraton-kasunanan-surakarta-hadiningrat.webp",
    imageAlt:
      "Mockup website manajemen database Abdi Dalem Keraton Kasunanan Surakarta Hadiningrat di laptop dan ponsel",
  },
] satisfies Project[];

// Repeated so the seamless marquee loop stays wider than the viewport.
export const marqueeProjects = Array.from({ length: 2 }, () => projects).flat();

// WhatsApp contact. Display is the local format; the href uses the international
// format (leading 0 replaced with 62).
export const whatsappDisplay = "085326513324";
export const whatsappNumber = "6285326513324";

export function createWhatsAppHref(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
