"use client";

import { useState } from "react";

interface Post {
  hook: string;
  body: string;
  cta: string;
}

export default function PostOutput({ post }: { post: Post }) {
  const [copied, setCopied] = useState(false);

  const fullText = `${post.hook}\n\n${post.body}\n\n${post.cta}`;

  function handleCopy() {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-10 border border-gray-200 rounded-xl bg-white overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-gray-50">
        <span className="text-sm font-semibold text-gray-700">
          Generated Post
        </span>
        <button
          onClick={handleCopy}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          {copied ? "Copied!" : "Copy to clipboard"}
        </button>
      </div>

      <div className="px-5 py-5 space-y-5 text-sm leading-relaxed text-gray-800">
        {/* Hook */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 block mb-1.5">
            Hook
          </span>
          <p className="font-semibold text-gray-900">{post.hook}</p>
        </div>

        <hr className="border-gray-100" />

        {/* Body */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 block mb-1.5">
            Body
          </span>
          <p className="whitespace-pre-line">{post.body}</p>
        </div>

        <hr className="border-gray-100" />

        {/* CTA */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 block mb-1.5">
            Call to Action
          </span>
          <p>{post.cta}</p>
        </div>
      </div>
    </div>
  );
}
