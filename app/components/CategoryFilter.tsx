"use client";

import { CATEGORIES, TemplateCategory } from "@/app/lib/templates";

interface Props {
  active: TemplateCategory | "All";
  onChange: (c: TemplateCategory | "All") => void;
}

export default function CategoryFilter({ active, onChange }: Props) {
  const all = ["All", ...CATEGORIES] as const;

  return (
    <div className="flex flex-wrap gap-2">
      {all.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat as TemplateCategory | "All")}
          className="px-3.5 py-2 sm:py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
          style={{
            background: active === cat ? "var(--text)" : "var(--surface)",
            color: active === cat ? "var(--bg)" : "var(--text-2)",
            border: `1px solid ${active === cat ? "var(--text)" : "var(--border)"}`,
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
