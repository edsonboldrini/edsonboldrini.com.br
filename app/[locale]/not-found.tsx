import { getContent } from "@/lib/content";
import { defaultLocale, localePath } from "@/lib/i18n";

/**
 * Rendered for unknown paths. It cannot read params (Next renders not-found
 * outside the matched segment), so it speaks the default language.
 */
export default function NotFound() {
  const t = getContent(defaultLocale);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      style={{
        maxInlineSize: "var(--measure-text)",
        marginInline: "auto",
        paddingInline: "var(--space-5)",
        paddingBlock: "var(--space-9)",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-2xl)",
          margin: 0,
        }}
      >
        {t.ui.notFoundTitle}
      </h1>
      <p style={{ marginBlockStart: "var(--space-4)", color: "var(--muted)" }}>
        {t.ui.notFoundBody}
      </p>
      <p style={{ marginBlockStart: "var(--space-5)" }}>
        <a
          href={localePath(defaultLocale)}
          style={{
            display: "inline-flex",
            minBlockSize: 24,
            alignItems: "center",
            color: "var(--accent)",
            fontWeight: 600,
          }}
        >
          ← {t.ui.backToHome}
        </a>
      </p>
    </main>
  );
}
