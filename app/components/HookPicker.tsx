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
    <div className="mt-6 rounded-xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/40 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-blue-100 dark:border-blue-900">
        <div>
          <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
            Pick a Hook
          </span>
          <span className="text-xs text-blue-500 dark:text-blue-500 ml-2">
            Select one to use when generating the full post
          </span>
        </div>
        <button
          onClick={onRegenerate}
          disabled={loading}
          className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 disabled:opacity-50 transition-colors"
        >
          {loading ? "Regenerating..." : "↻ Regenerate"}
        </button>
      </div>

      <div className="p-3 space-y-2">
        {hooks.map((hook, i) => {
          const isSelected = selected === hook;
          return (
            <button
              key={i}
              onClick={() => onSelect(isSelected ? "" : hook)}
              className={`w-full text-left rounded-lg px-4 py-3 text-sm transition-all border ${
                isSelected
                  ? "bg-white dark:bg-gray-900 border-blue-500 dark:border-blue-500 shadow-sm"
                  : "bg-white/60 dark:bg-gray-900/40 border-transparent hover:border-blue-300 dark:hover:border-blue-700 hover:bg-white dark:hover:bg-gray-900"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                    isSelected
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {isSelected && (
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 8 8">
                      <path d="M6.5 1.5L3 5 1.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-blue-400 dark:text-blue-500 mb-1">
                    {techniqueLabels[i] ?? `Hook ${i + 1}`}
                  </span>
                  <span className={`leading-snug ${isSelected ? "text-gray-900 dark:text-gray-100 font-medium" : "text-gray-700 dark:text-gray-300"}`}>
                    {hook}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="px-4 py-2.5 border-t border-blue-100 dark:border-blue-900 bg-blue-100/50 dark:bg-blue-900/30">
          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
            Hook selected. Click "Generate Post" to build the full post around it.
          </p>
        </div>
      )}
    </div>
  );
}
