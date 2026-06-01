import { describe, it, expect } from 'vitest';
import { slugify, formatDate, truncate, generateCompareSlug, parseCompareSlug, cn } from '../utils';

describe('slugify', () => {
  it('converts text to lowercase slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(slugify("Baha'i Faith")).toBe('bahai-faith');
  });

  it('trims leading/trailing hyphens', () => {
    expect(slugify('  Hello  ')).toBe('hello');
  });

  it('collapses multiple hyphens', () => {
    expect(slugify('one---two')).toBe('one-two');
  });
});

describe('formatDate', () => {
  it('formats ISO date string', () => {
    const result = formatDate('2024-01-15');
    expect(result).toContain('2024');
  });
});

describe('truncate', () => {
  it('truncates long text with ellipsis', () => {
    expect(truncate('Hello World', 5)).toBe('Hello...');
  });

  it('returns short text unchanged', () => {
    expect(truncate('Hi', 10)).toBe('Hi');
  });
});

describe('generateCompareSlug', () => {
  it('joins slugs with -vs-', () => {
    expect(generateCompareSlug(['christianity', 'islam'])).toBe('christianity-vs-islam');
  });

  it('sorts slugs alphabetically', () => {
    expect(generateCompareSlug(['islam', 'christianity'])).toBe('christianity-vs-islam');
  });
});

describe('parseCompareSlug', () => {
  it('splits -vs- slug into array', () => {
    expect(parseCompareSlug('christianity-vs-islam')).toEqual(['christianity', 'islam']);
  });

  it('handles three religions', () => {
    expect(parseCompareSlug('buddhism-vs-christianity-vs-islam')).toEqual(['buddhism', 'christianity', 'islam']);
  });
});

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).toBe('base visible');
  });
});
