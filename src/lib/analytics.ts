import { dbAll, dbCount, dbFirst, dbRun, getOptionalDb } from '@/lib/db';
import { dateBucket, hashRequestIp, hourBucket } from '@/lib/security';

export type AnalyticsRange = '7d' | '30d' | '90d' | 'all';

interface TrackEventInput {
  page_path: string;
  event_type: 'pageview' | 'shop_click' | 'outbound_click';
  referrer?: string;
}

export interface AnalyticsOverview {
  pageviews: number;
  shopClicks: number;
  uniqueVisitors: number;
  clickThroughRate: number;
}

export interface AnalyticsTopPage {
  pagePath: string;
  views: number;
  shopClicks: number;
}

export interface AnalyticsTopProduct {
  referrer: string;
  clicks: number;
}

export interface AnalyticsDailyPoint {
  day: string;
  views: number;
}

function getRangeClause(range: AnalyticsRange) {
  if (range === 'all') {
    return {
      clause: '',
      params: [] as unknown[],
    };
  }

  const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;

  return {
    clause: "WHERE datetime(created_at) >= datetime('now', ?)",
    params: [`-${days} days`],
  };
}

export async function recordTrackEvent(input: TrackEventInput, request: Request) {
  if (!getOptionalDb()) {
    return;
  }

  const hourKey = hourBucket().replace('T', ' ');
  const ipHash = await hashRequestIp(request, `track:${hourKey}`);

  const existing = await dbFirst<{ total: number }>(
    `SELECT COUNT(*) as total
     FROM page_events
     WHERE page_path = ?
       AND event_type = ?
       AND ifnull(referrer, '') = ifnull(?, '')
       AND ip_hash = ?
       AND substr(created_at, 1, 13) = ?`,
    [input.page_path, input.event_type, input.referrer || '', ipHash, hourKey]
  ).catch(() => null);

  if (Number(existing?.total || 0) > 0) {
    return;
  }

  await dbRun(
    `INSERT INTO page_events (page_path, event_type, referrer, ip_hash)
     VALUES (?, ?, ?, ?)`,
    [input.page_path, input.event_type, input.referrer || null, ipHash]
  );
}

export async function getAnalyticsOverview(range: AnalyticsRange): Promise<AnalyticsOverview> {
  if (!getOptionalDb()) {
    return { pageviews: 0, shopClicks: 0, uniqueVisitors: 0, clickThroughRate: 0 };
  }

  const { clause, params } = getRangeClause(range);
  const pageviews = await dbCount(`SELECT COUNT(*) as total FROM page_events ${clause} ${clause ? "AND event_type = 'pageview'" : "WHERE event_type = 'pageview'"}`, params);
  const shopClicks = await dbCount(`SELECT COUNT(*) as total FROM page_events ${clause} ${clause ? "AND event_type = 'shop_click'" : "WHERE event_type = 'shop_click'"}`, params);
  const uniqueRow = await dbFirst<{ total: number }>(
    `SELECT COUNT(DISTINCT ip_hash) as total
     FROM page_events
     ${clause}`,
    params
  ).catch(() => null);
  const uniqueVisitors = Number(uniqueRow?.total || 0);

  return {
    pageviews,
    shopClicks,
    uniqueVisitors,
    clickThroughRate: pageviews > 0 ? Number(((shopClicks / pageviews) * 100).toFixed(1)) : 0,
  };
}

export async function getTopPages(range: AnalyticsRange): Promise<AnalyticsTopPage[]> {
  if (!getOptionalDb()) {
    return [];
  }

  const { clause, params } = getRangeClause(range);

  return dbAll<AnalyticsTopPage>(
    `SELECT
       page_path as pagePath,
       SUM(CASE WHEN event_type = 'pageview' THEN 1 ELSE 0 END) as views,
       SUM(CASE WHEN event_type = 'shop_click' THEN 1 ELSE 0 END) as shopClicks
     FROM page_events
     ${clause}
     GROUP BY page_path
     ORDER BY views DESC, shopClicks DESC
     LIMIT 25`,
    params
  ).catch(() => []);
}

export async function getTopProducts(range: AnalyticsRange): Promise<AnalyticsTopProduct[]> {
  if (!getOptionalDb()) {
    return [];
  }

  const { clause, params } = getRangeClause(range);
  const fullClause = clause ? `${clause} AND event_type = 'shop_click' AND referrer IS NOT NULL` : "WHERE event_type = 'shop_click' AND referrer IS NOT NULL";

  return dbAll<AnalyticsTopProduct>(
    `SELECT referrer, COUNT(*) as clicks
     FROM page_events
     ${fullClause}
     GROUP BY referrer
     ORDER BY clicks DESC
     LIMIT 25`,
    params
  ).catch(() => []);
}

export async function getDailyPageviews(range: AnalyticsRange): Promise<AnalyticsDailyPoint[]> {
  if (!getOptionalDb()) {
    return [];
  }

  const { clause, params } = getRangeClause(range);
  const fullClause = clause ? `${clause} AND event_type = 'pageview'` : "WHERE event_type = 'pageview'";

  return dbAll<AnalyticsDailyPoint>(
    `SELECT substr(created_at, 1, 10) as day, COUNT(*) as views
     FROM page_events
     ${fullClause}
     GROUP BY substr(created_at, 1, 10)
     ORDER BY day ASC`,
    params
  ).catch(() => []);
}

export function getAnalyticsRangeLabel(range: AnalyticsRange) {
  switch (range) {
    case '7d':
      return 'Last 7 days';
    case '30d':
      return 'Last 30 days';
    case '90d':
      return 'Last 90 days';
    default:
      return 'All time';
  }
}

export function formatChartDay(value: string) {
  if (!value) {
    return dateBucket();
  }

  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}
