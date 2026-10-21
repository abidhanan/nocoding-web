"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import DocumentTitle from "./document-title";
import { useLanguage } from "./i18n";
import type { LegalDoc } from "./legal-content";
import { LocalizedText } from "./localized-text";

/** Renders a legal page: Indonesian when the site is in Indonesian, English for every other language. */
function renderBody(lines: string[]) {
  const nodes: ReactNode[] = [];
  let items: string[] = [];

  const flush = () => {
    if (items.length > 0) {
      nodes.push(
        <ul key={`list-${nodes.length}`} className="mb-5 list-disc space-y-2 pl-6 leading-7 marker:text-brand-cyan">
          {items.map((item) => (
            <li key={item}>{item}</li>
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
        <p key={`p-${nodes.length}`} className="mb-5 leading-7">
          {line}
        </p>,
      );
    }
  });
  flush();

  return nodes;
}

export default function LegalDocument({ doc }: { doc: LegalDoc }) {
  const language = useLanguage();
  const text = language === "id" ? "id" : "en";
  const updated = new Intl.DateTimeFormat(language === "id" ? "id-ID" : "en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(doc.updated));

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
                {doc.name[text]}
              </li>
            </ol>
          </nav>

          <h1 className="mt-6 text-3xl font-black leading-tight text-white sm:text-5xl">{doc.name[text]}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">{doc.description[text]}</p>
          <p className="mt-4 text-sm text-slate-400">
            {text === "id" ? "Terakhir diperbarui" : "Last updated"}: <time dateTime={doc.updated}>{updated}</time>
          </p>
          {language !== "id" && language !== "en" ? (
            <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">
              This legal page is shown in English. If the languages differ in meaning, the Indonesian version applies.
            </p>
          ) : null}

          <div className="mt-10 text-slate-300">
            {doc.sections.map((section) => (
              <section key={section.title.id} className="mb-9">
                <h2 className="mb-3 text-xl font-black leading-snug text-white sm:text-2xl">{section.title[text]}</h2>
                {renderBody(section.body[text])}
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
