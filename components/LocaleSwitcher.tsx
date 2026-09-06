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
 * Each language is named in its own language, and there are no flags. A flag
 * is a country, not a language: there is no correct flag for Spanish, and
 * labelling English with one country's flag excludes every other. This is a
 * well-documented antipattern, and the endonym is the standard fix.
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
                  {meta.nativeName}
                </span>
              ) : (
                <a
                  href={localeSwitchPath(locale, path)}
                  hrefLang={meta.htmlLang}
                  lang={meta.htmlLang}
                  className="locale-switcher-link"
                >
                  {meta.nativeName}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
