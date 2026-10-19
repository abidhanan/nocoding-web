"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useLocalizedText } from "./i18n";
import { projects, type Project } from "./projects-data";

// Loaded on demand so the card markup stays out of the initial page weight; the
// chunk is fetched shortly before the section scrolls into view.
const ProjectCards = dynamic(() => import("./project-cards"), { ssr: false });

type RowConfig = {
  items: Project[];
  /** 1 scrolls the cards from right to left, -1 from left to right. */
  direction: 1 | -1;
  /** Pixels per millisecond. */
  speed: number;
  label: string;
  labelId: string;
};

const third = Math.ceil(projects.length / 3);

// Top row: right to left. Middle row: left to right. Bottom row: right to left.
const rows: RowConfig[] = [
  { items: projects.slice(0, third), direction: 1, speed: 0.05, label: "Baris atas, bergerak dari kanan ke kiri", labelId: "projects.row.top" },
  { items: projects.slice(third, third * 2), direction: -1, speed: 0.045, label: "Baris tengah, bergerak dari kiri ke kanan", labelId: "projects.row.middle" },
  { items: projects.slice(third * 2), direction: 1, speed: 0.04, label: "Baris bawah, bergerak dari kanan ke kiri", labelId: "projects.row.bottom" },
];

/** Three looping rows of project cards. They never stop: no hover pause, drag, or scroll. */
export default function ProjectMarquee() {
  return (
    <div className="mt-8 grid gap-2">
      {rows.map((row) => (
        <MarqueeRow key={row.label} {...row} />
      ))}
    </div>
  );
}

/**
 * One auto-scrolling row. Cards are mounted lazily once the row gets near the
 * viewport, and the loop only runs while it is on screen.
 */
function MarqueeRow({ items, direction, speed, label, labelId }: RowConfig) {
  const listLabel = useLocalizedText("projects.list", "Daftar project sebelumnya. {row}");
  const rowLabel = useLocalizedText(labelId, label);
  const [shouldLoad, setShouldLoad] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef(0);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return undefined;
    }

    // The loop width is cached instead of read every frame, which would force a
    // synchronous layout (reflow) on each tick.
    const measureLoopWidth = () => {
      const group = viewport.querySelector<HTMLElement>(".project-marquee__group");
      const copy = group?.nextElementSibling as HTMLElement | null | undefined;
      const previous = loopWidthRef.current;

      loopWidthRef.current = group && copy ? copy.offsetLeft - group.offsetLeft : 0;

      // Rows that move left to right start one loop in, so they have room to travel back.
      if (direction === -1 && previous === 0 && loopWidthRef.current > 0 && viewport.scrollLeft === 0) {
        viewport.scrollLeft = loopWidthRef.current;
      }
    };

    let lastTime = 0;

    const tick = () => {
      const time = window.performance.now();
      const previousTime = lastTime || time;
      const deltaTime = Math.min(time - previousTime, 64);

      lastTime = time;

      if (loopWidthRef.current === 0) {
        measureLoopWidth();
      }

      const loopWidth = loopWidthRef.current;

      if (loopWidth > 0) {
        let nextScrollLeft = viewport.scrollLeft + deltaTime * speed * direction;

        if (nextScrollLeft >= loopWidth) {
          nextScrollLeft -= loopWidth;
        } else if (nextScrollLeft <= 0) {
          nextScrollLeft += loopWidth;
        }

        viewport.scrollLeft = nextScrollLeft;
      }
    };

    // Only run the loop while the row is on screen; scrolling an off-screen
    // container every 16ms just invalidates layout for no visible benefit.
    let intervalId: number | undefined;

    const start = () => {
      if (intervalId === undefined) {
        lastTime = 0;
        intervalId = window.setInterval(tick, 16);
      }
    };

    const stop = () => {
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
        intervalId = undefined;
      }
    };

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          loadObserver.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "120px" },
    );
    const resizeObserver = new ResizeObserver(measureLoopWidth);

    loadObserver.observe(viewport);
    visibilityObserver.observe(viewport);
    resizeObserver.observe(viewport);

    return () => {
      stop();
      loadObserver.disconnect();
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [direction, speed]);

  return (
    <div
      ref={viewportRef}
      role="region"
      className="project-marquee min-h-[24rem]"
      aria-label={listLabel.replace("{row}", rowLabel)}
    >
      {shouldLoad ? <ProjectCards items={items} /> : null}
    </div>
  );
}
