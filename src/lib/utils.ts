import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const INLINE_CITATION_REGEX = /\[(\d+)\]/g;
const INLINE_CITATION_CLUSTER_REGEX = /\s*(?:\[(\d+)\])+/g;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function normalizeCitationSpacing(text: string): string {
  return text
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export function extractInlineCitationNumbers(text: string): string[] {
  return Array.from(text.matchAll(INLINE_CITATION_REGEX), (match) => match[1]).filter(
    (value, index, values) => values.indexOf(value) === index
  );
}

export function stripInlineCitations(text: string): string {
  return normalizeCitationSpacing(text.replace(INLINE_CITATION_CLUSTER_REGEX, ''));
}

export function collapseInlineCitations(text: string): string {
  const citations = extractInlineCitationNumbers(text);
  const cleaned = stripInlineCitations(text);

  if (!citations.length) {
    return cleaned;
  }

  return `${cleaned} ${citations.map((citation) => `[${citation}]`).join('')}`.trim();
}

export function collapseSectionCitations(paragraphs: string[]): string[] {
  const cleanedParagraphs = paragraphs.map((paragraph) => stripInlineCitations(paragraph));
  const citations = paragraphs.flatMap((paragraph) => extractInlineCitationNumbers(paragraph)).filter(
    (value, index, values) => values.indexOf(value) === index
  );

  if (!citations.length) {
    return cleanedParagraphs;
  }

  const lastIndex = cleanedParagraphs.length - 1;

  if (lastIndex < 0) {
    return cleanedParagraphs;
  }

  cleanedParagraphs[lastIndex] = `${cleanedParagraphs[lastIndex]} ${citations.map((citation) => `[${citation}]`).join('')}`.trim();
  return cleanedParagraphs;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatDate(date: string, locale = 'en'): string {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}

export function generateCompareSlug(slugs: string[]): string {
  return [...slugs].sort().join('-vs-');
}

export function parseCompareSlug(slug: string): string[] {
  return slug.split('-vs-');
}
