#!/usr/bin/env bun
/**
 * Article Generator Script
 * 
 * Usage:
 *   bun run content-lab/scripts/generate-article.ts --topic "Your topic" --writer jordan
 *   bun run content-lab/scripts/generate-article.ts --interactive
 * 
 * Options:
 *   --topic     Article topic/title idea
 *   --writer    Writer voice (jordan, ryan, mitch, raymond)
 *   --category  Category (ai, engineering, startups, trends, case-studies)
 *   --length    short (800w), medium (1500w), long (2500w)
 *   --interactive  Interactive mode with prompts
 */

import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, readdirSync, existsSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import * as readline from "readline";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Types
interface ArticleBrief {
  topic: string;
  writer: "jordan" | "ryan" | "mitch" | "raymond";
  category: "ai" | "engineering" | "startups" | "trends" | "case-studies";
  length: "short" | "medium" | "long";
  targetReader?: string;
  coreThesis?: string;
  keyPoints?: string[];
}

interface GeneratedArticle {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  topic: string;
  readTime: string;
  content: Array<{
    type: "heading" | "paragraph" | "list" | "quote" | "code";
    content: string | string[];
  }>;
  tags: string[];
}

// Constants
const CONTENT_LAB_DIR = join(__dirname, "..");
const ARTICLE_GEN_DIR = join(CONTENT_LAB_DIR, "article_generator");

const WRITER_INFO: Record<string, { name: string; role: string; image: string; style: string; voiceNotes: string }> = {
  jordan: {
    name: "Jordan Lesson",
    role: "Founder",
    image: "/team/jordan.png",
    style: "Technical depth, AI/ML focus, pragmatic engineering perspective, talks about infrastructure costs and data",
    voiceNotes: `
- Talks in flowing, connected thoughts. Uses "So I think..." and "I mean..." to bridge ideas
- Comfortable with uncertainty: "we don't actually know", "who knows if they're actually"
- Uses sports/competition metaphors: "survival of the fittest", "fight for market share", "throw a dart on the board blindfolded"
- Gets excited about infrastructure and energy: nuclear power plants, fusion energy, data centers
- Thinks long-term: "in the long run", "thinking as long term as possible"
- Bridges AI to quantum computing and physics naturally
- Says "a hundred percent", "first and foremost", "to kind of circle back"
- Grounded optimism: acknowledges problems but sees paths forward`,
  },
  ryan: {
    name: "Ryan Lesson",
    role: "Founder", 
    image: "/team/ryan.png",
    style: "Direct, conversational, uses humor, practical business advice, says 'y'all', very honest about what works",
    voiceNotes: `
- Opens casually: "What's up y'all?", "So in today's video..."
- Uses self-deprecating humor: "Take Adderall... I'm totally just kidding"
- Very direct and blunt: "if you're not growing, you're dying", "let them go"
- Repeats key points for emphasis: "Make sure you follow up. Following up is key here."
- Real numbers and specifics: "five figure paychecks", "net 45 to collect", "100 hours"
- Business wisdom from experience: "win-win-win", "snowball effect"
- Admits harsh truths: "you failed by bringing them on", "the only one to blame is you"
- Ends with principle: "just do the right thing"
- Southern warmth with hard truths: caring but no-nonsense`,
  },
  mitch: {
    name: "Mitch Carrara",
    role: "Founding Software Engineer",
    image: "/team/mitch.png",
    style: "Philosophical, metaphor-rich, tech-meets-design thinking, big-picture perspective",
    voiceNotes: `
- Opens with unexpected hooks: "Yeah, it's real. I had a dream about a flying spider last night."
- Uses physics metaphors for consciousness: "wave", "peaks and valleys", "oscillation", "frequency"
- Speaks in poetic fragments: "within a breath, within a relaxed, positive state"
- Big concepts made personal: "You're an architect for your reality"
- Authentic and magnetic: "There's nothing more magnetic than someone who's being authentic"
- Spiritual but practical: "design your reality", "self-audit", "logical structure"
- Warns against seeking external validation: "try to convince other people"
- Comfortable with not having answers: "I don't have a five year plan"
- Talks about cutting things off: relationships, habits, the world
- Ends with simplicity: "Just don't do a lot of the stuff you're currently doing"`,
  },
  raymond: {
    name: "Raymond Spartz",
    role: "Engineering Lead",
    image: "/team/raymond.png",
    style: "Business-oriented, ROI-focused, executive communication style, practical frameworks",
    voiceNotes: `
- Clear structure: numbers points, clear transitions
- ROI and metrics focused: quantifies everything
- Executive communication: concise, actionable
- Frameworks and models: likes systematic approaches
- Risk-aware: acknowledges downsides before solutions
- Professional tone but not stiff
- Balances technical depth with business impact`,
  },
};

const LENGTH_WORDS: Record<string, { min: number; max: number; sections: number; paragraphsPerSection: number }> = {
  short: { min: 800, max: 1000, sections: 4, paragraphsPerSection: 2 },
  medium: { min: 1500, max: 1800, sections: 5, paragraphsPerSection: 3 },
  long: { min: 2500, max: 3000, sections: 7, paragraphsPerSection: 3 },
};

// Calculate read time from word count (average 200 words/min)
function calculateReadTime(wordCount: number): string {
  const minutes = Math.ceil(wordCount / 200);
  return `${minutes} min read`;
}

// Load files
function loadWriterSamples(writer: string): string {
  const samplesDir = join(ARTICLE_GEN_DIR, `${writer}_writing_samples`);
  if (!existsSync(samplesDir)) {
    // Fall back to script_generator voice samples
    const voiceDir = join(CONTENT_LAB_DIR, "script_generator", `${writer}_voice_samples`);
    if (!existsSync(voiceDir)) {
      console.warn(`No samples found for ${writer}`);
      return "";
    }
    const files = readdirSync(voiceDir).filter(f => f.endsWith(".md") && !f.startsWith("_"));
    return files.map(f => readFileSync(join(voiceDir, f), "utf-8")).join("\n\n---\n\n");
  }
  const files = readdirSync(samplesDir).filter(f => f.endsWith(".md") && !f.startsWith("_"));
  return files.map(f => readFileSync(join(samplesDir, f), "utf-8")).join("\n\n---\n\n");
}

function loadFrameworkArticles(): string {
  const frameworkDir = join(ARTICLE_GEN_DIR, "framework_articles");
  if (!existsSync(frameworkDir)) return "";
  const files = readdirSync(frameworkDir).filter(f => f.endsWith(".md") && !f.startsWith("_"));
  return files.slice(0, 2).map(f => readFileSync(join(frameworkDir, f), "utf-8")).join("\n\n---\n\n");
}

function loadAntiSlopRules(): string {
  const rulesPath = join(ARTICLE_GEN_DIR, "rules", "anti_ai_slop.md");
  if (!existsSync(rulesPath)) return "";
  return readFileSync(rulesPath, "utf-8");
}

// Build the prompt
function buildPrompt(brief: ArticleBrief): string {
  const writerInfo = WRITER_INFO[brief.writer];
  const lengthInfo = LENGTH_WORDS[brief.length];
  const writerSamples = loadWriterSamples(brief.writer);
  const frameworkArticles = loadFrameworkArticles();
  const antiSlopRules = loadAntiSlopRules();

  return `You are writing a thought leadership article for Protocoding's Insights section.

## CRITICAL ANTI-AI RULES (FOLLOW EXACTLY)
${antiSlopRules}

## WRITER VOICE - THIS IS CRITICAL
You are writing as ${writerInfo.name}, ${writerInfo.role} at Protocoding.

### Voice DNA (extracted from real conversations):
${writerInfo.voiceNotes}

### Style summary: ${writerInfo.style}

### Writer's actual voice samples - STUDY THESE CAREFULLY:
${writerSamples || "No samples available - write in a natural, conversational tech professional voice"}

IMPORTANT: The article should sound like ${writerInfo.name} wrote it, not like a generic AI. Use their specific phrases, sentence patterns, and thought flow from the samples above. If Jordan says "a hundred percent" and uses competition metaphors, use those. If Ryan says "y'all" and is blunt, be blunt. If Mitch uses consciousness/wave metaphors, use those.

## FRAMEWORK REFERENCE (for structure only)
${frameworkArticles || "Use a clear structure: hook intro, 3-5 main sections with headers, actionable conclusion"}

## ARTICLE BRIEF
- **Topic**: ${brief.topic}
- **Category**: ${brief.category}
- **Target Reader**: ${brief.targetReader || "Technical decision-makers, CTOs, engineering leads"}
- **Core Thesis**: ${brief.coreThesis || "Derive from the topic"}
- **Key Points**: ${brief.keyPoints?.join(", ") || "Derive 3-5 key points from the topic"}

## CRITICAL LENGTH REQUIREMENTS (MUST FOLLOW)
- **Minimum word count**: ${lengthInfo.min} words
- **Maximum word count**: ${lengthInfo.max} words
- **Required sections**: ${lengthInfo.sections} main sections (each with H2 heading)
- **Paragraphs per section**: ${lengthInfo.paragraphsPerSection} substantial paragraphs minimum
- **Each paragraph**: 4-6 sentences, 80-120 words each

THIS IS NOT OPTIONAL. Articles shorter than ${lengthInfo.min} words will be rejected.
Each section must have real depth - not just 1-2 sentences. Explain concepts fully.
Include examples, specific details, and practical advice in each section.

## PROTOCODING CONTEXT
- We build AI-powered software and intelligent integrations
- We work with healthcare, fintech, SaaS, e-commerce, manufacturing
- We're practitioners who ship code, not just consultants
- Our edge: senior engineers who understand both AI and business

## OUTPUT FORMAT
Return a JSON object with this exact structure:
{
  "slug": "kebab-case-url-slug",
  "title": "The Article Title",
  "subtitle": "A compelling one-liner subtitle",
  "description": "2-3 sentence description for previews and SEO",
  "topic": "${brief.category}",
  "content": [
    { "type": "paragraph", "content": "Opening paragraph (4-6 sentences, ~100 words)..." },
    { "type": "paragraph", "content": "Second intro paragraph with context..." },
    { "type": "heading", "content": "First Section Header" },
    { "type": "paragraph", "content": "Full paragraph explaining the concept (4-6 sentences)..." },
    { "type": "paragraph", "content": "Another paragraph with examples and details..." },
    { "type": "paragraph", "content": "Practical implications of this section..." },
    { "type": "heading", "content": "Second Section Header" },
    { "type": "paragraph", "content": "Continue with substantial content..." },
    { "type": "list", "content": ["Detailed point 1 with explanation", "Detailed point 2 with example", "Point 3"] },
    { "type": "paragraph", "content": "Expand on the list points..." },
    { "type": "quote", "content": "A memorable quote from the article" },
    { "type": "heading", "content": "Third Section Header" },
    { "type": "paragraph", "content": "More substantive content..." },
    ... continue for ${lengthInfo.sections} total sections ...
    { "type": "heading", "content": "Conclusion / What This Means" },
    { "type": "paragraph", "content": "Wrap up with actionable takeaways..." }
  ],
  "tags": ["Tag1", "Tag2", "Tag3", "Tag4"]
}

IMPORTANT: The "content" array should have ${lengthInfo.sections * (lengthInfo.paragraphsPerSection + 1)} to ${lengthInfo.sections * (lengthInfo.paragraphsPerSection + 2)} elements total.
Do NOT include "readTime" - it will be calculated from word count.

## GENERATION RULES
1. NO em-dashes (—). Use commas or periods instead.
2. Use contractions (we're, don't, it's, can't)
3. Start some sentences with "And" or "But"
4. Use specific numbers, not vague claims
5. Include at least one concrete example or story
6. Sound like ${writerInfo.name} explaining to a colleague
7. No AI filler phrases ("In today's fast-paced world", "Let's dive in", etc.)
8. Strong opinions, no hedge words
9. End with actionable takeaways
10. Keep Protocoding mentions subtle (1-2 max, only if natural)

Write the article now. Return ONLY valid JSON, no markdown code blocks.`;
}

// Generate article using Claude
async function generateArticle(brief: ArticleBrief): Promise<GeneratedArticle> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY not set in environment");
  }

  const client = new Anthropic({ apiKey });
  const prompt = buildPrompt(brief);

  console.log(`\n🔄 Generating article with Claude...`);
  console.log(`   Topic: ${brief.topic}`);
  console.log(`   Writer: ${WRITER_INFO[brief.writer].name}`);
  console.log(`   Length: ${brief.length}`);

  // Use higher token limit for longer articles
  const tokenLimit = brief.length === "long" ? 8192 : brief.length === "medium" ? 6144 : 4096;
  
  const response = await client.messages.create({
    model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-20250514",
    max_tokens: tokenLimit,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = response.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type");
  }

  // Parse the JSON response
  let jsonText = content.text.trim();
  // Remove markdown code blocks if present
  if (jsonText.startsWith("```")) {
    jsonText = jsonText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  try {
    const article = JSON.parse(jsonText) as GeneratedArticle;
    
    // Calculate word count from content
    const wordCount = article.content.reduce((count, block) => {
      if (typeof block.content === "string") {
        return count + block.content.split(/\s+/).length;
      } else if (Array.isArray(block.content)) {
        return count + block.content.join(" ").split(/\s+/).length;
      }
      return count;
    }, 0);
    
    // Add calculated read time
    article.readTime = calculateReadTime(wordCount);
    
    console.log(`   📊 Word count: ${wordCount} words`);
    console.log(`   ⏱️  Read time: ${article.readTime}`);
    
    const lengthInfo = LENGTH_WORDS[brief.length];
    if (wordCount < lengthInfo.min * 0.8) {
      console.warn(`\n⚠️  WARNING: Article is ${wordCount} words, below target of ${lengthInfo.min}-${lengthInfo.max}`);
      console.warn(`   Consider regenerating with --length ${brief.length}`);
    }
    
    return article;
  } catch (e) {
    console.error("Failed to parse JSON response:");
    console.error(jsonText);
    throw new Error("Invalid JSON response from Claude");
  }
}

// Interactive mode
async function runInteractive(): Promise<ArticleBrief> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (prompt: string): Promise<string> =>
    new Promise((resolve) => rl.question(prompt, resolve));

  console.log("\n📝 Article Generator - Interactive Mode\n");

  const topic = await question("Topic/Title idea: ");
  
  console.log("\nWriters:");
  console.log("  1. jordan - Technical, AI/ML focus, infrastructure");
  console.log("  2. ryan   - Direct, practical, business advice");
  console.log("  3. mitch  - Philosophical, big-picture");
  console.log("  4. raymond - Business/ROI focused");
  const writerChoice = await question("Writer (1-4 or name): ");
  const writerMap: Record<string, string> = { "1": "jordan", "2": "ryan", "3": "mitch", "4": "raymond" };
  const writer = writerMap[writerChoice] || writerChoice;

  console.log("\nCategories:");
  console.log("  1. ai          - AI & Machine Learning");
  console.log("  2. engineering - Engineering & Architecture");
  console.log("  3. startups    - Startups & Business");
  console.log("  4. trends      - Tech Trends");
  console.log("  5. case-studies");
  const categoryChoice = await question("Category (1-5 or name): ");
  const categoryMap: Record<string, string> = {
    "1": "ai", "2": "engineering", "3": "startups", "4": "trends", "5": "case-studies"
  };
  const category = categoryMap[categoryChoice] || categoryChoice;

  console.log("\nLength:");
  console.log("  1. short  - ~800 words, 4 min read");
  console.log("  2. medium - ~1500 words, 7 min read");
  console.log("  3. long   - ~2500 words, 12 min read");
  const lengthChoice = await question("Length (1-3 or name): ");
  const lengthMap: Record<string, string> = { "1": "short", "2": "medium", "3": "long" };
  const length = lengthMap[lengthChoice] || lengthChoice;

  const targetReader = await question("Target reader (or press enter for default): ");
  const coreThesis = await question("Core thesis (or press enter to auto-generate): ");

  rl.close();

  return {
    topic,
    writer: writer as ArticleBrief["writer"],
    category: category as ArticleBrief["category"],
    length: length as ArticleBrief["length"],
    targetReader: targetReader || undefined,
    coreThesis: coreThesis || undefined,
  };
}

// Parse CLI args
function parseArgs(): ArticleBrief | "interactive" {
  const args = process.argv.slice(2);
  
  if (args.includes("--interactive") || args.includes("-i")) {
    return "interactive";
  }

  const getArg = (name: string): string | undefined => {
    const idx = args.indexOf(`--${name}`);
    return idx !== -1 ? args[idx + 1] : undefined;
  };

  const topic = getArg("topic");
  if (!topic) {
    console.log("Usage: bun run content-lab/scripts/generate-article.ts --topic \"Your topic\" --writer jordan");
    console.log("       bun run content-lab/scripts/generate-article.ts --interactive");
    process.exit(1);
  }

  return {
    topic,
    writer: (getArg("writer") || "jordan") as ArticleBrief["writer"],
    category: (getArg("category") || "ai") as ArticleBrief["category"],
    length: (getArg("length") || "medium") as ArticleBrief["length"],
    targetReader: getArg("reader"),
    coreThesis: getArg("thesis"),
  };
}

// Main
async function main() {
  console.log("🚀 Protocoding Article Generator\n");

  const briefOrMode = parseArgs();
  const brief = briefOrMode === "interactive" ? await runInteractive() : briefOrMode;

  try {
    const article = await generateArticle(brief);

    console.log("\n✅ Article generated!\n");
    console.log("=" .repeat(60));
    console.log(`Title: ${article.title}`);
    console.log(`Subtitle: ${article.subtitle}`);
    console.log(`Slug: ${article.slug}`);
    console.log(`Tags: ${article.tags.join(", ")}`);
    console.log("=" .repeat(60));

    // Save to generated_articles folder
    const outputDir = join(ARTICLE_GEN_DIR, "generated_articles");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const outputFile = join(outputDir, `${timestamp}_${article.slug}.json`);
    
    // Add writer info to the JSON for the add script
    const articleWithMeta = { ...article, _writer: brief.writer };
    writeFileSync(outputFile, JSON.stringify(articleWithMeta, null, 2));
    console.log(`\n📁 Saved to: ${outputFile}`);

    console.log("\n📋 To add to website, run:");
    console.log(`   bun run add:article:latest --writer ${brief.writer}`);

  } catch (error) {
    console.error("\n❌ Error generating article:", error);
    process.exit(1);
  }
}

main();
