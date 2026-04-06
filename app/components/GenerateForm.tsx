"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import PostOutput from "./PostOutput";

const personas = [
  "Founder / Entrepreneur",
  "Software Engineer",
  "Product Manager",
  "Marketing Professional",
  "Sales Leader",
  "Consultant",
  "Career Coach",
  "Investor",
];

const tones = [
  "Professional",
  "Conversational",
  "Inspirational",
  "Analytical",
  "Humorous",
  "Bold",
];

const lengths = [
  { label: "Short (< 150 words)", value: "short" },
  { label: "Medium (150–300 words)", value: "medium" },
  { label: "Long (300+ words)", value: "long" },
];

interface GeneratedPost {
  hook: string;
  body: string;
  cta: string;
}

export default function GenerateForm() {
  const searchParams = useSearchParams();

  const [persona, setPersona] = useState(searchParams.get("persona") ?? "");
  const [niche, setNiche] = useState(searchParams.get("niche") ?? "");
  const [tone, setTone] = useState(searchParams.get("tone") ?? "");
  const [length, setLength] = useState(searchParams.get("length") ?? "medium");
  const [referencePosts, setReferencePosts] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<GeneratedPost | null>(null);
  const [error, setError] = useState("");

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!persona || !niche || !tone) {
      setError("Please fill in Persona, Niche, and Tone.");
      return;
    }
    setError("");
    setLoading(true);
    setOutput(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ persona, niche, tone, length, referencePosts }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setOutput(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Generate Post</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        Fill in the details below and let AI craft your LinkedIn post.
      </p>

      <form onSubmit={handleGenerate} className="space-y-6">
        {/* Persona */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Persona <span className="text-red-400">*</span>
          </label>
          <select
            value={persona}
            onChange={(e) => setPersona(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select your persona...</option>
            {personas.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Niche */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Niche / Topic <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g. AI in healthcare, remote work culture, startup fundraising..."
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Tone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Tone <span className="text-red-400">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {tones.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTone(t)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  tone === t
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Length */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Post Length
          </label>
          <div className="flex gap-3">
            {lengths.map((l) => (
              <label
                key={l.value}
                className={`flex-1 flex items-center justify-center gap-2 border rounded-lg px-3 py-2.5 text-sm cursor-pointer transition-colors ${
                  length === l.value
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400"
                    : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              >
                <input
                  type="radio"
                  name="length"
                  value={l.value}
                  checked={length === l.value}
                  onChange={() => setLength(l.value)}
                  className="sr-only"
                />
                {l.label}
              </label>
            ))}
          </div>
        </div>

        {/* Reference Posts */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Reference Posts{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            value={referencePosts}
            onChange={(e) => setReferencePosts(e.target.value)}
            placeholder="Paste 1–3 LinkedIn posts you like as style reference..."
            rows={4}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg px-4 py-2.5">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg text-sm transition-colors"
        >
          {loading ? "Generating..." : "Generate Post"}
        </button>
      </form>

      {output && <PostOutput post={output} />}
    </div>
  );
}
