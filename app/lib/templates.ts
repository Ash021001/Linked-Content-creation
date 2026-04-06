export type TemplateCategory =
  | "Storytelling"
  | "Thought Leadership"
  | "Career & Growth"
  | "Productivity"
  | "Social Proof";

export interface Template {
  id: string;
  title: string;
  description: string;
  category: TemplateCategory;
  persona: string;
  niche: string;
  tone: string;
  length: "short" | "medium" | "long";
  previewHint: string;
}

export const CATEGORIES: TemplateCategory[] = [
  "Storytelling",
  "Thought Leadership",
  "Career & Growth",
  "Productivity",
  "Social Proof",
];

export const templates: Template[] = [
  {
    id: "founder-fired-cofounder",
    title: "The Day I Fired My Co-Founder",
    description:
      "A raw, honest account of the hardest decision a founder makes — and what it costs you if you wait too long.",
    category: "Storytelling",
    persona: "Founder / Entrepreneur",
    niche: "the emotional and business reality of co-founder breakups and misaligned equity splits",
    tone: "Conversational",
    length: "long",
    previewHint:
      "\"We'd been friends for 11 years. He was my best man. And I had to tell him his equity was gone.\"",
  },
  {
    id: "engineer-laid-off-best-thing",
    title: "Getting Laid Off Was the Best Thing That Happened to Me",
    description:
      "Turn a layoff story into a career inflection point — the specific moves that led to a better outcome within 60 days.",
    category: "Career & Growth",
    persona: "Software Engineer",
    niche: "navigating tech layoffs, rebuilding momentum, and landing a better role afterward",
    tone: "Inspirational",
    length: "medium",
    previewHint:
      "\"Friday 9am: Slack DM from HR. Friday 9:04am: I started building something I'd been putting off for 3 years.\"",
  },
  {
    id: "pm-killed-winning-feature",
    title: "I Killed a Feature That Users Loved. Here's Why.",
    description:
      "A counterintuitive product decision that looked wrong on the surface — and the data framework that made it obvious.",
    category: "Thought Leadership",
    persona: "Product Manager",
    niche: "making hard product cuts, saying no to users, and long-term roadmap clarity",
    tone: "Analytical",
    length: "long",
    previewHint:
      "\"Our most-loved feature had 40% DAU. We deleted it anyway. NPS went up 18 points the next month.\"",
  },
  {
    id: "founder-zero-revenue-pitch",
    title: "I Raised $2M With Zero Revenue. Here's the Exact Pitch.",
    description:
      "Deconstruct the narrative, slide order, and founder signals that closed pre-seed investors — with nothing but a deck.",
    category: "Social Proof",
    persona: "Founder / Entrepreneur",
    niche: "pre-seed fundraising, pitch deck structure, and investor psychology at the zero-revenue stage",
    tone: "Bold",
    length: "long",
    previewHint:
      "\"No revenue. No waitlist. No famous angels. Just a 12-slide deck and a story that made the problem feel inevitable.\"",
  },
  {
    id: "career-coach-salary-negotiation",
    title: "You Left Money on the Table at Your Last Job Offer",
    description:
      "The exact script and psychology behind a negotiation that added $30K — without a competing offer.",
    category: "Career & Growth",
    persona: "Career Coach",
    niche: "salary negotiation tactics, offer psychology, and the silence technique that works every time",
    tone: "Bold",
    length: "medium",
    previewHint:
      "\"The recruiter said 'this is our best offer.' I said nothing for 8 seconds. They came back with $28K more.\"",
  },
  {
    id: "sales-lost-deal-lesson",
    title: "I Lost a $400K Deal Because of One Email",
    description:
      "Dissect a deal that fell apart at the finish line — and the one communication mistake that killed it.",
    category: "Storytelling",
    persona: "Sales Leader",
    niche: "enterprise deal post-mortems, late-stage deal risk, and what champions can't save you from",
    tone: "Conversational",
    length: "medium",
    previewHint:
      "\"The champion loved us. Legal was done. Then I sent a 'just checking in' email to the CFO. It was over in 4 hours.\"",
  },
  {
    id: "engineer-ship-side-project",
    title: "I Shipped a Side Project Every Week for 90 Days",
    description:
      "What 13 consecutive weekly launches taught about shipping fast, building in public, and what actually gets traction.",
    category: "Productivity",
    persona: "Software Engineer",
    niche: "building in public, rapid shipping discipline, and finding product-market fit through volume",
    tone: "Conversational",
    length: "medium",
    previewHint:
      "\"Week 1: 3 users (my mom, my roommate, a bot). Week 11: 4,200 signups overnight. Here's what changed.\"",
  },
  {
    id: "marketer-viral-post-breakdown",
    title: "My Post Got 2M Impressions. Here's What I Did Differently.",
    description:
      "Reverse-engineer a viral LinkedIn post — the hook formula, format choices, and the 11pm timing that made it explode.",
    category: "Thought Leadership",
    persona: "Marketing Professional",
    niche: "LinkedIn content virality, post structure psychology, and the algorithm signals most creators ignore",
    tone: "Analytical",
    length: "long",
    previewHint:
      "\"I've posted 300 times on LinkedIn. One post did more than the other 299 combined. The difference was one sentence.\"",
  },
  {
    id: "consultant-fired-client",
    title: "I Fired a Client Paying Me $20K/Month",
    description:
      "The moment a high-paying client became a liability — and how walking away led to a practice 3x more profitable.",
    category: "Storytelling",
    persona: "Consultant",
    niche: "client selection, scope creep, and building a consulting practice around leverage not hours",
    tone: "Bold",
    length: "medium",
    previewHint:
      "\"They were 40% of my revenue. They were also destroying the other 60%. The math only looks scary until you do it.\"",
  },
  {
    id: "investor-passed-unicorn",
    title: "I Passed on a Company That's Now Worth $3B",
    description:
      "A brutally honest look at the reasoning behind a miss — and what it permanently changed about how to evaluate founders.",
    category: "Thought Leadership",
    persona: "Investor",
    niche: "investment mistakes, founder evaluation frameworks, and pattern-matching bias in venture",
    tone: "Professional",
    length: "medium",
    previewHint:
      "\"My notes from the meeting said: 'market too small, founder too quiet.' I think about that every week.\"",
  },
];
