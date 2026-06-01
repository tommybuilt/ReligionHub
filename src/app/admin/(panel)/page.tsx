import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAdminDashboardStats, getAdminRecentActivity } from '@/lib/admin-data';

export const dynamic = 'force-dynamic';

function formatRelativeStamp(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default async function AdminDashboardPage() {
  const [stats, recentActivity] = await Promise.all([
    getAdminDashboardStats(),
    getAdminRecentActivity(),
  ]);

  const cards = [
    {
      label: 'Articles',
      value: stats.totalArticles,
      detail: `${stats.publishedArticles} published, ${stats.draftArticles} drafts`,
    },
    {
      label: 'Products',
      value: stats.totalProducts,
      detail: 'Sacred items in the catalog',
    },
    {
      label: 'Messages',
      value: stats.totalMessages,
      detail: `${stats.unreadMessages} unread`,
      highlight: stats.unreadMessages > 0,
    },
    {
      label: 'Page Views',
      value: stats.pageviewsLast30Days,
      detail: 'Last 30 days',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">ReligionCompare Admin</p>
          <h1 className="text-4xl text-stone-900">Dashboard</h1>
          <p className="mt-2 max-w-3xl text-base leading-relaxed text-stone-600">
            Review site activity, manage new content, and keep the editorial workflow aligned with the public site’s scholarly style.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild className="rounded-2xl bg-amber-800 text-amber-50 hover:bg-amber-900">
            <Link href="/admin/articles/new">New Article</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-2xl border-stone-300 bg-white/80 text-stone-800 hover:bg-stone-100">
            <Link href="/admin/products/new">New Product</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-2xl border-stone-300 bg-white/80 text-stone-800 hover:bg-stone-100">
            <Link href="/admin/messages">View Messages</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label} className="rounded-[24px] border-stone-200 bg-[#fffaf2] shadow-[0_18px_45px_rgba(58,42,26,0.08)]">
            <CardHeader className="pb-3">
              <CardDescription className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-500">
                {card.label}
              </CardDescription>
              <CardTitle className="text-4xl text-stone-900">{card.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={card.highlight ? 'text-sm font-medium text-orange-700' : 'text-sm text-stone-600'}>{card.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
        <Card className="rounded-[24px] border-stone-200 bg-[#fffaf2] shadow-[0_18px_45px_rgba(58,42,26,0.08)]">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-3xl text-stone-900">Recent Activity</CardTitle>
                <CardDescription className="mt-2 text-stone-600">
                  The newest messages, product updates, and article edits across the admin workspace.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {recentActivity.length ? (
              <div className="space-y-3">
                {recentActivity.map((item) => (
                  <Link
                    key={`${item.type}-${item.id}`}
                    href={item.href}
                    className="flex items-start justify-between gap-4 rounded-2xl border border-stone-200 bg-white/80 px-4 py-4 transition-colors hover:bg-stone-50"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-500">{item.type}</p>
                      <p className="text-base font-medium text-stone-900">{item.label}</p>
                    </div>
                    <span className="shrink-0 text-sm text-stone-500">{formatRelativeStamp(item.createdAt)}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-stone-300 bg-white/70 px-5 py-8 text-sm text-stone-600">
                No activity yet. Once articles, products, or messages are added, they will appear here.
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-[24px] border-stone-200 bg-[#fffaf2] shadow-[0_18px_45px_rgba(58,42,26,0.08)]">
          <CardHeader>
            <CardTitle className="text-3xl text-stone-900">Quick Actions</CardTitle>
            <CardDescription className="mt-2 text-stone-600">
              Jump into the sections that need regular editorial attention.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="h-12 w-full justify-start rounded-2xl bg-amber-800 text-amber-50 hover:bg-amber-900">
              <Link href="/admin/articles/new">Create a new article</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 w-full justify-start rounded-2xl border-stone-300 bg-white/80 text-stone-800 hover:bg-stone-100">
              <Link href="/admin/products/new">Add a sacred item</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 w-full justify-start rounded-2xl border-stone-300 bg-white/80 text-stone-800 hover:bg-stone-100">
              <Link href="/admin/messages">Review contact messages</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
