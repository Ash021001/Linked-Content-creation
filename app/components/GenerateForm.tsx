"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import PostOutput from "./PostOutput";
import HookPicker from "./HookPicker";
import { saveToHistory } from "@/app/lib/history";

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

// Color psychology: each tone has a natural emotional color
// Text is always var(--text) when selected — color lives in bg + border only
const tones: { label: string; bg: string; border: string }[] = [
  { label: "Professional",   bg: "rgba(96,165,250,0.20)",  border: "rgba(96,165,250,0.75)"  }, // blue — trust, authority
  { label: "Conversational", bg: "rgba(52,211,153,0.20)",  border: "rgba(52,211,153,0.75)"  }, // emerald — warmth, connection
  { label: "Inspirational",  bg: "rgba(251,191,36,0.20)",  border: "rgba(251,191,36,0.75)"  }, // amber — energy, optimism
  { label: "Analytical",     bg: "rgba(167,139,250,0.20)", border: "rgba(167,139,250,0.75)" }, // violet — intelligence, depth
  { label: "Humorous",       bg: "rgba(251,146,60,0.20)",  border: "rgba(251,146,60,0.75)"  }, // orange — fun, playfulness
  { label: "Bold",           bg: "rgba(251,113,133,0.20)", border: "rgba(251,113,133,0.75)" }, // rose — power, confidence
];

const lengths = [
  { label: "Short",  sub: "< 150 words",   value: "short",  bg: "rgba(251,191,36,0.20)",  border: "rgba(251,191,36,0.75)"  }, // amber — quick energy
  { label: "Medium", sub: "150–300 words", value: "medium", bg: "rgba(96,165,250,0.20)",  border: "rgba(96,165,250,0.75)"  }, // blue — balanced
  { label: "Long",   sub: "300+ words",    value: "long",   bg: "rgba(167,139,250,0.20)", border: "rgba(167,139,250,0.75)" }, // violet — depth
];

export default function GenerateForm() {
  const searchParams = useSearchParams();

  const [platform, setPlatform] = useState<"linkedin" | "twitter">("linkedin");
  const [persona, setPersona] = useState(searchParams.get("persona") ?? "");
  const [niche, setNiche] = useState(searchParams.get("niche") ?? "");
  const [tone, setTone] = useState(searchParams.get("tone") ?? "");
  const [length, setLength] = useState(searchParams.get("length") ?? "medium");
  const [referencePosts, setReferencePosts] = useState("");

  const [loading, setLoading] = useState(false);
  const [hooksLoading, setHooksLoading] = useState(false);
  const [output, setOutput] = useState<string[] | null>(null);
  const [hooks, setHooks] = useState<string[]>([]);
  const [selectedHook, setSelectedHook] = useState<string>("");
  const [error, setError] = useState("");

  function validate(): boolean {
    if (!persona || !niche || !tone) {
      setError("Please fill in Persona, Niche, and Tone.");
      return false;
    }
    setError("");
    return true;
  }

  async function handleGenerateHooks() {
    if (!validate()) return;
    setHooksLoading(true);
    setHooks([]);
    setSelectedHook("");
    try {
      const res = await fetch("/api/hooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ persona, niche, tone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Hook generation failed");
      setHooks(data.hooks);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setHooksLoading(false);
    }
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setOutput(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, persona, niche, tone, length, referencePosts, selectedHook }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      const variations: string[] = data.variations ?? [];
      setOutput(variations);
      if (variations[0]) saveToHistory({ post: variations[0], persona, niche, tone, length, platform });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all duration-150"
    + " placeholder:text-[var(--text-3)]";

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

      {/* Header */}
      <div
        className="mb-6 sm:mb-8 rounded-xl px-5 py-5"
        style={{
          background: "linear-gradient(135deg, rgba(96,165,250,0.08) 0%, rgba(167,139,250,0.08) 50%, rgba(251,146,60,0.06) 100%)",
          border: "1px solid var(--border)",
        }}
      >
        <h1 className="text-lg sm:text-xl font-semibold mb-1" style={{ color: "var(--text)" }}>
          Generate Post
        </h1>
        <p className="text-sm" style={{ color: "var(--text-2)" }}>
          Fill in your details and let Viraly write your next scroll-stopper.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="space-y-5">

        {/* Platform selector */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--text)" }}>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "rgba(96,165,250,0.9)" }} />
            Platform
          </label>
          <div className="grid grid-cols-2 gap-2">
            {/* LinkedIn */}
            <button
              type="button"
              onClick={() => setPlatform("linkedin")}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-150 text-left"
              style={{
                background: platform === "linkedin" ? "rgba(10,102,194,0.15)" : "var(--surface)",
                border: `1px solid ${platform === "linkedin" ? "rgba(10,102,194,0.65)" : "var(--border)"}`,
              }}
            >
              <div
                className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 text-white text-xs font-black"
                style={{ background: "#0a66c2" }}
              >
                in
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>LinkedIn</p>
                <p className="text-[11px]" style={{ color: "var(--text-3)" }}>Long · Story-driven</p>
              </div>
            </button>

            {/* Twitter / X */}
            <button
              type="button"
              onClick={() => setPlatform("twitter")}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-150 text-left"
              style={{
                background: platform === "twitter" ? "rgba(255,255,255,0.08)" : "var(--surface)",
                border: `1px solid ${platform === "twitter" ? "var(--border-2)" : "var(--border)"}`,
              }}
            >
              <div
                className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
                style={{ background: "var(--text)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--bg)">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>Twitter / X</p>
                <p className="text-[11px]" style={{ color: "var(--text-3)" }}>Short · Punchy · Witty</p>
              </div>
            </button>
          </div>
        </div>

        {/* Persona */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--text)" }}>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "rgba(52,211,153,0.9)" }} />
            Persona
          </label>
          <select
            value={persona}
            onChange={(e) => setPersona(e.target.value)}
            className={inputClass}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: persona ? "var(--text)" : "var(--text-3)",
            }}
          >
            <option value="">Select your role...</option>
            {personas.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Niche */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--text)" }}>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "rgba(251,191,36,0.9)" }} />
            Topic / Niche
          </label>
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g. startup fundraising, remote work, AI tooling..."
            className={inputClass}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--border-2)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          />
        </div>

        {/* Tone */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--text)" }}>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "rgba(167,139,250,0.9)" }} />
            Tone
          </label>
          <div className="flex flex-wrap gap-2">
            {tones.map((t) => {
              const active = tone === t.label;
              return (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => setTone(t.label)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                  style={{
                    background: active ? t.bg : "var(--surface)",
                    color: active ? "var(--text)" : "var(--text-2)",
                    border: `1px solid ${active ? t.border : "var(--border)"}`,
                    fontWeight: active ? 700 : 500,
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Length — hidden for Twitter */}
        {platform === "linkedin" && <div>
          <label className="flex items-center gap-1.5 text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--text)" }}>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "rgba(251,146,60,0.9)" }} />
            Length
          </label>
          <div className="grid grid-cols-3 gap-2">
            {lengths.map((l) => {
              const active = length === l.value;
              return (
                <button
                  key={l.value}
                  type="button"
                  onClick={() => setLength(l.value)}
                  className="rounded-lg px-3 py-2.5 text-sm text-center transition-all duration-150"
                  style={{
                    background: active ? l.bg : "var(--surface)",
                    border: `1px solid ${active ? l.border : "var(--border)"}`,
                  }}
                >
                  <span
                    className="block text-xs"
                    style={{ color: "var(--text)", fontWeight: active ? 700 : 500 }}
                  >
                    {l.label}
                  </span>
                  <span
                    className="block text-[11px] mt-0.5"
                    style={{ color: "var(--text-2)" }}
                  >
                    {l.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>}

        {/* Reference Posts */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--text)" }}>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "rgba(251,113,133,0.9)" }} />
            Reference Posts
            <span className="normal-case ml-1.5 font-normal" style={{ color: "var(--text-3)" }}>(optional)</span>
          </label>
          <textarea
            value={referencePosts}
            onChange={(e) => setReferencePosts(e.target.value)}
            placeholder="Paste 1–3 posts you admire as a style reference..."
            rows={3}
            className={inputClass + " resize-none"}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--border-2)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          />
        </div>

        {/* Error */}
        {error && (
          <p
            className="text-xs rounded-lg px-4 py-3"
            style={{
              background: "var(--surface-2)",
              color: "var(--text-2)",
              border: "1px solid var(--border)",
            }}
          >
            {error}
          </p>
        )}

        {/* Hook Picker */}
        {(hooks.length > 0 || hooksLoading) && (
          <HookPicker
            hooks={hooks}
            selected={selectedHook}
            onSelect={setSelectedHook}
            onRegenerate={handleGenerateHooks}
            loading={hooksLoading}
          />
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <button
            type="button"
            onClick={handleGenerateHooks}
            disabled={hooksLoading || loading}
            className="w-full sm:flex-1 py-3 sm:py-2.5 rounded-lg text-sm font-medium transition-all duration-150 disabled:opacity-40"
            style={{
              background: "var(--surface)",
              color: "var(--text-2)",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={(e) => {
              if (!hooksLoading && !loading) {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)";
                (e.currentTarget as HTMLElement).style.color = "var(--text)";
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-2)";
            }}
          >
            {hooksLoading ? "Generating..." : "⚡ Hooks Only"}
          </button>

          <button
            type="submit"
            disabled={loading || hooksLoading}
            className="w-full sm:flex-[2] py-3 sm:py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 disabled:opacity-40"
            style={{
              background: "var(--text)",
              color: "var(--bg)",
            }}
          >
            {loading
              ? "Writing..."
              : selectedHook
              ? "Generate with Hook →"
              : platform === "twitter"
              ? "Generate Tweet →"
              : "Generate Post →"}
          </button>
        </div>
      </form>

      {/* Output */}
      {output && (
        <PostOutput
          variations={output}
          persona={persona}
          platform={platform}
          onRegenerate={() => {
            const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
            handleGenerate(fakeEvent);
          }}
          regenerating={loading}
        />
      )}
    </div>
  );
}
