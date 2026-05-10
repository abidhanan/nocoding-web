"use client";

import { setLanguage, useLanguage, type Language } from "./i18n";

const languages = [
  { code: "id", label: "ID", title: "Bahasa Indonesia" },
  { code: "en", label: "EN", title: "English" },
] satisfies Array<{
  code: Language;
  label: string;
  title: string;
}>;

export default function LanguageToggle() {
  const language = useLanguage();

  return (
    <div
      aria-label="Pilih bahasa"
      className="flex h-10 items-center rounded-full border border-white/10 bg-white/[0.03] p-1 text-[0.68rem] font-black text-slate-400"
      role="group"
    >
      {languages.map((item) => (
        <button
          key={item.code}
          type="button"
          aria-pressed={language === item.code}
          title={item.title}
          onClick={() => setLanguage(item.code)}
          className={`h-8 rounded-full px-3 transition focus:outline-none focus:ring-2 focus:ring-brand-cyan ${
            language === item.code
              ? "bg-brand-cyan text-brand-dark"
              : "text-slate-400 hover:text-white"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
