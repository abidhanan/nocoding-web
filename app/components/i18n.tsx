"use client";

import { useSyncExternalStore } from "react";

export type Language = "id" | "en";

const storageKey = "nocoding-language";

export const englishText: Record<string, string> = {
  "skip.content": "Skip to content",
  "nav.home": "Home",
  "nav.services": "Services",
  "nav.process": "Process",
  "nav.project": "Project",
  "nav.package": "Pricing",
  "nav.faq": "FAQ",
  "nav.contact": "Contact",
  "hero.description.line1": "Website, app, and automation development",
  "hero.description.line2": "that is fast, affordable, and satisfying.",
  "hero.cta.contact": "Free consultation",
  "hero.cta.services": "View services",
  "hero.stat.turnaround.value": "1-3 days",
  "hero.stat.turnaround": "project turnaround",
  "hero.stat.freedom": "free requests as you wish",
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
  "services.0.title": "Personal portfolio / CV",
  "services.0.description":
    "A portfolio website or personal CV to present your profile, experience, and work professionally.",
  "services.0.item.0": "Profile & experience",
  "services.0.item.1": "Work gallery",
  "services.0.item.2": "Downloadable CV",
  "services.0.item.3": "And more",
  "services.1.title": "Landing page or company profile",
  "services.1.description":
    "A landing page or company profile that launches fast, looks convincing, and is ready to attract clients.",
  "services.1.item.0": "Page copywriting",
  "services.1.item.1": "Responsive and interactive design",
  "services.1.item.2": "SEO setup",
  "services.1.item.3": "And more",
  "services.2.title": "Information & operational system",
  "services.2.description":
    "Dashboards, portals, and internal systems to manage your data and day-to-day business operations.",
  "services.2.item.0": "Clean workflow",
  "services.2.item.1": "User roles",
  "services.2.item.2": "Data export",
  "services.2.item.3": "And more",
  "services.3.title": "Automation",
  "services.3.description":
    "Automate repetitive processes like notifications, tool integrations, and workflows so your team saves time.",
  "services.3.item.0": "Tool integration",
  "services.3.item.1": "Automatic notifications",
  "services.3.item.2": "Automated workflows",
  "services.3.item.3": "And more",
  "process.eyebrow": "Process",
  "process.description":
    "Every phase has outputs you can see, test, and approve. You know exactly where the work is moving.",
  "process.0.title": "Needs audit",
  "process.0.description":
    "We map business goals, visual references, core features, and work priorities.",
  "process.1.title": "Design review",
  "process.1.description":
    "Structure, design, and flow are reviewed and approved together before production.",
  "process.2.title": "Development",
  "process.2.description":
    "The website, app, or automation is built responsively based on the approved design.",
  "process.3.title": "Result review",
  "process.3.description":
    "The result is reviewed together, revised if needed, and tested until it is ready to go live.",
  "process.4.title": "Launch & handover",
  "process.4.description":
    "The product is published, metadata & SEO are set, then access and guidance are handed over to you.",
  "projects.eyebrow": "Previous Projects",
  "projects.description":
    "Each project is designed to communicate business messages clearly, stay responsive on every device, and make it easier for users to take action.",
  "packages.eyebrow": "Pricing",
  "packages.description":
    "Pricing can be adjusted after the consultation session so budget, timeline, and results stay realistic.",
  "packages.price.from": "Start from",
  "packages.price.period": "/ year",
  "packages.0.name": "Small",
  "packages.1.name": "Big",
  "packages.0.price": "IDR 500K",
  "packages.0.description": "A portfolio, personal CV, or simple landing page website that launches quickly.",
  "packages.0.feature.0": "Portfolio / CV / landing page",
  "packages.0.feature.1": "Responsive design",
  "packages.0.feature.2": "Technical SEO",
  "packages.0.feature.3": "Contact form",
  "packages.0.feature.4": "Free maintenance + domain for 1 year",
  "packages.1.price": "IDR 2M",
  "packages.1.description": "Company profile, information & operational system, or automation tailored to your needs.",
  "packages.1.feature.0": "Multi-page website / app",
  "packages.1.feature.1": "Information & operational system",
  "packages.1.feature.2": "Business process automation",
  "packages.1.feature.3": "User roles & access",
  "packages.1.feature.4": "Free maintenance + hosting for 1 year",
  "packages.select": "Select",
  "faq.eyebrow": "FAQ",
  "faq.title": "Questions that usually come up before starting.",
  "faq.description":
    "If your question has not been answered here, a consultation session can help determine your needs.",
  "faq.0.question": "What services can Nocoding create?",
  "faq.0.answer":
    "We create personal portfolio or CV websites, landing pages or company profiles, information and operational systems, and business process automation.",
  "faq.1.question": "How long does the development process take?",
  "faq.1.answer":
    "A personal portfolio, CV, or simple landing page usually takes 1-3 working days after the materials are ready. Larger projects depend on feature needs, integrations, and feedback rhythm.",
  "faq.2.question": "Can the design and features be customized?",
  "faq.2.answer":
    "Yes. The design, page structure, features, and workflow can be tailored to your needs. The design will be reviewed together before development begins.",
  "faq.3.question": "What is included in the pricing?",
  "faq.3.answer":
    "Pricing covers development based on the agreed package and scope. The Small package includes free maintenance and domain for 1 year, while the Big package includes free maintenance and hosting for 1 year.",
  "contact.eyebrow": "Start Project",
  "contact.title": "Tell us your website needs. We will help clean up the path.",
  "contact.description":
    "Send a short overview of your business, target pages, and desired timeline. The first reply will include scope recommendations and next steps.",
  "contact.whatsapp": "Consult now",
  "contact.package": "Compare pricing",
  "footer.tagline": "Business websites ready to launch, look serious, and are easy to grow.",
  "footer.contact": "Contact",
  "footer.connect": "Let's Connect",
  "footer.copyright": "(c) 2026 Nocoding - All rights reserved.",
  "footer.copyright.prefix": "© 2026 Nocoding - Created by",
  "project.category.ecoswap": "Used goods marketplace website",
  "project.description.ecoswap":
    "A pre-loved marketplace built with PHP and MySQL that helps users sell and buy used goods with a modern, responsive look.",
  "project.category.wiboost": "Digital services website",
  "project.description.wiboost":
    "A Laravel-based digital services store with products and stock, wallet deposits, refunds, reseller commissions, email campaigns, and an admin panel.",
  "project.category.ahawi": "Portfolio website",
  "project.description.ahawi":
    "A bilingual watercolor-themed portfolio built with Next.js and React to present profile, experience, and contact in a responsive layout.",
  "project.category.abdi": "Database management website",
  "project.description.abdi":
    "A Laravel-based portal for abdi dalem registration, biodata, activities, attendance, verification, and ID card printing.",
  "project.category.sfarm": "Farm management app",
  "project.description.sfarm":
    "A web app for a village-owned layer hen and goat farm to handle daily monitoring, sales, expenses, and financial reports.",
  "project.category.payu": "Freelance bounty platform",
  "project.description.payu":
    "A freelance bounty platform with admin, sponsor, and freelancer roles, QRIS payments, and light and dark modes.",
  "project.category.darcasual": "Product catalog website",
  "project.description.darcasual":
    "A single-page catalog with over a thousand products, filters, product details, and direct ordering via WhatsApp.",
  "project.category.ianprem": "Premium apps store website",
  "project.description.ianprem":
    "A premium app accounts store with admin and user roles, product and stock management, and a sales dashboard built on Next.js and Supabase.",
  "project.category.alengka": "Furniture catalog website",
  "project.description.alengka":
    "A custom indoor and outdoor furniture catalog for cafes, restaurants, and homes, responsive on every device and linked to WhatsApp.",
  "project.category.sdn": "School profile website",
  "project.description.sdn":
    "The official website of SD Negeri Pucangsawit in Surakarta with school profile, admission info, teacher directory, extracurriculars, and student achievements.",
  "project.category.furnix": "Furniture catalog website",
  "project.description.furnix":
    "An iron furniture catalog from Jepara for cafes, restaurants, and homes, with product filters and custom ordering.",
  "project.category.clothique": "Fashion e-commerce website",
  "project.description.clothique":
    "A Laravel e-commerce store with catalog, cart, checkout, Duitku payments, blog, financial reports, and a role-based admin panel.",
  "project.category.agli": "Content intelligence platform",
  "project.description.agli":
    "A content research prototype for Amsterdam Game Lab that ranks high-performing content and drafts grounded, data-based copy.",
  "project.category.nebulist": "AI sales app",
  "project.description.nebulist":
    "An AI sales research MVP that generates strategy, CRM entries, and outreach drafts from product input, built with Next.js.",
  "project.category.carbonfi": "Web3 finance app",
  "project.description.carbonfi":
    "A blockchain carbon finance platform for carbon credit trading, NFT mining, and DeFi staking.",
  "project.category.protectedpay": "Web3 payments app",
  "project.description.protectedpay":
    "A secure crypto transfer app on the Lisk network with escrow protection, group payments, and smart savings.",
  "project.category.pedulichain": "Web3 charity app",
  "project.description.pedulichain":
    "A transparent charity platform on blockchain with fund tracking, community governance, and immutable proof of impact.",
  "project.category.astra": "AI-powered web3 app",
  "project.description.astra":
    "An AI agent for the Lisk network that deploys contracts, sends tokens, and creates NFTs through chat commands.",
  "project.category.auditfi": "Smart contract security app",
  "project.description.auditfi":
    "AI-powered smart contract security auditing that catches vulnerabilities, generates audit reports, and stores results onchain.",
  "project.category.p2p": "Web3 exchange app",
  "project.description.p2p":
    "A peer-to-peer decentralized exchange frontend with escrow, an admin dashboard, and multi-chain support.",
  "project.category.payguppy": "Web3 payments app",
  "project.description.payguppy":
    "A web3 app that lets traditional businesses accept crypto payments through their existing QR codes.",
  "project.category.tiptap": "Web3 creator app",
  "project.description.tiptap":
    "A decentralized tipping platform for content creators with crypto and NFT support and stream alerts.",
  "project.category.senkus": "Web3 game",
  "project.description.senkus":
    "A science-themed web3 game on the Lisk network with NFT collectibles, tokens, and a game arena.",
  "project.category.quickstock": "Desktop inventory app",
  "project.description.quickstock":
    "A Java desktop app for managing clothing store inventory with role-based access, sales tracking, suppliers, and stock reports.",
  "project.category.caer": "Web3 lending app",
  "project.description.caer":
    "A cross-chain lending and borrowing protocol with native support for the IDRX rupiah stablecoin in the Lisk ecosystem.",
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
