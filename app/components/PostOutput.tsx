"use client";

import { useState, useEffect } from "react";

interface Props {
  post: string;
  persona?: string;
  platform?: "linkedin" | "twitter";
  onRegenerate?: () => void;
  regenerating?: boolean;
}

export default function PostOutput({ post, persona, platform = "linkedin", onRegenerate, regenerating }: Props) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState(post);

  // Sync if a new post comes in
  useEffect(() => {
    setEditedPost(post);
    setIsEditing(false);
  }, [post]);

  function handleCopy() {
    navigator.clipboard.writeText(editedPost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDoneEditing() {
    setIsEditing(false);
  }

  // Split into paragraphs; first = hook
  const paragraphs = editedPost.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const [hook, ...body] = paragraphs;

  return (
    <div
      className="mt-8 rounded-xl overflow-hidden"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3.5 sm:py-4"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
          style={{ background: "var(--surface-2)", color: "var(--text)" }}
        >
          {persona ? persona[0].toUpperCase() : "Y"}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold leading-tight" style={{ color: "var(--text)" }}>
            You
          </p>
          <p className="text-xs mt-0.5 truncate" style={{ color: "var(--text-3)" }}>
            {persona ?? "LinkedIn Creator"} · Just now
          </p>
        </div>

        {/* Edit toggle */}
        <button
          onClick={() => isEditing ? handleDoneEditing() : setIsEditing(true)}
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-150"
          style={{
            background: isEditing ? "var(--text)" : "var(--surface-2)",
            color: isEditing ? "var(--bg)" : "var(--text-2)",
            border: "1px solid var(--border)",
          }}
        >
          {isEditing ? (
            <>
              <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Done
            </>
          ) : (
            <>
              <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </>
          )}
        </button>

        {platform === "twitter" ? (
          <div
            className="flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1 rounded"
            style={{ background: "var(--surface-2)", color: "var(--text-3)" }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            TWEET
          </div>
        ) : (
          <div
            className="hidden sm:block text-[10px] font-semibold px-2 py-1 rounded"
            style={{ background: "var(--surface-2)", color: "var(--text-3)" }}
          >
            PREVIEW
          </div>
        )}
      </div>

      {/* Content — edit mode */}
      {isEditing ? (
        <div className="px-4 sm:px-5 py-4 sm:py-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-3)" }}>
            Editing — changes apply to copy
          </p>
          <textarea
            value={editedPost}
            onChange={(e) => setEditedPost(e.target.value)}
            rows={platform === "twitter" ? 4 : 16}
            className="w-full text-sm leading-relaxed rounded-lg px-4 py-3.5 resize-none outline-none transition-all duration-150"
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border-2)",
              color: "var(--text)",
              fontFamily: "inherit",
            }}
          />
        </div>
      ) : platform === "twitter" ? (
        /* Twitter — compact single block */
        <div className="px-4 sm:px-5 py-5 sm:py-6">
          <p
            className="text-base sm:text-lg font-medium leading-relaxed whitespace-pre-line"
            style={{ color: "var(--text)" }}
          >
            {editedPost}
          </p>
        </div>
      ) : (
        /* LinkedIn — hook highlight + body */
        <div className="px-4 sm:px-5 py-4 sm:py-5 space-y-4">
          {hook && (
            <div
              className="rounded-lg px-4 py-3.5"
              style={{
                background: "var(--surface-2)",
                borderLeft: "2px solid var(--border-2)",
              }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-3)" }}>
                Hook
              </p>
              <p className="text-sm font-medium leading-relaxed whitespace-pre-line" style={{ color: "var(--text)" }}>
                {hook}
              </p>
            </div>
          )}
          {body.map((para, i) => (
            <p key={i} className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "var(--text-2)" }}>
              {para}
            </p>
          ))}
        </div>
      )}

      {/* Footer */}
      <div
        className="flex items-center justify-between px-4 sm:px-5 py-3"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <button
          onClick={onRegenerate}
          disabled={regenerating}
          className="flex items-center gap-1.5 text-xs font-medium transition-all duration-150 disabled:opacity-40"
          style={{ color: "var(--text-3)" }}
          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "var(--text)"}
          onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "var(--text-3)"}
        >
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 1 0 .49-4.5" />
          </svg>
          {regenerating ? "Regenerating..." : "Regenerate"}
        </button>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-lg transition-all duration-150"
          style={{
            background: copied ? "var(--text)" : "var(--surface-2)",
            color: copied ? "var(--bg)" : "var(--text-2)",
            border: "1px solid var(--border)",
          }}
        >
          {copied ? (
            <>
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy Post
            </>
          )}
        </button>
      </div>
    </div>
  );
}
