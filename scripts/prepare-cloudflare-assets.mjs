import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const sourceRoot = path.join(process.cwd(), ".next", "server", "app");
const destinationRoot = path.join(process.cwd(), ".open-next", "assets");
let copied = 0;

async function copyHtml(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const source = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await copyHtml(source);
      continue;
    }

    if (!entry.name.endsWith(".html") || entry.name.startsWith("_")) {
      continue;
    }

    const relativePath = path.relative(sourceRoot, source);
    const destination = path.join(destinationRoot, relativePath);
    const html = await readFile(source, "utf8");
    const hydrationScripts = [];
    const htmlWithoutHydrationPayload = html.replace(
      /<script>(self\.__next_f\.push\(\[1,[\s\S]*?\))<\/script>/g,
      (_, script) => {
        hydrationScripts.push(script);
        return "";
      },
    );
    const hydrationRelativePath = path.join("__next_hydration", relativePath).replace(/\.html$/, ".js");
    const hydrationDestination = path.join(destinationRoot, hydrationRelativePath);
    const hydrationUrl = `/${hydrationRelativePath.split(path.sep).join("/")}`;
    const hydrationPreload = hydrationScripts.length
      ? `<link rel="preload" as="script" href="${hydrationUrl}">`
      : "";
    const hydrationTag = hydrationScripts.length ? `<script src="${hydrationUrl}"></script>` : "";
    const preparedHtml = htmlWithoutHydrationPayload.replace(
      /(<script\b[^>]*\bsrc="[^"]+"[^>]*)\sasync=""/g,
      "$1 defer=\"\"",
    )
      .replace("</head>", `${hydrationPreload}</head>`)
      .replace("</body>", `${hydrationTag}</body>`);

    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, preparedHtml);
    if (hydrationScripts.length) {
      await mkdir(path.dirname(hydrationDestination), { recursive: true });
      await writeFile(hydrationDestination, `${hydrationScripts.join(";\n")};\n`);
    }
    copied += 1;
  }
}

await copyHtml(sourceRoot);
console.log(`Prepared ${copied} static HTML documents for Cloudflare Assets.`);
