import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.2";

function buildHookPrompt(persona: string, niche: string, tone: string): string {
  return `You are a world-class LinkedIn copywriter. Your hooks stop people mid-scroll.

Write exactly 5 hooks for a LinkedIn post by a ${persona} about: "${niche}"
Tone: ${tone}

Each hook must use a DIFFERENT psychological technique from this list:
1. HIGH-STAKES MOMENT — drop mid-scene with zero context. Reader must continue.
   Example: "The client hung up. We had 4 hours to fix it."
2. SPECIFIC NUMBER — a real figure so surprising it demands explanation.
   Example: "I said no to $500K. Here's why it was obvious."
3. CONTRARIAN TRUTH — directly contradicts popular advice or common belief.
   Example: "Hustle culture isn't killing your productivity. Your meetings are."
4. CURIOSITY GAP — hint at a reveal without giving it away. Incomplete thought.
   Example: "There's one mistake almost every first-time founder makes. It's not what you think."
5. UNCOMFORTABLE CONFESSION — admit something most people hide.
   Example: "I faked confidence for the first 2 years of running my company."

Rules for every hook:
- Maximum 2 lines. Ideally 1.
- No em-dashes (—). No bullet points. No markdown.
- Never start with "As a ${persona}..."
- No generic openers: "In today's world", "I'm excited to share", "Lessons learned"
- Each must feel like it was written by a different person with a different voice
- Short, sharp, impossible to ignore

Return ONLY a JSON object in this exact format (no markdown, no backticks):
{
  "hooks": [
    "hook one text",
    "hook two text",
    "hook three text",
    "hook four text",
    "hook five text"
  ]
}`;
}

async function callGroq(prompt: string): Promise<string> {
  const groq = new Groq({ apiKey: GROQ_API_KEY });
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.95,
    max_tokens: 600,
    response_format: { type: "json_object" },
  });
  return completion.choices[0].message.content ?? "";
}

async function callOllama(prompt: string): Promise<string> {
  const res = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      messages: [{ role: "user", content: prompt }],
      stream: false,
      format: "json",
      options: { temperature: 0.95 },
    }),
  });
  if (!res.ok) throw new Error(`Ollama error: ${res.statusText}`);
  const data = await res.json();
  return data.message?.content ?? "";
}

export async function POST(req: NextRequest) {
  const { persona, niche, tone } = await req.json();

  if (!persona || !niche || !tone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const prompt = buildHookPrompt(persona, niche, tone);

  try {
    const raw = GROQ_API_KEY ? await callGroq(prompt) : await callOllama(prompt);
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed.hooks) || parsed.hooks.length === 0) {
      throw new Error("Invalid hooks response");
    }

    return NextResponse.json({ hooks: parsed.hooks.slice(0, 5) });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Hook generation failed";

    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: `No AI provider configured. Add GROQ_API_KEY to .env.local. Detail: ${message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
