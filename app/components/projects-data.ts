export type Project = {
  name: string;
  category: string;
  categoryId: string;
  description: string;
  descriptionId: string;
  image: string;
  imageAlt: string;
  logo?: string;
  logoOnDark?: boolean;
};

export const projects = [
  {
    name: "Ecoswap",
    category: "Website jual beli barang bekas",
    categoryId: "project.category.ecoswap",
    description:
      "Marketplace online untuk jual beli barang bekas. Pengguna bisa memasang barang, mencari, dan membeli dengan mudah dari HP maupun komputer.",
    descriptionId: "project.description.ecoswap",
    image: "/projects/ecoswap-website-jual-beli-barang-bekas.webp",
    logo: "/projects/logos/ecoswap.webp",
    imageAlt: "Tampilan website Ecoswap di laptop dan ponsel",
  },
  {
    name: "Wiboost Store",
    category: "Website layanan digital",
    categoryId: "project.category.wiboost",
    description:
      "Toko online layanan digital seperti top up game, paket data, dan aplikasi premium, lengkap dengan saldo pelanggan dan program reseller.",
    descriptionId: "project.description.wiboost",
    image: "/projects/wiboost-store-website-layanan-digital.webp",
    logo: "/projects/logos/wiboost-store.webp",
    imageAlt: "Tampilan website Wiboost Store di laptop dan ponsel",
  },
  {
    name: "AHAWI Portfolio",
    category: "Website portofolio",
    categoryId: "project.category.ahawi",
    description:
      "Website portofolio pribadi bergaya lukisan cat air dengan dua pilihan bahasa, untuk memperkenalkan profil, pengalaman, dan kontak.",
    descriptionId: "project.description.ahawi",
    image: "/projects/ahawi-portfolio-website-portofolio.webp",
    logo: "/projects/logos/ahawi-portfolio.webp",
    imageAlt: "Tampilan website AHAWI Portfolio di laptop dan ponsel",
  },
  {
    name: "Abdi Dalem Keraton Kasunanan Surakarta Hadiningrat",
    category: "Sistem pendataan online",
    categoryId: "project.category.abdi",
    description:
      "Sistem pendataan abdi dalem Keraton Surakarta: pendaftaran, data diri, jadwal kegiatan, daftar hadir, dan cetak kartu identitas.",
    descriptionId: "project.description.abdi",
    image: "/projects/abdi-dalem-keraton-kasunanan-surakarta-hadiningrat.webp",
    logo: "/projects/logos/abdi-dalem-keraton.webp",
    imageAlt: "Tampilan website Abdi Dalem Keraton Kasunanan Surakarta Hadiningrat di laptop dan ponsel",
  },
  {
    name: "S-Farm Singopuran",
    category: "Aplikasi manajemen peternakan",
    categoryId: "project.category.sfarm",
    description:
      "Aplikasi untuk mengelola peternakan ayam petelur dan kambing milik desa: catatan harian, penjualan, pengeluaran, dan laporan keuangan.",
    descriptionId: "project.description.sfarm",
    image: "/projects/s-farm.webp",
    logo: "/projects/logos/s-farm.svg",
    imageAlt: "Tampilan website S-Farm Singopuran di laptop dan ponsel",
  },
  {
    name: "PayU",
    category: "Platform freelancer",
    categoryId: "project.category.payu",
    description:
      "Platform yang mempertemukan pemberi tugas dan freelancer. Pemberi tugas memasang hadiah, freelancer mengerjakan, pembayaran lewat QRIS.",
    descriptionId: "project.description.payu",
    image: "/projects/payu.webp",
    logo: "/projects/logos/payu.svg",
    imageAlt: "Tampilan website PayU di laptop dan ponsel",
  },
  {
    name: "Dar Casual",
    category: "Website katalog produk",
    categoryId: "project.category.darcasual",
    description:
      "Katalog online dengan lebih dari seribu produk. Pembeli bisa mencari, menyaring, lalu memesan langsung lewat WhatsApp.",
    descriptionId: "project.description.darcasual",
    image: "/projects/dar-casual.webp",
    logo: "/projects/logos/darcasual.webp",
    imageAlt: "Tampilan website Dar Casual di laptop dan ponsel",
  },
  {
    name: "Ian Prem Store",
    category: "Toko online aplikasi premium",
    categoryId: "project.category.ianprem",
    description:
      "Toko online akun aplikasi premium seperti Netflix dan Spotify. Pembeli memilih dan membayar sendiri, admin mengelola stok dan penjualan.",
    descriptionId: "project.description.ianprem",
    image: "/projects/ian-prem-store.webp",
    logo: "/projects/logos/ian-prem-store.svg",
    imageAlt: "Tampilan website Ian Prem Store di laptop dan ponsel",
  },
  {
    name: "Alengka Home Living",
    category: "Website katalog furnitur",
    categoryId: "project.category.alengka",
    description:
      "Katalog online furnitur indoor dan outdoor untuk cafe, restoran, dan rumah. Pengunjung bisa melihat koleksi lalu konsultasi lewat WhatsApp.",
    descriptionId: "project.description.alengka",
    image: "/projects/alengka-home-living.webp",
    logo: "/projects/logos/alengka.webp",
    imageAlt: "Tampilan website Alengka Home Living di laptop dan ponsel",
  },
  {
    name: "SD Negeri Pucangsawit",
    category: "Website profil sekolah",
    categoryId: "project.category.sdn",
    description:
      "Website resmi sekolah dasar berisi profil sekolah, info pendaftaran siswa baru, daftar guru, ekstrakurikuler, dan prestasi siswa.",
    descriptionId: "project.description.sdn",
    image: "/projects/sdn-pucangsawit.webp",
    logo: "/projects/logos/sdn-pucangsawit.webp",
    imageAlt: "Tampilan website SD Negeri Pucangsawit di laptop dan ponsel",
  },
  {
    name: "OD Furnix Galery",
    category: "Website katalog furnitur",
    categoryId: "project.category.furnix",
    description:
      "Katalog online furnitur besi untuk cafe, restoran, dan rumah dari Jepara. Pengunjung bisa memilih produk dan memesan sesuai keinginan.",
    descriptionId: "project.description.furnix",
    image: "/projects/od-furnix-galery.webp",
    logo: "/projects/logos/od-furnix-galery.webp",
    logoOnDark: true,
    imageAlt: "Tampilan website OD Furnix Galery di laptop dan ponsel",
  },
  {
    name: "Clothique",
    category: "Toko online pakaian",
    categoryId: "project.category.clothique",
    description:
      "Toko online pakaian yang lengkap: katalog, keranjang belanja, pembayaran online, blog, dan halaman admin untuk mengelola pesanan dan laporan.",
    descriptionId: "project.description.clothique",
    image: "/projects/clothique-ecommerce.webp",
    logo: "/projects/logos/clothique-ecommerce.webp",
    imageAlt: "Tampilan website Clothique di laptop dan ponsel",
  },
  {
    name: "AGLI",
    category: "Aplikasi bantu konten",
    categoryId: "project.category.agli",
    description:
      "Alat bantu tim konten untuk mengumpulkan contoh konten yang paling banyak dilihat, mencari polanya, lalu menyusun draf tulisan baru.",
    descriptionId: "project.description.agli",
    image: "/projects/agli.webp",
    logo: "/projects/logos/agli.webp",
    imageAlt: "Tampilan website AGLI di laptop dan ponsel",
  },
  {
    name: "Nebulist AI Sales Engine",
    category: "Aplikasi bantu penjualan",
    categoryId: "project.category.nebulist",
    description:
      "Aplikasi bantu penjualan berbasis AI yang menyusun strategi, catatan calon pelanggan, dan draf pesan penawaran dari informasi produk.",
    descriptionId: "project.description.nebulist",
    image: "/projects/nebulist-ai-sales-engine.webp",
    logo: "/projects/logos/nebulist-ai-sales-engine.webp",
    imageAlt: "Tampilan website Nebulist AI Sales Engine di laptop dan ponsel",
  },
  {
    name: "CarbonFi",
    category: "Aplikasi keuangan digital",
    categoryId: "project.category.carbonfi",
    description:
      "Aplikasi keuangan digital untuk jual beli kredit karbon (penghargaan atas pengurangan emisi) dan program imbalan ramah lingkungan.",
    descriptionId: "project.description.carbonfi",
    image: "/projects/carbonfi.webp",
    logo: "/projects/logos/carbonfi.webp",
    imageAlt: "Tampilan website CarbonFi di laptop dan ponsel",
  },
  {
    name: "ProtectedPay",
    category: "Aplikasi pembayaran digital",
    categoryId: "project.category.protectedpay",
    description:
      "Aplikasi kirim uang digital yang aman: dana baru cair setelah diterima, bisa patungan bersama, dan menabung.",
    descriptionId: "project.description.protectedpay",
    image: "/projects/protectedpay.webp",
    logo: "/projects/logos/protectedpay.webp",
    imageAlt: "Tampilan website ProtectedPay di laptop dan ponsel",
  },
  {
    name: "PeduliChain",
    category: "Aplikasi donasi online",
    categoryId: "project.category.pedulichain",
    description:
      "Platform donasi yang transparan: setiap sumbangan dan penggunaan dananya tercatat permanen dan bisa dilihat siapa saja.",
    descriptionId: "project.description.pedulichain",
    image: "/projects/pedulichain.webp",
    imageAlt: "Tampilan website PeduliChain di laptop dan ponsel",
  },
  {
    name: "Astra",
    category: "Aplikasi asisten AI",
    categoryId: "project.category.astra",
    description:
      "Asisten AI yang bisa diajak mengobrol untuk mengelola aset digital, misalnya mengirim token atau membuat koleksi digital, tanpa perlu paham kode.",
    descriptionId: "project.description.astra",
    image: "/projects/astra.webp",
    logo: "/projects/logos/astra.webp",
    imageAlt: "Tampilan website Astra di laptop dan ponsel",
  },
  {
    name: "AuditFi",
    category: "Aplikasi keamanan digital",
    categoryId: "project.category.auditfi",
    description:
      "Alat pemeriksa keamanan program keuangan digital berbasis AI yang mencari celah dan menyusun laporan hanya dalam hitungan detik.",
    descriptionId: "project.description.auditfi",
    image: "/projects/auditfi.webp",
    logo: "/projects/logos/auditfi.svg",
    imageAlt: "Tampilan website AuditFi di laptop dan ponsel",
  },
  {
    name: "P2P DEX",
    category: "Aplikasi tukar aset digital",
    categoryId: "project.category.p2p",
    description:
      "Platform tukar-menukar aset digital langsung antar pengguna, dengan perlindungan transaksi dan halaman admin untuk mengelola platform.",
    descriptionId: "project.description.p2p",
    image: "/projects/p2p-dex.webp",
    logo: "/projects/logos/p2p-dex.webp",
    imageAlt: "Tampilan website P2P DEX di laptop dan ponsel",
  },
  {
    name: "PayGuppy",
    category: "Aplikasi pembayaran digital",
    categoryId: "project.category.payguppy",
    description:
      "Aplikasi yang membantu toko biasa menerima pembayaran uang digital hanya dengan memakai kode QR yang sudah mereka punya.",
    descriptionId: "project.description.payguppy",
    image: "/projects/payguppy.webp",
    imageAlt: "Tampilan website PayGuppy di laptop dan ponsel",
  },
  {
    name: "Tip-Tap",
    category: "Aplikasi untuk kreator konten",
    categoryId: "project.category.tiptap",
    description:
      "Platform bagi kreator konten untuk menerima tip dari penonton berupa uang digital atau koleksi digital, lengkap dengan notifikasi saat live.",
    descriptionId: "project.description.tiptap",
    image: "/projects/tip-tap.webp",
    logo: "/projects/logos/tip-tap.webp",
    imageAlt: "Tampilan website Tip-Tap di laptop dan ponsel",
  },
  {
    name: "Senkus Elixir",
    category: "Game online",
    categoryId: "project.category.senkus",
    description:
      "Game online bertema sains dan alkimia: pemain menggabungkan ramuan, mengumpulkan koleksi digital, dan berkompetisi di arena.",
    descriptionId: "project.description.senkus",
    image: "/projects/senkus-elixir.webp",
    logo: "/projects/logos/senkus-elixir.webp",
    imageAlt: "Tampilan website Senkus Elixir di laptop dan ponsel",
  },
  {
    name: "QuickStock",
    category: "Aplikasi stok barang",
    categoryId: "project.category.quickstock",
    description:
      "Aplikasi komputer untuk mengelola stok toko pakaian: catat penjualan, pasokan dari supplier, dan laporan stok, dengan akses sesuai peran karyawan.",
    descriptionId: "project.description.quickstock",
    image: "/projects/quickstock.webp",
    imageAlt: "Tampilan website QuickStock di laptop dan ponsel",
  },
  {
    name: "Caér Finance",
    category: "Aplikasi pinjaman digital",
    categoryId: "project.category.caer",
    description:
      "Platform pinjam-meminjam aset digital lintas jaringan yang mendukung rupiah digital IDRX, agar pengguna mudah menabung dan meminjam.",
    descriptionId: "project.description.caer",
    image: "/projects/caer-finance.webp",
    logo: "/projects/logos/caer-finance.webp",
    imageAlt: "Tampilan website Caér Finance di laptop dan ponsel",
  },
] satisfies Project[];

// WhatsApp contact. Display uses the international format with a leading +; the href
// uses digits only, as wa.me requires.
export const whatsappDisplay = "+6285326513324";
export const whatsappNumber = "6285326513324";

export function createWhatsAppHref(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
