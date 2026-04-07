# Project: Hookly (AI Content Engine)

## Vision
Build a premium SaaS product that helps users create scroll-stopping content for LinkedIn and Twitter (X) in seconds.

This is NOT just an AI generator.
This is a content system focused on:
- High-quality output
- Strong hooks
- Clean UX
- Real-world usability

---

## Core Features

### 1. AI Content Generator
Supports multiple platforms:
- LinkedIn
- Twitter (X)

#### LinkedIn Output:
- Strong hook (first 1–2 lines)
- Short, punchy paragraphs
- Conversational tone
- Storytelling or insights
- Ends with CTA (question or engagement)

#### Twitter (X) Output:
- Very short (1–3 lines max)
- Sharp, witty, impactful
- Can be bold or opinionated
- High punch per word

---

### 2. Hook Generator
- Generates 5 different hook options
- Hooks must be:
  - curiosity-driven
  - short and punchy
  - highly engaging
- User can select and reuse a hook

---

### 3. Templates System
- Predefined templates:
  - Story
  - List
  - Contrarian
  - Growth
  - Career

Each template:
- Has title, description, preview hook
- Feels like a real viral post idea
- Pre-fills inputs via URL params

---

### 4. Post History
- Stored in localStorage
- Users can revisit past generated content

---

### 5. Inline Editing
- Users can edit generated output directly
- No need to copy elsewhere

---

### 6. Regenerate Feature
- Allows generating a new variation of the same input
- Output should vary in tone and structure

---

## UI / UX Guidelines

### Design Style
- Premium SaaS feel
- Minimal, clean, modern
- Inspired by ChatGPT and Notion

### Theme
- Pure black background (#000000)
- White and gray text
- Subtle borders
- No bright or flashy colors

### Layout
- Responsive for mobile, tablet, desktop
- No horizontal scroll

#### Sidebar:
- Generate
- Templates
- Hooks
- History

On mobile:
- Sidebar becomes hamburger menu or top nav

---

### Components
- Rounded corners
- Soft shadows
- Proper spacing and padding
- Consistent typography

---

## Output UI

- Should look like real social media posts

### Requirements:
- Proper line breaks
- Clean readable formatting
- Highlight hook section

### Features:
- Copy button
- Regenerate button


---

## UX Enhancements

- Smooth transitions
- Loading states (skeletons or spinners)
- Hover effects
- Clear empty states (guide users)

---

## Templates UX

- Grid layout:
  - 1 column (mobile)
  - 2 columns (tablet)
  - 3+ columns (desktop)

- Each template card:
  - Title
  - Description
  - Preview hook
  - Tone + length indicators

---

## AI Prompt Requirements

Output must:
- Feel human-written
- Avoid generic AI phrases
- Use short lines (1 sentence per line)
- Be engaging and scroll-stopping

### Structure (LinkedIn):
1. Hook
2. Body
3. Insight
4. CTA

### Structure (Twitter):
- Short, impactful statement
- Optional punchline

---

## Rules

- Keep everything simple
- No authentication for now
- No database for now
- No overengineering
- Prioritize output quality over features
- Prioritize UX over adding new features

---

## Tech Stack

- Next.js
- Tailwind CSS
- AI API (Groq or similar)

---

## Current Goals

- Improve output quality to be highly engaging
- Make UI feel premium and production-ready
- Ensure full responsiveness
- Make app smooth and intuitive

---

## Future Scope (NOT now)

- Authentication
- Database (save posts across devices)
- Paid plans
- Analytics
- Scheduling posts