import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';
import { ALL_ARTICLES } from '@/app/articles/content';
import { INFOGRAPHICS } from '@/app/infographics/data';
import { RELIGION_CONTENT } from '@/app/religions/[slug]/content';
import { RECOMMENDED_READING } from '@/app/religions/[slug]/recommended-reading';
import { SACRED_PLACE_SLUGS } from '@/app/sacred-places/[slug]/page';
import { BEGINNER_GUIDE_DETAILS } from '@/lib/resource-details/beginner-guides';
import { EDUCATOR_RESOURCE_DETAILS } from '@/lib/resource-details/educator-resources';
import { FAQ_DETAILS } from '@/lib/resource-details/faqs';
import { GLOSSARY_DETAILS } from '@/lib/resource-details/glossary';
import { SACRED_TEXT_DETAILS } from '@/lib/resource-details/sacred-texts';
import { ETIQUETTE_GUIDE_DETAILS } from '@/lib/resource-details/etiquette-guides';

const STATIC_PAGES = [
  '',
  '/religions',
  '/compare',
  '/quiz',
  '/quiz/alignment',
  '/quiz/knowledge',
  '/quiz/traditions',
  '/quiz/symbols',
  '/quiz/sacred-places',
  '/quiz/history',
  '/quiz/ethics',
  '/quiz/demographics',
  '/articles',
  '/quiz/what-religion-am-i',
  '/holidays',
  '/infographics',
  '/sacred-items',
  '/recommended-reading',
  '/glossary',
  '/beginner-guides',
  '/etiquette-guides',
  '/sacred-places',
  '/sacred-texts',
  '/faqs',
  '/educator-resources',
  '/trending',
  '/search',
  '/contact',
  '/legal/privacy',
  '/legal/terms',
  '/legal/affiliate-disclosure',
  '/legal/cookies',
  '/legal/accessibility',
  '/legal/dmca',
  '/legal/disclaimers',
  '/legal/image-credits',
  '/about/how-we-source',
  '/about/editorial-policy',
];

const STATIC_PAGE_CONFIG: Record<string, { changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }> = {
  '': { changeFrequency: 'daily', priority: 1.0 },
  '/religions': { changeFrequency: 'weekly', priority: 0.9 },
  '/compare': { changeFrequency: 'weekly', priority: 0.9 },
  '/quiz': { changeFrequency: 'weekly', priority: 0.85 },
  '/quiz/alignment': { changeFrequency: 'monthly', priority: 0.76 },
  '/quiz/knowledge': { changeFrequency: 'monthly', priority: 0.76 },
  '/quiz/traditions': { changeFrequency: 'monthly', priority: 0.76 },
  '/quiz/symbols': { changeFrequency: 'monthly', priority: 0.76 },
  '/quiz/sacred-places': { changeFrequency: 'monthly', priority: 0.76 },
  '/quiz/history': { changeFrequency: 'monthly', priority: 0.76 },
  '/quiz/ethics': { changeFrequency: 'monthly', priority: 0.76 },
  '/quiz/demographics': { changeFrequency: 'monthly', priority: 0.76 },
  '/quiz/what-religion-am-i': { changeFrequency: 'monthly', priority: 0.78 },
  '/articles': { changeFrequency: 'weekly', priority: 0.82 },
  '/holidays': { changeFrequency: 'weekly', priority: 0.82 },
  '/infographics': { changeFrequency: 'monthly', priority: 0.78 },
  '/sacred-items': { changeFrequency: 'weekly', priority: 0.8 },
  '/recommended-reading': { changeFrequency: 'monthly', priority: 0.78 },
  '/glossary': { changeFrequency: 'monthly', priority: 0.76 },
  '/beginner-guides': { changeFrequency: 'monthly', priority: 0.76 },
  '/etiquette-guides': { changeFrequency: 'monthly', priority: 0.74 },
  '/sacred-places': { changeFrequency: 'weekly', priority: 0.82 },
  '/sacred-texts': { changeFrequency: 'monthly', priority: 0.76 },
  '/faqs': { changeFrequency: 'monthly', priority: 0.74 },
  '/educator-resources': { changeFrequency: 'monthly', priority: 0.74 },
  '/trending': { changeFrequency: 'weekly', priority: 0.8 },
  '/search': { changeFrequency: 'weekly', priority: 0.65 },
  '/contact': { changeFrequency: 'monthly', priority: 0.55 },
  '/legal/privacy': { changeFrequency: 'yearly', priority: 0.35 },
  '/legal/terms': { changeFrequency: 'yearly', priority: 0.35 },
  '/legal/affiliate-disclosure': { changeFrequency: 'yearly', priority: 0.35 },
  '/legal/cookies': { changeFrequency: 'yearly', priority: 0.35 },
  '/legal/accessibility': { changeFrequency: 'yearly', priority: 0.35 },
  '/legal/dmca': { changeFrequency: 'yearly', priority: 0.35 },
  '/legal/disclaimers': { changeFrequency: 'yearly', priority: 0.35 },
  '/legal/image-credits': { changeFrequency: 'yearly', priority: 0.3 },
  '/about/how-we-source': { changeFrequency: 'monthly', priority: 0.55 },
  '/about/editorial-policy': { changeFrequency: 'monthly', priority: 0.55 },
};

const RELIGION_SLUGS = Object.keys(RELIGION_CONTENT).sort();

const RECOMMENDED_READING_SLUGS = Object.entries(RECOMMENDED_READING)
  .filter(([slug, books]) => Boolean(RELIGION_CONTENT[slug]) && books.length > 0)
  .map(([slug]) => slug)
  .sort();

const GLOSSARY_SLUGS = GLOSSARY_DETAILS.map((entry) => entry.slug).sort();
const BEGINNER_GUIDE_SLUGS = BEGINNER_GUIDE_DETAILS.map((entry) => entry.slug).sort();
const ETIQUETTE_GUIDE_SLUGS = ETIQUETTE_GUIDE_DETAILS.map((entry) => entry.slug).sort();
const SACRED_TEXT_SLUGS = SACRED_TEXT_DETAILS.map((entry) => entry.slug).sort();
const FAQ_SLUGS = FAQ_DETAILS.map((entry) => entry.slug).sort();
const EDUCATOR_RESOURCE_SLUGS = EDUCATOR_RESOURCE_DETAILS.map((entry) => entry.slug).sort();

const POPULAR_COMPARISONS = [
  'christianity-vs-islam',
  'hinduism-vs-buddhism',
  'christianity-vs-judaism',
  'islam-vs-judaism',
  'hinduism-vs-jainism',
  'buddhism-vs-shinto',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const buildDate = new Date();
  const appendEntry = (entry: MetadataRoute.Sitemap[number]) => {
    entries.push(entry);
  };

  for (const page of STATIC_PAGES) {
    const pageConfig = STATIC_PAGE_CONFIG[page] || { changeFrequency: 'weekly', priority: 0.8 };
    appendEntry({
      url: `${siteConfig.url}${page}`,
      lastModified: buildDate,
      changeFrequency: pageConfig.changeFrequency,
      priority: pageConfig.priority,
    });
  }

  for (const slug of RELIGION_SLUGS) {
    appendEntry({
      url: `${siteConfig.url}/religions/${slug}`,
      lastModified: buildDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  }

  for (const comp of POPULAR_COMPARISONS) {
    appendEntry({
      url: `${siteConfig.url}/compare/${comp}`,
      lastModified: buildDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    });
  }

  for (const article of ALL_ARTICLES) {
    appendEntry({
      url: `${siteConfig.url}/articles/${article.slug}`,
      lastModified: new Date(article.publishDate),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  for (const infographic of INFOGRAPHICS) {
    appendEntry({
      url: `${siteConfig.url}/infographics/${infographic.slug}`,
      lastModified: buildDate,
      changeFrequency: 'monthly',
      priority: 0.74,
    });
  }

  for (const slug of RECOMMENDED_READING_SLUGS) {
    appendEntry({
      url: `${siteConfig.url}/recommended-reading/${slug}`,
      lastModified: buildDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    });
  }

  for (const slug of GLOSSARY_SLUGS) {
    appendEntry({
      url: `${siteConfig.url}/glossary/${slug}`,
      lastModified: buildDate,
      changeFrequency: 'monthly',
      priority: 0.72,
    });
  }

  for (const slug of BEGINNER_GUIDE_SLUGS) {
    appendEntry({
      url: `${siteConfig.url}/beginner-guides/${slug}`,
      lastModified: buildDate,
      changeFrequency: 'monthly',
      priority: 0.74,
    });
  }

  for (const slug of ETIQUETTE_GUIDE_SLUGS) {
    appendEntry({
      url: `${siteConfig.url}/etiquette-guides/${slug}`,
      lastModified: buildDate,
      changeFrequency: 'monthly',
      priority: 0.72,
    });
  }

  for (const slug of SACRED_TEXT_SLUGS) {
    appendEntry({
      url: `${siteConfig.url}/sacred-texts/${slug}`,
      lastModified: buildDate,
      changeFrequency: 'monthly',
      priority: 0.74,
    });
  }

  for (const slug of FAQ_SLUGS) {
    appendEntry({
      url: `${siteConfig.url}/faqs/${slug}`,
      lastModified: buildDate,
      changeFrequency: 'monthly',
      priority: 0.71,
    });
  }

  for (const slug of EDUCATOR_RESOURCE_SLUGS) {
    appendEntry({
      url: `${siteConfig.url}/educator-resources/${slug}`,
      lastModified: buildDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  for (const slug of SACRED_PLACE_SLUGS) {
    appendEntry({
      url: `${siteConfig.url}/sacred-places/${slug}`,
      lastModified: buildDate,
      changeFrequency: 'monthly',
      priority: 0.76,
    });
  }

  return Array.from(new Map(entries.map((entry) => [entry.url, entry])).values());
}
