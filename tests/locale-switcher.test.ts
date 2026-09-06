import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const switcher = readFileSync("components/LocaleSwitcher.tsx", "utf8");
const home = readFileSync("app/[locale]/page.tsx", "utf8");
const caseStudy = readFileSync("app/[locale]/work/cortefilme/page.tsx", "utf8");

describe("language switcher", () => {
  /**
   * A flag is a country, not a language: there is no correct flag for Spanish,
   * and one country's flag for English excludes every other. Each language is
   * named in its own words instead.
   */
  it("names languages instead of showing flags", () => {
    expect(switcher).not.toMatch(/Flag/);
    expect(switcher).toMatch(/nativeName/);
  });

  it("marks the current language without linking it", () => {
    expect(switcher).toMatch(/aria-current="true"/);
    expect(switcher).toMatch(/isCurrent \?/);
  });

  it("keeps every link locale-bearing and crawlable", () => {
    expect(switcher).toMatch(/localeSwitchPath/);
    expect(switcher).toMatch(/hrefLang=/);
    expect(switcher).not.toMatch(/use client/);
  });

  /**
   * On a personal site the first thing in view should be the person, not a
   * settings control. The switcher belongs at the end of the page.
   */
  it("is not the first thing on the home page", () => {
    const main = home.indexOf("<main");
    const hero = home.indexOf("<Hero");
    const sw = home.indexOf("<LocaleSwitcher");
    expect(sw, "switcher should be present").toBeGreaterThan(-1);
    expect(hero, "hero should be present").toBeGreaterThan(main);
    expect(sw, "switcher must come after the hero").toBeGreaterThan(hero);
  });

  it("sits inside the footer on the home page", () => {
    const footer = home.indexOf("<Footer");
    const sw = home.indexOf("<LocaleSwitcher");
    const close = home.indexOf("</Footer>");
    expect(sw).toBeGreaterThan(footer);
    expect(sw).toBeLessThan(close);
  });

  it("comes after the content on the case study too", () => {
    const h1 = caseStudy.indexOf("<h1");
    const sw = caseStudy.indexOf("<LocaleSwitcher");
    expect(sw).toBeGreaterThan(h1);
  });
});
