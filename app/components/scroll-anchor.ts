// Keeps the reader on the same spot when the text of the whole page changes (language switch):
// the page is re-aligned to a block of text that was on screen before the change.

const BLOCKS = "main section[id], main h1, main h2, main h3, main p, main li, main figure, footer";

export type Anchor = { element: HTMLElement; top: number };

/** The smallest text block crossing a line a little above the middle of the screen. */
export function captureAnchor(): Anchor | null {
  const line = window.innerHeight * 0.35;
  let best: HTMLElement | null = null;
  let bestHeight = Infinity;

  document.querySelectorAll<HTMLElement>(BLOCKS).forEach((element) => {
    const rect = element.getBoundingClientRect();

    if (rect.top <= line && rect.bottom >= line && rect.height < bestHeight) {
      best = element;
      bestHeight = rect.height;
    }
  });

  return best ? { element: best, top: (best as HTMLElement).getBoundingClientRect().top } : null;
}

/**
 * For a while, re-aligns the anchor to where it was on screen whenever the page height changes
 * (text swapped, translation arriving, images settling). Stops as soon as the visitor scrolls.
 */
export function holdAnchor(anchor: Anchor | null, durationMs: number) {
  if (!anchor) {
    return () => undefined;
  }

  let stopped = false;
  const align = () => {
    if (stopped || !anchor.element.isConnected) {
      return;
    }

    const delta = anchor.element.getBoundingClientRect().top - anchor.top;

    if (Math.abs(delta) > 1) {
      window.scrollBy({ top: delta, behavior: "instant" });
    }
  };

  const stop = () => {
    stopped = true;
    observer.disconnect();
    window.clearInterval(timer);
    window.clearTimeout(ender);
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchstart", stop);
    window.removeEventListener("keydown", stop);
    window.removeEventListener("pointerdown", stop);
  };

  const observer = new ResizeObserver(align);
  const timer = window.setInterval(align, 120);
  const ender = window.setTimeout(stop, durationMs);

  observer.observe(document.body);
  window.addEventListener("wheel", stop, { passive: true });
  window.addEventListener("touchstart", stop, { passive: true });
  window.addEventListener("keydown", stop);
  window.addEventListener("pointerdown", stop);
  align();

  return stop;
}
