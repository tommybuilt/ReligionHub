'use client';

import React from 'react';
import { X, ExternalLink, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Citation } from '@/types';

interface CitationDrawerProps {
  citations: Citation[];
  isOpen: boolean;
  onClose: () => void;
}

export function CitationDrawer({ citations, isOpen, onClose }: CitationDrawerProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Sources drawer"
    >
      <div className="fixed inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div className="relative z-50 w-full max-w-lg bg-background shadow-xl overflow-y-auto">
        <div className="sticky top-0 bg-background border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 className="text-lg font-semibold">Sources ({citations.length})</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close sources drawer">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4 space-y-4">
          {citations.length === 0 && (
            <p className="text-muted-foreground text-sm">No sources available.</p>
          )}
          {citations.map((citation, index) => (
            <article
              key={citation.id}
              className="border rounded-lg p-4 space-y-2"
              aria-label={`Source ${index + 1}: ${citation.title}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-sm leading-tight">{citation.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {citation.publisher}
                    {citation.author && `, ${citation.author}`}
                  </p>
                </div>
                <Badge
                  variant={
                    citation.reliability_tier === 'primary'
                      ? 'default'
                      : citation.reliability_tier === 'secondary'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {citation.reliability_tier}
                </Badge>
              </div>
              {citation.excerpt && (
                <blockquote className="text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-3">
                  &ldquo;{citation.excerpt}&rdquo;
                </blockquote>
              )}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Accessed: {citation.date_accessed}</span>
                {citation.date_published && <span>Published: {citation.date_published}</span>}
              </div>
              <a
                href={citation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                View source <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

interface CitationMarkerProps {
  index: number;
  onClick: () => void;
}

export function CitationMarker({ index, onClick }: CitationMarkerProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center h-4 min-w-[1rem] px-0.5 text-[10px] font-bold text-primary bg-primary/10 rounded hover:bg-primary/20 transition-colors align-super"
      aria-label={`View source ${index}`}
      title={`Source [${index}]`}
    >
      {index}
    </button>
  );
}

interface InlineCitationsProps {
  citations: Citation[];
  onOpenDrawer: () => void;
}

export function InlineCitations({ citations, onOpenDrawer }: InlineCitationsProps) {
  if (citations.length === 0) return null;

  return (
    <span className="inline-flex items-center gap-0.5 ml-1">
      {citations.slice(0, 3).map((c, i) => (
        <CitationMarker key={c.id} index={i + 1} onClick={onOpenDrawer} />
      ))}
      {citations.length > 3 && (
        <button
          onClick={onOpenDrawer}
          className="text-[10px] text-primary hover:underline"
          aria-label={`View all ${citations.length} sources`}
        >
          +{citations.length - 3}
        </button>
      )}
    </span>
  );
}
