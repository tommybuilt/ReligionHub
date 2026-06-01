'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { TRENDING_TOPICS, TRENDING_CATEGORIES } from './data';

const CATEGORY_COLORS: Record<string, string> = {
  'Interfaith': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  'Politics': 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  'Culture': 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
  'Demographics': 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  'Scholarship': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  'Human Rights': 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
};

export function TrendingClient() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!activeCategory) return TRENDING_TOPICS;
    return TRENDING_TOPICS.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  return (
    <div>
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter by category">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            !activeCategory
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          All Topics
        </button>
        {TRENDING_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mb-4">{filtered.length} topic{filtered.length !== 1 ? 's' : ''}</p>

      {/* Topic Cards */}
      <div className="space-y-4">
        {filtered.map((topic) => {
          const isExpanded = expandedId === topic.id;
          const colorClass = CATEGORY_COLORS[topic.category] || 'bg-muted text-muted-foreground';
          return (
            <Card key={topic.id} className="overflow-hidden">
              <button
                onClick={() => setExpandedId(isExpanded ? null : topic.id)}
                className="w-full text-left p-5 hover:bg-muted/30 transition-colors"
                aria-expanded={isExpanded}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colorClass}`}>
                        {topic.category}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" aria-hidden="true" />
                        {topic.displayDate}
                      </span>
                    </div>
                    <h3 className="font-semibold text-base leading-snug">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{topic.summary}</p>
                  </div>
                  <div className="shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                  </div>
                </div>
              </button>

              {isExpanded && (
                <CardContent className="pt-0 pb-5 px-5 border-t">
                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Context</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{topic.context}</p>
                    </div>

                    {topic.relatedLinks.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Explore on ReligionCompare</h4>
                        <div className="flex flex-wrap gap-2">
                          {topic.relatedLinks.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border hover:bg-muted/50 hover:border-primary/30 transition-colors"
                            >
                              {link.label}
                              <ExternalLink className="h-3 w-3 ml-0.5" aria-hidden="true" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        <strong>Source:</strong>{' '}
                        {topic.sourceUrl ? (
                          <a href={topic.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                            {topic.source}
                          </a>
                        ) : (
                          topic.source
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-muted-foreground text-center py-12">No topics found for this category.</p>
      )}
    </div>
  );
}
