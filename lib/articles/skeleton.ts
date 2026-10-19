import type { Block } from "./types";

/**
 * The article body without its words (everything but the text): small enough to send to the browser,
 * and enough to rebuild the article from any translation.
 */
export function skeletonOf(blocks: Block[]): Block[] {
  return blocks.map((block) => {
    switch (block.type) {
      case "ul":
      case "ol":
        return { ...block, items: block.items.map(() => "") };
      case "image":
        return { ...block, alt: "", caption: undefined };
      case "cta":
        return { id: block.id, type: "cta" };
      default:
        return { ...block, text: "" };
    }
  });
}
