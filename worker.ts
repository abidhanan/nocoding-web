import openNextWorker from "./.open-next/worker.js";

type OpenNextWorker = {
  fetch(request: Request, env: CloudflareEnv, ctx: WorkerExecutionContext): Promise<Response>;
};

type WorkerExecutionContext = {
  waitUntil(promise: Promise<unknown>): void;
};

const documentTypes = ["text/html", "text/plain", "application/xml", "application/manifest+json"];

function withDocumentHeaders(response: Response, pathname: string) {
  const headers = new Headers(response.headers);

  headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  headers.set("Cloudflare-CDN-Cache-Control", "public, max-age=300, stale-while-revalidate=86400");
  headers.set("Content-Language", "id");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), browsing-topics=()");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set(
    "X-Robots-Tag",
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  );

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", getDocumentContentType(pathname));
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function isDocumentRequest(request: Request) {
  if (request.method !== "GET") {
    return false;
  }

  const url = new URL(request.url);
  const isInternalPath =
    url.pathname.startsWith("/_next/") ||
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/media/") ||
    url.pathname.startsWith("/cdn-cgi/");

  return (
    !isInternalPath &&
    !request.headers.has("rsc") &&
    !request.headers.has("next-router-state-tree") &&
    !request.headers.has("next-router-prefetch")
  );
}

function withCacheStatus(response: Response, status: "ASSET" | "HIT" | "KV-HIT" | "MISS") {
  const headers = new Headers(response.headers);
  headers.set("Server-Timing", `edge-cache;desc=${status}`);
  headers.set("X-Nocoding-Edge-Cache", status);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function getStaticHtmlPath(pathname: string) {
  if (pathname === "/") return "/index.html";
  if (pathname.includes(".")) return null;
  return `${pathname.replace(/\/$/, "")}.html`;
}

function getDocumentContentType(pathname: string) {
  if (pathname.endsWith(".txt")) return "text/plain; charset=utf-8";
  if (pathname.endsWith(".xml")) return "application/xml; charset=utf-8";
  if (pathname.endsWith(".webmanifest")) return "application/manifest+json; charset=utf-8";
  return "text/html; charset=utf-8";
}

function createCachedDocument(body: string, request: Request) {
  const pathname = new URL(request.url).pathname;

  return new Response(body, {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
      "Content-Language": "id",
      "Content-Type": getDocumentContentType(pathname),
      "Permissions-Policy": "camera=(), microphone=(), geolocation=(), browsing-topics=()",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "X-Robots-Tag": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
  });
}

const edgeWorker = {
  async fetch(request: Request, env: CloudflareEnv, ctx: WorkerExecutionContext) {
    const nextWorker = openNextWorker as OpenNextWorker;

    if (!isDocumentRequest(request)) {
      return nextWorker.fetch(request, env, ctx);
    }

    const url = new URL(request.url);
    const staticHtmlPath = getStaticHtmlPath(url.pathname);

    if (staticHtmlPath) {
      const assetUrl = new URL(staticHtmlPath, request.url);
      const assetResponse = await env.ASSETS.fetch(new Request(assetUrl, { headers: request.headers }));

      if (assetResponse.ok) {
        return withCacheStatus(withDocumentHeaders(assetResponse, url.pathname), "ASSET");
      }
    }

    const cache = (caches as CacheStorage & { default: Cache }).default;
    const cached = await cache.match(request);

    if (cached) {
      return withCacheStatus(cached, "HIT");
    }

    const kvKey = `edge-document:v1:${url.host}${url.pathname}${url.search}`;
    const kvCached = await env.MEDIA_KV.get(kvKey, "text");

    if (kvCached) {
      const kvResponse = createCachedDocument(kvCached, request);
      ctx.waitUntil(cache.put(request, kvResponse.clone()));
      return withCacheStatus(kvResponse, "KV-HIT");
    }

    const response = await nextWorker.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") ?? "";
    const cacheControl = response.headers.get("cache-control") ?? "";
    const isCacheable =
      response.status === 200 &&
      documentTypes.some((type) => contentType.includes(type)) &&
      !cacheControl.includes("private") &&
      !cacheControl.includes("no-store") &&
      !response.headers.has("set-cookie");

    if (!isCacheable) {
      return response;
    }

    const kvBody = response.clone().text();
    const cacheHeaders = new Headers(response.headers);
    cacheHeaders.set("Cache-Control", "public, max-age=0, s-maxage=300, stale-while-revalidate=86400");
    const cacheableResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: cacheHeaders,
    });

    ctx.waitUntil(
      Promise.all([
        cache.put(request, cacheableResponse.clone()),
        kvBody.then((body) => env.MEDIA_KV.put(kvKey, body, { expirationTtl: 300 })),
      ]).then(() => undefined),
    );
    return withCacheStatus(cacheableResponse, "MISS");
  },
};

export default edgeWorker;
