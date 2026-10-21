/**
 * The legal pages. Written in Indonesian (the version that applies) and English, which is what every
 * other language shows. Lines that start with "- " are rendered as list items.
 */
export type Bilingual = { id: string; en: string };

export type LegalSection = {
  title: Bilingual;
  body: { id: string[]; en: string[] };
};

export type LegalDoc = {
  slug: string;
  /** Key of the translated page name (also used for the browser tab title). */
  nameKey: string;
  name: Bilingual;
  description: Bilingual;
  updated: string;
  sections: LegalSection[];
};

const email = "nocodingindonesia@gmail.com";
const whatsapp = "+62 853-2651-3324";

export const legalUpdated = "2026-10-21";

export const privacyPolicy: LegalDoc = {
  slug: "kebijakan-privasi",
  nameKey: "legal.privacy",
  name: { id: "Kebijakan Privasi", en: "Privacy Policy" },
  description: {
    id: "Data apa yang dikumpulkan Nocoding, untuk apa digunakan, siapa yang memprosesnya, dan hak Anda atas data pribadi.",
    en: "What data Nocoding collects, what it is used for, who processes it, and your rights over your personal data.",
  },
  updated: legalUpdated,
  sections: [
    {
      title: { id: "1. Siapa kami", en: "1. Who we are" },
      body: {
        id: [
          "Nocoding (nocoding.web.id) adalah layanan pembuatan website, aplikasi, sistem informasi, dan automasi yang dikelola oleh Abid Hanan Wicaksono di Indonesia. Kebijakan ini menjelaskan bagaimana kami memperlakukan data pribadi Anda saat Anda mengunjungi situs ini atau menghubungi kami.",
          `Pertanyaan tentang kebijakan ini dapat dikirim ke ${email} atau WhatsApp ${whatsapp}.`,
        ],
        en: [
          "Nocoding (nocoding.web.id) is a website, app, information system and automation service run by Abid Hanan Wicaksono in Indonesia. This policy explains how we treat your personal data when you visit this site or contact us.",
          `Questions about this policy can be sent to ${email} or WhatsApp ${whatsapp}.`,
        ],
      },
    },
    {
      title: { id: "2. Data yang kami kumpulkan", en: "2. Data we collect" },
      body: {
        id: [
          "- Data yang Anda berikan sendiri: nama, nomor WhatsApp, email, dan keterangan kebutuhan proyek ketika Anda menghubungi kami lewat WhatsApp atau email. Situs ini tidak memiliki akun pengguna atau formulir pendaftaran.",
          "- Data teknis yang diproses otomatis: alamat IP, jenis perangkat dan browser, serta halaman yang dibuka. Data ini diproses oleh penyedia hosting dan CDN kami untuk menayangkan situs dan menjaganya dari penyalahgunaan.",
          "- Perkiraan negara: agar harga tampil dalam mata uang Anda, negara diperkirakan dari informasi CDN atau pengaturan bahasa browser. Informasi ini tidak kami simpan di server.",
          "- Data analitik: Google Analytics 4 dan Microsoft Clarity (bila aktif) mengumpulkan statistik penggunaan seperti halaman yang dibuka, lama kunjungan, jenis perangkat, dan rekaman interaksi tanpa identitas. Keduanya baru dimuat setelah Anda berinteraksi dengan halaman.",
          "- Penyimpanan di browser: pilihan bahasa, penanda bahwa Anda sudah menyukai, melihat, atau membagikan sebuah artikel, dan perkiraan harga sementara. Rinciannya ada di Kebijakan Cookie.",
          "- Jumlah dilihat, disukai, dan dibagikan pada artikel disimpan sebagai angka gabungan tanpa identitas pengunjung.",
        ],
        en: [
          "- Data you give us: your name, WhatsApp number, email and a description of your project when you contact us by WhatsApp or email. This site has no user accounts or sign-up forms.",
          "- Technical data processed automatically: IP address, device and browser type, and the pages you open. Our hosting and CDN providers process it to serve the site and protect it from abuse.",
          "- Approximate country: so prices can be shown in your currency, your country is estimated from CDN information or your browser language. We do not store it on our servers.",
          "- Analytics data: Google Analytics 4 and Microsoft Clarity (when enabled) collect usage statistics such as pages opened, visit length, device type and anonymous interaction recordings. They only load after you interact with the page.",
          "- Browser storage: your language choice, markers that you already liked, viewed or shared an article, and a temporary price estimate. Details are in the Cookie Policy.",
          "- Article view, like and share counts are stored as combined numbers, without visitor identity.",
        ],
      },
    },
    {
      title: { id: "3. Untuk apa data digunakan", en: "3. What the data is used for" },
      body: {
        id: [
          "- Menjawab pertanyaan, menyusun penawaran, dan mengerjakan proyek Anda.",
          "- Menayangkan, mengamankan, dan menjaga kecepatan situs.",
          "- Memahami bagaimana situs digunakan agar bisa kami perbaiki.",
          "- Memenuhi kewajiban hukum yang berlaku.",
          "Kami tidak menjual data pribadi Anda.",
        ],
        en: [
          "- Answering your questions, preparing quotes and carrying out your project.",
          "- Serving, securing and keeping the site fast.",
          "- Understanding how the site is used so we can improve it.",
          "- Meeting legal obligations.",
          "We do not sell your personal data.",
        ],
      },
    },
    {
      title: { id: "4. Pihak ketiga yang terlibat", en: "4. Third parties involved" },
      body: {
        id: [
          "- Vercel: hosting dan penayangan situs.",
          "- Cloudflare: CDN dan keamanan.",
          "- Google (Google Analytics 4) dan Microsoft (Clarity): statistik penggunaan situs.",
          "- Meta (WhatsApp) dan Google (Gmail): saat Anda menghubungi kami lewat tautan WhatsApp atau email di situs ini.",
          "- Penyedia kurs mata uang: hanya menerima permintaan kurs dari server kami, bukan data pengunjung.",
          "Penyedia tersebut dapat memproses data di luar Indonesia sesuai kebijakan masing-masing.",
        ],
        en: [
          "- Vercel: hosting and serving the site.",
          "- Cloudflare: CDN and security.",
          "- Google (Google Analytics 4) and Microsoft (Clarity): site usage statistics.",
          "- Meta (WhatsApp) and Google (Gmail): when you contact us through the WhatsApp or email links on this site.",
          "- Currency rate provider: only receives rate requests from our server, not visitor data.",
          "These providers may process data outside Indonesia under their own policies.",
        ],
      },
    },
    {
      title: { id: "5. Berapa lama data disimpan", en: "5. How long data is kept" },
      body: {
        id: [
          "Percakapan dan materi proyek disimpan selama dibutuhkan untuk menjalankan layanan, memberi dukungan, dan memenuhi kewajiban hukum, lalu dihapus atau dianonimkan. Data analitik mengikuti masa simpan pengaturan penyedianya. Data di browser Anda tetap ada sampai Anda menghapusnya.",
        ],
        en: [
          "Conversations and project materials are kept as long as needed to run the service, give support and meet legal obligations, then deleted or anonymised. Analytics data follows the retention settings of its provider. Data in your browser stays until you delete it.",
        ],
      },
    },
    {
      title: { id: "6. Hak Anda", en: "6. Your rights" },
      body: {
        id: [
          "Sesuai Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi, Anda berhak untuk:",
          "- mengetahui dan meminta salinan data pribadi Anda yang kami simpan;",
          "- meminta perbaikan data yang keliru;",
          "- meminta penghapusan data atau menarik persetujuan Anda;",
          "- keberatan atas pemrosesan tertentu.",
          `Kirim permintaan ke ${email}. Kami akan menanggapinya dalam waktu yang wajar.`,
        ],
        en: [
          "Under Indonesia's Law No. 27 of 2022 on Personal Data Protection, you have the right to:",
          "- know and get a copy of the personal data we hold about you;",
          "- ask for incorrect data to be corrected;",
          "- ask for your data to be deleted or withdraw your consent;",
          "- object to certain processing.",
          `Send your request to ${email}. We will respond within a reasonable time.`,
        ],
      },
    },
    {
      title: { id: "7. Keamanan dan anak-anak", en: "7. Security and children" },
      body: {
        id: [
          "Situs ini memakai HTTPS dan akses ke data proyek dibatasi. Tidak ada metode pengiriman atau penyimpanan data yang sepenuhnya bebas risiko, jadi kami tidak dapat menjamin keamanan mutlak.",
          "Layanan kami ditujukan untuk pengguna berusia 18 tahun ke atas. Kami tidak dengan sengaja mengumpulkan data pribadi anak.",
        ],
        en: [
          "This site uses HTTPS and access to project data is restricted. No method of transmitting or storing data is completely risk free, so we cannot guarantee absolute security.",
          "Our services are meant for people aged 18 and over. We do not knowingly collect children's personal data.",
        ],
      },
    },
    {
      title: { id: "8. Perubahan kebijakan", en: "8. Changes to this policy" },
      body: {
        id: ["Kebijakan ini dapat diperbarui sewaktu-waktu. Tanggal pembaruan terakhir tertera di bagian atas halaman. Bila ada perbedaan makna antar bahasa, versi Bahasa Indonesia yang berlaku."],
        en: ["This policy may be updated from time to time. The date of the last update is shown at the top of the page. If the languages differ in meaning, the Indonesian version applies."],
      },
    },
  ],
};

export const termsOfService: LegalDoc = {
  slug: "syarat-ketentuan",
  nameKey: "legal.terms",
  name: { id: "Syarat dan Ketentuan", en: "Terms and Conditions" },
  description: {
    id: "Aturan penggunaan situs dan layanan Nocoding: paket, harga, proses pengerjaan, hak kekayaan intelektual, dan batas tanggung jawab.",
    en: "The rules for using the Nocoding site and services: packages, prices, how work is done, intellectual property and limits of liability.",
  },
  updated: legalUpdated,
  sections: [
    {
      title: { id: "1. Penerimaan syarat", en: "1. Accepting these terms" },
      body: {
        id: ["Dengan membuka situs ini atau memakai layanan Nocoding, Anda menyetujui syarat dan ketentuan berikut. Bila Anda tidak setuju, mohon tidak menggunakan situs dan layanan kami."],
        en: ["By opening this site or using Nocoding's services, you agree to these terms and conditions. If you do not agree, please do not use our site or services."],
      },
    },
    {
      title: { id: "2. Layanan", en: "2. The services" },
      body: {
        id: [
          "Nocoding membuat website portofolio atau CV, landing page dan profil perusahaan, sistem informasi dan operasional, serta automasi proses bisnis. Cakupan pekerjaan, fitur, jadwal, dan biaya ditetapkan bersama Anda lewat WhatsApp atau email sebelum pengerjaan dimulai.",
          "Konsultasi selalu gratis, kapan pun Anda butuhkan, dan tidak mewajibkan Anda memesan.",
        ],
        en: [
          "Nocoding builds portfolio or CV websites, landing pages and company profiles, information and operations systems, and business process automation. The scope of work, features, schedule and cost are agreed with you over WhatsApp or email before work starts.",
          "Consultation is always free, whenever you need it, and does not oblige you to order.",
        ],
      },
    },
    {
      title: { id: "3. Paket dan harga", en: "3. Packages and prices" },
      body: {
        id: [
          "- Paket Kecil: mulai Rp 500.000 per tahun, termasuk gratis maintenance dan domain selama 1 tahun.",
          "- Paket Besar: mulai Rp 2.000.000 per tahun, termasuk gratis maintenance dan hosting selama 1 tahun.",
          "Harga di situs adalah harga awal. Nilai akhir disepakati setelah konsultasi sesuai kebutuhan Anda. Bagi pengunjung dari luar Indonesia, harga ditampilkan dalam mata uang setempat sebagai perkiraan berdasarkan kurs harian; yang berlaku adalah nilai dalam rupiah yang disepakati. Biaya tambahan, seperti fitur ekstra atau perpanjangan setelah masa gratis berakhir, disampaikan lebih dulu sebelum dikerjakan.",
        ],
        en: [
          "- Small package: from Rp 500,000 per year, including free maintenance and a domain for 1 year.",
          "- Big package: from Rp 2,000,000 per year, including free maintenance and hosting for 1 year.",
          "Prices on the site are starting prices. The final amount is agreed after a consultation, based on your needs. For visitors outside Indonesia, prices are shown in the local currency as an estimate based on the daily exchange rate; the amount in rupiah that we agree on is the one that applies. Extra costs, such as additional features or renewal after the free period ends, are told to you before the work is done.",
        ],
      },
    },
    {
      title: { id: "4. Proses dan tanggung jawab Anda", en: "4. How work is done and your responsibilities" },
      body: {
        id: [
          "Rancangan ditinjau dan disetujui bersama Anda sebelum masuk produksi. Revisi dikerjakan sesuai kesepakatan.",
          "Anda bertanggung jawab menyediakan materi (logo, teks, foto, data) tepat waktu dan menjamin bahwa Anda berhak menggunakannya. Keterlambatan materi atau masukan dapat memengaruhi jadwal.",
        ],
        en: [
          "The design is reviewed and approved with you before production. Revisions are done as agreed.",
          "You are responsible for providing materials (logo, text, photos, data) on time and for having the right to use them. Delays in materials or feedback can affect the schedule.",
        ],
      },
    },
    {
      title: { id: "5. Maintenance", en: "5. Maintenance" },
      body: {
        id: ["Maintenance gratis selama 1 tahun mencakup perbaikan kesalahan pada hasil kerja kami dan pembaruan keamanan dasar. Fitur baru, perubahan besar pada desain, dan pekerjaan di luar kesepakatan awal dihitung terpisah."],
        en: ["Free maintenance for 1 year covers fixing errors in our work and basic security updates. New features, major design changes and work outside the original agreement are charged separately."],
      },
    },
    {
      title: { id: "6. Hak kekayaan intelektual", en: "6. Intellectual property" },
      body: {
        id: [
          "Materi yang Anda berikan tetap menjadi milik Anda. Hasil pekerjaan diserahkan kepada Anda setelah pembayaran sesuai kesepakatan lunas. Nocoding dapat menampilkan karya yang sudah tayang sebagai contoh di portofolio, kecuali Anda memintanya secara tertulis agar tidak ditampilkan.",
          "Desain, teks, dan artikel di situs nocoding.web.id adalah milik Nocoding. Anda boleh membagikan tautannya, tetapi tidak boleh menyalin dan memakainya secara komersial tanpa izin. Foto artikel berasal dari Unsplash dan mengikuti lisensinya; sumbernya dicantumkan di bawah foto.",
        ],
        en: [
          "The materials you provide remain yours. The finished work is handed over to you once payment as agreed is complete. Nocoding may show live work as examples in its portfolio, unless you ask in writing for it not to be shown.",
          "The design, text and articles on nocoding.web.id belong to Nocoding. You may share links to them, but you may not copy and use them commercially without permission. Article photos come from Unsplash and follow its licence; the source is credited under each photo.",
        ],
      },
    },
    {
      title: { id: "7. Bahasa situs", en: "7. Site languages" },
      body: {
        id: ["Situs ini tersedia dalam banyak bahasa. Terjemahan, terutama untuk bahasa yang sedikit penuturnya, dapat belum sempurna. Bila ada perbedaan makna, versi Bahasa Indonesia yang berlaku. Halaman legal ini tersedia dalam Bahasa Indonesia dan Inggris."],
        en: ["This site is available in many languages. Translations, especially for languages with fewer speakers, may not be perfect. If they differ in meaning, the Indonesian version applies. These legal pages are available in Indonesian and English."],
      },
    },
    {
      title: { id: "8. Batas tanggung jawab", en: "8. Limits of liability" },
      body: {
        id: [
          "Kami berupaya memberikan hasil yang baik, tetapi tidak menjanjikan hasil bisnis tertentu seperti peringkat pencarian, jumlah pengunjung, atau penjualan. Kami tidak bertanggung jawab atas gangguan dari pihak ketiga seperti penyedia hosting, domain, atau pembayaran, maupun atas kerugian tidak langsung.",
          "Tanggung jawab kami atas suatu layanan dibatasi sebesar nilai yang telah Anda bayarkan untuk layanan tersebut, sejauh diizinkan hukum. Ketentuan ini tidak mengurangi hak Anda yang dilindungi oleh peraturan perundang-undangan.",
        ],
        en: [
          "We work to deliver good results, but we do not promise specific business outcomes such as search rankings, visitor numbers or sales. We are not responsible for disruptions from third parties such as hosting, domain or payment providers, or for indirect losses.",
          "Our liability for a service is limited to the amount you have paid for that service, to the extent the law allows. This does not reduce rights you have that are protected by law.",
        ],
      },
    },
    {
      title: { id: "9. Hukum yang berlaku", en: "9. Governing law" },
      body: {
        id: ["Syarat ini tunduk pada hukum Republik Indonesia. Bila terjadi perselisihan, kita selesaikan lebih dulu secara musyawarah. Jika tidak tercapai kesepakatan, perselisihan diselesaikan melalui pengadilan yang berwenang di Indonesia."],
        en: ["These terms are governed by the laws of the Republic of Indonesia. If a dispute arises, we first try to settle it by discussion. If no agreement is reached, the dispute is settled by the competent courts in Indonesia."],
      },
    },
    {
      title: { id: "10. Perubahan dan kontak", en: "10. Changes and contact" },
      body: {
        id: [`Syarat ini dapat diperbarui sewaktu-waktu; tanggal pembaruan terakhir tertera di bagian atas halaman. Pertanyaan dapat dikirim ke ${email} atau WhatsApp ${whatsapp}.`],
        en: [`These terms may be updated from time to time; the date of the last update is shown at the top of the page. Questions can be sent to ${email} or WhatsApp ${whatsapp}.`],
      },
    },
  ],
};

export const cookiePolicy: LegalDoc = {
  slug: "kebijakan-cookie",
  nameKey: "legal.cookies",
  name: { id: "Kebijakan Cookie", en: "Cookie Policy" },
  description: {
    id: "Cookie dan penyimpanan lokal yang dipakai situs Nocoding, untuk apa, dan cara mengelolanya.",
    en: "The cookies and local storage the Nocoding site uses, what they are for, and how to manage them.",
  },
  updated: legalUpdated,
  sections: [
    {
      title: { id: "1. Apa itu cookie", en: "1. What cookies are" },
      body: {
        id: ["Cookie adalah berkas kecil yang disimpan browser Anda oleh sebuah situs. Penyimpanan lokal (local storage dan session storage) bekerja serupa tetapi tidak dikirim otomatis ke server. Di halaman ini keduanya disebut cookie."],
        en: ["Cookies are small files a site stores in your browser. Local storage and session storage work in a similar way but are not sent to a server automatically. On this page we call them all cookies."],
      },
    },
    {
      title: { id: "2. Yang diperlukan agar situs berfungsi", en: "2. What the site needs to work" },
      body: {
        id: [
          "Disimpan di browser Anda dan tidak dikirim ke server kami:",
          "- nocoding-language dan nocoding-language-set: bahasa yang Anda pilih atau terdeteksi dari browser.",
          "- nocoding-pricing (sesi): perkiraan mata uang dan kurs agar harga tidak dihitung ulang di setiap halaman.",
          "- Penanda artikel: apakah Anda sudah menyukai, melihat, atau membagikan sebuah artikel, supaya hitungan tidak berlipat.",
          "- Penanda posisi gulir sementara saat berpindah antarbagian situs.",
        ],
        en: [
          "Stored in your browser and not sent to our servers:",
          "- nocoding-language and nocoding-language-set: the language you chose or that was detected from your browser.",
          "- nocoding-pricing (session): the estimated currency and rate, so prices are not worked out again on every page.",
          "- Article markers: whether you already liked, viewed or shared an article, so counts are not doubled.",
          "- A temporary scroll position marker when moving between parts of the site.",
        ],
      },
    },
    {
      title: { id: "3. Analitik", en: "3. Analytics" },
      body: {
        id: [
          "Bila diaktifkan, dua layanan analitik dimuat setelah Anda berinteraksi dengan halaman (menggulir, mengetuk, atau menekan tombol):",
          "- Google Analytics 4 (cookie seperti _ga dan _ga_*, masa berlaku hingga sekitar 2 tahun): statistik kunjungan.",
          "- Microsoft Clarity (cookie seperti _clck, _clsk, CLID, dan MUID, masa berlaku hingga sekitar 1 tahun): peta panas dan rekaman interaksi tanpa identitas.",
          "Penyedia CDN dan keamanan juga dapat memasang cookie teknis untuk melindungi situs dari lalu lintas berbahaya.",
        ],
        en: [
          "When enabled, two analytics services load after you interact with the page (scroll, tap or press a key):",
          "- Google Analytics 4 (cookies such as _ga and _ga_*, valid for up to about 2 years): visit statistics.",
          "- Microsoft Clarity (cookies such as _clck, _clsk, CLID and MUID, valid for up to about 1 year): heatmaps and anonymous interaction recordings.",
          "CDN and security providers may also set technical cookies to protect the site from harmful traffic.",
        ],
      },
    },
    {
      title: { id: "4. Cara mengelola cookie", en: "4. How to manage cookies" },
      body: {
        id: [
          "Anda dapat menghapus atau memblokir cookie lewat pengaturan browser. Pengguna Google Analytics juga dapat memasang add-on penolakan resmi dari Google. Bila cookie analitik diblokir, situs tetap berfungsi; bila penyimpanan lokal dihapus, pilihan bahasa Anda akan kembali ke pengaturan awal.",
        ],
        en: [
          "You can delete or block cookies in your browser settings. You can also install Google's official opt-out add-on for Google Analytics. If analytics cookies are blocked, the site still works; if local storage is cleared, your language choice goes back to the default.",
        ],
      },
    },
    {
      title: { id: "5. Pertanyaan", en: "5. Questions" },
      body: {
        id: [`Untuk pertanyaan tentang kebijakan ini, hubungi ${email}. Penggunaan data pribadi dijelaskan lebih lanjut di Kebijakan Privasi. Bila ada perbedaan makna antar bahasa, versi Bahasa Indonesia yang berlaku.`],
        en: [`For questions about this policy, contact ${email}. How personal data is used is explained further in the Privacy Policy. If the languages differ in meaning, the Indonesian version applies.`],
      },
    },
  ],
};

export const legalDocs = [privacyPolicy, termsOfService, cookiePolicy];
