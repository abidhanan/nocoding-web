"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ComponentProps } from "react";

// The mobile slider only matters on narrow screens and well below the fold, so
// its code and markup are loaded shortly before the section scrolls into view.
// The desktop grid in the page already carries the same content in the HTML.
const MobilePackageSlider = dynamic(() => import("./mobile-package-slider"), { ssr: false });

export default function LazyPackageSlider(props: ComponentProps<typeof MobilePackageSlider>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px" },
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="min-h-[40rem] lg:hidden">
      {shouldLoad ? <MobilePackageSlider {...props} /> : null}
    </div>
  );
}
