'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, List } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
  collapsible?: boolean;
}

export function TableOfContents({ headings, collapsible = false }: TableOfContentsProps) {
  const [open, setOpen] = useState(!collapsible);

  if (headings.length === 0) return null;

  const content = (
    <nav aria-label="Table of contents">
      <ul className="space-y-1.5 text-sm">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.level === 3 ? '1rem' : '0' }}>
            <a
              href={`#${h.id}`}
              className="text-muted-foreground hover:text-foreground transition-colors leading-snug block py-0.5"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  if (collapsible) {
    return (
      <div className="border rounded-lg p-4 mb-6">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-sm font-semibold w-full"
          aria-expanded={open}
        >
          <List className="h-4 w-4" aria-hidden="true" />
          Table of Contents
          {open ? <ChevronUp className="h-4 w-4 ml-auto" /> : <ChevronDown className="h-4 w-4 ml-auto" />}
        </button>
        {open && <div className="mt-3">{content}</div>}
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4">
      <p className="text-sm font-semibold mb-3 flex items-center gap-2">
        <List className="h-4 w-4" aria-hidden="true" />
        Table of Contents
      </p>
      {content}
    </div>
  );
}
