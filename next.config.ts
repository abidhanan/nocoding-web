import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
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

    return [
      {
        source: "/projects/:path*",
        headers: immutableAssetHeaders,
      },
      {
        source: "/nocoding-logo.webp",
        headers: immutableAssetHeaders,
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
    qualities: [75],
  },
  experimental: {
    // Inline the (small, atomic Tailwind) CSS into the HTML <head> to remove the
    // render-blocking stylesheet request and improve first paint. Production only.
    inlineCss: true,
  },
};

export default nextConfig;
