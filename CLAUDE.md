# Project: LinkedIn AI Writer

Goal:
Build a minimal SuperPen-like app.

Rules:
- Keep everything simple and clean
- Use Next.js + Tailwind
- No authentication for now
- No database
- Focus only on UI + AI generation

Core Features (MVP):
1. Sidebar (like ChatGPT)
2. One working page: "Generate Post"
3. Other sidebar items are placeholders

UI Layout:
- Left sidebar:
  - Generate Post
  - Templates (placeholder)
  - Keywords (placeholder)
  - Billing (placeholder)

- Main page:
  - Step-based form:
    1. Persona
    2. Niche
    3. Tone
    4. Length
    5. Reference posts

Output:
- Generated LinkedIn post with:
  - Hook
  - Body
  - CTA
# Project: LinkedIn AI Writer

Goal:
Build a minimal SuperPen-like app for generating viral LinkedIn posts.

Core Features:
- AI Post Generator (main feature)
- Templates (pre-filled inputs via URL params)
- Post history (localStorage)
- Inline editing of generated content

UI Guidelines:
- Clean, minimal, ChatGPT-like layout
- Sidebar navigation:
  - Generate Post
  - Templates
  - Keywords (placeholder)
  - Billing (placeholder)

Generator Requirements:
- Output must be high-quality LinkedIn posts
- Structure:
  1. Strong hook (first 2 lines scroll-stopping)
  2. Short paragraphs / line breaks
  3. Conversational tone
  4. Clear CTA at end

Templates:
- Should feel like real viral post ideas
- Each must include:
  - Title
  - Description
  - Preview hook
  - Pre-filled inputs (persona, niche, tone, length)

Rules:
- Keep everything simple (no overengineering)
- No authentication for now
- No database
- Focus on usability and output quality

Tech:
- Next.js + Tailwind
- AI via API (Groq or similar)

Important:
- Prioritize output quality over adding features
- Keep UX smooth and intuitive

Important:
- Clean UI > fancy features
- Make components reusable