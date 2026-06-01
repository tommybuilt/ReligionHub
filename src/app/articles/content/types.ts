export interface ArticleSource {
  id: number;
  label: string;
  url?: string;
}

export interface ArticleMeta {
  slug: string;
  title: string;
  author: 'Renee K.' | 'Maury B.';
  publishDate: string; // ISO date string
  displayDate: string; // Human-readable date
  category: 'Beliefs' | 'Practices' | 'History' | 'Culture' | 'FAQ' | 'Comparison';
  readTime: string;
  excerpt: string;
  relatedSlugs: string[]; // slugs of related articles
  relatedReligions: string[]; // slugs of related religion pages
  relatedComparisons: string[]; // comparison page paths
}

export interface Article extends ArticleMeta {
  content: string; // Full article HTML-ready markdown-ish content with [1][2] citations
  sources: ArticleSource[];
}

export const AUTHOR_BIOS: Record<string, { name: string; bio: string }> = {
  'Renee K.': {
    name: 'Renee K.',
    bio: 'Renee K. is a writer and researcher covering world religions, cultural traditions, and interfaith dialogue. She holds a background in comparative religion and anthropology.',
  },
  'Maury B.': {
    name: 'Maury B.',
    bio: 'Maury B. is a writer and researcher specializing in religious history, theology, and the intersection of faith and modern life. His work focuses on making complex traditions accessible to general audiences.',
  },
};
