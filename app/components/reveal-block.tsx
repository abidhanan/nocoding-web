"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps one numbered block so it animates in the first time it scrolls into view. Content stays fully visible without JavaScript: the hidden state is
 * only applied here, after mount.
 */
export default function RevealBlock({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return undefined;
    }

    element.classList.add("block-reveal");

    // One-shot: once a block has animated in it stays put, so blocks never flicker
    // while the next one scrolls into view.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("block-reveal--visible");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.06 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      element.classList.remove("block-reveal", "block-reveal--visible");
    };
  }, []);

  return (
    <article ref={ref} className={className}>
      {children}
    </article>
  );
}
