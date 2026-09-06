import { NextResponse, type NextRequest } from "next/server";
import {
  LOCALE_COOKIE,
  defaultLocale,
  isLocale,
  matchLocale,
  type Locale,
} from "@/lib/i18n";

/**
 * Language routing. (`proxy` is the Next 16 name for what used to be
 * `middleware`; the old convention is deprecated.)
 *
 * English is served from the apex — "/" and "/work/…" — while the other
 * languages are prefixed. Internally every page lives under /[locale], so an
 * unprefixed path is *rewritten* onto /en rather than redirected: the apex
 * keeps answering 200 with real HTML, which is what `curl`, crawlers and LLM
 * agents get. Only a reader whose browser asks for pt or es is redirected, and
 * only from "/" — deep links are never hijacked.
 */
function preferredLocale(request: NextRequest): Locale {
  // An explicit choice always wins over the browser's guess.
  const fromCookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (fromCookie && isLocale(fromCookie)) return fromCookie;
  return matchLocale(request.headers.get("accept-language"));
}

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // Already explicit about its language: leave it alone.
  if (
    pathname === "/en" ||
    pathname.startsWith("/en/") ||
    pathname === "/pt-br" ||
    pathname.startsWith("/pt-br/") ||
    pathname === "/es" ||
    pathname.startsWith("/es/")
  ) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    const locale = preferredLocale(request);

    if (locale !== defaultLocale) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}`;
      // 307, not 301: the destination depends on the reader, so it must never
      // be cached as if it were the one true answer for this URL.
      const redirect = NextResponse.redirect(url, 307);
      // Append, never set: Next puts its own values in Vary and overwriting
      // them would break its router caching.
      redirect.headers.append("Vary", "Accept-Language");
      redirect.headers.append("Vary", "Cookie");
      return redirect;
    }

    const url = request.nextUrl.clone();
    url.pathname = "/en";
    const rewrite = NextResponse.rewrite(url);
    // The apex answers 200 with a language chosen from the request, so a
    // shared cache must key on what that choice depended on.
    rewrite.headers.append("Vary", "Accept-Language");
    rewrite.headers.append("Vary", "Cookie");
    return rewrite;
  }

  // Any other unprefixed path is an English URL (e.g. /work/cortefilme).
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, the metadata routes and anything that looks like a file.
  matcher: [
    "/((?!_next/|api/|favicon\\.ico|sitemap\\.xml|robots\\.txt|manifest\\.webmanifest|llms\\.txt|.*\\.[\\w]+$).*)",
  ],
};
