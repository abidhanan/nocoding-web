"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

/**
 * Fades each section in once, the first time it scrolls into view. The reveal is
 * one-shot on purpose: re-hiding a section while part of it is still on screen made
 * the previous section flicker and slide as the next one came in.
 */
export default function ScrollRevealController() {
  const pathname = usePathname();
  const firstRun = useRef(true);

  // Runs again after every page change, before paint, so sections of the page just opened animate too.
  useLayoutEffect(() => {
    // After a page change the new page starts at the top, even if the old one was scrolled down.
    const startsAtTop = !firstRun.current;

    firstRun.current = false;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section[id]:not(#beranda)"),
    );

    if (!sections.length) {
      return undefined;
    }

    const pending: HTMLElement[] = [];

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();

      section.classList.add("section-reveal");

      // Already on screen, or scrolled past (e.g. after a hash link): show right away.
      if ((startsAtTop ? rect.top + window.scrollY : rect.top) < window.innerHeight * 0.88) {
        section.classList.add("section-reveal--visible");
        return;
      }

      pending.push(section);
    });

    if (!pending.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const section = entry.target as HTMLElement;

          section.classList.add("section-reveal--visible");
          observer.unobserve(section);
        });
      },
      {
        // Reveal once the section's top has entered the lower part of the screen.
        // A tiny threshold keeps sections taller than the viewport from getting stuck.
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.01,
      },
    );

    pending.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
