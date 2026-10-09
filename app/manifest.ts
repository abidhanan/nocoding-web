import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nocoding - Jasa Pembuatan Website Profesional",
    short_name: "Nocoding",
    description:
      "Jasa pembuatan website, aplikasi, dan automasi yang cepat, terjangkau, dan memuaskan.",
    start_url: "/",
    display: "standalone",
    background_color: "#07111f",
    theme_color: "#07111f",
    lang: "id-ID",
    icons: [
      {
        src: "/icon.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
