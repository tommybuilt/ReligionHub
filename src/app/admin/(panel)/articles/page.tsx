import Link from 'next/link';
import { AdminArticlesTable } from '@/components/admin-articles-table';
import { Button } from '@/components/ui/button';
import { getAdminArticles } from '@/lib/articles';

export const dynamic = 'force-dynamic';

export default async function AdminArticlesPage() {
  const articles = await getAdminArticles();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">Editorial Workflow</p>
          <h1 className="text-4xl text-stone-900">Articles</h1>
          <p className="mt-2 max-w-3xl text-base leading-relaxed text-stone-600">
            Create, revise, publish, and retire article content while keeping the public archive intact.
          </p>
        </div>
        <Button asChild className="rounded-2xl bg-amber-800 text-amber-50 hover:bg-amber-900">
          <Link href="/admin/articles/new">New Article</Link>
        </Button>
      </div>

      <AdminArticlesTable articles={articles} />
    </div>
  );
}
