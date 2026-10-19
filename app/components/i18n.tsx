"use client";

import { useSyncExternalStore } from "react";
import { isRtlLanguage, isSiteLanguage } from "../../lib/languages";

/** Language code of a site language ("id" is the page as written; the rest are translations). */
export type Language = string;

const storageKey = "nocoding-language";
/** Set once the language has been decided (picked by the visitor, or detected on the first visit). */
export const languageDecidedKey = "nocoding-language-set";

type Dictionary = Record<string, string>;

const dictionaries: Record<string, Dictionary> = {};
const requested = new Set<string>();

type State = { language: Language; version: number };

const serverState: State = { language: "id", version: 0 };
let state: State = serverState;
let initialized = false;
const subscribers = new Set<() => void>();

function emit(next: State) {
  state = next;
  subscribers.forEach((callback) => callback());
}

/** Downloads the interface texts of a language (a small static file) the first time it is needed. */
function loadDictionary(code: string) {
  if (code === "id" || dictionaries[code] || requested.has(code)) {
    return;
  }

  requested.add(code);

  fetch(`/i18n/ui-${code}.json`)
    .then((response) => (response.ok ? (response.json() as Promise<Dictionary>) : null))
    .then((data) => {
      if (data) {
        dictionaries[code] = data;
        emit({ ...state, version: state.version + 1 });
      } else {
        requested.delete(code);
      }
    })
    .catch(() => requested.delete(code));
}

/** Languages other than Indonesian fall back to English for any text they do not have yet. */
export function prepareLanguage(code: string) {
  if (code === "id") {
    return;
  }

  loadDictionary(code);

  if (code !== "en") {
    loadDictionary("en");
  }
}

export function lookupText(id: string, language: Language): string | undefined {
  if (language === "id") {
    return undefined;
  }

  return dictionaries[language]?.[id] ?? dictionaries.en?.[id];
}

function applyLanguage(language: Language) {
  document.documentElement.setAttribute("lang", language);
  document.documentElement.setAttribute("dir", isRtlLanguage(language) ? "rtl" : "ltr");
  // Longer words and right-to-left scripts need more room in the navbar.
  document.documentElement.setAttribute("data-nav", language === "id" || language === "en" ? "wide" : "compact");
  window.localStorage.setItem(storageKey, language);
  prepareLanguage(language);
}

function initializeLanguage() {
  if (initialized || typeof window === "undefined") {
    return;
  }

  initialized = true;
  const saved = window.localStorage.getItem(storageKey);

  if (isSiteLanguage(saved) && saved !== "id") {
    state = { ...state, language: saved };
  }

  applyLanguage(state.language);
}

function subscribe(callback: () => void) {
  subscribers.add(callback);
  const before = state;

  initializeLanguage();

  if (before !== state) {
    queueMicrotask(() => subscribers.forEach((subscriber) => subscriber()));
  }

  return () => {
    subscribers.delete(callback);
  };
}

export function setLanguage(language: Language) {
  if (!isSiteLanguage(language) || language === state.language) {
    return;
  }

  applyLanguage(language);
  emit({ ...state, language });
}

function useI18nState() {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => serverState,
  );
}

export function useLanguage() {
  return useI18nState().language;
}

export function getLocalizedText(id: string, fallback: string, language: Language) {
  return lookupText(id, language) ?? fallback;
}

/** An interface text in the current language, with the Indonesian text as the default. */
export function useLocalizedText(id: string, fallback: string) {
  const { language } = useI18nState();

  return getLocalizedText(id, fallback, language);
}

/** Same, with {placeholders} filled in. */
export function useLocalizedTemplate(id: string, fallback: string, values: Record<string, string>) {
  const text = useLocalizedText(id, fallback);

  return text.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

/** The current language together with a counter that goes up whenever a dictionary finishes loading. */
export function useI18nVersion() {
  return useI18nState();
}
