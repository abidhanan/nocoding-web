import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
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
      ...["/", "/artikel", "/artikel/:slug"].map((source) => ({
        source,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
          },
          {
            key: "Cloudflare-CDN-Cache-Control",
            value: "public, max-age=300, stale-while-revalidate=86400",
          },
          { key: "Content-Language", value: "id" },
          {
            key: "X-Robots-Tag",
            value: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
          },
        ],
      })),
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
