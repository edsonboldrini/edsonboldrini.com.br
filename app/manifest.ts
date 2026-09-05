import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

/** Minimal, honest web app manifest — nothing invented. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f6f8",
    theme_color: "#f5f6f8",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}