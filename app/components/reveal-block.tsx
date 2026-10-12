"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps one numbered block so it animates in (and out) as it scrolls through the
 * viewport. Content stays fully visible without JavaScript: the hidden state is
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        element.classList.toggle("block-reveal--visible", entry.isIntersecting);
      },
      { rootMargin: "-8% 0px -8% 0px", threshold: 0.06 },
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
