"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useEffect, useState } from "react";

type CenteredScrollLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children" | "href" | "onClick"
> & {
  activeClassName?: string;
  children: ReactNode;
  href: string;
  onNavigate?: () => void;
  scrollBlock?: "start" | "center";
};

const navbarHeight = 64;

function cleanCurrentUrl() {
  return `${window.location.pathname}${window.location.search}`;
}

export default function CenteredScrollLink({
  activeClassName = "",
  children,
  className = "",
  href,
  onNavigate,
  scrollBlock = "center",
  ...anchorProps
}: CenteredScrollLinkProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!href.startsWith("#")) {
      return undefined;
    }

    const id = href.slice(1);

    const updateActiveState = () => {
      const target = document.getElementById(id);

      if (!target) {
        setIsActive(false);
        return;
      }

      const rect = target.getBoundingClientRect();
      const marker = navbarHeight + (window.innerHeight - navbarHeight) / 2;
      const isAtTop = window.scrollY <= 4;
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

      setIsActive(
        (id === "beranda" && isAtTop) ||
          (id === "kontak" && isAtBottom) ||
          (rect.top <= marker && rect.bottom >= marker),
      );
    };

    updateActiveState();
    window.addEventListener("scroll", updateActiveState, { passive: true });
    window.addEventListener("resize", updateActiveState);
    window.addEventListener("hashchange", updateActiveState);

    return () => {
      window.removeEventListener("scroll", updateActiveState);
      window.removeEventListener("resize", updateActiveState);
      window.removeEventListener("hashchange", updateActiveState);
    };
  }, [href]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) {
      return;
    }

    const target = document.getElementById(href.slice(1));

    if (!target) {
      return;
    }

    event.preventDefault();
    setIsActive(true);

    const rect = target.getBoundingClientRect();
    const currentScroll = window.scrollY;
    const targetTop = rect.top + currentScroll;
    const nextScroll =
      scrollBlock === "center"
        ? targetTop + rect.height / 2 - (window.innerHeight + navbarHeight) / 2
        : targetTop - navbarHeight;

    window.history.replaceState(null, "", cleanCurrentUrl());
    window.scrollTo({
      top: Math.max(0, nextScroll),
      behavior: "smooth",
    });
    onNavigate?.();
  };

  return (
    <a
      {...anchorProps}
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`${className}${isActive && activeClassName ? ` ${activeClassName}` : ""}`}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
