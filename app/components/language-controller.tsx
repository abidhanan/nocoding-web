"use client";

import { useEffect } from "react";
import { englishText, useLanguage, type Language } from "./i18n";

function translateElement(element: HTMLElement, language: Language) {
  const id = element.dataset.i18n;

  if (!id) {
    return;
  }

  if (element.dataset.i18nOriginal === undefined) {
    // Still showing the server-rendered Indonesian copy: leave the DOM untouched
    // so the initial paint (and LCP element) is not replaced after hydration.
    if (language === "id") {
      return;
    }

    element.dataset.i18nOriginal = element.textContent ?? "";
  }

  element.textContent =
    language === "en"
      ? englishText[id] ?? element.dataset.i18nOriginal
      : element.dataset.i18nOriginal;
}

/**
 * Applies the selected language by swapping the text of every `[data-i18n]`
 * element that the server rendered in Indonesian. A single controller replaces
 * ~120 per-string client components, keeping hydration cost minimal.
 */
export default function LanguageController() {
  const language = useLanguage();

  useEffect(() => {
    document
      .querySelectorAll<HTMLElement>("[data-i18n]")
      .forEach((element) => translateElement(element, language));

    document.documentElement.setAttribute("lang", language);

    // In Indonesian, freshly mounted nodes (e.g. the project overlay) already
    // render the correct copy, so no observer is needed.
    if (language === "id") {
      return undefined;
    }

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof HTMLElement)) {
            continue;
          }

          if (node.matches("[data-i18n]")) {
            translateElement(node, language);
          }

          node
            .querySelectorAll<HTMLElement>("[data-i18n]")
            .forEach((element) => translateElement(element, language));
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [language]);

  return null;
}
