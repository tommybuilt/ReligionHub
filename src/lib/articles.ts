import type { z } from 'zod';
import { ALL_ARTICLES, type Article } from '@/app/articles/content';
import { type AdminArticleRecord, dbAll, dbFirst, dbRun, getOptionalDb } from '@/lib/db';
import { generateHexId } from '@/lib/security';
import { formatDate } from '@/lib/utils';
import { adminArticleSchema } from '@/lib/validation';

export type AdminArticleInput = z.infer<typeof adminArticleSchema>;

function countWords(content: string) {
  return content
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_`>[\]()]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

export function estimateArticleReadTime(content: string) {
  const words = countWords(content);
  const minutes = Math.max(1, Math.ceil(words / 225));
  return `${minutes} min read`;
}

function normalizePublishedDate(record: AdminArticleRecord) {
  return record.published_date || record.created_at.slice(0, 10);
}

export function adminRecordToArticle(record: AdminArticleRecord): Article {
  const publishDate = normalizePublishedDate(record);

  return {
    slug: record.slug,
    title: record.title,
    author: record.author as Article['author'],
    publishDate,
    displayDate: formatDate(publishDate),
    category: record.category as Article['category'],
    readTime: estimateArticleReadTime(record.content),
    excerpt: record.excerpt,
    relatedSlugs: [],
    relatedReligions: [],
    relatedComparisons: [],
    content: record.content,
    sources: [],
  };
}

export async function getAdminArticles(status?: 'draft' | 'published'): Promise<AdminArticleRecord[]> {
  if (!getOptionalDb()) {
    return [];
  }

  try {
    if (status) {
      return await dbAll<AdminArticleRecord>(
        `SELECT *
         FROM articles
         WHERE status = ?
         ORDER BY datetime(updated_at) DESC, datetime(created_at) DESC`,
        [status]
      );
    }

    return await dbAll<AdminArticleRecord>(
      `SELECT *
       FROM articles
       ORDER BY datetime(updated_at) DESC, datetime(created_at) DESC`
    );
  } catch {
    return [];
  }
}

export async function getAdminArticleById(id: string): Promise<AdminArticleRecord | null> {
  if (!getOptionalDb()) {
    return null;
  }

  try {
    return await dbFirst<AdminArticleRecord>('SELECT * FROM articles WHERE id = ?', [id]);
  } catch {
    return null;
  }
}

export async function getAdminArticleBySlug(slug: string): Promise<AdminArticleRecord | null> {
  if (!getOptionalDb()) {
    return null;
  }

  try {
    return await dbFirst<AdminArticleRecord>('SELECT * FROM articles WHERE slug = ?', [slug]);
  } catch {
    return null;
  }
}

export async function createAdminArticle(input: AdminArticleInput) {
  const id = generateHexId(8);

  await dbRun(
    `INSERT INTO articles (
      id, title, slug, excerpt, content, author, category, featured_image_url, tags, status, published_date, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
    [
      id,
      input.title,
      input.slug,
      input.excerpt,
      input.content,
      input.author,
      input.category,
      input.featuredImageUrl || null,
      input.tags || null,
      input.status,
      input.publishedDate,
    ]
  );

  const article = await getAdminArticleById(id);

  if (!article) {
    throw new Error('Unable to load the saved article.');
  }

  return article;
}

export async function updateAdminArticle(id: string, input: AdminArticleInput) {
  await dbRun(
    `UPDATE articles
     SET title = ?, slug = ?, excerpt = ?, content = ?, author = ?, category = ?, featured_image_url = ?, tags = ?, status = ?, published_date = ?, updated_at = datetime('now')
     WHERE id = ?`,
    [
      input.title,
      input.slug,
      input.excerpt,
      input.content,
      input.author,
      input.category,
      input.featuredImageUrl || null,
      input.tags || null,
      input.status,
      input.publishedDate,
      id,
    ]
  );

  const article = await getAdminArticleById(id);

  if (!article) {
    throw new Error('Unable to load the saved article.');
  }

  return article;
}

export async function deleteAdminArticle(id: string) {
  await dbRun('DELETE FROM articles WHERE id = ?', [id]);
}

export async function toggleAdminArticleStatus(id: string) {
  const current = await getAdminArticleById(id);

  if (!current) {
    throw new Error('Article not found.');
  }

  const nextStatus = current.status === 'published' ? 'draft' : 'published';
  const publishedDate = current.published_date || new Date().toISOString().slice(0, 10);

  await dbRun(
    `UPDATE articles
     SET status = ?, published_date = ?, updated_at = datetime('now')
     WHERE id = ?`,
    [nextStatus, publishedDate, id]
  );

  return getAdminArticleById(id);
}

export async function getPublishedDbArticles(): Promise<Article[]> {
  const records = await getAdminArticles('published');
  return records.map(adminRecordToArticle);
}

export async function getAllPublicArticles(): Promise<Article[]> {
  const dynamicArticles = await getPublishedDbArticles();
  const bySlug = new Map<string, Article>();

  for (const article of dynamicArticles) {
    bySlug.set(article.slug, article);
  }

  for (const article of ALL_ARTICLES) {
    if (!bySlug.has(article.slug)) {
      bySlug.set(article.slug, article);
    }
  }

  return Array.from(bySlug.values()).sort(
    (left, right) => new Date(right.publishDate).getTime() - new Date(left.publishDate).getTime()
  );
}

export async function getPublicArticleBySlug(slug: string): Promise<Article | null> {
  const dynamicArticle = await getAdminArticleBySlug(slug);

  if (dynamicArticle && dynamicArticle.status === 'published') {
    return adminRecordToArticle(dynamicArticle);
  }

  return ALL_ARTICLES.find((article) => article.slug === slug) || null;
}
