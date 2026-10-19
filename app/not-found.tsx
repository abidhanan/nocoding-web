import type { Metadata } from "next";
import Link from "next/link";
import LanguageController from "./components/language-controller";
import { LocalizedText } from "./components/localized-text";

export const metadata: Metadata = {
  description: "Halaman yang Anda cari tidak tersedia di nocoding_",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-brand-dark px-6 pb-20 pt-32 text-white">
      <LanguageController />
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase text-brand-cyan">404</p>
        <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
          <LocalizedText id="notfound.title">Halaman tidak ditemukan.</LocalizedText>
        </h1>
        <p className="mt-5 max-w-2xl leading-8 text-slate-400">
          <LocalizedText id="notfound.text">
            Link yang Anda buka mungkin sudah berubah atau belum tersedia. Kembali ke beranda untuk melihat layanan nocoding_.
          </LocalizedText>
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-dark transition hover:bg-brand-lime focus:outline-none focus:ring-2 focus:ring-brand-lime focus:ring-offset-2 focus:ring-offset-brand-dark"
        >
          <LocalizedText id="notfound.back">Kembali ke beranda</LocalizedText>
        </Link>
      </div>
    </main>
  );
}
