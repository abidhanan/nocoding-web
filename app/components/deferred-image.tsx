"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * A photo that is only requested once it is about to scroll into view. The browser's own lazy
 * loading still fetches images that sit within a screen or two of the top, which competes with the
 * first paint; here the request waits until the photo is really close. Use inside a positioned
 * wrapper (the photo fills it).
 */
export default function DeferredImage({ alt, ...props }: Omit<ImageProps, "fill" | "loading">) {
  const holder = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const element = holder.current;

    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={holder} className="absolute inset-0">
      {near ? <Image {...props} alt={alt} fill loading="eager" /> : null}
    </div>
  );
}
