"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useLanguage, useLocalizedText } from "./i18n";
import LanguageFlag from "./language-flag";

// The list of languages is only downloaded when the menu is first opened.
const LanguageMenu = dynamic(() => import("./language-menu"), { ssr: false });

/** One button showing the flag of the current language; it opens the list of languages. */
export default function LanguageToggle() {
  const language = useLanguage();
  const label = useLocalizedText("aria.language", "Pilih bahasa");
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:relative">
      <button
        type="button"
        aria-label={label}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="language-menu"
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 text-slate-300 transition hover:border-brand-cyan hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan"
      >
        <LanguageFlag code={language} />
        <svg
          aria-hidden="true"
          className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open ? <LanguageMenu onClose={() => setOpen(false)} /> : null}
    </div>
  );
}
