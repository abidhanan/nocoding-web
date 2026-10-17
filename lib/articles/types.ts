export type Block =
  | { id: string; type: "h2" | "h3" | "p" | "quote"; text: string }
  | { id: string; type: "ul" | "ol"; items: string[] }
  | { id: string; type: "image"; src: string; alt: string; caption?: string }
  | { id: string; type: "cta"; text?: string };

export type ArticleStatus = "published" | "draft";

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** An article can belong to several categories. */
  categories: string[];
  cover: { src: string; alt: string; caption?: string } | null;
  status: ArticleStatus;
  /** ISO date the article went (or goes) live. */
  publishedAt: string;
  updatedAt: string;
  author: string;
  blocks: Block[];
};

/** What the editor sends to the server when saving. */
export type ArticleInput = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  categories: string[];
  cover: { src: string; alt: string; caption?: string } | null;
  status: ArticleStatus;
  blocks: Block[];
};
