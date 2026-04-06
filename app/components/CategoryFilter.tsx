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
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            active === cat
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:text-blue-600"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
