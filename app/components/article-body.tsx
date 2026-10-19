import Image from "next/image";
import type { ReactNode } from "react";
import ImageWatermark from "./image-watermark";
import { photoCredits } from "../../lib/articles/photo-credits";
import { LocalizedText } from "./localized-text";
import { createWhatsAppHref } from "./projects-data";
import type { Block } from "../../lib/articles/types";

const SAFE_URL = /^(https?:\/\/|mailto:|tel:|\/)/i;

/**
 * Turns the tiny writing syntax used in the editor into React nodes:
 * **bold**, [link text](https://example.com) and line breaks. Nothing is ever injected as raw HTML.
 */
export function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;
  let last = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  const pushText = (value: string) => {
    value.split("\n").forEach((line, index) => {
      if (index > 0) {
        nodes.push(<br key={`br-${key++}`} />);
      }

      if (line) {
        nodes.push(line);
      }
    });
  };

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      pushText(text.slice(last, match.index));
    }

    const token = match[0];

    if (token.startsWith("**")) {
      nodes.push(
        <strong key={`b-${key++}`} className="font-bold text-white">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      const [, label, url] = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(token) ?? [];

      if (label && url && SAFE_URL.test(url)) {
        const external = /^https?:\/\//i.test(url);

        nodes.push(
          <a
            key={`a-${key++}`}
            href={url}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="font-semibold text-brand-cyan underline decoration-brand-cyan/40 underline-offset-4 transition hover:text-brand-lime"
          >
            {label}
          </a>,
        );
      } else {
        pushText(token);
      }
    }

    last = match.index + token.length;
  }

  if (last < text.length) {
    pushText(text.slice(last));
  }

  return nodes;
}

const consultHref = createWhatsAppHref("Halo Nocoding, saya membaca artikel di website dan ingin konsultasi. Mohon info langkah berikutnya.");

/** Renders the article blocks with the site's typography. Used on the public page and in the editor preview. */
export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="text-base text-slate-300 sm:text-lg">
      {blocks.map((block) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={block.id} id={`s-${block.id}`} className="mb-4 mt-12 scroll-mt-24 text-2xl font-black leading-tight text-white sm:text-3xl">
                {renderInline(block.text)}
              </h2>
            );
          case "h3":
            return (
              <h3 key={block.id} className="mb-3 mt-8 text-xl font-bold leading-snug text-white sm:text-2xl">
                {renderInline(block.text)}
              </h3>
            );
          case "p":
            return (
              <p key={block.id} className="mb-6 text-justify leading-8">
                {renderInline(block.text)}
              </p>
            );
          case "quote":
            return (
              <blockquote
                key={block.id}
                className="my-8 rounded-r-xl border-l-4 border-brand-cyan bg-brand-cyan/[0.06] px-6 py-5 text-xl font-semibold leading-8 text-white"
              >
                {renderInline(block.text)}
              </blockquote>
            );
          case "ul":
          case "ol": {
            const Tag = block.type;

            return (
              <Tag
                key={block.id}
                className={`mb-6 space-y-3 pl-6 leading-8 marker:font-bold marker:text-brand-cyan ${
                  block.type === "ul" ? "list-disc" : "list-decimal"
                }`}
              >
                {block.items.map((item, index) => (
                  <li key={`${block.id}-${index}`} className="pl-1 text-justify">
                    {renderInline(item)}
                  </li>
                ))}
              </Tag>
            );
          }
          case "image":
            return (
              <figure key={block.id} className="my-8">
                <div className="relative">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    width={1200}
                    height={675}
                    sizes="(min-width: 768px) 46rem, 100vw"
                    className="h-auto w-full rounded-xl border border-white/10 bg-brand-surface"
                  />
                  <ImageWatermark size="md" />
                </div>
                {block.caption || block.alt ? (
                  <figcaption className="mt-3 text-center text-sm text-slate-400">{block.caption || block.alt}</figcaption>
                ) : null}
                <PhotoCredit src={block.src} />
              </figure>
            );
          // The WhatsApp call-to-action is shown below the article, see CtaBox.
          case "cta":
            return null;
          default:
            return null;
        }
      })}
    </div>
  );
}

/** "Consult for free" box shown under an article, above the list of other articles. */
export function CtaBox({ children }: { children: ReactNode }) {
  return (
    <aside className="rounded-2xl border border-brand-cyan/30 bg-gradient-to-br from-brand-surface to-brand-night p-6 text-center sm:p-8">
      <p className="text-xl font-black leading-snug text-white sm:text-2xl">{children}</p>
      <a
        href={consultHref}
        data-i18n-wa="wa.article"
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-bold text-brand-dark transition hover:bg-brand-lime focus:outline-none focus:ring-2 focus:ring-brand-lime focus:ring-offset-2 focus:ring-offset-brand-night"
      >
        <LocalizedText id="articles.ctaButton">Konsultasi Gratis</LocalizedText>
      </a>
    </aside>
  );
}

/** "Sumber foto: Nama / Unsplash", linking to the photo's own page on Unsplash. */
export function PhotoCredit({ src }: { src: string }) {
  const credit = photoCredits[src.split("/").pop() ?? ""];

  if (!credit) {
    return null;
  }

  const link =
    "underline decoration-slate-600 underline-offset-2 transition hover:text-brand-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan";

  return (
    <p className="mt-1 text-center text-xs text-slate-500">
      <LocalizedText id="articles.photoSource">Sumber foto:</LocalizedText>{" "}
      <a
        href={`https://unsplash.com/photos/${credit.page}?utm_source=nocoding&utm_medium=referral`}
        target="_blank"
        rel="noopener noreferrer"
        className={link}
      >
        {credit.by}
      </a>
    </p>
  );
}
