"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { navbarHeight, pendingSectionKey, scrollToSection } from "./section-scroll";

type CenteredScrollLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children" | "href" | "onClick"
> & {
  activeClassName?: string;
  /** Also mark the link as current while this path (or a page below it) is open. */
  activePath?: string;
  children: ReactNode;
  href: string;
  onNavigate?: () => void;
  scrollBlock?: "start" | "center";
};

function cleanCurrentUrl() {
  return `${window.location.pathname}${window.location.search}`;
}

export default function CenteredScrollLink({
  activeClassName = "",
  activePath,
  children,
  className = "",
  href,
  onNavigate,
  scrollBlock = "center",
  ...anchorProps
}: CenteredScrollLinkProps) {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  // "#id" and "/#id" both point at a section of the home page.
  const anchorId = href.startsWith("#") ? href.slice(1) : href.startsWith("/#") ? href.slice(2) : null;
  const onHome = pathname === "/";
  const isLocalAnchor = anchorId !== null && onHome;

  useEffect(() => {
    if (!isLocalAnchor) {
      return undefined;
    }

    const id = anchorId as string;

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
  }, [anchorId, isLocalAnchor]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (anchorId !== null && !isLocalAnchor) {
      // A home-page section clicked from another page: open the home page, then jump to it.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
        return;
      }

      event.preventDefault();
      window.sessionStorage.setItem(pendingSectionKey, JSON.stringify({ id: anchorId, block: scrollBlock }));
      router.push("/");
      onNavigate?.();
      return;
    }

    if (!isLocalAnchor || anchorId === null) {
      // A plain page link: let Next.js navigate normally.
      onNavigate?.();
      return;
    }

    const target = document.getElementById(anchorId);

    if (!target) {
      return;
    }

    event.preventDefault();
    setIsActive(true);

    window.history.replaceState(null, "", cleanCurrentUrl());
    scrollToSection(anchorId, scrollBlock);
    onNavigate?.();
  };

  const isPageLink = anchorId === null;
  const isCurrentPage = isPageLink && (pathname === href || pathname.startsWith(`${href}/`));
  const onActivePath = activePath !== undefined && (pathname === activePath || pathname.startsWith(`${activePath}/`));
  const active = isLocalAnchor ? isActive : isCurrentPage || onActivePath;

  return (
    <Link
      prefetch={false}
      {...anchorProps}
      href={href}
      aria-current={active ? (isPageLink || onActivePath ? "page" : "location") : undefined}
      className={`${className}${active && activeClassName ? ` ${activeClassName}` : ""}`}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
