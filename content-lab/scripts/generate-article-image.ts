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

async function generateImage(title: string, topic: string, slug: string): Promise<string> {
  const apiKey = process.env.FAL_API_KEY;
  if (!apiKey) {
    throw new Error("FAL_API_KEY not set in environment");
  }

  // Extract a creative visual metaphor from the title
  const visualMetaphor = extractVisualConcept(title);
  
  const prompt = `Editorial hero image for article titled: "${title}"

VISUAL CONCEPT: ${visualMetaphor}

${BASE_STYLE}

COMPOSITION: 16:9 cinematic frame. Subject positioned using rule of thirds. Clear focal point with intentional negative space. Depth through foreground/background separation.

NO TEXT. NO WORDS. NO LETTERS. PURELY VISUAL.
`;

  console.log(`\n🎨 Generating image with Fal AI (Flux Dev)...`);
  console.log(`   Title: ${title}`);
  console.log(`   Visual metaphor: ${visualMetaphor}`);
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
