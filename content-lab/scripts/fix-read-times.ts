#!/usr/bin/env bun
/**
 * Fix Read Times for All Articles
 * 
 * Recalculates read times based on actual word count (200 words/min)
 * 
 * Usage:
 *   bun run content-lab/scripts/fix-read-times.ts --dry-run
 *   bun run content-lab/scripts/fix-read-times.ts
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const INSIGHTS_FILE = join(__dirname, "../../lib/data/insights.ts");

interface ArticleStats {
  slug: string;
  title: string;
  currentReadTime: string;
  wordCount: number;
  calculatedReadTime: string;
  needsUpdate: boolean;
}

function calculateReadTime(wordCount: number): string {
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

function extractArticleStats(content: string): ArticleStats[] {
  const stats: ArticleStats[] = [];
  
  // Find each article by looking for 'slug-name': { pattern
  const articlePattern = /'([a-z0-9-]+)':\s*\{[\s\S]*?slug:\s*'\1'/g;
  let match;
  
  // Get positions of each article start
  const positions: Array<{ slug: string; start: number }> = [];
  while ((match = articlePattern.exec(content)) !== null) {
    positions.push({ slug: match[1], start: match.index });
  }
  
  for (let i = 0; i < positions.length; i++) {
    const { slug, start } = positions[i];
    const end = i < positions.length - 1 ? positions[i + 1].start : content.length;
    const block = content.substring(start, end);
    
    // Extract title
    const titleMatch = block.match(/title:\s*'([^']+)'/);
    const title = titleMatch ? titleMatch[1] : slug;
    
    // Extract current read time
    const readTimeMatch = block.match(/readTime:\s*'([^']+)'/);
    const currentReadTime = readTimeMatch ? readTimeMatch[1] : "unknown";
    
    // Count words in content strings - look for content: 'text' or content: ['items']
    let wordCount = 0;
    
    // Match content: 'single string'
    const singleMatches = block.matchAll(/\{\s*type:\s*'[^']+',\s*content:\s*'([^'\\]*(?:\\.[^'\\]*)*)'/g);
    for (const m of singleMatches) {
      const text = m[1].replace(/\\'/g, "'");
      wordCount += text.split(/\s+/).filter(w => w.length > 0).length;
    }
    
    // Match content: ['array', 'items']
    const arrayMatches = block.matchAll(/\{\s*type:\s*'list',\s*content:\s*\[([^\]]+)\]/g);
    for (const m of arrayMatches) {
      const items = m[1].match(/'([^'\\]*(?:\\.[^'\\]*)*)'/g) || [];
      for (const item of items) {
        const text = item.slice(1, -1).replace(/\\'/g, "'");
        wordCount += text.split(/\s+/).filter(w => w.length > 0).length;
      }
    }
    
    const calculatedReadTime = calculateReadTime(wordCount);
    const needsUpdate = currentReadTime !== calculatedReadTime;
    
    stats.push({
      slug,
      title: title.substring(0, 50) + (title.length > 50 ? "..." : ""),
      currentReadTime,
      wordCount,
      calculatedReadTime,
      needsUpdate,
    });
  }
  
  return stats;
}

function fixReadTimes(content: string, stats: ArticleStats[]): string {
  let updated = content;
  
  for (const stat of stats) {
    if (stat.needsUpdate) {
      // Replace the readTime for this article
      const pattern = new RegExp(
        `('${stat.slug}':[\\s\\S]*?readTime:\\s*)'[^']*'`,
        'g'
      );
      updated = updated.replace(pattern, `$1'${stat.calculatedReadTime}'`);
    }
  }
  
  return updated;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  
  console.log("📊 Article Read Time Fixer\n");
  
  const content = readFileSync(INSIGHTS_FILE, "utf-8");
  const stats = extractArticleStats(content);
  
  // Summary
  const total = stats.length;
  const needsUpdate = stats.filter(s => s.needsUpdate).length;
  const tooShort = stats.filter(s => s.wordCount < 500).length;
  
  console.log(`Found ${total} articles`);
  console.log(`${needsUpdate} need read time updates`);
  console.log(`${tooShort} are under 500 words (may need regeneration)\n`);
  
  // Show articles that need updates
  console.log("Articles needing read time fixes:");
  console.log("-".repeat(90));
  console.log("| Slug".padEnd(40) + " | Words | Current  | Should Be |");
  console.log("-".repeat(90));
  
  for (const stat of stats) {
    if (stat.needsUpdate) {
      const shortSlug = stat.slug.substring(0, 38);
      console.log(
        `| ${shortSlug.padEnd(38)} | ${String(stat.wordCount).padStart(5)} | ${stat.currentReadTime.padEnd(8)} | ${stat.calculatedReadTime.padEnd(9)} |`
      );
    }
  }
  console.log("-".repeat(90));
  
  // Show articles that are too short
  if (tooShort > 0) {
    console.log("\n⚠️  Articles under 500 words (need more content):");
    for (const stat of stats.filter(s => s.wordCount < 500)) {
      console.log(`   - ${stat.slug}: ${stat.wordCount} words`);
    }
  }
  
  if (dryRun) {
    console.log("\n🔍 DRY RUN - no changes made");
    console.log("   Run without --dry-run to apply fixes");
    return;
  }
  
  // Apply fixes
  if (needsUpdate > 0) {
    const updated = fixReadTimes(content, stats);
    writeFileSync(INSIGHTS_FILE, updated);
    console.log(`\n✅ Updated ${needsUpdate} read times in insights.ts`);
  } else {
    console.log("\n✅ All read times are already correct!");
  }
}

main().catch(console.error);
