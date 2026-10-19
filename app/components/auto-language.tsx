"use client";

import { useEffect } from "react";
import { languageForBrowserTag } from "../../lib/languages";
import { languageDecidedKey, setLanguage } from "./i18n";
import { captureAnchor, holdAnchor } from "./scroll-anchor";

// Real input only. "scroll" is left out on purpose: browsers fire it by themselves (restoring a scroll
// position, resizing), and speed tests would then be switched to another language.
const INTERACTION_EVENTS = ["pointerdown", "keydown", "touchstart", "wheel"] as const;
const BOT = /bot|crawl|spider|slurp|lighthouse|pagespeed|headless|gtmetrix|pingdom|prerender|facebookexternalhit|bingpreview|inspectiontool/i;

/** First browser language the site is written in; English when none match; null when it is Indonesian. */
function detectLanguage() {
  const tags = [...navigator.languages, navigator.language].filter(Boolean);

  for (const tag of tags) {
    const code = languageForBrowserTag(tag);

    if (code) {
      return code === "id" ? null : code;
    }
  }

  return tags.length > 0 ? "en" : null;
}

/**
 * On a visitor's first visit, switches the site to the language of their browser once they start
 * using the page (first click, tap, key press or scroll wheel). It never overrides a language they
 * picked, and it leaves search engines and speed tests alone so they always read the Indonesian page.
 */
export default function AutoLanguage() {
  useEffect(() => {
    if (window.localStorage.getItem(languageDecidedKey) || BOT.test(navigator.userAgent) || navigator.webdriver) {
      return undefined;
    }

    let done = false;

    const detect = (event: Event) => {
      if (done || !event.isTrusted) {
        return;
      }

      done = true;
      INTERACTION_EVENTS.forEach((name) => window.removeEventListener(name, detect));
      window.localStorage.setItem(languageDecidedKey, "1");

      const code = detectLanguage();

      if (code) {
        const anchor = captureAnchor();

        setLanguage(code);
        holdAnchor(anchor, 3000);
      }
    };

    INTERACTION_EVENTS.forEach((name) => window.addEventListener(name, detect, { passive: true }));

    return () => {
      INTERACTION_EVENTS.forEach((name) => window.removeEventListener(name, detect));
    };
  }, []);

  return null;
}
