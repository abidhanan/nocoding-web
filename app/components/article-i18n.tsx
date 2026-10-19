"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useSyncExternalStore, type ReactNode } from "react";
import { formatDate } from "../../lib/articles/format";
import type { Block } from "../../lib/articles/types";
import ArticleBody from "./article-body";
import { useLanguage, useLocalizedTemplate, useLocalizedText } from "./i18n";

// ---------- article texts in every language (static files, fetched when a language is chosen) ----------

/** One article in one language: title, summary, [photo description, photo caption], and the body texts. */
type ArticleCopy = { t: string; e: string; c: [string, string]; b: Array<string | string[]> };

const copies: Record<string, Record<string, ArticleCopy>> = {};
const requested = new Set<string>();
const listeners = new Set<() => void>();
let version = 0;

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function loadArticles(code: string) {
  if (code === "id" || copies[code] || requested.has(code)) {
    return;
  }

  requested.add(code);

  fetch(`/i18n/art-${code}.json`)
    .then((response) => (response.ok ? (response.json() as Promise<Record<string, ArticleCopy>>) : null))
    .then((data) => {
      if (data) {
        copies[code] = data;
        version += 1;
        listeners.forEach((listener) => listener());
      } else {
        requested.delete(code);
      }
    })
    .catch(() => requested.delete(code));
}

/** The article in the visitor's language (English where a translation is missing); undefined in Indonesian. */
export function useArticleCopy(id: string): ArticleCopy | undefined {
  const language = useLanguage();

  useEffect(() => {
    if (language !== "id") {
      loadArticles(language);
      loadArticles("en");
    }
  }, [language]);

  useSyncExternalStore(
    subscribe,
    () => version,
    () => 0,
  );

  return language === "id" ? undefined : copies[language]?.[id] ?? copies.en?.[id];
}

/** An article's title or summary in the visitor's language (the Indonesian text is the server-rendered default). */
export function ArticleText({ id, field, children }: { id: string; field: "title" | "excerpt"; children: ReactNode }) {
  const copy = useArticleCopy(id);

  return <>{(field === "title" ? copy?.t : copy?.e) ?? children}</>;
}

/** Category name in the visitor's language. */
export function CategoryName({ name }: { name: string }) {
  return <>{useLocalizedText(`category.${name}`, name)}</>;
}

export function ArticleDate({ iso }: { iso: string }) {
  const language = useLanguage();
  let text = formatDate(iso);

  if (language !== "id") {
    try {
      text = new Intl.DateTimeFormat(language, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
    } catch {
      text = formatDate(iso, "en");
    }
  }

  return <time dateTime={iso}>{text}</time>;
}

// ---------- the article page ----------

export type BlockSkeleton = Block[];

/** Fills the skeleton with translated words. Returns null if the translation does not fit the article. */
function mergeBlocks(skeleton: BlockSkeleton, texts: Array<string | string[]>): Block[] | null {
  if (texts.length !== skeleton.length) {
    return null;
  }

  const merged: Block[] = [];

  for (let index = 0; index < skeleton.length; index += 1) {
    const block = skeleton[index];
    const text = texts[index];

    if (block.type === "ul" || block.type === "ol") {
      if (!Array.isArray(text) || text.length !== block.items.length) {
        return null;
      }

      merged.push({ ...block, items: text });
    } else if (block.type === "image") {
      if (!Array.isArray(text)) {
        return null;
      }

      merged.push({ ...block, alt: text[0] ?? "", caption: text[1] || undefined });
    } else {
      if (typeof text !== "string") {
        return null;
      }

      if (block.type === "cta") {
        merged.push({ ...block, text });
      } else if (block.type === "h2" || block.type === "h3" || block.type === "p" || block.type === "quote") {
        merged.push({ ...block, text });
      }
    }
  }

  return merged;
}

type Translation = { copy: ArticleCopy; blocks: Block[]; ctaText?: string } | null;

const TranslationContext = createContext<Translation>(null);

/** Gives the open article's title, summary, captions, call-to-action and body in the visitor's language. */
export function ArticleTranslationProvider({ id, skeleton, children }: { id: string; skeleton: BlockSkeleton; children: ReactNode }) {
  const copy = useArticleCopy(id);
  const originalTitle = useRef<string | null>(null);

  const translation = useMemo<Translation>(() => {
    if (!copy) {
      return null;
    }

    const blocks = mergeBlocks(skeleton, copy.b);

    if (!blocks) {
      return null;
    }

    const cta = blocks.find((block) => block.type === "cta");

    return { copy, blocks, ctaText: cta?.type === "cta" ? cta.text : undefined };
  }, [copy, skeleton]);

  useEffect(() => {
    originalTitle.current ??= document.title;

    document.title = translation ? `${translation.copy.t} - Nocoding` : originalTitle.current;
  }, [translation]);

  return <TranslationContext.Provider value={translation}>{children}</TranslationContext.Provider>;
}

/** A piece of the open article (title, summary, photo caption or call-to-action) in the visitor's language. */
export function Tr({ field, children }: { field: "title" | "excerpt" | "caption" | "cta"; children: ReactNode }) {
  const translation = useContext(TranslationContext);
  let translated: string | undefined;

  if (translation) {
    if (field === "title") {
      translated = translation.copy.t;
    } else if (field === "excerpt") {
      translated = translation.copy.e;
    } else if (field === "caption") {
      translated = translation.copy.c[1];
    } else {
      translated = translation.ctaText;
    }
  }

  return <>{translated ?? children}</>;
}

/** The article body: the server-rendered Indonesian text, or the translated blocks once they have loaded. */
export function TranslatedBody({ children }: { children: ReactNode }) {
  const translation = useContext(TranslationContext);

  return translation ? <ArticleBody blocks={translation.blocks} /> : <>{children}</>;
}

/** "5 min read" in the visitor's language. */
export function ReadTime({ minutes }: { minutes: number }) {
  return <>{useLocalizedTemplate("articles.readTime", "{n} menit baca", { n: String(minutes) })}</>;
}

/**
 * "Table of contents" above a long article: jump links to its sections, in the visitor's language.
 * The Indonesian list is rendered on the server (search engines show these links under a result).
 */
export function ArticleToc({ items }: { items: Array<{ id: string; text: string }> }) {
  const translation = useContext(TranslationContext);
  const label = useLocalizedText("articles.toc", "Daftar isi");
  const headings = translation
    ? translation.blocks.filter((block) => block.type === "h2").map((block) => ({ id: block.id, text: block.type === "h2" ? block.text : "" }))
    : items;

  return (
    <nav aria-label={label} className="mt-10 rounded-xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-sm font-black uppercase text-brand-cyan">{label}</p>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-slate-300 marker:font-bold marker:text-brand-cyan">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#s-${heading.id}`}
              className="transition hover:text-brand-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
            >
              {heading.text.replace(/\*\*/g, "")}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
