# LinkedIn AI Content Generator

A minimal, clean web app for generating high-quality LinkedIn posts using AI. Built for founders, engineers, marketers, and creators who want to publish consistently without spending hours on copy.

---

## Features

- **AI Post Generator** — Generate full LinkedIn posts tailored to your persona, niche, tone, and length using Groq's LLaMA model
- **Hook Generator** — Generate 5 distinct hook options using different psychological techniques (curiosity gap, contrarian truth, confession, etc.) and pick the one that fits
- **Templates System** — 10 hand-crafted templates across 5 categories (Storytelling, Thought Leadership, Career & Growth, Productivity, Social Proof) that pre-fill the form instantly
- **Dark Mode** — Full dark/light mode toggle with system preference detection and localStorage persistence
- **Copy to Clipboard** — One-click copy of the generated post

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| AI Provider | [Groq API](https://console.groq.com/) — `llama-3.3-70b-versatile` (free tier) |
| Language | TypeScript |
| Local AI (optional) | [Ollama](https://ollama.com/) fallback support |

---

## Screenshots

> _Screenshots coming soon_

| Generate Post | Hook Picker | Templates |
|---|---|---|
| ![Generate Post](./public/screenshots/generate.png) | ![Hook Picker](./public/screenshots/hooks.png) | ![Templates](./public/screenshots/templates.png) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A free [Groq API key](https://console.groq.com) (no credit card required)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/linkedin-ai-writer.git
cd linkedin-ai-writer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example env file:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and add your Groq API key:

```env
GROQ_API_KEY=gsk_your_key_here
```

Get a free key at [console.groq.com](https://console.groq.com) — no credit card, 6,000 requests/day free.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Using Ollama (Local AI, No API Key)

If you'd prefer to run fully offline:

```bash
# Install Ollama from https://ollama.com
ollama pull llama3.2
```

Leave `GROQ_API_KEY` unset in `.env.local` — the app will automatically fall back to Ollama.

---

## Project Structure

```
app/
├── api/
│   ├── generate/route.ts     # POST /api/generate — full post generation
│   └── hooks/route.ts        # POST /api/hooks — 5 hook options
├── components/
│   ├── Sidebar.tsx            # Navigation + dark mode toggle
│   ├── GenerateForm.tsx       # Main form (persona, niche, tone, length)
│   ├── PostOutput.tsx         # Generated post display + copy
│   ├── HookPicker.tsx         # Hook selection UI
│   ├── TemplateCard.tsx       # Individual template card
│   ├── CategoryFilter.tsx     # Template category filter pills
│   └── ThemeProvider.tsx      # Dark/light mode context
├── lib/
│   └── templates.ts           # Template data and types
├── templates/page.tsx         # Templates page
├── keywords/page.tsx          # Placeholder
├── billing/page.tsx           # Placeholder
├── layout.tsx                 # Root layout
└── page.tsx                   # Home — Generate Post
```

---

## Future Improvements

- **Authentication** — User accounts with saved preferences and post history
- **Post History** — Save generated posts to a database (e.g. Supabase or PlanetScale)
- **Scheduling** — Schedule posts directly to LinkedIn via the LinkedIn API
- **Analytics** — Track which post styles and hooks perform best
- **More Templates** — Community-contributed templates by niche and industry
- **Post Variants** — Generate multiple full post variations at once and compare

---

## License

MIT
