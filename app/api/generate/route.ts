import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.2";

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildTwitterPrompt(
  persona: string,
  niche: string,
  tone: string,
  selectedHook?: string
): string {
  const styles = [
    "A single punchy sentence — a hot take that makes people stop and think.",
    "Two lines: line 1 sets up the tension, line 2 delivers the punch.",
    "A bold, opinionated statement that challenges conventional wisdom. Max 2 lines.",
    "A sharp observation written like an insider secret. 1–2 lines.",
    "A counterintuitive truth stated with total confidence. No hedging.",
  ];
  const style = styles[Math.floor(Math.random() * styles.length)];

  return `You are a top Twitter/X ghostwriter. Write a single tweet for a ${persona} about: "${niche}"
Tone: ${tone}

${selectedHook ? `The tweet must start with or be built around this hook:\n"${selectedHook}"\n` : ""}
FORMAT:
${style}

RULES (non-negotiable):
- Maximum 3 lines total — ideally 1 or 2
- Every word must earn its place — cut anything that doesn't add punch
- No hashtags. No @mentions. No "Thread:". No em-dashes.
- No filler openers: "In today's world", "Hot take:", "Unpopular opinion:"
- Write the opinion, don't announce you're giving one
- Can be witty, irreverent, or uncomfortably direct — that's what performs
- No corporate tone whatsoever

Return only the tweet text. Nothing else.`;
}

function buildPrompt(
  persona: string,
  niche: string,
  tone: string,
  length: string,
  referencePosts: string,
  selectedHook?: string
): string {
  const lineTarget =
    length === "short" ? "10–14 lines" : length === "long" ? "26–34 lines" : "16–22 lines";

  const hookTechnique = pick([
    `HIGH-STAKES MOMENT — drop the reader mid-scene with no context yet.\n   Example: "The wire transfer failed at 11:58pm."`,
    `SPECIFIC NUMBER — lead with a real, surprising figure that demands explanation.\n   Example: "I turned down $340K. Best decision I ever made."`,
    `CONTRARIAN TRUTH — directly contradict widely-held advice.\n   Example: "Consistency is overrated. Timing matters more."`,
    `CURIOSITY GAP — hint at a reveal without giving it away.\n   Example: "There's one line in every pitch deck that kills the deal. Most founders never see it."`,
    `UNCOMFORTABLE CONFESSION — admit a failure or mistake upfront.\n   Example: "For two years I lied to my investors about our churn."`,
    `PROVOCATIVE QUESTION — challenge the reader's identity or assumptions directly.\n   Example: "When did you last say no to something that paid well?"`,
    `THE UNEXPECTED OUTCOME — state a result that shouldn't make sense.\n   Example: "We stopped posting on social media. Our inbound tripled."`,
  ]);

  const bodyStructure = pick([
    `STORY ARC: Open with what happened → what you thought at the time → the turning point → what you now know. Each beat is 2–3 lines.`,
    `NUMBERED INSIGHTS (no bullets): "1." "2." "3." — each on its own line, each a single crisp insight. Build to the most important one last.`,
    `CONTRAST PAIRS: Alternate "what everyone does" vs "what actually works." Short lines. Let the contrast do the work.`,
    `ZOOM IN: Start broad (the industry/world) → zoom into your specific experience → zoom back out to the universal lesson.`,
    `BEFORE / AFTER: Describe the old way you thought or worked. Then the moment it changed. Then what's different now.`,
    `LIST OF TRUTHS: 4–6 short, opinionated one-liners that each stand alone. No connective tissue. Just truths, stacked.`,
  ]);

  const ctaStyle = pick([
    `End with a question that only someone who read the whole post would know how to answer.`,
    `End with a direct challenge: tell the reader to do one specific thing today.`,
    `End with an invitation to disagree — invite the counterpoint to start a thread.`,
    `End by asking readers to share the moment this happened to them too.`,
    `End with a soft vulnerability: admit you're still figuring it out and ask what they've found.`,
  ]);

  const rhythmStyle = pick([
    `Rhythm: ultra-short. Most lines are 5–8 words. Staccato. Punchy. Like a drumbeat.`,
    `Rhythm: varied. Mix 1–2 very short lines (4–6 words) with occasional longer ones (12–15 words) for emphasis.`,
    `Rhythm: conversational flow. Lines feel like natural speech — not clipped, but never rambling. Read it aloud test.`,
  ]);

  return `You are a top LinkedIn ghostwriter. Your posts regularly hit 500+ comments. You write for a ${persona}.

Write a LinkedIn post about: "${niche}"
Tone: ${tone}
Length: ${lineTarget} total

---
FORMATTING (non-negotiable):
- One sentence per line — never two thoughts on the same line
- Blank line between every 2–3 lines
- No dashes, asterisks, bold, headers, or markdown — plain text only
- No em-dashes (—) anywhere

${selectedHook
  ? `---
HOOK — the user has chosen this exact hook. Use it as the first line verbatim:
"${selectedHook}"

Then add a second line that deepens the tension or adds a punch — do NOT explain yet.`
  : `---
HOOK — use this specific technique for the opening 2 lines:
${hookTechnique}

Line 2 must deepen the tension or add a second punch — do NOT explain yet.
Only use "${persona}" in the hook if it adds genuine authority or irony. Never default to "As a ${persona}...".`}

---
BODY STRUCTURE — use this format:
${bodyStructure}

Banned words (never use): leverage, synergy, ecosystem, journey, passionate, excited, humbled, grateful, thrilled, space (as in "industry space").
Write like you're messaging a smart friend, not filing a report.

---
${rhythmStyle}

---
INSIGHT: Land 1–3 opinionated, specific lines the reader wants to screenshot. No "it depends."

---
CTA: ${ctaStyle}
${referencePosts ? `\n---\nSTYLE REFERENCE — match the voice and rhythm of these posts:\n${referencePosts}\n` : ""}
---
Return plain text only. No JSON. No section labels. No intro. Just the post.`;
}

async function generateWithGroq(prompt: string): Promise<string> {
  const groq = new Groq({ apiKey: GROQ_API_KEY });
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.85,
    max_tokens: 1200,
  });
  return completion.choices[0].message.content ?? "";
}

async function generateWithOllama(prompt: string): Promise<string> {
  const res = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      messages: [{ role: "user", content: prompt }],
      stream: false,
      options: { temperature: 0.85 },
    }),
  });
  if (!res.ok) throw new Error(`Ollama error: ${res.statusText}`);
  const data = await res.json();
  return data.message?.content ?? "";
}

export async function POST(req: NextRequest) {
  const { platform, persona, niche, tone, length, referencePosts, selectedHook } = await req.json();

  if (!persona || !niche || !tone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const prompt = platform === "twitter"
    ? buildTwitterPrompt(persona, niche, tone, selectedHook ?? "")
    : buildPrompt(persona, niche, tone, length ?? "medium", referencePosts ?? "", selectedHook ?? "");

  try {
    let post: string;

    if (GROQ_API_KEY) {
      post = await generateWithGroq(prompt);
    } else {
      post = await generateWithOllama(prompt);
    }

    post = post.trim();

    if (!post) throw new Error("Empty response from AI");

    return NextResponse.json({ post });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Generation failed";

    if (!GROQ_API_KEY) {
      return NextResponse.json(
        {
          error: `No AI provider configured. Add GROQ_API_KEY to .env.local (free at console.groq.com) or start Ollama with a model pulled. Detail: ${message}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
