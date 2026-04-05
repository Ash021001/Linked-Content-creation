import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { persona, niche, tone, length } = await req.json();

  // Mock response — swap this out for a real AI call (e.g. Claude API)
  const lengthDesc =
    length === "short"
      ? "concise"
      : length === "long"
        ? "detailed and in-depth"
        : "balanced";

  const post = {
    hook: `Most ${persona}s get this wrong about ${niche}.`,
    body: `I used to think ${niche} was straightforward. Then I spent 3 years in the trenches.

Here's what nobody tells you:

→ The conventional wisdom is often backwards
→ Small, consistent actions beat sporadic big moves
→ Your ${persona.toLowerCase()} perspective is your biggest competitive advantage

The ${tone.toLowerCase()} truth is that success in ${niche} comes down to one thing: showing up with intention every single day.

I've seen countless people with more resources fail while those with clarity and consistency win.

${
  lengthDesc === "detailed and in-depth"
    ? `Let me break down the 3 frameworks I use:

1. The Clarity Framework — Know exactly what outcome you're driving toward
2. The Consistency Engine — Build systems that work even when motivation fails
3. The Community Loop — Leverage your network as a force multiplier

Each of these alone is powerful. Together, they're unstoppable.`
    : ""
}`,
    cta: `What's your biggest challenge with ${niche} right now? Drop it in the comments — I read every reply.`,
  };

  return NextResponse.json(post);
}
