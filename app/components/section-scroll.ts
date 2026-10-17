export const navbarHeight = 64;

/** Remembers a home-page section to scroll to after navigating there from another page. */
export const pendingSectionKey = "nocoding-pending-section";

export type PendingSection = { id: string; block: "start" | "center" };

/** Scroll offset that brings a section to the top (below the navbar) or centres it on screen. */
export function sectionScrollTop(target: HTMLElement, block: "start" | "center") {
  const rect = target.getBoundingClientRect();
  const targetTop = rect.top + window.scrollY;
  const top =
    block === "center"
      ? targetTop + rect.height / 2 - (window.innerHeight + navbarHeight) / 2
      : targetTop - navbarHeight;

  return Math.max(0, top);
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

let stopCurrent: (() => void) | null = null;

/**
 * Scrolls to a section with a smooth motion and makes sure it ends exactly on that section.
 *
 * The browser's own smooth scrolling aims at a position worked out once, at the start. On this
 * page the height of sections changes while scrolling (lazy project cards, images, the article
 * carousel), so that position can end up a little off. Here the target is read again on every
 * frame while moving, and then kept in place for a couple of seconds until the layout settles.
 * Any scroll the visitor makes (wheel, touch, keyboard, scrollbar) stops it immediately.
 */
export function scrollToSection(id: string, block: "start" | "center") {
  stopCurrent?.();

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let stopped = false;
  let frame = 0;
  let from = 0;
  let startedAt = 0;
  let duration = 0;
  let settleUntil = 0;

  const targetTop = () => {
    const target = document.getElementById(id);

    return target ? sectionScrollTop(target, block) : null;
  };

  const stop = () => {
    stopped = true;
    window.cancelAnimationFrame(frame);
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchstart", stop);
    window.removeEventListener("keydown", stop);
    window.removeEventListener("pointerdown", stop);

    if (stopCurrent === stop) {
      stopCurrent = null;
    }
  };

  const step = (now: number) => {
    if (stopped) {
      return;
    }

    const top = targetTop();

    if (top !== null) {
      const progress = duration === 0 ? 1 : Math.min(1, (now - startedAt) / duration);

      if (progress < 1) {
        window.scrollTo({ top: from + (top - from) * easeInOut(progress), behavior: "instant" });
      } else if (Math.abs(window.scrollY - top) > 1) {
        window.scrollTo({ top, behavior: "instant" });
      }
    }

    if (now < settleUntil) {
      frame = window.requestAnimationFrame(step);
    } else {
      stop();
    }
  };

  const top = targetTop();

  if (top === null) {
    return stop;
  }

  from = window.scrollY;
  duration = reduced ? 0 : Math.min(1200, Math.max(450, Math.abs(top - from) * 0.25));
  startedAt = performance.now();
  settleUntil = startedAt + duration + 2500;
  stopCurrent = stop;

  window.addEventListener("wheel", stop, { passive: true });
  window.addEventListener("touchstart", stop, { passive: true });
  window.addEventListener("keydown", stop);
  window.addEventListener("pointerdown", stop);
  frame = window.requestAnimationFrame(step);

  return stop;
}
