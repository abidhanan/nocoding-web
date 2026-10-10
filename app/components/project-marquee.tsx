"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Loaded on demand so the card markup and project data stay out of the initial
// page weight; they are fetched shortly before the section scrolls into view.
const ProjectCards = dynamic(() => import("./project-cards"), { ssr: false });

/**
 * Interactive shell for the projects marquee (auto-scroll, drag, wheel). Cards are
 * mounted lazily once the marquee gets near the viewport, and the loop only runs
 * while it is on screen.
 */
export default function ProjectMarquee() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef(0);
  const isPointerOverRef = useRef(false);
  const dragStateRef = useRef({
    hasCaptured: false,
    isDragging: false,
    pointerId: 0,
    scrollLeft: 0,
    startX: 0,
  });

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

      loopWidthRef.current = group && copy ? copy.offsetLeft - group.offsetLeft : 0;
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

      if (!dragStateRef.current.isDragging && !isPointerOverRef.current && loopWidth > 0) {
        let nextScrollLeft = viewport.scrollLeft + deltaTime * 0.05;

        if (nextScrollLeft >= loopWidth) {
          nextScrollLeft -= loopWidth;
        }

        viewport.scrollLeft = nextScrollLeft;
      }
    };

    // Only run the loop while the marquee is on screen; scrolling an off-screen
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
  }, []);

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    dragStateRef.current = {
      hasCaptured: false,
      isDragging: true,
      pointerId: event.pointerId,
      scrollLeft: viewport.scrollLeft,
      startX: event.clientX,
    };
  };

  const moveDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    const dragState = dragStateRef.current;

    if (!viewport || !dragState.isDragging || dragState.pointerId !== event.pointerId) {
      return;
    }

    const distance = event.clientX - dragState.startX;

    if (Math.abs(distance) > 5 && !dragState.hasCaptured) {
      viewport.setPointerCapture(event.pointerId);
      dragState.hasCaptured = true;
    }

    const loopWidth = loopWidthRef.current;
    let nextScrollLeft = dragState.scrollLeft - distance;

    if (loopWidth > 0) {
      if (nextScrollLeft < 0) {
        nextScrollLeft += loopWidth;
      } else if (nextScrollLeft >= loopWidth) {
        nextScrollLeft -= loopWidth;
      }
    }

    viewport.scrollLeft = nextScrollLeft;
  };

  const stopDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    const dragState = dragStateRef.current;

    if (event.type === "pointerleave") {
      isPointerOverRef.current = false;
    }

    if (!viewport || dragState.pointerId !== event.pointerId) {
      return;
    }

    dragStateRef.current.isDragging = false;

    if (dragState.hasCaptured && viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const isHorizontalIntent = Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.25;
    const delta = event.shiftKey ? event.deltaY : event.deltaX;

    if (!event.shiftKey && !isHorizontalIntent) {
      return;
    }

    if (Math.abs(delta) < 1) {
      return;
    }

    event.preventDefault();
    const loopWidth = loopWidthRef.current;
    let nextScrollLeft = viewport.scrollLeft + delta;

    if (loopWidth > 0) {
      if (nextScrollLeft < 0) {
        nextScrollLeft += loopWidth;
      } else if (nextScrollLeft >= loopWidth) {
        nextScrollLeft -= loopWidth;
      }
    }

    viewport.scrollLeft = nextScrollLeft;
  };

  return (
    <div
      ref={viewportRef}
      role="region"
      className="project-marquee mt-8 min-h-[24rem]"
      aria-label="Daftar project sebelumnya yang bergerak dari kanan ke kiri"
      onPointerDown={startDrag}
      onPointerEnter={() => {
        isPointerOverRef.current = true;
      }}
      onPointerCancel={stopDrag}
      onPointerLeave={stopDrag}
      onPointerMove={moveDrag}
      onPointerUp={stopDrag}
      onLostPointerCapture={stopDrag}
      onWheel={handleWheel}
    >
      {shouldLoad ? <ProjectCards /> : null}
    </div>
  );
}
