"use client";

import { useRouter } from "next/navigation";
import { Template, TemplateCategory } from "@/app/lib/templates";

// Color psychology per category
// Storytelling    → amber/orange  — warmth, emotion, human connection
// Thought Leader  → blue          — trust, authority, intelligence
// Career & Growth → emerald       — growth, momentum, ambition
// Productivity    → violet        — focus, creativity, clarity
// Social Proof    → rose          — confidence, boldness, energy

const categoryTheme: Record<
  TemplateCategory,
  { bg: string; bgHover: string; border: string; accent: string; tag: string; tagText: string }
> = {
  Storytelling: {
    bg:      "rgba(251, 146, 60, 0.15)",
    bgHover: "rgba(251, 146, 60, 0.25)",
    border:  "rgba(251, 146, 60, 0.55)",
    accent:  "#fdba74",
    tag:     "rgba(251, 146, 60, 0.25)",
    tagText: "#fdba74",
  },
  "Thought Leadership": {
    bg:      "rgba(96, 165, 250, 0.15)",
    bgHover: "rgba(96, 165, 250, 0.25)",
    border:  "rgba(96, 165, 250, 0.55)",
    accent:  "#93c5fd",
    tag:     "rgba(96, 165, 250, 0.25)",
    tagText: "#93c5fd",
  },
  "Career & Growth": {
    bg:      "rgba(52, 211, 153, 0.15)",
    bgHover: "rgba(52, 211, 153, 0.25)",
    border:  "rgba(52, 211, 153, 0.55)",
    accent:  "#6ee7b7",
    tag:     "rgba(52, 211, 153, 0.25)",
    tagText: "#6ee7b7",
  },
  Productivity: {
    bg:      "rgba(167, 139, 250, 0.15)",
    bgHover: "rgba(167, 139, 250, 0.25)",
    border:  "rgba(167, 139, 250, 0.55)",
    accent:  "#c4b5fd",
    tag:     "rgba(167, 139, 250, 0.25)",
    tagText: "#c4b5fd",
  },
  "Social Proof": {
    bg:      "rgba(251, 113, 133, 0.15)",
    bgHover: "rgba(251, 113, 133, 0.25)",
    border:  "rgba(251, 113, 133, 0.55)",
    accent:  "#fda4af",
    tag:     "rgba(251, 113, 133, 0.25)",
    tagText: "#fda4af",
  },
};

const lengthLabel = { short: "Short", medium: "Medium", long: "Long" };

export default function TemplateCard({ template }: { template: Template }) {
  const router = useRouter();
  const theme = categoryTheme[template.category];

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
    <div
      className="rounded-xl p-5 flex flex-col gap-3 cursor-pointer transition-all duration-200"
      style={{
        background: theme.bg,
        border: `1px solid ${theme.border}`,
      }}
      onClick={handleUse}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = theme.bgHover;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = theme.bg;
      }}
    >
      {/* Category label */}
      <div className="flex items-center gap-2">
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: theme.accent }}
        />
        <span
          className="text-[10px] font-bold uppercase tracking-wider"
          style={{ color: theme.accent }}
        >
          {template.category}
        </span>
      </div>

      {/* Title + description */}
      <div>
        <h3
          className="text-sm font-semibold leading-snug mb-1"
          style={{ color: "var(--text)" }}
        >
          {template.title}
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>
          {template.description}
        </p>
      </div>

      {/* Preview hook */}
      <p
        className="text-xs italic leading-relaxed line-clamp-2"
        style={{ color: "var(--text-3)" }}
      >
        {template.previewHint}
      </p>

      {/* Footer */}
      <div
        className="flex items-center justify-between pt-2"
        style={{ borderTop: `1px solid ${theme.border}` }}
      >
        <div className="flex gap-1.5">
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
            style={{ background: theme.tag, color: "var(--text)" }}
          >
            {template.tone}
          </span>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
            style={{ background: theme.tag, color: "var(--text)" }}
          >
            {lengthLabel[template.length]}
          </span>
        </div>
        <span
          className="text-xs font-semibold"
          style={{ color: theme.accent }}
        >
          Use →
        </span>
      </div>
    </div>
  );
}
