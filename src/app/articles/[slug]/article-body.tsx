'use client';

import React from 'react';
import { collapseInlineCitations } from '@/lib/utils';

interface ArticleBodyProps {
  content: string;
}

export function ArticleBody({ content }: ArticleBodyProps) {
  const rendered = renderContent(content);
  return <div className="prose prose-neutral dark:prose-invert max-w-none break-words">{rendered}</div>;
}

function renderContent(content: string): React.ReactNode[] {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let paragraphBuffer: string[] = [];
  let key = 0;

  function flushParagraph() {
    if (paragraphBuffer.length > 0) {
      const text = collapseInlineCitations(paragraphBuffer.join(' '));
      elements.push(
        <p key={key++} className="mb-4 break-words text-base leading-relaxed">
          {renderInline(text)}
        </p>
      );
      paragraphBuffer = [];
    }
  }

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === '') {
      flushParagraph();
      continue;
    }

    const h2Match = trimmed.match(/^##\s+(.+)$/);
    if (h2Match) {
      flushParagraph();
      const text = h2Match[1].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      elements.push(
        <h2 key={key++} id={id} className="mt-10 mb-4 break-words text-2xl font-bold scroll-mt-24">
          {text}
        </h2>
      );
      continue;
    }

    const h3Match = trimmed.match(/^###\s+(.+)$/);
    if (h3Match) {
      flushParagraph();
      const text = h3Match[1].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      elements.push(
        <h3 key={key++} id={id} className="mt-8 mb-3 break-words text-xl font-semibold scroll-mt-24">
          {text}
        </h3>
      );
      continue;
    }

    paragraphBuffer.push(trimmed);
  }

  flushParagraph();
  return elements;
}

function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const regex = /\[(\d+)\]/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(renderBoldItalic(text.slice(lastIndex, match.index), key++));
    }
    const refNum = match[1];
    nodes.push(
      <a
        key={`cite-${key++}`}
        href={`#source-${refNum}`}
        className="text-primary text-xs align-super font-medium hover:underline"
        title={`Source ${refNum}`}
      >
        [{refNum}]
      </a>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(renderBoldItalic(text.slice(lastIndex), key++));
  }

  return nodes;
}

function renderBoldItalic(text: string, baseKey: number): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const boldRegex = /\*\*(.+?)\*\*/g;
  let lastIdx = 0;
  let m;
  let k = 0;

  while ((m = boldRegex.exec(text)) !== null) {
    if (m.index > lastIdx) {
      parts.push(<React.Fragment key={`${baseKey}-t-${k++}`}>{text.slice(lastIdx, m.index)}</React.Fragment>);
    }
    parts.push(<strong key={`${baseKey}-b-${k++}`}>{m[1]}</strong>);
    lastIdx = boldRegex.lastIndex;
  }

  if (lastIdx < text.length) {
    parts.push(<React.Fragment key={`${baseKey}-t-${k++}`}>{text.slice(lastIdx)}</React.Fragment>);
  }

  if (parts.length === 1 && typeof parts[0] === 'string') {
    return parts[0];
  }

  return <React.Fragment key={baseKey}>{parts}</React.Fragment>;
}
