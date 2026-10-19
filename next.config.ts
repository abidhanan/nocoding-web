import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    // The Tailwind stylesheet is small: shipping it with the HTML removes a render-blocking request.
    inlineCss: true,
  },
  async headers() {
    const immutableAssetHeaders = [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, immutable",
      },
      {
        key: "Cloudflare-CDN-Cache-Control",
        value: "public, max-age=31536000, immutable",
      },
    ];

    // Translations change rarely: a day in the browser, a week more while it refreshes in the background.
    const dictionaryHeaders = [
      { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
      { key: "Cloudflare-CDN-Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
    ];

    return [
      {
        source: "/i18n/:path*",
        headers: dictionaryHeaders,
      },
      {
        source: "/flags/:path*",
        headers: immutableAssetHeaders,
      },
      {
        source: "/projects/:path*",
        headers: immutableAssetHeaders,
      },
      {
        source: "/nocoding-logo.webp",
        headers: immutableAssetHeaders,
      },
      {
        // Page HTML: `no-transform` stops Cloudflare from re-encoding Vercel's
        // Brotli response as zstd, which Lighthouse mis-measures as uncompressed.
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate, no-transform",
          },
        ],
      },
      {
        source: "/artikel",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate, no-transform",
          },
        ],
      },
      {
        source: "/artikel/:slug",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate, no-transform",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 1080, 1920],
    imageSizes: [96, 256, 384, 640],
    qualities: [75],
  },
};

export default nextConfig;
