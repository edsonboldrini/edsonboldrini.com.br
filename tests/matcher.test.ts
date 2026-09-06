import { describe, expect, it } from "vitest";
import { config } from "@/proxy";

/**
 * The matcher decides which paths the proxy sees at all. Anything it lets
 * through that is not a page gets rewritten under /en and 404s — which is
 * exactly how the generated icon routes broke.
 */
const patterns = config.matcher.map((p) => new RegExp(`^${p}$`));
const matched = (path: string): boolean => patterns.some((re) => re.test(path));

describe("proxy matcher", () => {
  it("handles real pages", () => {
    for (const p of ["/", "/pt-br", "/es", "/work/cortefilme", "/en/work/cortefilme"]) {
      expect(matched(p), `${p} should be handled`).toBe(true);
    }
  });

  it("leaves Next internals and static files alone", () => {
    for (const p of [
      "/_next/static/chunks/main.js",
      "/img/edson-boldrini.jpg",
      "/favicon.ico",
      "/robots.txt",
      "/sitemap.xml",
      "/llms.txt",
      "/manifest.webmanifest",
    ]) {
      expect(matched(p), `${p} should be skipped`).toBe(false);
    }
  });

  it("leaves the generated icon routes alone", () => {
    // These have no file extension, so the generic "looks like a file" rule
    // does not catch them; without an explicit exclusion they were rewritten
    // to /en/icon and returned 404.
    for (const p of ["/icon", "/apple-icon", "/opengraph-image"]) {
      expect(matched(p), `${p} should be skipped`).toBe(false);
    }
  });
});
