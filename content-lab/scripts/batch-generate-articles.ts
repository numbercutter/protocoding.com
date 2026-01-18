#!/usr/bin/env bun
/**
 * Batch Article Generator
 * 
 * Generates multiple articles distributed across writers
 * 
 * Usage:
 *   bun run content-lab/scripts/batch-generate-articles.ts
 *   bun run content-lab/scripts/batch-generate-articles.ts --count 8
 *   bun run content-lab/scripts/batch-generate-articles.ts --dry-run
 */

import { spawn } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Article topics distributed across writers based on their strengths
// NOTE: Avoid special characters like () and ' in topics - they break shell escaping
const ARTICLE_QUEUE: Array<{
  writer: "jordan" | "ryan" | "mitch" | "raymond";
  topic: string;
  category: "ai" | "engineering" | "startups" | "trends";
  length: "short" | "medium" | "long";
}> = [
  // Jordan - Technical AI/Infrastructure
  {
    writer: "jordan",
    topic: "Why Your AI Model Accuracy Matters Less Than Your Data Pipeline",
    category: "ai",
    length: "medium",
  },
  {
    writer: "jordan",
    topic: "The Hidden Cost of AI - Energy Infrastructure and Why Most Startups Cant Compete",
    category: "trends",
    length: "long",
  },
  
  // Ryan - Business/Consulting/Practical
  {
    writer: "ryan",
    topic: "Stop Building Features Nobody Asked For - How to Actually Talk to Your Users",
    category: "startups",
    length: "medium",
  },
  {
    writer: "ryan",
    topic: "The Real Reason Your Software Project Is Over Budget",
    category: "engineering",
    length: "medium",
  },
  
  // Mitch - Philosophy/Design/Big Picture
  {
    writer: "mitch",
    topic: "The Myth of the 10x Developer - Why Your Teams Frequency Matters More",
    category: "engineering",
    length: "medium",
  },
  {
    writer: "mitch",
    topic: "Designing Systems That Work With You - The Architecture of Flow State",
    category: "engineering",
    length: "long",
  },
  
  // Raymond - ROI/Enterprise/Frameworks
  {
    writer: "raymond",
    topic: "AI ROI Calculator - A Framework for Measuring What Actually Matters",
    category: "ai",
    length: "medium",
  },
  {
    writer: "raymond",
    topic: "Enterprise Integration Playbook - From Legacy Spaghetti to Modern APIs",
    category: "engineering",
    length: "long",
  },
  
  // Round 2 - More variety
  {
    writer: "jordan",
    topic: "Quantum Computing and AI - What CTOs Need to Know Now",
    category: "trends",
    length: "medium",
  },
  {
    writer: "ryan",
    topic: "Hiring Engineers in 2026 - What I Look for After Interviewing 200 Candidates",
    category: "startups",
    length: "medium",
  },
  {
    writer: "mitch",
    topic: "Why Most AI Products Feel Soulless and How to Build Ones That Dont",
    category: "ai",
    length: "medium",
  },
  {
    writer: "raymond",
    topic: "Technical Debt Is Not the Problem - A CFOs Guide to Engineering Investment",
    category: "trends",
    length: "medium",
  },
];

async function runArticleGenerator(
  topic: string,
  writer: string,
  category: string,
  length: string
): Promise<boolean> {
  return new Promise((resolve) => {
    const scriptPath = join(__dirname, "generate-article.ts");
    
    console.log(`\n${"=".repeat(60)}`);
    console.log(`📝 Generating: "${topic}"`);
    console.log(`   Writer: ${writer} | Category: ${category} | Length: ${length}`);
    console.log("=".repeat(60));

    const child = spawn("bun", [
      "run",
      scriptPath,
      "--topic", topic,
      "--writer", writer,
      "--category", category,
      "--length", length,
    ], {
      stdio: "inherit",
      env: { ...process.env },
    });

    child.on("close", (code) => {
      if (code === 0) {
        console.log(`✅ Successfully generated article\n`);
        resolve(true);
      } else {
        console.log(`❌ Failed to generate article (exit code: ${code})\n`);
        resolve(false);
      }
    });

    child.on("error", (err) => {
      console.error(`❌ Error spawning process:`, err);
      resolve(false);
    });
  });
}

async function main() {
  const args = process.argv.slice(2);
  const countIdx = args.indexOf("--count");
  const count = countIdx !== -1 ? parseInt(args[countIdx + 1], 10) : ARTICLE_QUEUE.length;
  const dryRun = args.includes("--dry-run");

  const articlesToGenerate = ARTICLE_QUEUE.slice(0, count);

  console.log("\n🚀 Batch Article Generator");
  console.log("=".repeat(60));
  console.log(`📊 Articles to generate: ${articlesToGenerate.length}`);
  
  // Show distribution
  const writerCounts: Record<string, number> = {};
  for (const article of articlesToGenerate) {
    writerCounts[article.writer] = (writerCounts[article.writer] || 0) + 1;
  }
  console.log("\n📈 Distribution:");
  for (const [writer, count] of Object.entries(writerCounts)) {
    console.log(`   ${writer}: ${count} articles`);
  }

  if (dryRun) {
    console.log("\n🔍 DRY RUN - Articles that would be generated:");
    for (const article of articlesToGenerate) {
      console.log(`\n   [${article.writer}] ${article.topic}`);
      console.log(`   Category: ${article.category} | Length: ${article.length}`);
    }
    console.log("\n✅ Dry run complete. Remove --dry-run to generate.");
    return;
  }

  console.log("\n⏳ Starting generation...\n");

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < articlesToGenerate.length; i++) {
    const article = articlesToGenerate[i];
    console.log(`\n[${i + 1}/${articlesToGenerate.length}]`);
    
    const success = await runArticleGenerator(
      article.topic,
      article.writer,
      article.category,
      article.length
    );

    if (success) {
      successCount++;
    } else {
      failCount++;
    }

    // Small delay between generations to avoid rate limits
    if (i < articlesToGenerate.length - 1) {
      console.log("⏳ Waiting 2 seconds before next generation...");
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("📊 BATCH COMPLETE");
  console.log("=".repeat(60));
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log("\n📋 Next steps:");
  console.log("   1. Review generated articles in content-lab/article_generator/generated_articles/");
  console.log("   2. Add to website with images:");
  console.log("      bun run content-lab/scripts/add-article-to-insights.ts --all-new --with-image");
}

main();
