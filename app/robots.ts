import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

/** Open to all crawlers, including AI agents — the site is meant to be read. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.origin}/sitemap.xml`,
  };
}