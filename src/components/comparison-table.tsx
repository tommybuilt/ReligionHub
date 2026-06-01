'use client';

import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CitationDrawer, InlineCitations } from '@/components/citation-drawer';
import type { ComparisonData, Citation, ClaimCategory } from '@/types';

const CATEGORY_LABELS: Record<ClaimCategory, string> = {
  origins: 'Origins',
  beliefs: 'Core Beliefs',
  practices: 'Practices & Rituals',
  texts: 'Sacred Texts',
  demographics: 'Demographics',
  holidays: 'Holidays & Festivals',
  leadership: 'Worship & Leadership',
  ethics: 'Ethics & Values',
  symbols: 'Symbols',
  afterlife: 'Afterlife Views',
  worship: 'Worship',
  key_figures: 'Key Figures',
  misconceptions: 'Common Misconceptions',
};

interface ComparisonTableProps {
  data: ComparisonData;
}

export function ComparisonTable({ data }: ComparisonTableProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerCitations, setDrawerCitations] = useState<Citation[]>([]);

  const openDrawer = (citations: Citation[]) => {
    setDrawerCitations(citations);
    setDrawerOpen(true);
  };

  const allCitations = data.categories.flatMap((cat) =>
    Object.values(cat.claims).flatMap((claims) =>
      claims.flatMap((c) => c.citations)
    )
  );
  const uniqueCitations = Array.from(
    new Map(allCitations.map((c) => [c.id, c])).values()
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Side-by-Side Comparison</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => openDrawer(uniqueCitations)}
          className="gap-2"
        >
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          View All Sources ({uniqueCitations.length})
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse" role="table">
          <thead>
            <tr className="border-b-2 border-primary/20">
              <th
                className="text-left p-3 bg-muted/50 font-semibold text-sm min-w-[140px] sticky left-0 z-10"
                scope="col"
              >
                Category
              </th>
              {data.religions.map((religion) => (
                <th
                  key={religion.id}
                  className="text-left p-3 bg-muted/50 font-semibold text-sm min-w-[250px]"
                  scope="col"
                >
                  {religion.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.categories.map((catData) => (
              <tr key={catData.category} className="border-b hover:bg-muted/30 transition-colors">
                <td className="p-3 font-medium text-sm align-top sticky left-0 bg-background z-10 border-r">
                  <Badge variant="outline" className="whitespace-nowrap">
                    {CATEGORY_LABELS[catData.category] || catData.category}
                  </Badge>
                </td>
                {data.religions.map((religion) => {
                  const claims = catData.claims[religion.id] || [];
                  return (
                    <td key={religion.id} className="p-3 align-top text-sm">
                      {claims.length === 0 ? (
                        <span className="text-muted-foreground italic text-xs">
                          No data available
                        </span>
                      ) : (
                        <ul className="space-y-2 list-none">
                          {claims.map((claim) => (
                            <li key={claim.id} className="leading-relaxed">
                              {claim.claim_text}
                              <InlineCitations
                                citations={claim.citations}
                                onOpenDrawer={() => openDrawer(claim.citations)}
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CitationDrawer
        citations={drawerCitations}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
