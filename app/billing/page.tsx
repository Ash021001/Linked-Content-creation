export default function BillingPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-xl font-semibold mb-1" style={{ color: "var(--text)" }}>Billing</h1>
        <p className="text-sm" style={{ color: "var(--text-3)" }}>Manage your subscription.</p>
      </div>
      <div
        className="rounded-xl px-6 py-12 text-center"
        style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
      >
        <p className="text-sm font-medium mb-1" style={{ color: "var(--text)" }}>Free plan</p>
        <p className="text-xs" style={{ color: "var(--text-3)" }}>Paid plans coming soon.</p>
      </div>
    </div>
  );
}
