import { dbAll, dbCount, dbRun, getOptionalDb } from '@/lib/db';

export interface AdminSidebarCounts {
  draftArticles: number;
  unreadMessages: number;
}

export interface AdminDashboardStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalProducts: number;
  totalMessages: number;
  unreadMessages: number;
  pageviewsLast30Days: number;
  totalEvents: number;
}

export interface AdminRecentActivityItem {
  id: string;
  type: 'message' | 'article' | 'product';
  label: string;
  createdAt: string;
  href: string;
}

function hasDatabase() {
  return Boolean(getOptionalDb());
}

export async function getAdminSidebarCounts(): Promise<AdminSidebarCounts> {
  if (!hasDatabase()) {
    return {
      draftArticles: 0,
      unreadMessages: 0,
    };
  }

  const [draftArticles, unreadMessages] = await Promise.all([
    dbCount('SELECT COUNT(*) as total FROM articles WHERE status = ?', ['draft']),
    dbCount('SELECT COUNT(*) as total FROM messages WHERE is_read = 0'),
  ]);

  return {
    draftArticles,
    unreadMessages,
  };
}

export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  if (!hasDatabase()) {
    return {
      totalArticles: 0,
      publishedArticles: 0,
      draftArticles: 0,
      totalProducts: 0,
      totalMessages: 0,
      unreadMessages: 0,
      pageviewsLast30Days: 0,
      totalEvents: 0,
    };
  }

  const [
    totalArticles,
    publishedArticles,
    draftArticles,
    totalProducts,
    totalMessages,
    unreadMessages,
    pageviewsLast30Days,
    totalEvents,
  ] = await Promise.all([
    dbCount('SELECT COUNT(*) as total FROM articles'),
    dbCount('SELECT COUNT(*) as total FROM articles WHERE status = ?', ['published']),
    dbCount('SELECT COUNT(*) as total FROM articles WHERE status = ?', ['draft']),
    dbCount('SELECT COUNT(*) as total FROM products'),
    dbCount('SELECT COUNT(*) as total FROM messages'),
    dbCount('SELECT COUNT(*) as total FROM messages WHERE is_read = 0'),
    dbCount(
      `SELECT COUNT(*) as total
       FROM page_events
       WHERE event_type = 'pageview' AND datetime(created_at) >= datetime('now', '-30 days')`
    ),
    dbCount('SELECT COUNT(*) as total FROM page_events'),
  ]);

  return {
    totalArticles,
    publishedArticles,
    draftArticles,
    totalProducts,
    totalMessages,
    unreadMessages,
    pageviewsLast30Days,
    totalEvents,
  };
}

export async function getAdminRecentActivity(): Promise<AdminRecentActivityItem[]> {
  if (!hasDatabase()) {
    return [];
  }

  const rows = await dbAll<AdminRecentActivityItem>(
    `SELECT id, 'message' as type, 'New message from ' || name as label, created_at as createdAt, '/admin/messages' as href
     FROM messages
     UNION ALL
     SELECT id, 'article' as type, 'Article updated: ' || title as label, updated_at as createdAt, '/admin/articles/edit/' || id as href
     FROM articles
     UNION ALL
     SELECT id, 'product' as type, 'Product updated: ' || name as label, updated_at as createdAt, '/admin/products/edit/' || id as href
     FROM products
     ORDER BY createdAt DESC
     LIMIT 10`
  );

  return rows;
}

export async function clearAllAnalyticsData() {
  if (!hasDatabase()) {
    return;
  }

  await dbRun('DELETE FROM page_events');
}

export async function clearAllMessages() {
  if (!hasDatabase()) {
    return;
  }

  await dbRun('DELETE FROM messages');
}
