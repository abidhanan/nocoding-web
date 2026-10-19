"use client";

import { useEffect } from "react";
import { useLocalizedText } from "./i18n";

/** Keeps the browser tab title ("Page - Nocoding") in the visitor's language. */
export default function DocumentTitle({ id, fallback }: { id: string; fallback: string }) {
  const text = useLocalizedText(id, fallback);

  useEffect(() => {
    document.title = `${text} - Nocoding`;
  }, [text]);

  return null;
}
