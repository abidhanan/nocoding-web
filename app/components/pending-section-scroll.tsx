"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { pendingSectionKey, scrollToSection, type PendingSection } from "./section-scroll";

/**
 * Finishes a navbar click that started on another page (e.g. an article): once the home page is
 * showing, scroll down to the requested section the same way a click on the home page does.
 */
export default function PendingSectionScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      return undefined;
    }

    let pending: PendingSection | null = null;

    try {
      pending = JSON.parse(window.sessionStorage.getItem(pendingSectionKey) ?? "null") as PendingSection | null;
      window.sessionStorage.removeItem(pendingSectionKey);
    } catch {
      pending = null;
    }

    if (!pending) {
      return undefined;
    }

    let stop: (() => void) | undefined;
    // Let the new page mount (and Next reset the scroll position) before starting.
    const starter = window.setTimeout(() => {
      stop = scrollToSection(pending.id, pending.block);
    }, 60);

    return () => {
      window.clearTimeout(starter);
      stop?.();
    };
  }, [pathname]);

  return null;
}
