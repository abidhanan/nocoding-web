"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { ArticlePreview } from "../../lib/articles/types";
import ArticleCard from "./article-card";

const STEP_DELAY = 4500;
const SLIDE_MS = 700;
const INITIAL_SLIDES = 6;

function subscribe(callback: () => void) {
  const queries = ["(min-width: 1024px)", "(min-width: 768px)", "(prefers-reduced-motion: reduce)"].map((query) =>
    window.matchMedia(query),
  );

  queries.forEach((query) => query.addEventListener("change", callback));

  return () => queries.forEach((query) => query.removeEventListener("change", callback));
}

/** Cards visible at once; mirrors the width classes on each slide below. */
function perViewSnapshot() {
  if (window.matchMedia("(min-width: 1024px)").matches) {
    return 3;
  }

  return window.matchMedia("(min-width: 768px)").matches ? 2 : 1;
}

const reducedMotionSnapshot = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Slides through every article one card at a time, looping forever. The first cards are
 * repeated after the last one so the loop wraps without a visible jump.
 */
export default function ArticlesCarousel({ articles }: { articles: ArticlePreview[] }) {
  const count = articles.length;
  const perView = useSyncExternalStore(subscribe, perViewSnapshot, () => 3);
  const reduced = useSyncExternalStore(subscribe, reducedMotionSnapshot, () => false);
  const loop = count > perView;
  const slides = loop ? [...articles, ...articles.slice(0, perView)] : articles;

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [focused, setFocused] = useState(false);
  const [near, setNear] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const [layoutKey, setLayoutKey] = useState(`${perView}-${count}`);

  // Start over whenever the layout changes how many cards fit.
  if (layoutKey !== `${perView}-${count}`) {
    setLayoutKey(`${perView}-${count}`);
    setAnimate(false);
    setIndex(0);
  }

  // Cards slide in from outside the visible area, where the browser would not have loaded their
  // photo yet. Once the carousel is close to the screen, load every photo so none arrive blank.
  useEffect(() => {
    const element = root.current;

    if (!element || near) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [near]);

  // Move to the next card on a timer.
  useEffect(() => {
    if (!near || !loop || reduced || focused || !animate || index >= count) {
      return undefined;
    }

    const timer = setTimeout(() => setIndex((current) => current + 1), STEP_DELAY);

    return () => clearTimeout(timer);
  }, [near, loop, reduced, focused, animate, index, count]);

  // After the repeated cards have slid in, jump back to the real first card without animation.
  useEffect(() => {
    if (!loop || index !== count) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, reduced ? 0 : SLIDE_MS + 50);

    return () => clearTimeout(timer);
  }, [loop, index, count, reduced]);

  // Turn the animation back on once the instant jump has been painted.
  useEffect(() => {
    if (animate) {
      return undefined;
    }

    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => {
        setAnimate(true);
      });
    });

    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [animate]);

  return (
    <div ref={root} role="region" aria-roledescription="carousel" aria-label="Artikel" data-i18n-aria="aria.articles" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
      <div className="mx-auto mt-10 w-full max-w-[21.5rem] overflow-hidden pt-2 md:max-w-3xl lg:max-w-7xl">
        <div
          className="-mx-2.5 flex ease-in-out [--step:100%] md:[--step:50%] lg:[--step:33.3333%]"
          style={{
            transform: `translateX(calc(var(--step) * -${index}))`,
            transition: animate && !reduced ? `transform ${SLIDE_MS}ms ease-in-out` : "none",
          }}
        >
          {/* Only the first few cards are in the page at first; the rest are added once the carousel is close. */}
          {(near ? slides : slides.slice(0, INITIAL_SLIDES)).map((article, slideIndex) => (
            <div
              key={`${article.id}-${slideIndex}`}
              className="w-full shrink-0 px-2.5 md:w-1/2 lg:w-1/3"
              aria-hidden={slideIndex >= count || undefined}
              inert={slideIndex < index || slideIndex >= index + perView}
            >
              <ArticleCard article={article} eager={near} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
