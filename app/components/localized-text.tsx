import type { ReactNode } from "react";

/**
 * Renders the default (Indonesian) copy on the server as plain markup — no client
 * component boundary, so it does not add to hydration/JS execution cost. The
 * `data-i18n` attribute lets the single client-side `LanguageController` swap the
 * text when the visitor selects English. The span is layout-transparent through
 * the `[data-i18n] { display: contents }` rule in globals.css (kept out of the
 * markup so the class is not repeated ~120 times in the HTML).
 */
export function LocalizedText({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  return (
    <span data-i18n={id}>
      {children}
    </span>
  );
}
