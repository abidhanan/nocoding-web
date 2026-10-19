"use client";

import { useEffect } from "react";

// Visitors who do nothing at all are still counted, just after this long.
const FALLBACK_MS = 20_000;
const INTERACTION_EVENTS = ["pointerdown", "keydown", "scroll", "touchstart", "wheel"] as const;

function addScript(src: string) {
  const script = document.createElement("script");

  script.src = src;
  script.async = true;
  document.head.appendChild(script);
}

/**
 * Loads Google Analytics 4 and Microsoft Clarity only once the visitor first interacts with the
 * page (scroll, tap, key press), or after a while if they do not. The two scripts are heavy, and
 * keeping them out of the initial load keeps the page fast.
 */
export default function AnalyticsLoader({ gaId, clarityId }: { gaId?: string; clarityId?: string }) {
  useEffect(() => {
    let started = false;
    let timer = 0;

    const start = () => {
      if (started) {
        return;
      }

      started = true;
      window.clearTimeout(timer);
      INTERACTION_EVENTS.forEach((name) => window.removeEventListener(name, start));

      if (gaId) {
        const w = window as unknown as { dataLayer: unknown[] };

        w.dataLayer = w.dataLayer || [];
        // gtag() has to push the `arguments` object itself, not an array.
        const gtag = function gtag(...args: unknown[]) {
          void args;
          // eslint-disable-next-line prefer-rest-params
          w.dataLayer.push(arguments);
        };

        gtag("js", new Date());
        gtag("config", gaId);
        addScript(`https://www.googletagmanager.com/gtag/js?id=${gaId}`);
      }

      if (clarityId) {
        const w = window as unknown as { clarity?: { (...args: unknown[]): void; q?: unknown[][] } };

        w.clarity =
          w.clarity ||
          function clarity(...args: unknown[]) {
            (w.clarity!.q = w.clarity!.q || []).push(args);
          };
        addScript(`https://www.clarity.ms/tag/${clarityId}`);
      }
    };

    INTERACTION_EVENTS.forEach((name) => window.addEventListener(name, start, { passive: true }));
    timer = window.setTimeout(start, FALLBACK_MS);

    return () => {
      window.clearTimeout(timer);
      INTERACTION_EVENTS.forEach((name) => window.removeEventListener(name, start));
    };
  }, [gaId, clarityId]);

  return null;
}
