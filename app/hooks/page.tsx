export default function HooksPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-xl font-semibold mb-1" style={{ color: "var(--text)" }}>
          Hook Lab
        </h1>
        <p className="text-sm" style={{ color: "var(--text-3)" }}>
          Generate and save scroll-stopping hooks for future posts.
        </p>
      </div>

      <div
        className="rounded-xl px-6 py-12 text-center"
        style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
      >
        <div
          className="w-10 h-10 rounded-xl mx-auto mb-4 flex items-center justify-center text-xl"
          style={{ background: "var(--surface-2)" }}
        >
          ⚡
        </div>
        <p className="text-sm font-medium mb-1" style={{ color: "var(--text)" }}>Coming soon</p>
        <p className="text-xs" style={{ color: "var(--text-3)" }}>
          Use the <strong>⚡ Hooks Only</strong> button on the Generate page to get 5 hooks instantly.
        </p>
      </div>
    </div>
  );
}
