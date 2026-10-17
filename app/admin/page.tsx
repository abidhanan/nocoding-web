import Link from "next/link";
import { adminConfigured, isAdmin } from "../../lib/articles/auth";
import { formatDate } from "../../lib/articles/format";
import { readAllFresh, storeConfigured } from "../../lib/articles/store";
import { logoutAction } from "./actions";
import DeleteButton from "./delete-button";
import LoginForm from "./login-form";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!adminConfigured()) {
    return (
      <main className="grid min-h-screen place-items-center px-6">
        <p className="max-w-md text-center leading-7 text-slate-300">
          Panel admin belum aktif. Atur variabel <code className="text-brand-cyan">ADMIN_PASSWORD</code> dan{" "}
          <code className="text-brand-cyan">SESSION_SECRET</code> di server.
        </p>
      </main>
    );
  }

  if (!(await isAdmin())) {
    return (
      <main className="grid min-h-screen place-items-center px-6">
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <p className="text-2xl font-black text-white">
            nocoding<span className="text-brand-cyan">_</span> admin
          </p>
          <p className="mt-2 text-sm text-slate-400">Masuk untuk mengelola artikel.</p>
          <LoginForm />
        </div>
      </main>
    );
  }

  const articles = await readAllFresh();
  const stored = storeConfigured();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase text-brand-cyan">Admin</p>
          <h1 className="mt-1 text-3xl font-black text-white">Artikel</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/" className="text-sm font-bold text-slate-300 transition hover:text-brand-cyan">
            Lihat Situs
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white transition hover:border-brand-cyan hover:text-brand-cyan"
            >
              Keluar
            </button>
          </form>
          <Link
            href="/admin/artikel/baru"
            className="inline-flex min-h-11 items-center rounded-full bg-brand-cyan px-6 text-sm font-black text-brand-dark transition hover:bg-brand-lime"
          >
            + Artikel Baru
          </Link>
        </div>
      </header>

      {!stored ? (
        <p role="alert" className="mt-6 rounded-lg border border-amber-300/40 bg-amber-300/10 p-4 text-sm text-amber-200">
          Penyimpanan belum terhubung (BLOB_READ_WRITE_TOKEN kosong), jadi perubahan tidak bisa disimpan.
        </p>
      ) : null}

      <ul className="mt-8 grid gap-3">
        {articles.length === 0 ? (
          <li className="rounded-xl border border-white/10 p-6 text-slate-400">Belum ada artikel.</li>
        ) : null}
        {articles.map((article) => (
          <li
            key={article.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    article.status === "published"
                      ? "bg-brand-lime/15 text-brand-lime"
                      : "bg-amber-300/15 text-amber-200"
                  }`}
                >
                  {article.status === "published" ? "Terbit" : "Draf"}
                </span>
                {article.categories.length > 0 ? <span className="text-xs text-slate-400">{article.categories.join(", ")}</span> : null}
                <span className="text-xs text-slate-500">{formatDate(article.publishedAt)}</span>
              </div>
              <p className="mt-2 truncate font-bold text-white">{article.title}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {article.status === "published" ? (
                <Link
                  href={`/artikel/${article.slug}`}
                  target="_blank"
                  className="rounded-full border border-white/20 px-4 py-2 text-xs font-bold text-white transition hover:border-brand-cyan hover:text-brand-cyan"
                >
                  Lihat
                </Link>
              ) : null}
              <Link
                href={`/admin/artikel/${article.id}`}
                className="rounded-full border border-brand-cyan/50 px-4 py-2 text-xs font-bold text-brand-cyan transition hover:bg-brand-cyan/10"
              >
                Edit
              </Link>
              <DeleteButton id={article.id} title={article.title} />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
