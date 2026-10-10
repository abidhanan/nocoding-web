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
    deviceSizes: [640, 1080, 1920],
    imageSizes: [96, 256, 384, 640],
    qualities: [75],
  },
};

export default nextConfig;
