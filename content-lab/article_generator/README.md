# Protocoding Insights Article Generator

Generate thought leadership articles that sound like your team using proven frameworks from industry leaders.

---

## How It Works

**The Formula:**

```
Framework Articles (structure from Cognizant, McKinsey, etc.)
+ Team Writing Samples (how each person actually writes)
+ Your Article Brief
= Article that sounds authentic but follows proven patterns
```

---

## Quick Start

### 1. Choose Your Writer

| Writer | Best For | Voice Style |
|--------|----------|-------------|
| **Jordan** | AI/ML deep dives, technical architecture | Pragmatic, engineering-focused, detail-oriented |
| **Mitch** | Vision pieces, future of tech | Philosophical, metaphor-rich, big-picture |
| **Raymond** | Business strategy, ROI focus | Executive-friendly, data-driven, persuasive |
| **Ryan** | Implementation guides, tutorials | Developer-friendly, practical, step-by-step |

### 2. Pick a Framework Article

Choose 1-2 from `framework_articles/` that match your desired structure:
- Industry trend analysis
- Research-backed insight
- Implementation guide
- Opinion/point of view

### 3. Create Your Brief

```markdown
**Topic**: [What's the article about?]
**Target Reader**: [CTOs? Developers? Founders?]
**Core Thesis**: [The one thing they should believe after reading]
**Key Points**: [3-5 main ideas]
**Industry Focus**: [Healthcare, Fintech, SaaS, etc.]
**Length**: [Short 800w / Medium 1,500w / Long 2,500w]
**Writer Voice**: [Jordan / Mitch / Raymond / Ryan]
```

### 4. Generate

1. Open `ARTICLE_GENERATOR_PROMPT.md`
2. Fill in framework articles + writing samples + brief
3. Paste into Claude/Cursor
4. Get your draft in ~2 minutes

### 5. Polish (Critical!)

- Read aloud - does it sound like the writer?
- Sharpen the intro - does it hook immediately?
- Check the takeaways - are they actionable?
- Cut 20% - first drafts are always too long

---

## Folder Structure

```
article_generator/
├── README.md (you are here)
├── ARTICLE_GENERATOR_PROMPT.md (the generator)
│
├── framework_articles/
│   ├── _TEMPLATE.md
│   └── framework_cognizant_*.md (structure examples)
│
├── [name]_writing_samples/
│   ├── _TEMPLATE.md
│   └── (each writer's samples)
│
└── generated_articles/
    └── (your generated articles)
```

---

## Article Types

| Type | Length | Frequency | Purpose |
|------|--------|-----------|---------|
| Quick Take | 800w | Weekly | Trend commentary, news reaction |
| Deep Dive | 1,500w | Bi-weekly | Technical analysis, how-to |
| Comprehensive Guide | 2,500w+ | Monthly | Definitive resource, research |

---

## Quality Checklist

Before publishing:

✅ Title would get clicked  
✅ Intro hooks in first 2 sentences  
✅ Sounds like the writer (not generic AI)  
✅ Includes concrete example/case  
✅ Takeaways are actionable  
✅ SEO-friendly structure  
✅ Protocoding mentions are subtle  

---

## Tips for Better Results

1. **Use longer writing samples** - 500+ words each gives better voice capture
2. **Match energy** - Visionary topic needs Mitch, technical needs Jordan
3. **Generate variations** - Run 2-3 times, cherry-pick best parts
4. **Focus the brief** - Vague briefs = generic articles
5. **Update samples** - Add new writing samples quarterly

---

## Remember

**AI gets you 80%, you finish it.**

- Frameworks = structure
- Writing samples = authenticity  
- AI = speed
- Your editing = greatness

Generate 5 articles in the time it takes to write 1.
