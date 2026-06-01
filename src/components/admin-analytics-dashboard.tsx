import Link from 'next/link';
import { getAnalyticsRangeLabel, type AnalyticsDailyPoint, type AnalyticsOverview, type AnalyticsRange, type AnalyticsTopPage, type AnalyticsTopProduct } from '@/lib/analytics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminAnalyticsDashboardProps {
  range: AnalyticsRange;
  overview: AnalyticsOverview;
  topPages: AnalyticsTopPage[];
  topProducts: AnalyticsTopProduct[];
  dailyPageviews: AnalyticsDailyPoint[];
}

export function AdminAnalyticsDashboard({ range, overview, topPages, topProducts, dailyPageviews }: AdminAnalyticsDashboardProps) {
  const maxViews = Math.max(...dailyPageviews.map((point) => point.views), 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">Traffic Signals</p>
          <h1 className="text-4xl text-stone-900">Analytics</h1>
          <p className="mt-2 max-w-3xl text-base leading-relaxed text-stone-600">Review pageviews, shop clicks, and simple traffic patterns collected directly from the site.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(['7d', '30d', '90d', 'all'] as const).map((value) => (
            <Link
              key={value}
              href={`/admin/analytics?range=${value}`}
              className={range === value
                ? 'rounded-full bg-amber-800 px-4 py-2 text-sm font-semibold text-amber-50'
                : 'rounded-full bg-stone-100 px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-200'}
            >
              {getAnalyticsRangeLabel(value)}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Pageviews', value: overview.pageviews },
          { label: 'Shop Clicks', value: overview.shopClicks },
          { label: 'Unique Visitors', value: overview.uniqueVisitors },
          { label: 'CTR', value: `${overview.clickThroughRate}%` },
        ].map((card) => (
          <Card key={card.label} className="rounded-[24px] border-stone-200 bg-[#fffaf2] shadow-[0_18px_45px_rgba(58,42,26,0.08)]">
            <CardHeader className="pb-3">
              <CardDescription className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-500">{card.label}</CardDescription>
              <CardTitle className="text-4xl text-stone-900">{card.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="rounded-[24px] border-stone-200 bg-[#fffaf2] shadow-[0_18px_45px_rgba(58,42,26,0.08)]">
          <CardHeader>
            <CardTitle className="text-3xl text-stone-900">Top Pages</CardTitle>
            <CardDescription className="mt-2 text-stone-600">Top 25 pages by pageviews in the selected period.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {topPages.length ? topPages.map((page) => (
              <div key={page.pagePath} className="grid grid-cols-[minmax(0,1fr)_72px_88px] items-center gap-3 rounded-[22px] border border-stone-200 bg-white/80 px-4 py-3 text-sm">
                <span className="truncate font-medium text-stone-900">{page.pagePath}</span>
                <span className="text-right text-stone-700">{page.views}</span>
                <span className="text-right text-stone-500">{page.shopClicks} clicks</span>
              </div>
            )) : <p className="text-sm text-stone-600">No pageview data yet.</p>}
          </CardContent>
        </Card>

        <Card className="rounded-[24px] border-stone-200 bg-[#fffaf2] shadow-[0_18px_45px_rgba(58,42,26,0.08)]">
          <CardHeader>
            <CardTitle className="text-3xl text-stone-900">Top Products Clicked</CardTitle>
            <CardDescription className="mt-2 text-stone-600">Top 25 outbound Amazon destinations from the selected period.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {topProducts.length ? topProducts.map((product) => (
              <div key={product.referrer} className="grid grid-cols-[minmax(0,1fr)_72px] items-center gap-3 rounded-[22px] border border-stone-200 bg-white/80 px-4 py-3 text-sm">
                <span className="truncate font-medium text-stone-900">{product.referrer}</span>
                <span className="text-right text-stone-700">{product.clicks}</span>
              </div>
            )) : <p className="text-sm text-stone-600">No shop-click data yet.</p>}
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-[24px] border-stone-200 bg-[#fffaf2] shadow-[0_18px_45px_rgba(58,42,26,0.08)]">
        <CardHeader>
          <CardTitle className="text-3xl text-stone-900">Pageviews Over Time</CardTitle>
          <CardDescription className="mt-2 text-stone-600">A simple daily bar view for the selected period.</CardDescription>
        </CardHeader>
        <CardContent>
          {dailyPageviews.length ? (
            <div className="space-y-3">
              {dailyPageviews.map((point) => (
                <div key={point.day} className="grid grid-cols-[84px_minmax(0,1fr)_56px] items-center gap-3 text-sm">
                  <span className="text-stone-600">{point.day}</span>
                  <div className="h-3 rounded-full bg-stone-200">
                    <div className="h-3 rounded-full bg-amber-700" style={{ width: `${Math.max(6, (point.views / maxViews) * 100)}%` }} />
                  </div>
                  <span className="text-right text-stone-700">{point.views}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-stone-600">No analytics chart data yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
