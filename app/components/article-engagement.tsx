"use client";

import { useEffect, useState } from "react";
import { useLanguage, useLocalizedText } from "./i18n";
import { countsOf, useLiveStats, type Counts } from "./live-stats";

const viewedKey = (id: string) => `nc-viewed:${id}`;
const likedKey = (id: string) => `nc-liked:${id}`;
const sharedKey = (id: string, platform: string) => `nc-shared:${id}:${platform}`;

async function send(id: string, action: "view" | "like" | "unlike" | "share"): Promise<Counts | null> {
  try {
    const response = await fetch(`/api/articles/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });

    return response.ok ? ((await response.json()) as Counts) : null;
  } catch {
    return null;
  }
}

const iconProps = {
  "aria-hidden": true,
  className: "h-5 w-5",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 2,
  viewBox: "0 0 24 24",
} as const;

const brandIcons: Record<string, string> = {
  whatsapp:
    "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
  facebook:
    "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  x: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  telegram:
    "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
};

const shareButton =
  "grid h-10 w-10 place-items-center rounded-full border border-white/15 text-slate-300 transition hover:border-brand-cyan hover:bg-brand-cyan hover:text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-cyan";

/** View count, like button and social share links shown under an article. */
export default function ArticleEngagement({ id, title, url }: { id: string; title: string; url: string }) {
  const language = useLanguage();
  const numberLocale = language === "id" ? "id-ID" : language;
  const viewsLabel = useLocalizedText("engage.views", "Dibaca");
  const likeLabel = useLocalizedText("engage.like", "Suka");
  const sharesLabel = useLocalizedText("engage.shares", "Dibagikan");
  const copyLabel = useLocalizedText("engage.copyLink", "Salin tautan");
  const copiedLabel = useLocalizedText("engage.copied", "Tersalin");
  const copiedStatus = useLocalizedText("engage.copiedStatus", "Tautan disalin");
  const copyPrompt = useLocalizedText("engage.copyPrompt", "Salin tautan artikel:");
  const shareVia = useLocalizedText("engage.shareVia", "Bagikan lewat {name}");
  const { counts: allCounts, setCountsFor } = useLiveStats();
  const counts = countsOf(allCounts, id);
  const setCounts = (next: Counts | ((current: Counts) => Counts)) => setCountsFor(id, next);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLiked(window.localStorage.getItem(likedKey(id)) === "1");

      // Each browser is counted as a reader once per article.
      if (!window.localStorage.getItem(viewedKey(id))) {
        window.localStorage.setItem(viewedKey(id), "1");

        const recorded = await send(id, "view");

        if (recorded && !cancelled) {
          setCountsFor(id, recorded);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [id, setCountsFor]);

  async function toggleLike() {
    const next = !liked;

    setLiked(next);
    setCounts((current) => ({ ...current, likes: Math.max(0, current.likes + (next ? 1 : -1)) }));

    if (next) {
      window.localStorage.setItem(likedKey(id), "1");
    } else {
      window.localStorage.removeItem(likedKey(id));
    }

    const result = await send(id, next ? "like" : "unlike");

    if (result) {
      setCounts(result);
    }
  }

  /** Each browser counts once per article and platform. */
  async function countShare(platform: string) {
    if (window.localStorage.getItem(sharedKey(id, platform))) {
      return;
    }

    window.localStorage.setItem(sharedKey(id, platform), "1");
    setCounts((current) => ({ ...current, shares: current.shares + 1 }));

    const result = await send(id, "share");

    if (result) {
      setCounts(result);
    }
  }

  async function copyLink() {
    void countShare("copy");

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt(copyPrompt, url);
    }
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const shares = [
    { name: "WhatsApp", icon: "whatsapp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
    { name: "Facebook", icon: "facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { name: "X", icon: "x", href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` },
    { name: "LinkedIn", icon: "linkedin", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { name: "Telegram", icon: "telegram", href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}` },
  ];
  const format = (value: number | undefined) => (value ?? 0).toLocaleString(numberLocale);

  return (
    <div translate="no" className="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-white/10 pt-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-bold text-slate-300" title={viewsLabel}>
          <svg {...iconProps} className="h-5 w-5">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span className="sr-only">{viewsLabel}</span>
          {format(counts.views)}
        </span>
        <button
          type="button"
          aria-pressed={liked}
          onClick={() => void toggleLike()}
          className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-brand-cyan ${
            liked
              ? "border-brand-coral bg-brand-coral/15 text-brand-coral"
              : "border-white/15 text-slate-300 hover:border-brand-coral hover:text-brand-coral"
          }`}
        >
          <svg {...iconProps} className="h-5 w-5" fill={liked ? "currentColor" : "none"}>
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <span className="sr-only">{likeLabel}</span>
          {format(counts.likes)}
        </button>
        <span className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-bold text-slate-300" title={sharesLabel}>
          <svg {...iconProps} className="h-5 w-5">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
          </svg>
          <span className="sr-only">{sharesLabel}</span>
          {format(counts.shares)}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {shares.map((share) => (
          <a
            key={share.name}
            href={share.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={shareVia.replace("{name}", share.name)}
            title={share.name}
            onClick={() => void countShare(share.icon)}
            className={shareButton}
          >
            <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d={brandIcons[share.icon]} />
            </svg>
          </a>
        ))}
        <button type="button" aria-label={copyLabel} title={copied ? copiedLabel : copyLabel} onClick={() => void copyLink()} className={shareButton}>
          {copied ? (
            <svg {...iconProps} className="h-4 w-4">
              <path d="m5 12 5 5L20 7" />
            </svg>
          ) : (
            <svg {...iconProps} className="h-4 w-4">
              <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
              <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" />
            </svg>
          )}
        </button>
        <span role="status" className="sr-only">
          {copied ? copiedStatus : ""}
        </span>
      </div>
    </div>
  );
}
