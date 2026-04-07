"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getHistory, deleteFromHistory, clearHistory, HistoryItem } from "@/app/lib/history";

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  return `${d}d ago`;
}

// Same color psychology as generate form
const toneColors: Record<string, { bg: string; border: string; text: string; accent: string }> = {
  Professional:   { bg: "rgba(96,165,250,0.18)",  border: "rgba(96,165,250,0.55)",  text: "rgba(96,165,250,0.95)",  accent: "rgba(96,165,250,0.7)"  },
  Conversational: { bg: "rgba(52,211,153,0.18)",  border: "rgba(52,211,153,0.55)",  text: "rgba(52,211,153,0.95)",  accent: "rgba(52,211,153,0.7)"  },
  Inspirational:  { bg: "rgba(251,191,36,0.18)",  border: "rgba(251,191,36,0.55)",  text: "rgba(251,191,36,0.95)",  accent: "rgba(251,191,36,0.7)"  },
  Analytical:     { bg: "rgba(167,139,250,0.18)", border: "rgba(167,139,250,0.55)", text: "rgba(167,139,250,0.95)", accent: "rgba(167,139,250,0.7)" },
  Humorous:       { bg: "rgba(251,146,60,0.18)",  border: "rgba(251,146,60,0.55)",  text: "rgba(251,146,60,0.95)",  accent: "rgba(251,146,60,0.7)"  },
  Bold:           { bg: "rgba(251,113,133,0.18)", border: "rgba(251,113,133,0.55)", text: "rgba(251,113,133,0.95)", accent: "rgba(251,113,133,0.7)" },
};

const defaultTone = { bg: "rgba(148,163,184,0.18)", border: "rgba(148,163,184,0.4)", text: "rgba(148,163,184,0.9)", accent: "rgba(148,163,184,0.5)" };

// Avatar color based on persona initial
const avatarPalette = [
  { bg: "rgba(96,165,250,0.25)",  color: "rgba(96,165,250,1)"  },
  { bg: "rgba(52,211,153,0.25)",  color: "rgba(52,211,153,1)"  },
  { bg: "rgba(251,191,36,0.25)",  color: "rgba(251,191,36,1)"  },
  { bg: "rgba(167,139,250,0.25)", color: "rgba(167,139,250,1)" },
  { bg: "rgba(251,146,60,0.25)",  color: "rgba(251,146,60,1)"  },
  { bg: "rgba(251,113,133,0.25)", color: "rgba(251,113,133,1)" },
];

function getAvatarColor(name: string) {
  const idx = name.charCodeAt(0) % avatarPalette.length;
  return avatarPalette[idx];
}

function PostCard({ item, onDelete }: { item: HistoryItem; onDelete: () => void }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const preview = item.post.split("\n").filter(Boolean)[0] ?? "";
  const tone = toneColors[item.tone] ?? defaultTone;
  const avatar = getAvatarColor(item.persona);
  const isTwitter = item.platform === "twitter";

  function handleCopy() {
    navigator.clipboard.writeText(item.post);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleReuse() {
    const params = new URLSearchParams({
      persona: item.persona,
      niche: item.niche,
      tone: item.tone,
      length: item.length,
    });
    router.push(`/?${params.toString()}`);
  }

  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-150"
      style={{
        border: "1px solid var(--border)",
        background: "var(--surface)",
        borderLeft: `3px solid ${tone.accent}`,
      }}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: "1px solid var(--border)" }}>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          style={{ background: avatar.bg, color: avatar.color }}
        >
          {item.persona[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold truncate" style={{ color: "var(--text)" }}>
            {item.persona}
          </p>
          <p className="text-[11px] truncate" style={{ color: "var(--text-3)" }}>
            {item.niche}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {/* Platform badge */}
          {isTwitter ? (
            <span
              className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded"
              style={{ background: "rgba(255,255,255,0.08)", color: "var(--text-2)", border: "1px solid var(--border)" }}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X
            </span>
          ) : (
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded"
              style={{ background: "rgba(10,102,194,0.18)", color: "rgba(96,165,250,0.95)", border: "1px solid rgba(10,102,194,0.4)" }}
            >
              in
            </span>
          )}
          {/* Tone badge */}
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded"
            style={{ background: tone.bg, color: tone.text, border: `1px solid ${tone.border}` }}
          >
            {item.tone}
          </span>
          <span className="text-[11px]" style={{ color: "var(--text-3)" }}>
            {timeAgo(item.createdAt)}
          </span>
        </div>
      </div>

      {/* Preview / expanded content */}
      <div
        className="px-4 py-3.5 cursor-pointer"
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? (
          <p
            className="text-sm leading-relaxed whitespace-pre-line"
            style={{ color: "var(--text-2)" }}
          >
            {item.post}
          </p>
        ) : (
          <p
            className="text-sm leading-snug line-clamp-2"
            style={{ color: "var(--text-2)" }}
          >
            {preview}
          </p>
        )}
        <p
          className="text-[11px] mt-2 font-medium"
          style={{ color: "var(--text-3)" }}
        >
          {expanded ? "▲ Collapse" : "▼ Expand"}
        </p>
      </div>

      {/* Actions */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <button
          onClick={handleReuse}
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-150"
          style={{
            background: "var(--surface-2)",
            color: "var(--text-2)",
            border: "1px solid var(--border)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--text)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--text-2)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
          }}
        >
          <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 1 0 .49-4.5" />
          </svg>
          Reuse
        </button>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-150"
          style={{
            background: copied ? "var(--text)" : "var(--surface-2)",
            color: copied ? "var(--bg)" : "var(--text-2)",
            border: "1px solid var(--border)",
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>

        <button
          onClick={onDelete}
          className="ml-auto flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-150"
          style={{ color: "var(--text-3)" }}
          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#f87171"}
          onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "var(--text-3)"}
        >
          <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(getHistory());
    setLoaded(true);
  }, []);

  function handleDelete(id: string) {
    deleteFromHistory(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function handleClear() {
    clearHistory();
    setItems([]);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold mb-1" style={{ color: "var(--text)" }}>
            History
          </h1>
          <p className="text-sm" style={{ color: "var(--text-3)" }}>
            {loaded && items.length > 0
              ? `${items.length} post${items.length === 1 ? "" : "s"} saved locally`
              : "Your generated posts are saved here automatically."}
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={handleClear}
            className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-150"
            style={{ color: "var(--text-3)", border: "1px solid var(--border)" }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#f87171"}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "var(--text-3)"}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Empty state */}
      {loaded && items.length === 0 && (
        <div
          className="rounded-xl px-6 py-14 text-center"
          style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
        >
          <div
            className="w-10 h-10 rounded-xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: "var(--surface-2)" }}
          >
            <svg width="18" height="18" fill="none" stroke="var(--text-3)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
            </svg>
          </div>
          <p className="text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>
            No posts yet
          </p>
          <p className="text-xs" style={{ color: "var(--text-3)" }}>
            Every post you generate is automatically saved here.
          </p>
        </div>
      )}

      {/* List */}
      {items.length > 0 && (
        <div className="space-y-3">
          {items.map((item) => (
            <PostCard
              key={item.id}
              item={item}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
