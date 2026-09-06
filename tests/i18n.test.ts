import { describe, expect, it } from "vitest";
import {
  isLocale,
  localePath,
  localeSwitchPath,
  matchLocale,
} from "@/lib/i18n";

describe("matchLocale — Accept-Language negotiation", () => {
  it("falls back to English when the header is absent", () => {
    expect(matchLocale(null)).toBe("en");
    expect(matchLocale("")).toBe("en");
  });

  it("matches the obvious cases", () => {
    expect(matchLocale("en-US,en;q=0.9")).toBe("en");
    expect(matchLocale("pt-BR,pt;q=0.9,en;q=0.8")).toBe("pt-br");
    expect(matchLocale("es-AR,es;q=0.9")).toBe("es");
  });

  it("maps European Portuguese to the only Portuguese the site has", () => {
    expect(matchLocale("pt-PT,pt;q=0.9")).toBe("pt-br");
    expect(matchLocale("pt")).toBe("pt-br");
  });

  it("honours q-values rather than source order", () => {
    expect(matchLocale("en;q=0.2,es;q=0.9")).toBe("es");
    expect(matchLocale("es;q=0.1,pt-BR;q=0.8")).toBe("pt-br");
  });

  it("falls back to English for unsupported languages", () => {
    expect(matchLocale("fr-FR,fr;q=0.9")).toBe("en");
    expect(matchLocale("ja,ko;q=0.8")).toBe("en");
  });

  it("does not crash on malformed headers", () => {
    expect(matchLocale(";;;")).toBe("en");
    expect(matchLocale("pt-BR;q=notanumber")).toBe("en");
    expect(matchLocale("*")).toBe("en");
  });
});

describe("localePath — public URLs", () => {
  it("keeps English on the apex", () => {
    expect(localePath("en")).toBe("/");
    expect(localePath("en", "work/cortefilme")).toBe("/work/cortefilme");
  });

  it("prefixes the other languages", () => {
    expect(localePath("pt-br")).toBe("/pt-br");
    expect(localePath("es", "work/cortefilme")).toBe("/es/work/cortefilme");
  });
});

describe("localeSwitchPath — what the flags link to", () => {
  // The bug: the English flag pointed at "/", and "/" honours the saved
  // language, so a reader who had picked Portuguese was bounced straight back
  // and could never return to English. Every flag must therefore link to an
  // explicit, locale-bearing URL.
  it("never links English to the bare apex", () => {
    expect(localeSwitchPath("en")).toBe("/en");
    expect(localeSwitchPath("en", "work/cortefilme")).toBe("/en/work/cortefilme");
  });

  it("links the other languages to their prefix", () => {
    expect(localeSwitchPath("pt-br")).toBe("/pt-br");
    expect(localeSwitchPath("es", "work/cortefilme")).toBe("/es/work/cortefilme");
  });

  it("is explicit for every supported language", () => {
    for (const l of ["en", "pt-br", "es"] as const) {
      expect(localeSwitchPath(l).startsWith(`/${l}`)).toBe(true);
    }
  });
});

describe("isLocale", () => {
  it("accepts the supported set and rejects everything else", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("pt-br")).toBe(true);
    expect(isLocale("es")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("../etc/passwd")).toBe(false);
    expect(isLocale("")).toBe(false);
  });
});
