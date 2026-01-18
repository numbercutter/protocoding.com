# Insights Article Generator Prompt

## Purpose

Generate thought leadership articles for Protocoding's Insights section using proven frameworks from industry leaders (like Cognizant), combined with your team's authentic writing voices and expertise.

---

## How to Use This System

### Step 1: Gather Framework Articles

1. Find 2-3 high-quality industry articles you admire (structure, not content)
2. Save them in `framework_articles/` folder
3. Name them descriptively (e.g., `framework_cognizant_legacy_modernization.md`)

**Good sources**: Cognizant Insights, McKinsey Digital, Deloitte Tech Trends, Harvard Business Review

### Step 2: Capture Writer Voice Samples

1. Get writing samples from each Protocoding team member
2. Save these in `[name]_writing_samples/` folders
3. Include their natural writing style - this is the gold
4. Can be from emails, internal docs, previous articles, or transcribed thoughts

**Available Writers**:
- **Jordan** - Technical depth, AI/ML focus, pragmatic engineering perspective
- **Mitch** - Visionary/philosophical, tech-meets-consciousness, metaphor-rich
- **Raymond** - Business-oriented, ROI-focused, executive communication style
- **Ryan** - Practical implementation, how-to focus, developer-friendly

### Step 3: Define Your Article Brief

Create a brief for your new article including:

- **Topic**: The main subject/angle
- **Target Reader**: Who is this for? (CTOs, founders, developers, etc.)
- **Core Thesis**: The one thing readers should believe after reading
- **Key Points**: 3-5 main ideas to cover
- **Industry Focus**: Healthcare, fintech, SaaS, etc.
- **Length**: Short (800 words), Medium (1,500 words), Long (2,500+ words)
- **Writer**: Which team member's voice to use

### Step 4: Generate the Article

Use the prompt below with:
- Your article brief
- 1-2 framework articles (for structure)
- 2-3 writing samples from chosen author

---

## The Generator Prompt

```
You are a thought leadership writer creating content for Protocoding's Insights section.

BRAND VOICE RULES:
- AI-first perspective on all technology topics
- Practical, actionable insights (not just theory)
- Direct communication, no corporate fluff
- Data-informed but not data-heavy
- Acknowledge complexity while providing clarity
- Strong point of view, not fence-sitting
- Focus on "what this means for you" for the reader

PROTOCODING POSITIONING:
- We build AI-powered software and intelligent integrations
- We work with healthcare, fintech, SaaS, e-commerce, manufacturing
- We're practitioners, not just consultants - we ship code
- Our edge: senior engineers who understand both AI and business

YOUR TASK:
Generate an article that combines:
1. The structural framework from these successful articles
2. The authentic writing voice of the chosen author
3. The new article topic and angle provided

---

### FRAMEWORK ARTICLES TO STUDY (for structure only):
[Paste 1-2 framework articles here]

Analyze these for:
- How they structure arguments (problem → insight → solution)
- How they use data and research
- Section flow and pacing
- How they make complex topics accessible
- Call-to-action and conclusion patterns

---

### WRITER'S VOICE SAMPLES:
[Paste 2-3 writing samples from chosen author here]

Extract from these:
- Sentence structure and length preferences
- Vocabulary and technical depth
- Use of metaphors and analogies
- Tone (formal vs conversational)
- How they explain complex concepts

---

### ARTICLE BRIEF:

**Topic**: 
**Target Reader**: 
**Core Thesis**: 
**Key Points**: 
**Industry Focus**: 
**Length**: 
**Writer Voice**: 

---

OUTPUT FORMAT:

# [Article Title]

**Subtitle**: [Compelling one-liner that expands on title]

**Author**: [Writer name], [Role] at Protocoding
**Reading Time**: [X] min read
**Category**: [AI & Machine Learning / Engineering / Strategy / Industry]

---

## Executive Summary
[2-3 sentence overview for skimmers - the "TL;DR"]

---

## Introduction
[Hook that establishes stakes and relevance]
[Context setting]
[Thesis statement / what this article will prove]

---

## [Section 1 Header]
[Main argument with supporting evidence]
[Practical example or case reference]
[Key insight or framework]

## [Section 2 Header]
[Continue pattern...]

## [Section 3 Header]
[Continue pattern...]

---

## What This Means for Your Business
[Practical implications]
[Action items or next steps]
[How Protocoding can help (subtle, not salesy)]

---

## Key Takeaways
- [Bullet 1]
- [Bullet 2]
- [Bullet 3]

---

**About the Author**: [Brief bio of the writer]

---

GENERATION RULES:
1. Extract STRUCTURE from framework articles (how they build arguments, use data, create flow)
2. Extract VOICE from writer samples (word choice, rhythm, explanation style)
3. Apply BOTH to the new article topic
4. Include at least one concrete example or mini case study
5. Use specific numbers/statistics where relevant
6. Make it scannable (headers, bullets, bold key phrases)
7. End with clear, actionable takeaways
8. Sound like the writer explaining to a smart colleague, not lecturing
9. Tie insights back to AI/technology where relevant
10. Keep Protocoding mentions minimal and relevant (1-2 max)
```

---

## Quality Checklist

Before finalizing an article, verify:

- [ ] Title is specific and compelling (not generic)
- [ ] Executive summary captures the full value
- [ ] Introduction hooks the reader in first 2 sentences
- [ ] Each section has a clear point and flows to the next
- [ ] Includes at least one concrete example/case
- [ ] Data or research citations where claims are made
- [ ] Sounds like the chosen writer (not generic AI)
- [ ] Actionable takeaways (not just "food for thought")
- [ ] Appropriate length for the topic
- [ ] SEO-friendly headers and structure
- [ ] Protocoding positioning is subtle, not salesy

---

## Article Types & Templates

### 1. Industry Trend Analysis
**Structure**: Current state → Emerging shift → Implications → How to prepare
**Best for**: Positioning as forward-thinking, attracting enterprise readers
**Example**: "AI's Two-Year Timeline for Legacy Modernization"

### 2. How-To / Implementation Guide  
**Structure**: Problem → Approach → Step-by-step → Pitfalls to avoid → Results
**Best for**: Developer audience, demonstrating expertise
**Example**: "Implementing AI Agents in Enterprise Workflows"

### 3. Point of View / Opinion
**Structure**: Controversial take → Why conventional wisdom is wrong → Evidence → New framework
**Best for**: Thought leadership, social sharing, starting conversations
**Example**: "Why Most AI Projects Fail (And What Actually Works)"

### 4. Research Summary / Data Story
**Structure**: Key finding → Methodology → Deep dive on insights → Implications
**Best for**: Building credibility, earning backlinks
**Example**: "State of AI Adoption in Healthcare: 2026 Report"

### 5. Case Study / Success Story
**Structure**: Challenge → Approach → Solution → Results → Lessons
**Best for**: Converting prospects, demonstrating capabilities
**Example**: "How [Client] Reduced Appraisal Time by 70% with AI"

---

## Pro Tips

### For Better Framework Extraction:
- Look for how they structure reveals (problem → insight → solution)
- Note their use of data and research
- Identify their pattern interrupts and surprising insights
- Study how they make complex topics accessible

### For Better Voice Capture:
- Use longer samples (500+ words each)
- Include variety: technical explanation, opinion, storytelling
- Note recurring phrases and sentence patterns
- Pay attention to how they use analogies

### For Better Article Generation:
- Start with the title - if it wouldn't get clicked, restart
- Write the takeaways first - know what the reader walks away with
- Generate 2-3 versions and cherry-pick best sections
- Read aloud - if it doesn't flow naturally, revise
- Cut 20% - first drafts are always too long

---

## Folder Structure

```
article_generator/
├── ARTICLE_GENERATOR_PROMPT.md (this file)
├── README.md (quick start guide)
├── framework_articles/
│   ├── _TEMPLATE.md
│   ├── framework_cognizant_legacy_modernization.md
│   ├── framework_cognizant_agent_experience.md
│   └── (add more as you find good ones)
├── jordan_writing_samples/
│   ├── _TEMPLATE.md
│   └── (Jordan's writing samples)
├── mitch_writing_samples/
│   ├── _TEMPLATE.md
│   └── (Mitch's writing samples)
├── raymond_writing_samples/
│   ├── _TEMPLATE.md
│   └── (Raymond's writing samples)
├── ryan_writing_samples/
│   ├── _TEMPLATE.md
│   └── (Ryan's writing samples)
└── generated_articles/
    ├── _EXAMPLE_ARTICLE.md
    └── (generated articles go here)
```

---

## Content Calendar Integration

Suggested cadence:
- **Weekly**: 1 short article (800 words) - trend commentary or quick take
- **Bi-weekly**: 1 medium article (1,500 words) - deep dive or how-to
- **Monthly**: 1 long-form piece (2,500+ words) - research or comprehensive guide

Rotate writers to keep voice fresh and showcase team expertise.

---

**Remember**: Framework + Voice + Topic = Authentic thought leadership that sounds like your team, structured like the best in the industry.
