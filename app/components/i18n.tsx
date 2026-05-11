"use client";

import { useSyncExternalStore, type ReactNode } from "react";

export type Language = "id" | "en";

const storageKey = "nocoding-language";

const englishText: Record<string, string> = {
  "skip.content": "Skip to content",
  "nav.home": "Home",
  "nav.services": "Services",
  "nav.process": "Process",
  "nav.project": "Project",
  "nav.package": "Packages",
  "nav.faq": "FAQ",
  "nav.contact": "Contact",
  "hero.eyebrow": "No-code website and custom system studio",
  "hero.description":
    "Business websites that are ready to launch, look serious, and are easy to grow. We help from page strategy, design, content, through launch.",
  "hero.cta.contact": "Free consultation",
  "hero.cta.services": "View services",
  "hero.stat.days": "working days for the first landing page",
  "hero.stat.layers": "work layers: strategy, design, launch",
  "hero.stat.responsive": "responsive for mobile and desktop",
  "hero.board.title": "Launch board",
  "hero.board.homepage": "Homepage",
  "hero.board.copywriting": "Copywriting",
  "hero.board.seo": "SEO setup",
  "hero.board.ready": "Ready",
  "hero.board.mapped": "Mapped",
  "hero.board.path": "Conversion path",
  "hero.board.readiness": "readiness",
  "services.eyebrow": "Services",
  "services.description":
    "We combine content strategy, interface design, and technical implementation so your website is not only online, but actually works.",
  "services.0.title": "Business website",
  "services.0.description":
    "Landing pages, company profiles, catalogs, and campaign pages that launch quickly without sacrificing visual quality.",
  "services.0.item.0": "Page copywriting",
  "services.0.item.1": "Responsive design",
  "services.0.item.2": "Basic SEO setup",
  "services.1.title": "Operational system",
  "services.1.description":
    "Internal dashboards, order forms, client portals, and daily workflow automations tailored to how your team works.",
  "services.1.item.0": "Clean workflow",
  "services.1.item.1": "User roles",
  "services.1.item.2": "Data export",
  "services.2.title": "Digital commerce",
  "services.2.description":
    "Product catalogs, promo pages, lightweight checkout, and sales contact integration to speed up conversion.",
  "services.2.item.0": "Catalog structure",
  "services.2.item.1": "Sales CTA",
  "services.2.item.2": "Analytics ready",
  "process.eyebrow": "Process",
  "process.description":
    "Every phase has outputs you can see, test, and approve. You know exactly where the work is moving.",
  "process.0.title": "Needs audit",
  "process.0.description":
    "We map business goals, visual references, core features, and launch priorities.",
  "process.1.title": "Experience design",
  "process.1.description":
    "Page structure, copy, components, and conversion flows are cleaned up before production.",
  "process.2.title": "Build and test",
  "process.2.description":
    "The website is built responsively, tested for basic performance, and prepared for future content updates.",
  "process.3.title": "Measured launch",
  "process.3.description":
    "Publishing, metadata, sitemap, and post-launch optimization guidance are completed together.",
  "projects.eyebrow": "Previous Projects",
  "projects.description":
    "Each project is built to bring business messages into clearer pages, ready on every device, and easier for users to act on.",
  "packages.eyebrow": "Packages",
  "packages.description":
    "Packages can be adjusted after the consultation session so budget, timeline, and results stay realistic.",
  "packages.0.price": "From Rp2.5M",
  "packages.0.description": "For businesses that need a professional page live quickly.",
  "packages.0.feature.0": "1 responsive landing page",
  "packages.0.feature.1": "Core copywriting structure",
  "packages.0.feature.2": "Basic technical SEO",
  "packages.0.feature.3": "Email contact form",
  "packages.1.price": "From Rp7.5M",
  "packages.1.description": "For brands that need multiple pages and a mature conversion flow.",
  "packages.1.badge": "Popular",
  "packages.1.feature.0": "Up to 5 core pages",
  "packages.1.feature.1": "Custom component design",
  "packages.1.feature.2": "Analytics integration",
  "packages.1.feature.3": "Content update documentation",
  "packages.2.description": "For internal workflows, portals, catalogs, or business dashboards.",
  "packages.2.feature.0": "Business process mapping",
  "packages.2.feature.1": "Dashboard or portal",
  "packages.2.feature.2": "User roles and access",
  "packages.2.feature.3": "Feature iteration roadmap",
  "faq.eyebrow": "FAQ",
  "faq.title": "Questions that usually come up before starting.",
  "faq.description":
    "If your need is not covered here, the first consultation session will help define the most efficient scope.",
  "faq.0.question": "Is it really no-code from the client side?",
  "faq.0.answer":
    "Yes. The nocoding team handles the technical structure, design, and deployment. After launch, important content is made easy to update based on project needs.",
  "faq.1.question": "How long does website development take?",
  "faq.1.answer":
    "A simple landing page usually takes 5-10 working days after materials are ready. Systems or multi-page websites depend on scope, integrations, and feedback rhythm.",
  "faq.2.question": "Can maintenance continue after launch?",
  "faq.2.answer":
    "Yes. After the website is live, you can choose support for content updates, performance improvements, new pages, or further feature development.",
  "faq.3.question": "What needs to be prepared before starting?",
  "faq.3.answer":
    "Just prepare a business overview, main services, visual references, and the contact details you want to display. If the materials are not complete yet, we help clean up the structure.",
  "contact.eyebrow": "Start Project",
  "contact.title": "Tell us your website needs. We will help clean up the path.",
  "contact.description":
    "Send a short overview of your business, target pages, and desired timeline. The first reply will include scope recommendations and next steps.",
  "contact.package": "Compare packages",
  "footer.tagline": "Business websites ready to launch, look serious, and are easy to grow.",
  "footer.contact": "Contact",
  "footer.connect": "Let's Connect",
  "footer.copyright": "(c) 2026 Nocoding - All rights reserved.",
  "project.category.ecoswap": "Used goods marketplace website",
  "project.description.ecoswap":
    "A pre-loved marketplace that helps users sell and buy used goods with a modern look, clear brand message, and responsive experience.",
  "project.category.wiboost": "Digital services website",
  "project.description.wiboost":
    "A website for social media boosting, game top-up, data packages, and premium apps with a lightweight look, mobile-friendly flow, and clear buying path.",
  "project.category.ahawi": "Portfolio website",
  "project.description.ahawi":
    "A personal portfolio website for presenting professional profile, experience, activities, certificates, and contact in a responsive visual layout.",
  "project.category.abdi": "Database management website",
  "project.description.abdi":
    "An abdi dalem database management portal for registration, biodata management, verification, and ID card printing with an official and easy-to-use interface.",
  "project.detail": "Project detail",
  "project.close": "Close project detail",
  "project.view": "View detail",
  "project.consult": "Consult similar project",
  "project.media.mockup": "Mockup photo",
  "project.media.ecoswap.landing": "Ecoswap landing page",
  "project.media.ecoswap.content": "Ecoswap website content",
  "project.media.wiboost.landing": "Wiboost Store landing page",
  "project.media.wiboost.content": "Wiboost Store website content",
  "project.media.ahawi.video": "AHAWI Portfolio video",
  "project.media.abdi.landing": "Abdi Dalem landing page",
  "project.media.abdi.content": "Abdi Dalem website content",
};

let currentLanguage: Language = "id";
let initialized = false;
const subscribers = new Set<() => void>();

function emitLanguage() {
  subscribers.forEach((callback) => callback());
}

function applyLanguage(language: Language) {
  currentLanguage = language;

  if (typeof window === "undefined") {
    return;
  }

  document.documentElement.setAttribute("lang", language);
  window.localStorage.setItem(storageKey, language);
}

function initializeLanguage() {
  if (initialized || typeof window === "undefined") {
    return;
  }

  initialized = true;
  const savedLanguage = window.localStorage.getItem(storageKey);

  if (savedLanguage === "id" || savedLanguage === "en") {
    currentLanguage = savedLanguage;
  }

  document.documentElement.setAttribute("lang", currentLanguage);
}

function subscribe(callback: () => void) {
  subscribers.add(callback);
  const beforeInitialize = currentLanguage;

  initializeLanguage();

  if (beforeInitialize !== currentLanguage) {
    queueMicrotask(emitLanguage);
  }

  return () => {
    subscribers.delete(callback);
  };
}

function getSnapshot() {
  return currentLanguage;
}

function getServerSnapshot() {
  return "id" as const;
}

export function setLanguage(language: Language) {
  if (language === currentLanguage) {
    return;
  }

  applyLanguage(language);
  emitLanguage();
}

export function useLanguage() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function getLocalizedText(id: string, fallback: string, language: Language) {
  if (language === "id") {
    return fallback;
  }

  return englishText[id] ?? fallback;
}

export function useLocalizedText(id: string, fallback: string) {
  const language = useLanguage();

  return getLocalizedText(id, fallback, language);
}

export function LocalizedText({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  const language = useLanguage();

  if (language === "id") {
    return <>{children}</>;
  }

  return <>{englishText[id] ?? children}</>;
}
