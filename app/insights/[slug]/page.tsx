import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { INSIGHTS, INSIGHT_SLUGS, TOPIC_LABELS } from '@/lib/data/insights';

type Props = {
  params: Promise<{ slug: string }>;
};

const siteUrl = 'https://www.protocoding.com';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = INSIGHTS[slug];
  
  if (!insight) {
    return { title: 'Article Not Found - Protocoding' };
  }
  
  const title = `${insight.title} - Insights - Protocoding`;
  const description = insight.description;
  
  return {
    title,
    description,
    openGraph: {
      title: insight.title,
      description,
      type: 'article',
      publishedTime: insight.publishedAt,
      authors: [insight.author.name],
      tags: insight.tags,
      ...(insight.heroImage && {
        images: [{
          url: insight.heroImage,
          width: 1200,
          height: 675,
          alt: insight.title,
        }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: insight.title,
      description,
      ...(insight.heroImage && { images: [insight.heroImage] }),
    },
  };
}

export async function generateStaticParams() {
  return INSIGHT_SLUGS.map((slug) => ({ slug }));
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const insight = INSIGHTS[slug];

  if (!insight) {
    notFound();
  }

  const relatedInsights = insight.relatedInsights
    .map((insightSlug) => INSIGHTS[insightSlug])
    .filter(Boolean);

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: insight.title,
    description: insight.description,
    image: insight.heroImage ? `${siteUrl}${insight.heroImage}` : `${siteUrl}/og-image.png`,
    datePublished: insight.publishedAt,
    dateModified: insight.publishedAt,
    author: {
      '@type': 'Person',
      name: insight.author.name,
      jobTitle: insight.author.role,
      url: `${siteUrl}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Protocoding',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/brand/logo_color.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/insights/${slug}`,
    },
    keywords: insight.tags.join(', '),
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero section */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-8 pt-20 md:p-12 md:pt-12 lg:p-16">
          <Link href="/insights" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 hover:text-white/50 transition-colors mb-6">
            <ArrowLeft size={12} /> All Insights
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] bg-accent/20 text-accent">
              {TOPIC_LABELS[insight.topic]}
            </span>
            <span className="text-[10px] font-bold text-white/40">{insight.readTime}</span>
            <span className="text-[10px] font-bold text-white/40">{insight.publishedAt}</span>
          </div>
          
          <h1 className="text-2xl lg:text-4xl font-bold text-white tracking-tight mb-4 max-w-4xl">
            {insight.title}
          </h1>
          <p className="text-lg text-accent mb-6">{insight.subtitle}</p>
          
          <div className="flex items-center gap-4">
            <Image
              src={insight.author.image}
              alt={insight.author.name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-bold text-white">{insight.author.name}</p>
              <p className="text-xs text-white/40">{insight.author.role}</p>
            </div>
          </div>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Hero image */}
      {insight.heroImage && (
        <div className="section-row">
          <div className="gutter-left" />
          <div className="material overflow-hidden">
            <div className="relative h-64 md:h-80 lg:h-96">
              <Image
                src={insight.heroImage}
                alt={insight.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="gutter-right" />
        </div>
      )}

      {/* Article content */}
      <div className="section-row">
        <div className="gutter-left" />
        <article className="material p-8 lg:p-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            {insight.content.map((block, index) => {
              switch (block.type) {
                case 'heading':
                  return (
                    <h2 key={index} className="text-xl font-bold text-gray-900 mt-10 mb-4 tracking-tight">
                      {block.content as string}
                    </h2>
                  );
                case 'paragraph':
                  return (
                    <p key={index} className="text-base text-gray-600 leading-relaxed mb-6">
                      {block.content as string}
                    </p>
                  );
                case 'list':
                  return (
                    <ul key={index} className="space-y-2 mb-6 ml-4">
                      {(block.content as string[]).map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-base text-gray-600">
                          <span className="w-1.5 h-1.5 bg-accent mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                case 'quote':
                  return (
                    <blockquote key={index} className="border-l-4 border-accent pl-6 py-2 my-8">
                      <p className="text-lg text-gray-700 italic leading-relaxed">
                        &ldquo;{block.content as string}&rdquo;
                      </p>
                    </blockquote>
                  );
                case 'code':
                  return (
                    <pre key={index} className="bg-gray-900 text-gray-100 p-6 overflow-x-auto text-sm mb-6 font-mono">
                      <code>{block.content as string}</code>
                    </pre>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </article>
        <div className="gutter-right" />
      </div>

      {/* Tags */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material-inset p-6 lg:p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Topics</p>
          <div className="flex flex-wrap gap-2">
            {insight.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500 bg-gray-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Author */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material p-6 lg:p-8">
          <div className="flex items-center gap-6">
            <Image
              src={insight.author.image}
              alt={insight.author.name}
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">Written by</p>
              <p className="text-lg font-bold text-gray-900">{insight.author.name}</p>
              <p className="text-sm text-gray-500">{insight.author.role} at Protocoding</p>
            </div>
          </div>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Related articles */}
      {relatedInsights.length > 0 && (
        <>
          <div className="section-row-dark">
            <div className="gutter-left" />
            <div className="material-dark p-6 md:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-3">Related</p>
              <h2 className="text-xl font-bold text-white tracking-tight">More insights</h2>
            </div>
            <div className="gutter-right" />
          </div>
          
          <div className="section-row-dark">
            <div className="gutter-left" />
            <div className="material-dark grid grid-cols-1 md:grid-cols-3">
              {relatedInsights.map((related) => (
                <Link
                  key={related.slug}
                  href={`/insights/${related.slug}`}
                  className="group p-6 cell-dark hover:bg-white/[0.02] transition-all"
                >
                  <span className="inline-block px-2 py-1 text-[9px] font-bold uppercase tracking-[0.05em] bg-white/5 text-white/50 mb-3">
                    {TOPIC_LABELS[related.topic]}
                  </span>
                  <h3 className="text-sm font-bold text-white mb-2 group-hover:text-accent transition-colors leading-tight">
                    {related.title}
                  </h3>
                  <p className="text-xs text-white/40">{related.readTime}</p>
                </Link>
              ))}
            </div>
            <div className="gutter-right" />
          </div>
        </>
      )}

      {/* CTA */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material grid grid-cols-2">
          <Link href="/insights" className="p-8 cell material-inset hover:material transition-all group">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">← Back</p>
            <p className="text-sm font-bold text-gray-900 group-hover:text-accent transition-colors">All Insights</p>
          </Link>
          <Link href="/contact" className="p-8 cell material-inset hover:material transition-all group text-right">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Next →</p>
            <p className="text-sm font-bold text-gray-900 group-hover:text-accent transition-colors">Start a Project</p>
          </Link>
        </div>
        <div className="gutter-right" />
      </div>
    </>
  );
}
