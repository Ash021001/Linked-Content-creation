"use client";

import { useState } from "react";

export default function PostOutput({ post }: { post: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(post);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Split into paragraphs on blank lines, preserving internal line breaks
  const paragraphs = post.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  return (
    <div className="mt-10 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          Generated Post
        </span>
        <button
          onClick={handleCopy}
          className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          {copied ? "Copied!" : "Copy to clipboard"}
        </button>
      </div>

      {/* Post body */}
      <div className="px-5 py-6 space-y-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
        {paragraphs.map((para, i) => (
          <p key={i} className="whitespace-pre-line">
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}
