import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.2";

function buildPrompt(
  persona: string,
  niche: string,
  tone: string,
  length: string,
  referencePosts: string
): string {
  const wordTarget =
    length === "short" ? "under 150 words" : length === "long" ? "300+ words" : "150–300 words";

  return `You are an expert LinkedIn ghostwriter. Write a LinkedIn post for a ${persona} about the topic: "${niche}".

Tone: ${tone}
Length: ${wordTarget}
${referencePosts ? `\nStyle reference (mimic the voice and structure of these posts):\n${referencePosts}\n` : ""}

Return ONLY valid JSON with this exact structure (no markdown, no backticks):
{
  "hook": "A powerful opening line that stops the scroll",
  "body": "The main content of the post (use line breaks and bullet points where natural)",
  "cta": "A strong call-to-action to drive engagement"
}`;
}

async function generateWithGroq(prompt: string) {
  const groq = new Groq({ apiKey: GROQ_API_KEY });
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
    max_tokens: 1024,
    response_format: { type: "json_object" },
  });
  return completion.choices[0].message.content ?? "";
}

async function generateWithOllama(prompt: string) {
  const res = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      messages: [{ role: "user", content: prompt }],
      stream: false,
      format: "json",
      options: { temperature: 0.8 },
    }),
  });
  if (!res.ok) throw new Error(`Ollama error: ${res.statusText}`);
  const data = await res.json();
  return data.message?.content ?? "";
}

export async function POST(req: NextRequest) {
  const { persona, niche, tone, length, referencePosts } = await req.json();

  if (!persona || !niche || !tone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const prompt = buildPrompt(persona, niche, tone, length ?? "medium", referencePosts ?? "");

  let raw = "";

  try {
    if (GROQ_API_KEY) {
      raw = await generateWithGroq(prompt);
    } else {
      // Fallback to local Ollama
      raw = await generateWithOllama(prompt);
    }

    const post = JSON.parse(raw);

    if (!post.hook || !post.body || !post.cta) {
      throw new Error("Incomplete response from AI");
    }

    return NextResponse.json(post);
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
