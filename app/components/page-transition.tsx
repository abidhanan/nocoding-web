"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { pendingSectionKey } from "./section-scroll";

// True once a page has been shown, so only later page changes animate (never the first load).
let hasShownPage = false;

function Page({ children, pathname }: { children: ReactNode; pathname: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    // Going to a home-page section: the sections reveal themselves as the page scrolls to them.
    const headingToSection = pathname === "/" && window.sessionStorage.getItem(pendingSectionKey) !== null;

    if (element && hasShownPage && !headingToSection) {
      element.classList.add("page-enter");
    }

    hasShownPage = true;
  }, [pathname]);

  return <div ref={ref}>{children}</div>;
}

/** Fades and lifts each new page in with the same motion the home-page sections use. */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <Page key={pathname} pathname={pathname}>
      {children}
    </Page>
  );
}
