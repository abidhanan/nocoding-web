"use client";

import { useEffect } from "react";

export default function ScrollRevealController() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));

    if (!sections.length) {
      return undefined;
    }

    let lastScrollY = window.scrollY;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();

      section.classList.add("section-reveal");

      if (rect.bottom < 64) {
        section.classList.add("section-reveal--from-top");
        return;
      }

      if (rect.top > window.innerHeight) {
        section.classList.add("section-reveal--from-bottom");
        return;
      }

      section.classList.add("section-reveal--visible");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const currentScrollY = window.scrollY;
        const directionClass =
          currentScrollY >= lastScrollY ? "section-reveal--from-bottom" : "section-reveal--from-top";

        entries.forEach((entry) => {
          const section = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            if (
              !section.classList.contains("section-reveal--from-bottom") &&
              !section.classList.contains("section-reveal--from-top")
            ) {
              section.classList.add(directionClass);
            }

            section.classList.add("section-reveal--visible");
            return;
          }

          section.classList.remove("section-reveal--visible");
          section.classList.remove("section-reveal--from-bottom", "section-reveal--from-top");
          section.classList.add(entry.boundingClientRect.top < 0 ? "section-reveal--from-top" : "section-reveal--from-bottom");
        });

        lastScrollY = currentScrollY;
      },
      {
        rootMargin: "-18% 0px -18% 0px",
        threshold: 0.12,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return null;
}
