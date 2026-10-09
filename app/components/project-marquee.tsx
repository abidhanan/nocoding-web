"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Interactive shell for the projects marquee. The cards themselves are rendered
 * on the server and handed in as `children`, so they never hydrate as client
 * components — only this shell (auto-scroll, drag, wheel) runs on the client.
 */
export default function ProjectMarquee({ children }: { children: ReactNode }) {
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

    // Cache the loop width instead of reading `scrollWidth` every frame, which
    // forces a synchronous layout (reflow) on each tick. This is the reflow fix;
    // the loop itself always runs (the browser already pauses rAF for hidden
    // tabs) so the marquee reliably scrolls from right to left.
    const measureLoopWidth = () => {
      loopWidthRef.current = viewport.scrollWidth / 2;
    };

    measureLoopWidth();

    let lastTime = 0;

    const tick = () => {
      const time = window.performance.now();
      const previousTime = lastTime || time;
      const deltaTime = Math.min(time - previousTime, 64);
      const loopWidth = loopWidthRef.current;

      lastTime = time;

      if (!dragStateRef.current.isDragging && !isPointerOverRef.current && loopWidth > 0) {
        let nextScrollLeft = viewport.scrollLeft + deltaTime * 0.05;

        if (nextScrollLeft >= loopWidth) {
          nextScrollLeft -= loopWidth;
        }

        viewport.scrollLeft = nextScrollLeft;
      }
    };

    const intervalId = window.setInterval(tick, 16);
    const resizeObserver = new ResizeObserver(measureLoopWidth);
    resizeObserver.observe(viewport);

    return () => {
      window.clearInterval(intervalId);
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
      className="project-marquee mt-8"
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
      {children}
    </div>
  );
}
