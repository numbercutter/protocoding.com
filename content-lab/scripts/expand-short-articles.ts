#!/usr/bin/env bun
/**
 * Expand Short Articles Script
 * 
 * Regenerates articles that are under the target word count using the article generator
 * while preserving the author's voice and article topic.
 * 
 * Usage:
 *   bun run content-lab/scripts/expand-short-articles.ts --dry-run        # Preview what would be regenerated
 *   bun run content-lab/scripts/expand-short-articles.ts --limit 5        # Regenerate first 5 short articles
 *   bun run content-lab/scripts/expand-short-articles.ts --slug "my-slug" # Regenerate specific article
 *   bun run content-lab/scripts/expand-short-articles.ts                  # Regenerate all short articles
 */

import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_LAB_DIR = join(__dirname, "..");
const ARTICLE_GEN_DIR = join(CONTENT_LAB_DIR, "article_generator");
const INSIGHTS_PATH = join(__dirname, "../../lib/data/insights.ts");

const MIN_WORDS = 800; // Minimum acceptable word count
const TARGET_LENGTH = "medium"; // Target length for regeneration (medium = 1500+ words)

// Writer info for voice matching
const WRITER_MAP: Record<string, { key: string; style: string }> = {
  "Jordan Lesson": { key: "jordan", style: "Technical depth, AI/ML focus, pragmatic engineering, infrastructure costs" },
  "Ryan Lesson": { key: "ryan", style: "Direct, conversational, uses humor, practical business advice, says 'y'all'" },
  "Mitch Carrara": { key: "mitch", style: "Philosophical, metaphor-rich, tech-meets-design thinking, big-picture" },
  "Raymond Chen": { key: "raymond", style: "Business-oriented, ROI-focused, executive communication style" },
  "Christian Loth": { key: "christian", style: "Technical precision, architecture focus, code quality emphasis" },
};

const LENGTH_CONFIG = {
  short: { min: 800, max: 1000, sections: 4, paragraphsPerSection: 2 },
  medium: { min: 1500, max: 1800, sections: 5, paragraphsPerSection: 3 },
  long: { min: 2500, max: 3000, sections: 7, paragraphsPerSection: 3 },
};

interface ArticleInfo {
  slug: string;
  title: string;
  subtitle: string;
  topic: string;
  authorName: string;
  wordCount: number;
  tags: string[];
}

// Extract articles from insights.ts
function extractArticlesFromInsights(): ArticleInfo[] {
  const content = readFileSync(INSIGHTS_PATH, "utf-8");
  const articles: ArticleInfo[] = [];
  
  // Match each article block
  const articleRegex = /'([^']+)':\s*\{[^}]*slug:\s*'([^']+)'[^}]*title:\s*'([^']+)'[^}]*subtitle:\s*'([^']+)'[^}]*topic:\s*'([^']+)'[^}]*author:\s*\{[^}]*name:\s*'([^']+)'[^}]*\}[^}]*content:\s*\[([\s\S]*?)\][^}]*tags:\s*\[([\s\S]*?)\]/g;
  
  let match;
  while ((match = articleRegex.exec(content)) !== null) {
    const [, , slug, title, subtitle, topic, authorName, contentBlock, tagsBlock] = match;
    
    // Count words in content
    const wordCount = countWordsInContent(contentBlock);
    
    // Extract tags
    const tagMatches = tagsBlock.match(/'([^']+)'/g) || [];
    const tags = tagMatches.map(t => t.replace(/'/g, ""));
    
    articles.push({
      slug,
      title: title.replace(/\\'/g, "'"),
      subtitle: subtitle.replace(/\\'/g, "'"),
      topic,
      authorName,
      wordCount,
      tags,
    });
  }
  
  return articles;
}

function countWordsInContent(contentBlock: string): number {
  // Extract all text content from the content array
  const textMatches = contentBlock.match(/content:\s*['"`]([^'"`]+)['"`]/g) || [];
  const listMatches = contentBlock.match(/content:\s*\[([\s\S]*?)\]/g) || [];
  
  let totalWords = 0;
  
  for (const match of textMatches) {
    const text = match.replace(/content:\s*['"`]/, "").replace(/['"`]$/, "");
    totalWords += text.split(/\s+/).filter(w => w.length > 0).length;
  }
  
  for (const match of listMatches) {
    const items = match.match(/'([^']+)'/g) || [];
    for (const item of items) {
      const text = item.replace(/'/g, "");
      totalWords += text.split(/\s+/).filter(w => w.length > 0).length;
    }
  }
  
  return totalWords;
}

// Load writer samples
function loadWriterSamples(writerKey: string): string {
  const samplesDir = join(ARTICLE_GEN_DIR, `${writerKey}_writing_samples`);
  if (existsSync(samplesDir)) {
    const files = readdirSync(samplesDir).filter(f => f.endsWith(".md") && !f.startsWith("_"));
    if (files.length > 0) {
      return files.map(f => readFileSync(join(samplesDir, f), "utf-8")).join("\n\n---\n\n");
    }
  }
  
  // Fall back to voice samples
  const voiceDir = join(CONTENT_LAB_DIR, "script_generator", `${writerKey}_voice_samples`);
  if (existsSync(voiceDir)) {
    const files = readdirSync(voiceDir).filter(f => f.endsWith(".md") && !f.startsWith("_"));
    return files.map(f => readFileSync(join(voiceDir, f), "utf-8")).join("\n\n---\n\n");
  }
  
  return "";
}

function loadAntiSlopRules(): string {
  const rulesPath = join(ARTICLE_GEN_DIR, "rules", "anti_ai_slop.md");
  if (existsSync(rulesPath)) {
    return readFileSync(rulesPath, "utf-8");
  }
  return `
CRITICAL ANTI-AI RULES:
- NO em-dashes (—). Use commas or periods.
- Use contractions naturally (we're, don't, it's)
- Start some sentences with "And" or "But"
- NO phrases like "In today's fast-paced world", "Let's dive in", "At the end of the day"
- NO hedge words like "might", "could potentially", "in many cases"
- Strong opinions, not fence-sitting
- Sound like a human expert, not a content mill
`;
}

function buildExpansionPrompt(article: ArticleInfo, targetLength: string): string {
  const writerInfo = WRITER_MAP[article.authorName] || WRITER_MAP["Jordan Lesson"];
  const lengthInfo = LENGTH_CONFIG[targetLength as keyof typeof LENGTH_CONFIG];
  const writerSamples = loadWriterSamples(writerInfo.key);
  const antiSlopRules = loadAntiSlopRules();

  return `You are expanding an existing article for Protocoding's Insights section.

## CRITICAL ANTI-AI RULES (FOLLOW EXACTLY)
${antiSlopRules}

## ORIGINAL ARTICLE INFO
- **Title**: ${article.title}
- **Subtitle**: ${article.subtitle}
- **Topic/Category**: ${article.topic}
- **Tags**: ${article.tags.join(", ")}
- **Current word count**: ${article.wordCount} words (TOO SHORT)

## WRITER VOICE
You are writing as ${article.authorName} at Protocoding.
Voice style: ${writerInfo.style}

### Writer's actual voice samples (MATCH THIS STYLE EXACTLY):
${writerSamples || "Write in a natural, conversational tech professional voice - direct, opinionated, practical"}

## EXPANSION REQUIREMENTS

This article is currently ${article.wordCount} words. It needs to be EXPANDED to ${lengthInfo.min}-${lengthInfo.max} words.

You must:
1. Keep the same title, subtitle, and core thesis
2. Expand each section with MORE DEPTH - specific examples, detailed explanations, practical advice
3. Add new supporting sections if needed
4. Include concrete stories, numbers, and real-world examples
5. Make it feel like a comprehensive, valuable read - not padded fluff

Structure requirements:
- ${lengthInfo.sections} main sections minimum (each with H2 heading)
- ${lengthInfo.paragraphsPerSection} substantial paragraphs per section minimum
- Each paragraph: 4-6 sentences, 80-120 words
- Include at least 2 specific examples or mini case studies
- Include at least 1 memorable quote
- Include at least 1 list with detailed bullet points

## PROTOCODING CONTEXT
- We build AI-powered software and intelligent integrations
- We work with healthcare, fintech, SaaS, e-commerce, manufacturing
- We're practitioners who ship code, not just consultants
- Our edge: senior engineers who understand both AI and business

## OUTPUT FORMAT
Return a JSON object with this exact structure:
{
  "slug": "${article.slug}",
  "title": "${article.title.replace(/"/g, '\\"')}",
  "subtitle": "${article.subtitle.replace(/"/g, '\\"')}",
  "description": "2-3 sentence description for previews and SEO",
  "topic": "${article.topic}",
  "content": [
    { "type": "paragraph", "content": "Opening hook paragraph (4-6 sentences, ~100 words)..." },
    { "type": "paragraph", "content": "Second paragraph setting up the problem/context..." },
    { "type": "heading", "content": "First Section Header" },
    { "type": "paragraph", "content": "Full paragraph with specific details (4-6 sentences)..." },
    { "type": "paragraph", "content": "Another paragraph with a concrete example..." },
    { "type": "paragraph", "content": "Practical implications and advice..." },
    { "type": "heading", "content": "Second Section Header" },
    { "type": "paragraph", "content": "Continue with substantive content..." },
    { "type": "list", "content": ["Detailed point 1 with context", "Point 2 with example", "Point 3 with explanation"] },
    { "type": "paragraph", "content": "Expand on the list points with more depth..." },
    { "type": "quote", "content": "A memorable, quotable line from the article" },
    ... continue for ${lengthInfo.sections}+ total sections ...
    { "type": "heading", "content": "What This Means / Takeaways" },
    { "type": "paragraph", "content": "Actionable conclusion (4-6 sentences)..." }
  ],
  "tags": ${JSON.stringify(article.tags)}
}

## GENERATION RULES
1. NO em-dashes (—). Use commas or periods.
2. Use contractions (we're, don't, it's, can't)
3. Start some sentences with "And" or "But"
4. Use specific numbers and examples
5. Sound like ${article.authorName} talking to a smart colleague
6. No AI filler phrases
7. Strong opinions, no hedge words
8. Each section must have REAL DEPTH - not just 1-2 sentences

Write the EXPANDED article now. Return ONLY valid JSON, no markdown code blocks.`;
}

async function expandArticle(article: ArticleInfo, client: Anthropic): Promise<string> {
  const prompt = buildExpansionPrompt(article, TARGET_LENGTH);
  
  console.log(`\n   🔄 Generating expanded content with Claude...`);
  
  const response = await client.messages.create({
    model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-20250514",
    max_tokens: 8192,
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type");
  }

  let jsonText = content.text.trim();
  if (jsonText.startsWith("```")) {
    jsonText = jsonText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  // Validate JSON
  const parsed = JSON.parse(jsonText);
  
  // Calculate new word count
  const newWordCount = parsed.content.reduce((count: number, block: { content: string | string[] }) => {
    if (typeof block.content === "string") {
      return count + block.content.split(/\s+/).length;
    } else if (Array.isArray(block.content)) {
      return count + block.content.join(" ").split(/\s+/).length;
    }
    return count;
  }, 0);
  
  console.log(`   📊 New word count: ${newWordCount} words (was ${article.wordCount})`);
  
  // Add readTime based on word count
  parsed.readTime = `${Math.ceil(newWordCount / 200)} min read`;
  
  return JSON.stringify(parsed, null, 2);
}

function updateInsightsFile(slug: string, newArticleJson: string): void {
  const insightsContent = readFileSync(INSIGHTS_PATH, "utf-8");
  const article = JSON.parse(newArticleJson);
  
  // Find the article in the file and get its author info (we need to preserve this)
  const authorMatch = insightsContent.match(
    new RegExp(`'${slug}':\\s*\\{[\\s\\S]*?author:\\s*\\{([\\s\\S]*?)\\}`, "m")
  );
  
  let authorBlock = `{
      name: 'Jordan Lesson',
      role: 'Founder',
      image: '/team/jordan.png',
    }`;
  
  if (authorMatch) {
    authorBlock = `{${authorMatch[1]}}`;
  }
  
  // Get heroImage if exists
  const heroMatch = insightsContent.match(
    new RegExp(`'${slug}':\\s*\\{[\\s\\S]*?heroImage:\\s*'([^']+)'`, "m")
  );
  const heroImage = heroMatch ? heroMatch[1] : `/insights/${slug}.jpg`;
  
  // Build the new article entry
  const contentArray = article.content.map((block: { type: string; content: string | string[] }) => {
    if (Array.isArray(block.content)) {
      return `      { type: '${block.type}', content: [${block.content.map((c: string) => `'${c.replace(/'/g, "\\'")}'`).join(", ")}] }`;
    }
    return `      { type: '${block.type}', content: '${String(block.content).replace(/'/g, "\\'")}' }`;
  }).join(",\n");
  
  const tagsArray = article.tags.map((t: string) => `'${t}'`).join(", ");
  
  const newEntry = `'${slug}': {
    slug: '${slug}',
    title: '${article.title.replace(/'/g, "\\'")}',
    subtitle: '${article.subtitle.replace(/'/g, "\\'")}',
    description: '${article.description.replace(/'/g, "\\'")}',
    topic: '${article.topic}',
    readTime: '${article.readTime}',
    publishedAt: '${new Date().toISOString().split('T')[0]}',
    heroImage: '${heroImage}',
    author: ${authorBlock},
    content: [
${contentArray}
    ],
    tags: [${tagsArray}],
    relatedInsights: [],
  }`;
  
  // Replace the old entry with the new one
  const entryRegex = new RegExp(
    `'${slug}':\\s*\\{[\\s\\S]*?relatedInsights:\\s*\\[[^\\]]*\\],?\\s*\\}`,
    "m"
  );
  
  const updatedContent = insightsContent.replace(entryRegex, newEntry);
  writeFileSync(INSIGHTS_PATH, updatedContent);
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const limitIdx = args.indexOf("--limit");
  const limit = limitIdx !== -1 ? parseInt(args[limitIdx + 1]) : Infinity;
  const slugIdx = args.indexOf("--slug");
  const targetSlug = slugIdx !== -1 ? args[slugIdx + 1] : null;
  
  console.log("📝 Article Expansion Script\n");
  
  // Check for API key
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey && !dryRun) {
    console.error("❌ ANTHROPIC_API_KEY not set in environment");
    console.log("   Run with --dry-run to preview, or set the API key");
    process.exit(1);
  }
  
  const articles = extractArticlesFromInsights();
  
  // Filter to short articles
  let shortArticles = articles.filter(a => a.wordCount < MIN_WORDS);
  
  if (targetSlug) {
    shortArticles = shortArticles.filter(a => a.slug === targetSlug);
    if (shortArticles.length === 0) {
      const article = articles.find(a => a.slug === targetSlug);
      if (article) {
        console.log(`Article "${targetSlug}" has ${article.wordCount} words (above ${MIN_WORDS} minimum)`);
      } else {
        console.log(`Article "${targetSlug}" not found`);
      }
      process.exit(0);
    }
  }
  
  console.log(`📊 Found ${articles.length} total articles`);
  console.log(`   ${shortArticles.length} are under ${MIN_WORDS} words and need expansion\n`);
  
  if (shortArticles.length === 0) {
    console.log("✅ All articles are at acceptable length!");
    return;
  }
  
  // Sort by word count (shortest first)
  shortArticles.sort((a, b) => a.wordCount - b.wordCount);
  
  const toProcess = shortArticles.slice(0, limit);
  
  if (dryRun) {
    console.log("🔍 DRY RUN - Would expand these articles:\n");
    for (const article of toProcess) {
      const writer = WRITER_MAP[article.authorName]?.key || "unknown";
      console.log(`   ${article.slug}`);
      console.log(`      Title: ${article.title}`);
      console.log(`      Words: ${article.wordCount} → target ${LENGTH_CONFIG.medium.min}+`);
      console.log(`      Writer: ${article.authorName} (${writer})`);
      console.log();
    }
    console.log(`\nRun without --dry-run to regenerate ${toProcess.length} articles`);
    return;
  }
  
  const client = new Anthropic({ apiKey });
  let success = 0;
  let failed = 0;
  
  console.log(`🚀 Expanding ${toProcess.length} articles...\n`);
  
  for (let i = 0; i < toProcess.length; i++) {
    const article = toProcess[i];
    console.log(`[${i + 1}/${toProcess.length}] ${article.title}`);
    console.log(`   Current: ${article.wordCount} words | Author: ${article.authorName}`);
    
    try {
      const newArticleJson = await expandArticle(article, client);
      updateInsightsFile(article.slug, newArticleJson);
      console.log(`   ✅ Updated in insights.ts`);
      success++;
      
      // Small delay to avoid rate limits
      if (i < toProcess.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.log(`   ❌ Failed: ${error}`);
      failed++;
    }
  }
  
  console.log(`\n📊 Results:`);
  console.log(`   ✅ ${success} articles expanded`);
  console.log(`   ❌ ${failed} failed`);
  
  if (success > 0) {
    console.log(`\n💡 Run "bun run build" to verify the changes compile correctly`);
  }
}

main();
