"use client";

import { deleteArticleAction } from "./actions";

export default function DeleteButton({ id, title }: { id: string; title: string }) {
  return (
    <form
      action={deleteArticleAction}
      onSubmit={(event) => {
        if (!window.confirm(`Hapus artikel "${title}"? Tindakan ini tidak bisa dibatalkan.`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-full border border-red-400/40 px-4 py-2 text-xs font-bold text-red-300 transition hover:bg-red-400/10 focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        Hapus
      </button>
    </form>
  );
}
