"use client";

import { useEffect, useState } from "react";
import CenteredScrollLink from "./centered-scroll-link";
import { LocalizedText } from "./i18n";

type NavLink = {
  href: string;
  label: string;
  textId: string;
};

export default function MobileNavbarMenu({ links }: { links: NavLink[] }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-controls="mobile-navbar-menu"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
        onClick={() => setIsOpen((current) => !current)}
        className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white transition hover:border-brand-cyan hover:text-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2 focus:ring-offset-brand-dark"
      >
        <span className="relative h-4 w-5" aria-hidden="true">
          <span
            className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition ${
              isOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition ${
              isOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {isOpen ? (
        <div
          id="mobile-navbar-menu"
          className="absolute left-6 right-6 top-[calc(100%+0.75rem)] rounded-lg border border-white/10 bg-brand-night/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl"
        >
          <div className="grid gap-1">
            {links.map((link) => (
              <CenteredScrollLink
                key={link.href}
                href={link.href}
                activeClassName="mobile-nav-link--active"
                scrollBlock="start"
                onNavigate={() => setIsOpen(false)}
                className="mobile-nav-link flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-bold text-slate-300 transition hover:bg-white/[0.04] hover:text-white"
              >
                <span className="mobile-nav-link__dot" aria-hidden="true" />
                <span>
                  <LocalizedText id={link.textId}>{link.label}</LocalizedText>
                </span>
              </CenteredScrollLink>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
