import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "@/proxy";

const ORIGIN = "https://edsonboldrini.com.br";

function req(
  path: string,
  opts: { cookie?: string; acceptLanguage?: string } = {},
): NextRequest {
  const headers = new Headers();
  if (opts.cookie) headers.set("cookie", `NEXT_LOCALE=${opts.cookie}`);
  if (opts.acceptLanguage) headers.set("accept-language", opts.acceptLanguage);
  return new NextRequest(new URL(path, ORIGIN), { headers });
}

/** Where a rewrite sends the request internally (browser URL is unchanged). */
const rewrittenTo = (r: Response): string | null => {
  const h = r.headers.get("x-middleware-rewrite");
  return h ? new URL(h, ORIGIN).pathname : null;
};
const redirectedTo = (r: Response): string | null => {
  const h = r.headers.get("location");
  return h ? new URL(h, ORIGIN).pathname : null;
};
const cookieSet = (r: Response): string | null => {
  const c = r.headers.get("set-cookie");
  return c ? (c.match(/NEXT_LOCALE=([^;]*)/)?.[1] ?? null) : null;
};

describe("the apex chooses a language", () => {
  it("serves English in place, without redirecting, when English is wanted", () => {
    const r = proxy(req("/"));
    expect(r.status).toBe(200);
    expect(rewrittenTo(r)).toBe("/en");
    expect(redirectedTo(r)).toBeNull();
  });

  it("keeps the apex on 200 for crawlers that send no Accept-Language", () => {
    // The apex answering 200 with real HTML is what lets curl, crawlers and
    // LLM agents read the site in one request. It must not become a redirect.
    expect(proxy(req("/")).status).toBe(200);
  });

  it("redirects a Portuguese or Spanish reader to their language", () => {
    const pt = proxy(req("/", { acceptLanguage: "pt-BR,pt;q=0.9" }));
    expect(pt.status).toBe(307);
    expect(redirectedTo(pt)).toBe("/pt-br");

    const es = proxy(req("/", { acceptLanguage: "es-AR,es;q=0.9" }));
    expect(redirectedTo(es)).toBe("/es");
  });

  it("redirects with 307, never 301 — the destination depends on the reader", () => {
    expect(proxy(req("/", { acceptLanguage: "pt-BR" })).status).toBe(307);
  });

  it("lets a saved choice beat the browser's preference", () => {
    const r = proxy(req("/", { cookie: "es", acceptLanguage: "pt-BR" }));
    expect(redirectedTo(r)).toBe("/es");
  });

  it("ignores a corrupt cookie and falls back to the header", () => {
    const r = proxy(req("/", { cookie: "../etc/passwd", acceptLanguage: "pt-BR" }));
    expect(redirectedTo(r)).toBe("/pt-br");
  });
});

describe("returning to English is always possible", () => {
  // The bug Edson found: with Portuguese saved, every route back to English
  // bounced to /pt-br, so English became unreachable from inside the site.
  it("switches to English and remembers it, even with Portuguese saved", () => {
    const r = proxy(req("/en", { cookie: "pt-br" }));
    expect(cookieSet(r)).toBe("en");
    expect(redirectedTo(r)).toBe("/");
  });

  it("switches to English on a deep page too", () => {
    const r = proxy(req("/en/work/cortefilme", { cookie: "pt-br" }));
    expect(cookieSet(r)).toBe("en");
    expect(redirectedTo(r)).toBe("/work/cortefilme");
  });

  it("completes the round trip: Portuguese, then English, and English sticks", () => {
    const chose = proxy(req("/pt-br"));
    expect(cookieSet(chose)).toBe("pt-br");

    const back = proxy(req("/en", { cookie: "pt-br" }));
    expect(cookieSet(back)).toBe("en");

    // With English now saved, the apex must serve English and stay put.
    const apex = proxy(req("/", { cookie: "en", acceptLanguage: "pt-BR,pt;q=0.9" }));
    expect(apex.status).toBe(200);
    expect(rewrittenTo(apex)).toBe("/en");
  });
});

describe("visiting a language remembers it, with no JavaScript involved", () => {
  it("saves the language when a prefixed page is opened", () => {
    expect(cookieSet(proxy(req("/pt-br")))).toBe("pt-br");
    expect(cookieSet(proxy(req("/es/work/cortefilme")))).toBe("es");
  });

  it("does not rewrite the cookie when it already matches", () => {
    expect(cookieSet(proxy(req("/pt-br", { cookie: "pt-br" })))).toBeNull();
  });
});

describe("unprefixed paths are English", () => {
  it("serves a deep English page in place", () => {
    const r = proxy(req("/work/cortefilme"));
    expect(rewrittenTo(r)).toBe("/en/work/cortefilme");
  });

  it("does not hijack a deep link by language", () => {
    // Detection belongs to the apex only; a shared link must land where it says.
    const r = proxy(req("/work/cortefilme", { acceptLanguage: "pt-BR" }));
    expect(redirectedTo(r)).toBeNull();
    expect(rewrittenTo(r)).toBe("/en/work/cortefilme");
  });
});
