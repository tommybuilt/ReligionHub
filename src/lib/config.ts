export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'ReligionCompare',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.religioncompare.com',
  description:
    'Compare world religions side-by-side with factual, citation-backed information. Explore beliefs, practices, history, and more.',
} as const;

export const CLAIM_CATEGORIES = [
  'origins',
  'beliefs',
  'practices',
  'texts',
  'demographics',
  'holidays',
  'leadership',
  'ethics',
  'symbols',
  'afterlife',
  'worship',
  'key_figures',
  'misconceptions',
] as const;
