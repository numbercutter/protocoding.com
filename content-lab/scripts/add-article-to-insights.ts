#!/usr/bin/env bun
/**
 * Add Generated Article to insights.ts
 * 
 * This script reads a generated article JSON and adds it to lib/data/insights.ts
 * 
 * Usage:
 *   bun run content-lab/scripts/add-article-to-insights.ts <json-file-path>
 *   bun run content-lab/scripts/add-article-to-insights.ts --latest
 *   bun run content-lab/scripts/add-article-to-insights.ts --latest --with-image
 *   bun run content-lab/scripts/add-article-to-insights.ts --all-new
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "fs";
import { join, basename, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = join(__dirname, "../../public/insights");

const INSIGHTS_FILE = join(__dirname, "../../lib/data/insights.ts");
const GENERATED_DIR = join(__dirname, "../article_generator/generated_articles");

interface GeneratedArticle {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  topic: string;
  readTime: string;
  content: Array<{
    type: string;
    content: string | string[];
  }>;
  tags: string[];
  _writer?: string; // Added by generate script
}

interface WriterInfo {
  name: string;
  role: string;
  image: string;
}

const WRITER_INFO: Record<string, WriterInfo> = {
  jordan: { name: "Jordan Lesson", role: "Founder", image: "/team/jordan.png" },
  ryan: { name: "Ryan Lesson", role: "Founder", image: "/team/ryan.png" },
  mitch: { name: "Mitch Carrara", role: "Founding Software Engineer", image: "/team/mitch.png" },
  raymond: { name: "Raymond Spartz", role: "Engineering Lead", image: "/team/raymond.png" },
};

function escapeString(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/\n/g, "\\n");
}

// Creative visual metaphors - extract core concept and make it visual
const VISUAL_METAPHORS: Record<string, string[]> = {
  // Failure/problems → broken, fragmented, falling
  failure: ["shattered glass fragments floating in void", "bridge collapsing in slow motion", "dominos mid-fall", "cracked mirror reflecting chaos"],
  // Success/solutions → rising, building, connecting  
  success: ["seedling breaking through concrete", "puzzle pieces clicking together", "bridge forming from both sides", "sunrise over mountain peaks"],
  // Speed/efficiency → motion blur, streamlined
  speed: ["bullet train leaving light trails", "falcon diving", "racing yacht cutting through water", "supersonic jet cone"],
  // Complexity → tangled, layered, dense
  complexity: ["gordian knot", "dense forest canopy from below", "city intersection at night long exposure", "tangled headphones"],
  // Simplicity → minimal, clean, singular
  simplicity: ["single origami crane", "zen rock garden", "lone tree on horizon", "empty desk with single object"],
  // Growth → organic, expanding, multiplying
  growth: ["time lapse of plant growing", "fractal branching", "ripples expanding in water", "city skyline emerging from fog"],
  // AI/automation → precise, mechanical but elegant
  ai: ["clockwork mechanism with organic elements", "constellation forming a pattern", "weaving loom creating fabric", "chess pieces mid-game from above"],
  // Data → flowing, organized, structured
  data: ["library stacks infinite perspective", "card catalog drawers open", "filing system in motion", "river delta from satellite"],
  // Integration → merging, blending, connecting
  integration: ["two rivers merging", "puzzle completing", "handshake of different materials", "musical instruments mid-symphony"],
  // Legacy/old → weathered, historical, transitioning
  legacy: ["old lighthouse with modern beacon", "ancient tree with new growth", "vintage car with modern engine glimpse", "castle with glass extension"],
};

// Extract emotional/conceptual keywords from title
function extractVisualConcept(title: string): string {
  const titleLower = title.toLowerCase();
  
  // Map common article themes to visual metaphors
  const themeMap: Array<[string[], keyof typeof VISUAL_METAPHORS]> = [
    [["fail", "wrong", "mistake", "problem", "broken", "don't", "avoid", "stop"], "failure"],
    [["success", "win", "achieve", "build", "create", "launch", "ship"], "success"],
    [["fast", "quick", "speed", "efficient", "automate", "scale"], "speed"],
    [["complex", "enterprise", "large", "system", "architecture"], "complexity"],
    [["simple", "clean", "minimal", "focus", "essential"], "simplicity"],
    [["grow", "scale", "expand", "evolve", "transform"], "growth"],
    [["ai", "machine learning", "llm", "agent", "model", "intelligent"], "ai"],
    [["data", "analytics", "metrics", "track", "measure"], "data"],
    [["integrat", "connect", "unif", "merge", "api"], "integration"],
    [["legacy", "moderniz", "migrat", "upgrad", "technical debt"], "legacy"],
  ];
  
  for (const [keywords, theme] of themeMap) {
    if (keywords.some(k => titleLower.includes(k))) {
      const metaphors = VISUAL_METAPHORS[theme];
      return metaphors[Math.floor(Math.random() * metaphors.length)];
    }
  }
  
  // Default to AI theme if no match
  const aiMetaphors = VISUAL_METAPHORS.ai;
  return aiMetaphors[Math.floor(Math.random() * aiMetaphors.length)];
}

// High-design style - cinematic, editorial, NOT generic tech
const BASE_STYLE = `
STYLE: Cinematic editorial photography meets fine art. Think Wes Anderson color grading + architectural digest + movie poster composition.

AVOID AT ALL COSTS:
- Generic glowing orbs and nodes
- Circuit board patterns
- Abstract "tech" gradients
- Floating 3D shapes
- Neon grids
- Binary code visuals
- Generic "AI brain" imagery
- Anything that looks like stock imagery

INSTEAD USE:
- Real-world objects as metaphors
- Dramatic lighting (chiaroscuro, golden hour, blue hour)
- Unexpected perspectives (bird's eye, worm's eye, dutch angle)
- Rich textures (weathered wood, brushed metal, organic materials)
- Bold color stories (2-3 colors max, high contrast)
- Negative space for drama
- Depth of field for focus

COLOR: Deep charcoal shadows, warm amber highlights, single accent color (electric blue #0D99FF or warm coral)
MOOD: Confident, contemplative, editorial
QUALITY: 35mm film grain, cinematic color grade, professional lighting
`;

async function generateArticleImage(title: string, topic: string, slug: string): Promise<string | null> {
  const apiKey = process.env.FAL_API_KEY;
  if (!apiKey) {
    console.log("⚠️  FAL_API_KEY not set - skipping image generation");
    return null;
  }

  // Extract a creative visual metaphor from the title
  const visualMetaphor = extractVisualConcept(title);
  
  const prompt = `Editorial hero image for article titled: "${title}"

VISUAL CONCEPT: ${visualMetaphor}

${BASE_STYLE}

COMPOSITION: 16:9 cinematic frame. Subject positioned using rule of thirds. Clear focal point with intentional negative space. Depth through foreground/background separation.

NO TEXT. NO WORDS. NO LETTERS. PURELY VISUAL.
`;

  console.log(`   🎨 Generating hero image (Flux Dev, 1536x864)...`);
  console.log(`   📸 Visual metaphor: ${visualMetaphor}`);

  try {
    // Use Flux Dev for higher quality images
    const response = await fetch("https://fal.run/fal-ai/flux/dev", {
      method: "POST",
      headers: {
        "Authorization": `Key ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        image_size: {
          width: 1536,  // Higher resolution
          height: 864,  // 16:9 aspect ratio
        },
        num_inference_steps: 28,  // More steps = higher quality
        num_images: 1,
        guidance_scale: 3.5,
        enable_safety_checker: true,
      }),
    });

    if (!response.ok) {
      console.log(`   ⚠️  Image generation failed: ${response.status}`);
      return null;
    }

    const result = await response.json() as { images: Array<{ url: string }> };
    
    if (!result.images || result.images.length === 0) {
      return null;
    }

    const imageUrl = result.images[0].url;
    
    // Download and save the image
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    
    if (!existsSync(IMAGES_DIR)) {
      mkdirSync(IMAGES_DIR, { recursive: true });
    }
    
    const imagePath = join(IMAGES_DIR, `${slug}.jpg`);
    writeFileSync(imagePath, Buffer.from(imageBuffer));
    
    console.log(`   ✅ Image saved`);
    return `/insights/${slug}.jpg`;
  } catch (err) {
    console.log(`   ⚠️  Image generation error:`, err);
    return null;
  }
}

function formatContentBlock(block: { type: string; content: string | string[] }): string {
  if (block.type === "list" && Array.isArray(block.content)) {
    const items = block.content.map(c => `'${escapeString(c)}'`).join(", ");
    return `      { type: 'list', content: [${items}] }`;
  }
  const content = typeof block.content === "string" 
    ? escapeString(block.content)
    : JSON.stringify(block.content);
  return `      { type: '${block.type}', content: '${content}' }`;
}

function formatArticleForTS(article: GeneratedArticle, writer: string, heroImage?: string): string {
  const writerInfo = WRITER_INFO[writer] || WRITER_INFO.jordan;
  const today = new Date().toISOString().split("T")[0];

  const contentStr = article.content.map(formatContentBlock).join(",\n");
  const tagsStr = article.tags.map(t => `'${escapeString(t)}'`).join(", ");
  const heroImageLine = heroImage ? `\n    heroImage: '${heroImage}',` : "";

  return `  '${article.slug}': {
    slug: '${article.slug}',
    title: '${escapeString(article.title)}',
    subtitle: '${escapeString(article.subtitle)}',
    description: '${escapeString(article.description)}',
    topic: '${article.topic}',
    readTime: '${article.readTime}',
    publishedAt: '${today}',${heroImageLine}
    author: { name: '${writerInfo.name}', role: '${writerInfo.role}', image: '${writerInfo.image}' },
    content: [
${contentStr}
    ],
    tags: [${tagsStr}],
    relatedInsights: [],
  },`;
}

function getExistingSlugs(): Set<string> {
  const content = readFileSync(INSIGHTS_FILE, "utf-8");
  const slugs = new Set<string>();
  const regex = /['"]([a-z0-9-]+)['"]:\s*\{[\s\S]*?slug:\s*['"]([a-z0-9-]+)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    slugs.add(match[1]);
  }
  return slugs;
}

function addArticleToInsights(articleTS: string, slug: string): boolean {
  const existingSlugs = getExistingSlugs();
  
  if (existingSlugs.has(slug)) {
    console.log(`⚠️  Article '${slug}' already exists in insights.ts`);
    return false;
  }

  let content = readFileSync(INSIGHTS_FILE, "utf-8");
  
  // Find the closing of the INSIGHTS object and insert before it
  const insertPoint = content.lastIndexOf("};");
  if (insertPoint === -1) {
    console.error("Could not find insertion point in insights.ts");
    return false;
  }

  const newContent = 
    content.slice(0, insertPoint) + 
    articleTS + "\n" + 
    content.slice(insertPoint);

  writeFileSync(INSIGHTS_FILE, newContent);
  console.log(`✅ Added '${slug}' to insights.ts`);
  return true;
}

function getLatestJsonFile(): string | null {
  if (!existsSync(GENERATED_DIR)) {
    console.error("Generated articles directory not found");
    return null;
  }

  const files = readdirSync(GENERATED_DIR)
    .filter(f => f.endsWith(".json"))
    .sort()
    .reverse();

  if (files.length === 0) {
    console.error("No generated articles found");
    return null;
  }

  return join(GENERATED_DIR, files[0]);
}

function getAllNewJsonFiles(): string[] {
  if (!existsSync(GENERATED_DIR)) return [];

  const existingSlugs = getExistingSlugs();
  const files = readdirSync(GENERATED_DIR)
    .filter(f => f.endsWith(".json"))
    .map(f => join(GENERATED_DIR, f))
    .filter(f => {
      try {
        const article = JSON.parse(readFileSync(f, "utf-8")) as GeneratedArticle;
        return !existingSlugs.has(article.slug);
      } catch {
        return false;
      }
    });

  return files;
}

function detectWriter(filename: string): string {
  // Try to detect writer from filename or default to jordan
  const lowered = filename.toLowerCase();
  if (lowered.includes("ryan")) return "ryan";
  if (lowered.includes("mitch")) return "mitch";
  if (lowered.includes("raymond")) return "raymond";
  return "jordan";
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("Usage:");
    console.log("  bun run content-lab/scripts/add-article-to-insights.ts <json-file-path> [--writer jordan] [--with-image]");
    console.log("  bun run content-lab/scripts/add-article-to-insights.ts --latest [--writer jordan] [--with-image]");
    console.log("  bun run content-lab/scripts/add-article-to-insights.ts --all-new [--with-image]");
    process.exit(1);
  }

  // Get writer from args if specified
  const writerIndex = args.indexOf("--writer");
  const writer = writerIndex !== -1 ? args[writerIndex + 1] : undefined;
  const withImage = args.includes("--with-image");

  if (args.includes("--all-new")) {
    console.log("🔄 Adding all new articles to insights.ts...\n");
    const files = getAllNewJsonFiles();
    
    if (files.length === 0) {
      console.log("No new articles to add.");
      return;
    }

    console.log(`Found ${files.length} new article(s)${withImage ? " (with images)" : ""}\n`);
    
    let added = 0;
    for (const file of files) {
      try {
        const article = JSON.parse(readFileSync(file, "utf-8")) as GeneratedArticle;
        const articleWriter = article._writer || writer || detectWriter(basename(file));
        
        let heroImage: string | undefined;
        if (withImage) {
          heroImage = await generateArticleImage(article.title, article.topic, article.slug) || undefined;
        }
        
        const articleTS = formatArticleForTS(article, articleWriter, heroImage);
        if (addArticleToInsights(articleTS, article.slug)) {
          added++;
        }
      } catch (err) {
        console.error(`Failed to process ${file}:`, err);
      }
    }
    
    console.log(`\n✅ Added ${added} article(s) to insights.ts`);
    return;
  }

  let jsonPath: string | null = null;

  if (args.includes("--latest")) {
    jsonPath = getLatestJsonFile();
    if (!jsonPath) {
      process.exit(1);
    }
    console.log(`📂 Using latest: ${basename(jsonPath)}`);
  } else {
    jsonPath = args[0];
    if (!existsSync(jsonPath)) {
      console.error(`File not found: ${jsonPath}`);
      process.exit(1);
    }
  }

  try {
    const article = JSON.parse(readFileSync(jsonPath, "utf-8")) as GeneratedArticle;
    // Use _writer from JSON, then CLI arg, then detect from filename
    const articleWriter = article._writer || writer || detectWriter(basename(jsonPath));
    
    let heroImage: string | undefined;
    if (withImage) {
      heroImage = await generateArticleImage(article.title, article.topic, article.slug) || undefined;
    }
    
    const articleTS = formatArticleForTS(article, articleWriter, heroImage);
    addArticleToInsights(articleTS, article.slug);
  } catch (err) {
    console.error("Failed to process article:", err);
    process.exit(1);
  }
}

main();
