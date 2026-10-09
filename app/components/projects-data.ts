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
      "Marketplace pre-loved berbasis PHP dan MySQL yang membantu pengguna menjual dan membeli barang bekas dengan tampilan modern dan responsif.",
    descriptionId: "project.description.ecoswap",
    image: "/projects/ecoswap-website-jual-beli-barang-bekas.webp",
    imageAlt: "Tampilan website Ecoswap di laptop dan ponsel",
  },
  {
    name: "Wiboost Store",
    category: "Website layanan digital",
    categoryId: "project.category.wiboost",
    description:
      "Toko layanan digital berbasis Laravel dengan produk dan stok, deposit saldo, refund, komisi reseller, email campaign, dan panel admin.",
    descriptionId: "project.description.wiboost",
    image: "/projects/wiboost-store-website-layanan-digital.webp",
    imageAlt: "Tampilan website Wiboost Store di laptop dan ponsel",
  },
  {
    name: "AHAWI Portfolio",
    category: "Website portofolio",
    categoryId: "project.category.ahawi",
    description:
      "Website portofolio dwibahasa bertema cat air, dibangun dengan Next.js dan React untuk menampilkan profil, pengalaman, dan kontak secara responsif.",
    descriptionId: "project.description.ahawi",
    image: "/projects/ahawi-portfolio-website-portofolio.webp",
    imageAlt: "Tampilan website AHAWI Portfolio di laptop dan ponsel",
  },
  {
    name: "Abdi Dalem Keraton Kasunanan Surakarta Hadiningrat",
    category: "Website manajemen database",
    categoryId: "project.category.abdi",
    description:
      "Portal berbasis Laravel untuk pendaftaran, biodata, kegiatan, presensi, verifikasi, dan pencetakan ID Card abdi dalem.",
    descriptionId: "project.description.abdi",
    image: "/projects/abdi-dalem-keraton-kasunanan-surakarta-hadiningrat.webp",
    imageAlt: "Tampilan website Abdi Dalem Keraton Kasunanan Surakarta Hadiningrat di laptop dan ponsel",
  },
  {
    name: "S-Farm Singopuran",
    category: "Aplikasi manajemen peternakan",
    categoryId: "project.category.sfarm",
    description:
      "Aplikasi web peternakan ayam petelur dan kambing BUMDesa untuk monitoring harian, penjualan, pengeluaran, dan laporan keuangan.",
    descriptionId: "project.description.sfarm",
    image: "/projects/s-farm.webp",
    imageAlt: "Tampilan website S-Farm Singopuran di laptop dan ponsel",
  },
  {
    name: "PayU",
    category: "Platform bounty freelance",
    categoryId: "project.category.payu",
    description:
      "Platform bounty freelance dengan peran admin, sponsor, dan freelancer, pembayaran QRIS, serta mode gelap dan terang.",
    descriptionId: "project.description.payu",
    image: "/projects/payu.webp",
    imageAlt: "Tampilan website PayU di laptop dan ponsel",
  },
  {
    name: "Dar Casual",
    category: "Website katalog produk",
    categoryId: "project.category.darcasual",
    description:
      "Katalog satu halaman dengan lebih dari seribu produk, filter, detail produk, dan pemesanan langsung lewat WhatsApp.",
    descriptionId: "project.description.darcasual",
    image: "/projects/dar-casual.webp",
    imageAlt: "Tampilan website Dar Casual di laptop dan ponsel",
  },
  {
    name: "Ian Prem Store",
    category: "Website toko aplikasi premium",
    categoryId: "project.category.ianprem",
    description:
      "Toko akun aplikasi premium dengan peran admin dan pengguna, kelola produk dan stok, serta dashboard penjualan berbasis Next.js dan Supabase.",
    descriptionId: "project.description.ianprem",
    image: "/projects/ian-prem-store.webp",
    imageAlt: "Tampilan website Ian Prem Store di laptop dan ponsel",
  },
  {
    name: "Alengka Home Living",
    category: "Website katalog furnitur",
    categoryId: "project.category.alengka",
    description:
      "Katalog furnitur indoor dan outdoor custom untuk cafe, restoran, dan hunian, responsif di semua perangkat dan terhubung ke WhatsApp.",
    descriptionId: "project.description.alengka",
    image: "/projects/alengka-home-living.webp",
    imageAlt: "Tampilan website Alengka Home Living di laptop dan ponsel",
  },
  {
    name: "SD Negeri Pucangsawit",
    category: "Website profil sekolah",
    categoryId: "project.category.sdn",
    description:
      "Website resmi SD Negeri Pucangsawit Surakarta dengan profil sekolah, informasi PPDB, direktori guru, ekstrakurikuler, dan prestasi siswa.",
    descriptionId: "project.description.sdn",
    image: "/projects/sdn-pucangsawit.webp",
    imageAlt: "Tampilan website SD Negeri Pucangsawit di laptop dan ponsel",
  },
  {
    name: "OD Furnix Galery",
    category: "Website katalog furnitur",
    categoryId: "project.category.furnix",
    description:
      "Katalog furnitur besi untuk cafe, restoran, dan hunian dari Jepara, lengkap dengan filter produk dan pemesanan custom.",
    descriptionId: "project.description.furnix",
    image: "/projects/od-furnix-galery.webp",
    imageAlt: "Tampilan website OD Furnix Galery di laptop dan ponsel",
  },
  {
    name: "Clothique",
    category: "Website e-commerce fashion",
    categoryId: "project.category.clothique",
    description:
      "E-commerce berbasis Laravel dengan katalog, keranjang, checkout, pembayaran Duitku, blog, laporan keuangan, dan panel admin berbasis role.",
    descriptionId: "project.description.clothique",
    image: "/projects/clothique-ecommerce.webp",
    imageAlt: "Tampilan website Clothique di laptop dan ponsel",
  },
  {
    name: "AGLI",
    category: "Platform content intelligence",
    categoryId: "project.category.agli",
    description:
      "Prototipe riset konten untuk Amsterdam Game Lab yang meranking konten berperforma tinggi dan menyusun draf konten berbasis data.",
    descriptionId: "project.description.agli",
    image: "/projects/agli.webp",
    imageAlt: "Tampilan website AGLI di laptop dan ponsel",
  },
  {
    name: "Nebulist AI Sales Engine",
    category: "Aplikasi AI sales",
    categoryId: "project.category.nebulist",
    description:
      "MVP riset penjualan berbasis AI yang menghasilkan strategi, CRM, dan draf outreach dari input produk, dibangun dengan Next.js.",
    descriptionId: "project.description.nebulist",
    image: "/projects/nebulist-ai-sales-engine.webp",
    imageAlt: "Tampilan website Nebulist AI Sales Engine di laptop dan ponsel",
  },
  {
    name: "CarbonFi",
    category: "Aplikasi web3 finansial",
    categoryId: "project.category.carbonfi",
    description:
      "Platform keuangan karbon berbasis blockchain untuk jual beli kredit karbon, NFT mining, dan staking DeFi.",
    descriptionId: "project.description.carbonfi",
    image: "/projects/carbonfi.webp",
    imageAlt: "Tampilan website CarbonFi di laptop dan ponsel",
  },
  {
    name: "ProtectedPay",
    category: "Aplikasi web3 pembayaran",
    categoryId: "project.category.protectedpay",
    description:
      "Aplikasi transfer kripto aman di jaringan Lisk dengan perlindungan escrow, pembayaran grup, dan tabungan pintar.",
    descriptionId: "project.description.protectedpay",
    image: "/projects/protectedpay.webp",
    imageAlt: "Tampilan website ProtectedPay di laptop dan ponsel",
  },
  {
    name: "PeduliChain",
    category: "Aplikasi web3 donasi",
    categoryId: "project.category.pedulichain",
    description:
      "Platform donasi transparan di blockchain dengan pencatatan dana, tata kelola komunitas, dan bukti dampak yang tidak bisa diubah.",
    descriptionId: "project.description.pedulichain",
    image: "/projects/pedulichain.webp",
    imageAlt: "Tampilan website PeduliChain di laptop dan ponsel",
  },
  {
    name: "Astra",
    category: "Aplikasi web3 berbasis AI",
    categoryId: "project.category.astra",
    description:
      "Agen AI untuk jaringan Lisk yang menjalankan deploy kontrak, kirim token, dan membuat NFT lewat perintah chat.",
    descriptionId: "project.description.astra",
    image: "/projects/astra.webp",
    imageAlt: "Tampilan website Astra di laptop dan ponsel",
  },
  {
    name: "AuditFi",
    category: "Aplikasi keamanan smart contract",
    categoryId: "project.category.auditfi",
    description:
      "Audit keamanan smart contract berbasis AI yang mendeteksi celah, membuat laporan audit, dan menyimpan hasilnya di blockchain.",
    descriptionId: "project.description.auditfi",
    image: "/projects/auditfi.webp",
    imageAlt: "Tampilan website AuditFi di laptop dan ponsel",
  },
  {
    name: "P2P DEX",
    category: "Aplikasi web3 pertukaran",
    categoryId: "project.category.p2p",
    description:
      "Frontend pertukaran terdesentralisasi peer-to-peer dengan escrow, dashboard admin, dan dukungan multi-chain.",
    descriptionId: "project.description.p2p",
    image: "/projects/p2p-dex.webp",
    imageAlt: "Tampilan website P2P DEX di laptop dan ponsel",
  },
  {
    name: "PayGuppy",
    category: "Aplikasi web3 pembayaran",
    categoryId: "project.category.payguppy",
    description:
      "Aplikasi web3 yang membantu bisnis konvensional menerima pembayaran kripto lewat QR code yang sudah ada.",
    descriptionId: "project.description.payguppy",
    image: "/projects/payguppy.webp",
    imageAlt: "Tampilan website PayGuppy di laptop dan ponsel",
  },
  {
    name: "Tip-Tap",
    category: "Aplikasi web3 untuk kreator",
    categoryId: "project.category.tiptap",
    description:
      "Platform tip terdesentralisasi untuk kreator konten dengan dukungan kripto dan NFT serta notifikasi untuk live stream.",
    descriptionId: "project.description.tiptap",
    image: "/projects/tip-tap.webp",
    imageAlt: "Tampilan website Tip-Tap di laptop dan ponsel",
  },
  {
    name: "Senkus Elixir",
    category: "Game web3",
    categoryId: "project.category.senkus",
    description:
      "Game web3 bertema sains di jaringan Lisk dengan koleksi NFT, token, dan arena permainan.",
    descriptionId: "project.description.senkus",
    image: "/projects/senkus-elixir.webp",
    imageAlt: "Tampilan website Senkus Elixir di laptop dan ponsel",
  },
  {
    name: "QuickStock",
    category: "Aplikasi desktop inventaris",
    categoryId: "project.category.quickstock",
    description:
      "Aplikasi desktop Java untuk mengelola stok toko pakaian dengan akses berbasis peran, penjualan, supplier, dan laporan stok.",
    descriptionId: "project.description.quickstock",
    image: "/projects/quickstock.webp",
    imageAlt: "Tampilan website QuickStock di laptop dan ponsel",
  },
  {
    name: "Caér Finance",
    category: "Aplikasi web3 lending",
    categoryId: "project.category.caer",
    description:
      "Protokol lending dan borrowing lintas chain dengan dukungan stablecoin rupiah IDRX di ekosistem Lisk.",
    descriptionId: "project.description.caer",
    image: "/projects/caer-finance.webp",
    imageAlt: "Tampilan website Caér Finance di laptop dan ponsel",
  },
] satisfies Project[];

// WhatsApp contact. Display is the local format; the href uses the international
// format (leading 0 replaced with 62).
export const whatsappDisplay = "085326513324";
export const whatsappNumber = "6285326513324";

export function createWhatsAppHref(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
