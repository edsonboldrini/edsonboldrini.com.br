import { Flag } from "./Flag";
import {
  localeMeta,
  localeSwitchPath,
  locales,
  type Locale,
} from "@/lib/i18n";

export interface LocaleSwitcherProps {
  readonly current: Locale;
  /** Path within the site, without locale prefix, e.g. "" or "work/cortefilme". */
  readonly path?: string;
  /** Accessible name for the group, translated. */
  readonly label: string;
}

/**
 * Plain <a> links, one per language. No JavaScript is involved in switching:
 * they work with JS disabled and are crawlable, which is what lets hreflang
 * mean anything. Every link is locale-bearing, English included — pointing
 * English at the bare apex made it unreachable once another language was
 * chosen (see localeSwitchPath).
 *
 * Each language shows its flag alongside its own name. The flag is
 * aria-hidden decoration and never travels alone: a flag is a country, not a
 * language, so the name is what actually identifies the link — which keeps
 * the flag from being the only signal for anyone reading or listening.
 */
export function LocaleSwitcher({
  current,
  path = "",
  label,
}: LocaleSwitcherProps) {
  return (
    <nav aria-label={label} className="locale-switcher">
      <ul>
        {locales.map((locale) => {
          const meta = localeMeta[locale];
          const isCurrent = locale === current;

          return (
            <li key={locale}>
              {isCurrent ? (
                // The current language is stated, not offered as a link.
                <span aria-current="true" className="locale-switcher-current">
                  <Flag locale={locale} />
                  <span>{meta.nativeName}</span>
                </span>
              ) : (
                <a
                  href={localeSwitchPath(locale, path)}
                  hrefLang={meta.htmlLang}
                  lang={meta.htmlLang}
                  className="locale-switcher-link"
                >
                  <Flag locale={locale} />
                  <span>{meta.nativeName}</span>
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
