"use client";

const techniqueLabels = [
  "High-Stakes Moment",
  "Specific Number",
  "Contrarian Truth",
  "Curiosity Gap",
  "Confession",
];

interface Props {
  hooks: string[];
  selected: string | null;
  onSelect: (hook: string) => void;
  onRegenerate: () => void;
  loading: boolean;
}

export default function HookPicker({ hooks, selected, onSelect, onRegenerate, loading }: Props) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid var(--border)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between gap-3 px-4 py-3"
        style={{
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <div className="min-w-0">
          <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>
            Pick a Hook
          </span>
          <span className="hidden sm:inline text-xs ml-2" style={{ color: "var(--text-3)" }}>
            Select one or generate the post without
          </span>
        </div>
        <button
          onClick={onRegenerate}
          disabled={loading}
          className="text-xs font-medium transition-colors disabled:opacity-40"
          style={{ color: "var(--text-3)" }}
          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "var(--text)"}
          onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "var(--text-3)"}
        >
          {loading ? "Generating..." : "↻ New batch"}
        </button>
      </div>

      {/* Hook list */}
      <div
        className="divide-y"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="px-4 py-3.5 animate-pulse"
                style={{ borderColor: "var(--border)" }}
              >
                <div
                  className="h-2.5 rounded mb-2 w-24"
                  style={{ background: "var(--surface-2)" }}
                />
                <div
                  className="h-3 rounded w-full"
                  style={{ background: "var(--surface-2)" }}
                />
              </div>
            ))
          : hooks.map((hook, i) => {
              const isSelected = selected === hook;
              return (
                <button
                  key={i}
                  onClick={() => onSelect(isSelected ? "" : hook)}
                  className="w-full text-left px-4 py-3.5 transition-all duration-100 flex items-start gap-3"
                  style={{
                    background: isSelected ? "var(--surface-2)" : "transparent",
                    borderColor: "var(--border)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) (e.currentTarget as HTMLElement).style.background = "var(--surface-2)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  {/* Radio dot */}
                  <div
                    className="mt-0.5 w-3.5 h-3.5 rounded-full border shrink-0 flex items-center justify-center"
                    style={{
                      borderColor: isSelected ? "var(--text)" : "var(--border-2)",
                      background: isSelected ? "var(--text)" : "transparent",
                    }}
                  >
                    {isSelected && (
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "var(--bg)" }}
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span
                      className="block text-[10px] font-semibold uppercase tracking-wider mb-1"
                      style={{ color: "var(--text-3)" }}
                    >
                      {techniqueLabels[i] ?? `Hook ${i + 1}`}
                    </span>
                    <span
                      className="text-sm leading-snug"
                      style={{ color: isSelected ? "var(--text)" : "var(--text-2)" }}
                    >
                      {hook}
                    </span>
                  </div>
                </button>
              );
            })}
      </div>

      {/* Selected hint */}
      {selected && (
        <div
          className="px-4 py-2.5 text-xs"
          style={{
            borderTop: "1px solid var(--border)",
            background: "var(--surface-2)",
            color: "var(--text-3)",
          }}
        >
          Hook locked in. Click <strong style={{ color: "var(--text)" }}>"Generate with Hook"</strong> to build the full post around it.
        </div>
      )}
    </div>
  );
}
