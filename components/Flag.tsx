import type { Locale } from "@/lib/i18n";

/**
 * Small inline flags. Inline SVG rather than emoji: flag emoji do not render
 * on Windows at all, and these stay crisp at 16px in both themes.
 *
 * aria-hidden throughout — the link's visible text label carries the name, so
 * the flag is decoration. A flag is a country, not a language, and must never
 * be the only signal of which language a link leads to.
 */
export function Flag({ locale }: { readonly locale: Locale }) {
  const common = {
    width: 20,
    height: 14,
    viewBox: "0 0 20 14",
    "aria-hidden": true,
    focusable: false,
    style: { display: "block", borderRadius: "1px" },
  } as const;

  if (locale === "pt-br") {
    return (
      <svg {...common}>
        <rect width="20" height="14" fill="#009B3A" />
        <path d="M10 1.6 18.4 7 10 12.4 1.6 7Z" fill="#FEDF00" />
        <circle cx="10" cy="7" r="3.1" fill="#002776" />
      </svg>
    );
  }

  if (locale === "es") {
    return (
      <svg {...common}>
        <rect width="20" height="14" fill="#AA151B" />
        <rect y="3.5" width="20" height="7" fill="#F1BF00" />
      </svg>
    );
  }

  // English — US flag, simplified to read at this size.
  return (
    <svg {...common}>
      <rect width="20" height="14" fill="#FFFFFF" />
      <g fill="#B31942">
        <rect width="20" height="2" y="0" />
        <rect width="20" height="2" y="4" />
        <rect width="20" height="2" y="8" />
        <rect width="20" height="2" y="12" />
      </g>
      <rect width="9" height="8" fill="#0A3161" />
    </svg>
  );
}
