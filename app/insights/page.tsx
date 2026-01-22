import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { 
  INSIGHTS_BY_DATE, 
  getRecentInsightsMetadata, 
  TOPIC_LABELS, 
  InsightTopic 
} from '@/lib/data/insights-metadata';
import InsightsFilter from '@/components/InsightsFilter';

export const metadata: Metadata = {
  title: 'Insights - AI & Engineering Blog',
  description: 'Expert insights on AI development, software engineering best practices, startup strategy, and technology trends from the Protocoding team.',
  openGraph: {
    title: 'Protocoding Insights - AI & Engineering Blog',
    description: 'Deep dives on AI, LLMs, software architecture, startup strategy, and emerging tech trends from our team of engineers.',
  },
};

type Props = {
  searchParams: Promise<{ topic?: string }>;
};

export default async function InsightsPage({ searchParams }: Props) {
  const { topic } = await searchParams;
  const recentInsights = getRecentInsightsMetadata(6);
  const featuredInsight = recentInsights[0];
  const otherInsights = recentInsights.slice(1);

  return (
    <>
      {/* Hero section */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-8 pt-20 md:p-12 md:pt-12 lg:p-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-4">Insights</p>
          <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Ideas, guides & <span className="text-accent">thinking</span>
          </h1>
          <p className="text-lg text-white/40 max-w-2xl">
            Deep dives on AI, engineering best practices, startup strategy, and the future of technology from our team.
          </p>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Featured article - only show when no topic filter */}
      {!topic && featuredInsight && (
        <div className="section-row">
          <div className="gutter-left" />
          <Link href={`/insights/${featuredInsight.slug}`} className="material group p-6 md:p-8 lg:p-12 block hover:material-elevated transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center">
                <span className="inline-block px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] bg-accent/10 text-accent mb-4 w-fit">
                  Featured
                </span>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
                  {TOPIC_LABELS[featuredInsight.topic]} · {featuredInsight.readTime}
                </p>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight mb-4 group-hover:text-accent transition-colors">
                  {featuredInsight.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">{featuredInsight.description}</p>
                <div className="flex items-center gap-3">
                  <Image
                    src={featuredInsight.author.image}
                    alt={featuredInsight.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{featuredInsight.author.name}</p>
                    <p className="text-xs text-gray-400">{featuredInsight.author.role}</p>
                  </div>
                </div>
              </div>
              <div className="aspect-video bg-gray-100 material-inset flex items-center justify-center overflow-hidden">
                {featuredInsight.heroImage ? (
                  <Image
                    src={featuredInsight.heroImage}
                    alt={featuredInsight.title}
                    width={640}
                    height={360}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">Featured Article</span>
                )}
              </div>
            </div>
          </Link>
          <div className="gutter-right" />
        </div>
      )}

      {/* Quick picks grid - only show when no topic filter */}
      {!topic && (
        <>
          <div className="section-row">
            <div className="gutter-left" />
            <div className="material-elevated p-6 md:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Latest</p>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">Recent articles</h2>
            </div>
            <div className="gutter-right" />
          </div>

          <div className="section-row">
            <div className="gutter-left" />
            <div className="material">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {otherInsights.map((insight, index) => (
                  <Link
                    key={insight.slug}
                    href={`/insights/${insight.slug}`}
                    className={`group p-6 cell ${index % 2 === 0 ? 'material' : 'material-inset'} hover:material-elevated transition-all`}
                  >
                    <span className="inline-block px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] bg-gray-100 text-gray-500 mb-4">
                      {TOPIC_LABELS[insight.topic]}
                    </span>
                    <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-accent transition-colors leading-tight">
                      {insight.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">{insight.subtitle}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-400">{insight.readTime}</span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 group-hover:text-accent transition-colors">
                        Read <ArrowUpRight size={12} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="gutter-right" />
          </div>
        </>
      )}

      {/* All articles section header */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material-elevated p-6 md:p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">
            {topic ? TOPIC_LABELS[topic as InsightTopic] || 'Browse' : 'Browse'}
          </p>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            {topic ? `${TOPIC_LABELS[topic as InsightTopic] || 'All'} articles` : 'All articles'}
          </h2>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Interactive filter and list */}
      <InsightsFilter insights={INSIGHTS_BY_DATE} initialTopic={topic} />

      {/* CTA */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-8 lg:p-12 text-center">
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-4">Want to discuss a project?</h2>
          <p className="text-sm text-white/40 mb-6 max-w-xl mx-auto">
            Our insights come from real-world experience building products. Let&apos;s talk about how we can help with yours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-black/80 text-sm font-bold tracking-wide uppercase hover:brightness-110"
          >
            Get in Touch <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="gutter-right" />
      </div>
    </>
  );
}
