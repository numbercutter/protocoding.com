'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { InsightMetadata, InsightTopic, TOPIC_LABELS } from '@/lib/data/insights-metadata';

interface InsightsFilterProps {
  insights: InsightMetadata[];
  initialTopic?: string;
}

export default function InsightsFilter({ insights, initialTopic }: InsightsFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<InsightTopic | 'all'>(
    (initialTopic as InsightTopic) || 'all'
  );

  const topics = Object.entries(TOPIC_LABELS) as [InsightTopic, string][];

  // Filter and search
  const filteredInsights = useMemo(() => {
    let results = insights;

    // Filter by topic
    if (selectedTopic !== 'all') {
      results = results.filter(insight => insight.topic === selectedTopic);
    }

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(insight =>
        insight.title.toLowerCase().includes(query) ||
        insight.subtitle.toLowerCase().includes(query) ||
        insight.description.toLowerCase().includes(query) ||
        insight.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return results;
  }, [insights, selectedTopic, searchQuery]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTopic('all');
  };

  const hasActiveFilters = searchQuery.trim() || selectedTopic !== 'all';

  return (
    <>
      {/* Search and filter bar */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search input */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Topic filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTopic('all')}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-[0.1em] transition-all ${
                  selectedTopic === 'all'
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {topics.map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTopic(key)}
                  className={`px-4 py-2 text-[10px] font-bold uppercase tracking-[0.1em] transition-all ${
                    selectedTopic === key
                      ? 'bg-accent text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Active filters indicator */}
          {hasActiveFilters && (
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-500">
                Showing {filteredInsights.length} of {insights.length} articles
              </span>
              <button
                onClick={clearFilters}
                className="text-xs font-bold text-accent hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
        <div className="gutter-right" />
      </div>

      {/* Results */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material">
          {filteredInsights.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-lg font-bold text-gray-900 mb-2">No articles found</p>
              <p className="text-sm text-gray-500 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={clearFilters}
                className="text-sm font-bold text-accent hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filteredInsights.map((insight, index) => (
              <Link
                key={insight.slug}
                href={`/insights/${insight.slug}`}
                className={`group flex flex-col md:flex-row md:items-center justify-between p-5 cell ${
                  index % 2 === 0 ? 'material' : 'material-inset'
                } hover:material-elevated transition-all`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                  <span className="text-[10px] font-bold text-gray-300 order-2 md:order-1">
                    {insight.publishedAt}
                  </span>
                  <span className="px-2 py-1 text-[9px] font-bold uppercase tracking-[0.05em] bg-gray-100 text-gray-500 w-fit order-1 md:order-2">
                    {TOPIC_LABELS[insight.topic]}
                  </span>
                  <div className="order-3">
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-accent transition-colors">
                      {insight.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1 md:hidden">
                      {insight.subtitle}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3 md:mt-0">
                  <span className="text-xs font-bold text-gray-400">{insight.readTime}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 group-hover:text-accent transition-colors">
                    Read <ArrowUpRight size={12} />
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
        <div className="gutter-right" />
      </div>
    </>
  );
}
