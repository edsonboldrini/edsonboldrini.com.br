import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

/** Only real content URLs, canonical apex form (ia.md §Estratégia canônica). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.origin}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.origin}/work/cortefilme`,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}