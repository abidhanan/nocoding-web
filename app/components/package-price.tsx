"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { currencyForCountry, isMonthlyCountry } from "../../lib/pricing";
import { useLocalizedText } from "./i18n";
import { LocalizedText } from "./localized-text";

// ---------- who is looking: country, currency and billing period ----------

type Pricing = {
  status: "idle" | "loading" | "ready";
  country: string;
  currency: string;
  /** Amount of that currency for one rupiah. */
  rate: number;
  monthly: boolean;
};

const storageKey = "nocoding-pricing";
const idle: Pricing = { status: "idle", country: "ID", currency: "IDR", rate: 1, monthly: false };

let pricing: Pricing = idle;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function publish(next: Pricing) {
  pricing = next;
  listeners.forEach((listener) => listener());
}

function regionOfBrowser() {
  const tag = [...navigator.languages, navigator.language].find((value) => /-[A-Za-z]{2}\b/.test(value ?? ""));
  const match = tag?.match(/-([A-Za-z]{2})\b/);

  return match ? match[1].toUpperCase() : null;
}

async function resolve(): Promise<Pricing> {
  let country: string | null = null;

  try {
    const geo = (await (await fetch("/api/geo", { cache: "no-store" })).json()) as { country: string | null };

    country = geo.country;
  } catch {
    country = null;
  }

  country ??= regionOfBrowser() ?? "ID";

  if (country === "ID") {
    return { status: "ready", country, currency: "IDR", rate: 1, monthly: false };
  }

  let rates: Record<string, number> = {};

  try {
    rates = ((await (await fetch("/api/rates")).json()) as { rates: Record<string, number> }).rates;
  } catch {
    rates = {};
  }

  const wanted = currencyForCountry(country);
  const currency = rates[wanted] ? wanted : "USD";

  return { status: "ready", country, currency, rate: rates[currency] ?? 0.000061, monthly: isMonthlyCountry(country) };
}

/** Works out the visitor's currency once (reused for the rest of the browser session). */
function ensurePricing() {
  if (pricing.status !== "idle") {
    return;
  }

  try {
    const saved = window.sessionStorage.getItem(storageKey);

    if (saved) {
      publish(JSON.parse(saved) as Pricing);

      return;
    }
  } catch {
    // Carry on without the saved copy.
  }

  publish({ ...idle, status: "loading" });

  void resolve().then((next) => {
    try {
      window.sessionStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // Not saved: it is simply worked out again on the next page.
    }

    publish(next);
  });
}

export function usePricing() {
  return useSyncExternalStore(
    subscribe,
    () => pricing,
    () => idle,
  );
}

function formatMoney(amount: number, currency: string) {
  const locale = typeof navigator === "undefined" ? "en" : navigator.language || "en";

  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

const converted = (state: Pricing) => state.status === "ready" && state.country !== "ID";

// ---------- what the package cards show ----------

/**
 * The price line of a package card. Indonesian visitors see rupiah per year as written; everyone else
 * sees their own currency, and visitors in Europe and the Americas see the amount per month.
 */
export function PackagePrice({ amount, priceId, fallback }: { amount: number; priceId: string; fallback: string }) {
  const state = usePricing();
  const line = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = line.current;

    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          ensurePricing();
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  if (!converted(state)) {
    return (
      <p ref={line} className="mt-1 text-3xl font-black text-white">
        <LocalizedText key="base-price" id={priceId}>{fallback}</LocalizedText>
        <span key="base-period" className="ml-1 text-sm font-semibold text-slate-400">
          <LocalizedText id="packages.price.period">/ tahun</LocalizedText>
        </span>
      </p>
    );
  }

  // Visitors in Europe and the Americas see the same amount (Rp 500 thousand / Rp 2 million) per month.
  const value = amount * state.rate;

  return (
    <p ref={line} className="mt-1 text-3xl font-black text-white">
      <span key="converted-price" translate="no">
        {formatMoney(value, state.currency)}
      </span>
      {/* Fresh elements (keys) so the language controller translates the new label as it mounts. */}
      <span key={state.monthly ? "converted-month" : "converted-year"} className="ml-1 text-sm font-semibold text-slate-400">
        {state.monthly ? (
          <LocalizedText id="packages.price.periodMonth">/ bulan</LocalizedText>
        ) : (
          <LocalizedText id="packages.price.period">/ tahun</LocalizedText>
        )}
      </span>
    </p>
  );
}

/** Small note under the cards explaining the converted prices. Empty for Indonesian visitors. */
export function PricingNote() {
  const state = usePricing();
  const period = useLocalizedText(state.monthly ? "pricing.perMonth" : "pricing.perYear", state.monthly ? "per bulan" : "per tahun");
  const template = useLocalizedText(
    "pricing.note",
    "Harga ditampilkan dalam {currency} {period}, dikonversi dengan perkiraan kurs hari ini ({source}). Nilai akhir disepakati bersama Anda lewat WhatsApp.",
  );

  if (!converted(state)) {
    return null;
  }

  const [before, afterCurrency = ""] = template.split("{currency}");
  const [between, afterPeriod = ""] = afterCurrency.split("{period}");
  const [beforeSource, afterSource = ""] = afterPeriod.split("{source}");

  return (
    <p className="mx-auto mt-6 w-full max-w-[21.5rem] text-center text-xs leading-5 text-slate-500 sm:max-w-3xl">
      {before}
      <span translate="no">{state.currency}</span>
      {between}
      {period}
      {beforeSource}
      <a
        href="https://www.exchangerate-api.com"
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-slate-600 underline-offset-2 transition hover:text-brand-cyan"
      >
        Rates By Exchange Rate API
      </a>
      {afterSource}
    </p>
  );
}
