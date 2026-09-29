import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HiLo",
    short_name: "HiLo",
    description: "A quick higher-or-lower card game for solo and party play.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#020617",
    icons: [
      {
        src: "/hilo-icon.svg",
        sizes: "192x192",
        type: "image/svg+xml",
      },
      {
        src: "/hilo-icon.svg",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}