export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      style={{
        maxInlineSize: "var(--measure-layout)",
        marginInline: "auto",
        paddingInline: "var(--space-5)",
        paddingBlock: "var(--space-10)",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-2xl)",
          fontWeight: 700,
          margin: 0,
          color: "var(--ink)",
        }}
      >
        Page not found
      </h1>
      <p
        style={{
          marginBlockStart: "var(--space-4)",
          maxInlineSize: "var(--measure-text)",
          color: "var(--muted)",
        }}
      >
        That URL does not exist on this site.
      </p>
      <p style={{ marginBlockStart: "var(--space-6)" }}>
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            minBlockSize: 24,
            color: "var(--accent)",
            fontWeight: 600,
          }}
        >
          Back to home
        </a>
      </p>
    </main>
  );
}
