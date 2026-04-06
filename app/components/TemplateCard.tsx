"use client";

import { useRouter } from "next/navigation";
import { Template, TemplateCategory } from "@/app/lib/templates";

const categoryColors: Record<TemplateCategory, string> = {
  Storytelling: "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400",
  "Thought Leadership": "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400",
  "Career & Growth": "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400",
  Productivity: "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400",
  "Social Proof": "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400",
};

const lengthLabel = { short: "Short", medium: "Medium", long: "Long" };

export default function TemplateCard({ template }: { template: Template }) {
  const router = useRouter();

  function handleUse() {
    const params = new URLSearchParams({
      persona: template.persona,
      niche: template.niche,
      tone: template.tone,
      length: template.length,
    });
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex flex-col gap-3 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
      {/* Category badge */}
      <span
        className={`self-start text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${categoryColors[template.category]}`}
      >
        {template.category}
      </span>

      {/* Title + description */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug">
          {template.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{template.description}</p>
      </div>

      {/* Preview hint */}
      <p className="text-xs italic text-gray-400 dark:text-gray-500 line-clamp-2 leading-relaxed">
        {template.previewHint}
      </p>

      {/* Meta + CTA */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <div className="flex gap-1.5 flex-wrap">
          <span className="text-[11px] px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            {template.tone}
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            {lengthLabel[template.length]}
          </span>
        </div>
        <button
          onClick={handleUse}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          Use Template →
        </button>
      </div>
    </div>
  );
}
