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

TWEET RULES (non-negotiable):
- Maximum 3 lines total — ideally 1 or 2
- Every word must earn its place — cut anything that doesn't add punch
- No @mentions. No "Thread:". No em-dashes.
- No filler openers: "In today's world", "Hot take:", "Unpopular opinion:"
- Write the opinion, don't announce you're giving one
- Can be witty, irreverent, or uncomfortably direct — that's what performs
- No corporate tone whatsoever

HASHTAG RULES (append at the very end of the tweet, on the same or next line):
- Exactly 1–2 hashtags, nothing more
- Must be hyper-specific to the exact topic — not generic (#success, #motivation, #hustle, #mindset, #grind, #entrepreneur)
- Use real communities people search (e.g. #buildinpublic, #SaaS, #IndieHackers, #ProductManagement, #B2BSales)
- No spaces inside hashtags

Return ONLY valid JSON (no markdown, no backticks):
{
  "post": "the tweet text with hashtags at the end"
}`;
}

function buildPrompt(
  persona: string,
  niche: string,
  tone: string,
  length: string,
  referencePosts: string,
  selectedHook?: string
): string {
  const wordTarget =
    length === "short"
      ? "under 75 words per variation — hard limit, be ruthless with cuts"
      : length === "long"
      ? "200–280 words per variation"
      : "100–160 words per variation";

  return `You are ghostwriting for a ${persona} with 50,000+ LinkedIn followers.
Their posts regularly hit 300+ comments and get reshared constantly.
People describe their writing as: honest, direct, and oddly specific.

Write 3 completely different LinkedIn posts about: "${niche}"
Tone: ${tone}
Length: ${wordTarget}

━━━ WHAT MAKES THESE POSTS WORK ━━━

HOOK (first 2 lines — make them impossible to scroll past):
- Lead with a moment, a number, or a claim that creates instant tension
- Line 2 adds a second punch or deepens the mystery — never explains yet
- Do NOT start with "I" on the very first word
- Do NOT use: "In today's world", "Hot take:", "Unpopular opinion:", "Let that sink in"
- Do NOT use the persona label in the hook ("As a ${persona}...") unless it adds real irony or authority

BODY:
- One sentence per line. Never two ideas on the same line.
- Blank line between every 2–3 lines — give the eye room to breathe
- Tell it like a story or build it like a case. Either works. No bullet points.
- Be specific: real numbers, real moments, real decisions. Vague = forgettable.
- Write like you're texting a smart friend who would call you out on BS

VALUE (1–3 lines):
- The insight the reader wants to screenshot and save
- Opinionated. Take a position. No "it depends."

CTA (last line):
- One specific question that only someone who read the whole thing would answer
- Not "What do you think?" — make it personal to the topic

━━━ HARD RULES ━━━
- No em-dashes (—) anywhere
- No markdown, bold, asterisks, or headers
- Max 12 words per line
- Never use: leverage, synergy, ecosystem, journey, passionate, excited, humbled, grateful, thrilled, game-changer, unlock, empower, at the end of the day, the reality is

━━━ 3 VARIATION STYLES ━━━
Variation 1 — STORY: Open with a specific real moment or decision. Take the reader through what happened, what you thought, what changed.
Variation 2 — CONTRARIAN: Open with a bold claim that contradicts what most people in this space believe. Build the case. Land the lesson.
Variation 3 — NUMBERS/RESULTS: Open with a specific surprising result or stat. Work backwards through what caused it.

${selectedHook ? `━━━ HOOK CONSTRAINT ━━━\nEvery variation must open with this exact line:\n"${selectedHook}"\n` : ""}
${referencePosts ? `━━━ VOICE REFERENCE ━━━\nMatch the rhythm and directness of these posts:\n${referencePosts}\n` : ""}
━━━ HASHTAGS ━━━
End each post with 3–5 hashtags on their own line.
Must be hyper-specific to the exact topic. Not generic (#success #motivation #hustle #mindset).
Capitalise each word: #BuildInPublic not #buildinpublic.

Return ONLY valid JSON (no markdown, no backticks, no extra keys):
{
  "variations": [
    "full text of variation 1 with hashtags at end",
    "full text of variation 2 with hashtags at end",
    "full text of variation 3 with hashtags at end"
  ]
}`;
}

async function generateWithGroq(prompt: string): Promise<string> {
  const groq = new Groq({ apiKey: GROQ_API_KEY });
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.85,
    max_tokens: 1400,
    response_format: { type: "json_object" },
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
      format: "json",
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
    let raw: string;

    if (GROQ_API_KEY) {
      raw = await generateWithGroq(prompt);
    } else {
      raw = await generateWithOllama(prompt);
    }

    raw = raw.trim();

    if (!raw) throw new Error("Empty response from AI");

    const parsed = JSON.parse(raw);

    // LinkedIn returns variations array; Twitter returns single post
    if (Array.isArray(parsed.variations) && parsed.variations.length > 0) {
      const variations = parsed.variations.map((v: string) => v.trim()).filter(Boolean);
      if (variations.length === 0) throw new Error("AI returned no post content");
      return NextResponse.json({ variations });
    }

    const post = parsed.post?.trim();
    if (!post) throw new Error("AI returned no post content");
    return NextResponse.json({ variations: [post] });
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
