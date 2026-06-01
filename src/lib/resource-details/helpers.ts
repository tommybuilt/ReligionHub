export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function firstSentences(text: string, sentenceCount = 3): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  const parts = normalized.match(/[^.!?]+[.!?]+/g) ?? [normalized];
  return parts.slice(0, sentenceCount).join(' ').trim();
}

export function readingTimeLabel(textBlocks: string[]): string {
  const words = textBlocks
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 225));
  return `${minutes} min read, ${words.toLocaleString()} words`;
}
