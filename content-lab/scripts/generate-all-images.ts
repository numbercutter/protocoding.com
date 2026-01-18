#!/usr/bin/env bun
/**
 * Generate Hero Images for All Articles Missing Images
 * 
 * Usage:
 *   bun run content-lab/scripts/generate-all-images.ts
 *   bun run content-lab/scripts/generate-all-images.ts --dry-run
 *   bun run content-lab/scripts/generate-all-images.ts --limit 5
 */

import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = join(__dirname, "../../public/insights");
const INSIGHTS_FILE = join(__dirname, "../../lib/data/insights.ts");

// Topic-specific visual concepts
const TOPIC_CONCEPTS: Record<string, string> = {
  ai: "neural pathway visualization, data streams, geometric node networks, circuit patterns",
  engineering: "architectural blueprints, isometric system diagrams, code syntax patterns, infrastructure grids",
  startups: "growth trajectories, launch vectors, momentum lines, scaling patterns",
  trends: "trend lines, wave patterns, signal flows, emergence patterns",
  "case-studies": "transformation diagrams, process flows, milestone markers, success metrics",
};

// High-design style that matches Protocoding aesthetic
const BASE_STYLE = `
Minimalist technical illustration style.
Color palette: deep charcoal (#0f0f12) background with electric blue (#0D99FF) accents and warm gray (#ebe8e4) highlights.
Clean geometric shapes, precise lines, subtle gradients.
Professional editorial quality like Stripe or Linear blog imagery.
Abstract and conceptual - NO photorealistic elements.
NO text, NO faces, NO people, NO hands.
Sharp edges, high contrast, modern tech aesthetic.
Subtle noise texture overlay for depth.
`;

interface ArticleInfo {
  slug: string;
  title: string;
  topic: string;
  hasImage: boolean;
}

function extractArticlesFromInsights(): ArticleInfo[] {
  const content = readFileSync(INSIGHTS_FILE, "utf-8");
  const articles: ArticleInfo[] = [];
  
  // Split by article entries and parse each one
  const articleBlocks = content.split(/\n  '[a-z0-9-]+':\s*\{/);
  
  for (const block of articleBlocks.slice(1)) { // Skip first empty part
    const slugMatch = block.match(/slug:\s*'([^']+)'/);
    const titleMatch = block.match(/title:\s*'([^']+)'/);
    const topicMatch = block.match(/topic:\s*'([^']+)'/);
    const hasImage = block.includes("heroImage:");
    
    if (slugMatch && titleMatch && topicMatch) {
      articles.push({
        slug: slugMatch[1],
        title: titleMatch[1].replace(/\\'/g, "'"),
        topic: topicMatch[1],
        hasImage,
      });
    }
  }
  
  return articles;
}

async function generateImage(title: string, topic: string, slug: string): Promise<string | null> {
  const apiKey = process.env.FAL_API_KEY;
  if (!apiKey) {
    throw new Error("FAL_API_KEY not set in environment");
  }

  const topicConcept = TOPIC_CONCEPTS[topic] || TOPIC_CONCEPTS.ai;
  
  const titleKeywords = title.toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(' ')
    .filter((w: string) => w.length > 4)
    .slice(0, 3)
    .join(', ');
  
  const prompt = `Technical illustration for article: "${title}".

Visual concept: ${topicConcept}
Key themes: ${titleKeywords}

${BASE_STYLE}

16:9 aspect ratio, hero image composition with visual weight on left third.
`;

  // Use Flux Dev for higher quality (better than Schnell, more affordable than Pro)
  // Flux Dev: 28 steps, 1024x1024 native but can do custom sizes
  // For even higher quality, switch to "fal-ai/flux-pro" (more expensive)
  const response = await fetch("https://fal.run/fal-ai/flux/dev", {
    method: "POST",
    headers: {
      "Authorization": `Key ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      image_size: {
        width: 1536,  // Higher resolution for crisp hero images
        height: 864,  // 16:9 aspect ratio
      },
      num_inference_steps: 28,  // More steps = higher quality
      num_images: 1,
      guidance_scale: 3.5,  // Default for Flux Dev
      enable_safety_checker: true,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`   ❌ API error: ${response.status} - ${errorText}`);
    return null;
  }

  const result = await response.json() as { images: Array<{ url: string; content_type?: string }> };
  
  if (!result.images || result.images.length === 0) {
    return null;
  }

  const imageUrl = result.images[0].url;
  
  // Download and save as WebP for better compression
  const imageResponse = await fetch(imageUrl);
  const imageBuffer = await imageResponse.arrayBuffer();
  
  if (!existsSync(IMAGES_DIR)) {
    mkdirSync(IMAGES_DIR, { recursive: true });
  }
  
  // Save as WebP (Fal returns JPEG by default, but we'll convert on Next.js side)
  // For now save with original format, Next.js Image component will serve optimized WebP
  const imagePath = join(IMAGES_DIR, `${slug}.jpg`);
  writeFileSync(imagePath, Buffer.from(imageBuffer));
  
  return `/insights/${slug}.jpg`;
}

function addHeroImageToInsights(slug: string, imagePath: string): void {
  let content = readFileSync(INSIGHTS_FILE, "utf-8");
  
  // Find the article and add heroImage after publishedAt
  const pattern = new RegExp(
    `('${slug}':\\s*\\{[^}]*publishedAt:\\s*'[^']+',)`,
    'g'
  );
  
  content = content.replace(pattern, `$1\n    heroImage: '${imagePath}',`);
  
  writeFileSync(INSIGHTS_FILE, content);
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const forceAll = args.includes("--force") || args.includes("--all");
  const limitIdx = args.indexOf("--limit");
  const limit = limitIdx !== -1 ? parseInt(args[limitIdx + 1]) : Infinity;
  
  console.log("🖼️  Batch Image Generator (Flux Dev - 1536x864)\n");
  
  const articles = extractArticlesFromInsights();
  
  // If --force, regenerate all images regardless of existing
  const needsImage = forceAll ? articles : articles.filter(a => !a.hasImage);
  
  console.log(`📊 Found ${articles.length} total articles`);
  if (forceAll) {
    console.log(`   🔄 FORCE MODE: Regenerating ALL images`);
  } else {
    console.log(`   ${articles.length - needsImage.length} already have images`);
    console.log(`   ${needsImage.length} need images`);
  }
  console.log();
  
  if (needsImage.length === 0) {
    console.log("✅ All articles have images!");
    return;
  }
  
  const toProcess = needsImage.slice(0, limit);
  
  if (dryRun) {
    console.log("🔍 DRY RUN - Would generate images for:\n");
    toProcess.forEach((a, i) => {
      console.log(`   ${i + 1}. ${a.title}`);
      console.log(`      Topic: ${a.topic}, Slug: ${a.slug}\n`);
    });
    return;
  }
  
  console.log(`🚀 Generating ${toProcess.length} images...\n`);
  
  let success = 0;
  let failed = 0;
  
  for (let i = 0; i < toProcess.length; i++) {
    const article = toProcess[i];
    console.log(`[${i + 1}/${toProcess.length}] ${article.title}`);
    
    try {
      const imagePath = await generateImage(article.title, article.topic, article.slug);
      
      if (imagePath) {
        addHeroImageToInsights(article.slug, imagePath);
        console.log(`   ✅ Generated and saved\n`);
        success++;
      } else {
        console.log(`   ⚠️ No image returned\n`);
        failed++;
      }
      
      // Rate limiting - wait 1 second between requests
      if (i < toProcess.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (err) {
      console.log(`   ❌ Error: ${err}\n`);
      failed++;
    }
  }
  
  console.log(`\n📊 Results:`);
  console.log(`   ✅ ${success} images generated`);
  console.log(`   ❌ ${failed} failed`);
  console.log(`   📁 Images saved to: ${IMAGES_DIR}`);
}

main().catch(console.error);
