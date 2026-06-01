'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CompareTabsProps {
  tableView: React.ReactNode;
  differencesView: React.ReactNode;
  chartsView: React.ReactNode;
}

const TABS = [
  { key: 'table', label: 'Table View' },
  { key: 'differences', label: 'Differences Explained' },
  { key: 'charts', label: 'Charts' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

export function CompareTabs({ tableView, differencesView, chartsView }: CompareTabsProps) {
  const [active, setActive] = useState<TabKey>('table');

  return (
    <>
      <div className="mb-6 overflow-x-auto pb-1" role="tablist" aria-label="Comparison views">
        <div className="flex min-w-max gap-2">
        {TABS.map((tab) => (
          <Button
            key={tab.key}
            variant={active === tab.key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActive(tab.key)}
            role="tab"
            aria-selected={active === tab.key}
            aria-controls={`panel-${tab.key}`}
            className="shrink-0"
          >
            {tab.label}
          </Button>
        ))}
        </div>
      </div>

      <div
        id="panel-table"
        role="tabpanel"
        className={active === 'table' ? '' : 'hidden'}
      >
        {tableView}
      </div>
      <div
        id="panel-differences"
        role="tabpanel"
        className={active === 'differences' ? '' : 'hidden'}
      >
        {differencesView}
      </div>
      <div
        id="panel-charts"
        role="tabpanel"
        className={active === 'charts' ? '' : 'hidden'}
      >
        {chartsView}
      </div>
    </>
  );
}
