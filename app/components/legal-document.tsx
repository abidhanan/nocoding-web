"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import DocumentTitle from "./document-title";
import { useLanguage } from "./i18n";
import type { LegalDoc } from "./legal-content";
import { LocalizedText } from "./localized-text";

// ---------- the legal pages in every language (static files, fetched when a language is chosen) ----------

type LegalCopy = {
  updatedLabel: string;
  docs: Record<string, { name: string; description: string; sections: Array<{ t: string; b: string[] }> }>;
};

const copies: Record<string, LegalCopy> = {};
const requested = new Set<string>();
const listeners = new Set<() => void>();
let version = 0;

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function loadLegal(code: string) {
  if (code === "id" || copies[code] || requested.has(code)) {
    return;
  }

  requested.add(code);

  fetch(`/i18n/legal-${code}.json`)
    .then((response) => (response.ok ? (response.json() as Promise<LegalCopy>) : null))
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

/** The translated legal pages for the visitor's language (English where missing); undefined in Indonesian. */
function useLegalCopy(): LegalCopy | undefined {
  const language = useLanguage();

  useEffect(() => {
    if (language !== "id") {
      loadLegal(language);
      loadLegal("en");
    }
  }, [language]);

  useSyncExternalStore(
    subscribe,
    () => version,
    () => 0,
  );

  return language === "id" ? undefined : (copies[language] ?? copies.en);
}

// ---------- the page ----------

/** Paragraphs and "- " list items, justified like the articles. */
function renderBody(lines: string[]) {
  const nodes: ReactNode[] = [];
  let items: string[] = [];

  const flush = () => {
    if (items.length > 0) {
      nodes.push(
        <ul key={`list-${nodes.length}`} className="mb-5 list-disc space-y-2 pl-6 leading-7 marker:text-brand-cyan">
          {items.map((item) => (
            <li key={item} className="text-justify">
              {item}
            </li>
          ))}
        </ul>,
      );
      items = [];
    }
  };

  lines.forEach((line) => {
    if (line.startsWith("- ")) {
      items.push(line.slice(2));
    } else {
      flush();
      nodes.push(
        <p key={`p-${nodes.length}`} className="mb-5 text-justify leading-7">
          {line}
        </p>,
      );
    }
  });
  flush();

  return nodes;
}

function formatDate(iso: string, language: string) {
  try {
    return new Intl.DateTimeFormat(language === "id" ? "id-ID" : language, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
  } catch {
    return new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
  }
}

export default function LegalDocument({ doc }: { doc: LegalDoc }) {
  const language = useLanguage();
  const copy = useLegalCopy();

  // Indonesian is the page as written; other languages use their file, English while it loads.
  const translated = copy?.docs[doc.slug];
  const name = language === "id" ? doc.name.id : (translated?.name ?? doc.name.en);
  const description = language === "id" ? doc.description.id : (translated?.description ?? doc.description.en);
  const sections =
    language === "id"
      ? doc.sections.map((section) => ({ t: section.title.id, b: section.body.id }))
      : (translated?.sections ?? doc.sections.map((section) => ({ t: section.title.en, b: section.body.en })));
  const updatedLabel = language === "id" ? "Terakhir diperbarui" : (copy?.updatedLabel ?? "Last updated");

  return (
    <main id="konten" className="min-h-screen">
      <DocumentTitle id={doc.nameKey} fallback={doc.name.id} />
      <div className="px-6 pb-16 pt-28 sm:pt-32">
        <article className="mx-auto w-full max-w-[21.5rem] sm:max-w-3xl">
          <nav aria-label="Breadcrumb" data-i18n-aria="aria.breadcrumb" className="text-sm text-slate-400">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li>
                <Link prefetch={false} href="/" className="transition hover:text-brand-cyan">
                  <LocalizedText id="nav.home">Beranda</LocalizedText>
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-brand-cyan">
                {name}
              </li>
            </ol>
          </nav>

          <h1 className="mt-6 text-3xl font-black leading-tight text-white sm:text-5xl">{name}</h1>
          <p className="mt-4 text-justify text-lg leading-8 text-slate-300">{description}</p>
          <p className="mt-4 text-sm text-slate-400">
            {updatedLabel}: <time dateTime={doc.updated}>{formatDate(doc.updated, language)}</time>
          </p>

          <div className="mt-10 text-slate-300">
            {sections.map((section, index) => (
              <section key={doc.sections[index]?.title.id ?? index} className="mb-9">
                <h2 className="mb-3 text-xl font-black leading-snug text-white sm:text-2xl">{section.t}</h2>
                {renderBody(section.b)}
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
