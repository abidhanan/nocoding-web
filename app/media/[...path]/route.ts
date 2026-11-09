import { readImage } from "../../../lib/articles/store";

type Context = { params: Promise<{ path: string[] }> };

/** Serves images uploaded from the admin panel and stored in Cloudflare KV. */
export async function GET(_request: Request, { params }: Context) {
  const { path } = await params;
  const result = await readImage(`media/${path.join("/")}`);

  if (!result) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(result.body, {
    headers: {
      "Content-Type": result.contentType ?? "application/octet-stream",
      "Content-Length": String(result.size),
      // File names carry a random suffix, so a given URL never changes.
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
