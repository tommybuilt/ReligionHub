'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { AdminArticleRecord } from '@/lib/db';

interface AdminArticlesTableProps {
  articles: AdminArticleRecord[];
}

type SortKey = 'title' | 'author' | 'category' | 'published_date' | 'status';

type StatusFilter = 'all' | 'published' | 'draft';

export function AdminArticlesTable({ articles }: AdminArticlesTableProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortKey, setSortKey] = useState<SortKey>('published_date');
  const [sortAsc, setSortAsc] = useState(false);
  const [page, setPage] = useState(1);

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = articles.filter((article) => {
      const matchesQuery = !normalizedQuery || article.title.toLowerCase().includes(normalizedQuery);
      const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
      return matchesQuery && matchesStatus;
    });

    return filtered.sort((left, right) => {
      const leftValue = left[sortKey] || '';
      const rightValue = right[sortKey] || '';
      const comparison = String(leftValue).localeCompare(String(rightValue));
      return sortAsc ? comparison : comparison * -1;
    });
  }, [articles, query, sortAsc, sortKey, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / 25));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filteredArticles.slice((currentPage - 1) * 25, currentPage * 25);

  function handleSort(nextKey: SortKey) {
    setPage(1);

    if (sortKey === nextKey) {
      setSortAsc((current) => !current);
      return;
    }

    setSortKey(nextKey);
    setSortAsc(false);
  }

  async function handleToggleStatus(id: string) {
    await fetch(`/api/admin/articles/${id}/toggle-status`, {
      method: 'POST',
    });
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Delete this article permanently?')) {
      return;
    }

    await fetch(`/api/admin/articles/${id}`, {
      method: 'DELETE',
    });
    router.refresh();
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
          placeholder="Search by title"
          className="h-12 max-w-xl rounded-2xl border-stone-300 bg-white/90"
        />
        <div className="flex flex-wrap gap-2">
          {(['all', 'published', 'draft'] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => {
                setStatusFilter(filter);
                setPage(1);
              }}
              className={statusFilter === filter
                ? 'rounded-full bg-amber-800 px-4 py-2 text-sm font-semibold text-amber-50'
                : 'rounded-full bg-stone-100 px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-200'}
            >
              {filter === 'all' ? 'All' : filter === 'published' ? 'Published' : 'Draft'}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[24px] border border-stone-200 bg-[#fffaf2] shadow-[0_18px_45px_rgba(58,42,26,0.08)]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-stone-200 text-left">
            <thead className="bg-stone-50/80 text-sm font-semibold text-stone-700">
              <tr>
                {[
                  ['title', 'Title'],
                  ['author', 'Author'],
                  ['category', 'Category'],
                  ['published_date', 'Published Date'],
                  ['status', 'Status'],
                ].map(([key, label]) => (
                  <th key={key} className="px-5 py-4">
                    <button type="button" onClick={() => handleSort(key as SortKey)} className="inline-flex items-center gap-2">
                      <span>{label}</span>
                      <span className="text-xs text-stone-400">{sortKey === key ? (sortAsc ? '↑' : '↓') : '↕'}</span>
                    </button>
                  </th>
                ))}
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 bg-white/80 text-sm text-stone-700">
              {pageItems.map((article) => (
                <tr key={article.id}>
                  <td className="px-5 py-4 font-medium text-stone-900">{article.title}</td>
                  <td className="px-5 py-4">{article.author}</td>
                  <td className="px-5 py-4">{article.category}</td>
                  <td className="px-5 py-4">{article.published_date || article.created_at.slice(0, 10)}</td>
                  <td className="px-5 py-4">
                    <span className={article.status === 'published'
                      ? 'rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800'
                      : 'rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800'}>
                      {article.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Button asChild size="sm" variant="outline" className="rounded-xl border-stone-300 bg-white/80 text-stone-800 hover:bg-stone-100">
                        <Link href={`/admin/articles/edit/${article.id}`}>✏️ Edit</Link>
                      </Button>
                      <Button type="button" size="sm" variant="outline" onClick={() => handleToggleStatus(article.id)} className="rounded-xl border-stone-300 bg-white/80 text-stone-800 hover:bg-stone-100">
                        🔁 Toggle Status
                      </Button>
                      <Button type="button" size="sm" variant="outline" onClick={() => handleDelete(article.id)} className="rounded-xl border-stone-300 bg-white/80 text-stone-800 hover:bg-stone-100">
                        🗑 Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-stone-600">Page {currentPage} of {totalPages}</p>
        <div className="flex gap-2">
          <Button type="button" variant="outline" disabled={currentPage === 1} onClick={() => setPage((current) => Math.max(1, current - 1))} className="rounded-xl border-stone-300 bg-white/80 text-stone-800 hover:bg-stone-100">Previous</Button>
          <Button type="button" variant="outline" disabled={currentPage === totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))} className="rounded-xl border-stone-300 bg-white/80 text-stone-800 hover:bg-stone-100">Next</Button>
        </div>
      </div>
    </div>
  );
}
