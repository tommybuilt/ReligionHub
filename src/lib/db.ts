import { getCloudflareContext } from '@opennextjs/cloudflare';

export interface RuntimeEnv {
  DB?: D1Database;
  ADMIN_PASSWORD_HASH?: string;
  SESSION_SECRET?: string;
}

export interface AdminArticleRecord {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  featured_image_url: string | null;
  tags: string | null;
  status: 'draft' | 'published';
  published_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminProductRecord {
  id: string;
  name: string;
  description: string | null;
  tradition: string;
  price_range: string | null;
  amazon_asin: string | null;
  amazon_search_query: string | null;
  image_url: string | null;
  is_editors_pick: number;
  editors_pick_author: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface AdminMessageRecord {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  body: string;
  is_read: number;
  created_at: string;
}

export interface PageEventRecord {
  id: number;
  page_path: string;
  event_type: 'pageview' | 'shop_click' | 'outbound_click';
  referrer: string | null;
  ip_hash: string | null;
  created_at: string;
}

export interface AdminSessionRecord {
  id: string;
  expires_at: string;
  created_at: string;
}

export function getRuntimeEnv(): RuntimeEnv {
  try {
    return getCloudflareContext().env as RuntimeEnv;
  } catch {
    return process.env as RuntimeEnv;
  }
}

export function getOptionalDb(): D1Database | undefined {
  return getRuntimeEnv().DB;
}

export function getDb(): D1Database {
  const db = getOptionalDb();

  if (!db) {
    throw new Error('Cloudflare D1 binding `DB` is not configured.');
  }

  return db;
}

export async function dbAll<T>(sql: string, params: unknown[] = []): Promise<T[]> {
  const result = await getDb().prepare(sql).bind(...params).all<T>();
  return (result.results || []) as T[];
}

export async function dbFirst<T>(sql: string, params: unknown[] = []): Promise<T | null> {
  const rows = await dbAll<T>(sql, params);
  return rows[0] || null;
}

export async function dbRun(sql: string, params: unknown[] = []) {
  return getDb().prepare(sql).bind(...params).run();
}

export async function dbBatch(statements: Array<{ sql: string; params?: unknown[] }>) {
  const db = getDb();
  return db.batch(statements.map(({ sql, params = [] }) => db.prepare(sql).bind(...params)));
}

export async function dbCount(sql: string, params: unknown[] = []): Promise<number> {
  const row = await dbFirst<Record<string, number | string | null>>(sql, params);

  if (!row) {
    return 0;
  }

  const value = Object.values(row)[0];
  return Number(value || 0);
}
