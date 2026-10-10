// Exports every scene from app/components/illustrations.tsx to a static SVG in
// public/illustrations/. Run after editing a scene:
//   npx tsx scripts/generate-illustrations.tsx
import { mkdirSync, writeFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { scenes, type IllustrationName } from "../app/components/illustrations";

const outDir = new URL("../public/illustrations/", import.meta.url);

mkdirSync(outDir, { recursive: true });

for (const name of Object.keys(scenes) as IllustrationName[]) {
  const body = renderToStaticMarkup(<>{scenes[name]}</>);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid meet">${body}</svg>\n`;

  writeFileSync(new URL(`${name}.svg`, outDir), svg);
}

console.log(`Wrote ${Object.keys(scenes).length} illustrations to public/illustrations/`);
