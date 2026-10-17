import Image from "next/image";
import { LocalizedText } from "./localized-text";
import RevealBlock from "./reveal-block";

export type DetailNote = {
  heading: string;
  headingId: string;
  text: string;
  textId: string;
};

export type DetailBlock = {
  kicker: string;
  kickerId: string;
  title: string;
  titleId: string;
  summary: string;
  summaryId: string;
  body: string;
  bodyId: string;
  listHeading?: string;
  listHeadingId?: string;
  list: Array<{ text: string; id: string }>;
  /** Short outlined tags shown under the checklist. */
  pills?: Array<{ text: string; id: string }>;
  notes: DetailNote[];
  /** Three photos for the collage: one large (portrait), two small (square). */
  collage: [string, string, string];
};

/**
 * Each card of a section becomes its own two-column block (photo collage + text),
 * stacked inside the same section, alternating sides on wide screens, separated by
 * a divider, and animated in as it scrolls into view. On small screens the photos
 * always come after the text.
 */
export default function DetailBlocks({ blocks }: { blocks: DetailBlock[] }) {
  return (
    <div className="mx-auto mt-12 flex w-full max-w-[21.5rem] flex-col gap-14 sm:max-w-6xl sm:gap-20">
      {blocks.map((block, index) => {
        const isOdd = index % 2 === 1;

        return (
          <RevealBlock
            key={block.titleId}
            className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
              index > 0 ? "border-t border-white/15 pt-14 sm:pt-20" : ""
            }`}
          >
            <Collage
              collage={block.collage}
              className={`order-2 ${isOdd ? "lg:order-2" : "lg:order-1"}`}
            />

            <div className={`order-1 text-left ${isOdd ? "lg:order-1" : "lg:order-2"}`}>
              <p className="block-reveal__item text-xs font-black uppercase tracking-[0.2em] text-brand-cyan">
                <LocalizedText id={block.kickerId}>{block.kicker}</LocalizedText> {index + 1}
              </p>
              <h3 className="block-reveal__item mt-3 text-2xl font-black leading-tight text-white sm:text-4xl">
                <LocalizedText id={block.titleId}>{block.title}</LocalizedText>
              </h3>
              <p className="block-reveal__item mt-4 text-base leading-7 text-slate-200">
                <LocalizedText id={block.summaryId}>{block.summary}</LocalizedText>
              </p>
              <p className="block-reveal__item mt-3 text-sm leading-7 text-slate-400">
                <LocalizedText id={block.bodyId}>{block.body}</LocalizedText>
              </p>

              {block.listHeading && block.listHeadingId ? (
                <p className="block-reveal__item mt-6 text-sm font-bold text-white">
                  <LocalizedText id={block.listHeadingId}>{block.listHeading}</LocalizedText>
                </p>
              ) : null}
              <ul className="block-reveal__item mt-3 space-y-2.5">
                {block.list.map((item) => (
                  <li key={item.id} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                    <svg aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-brand-lime" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="m5 12.5 4.5 4.5L19 7.5" />
                    </svg>
                    <LocalizedText id={item.id}>{item.text}</LocalizedText>
                  </li>
                ))}
              </ul>

              {block.pills && block.pills.length > 0 ? (
                <ul className="block-reveal__item mt-6 flex flex-wrap gap-2">
                  {block.pills.map((pill) => (
                    <li
                      key={pill.id}
                      className="rounded-md border border-brand-cyan/40 px-3 py-1.5 text-xs font-bold text-brand-cyan"
                    >
                      <LocalizedText id={pill.id}>{pill.text}</LocalizedText>
                    </li>
                  ))}
                </ul>
              ) : null}

              {block.notes.length > 0 ? (
                <dl className="block-reveal__item mt-6 grid gap-3">
                  {block.notes.map((note) => (
                    <div key={note.headingId} className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
                      <dt className="text-xs font-black uppercase tracking-wide text-brand-cyan">
                        <LocalizedText id={note.headingId}>{note.heading}</LocalizedText>
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-slate-300">
                        <LocalizedText id={note.textId}>{note.text}</LocalizedText>
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
          </RevealBlock>
        );
      })}
    </div>
  );
}

function Collage({
  collage,
  className = "",
}: {
  collage: DetailBlock["collage"];
  className?: string;
}) {
  const tile = "block-reveal__tile relative overflow-hidden rounded-xl border border-white/10 bg-brand-surface";

  return (
    <div className={`grid aspect-[5/4] grid-cols-5 grid-rows-2 gap-3 ${className}`}>
      <div className={`${tile} col-span-3 row-span-2`} style={{ transitionDelay: "0.05s" }}>
        <Image src={collage[0]} alt="" fill sizes="(min-width: 1024px) 22rem, 62vw" className="object-cover" />
      </div>
      <div className={`${tile} col-span-2`} style={{ transitionDelay: "0.18s" }}>
        <Image src={collage[1]} alt="" fill sizes="(min-width: 1024px) 14rem, 40vw" className="object-cover" />
      </div>
      <div className={`${tile} col-span-2`} style={{ transitionDelay: "0.3s" }}>
        <Image src={collage[2]} alt="" fill sizes="(min-width: 1024px) 14rem, 40vw" className="object-cover" />
      </div>
    </div>
  );
}
