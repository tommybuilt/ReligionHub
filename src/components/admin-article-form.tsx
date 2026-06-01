'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { slugify } from '@/lib/utils';

interface AdminArticleFormValues {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: 'Renee K.' | 'Maury B.';
  category: 'Beliefs' | 'Practices' | 'History' | 'Culture' | 'FAQ' | 'Comparison';
  featuredImageUrl: string;
  tags: string;
  status: 'draft' | 'published';
  publishedDate: string;
}

interface AdminArticleFormProps {
  articleId?: string;
  initialValues: AdminArticleFormValues;
  mode: 'create' | 'edit';
  lastModified?: string;
}

const AUTHORS = ['Renee K.', 'Maury B.'] as const;
const CATEGORIES = ['Beliefs', 'Practices', 'History', 'Culture', 'FAQ', 'Comparison'] as const;

export function AdminArticleForm({ articleId, initialValues, mode, lastModified }: AdminArticleFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<AdminArticleFormValues>(initialValues);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const liveHref = values.status === 'published' ? `/articles/${values.slug}` : '';

  const imagePreview = useMemo(() => values.featuredImageUrl.trim(), [values.featuredImageUrl]);

  function updateField<K extends keyof AdminArticleFormValues>(field: K, value: AdminArticleFormValues[K]) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function submit(status: 'draft' | 'published') {
    setIsSaving(true);
    setError('');

    try {
      const response = await fetch(mode === 'create' ? '/api/admin/articles' : `/api/admin/articles/${articleId}`, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          slug: slugify(values.slug || values.title),
          status,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as { error?: string; id?: string };

      if (!response.ok) {
        setError(payload.error || 'Unable to save article.');
        return;
      }

      router.push(mode === 'create' ? `/admin/articles/edit/${payload.id}` : `/admin/articles/edit/${articleId}`);
      router.refresh();
    } catch {
      setError('Unable to save article right now.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!articleId || !window.confirm('Delete this article permanently?')) {
      return;
    }

    const response = await fetch(`/api/admin/articles/${articleId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      setError('Unable to delete article.');
      return;
    }

    router.push('/admin/articles');
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5 rounded-[24px] border border-stone-200 bg-[#fffaf2] p-6 shadow-[0_18px_45px_rgba(58,42,26,0.08)]">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="article-title" className="block text-sm font-semibold text-stone-800">Title</label>
              <Input
                id="article-title"
                value={values.title}
                onChange={(event) => updateField('title', event.target.value)}
                onBlur={() => {
                  if (!values.slug.trim()) {
                    updateField('slug', slugify(values.title));
                  }
                }}
                className="h-12 rounded-2xl border-stone-300 bg-white/90"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="article-slug" className="block text-sm font-semibold text-stone-800">Slug</label>
              <Input
                id="article-slug"
                value={values.slug}
                onChange={(event) => updateField('slug', slugify(event.target.value))}
                className="h-12 rounded-2xl border-stone-300 bg-white/90"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="article-excerpt" className="block text-sm font-semibold text-stone-800">Excerpt</label>
              <textarea
                id="article-excerpt"
                value={values.excerpt}
                onChange={(event) => updateField('excerpt', event.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-stone-300 bg-white/90 px-4 py-3 text-sm text-stone-900 outline-none ring-offset-background focus:ring-2 focus:ring-amber-700"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="article-content" className="block text-sm font-semibold text-stone-800">Content</label>
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-stone-500">Supports HTML and markdown</span>
              </div>
              <textarea
                id="article-content"
                value={values.content}
                onChange={(event) => updateField('content', event.target.value)}
                rows={18}
                className="min-h-[400px] w-full rounded-2xl border border-stone-300 bg-white/90 px-4 py-3 text-sm text-stone-900 outline-none ring-offset-background focus:ring-2 focus:ring-amber-700"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="article-author" className="block text-sm font-semibold text-stone-800">Author</label>
              <select
                id="article-author"
                value={values.author}
                onChange={(event) => updateField('author', event.target.value as AdminArticleFormValues['author'])}
                className="h-12 w-full rounded-2xl border border-stone-300 bg-white/90 px-4 text-sm text-stone-900"
              >
                {AUTHORS.map((author) => (
                  <option key={author} value={author}>{author}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="article-category" className="block text-sm font-semibold text-stone-800">Category</label>
              <select
                id="article-category"
                value={values.category}
                onChange={(event) => updateField('category', event.target.value as AdminArticleFormValues['category'])}
                className="h-12 w-full rounded-2xl border border-stone-300 bg-white/90 px-4 text-sm text-stone-900"
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="article-featured-image" className="block text-sm font-semibold text-stone-800">Featured Image URL</label>
              <Input
                id="article-featured-image"
                value={values.featuredImageUrl}
                onChange={(event) => updateField('featuredImageUrl', event.target.value)}
                className="h-12 rounded-2xl border-stone-300 bg-white/90"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="article-tags" className="block text-sm font-semibold text-stone-800">Tags</label>
              <Input
                id="article-tags"
                value={values.tags}
                onChange={(event) => updateField('tags', event.target.value)}
                className="h-12 rounded-2xl border-stone-300 bg-white/90"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="article-status" className="block text-sm font-semibold text-stone-800">Status</label>
              <select
                id="article-status"
                value={values.status}
                onChange={(event) => updateField('status', event.target.value as AdminArticleFormValues['status'])}
                className="h-12 w-full rounded-2xl border border-stone-300 bg-white/90 px-4 text-sm text-stone-900"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="article-published-date" className="block text-sm font-semibold text-stone-800">Published Date</label>
              <Input
                id="article-published-date"
                type="date"
                value={values.publishedDate}
                onChange={(event) => updateField('publishedDate', event.target.value)}
                className="h-12 rounded-2xl border-stone-300 bg-white/90"
              />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[24px] border border-stone-200 bg-[#fffaf2] p-6 shadow-[0_18px_45px_rgba(58,42,26,0.08)]">
            <h2 className="text-2xl text-stone-900">Preview</h2>
            <p className="mt-2 text-sm text-stone-600">Check the article card summary and the featured image preview before saving.</p>
            <div className="mt-4 rounded-[22px] border border-stone-200 bg-white/90 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">{values.category}</p>
              <h3 className="mt-2 text-2xl text-stone-900">{values.title || 'Untitled article'}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{values.excerpt || 'Add an excerpt to see the summary here.'}</p>
              <p className="mt-3 text-xs text-stone-500">By {values.author}</p>
            </div>
            {imagePreview ? (
              <div className="mt-4 overflow-hidden rounded-[22px] border border-stone-200 bg-white/90">
                <div
                  aria-label="Featured article preview"
                  className="h-44 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${imagePreview})` }}
                />
              </div>
            ) : null}
          </div>

          <div className="rounded-[24px] border border-stone-200 bg-[#fffaf2] p-6 shadow-[0_18px_45px_rgba(58,42,26,0.08)]">
            <h2 className="text-2xl text-stone-900">Actions</h2>
            <div className="mt-4 space-y-3">
              <Button type="button" onClick={() => submit('draft')} disabled={isSaving} className="h-12 w-full rounded-2xl bg-stone-800 text-stone-50 hover:bg-stone-900">Save as Draft</Button>
              <Button type="button" onClick={() => submit('published')} disabled={isSaving} className="h-12 w-full rounded-2xl bg-amber-800 text-amber-50 hover:bg-amber-900">Publish</Button>
              <Button asChild type="button" variant="outline" className="h-12 w-full rounded-2xl border-stone-300 bg-white/80 text-stone-800 hover:bg-stone-100">
                <Link href="/admin/articles">Cancel</Link>
              </Button>
              {liveHref ? (
                <Button asChild type="button" variant="outline" className="h-12 w-full rounded-2xl border-stone-300 bg-white/80 text-stone-800 hover:bg-stone-100">
                  <Link href={liveHref} target="_blank">View Live</Link>
                </Button>
              ) : null}
              {mode === 'edit' ? (
                <Button type="button" variant="destructive" onClick={handleDelete} className="h-12 w-full rounded-2xl">Delete</Button>
              ) : null}
            </div>
            {error ? <p className="mt-4 text-sm font-medium text-red-700">{error}</p> : null}
            {lastModified ? <p className="mt-4 text-sm text-stone-500">Last modified: {new Date(lastModified).toLocaleString()}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
