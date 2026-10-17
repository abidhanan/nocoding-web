"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { newId, slugify } from "../../lib/articles/format";
import type { Article, Block } from "../../lib/articles/types";
import { saveArticleAction, uploadImageAction } from "./actions";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-brand-night px-4 py-3 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/40";
const smallButton =
  "rounded-full border border-white/20 px-3 py-1.5 text-xs font-bold text-slate-200 transition hover:border-brand-cyan hover:text-brand-cyan disabled:cursor-not-allowed disabled:opacity-30";

const blockLabels: Record<Block["type"], string> = {
  h2: "Judul Bagian",
  h3: "Sub Judul",
  p: "Paragraf",
  quote: "Kutipan",
  ul: "Daftar Poin",
  ol: "Daftar Angka",
  image: "Gambar",
  cta: "Ajakan WhatsApp",
};

const addable: Block["type"][] = ["p", "h2", "h3", "ul", "ol", "quote", "image", "cta"];

function emptyBlock(type: Block["type"]): Block {
  const id = newId();

  switch (type) {
    case "ul":
    case "ol":
      return { id, type, items: [""] };
    case "image":
      return { id, type, src: "", alt: "" };
    case "cta":
      return { id, type };
    default:
      return { id, type, text: "" };
  }
}

/** Shrinks a photo in the browser (max 1600px wide, WebP) so uploads stay small and fast. */
async function compressImage(file: File): Promise<File> {
  if (file.type === "image/gif" || !file.type.startsWith("image/")) {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 1600 / bitmap.width);
    const canvas = document.createElement("canvas");

    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.82));

    if (!blob || blob.size >= file.size) {
      return file;
    }

    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".webp", { type: "image/webp" });
  } catch {
    return file;
  }
}

async function upload(file: File): Promise<{ src?: string; error?: string }> {
  const body = new FormData();

  body.set("file", await compressImage(file));

  return uploadImageAction(body);
}

function ImagePicker({
  src,
  onChange,
  onError,
}: {
  src: string;
  onChange: (src: string) => void;
  onError: (message: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  async function handle(file: File | undefined) {
    if (!file) {
      return;
    }

    setBusy(true);
    const result = await upload(file);
    setBusy(false);

    if (input.current) {
      input.current.value = "";
    }

    if (result.src) {
      onChange(result.src);
    } else {
      onError(result.error ?? "Gagal mengunggah gambar.");
    }
  }

  return (
    <div className="grid gap-3">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element -- admin preview of a just-uploaded file
        <img src={src} alt="" className="aspect-[16/9] w-full max-w-md rounded-lg border border-white/10 object-cover" />
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/15 focus-within:ring-2 focus-within:ring-brand-cyan">
          {busy ? "Mengunggah..." : src ? "Ganti Gambar" : "Pilih Gambar"}
          <input
            ref={input}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="sr-only"
            disabled={busy}
            onChange={(event) => void handle(event.target.files?.[0])}
          />
        </label>
        {src ? (
          <button type="button" className={smallButton} onClick={() => onChange("")}>
            Hapus Gambar
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default function Editor({ article, knownCategories }: { article: Article | null; knownCategories: string[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [id, setId] = useState(article?.id);
  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(article));
  const [categories, setCategories] = useState<string[]>(article?.categories ?? []);
  const [newCategory, setNewCategory] = useState("");
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [coverSrc, setCoverSrc] = useState(article?.cover?.src ?? "");
  const [coverAlt, setCoverAlt] = useState(article?.cover?.alt ?? "");
  const [coverCaption, setCoverCaption] = useState(article?.cover?.caption ?? "");
  const [status, setStatus] = useState<"draft" | "published">(article?.status ?? "draft");
  const [blocks, setBlocks] = useState<Block[]>(article?.blocks ?? [emptyBlock("p")]);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  const error = (text: string) => setMessage({ kind: "error", text });

  function addCategory() {
    const name = newCategory.trim().slice(0, 40);

    if (name && !categories.some((item) => item.toLowerCase() === name.toLowerCase()) && categories.length < 5) {
      setCategories((current) => [...current, name]);
    }

    setNewCategory("");
  }

  function update(index: number, next: Block) {
    setBlocks((current) => current.map((block, i) => (i === index ? next : block)));
  }

  function move(index: number, delta: number) {
    setBlocks((current) => {
      const target = index + delta;

      if (target < 0 || target >= current.length) {
        return current;
      }

      const copy = [...current];

      [copy[index], copy[target]] = [copy[target], copy[index]];

      return copy;
    });
  }

  function save(nextStatus: "draft" | "published") {
    setMessage(null);

    startTransition(async () => {
      const result = await saveArticleAction(
        JSON.stringify({
          id,
          title,
          slug: slug || slugify(title),
          categories,
          excerpt,
          cover: coverSrc ? { src: coverSrc, alt: coverAlt, caption: coverCaption } : null,
          status: nextStatus,
          blocks,
        }),
      );

      if (result.error) {
        error(result.error);

        return;
      }

      setStatus(nextStatus);
      setMessage({ kind: "ok", text: result.ok ?? "Tersimpan." });

      if (result.id && !id) {
        setId(result.id);
        router.replace(`/admin/artikel/${result.id}`);
      }
    });
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin" className="text-sm font-bold text-slate-300 transition hover:text-brand-cyan">
          ← Semua Artikel
        </Link>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            status === "published" ? "bg-brand-lime/15 text-brand-lime" : "bg-amber-300/15 text-amber-200"
          }`}
        >
          {status === "published" ? "Terbit" : "Draf"}
        </span>
      </div>

      <h1 className="mt-4 text-3xl font-black text-white">{article ? "Edit artikel" : "Artikel baru"}</h1>

      <div className="mt-8 grid gap-6">
        <label className="grid gap-2 text-sm font-bold text-white">
          Judul
          <input
            className={inputClass}
            value={title}
            maxLength={160}
            onChange={(event) => {
              setTitle(event.target.value);

              if (!slugTouched) {
                setSlug(slugify(event.target.value));
              }
            }}
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-white">
          Alamat artikel (slug)
          <input
            className={inputClass}
            value={slug}
            maxLength={80}
            onChange={(event) => {
              setSlugTouched(true);
              setSlug(slugify(event.target.value));
            }}
          />
          <span className="text-xs font-normal text-slate-400">nocoding.web.id/artikel/{slug || "..."}</span>
        </label>

        <fieldset className="grid gap-3">
          <legend className="text-sm font-bold text-white">Kategori</legend>
          <p className="text-xs text-slate-400">Satu artikel boleh masuk ke lebih dari satu kategori (maksimal 5). Klik untuk memilih.</p>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set([...knownCategories, ...categories])).map((name) => {
              const selected = categories.includes(name);

              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={selected}
                  onClick={() =>
                    setCategories((current) =>
                      current.includes(name)
                        ? current.filter((item) => item !== name)
                        : current.length < 5
                          ? [...current, name]
                          : current,
                    )
                  }
                  className={`rounded-full border px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-brand-cyan ${
                    selected
                      ? "border-brand-cyan bg-brand-cyan text-brand-dark"
                      : "border-white/15 text-slate-300 hover:border-brand-cyan hover:text-brand-cyan"
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
          <div className="flex gap-2">
            <input
              className={inputClass}
              value={newCategory}
              maxLength={40}
              placeholder="Kategori baru, lalu tekan Enter"
              onChange={(event) => setNewCategory(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addCategory();
                }
              }}
            />
            <button type="button" className={`${smallButton} shrink-0 px-5`} onClick={addCategory}>
              Tambah
            </button>
          </div>
        </fieldset>

        <label className="grid gap-2 text-sm font-bold text-white">
          Ringkasan
          <textarea
            className={`${inputClass} min-h-24`}
            value={excerpt}
            maxLength={300}
            placeholder="1-2 kalimat yang muncul di kartu artikel dan hasil pencarian Google."
            onChange={(event) => setExcerpt(event.target.value)}
          />
          <span className="text-xs font-normal text-slate-400">{excerpt.length}/300</span>
        </label>

        <fieldset className="grid gap-3 rounded-xl border border-white/10 p-4">
          <legend className="px-2 text-sm font-bold text-white">Gambar sampul</legend>
          <ImagePicker src={coverSrc} onChange={setCoverSrc} onError={error} />
          {coverSrc ? (
            <label className="grid gap-2 text-sm font-bold text-white">
              Deskripsi gambar (untuk aksesibilitas)
              <input className={inputClass} value={coverAlt} maxLength={200} onChange={(event) => setCoverAlt(event.target.value)} />
            </label>
          ) : null}
          {coverSrc ? (
            <label className="grid gap-2 text-sm font-bold text-white">
              Keterangan di bawah gambar
              <input
                className={inputClass}
                value={coverCaption}
                maxLength={300}
                placeholder="Contoh: Rancangan yang ditinjau bersama di awal menghindari salah paham."
                onChange={(event) => setCoverCaption(event.target.value)}
              />
            </label>
          ) : null}
        </fieldset>

        <section aria-labelledby="blocks-title" className="grid gap-4">
          <div>
            <h2 id="blocks-title" className="text-lg font-black text-white">
              Isi artikel
            </h2>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              Tulis <code className="text-brand-cyan">**tebal**</code> untuk huruf tebal dan{" "}
              <code className="text-brand-cyan">[teks tautan](https://alamat.com)</code> untuk tautan.
            </p>
          </div>

          {blocks.map((block, index) => (
            <div key={block.id} className="grid gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase text-brand-cyan">{blockLabels[block.type]}</span>
                <div className="flex gap-2">
                  <button type="button" className={smallButton} disabled={index === 0} onClick={() => move(index, -1)} aria-label="Pindah ke atas">
                    ↑
                  </button>
                  <button
                    type="button"
                    className={smallButton}
                    disabled={index === blocks.length - 1}
                    onClick={() => move(index, 1)}
                    aria-label="Pindah ke bawah"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className={`${smallButton} hover:!border-red-400 hover:!text-red-300`}
                    onClick={() => setBlocks((current) => current.filter((_, i) => i !== index))}
                  >
                    Hapus
                  </button>
                </div>
              </div>

              {block.type === "h2" || block.type === "h3" ? (
                <input
                  className={inputClass}
                  value={block.text}
                  maxLength={200}
                  onChange={(event) => update(index, { ...block, text: event.target.value })}
                />
              ) : null}

              {block.type === "p" || block.type === "quote" ? (
                <textarea
                  className={`${inputClass} min-h-32 leading-7`}
                  value={block.text}
                  onChange={(event) => update(index, { ...block, text: event.target.value })}
                />
              ) : null}

              {block.type === "ul" || block.type === "ol" ? (
                <div className="grid gap-2">
                  <textarea
                    className={`${inputClass} min-h-32 leading-7`}
                    value={block.items.join("\n")}
                    placeholder="Satu poin per baris"
                    onChange={(event) => update(index, { ...block, items: event.target.value.split("\n") })}
                  />
                  <span className="text-xs text-slate-400">Satu poin per baris.</span>
                </div>
              ) : null}

              {block.type === "image" ? (
                <div className="grid gap-3">
                  <ImagePicker src={block.src} onChange={(src) => update(index, { ...block, src })} onError={error} />
                  {block.src ? (
                    <>
                      <input
                        className={inputClass}
                        value={block.alt}
                        maxLength={200}
                        placeholder="Deskripsi gambar"
                        onChange={(event) => update(index, { ...block, alt: event.target.value })}
                      />
                      <input
                        className={inputClass}
                        value={block.caption ?? ""}
                        maxLength={300}
                        placeholder="Keterangan di bawah gambar (kosong = pakai deskripsi gambar)"
                        onChange={(event) => update(index, { ...block, caption: event.target.value })}
                      />
                    </>
                  ) : null}
                </div>
              ) : null}

              {block.type === "cta" ? (
                <input
                  className={inputClass}
                  value={block.text ?? ""}
                  maxLength={200}
                  placeholder="Teks ajakan (kosongkan untuk teks bawaan)"
                  onChange={(event) => update(index, { ...block, text: event.target.value })}
                />
              ) : null}
            </div>
          ))}

          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-dashed border-white/15 p-4">
            <span className="mr-2 text-xs font-bold uppercase text-slate-400">Tambah</span>
            {addable.map((type) => (
              <button key={type} type="button" className={smallButton} onClick={() => setBlocks((current) => [...current, emptyBlock(type)])}>
                + {blockLabels[type]}
              </button>
            ))}
          </div>
        </section>

        {message ? (
          <p
            role={message.kind === "error" ? "alert" : "status"}
            className={`rounded-lg border p-4 text-sm font-semibold ${
              message.kind === "error"
                ? "border-red-400/40 bg-red-400/10 text-red-200"
                : "border-brand-lime/40 bg-brand-lime/10 text-brand-lime"
            }`}
          >
            {message.text}
          </p>
        ) : null}

        <div className="sticky bottom-0 -mx-6 flex flex-wrap items-center gap-3 border-t border-white/10 bg-brand-dark/95 px-6 py-4 backdrop-blur">
          <button
            type="button"
            disabled={pending}
            onClick={() => save("published")}
            className="min-h-12 rounded-full bg-brand-cyan px-7 text-sm font-black text-brand-dark transition hover:bg-brand-lime focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2 focus:ring-offset-brand-dark disabled:opacity-60"
          >
            {pending ? "Menyimpan..." : status === "published" ? "Simpan Perubahan" : "Terbitkan"}
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => save("draft")}
            className="min-h-12 rounded-full border border-white/20 px-6 text-sm font-bold text-white transition hover:border-brand-cyan hover:text-brand-cyan disabled:opacity-60"
          >
            {status === "published" ? "Jadikan Draf" : "Simpan Draf"}
          </button>
          {status === "published" && slug ? (
            <Link href={`/artikel/${slug}`} target="_blank" className="text-sm font-bold text-brand-cyan hover:text-brand-lime">
              Lihat Artikel →
            </Link>
          ) : null}
        </div>
      </div>
    </main>
  );
}
