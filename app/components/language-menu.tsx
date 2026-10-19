"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { siteLanguages } from "../../lib/language-names";
import { languageDecidedKey, setLanguage, useLanguage, useLocalizedText } from "./i18n";
import LanguageFlag from "./language-flag";
import { captureAnchor, holdAnchor } from "./scroll-anchor";

/** Dropdown with every language the site is written in, styled like the site's own menus. */
export default function LanguageMenu({ onClose }: { onClose: () => void }) {
  const language = useLanguage();
  const placeholder = useLocalizedText("language.search", "Cari bahasa...");
  const empty = useLocalizedText("language.none", "Tidak ditemukan.");
  const title = useLocalizedText("aria.language", "Pilih bahasa");
  const [query, setQuery] = useState("");
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (panel.current && !panel.current.parentElement?.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [onClose]);

  const items = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return needle
      ? siteLanguages.filter((item) => [item.name, item.english, item.code].some((value) => value.toLowerCase().includes(needle)))
      : siteLanguages;
  }, [query]);

  function choose(code: string) {
    onClose();

    if (code === language) {
      return;
    }

    // The reader stays on the same text while the page changes language.
    const anchor = captureAnchor();

    window.localStorage.setItem(languageDecidedKey, "1");
    setLanguage(code);
    holdAnchor(anchor, 3000);
  }

  return (
    <div
      ref={panel}
      id="language-menu"
      translate="no"
      role="dialog"
      aria-label={title}
      className="absolute inset-x-3 top-[calc(100%+0.5rem)] z-50 rounded-lg sm:inset-x-auto sm:end-0 sm:top-[calc(100%+0.75rem)] sm:w-72 border border-white/10 bg-brand-night/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl"
    >
      <input
        type="search"
        value={query}
        autoFocus
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="mb-2 min-h-11 w-full rounded-md border border-white/10 bg-white/[0.03] px-3 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/40"
      />
      <ul className="language-menu__list grid max-h-72 gap-1 overflow-y-auto">
        {items.map(({ code, name }) => (
          <li key={code}>
            <button
              type="button"
              onClick={() => choose(code)}
              aria-current={language === code ? "true" : undefined}
              lang={code}
              className={`flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-start text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan ${
                language === code ? "mobile-nav-link--active" : "text-slate-300 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <LanguageFlag code={code} />
              <span className="truncate">{name}</span>
            </button>
          </li>
        ))}
        {items.length === 0 ? <li className="px-3 py-3 text-sm text-slate-400">{empty}</li> : null}
      </ul>
    </div>
  );
}
