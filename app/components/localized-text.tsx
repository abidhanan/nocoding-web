import type { ReactNode } from "react";

/**
 * Renders the default (Indonesian) copy on the server as plain markup — no client
 * component boundary, so it does not add to hydration/JS execution cost. The
 * `data-i18n` attribute lets the single client-side `LanguageController` swap the
 * text when the visitor selects English. `display: contents` (the `contents`
 * utility) keeps the span layout-transparent, matching the previous fragment.
 */
export function LocalizedText({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  return (
    <span data-i18n={id} className="contents">
      {children}
    </span>
  );
}
