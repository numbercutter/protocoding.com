#!/usr/bin/env bun
/**
 * Generate Hero Image for Article
 * 
 * Uses Fal AI to generate article hero images
 * 
 * Usage:
 *   bun run content-lab/scripts/generate-article-image.ts --slug "article-slug"
 *   bun run content-lab/scripts/generate-article-image.ts --title "Article Title" --topic ai
 */

import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = join(__dirname, "../../public/insights");

interface ImageGenerationResult {
  images: Array<{ url: string }>;
}

// Design system colors from globals.css
const BRAND_COLORS = {
  accent: "#0D99FF", // Blue accent
  dark: "#0f0f12",   // Dark background
  light: "#ebe8e4",  // Light warm gray
  elevated: "#1a1a1a",
};

// Topic-specific visual concepts - NOT generic AI slop
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

async function generateImage(title: string, topic: string, slug: string): Promise<string> {
  const apiKey = process.env.FAL_API_KEY;
  if (!apiKey) {
    throw new Error("FAL_API_KEY not set in environment");
  }

  const topicConcept = TOPIC_CONCEPTS[topic] || TOPIC_CONCEPTS.ai;
  
  // Extract key concepts from title for context
  const titleKeywords = title.toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(' ')
    .filter(w => w.length > 4)
    .slice(0, 3)
    .join(', ');
  
  const prompt = `Technical illustration for article: "${title}".

Visual concept: ${topicConcept}
Key themes: ${titleKeywords}

${BASE_STYLE}

16:9 aspect ratio, hero image composition with visual weight on left third.
`;

  console.log(`\n🎨 Generating image with Fal AI (Flux Dev)...`);
  console.log(`   Title: ${title}`);
  console.log(`   Topic: ${topic}`);
  console.log(`   Resolution: 1536x864 (HD 16:9)`);

  // Use Flux Dev for higher quality (28 steps vs Schnell's 4)
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
    const error = await response.text();
    throw new Error(`Fal API error: ${response.status} - ${error}`);
  }

  const result = (await response.json()) as ImageGenerationResult;
  
  if (!result.images || result.images.length === 0) {
    throw new Error("No image generated");
  }

  const imageUrl = result.images[0].url;
  
  // Download and save the image
  const imageResponse = await fetch(imageUrl);
  const imageBuffer = await imageResponse.arrayBuffer();
  
  // Ensure directory exists
  if (!existsSync(IMAGES_DIR)) {
    mkdirSync(IMAGES_DIR, { recursive: true });
  }
  
  // Save as JPG - Next.js Image component will serve optimized WebP automatically
  const imagePath = join(IMAGES_DIR, `${slug}.jpg`);
  writeFileSync(imagePath, Buffer.from(imageBuffer));
  
  console.log(`\n✅ Image saved to: ${imagePath}`);
  console.log(`   Next.js will serve as optimized WebP/AVIF automatically`);
  
  return `/insights/${slug}.jpg`;
}

function parseArgs(): { slug?: string; title?: string; topic?: string } {
  const args = process.argv.slice(2);
  
  const getArg = (name: string): string | undefined => {
    const idx = args.indexOf(`--${name}`);
    return idx !== -1 ? args[idx + 1] : undefined;
  };

  return {
    slug: getArg("slug"),
    title: getArg("title"),
    topic: getArg("topic") || "ai",
  };
}

async function main() {
  console.log("🖼️  Article Image Generator\n");

  const { slug, title, topic } = parseArgs();

  if (!slug && !title) {
    console.log("Usage:");
    console.log('  bun run content-lab/scripts/generate-article-image.ts --slug "article-slug"');
    console.log('  bun run content-lab/scripts/generate-article-image.ts --title "Article Title" --topic ai');
    process.exit(1);
  }

  const finalSlug = slug || title!.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  const finalTitle = title || slug!.replace(/-/g, " ");

  try {
    const imagePath = await generateImage(finalTitle, topic!, finalSlug);
    console.log(`\n📋 Add this to your insight in lib/data/insights.ts:`);
    console.log(`   heroImage: '${imagePath}',`);
  } catch (error) {
    console.error("\n❌ Error generating image:", error);
    process.exit(1);
  }
}

main();
