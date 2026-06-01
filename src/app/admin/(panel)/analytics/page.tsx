import { AdminAnalyticsDashboard } from '@/components/admin-analytics-dashboard';
import { getAnalyticsOverview, getDailyPageviews, getTopPages, getTopProducts, type AnalyticsRange } from '@/lib/analytics';

export const dynamic = 'force-dynamic';

interface AdminAnalyticsPageProps {
  searchParams: Promise<{ range?: AnalyticsRange }>;
}

export default async function AdminAnalyticsPage({ searchParams }: AdminAnalyticsPageProps) {
  const { range } = await searchParams;
  const activeRange: AnalyticsRange = range === '7d' || range === '30d' || range === '90d' || range === 'all' ? range : '30d';
  const [overview, topPages, topProducts, dailyPageviews] = await Promise.all([
    getAnalyticsOverview(activeRange),
    getTopPages(activeRange),
    getTopProducts(activeRange),
    getDailyPageviews(activeRange),
  ]);

  return (
    <AdminAnalyticsDashboard
      range={activeRange}
      overview={overview}
      topPages={topPages}
      topProducts={topProducts}
      dailyPageviews={dailyPageviews}
    />
  );
}
