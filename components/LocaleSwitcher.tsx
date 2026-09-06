import { Flag } from "./Flag";
import {
  localeMeta,
  localePath,
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
 * Plain <a> links, one per language, pointing at the same page in that
 * language. No JavaScript is involved in switching: the links work with JS
 * disabled and are crawlable, which is what lets hreflang mean anything.
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
              <a
                href={localePath(locale, path)}
                hrefLang={meta.htmlLang}
                lang={meta.htmlLang}
                // Marks the active language for assistive tech; the visual
                // state alone would not announce it.
                aria-current={isCurrent ? "true" : undefined}
                className="locale-switcher-link"
              >
                <Flag locale={locale} />
                <span>{meta.label}</span>
                {/* The flag is decorative, so the full language name is what
                    actually names the link for a screen reader. */}
                <span className="sr-only">{meta.nativeName}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
