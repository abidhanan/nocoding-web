"use client";

import { useSyncExternalStore } from "react";

const mainText = "nocoding";
const totalGlyphs = mainText.length;
const typeDelays = [210, 145, 165, 132, 188, 142, 176, 230];
const eraseDelays = [90, 74, 82, 66, 86, 72, 78, 110];

type BrandAnimationSnapshot = {
  visibleCount: number;
  showUnderscore: boolean;
};

const initialSnapshot: BrandAnimationSnapshot = {
  visibleCount: 0,
  showUnderscore: false,
};

let snapshot = initialSnapshot;
let animationStarted = false;
let prefersReducedMotion = false;
let mediaQuery: MediaQueryList | null = null;
const subscribers = new Set<() => void>();

function emitSnapshot(nextSnapshot: BrandAnimationSnapshot) {
  snapshot = nextSnapshot;
  subscribers.forEach((callback) => callback());
}

function updateSnapshot(nextSnapshot: Partial<BrandAnimationSnapshot>) {
  emitSnapshot({ ...snapshot, ...nextSnapshot });
}

function wait(duration: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, duration);
  });
}

function setupMotionPreference() {
  if (mediaQuery) {
    return;
  }

  mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  prefersReducedMotion = mediaQuery.matches;
  mediaQuery.addEventListener("change", (event) => {
    prefersReducedMotion = event.matches;

    if (prefersReducedMotion) {
      updateSnapshot({
        visibleCount: totalGlyphs,
        showUnderscore: true,
      });
    }
  });
}

async function runSharedAnimation() {
  while (animationStarted) {
    if (prefersReducedMotion) {
      updateSnapshot({
        visibleCount: totalGlyphs,
        showUnderscore: true,
      });
      await wait(1000);
      continue;
    }

    updateSnapshot({
      visibleCount: 0,
      showUnderscore: false,
    });
    await wait(520);

    for (let index = 0; index < totalGlyphs; index += 1) {
      updateSnapshot({ visibleCount: index + 1 });
      await wait(typeDelays[index] ?? 160);
    }

    updateSnapshot({
      showUnderscore: true,
    });
    await wait(3100);

    updateSnapshot({ showUnderscore: false });
    await wait(220);

    for (let index = totalGlyphs; index > 0; index -= 1) {
      updateSnapshot({ visibleCount: index - 1 });
      await wait(eraseDelays[totalGlyphs - index] ?? 78);
    }

    await wait(900);
  }
}

function subscribe(callback: () => void) {
  subscribers.add(callback);
  setupMotionPreference();

  if (!animationStarted) {
    animationStarted = true;
    void runSharedAnimation();
  }

  return () => {
    subscribers.delete(callback);
  };
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return initialSnapshot;
}

export default function TypedBrand({ className = "" }: { className?: string }) {
  const { visibleCount, showUnderscore } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return (
    <span className={`nocoding-type-word ${className}`} aria-hidden="true">
      <span className="nocoding-type-word__ghost">
        <span>{mainText}</span>
        <span className="nocoding-type-word__underscore-spacer" />
      </span>
      <span className="nocoding-type-word__line">
        {mainText.split("").map((character, index) => (
          <span
            key={`${character}-${index}`}
            className={`nocoding-type-word__character ${
              index < visibleCount ? "nocoding-type-word__character--visible" : ""
            }`}
          >
            {character}
          </span>
        ))}
        <span
          className={`nocoding-type-word__underscore ${
            showUnderscore ? "nocoding-type-word__underscore--visible" : ""
          }`}
        />
      </span>
    </span>
  );
}
