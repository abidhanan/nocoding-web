"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { adminConfigured, endSession, passwordMatches, requireAdmin, startSession } from "../../lib/articles/auth";
import {
  removeArticle,
  saveArticle,
  saveImage,
  sanitizeBlocks,
  sanitizeCategories,
  sanitizeCover,
} from "../../lib/articles/store";
import { slugify } from "../../lib/articles/format";

export type ActionState = { error?: string; ok?: string };

function refreshPublicPages() {
  revalidateTag("articles", { expire: 0 });
  revalidatePath("/", "page");
  revalidatePath("/artikel", "layout");
  revalidatePath("/sitemap.xml");
}

export async function loginAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  if (!adminConfigured()) {
    return { error: "Panel admin belum dikonfigurasi di server." };
  }

  const password = String(formData.get("password") ?? "");

  if (!passwordMatches(password)) {
    // Slow down guessing.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return { error: "Kata sandi salah." };
  }

  await startSession();
  redirect("/admin");
}

export async function logoutAction() {
  await endSession();
  redirect("/admin");
}

export async function saveArticleAction(payload: string): Promise<ActionState & { id?: string }> {
  await requireAdmin();

  let data: Record<string, unknown>;

  try {
    data = JSON.parse(payload) as Record<string, unknown>;
  } catch {
    return { error: "Data artikel tidak valid." };
  }

  const title = typeof data.title === "string" ? data.title.trim().slice(0, 160) : "";

  if (!title) {
    return { error: "Judul wajib diisi." };
  }

  const excerpt = typeof data.excerpt === "string" ? data.excerpt.trim().slice(0, 300) : "";
  const categories = sanitizeCategories(data.categories);
  const status = data.status === "published" ? "published" : "draft";
  const blocks = sanitizeBlocks(data.blocks);

  if (status === "published" && (!excerpt || blocks.length === 0)) {
    return { error: "Untuk menerbitkan, ringkasan dan isi artikel wajib diisi. Simpan sebagai draf jika belum selesai." };
  }

  try {
    const saved = await saveArticle({
      id: typeof data.id === "string" && data.id ? data.id : undefined,
      slug: typeof data.slug === "string" ? slugify(data.slug) : "",
      title,
      excerpt,
      categories,
      cover: sanitizeCover(data.cover),
      status,
      blocks,
    });

    refreshPublicPages();

    return { ok: status === "published" ? "Artikel diterbitkan." : "Draf disimpan.", id: saved.id };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Gagal menyimpan artikel." };
  }
}

export async function deleteArticleAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");

  if (id) {
    await removeArticle(id);
    refreshPublicPages();
  }

  redirect("/admin");
}

export async function uploadImageAction(formData: FormData): Promise<{ src?: string; error?: string }> {
  await requireAdmin();

  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return { error: "Pilih gambar terlebih dahulu." };
  }

  try {
    return { src: await saveImage(file) };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Gagal mengunggah gambar." };
  }
}
