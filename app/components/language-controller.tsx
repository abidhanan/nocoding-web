"use client";

import { useEffect } from "react";
import { lookupText, useI18nVersion } from "./i18n";

function translateElement(element: HTMLElement, language: string) {
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

  element.textContent = lookupText(id, language) ?? element.dataset.i18nOriginal;
}

const ATTRIBUTES: Array<[string, string]> = [
  ["i18nAria", "aria-label"],
  ["i18nTitle", "title"],
  ["i18nPlaceholder", "placeholder"],
];

function translateAttributes(element: HTMLElement, language: string) {
  for (const [dataKey, attribute] of ATTRIBUTES) {
    const id = element.dataset[dataKey];

    if (!id) {
      continue;
    }

    const originalKey = `${dataKey}Original`;

    element.dataset[originalKey] ??= element.getAttribute(attribute) ?? "";
    element.setAttribute(attribute, lookupText(id, language) ?? (element.dataset[originalKey] as string));
  }

  // WhatsApp links carry a ready-made message; it is written in the visitor's language too.
  const message = element.dataset.i18nWa;

  if (message) {
    element.dataset.i18nWaOriginal ??= element.getAttribute("href") ?? "";

    const original = element.dataset.i18nWaOriginal;
    const translated = lookupText(message, language);

    element.setAttribute("href", translated ? original.replace(/([?&]text=)[^&]*/, `$1${encodeURIComponent(translated)}`) : original);
  }
}

const SELECTOR = "[data-i18n], [data-i18n-aria], [data-i18n-title], [data-i18n-placeholder], [data-i18n-wa]";

function translateTree(root: ParentNode, language: string) {
  root.querySelectorAll<HTMLElement>(SELECTOR).forEach((element) => {
    translateElement(element, language);
    translateAttributes(element, language);
  });
}

/**
 * Applies the selected language by swapping the text of every element the server rendered in
 * Indonesian (marked with data-i18n). A single controller does it for the whole page, which keeps
 * hydration cheap; text inserted later (project cards, article lists) is picked up as it appears.
 */
export default function LanguageController() {
  const { language, version } = useI18nVersion();

  useEffect(() => {
    translateTree(document, language);

    // In Indonesian, freshly mounted nodes already render the right copy, so no observer is needed.
    if (language === "id") {
      return undefined;
    }

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof HTMLElement)) {
            continue;
          }

          if (node.matches(SELECTOR)) {
            translateElement(node, language);
            translateAttributes(node, language);
          }

          translateTree(node, language);
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [language, version]);

  return null;
}
