import type { Block } from "./types";

const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

/** "14 Oktober 2026" (always in Indonesian, independent of the server locale). */
export function formatDate(iso: string) {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return `${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

function blockText(block: Block): string {
  switch (block.type) {
    case "ul":
    case "ol":
      return block.items.join(" ");
    case "image":
      return block.caption ?? "";
    case "cta":
      return block.text ?? "";
    default:
      return block.text;
  }
}

export function readingMinutes(blocks: Block[]) {
  const words = blocks.map(blockText).join(" ").split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.round(words / 200));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function newId() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}
