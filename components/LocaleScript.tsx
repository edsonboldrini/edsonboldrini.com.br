import type { Locale } from "@/lib/i18n";
import { LOCALE_COOKIE } from "@/lib/i18n";

/**
 * Persists the language being viewed, so a later visit to the apex is served
 * in the reader's chosen language (proxy.ts reads the cookie).
 *
 * A raw <script> rather than a client component on purpose: it needs no React
 * runtime, adds nothing to the bundle and does not hydrate. The site still has
 * zero client components. `locale` is a union type, never free text, so there
 * is nothing injectable here.
 */
export function LocaleScript({ locale }: { readonly locale: Locale }) {
  const js =
    `try{` +
    `document.cookie="${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;samesite=lax";` +
    `localStorage.setItem("${LOCALE_COOKIE}","${locale}")` +
    `}catch(e){}`;

  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
