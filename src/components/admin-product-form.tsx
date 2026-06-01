'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ADMIN_TRADITION_OPTIONS, humanizeTradition } from '@/lib/products';

interface AdminProductFormValues {
  name: string;
  description: string;
  tradition: string;
  priceRange: string;
  amazonAsin: string;
  amazonSearchQuery: string;
  imageUrl: string;
  isEditorsPick: boolean;
  editorsPickAuthor: '' | 'Renee K.' | 'Maury B.';
  sortOrder: number;
}

interface AdminProductFormProps {
  productId?: string;
  initialValues: AdminProductFormValues;
  mode: 'create' | 'edit';
  lastModified?: string;
}

export function AdminProductForm({ productId, initialValues, mode, lastModified }: AdminProductFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<AdminProductFormValues>(initialValues);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  function updateField<K extends keyof AdminProductFormValues>(field: K, value: AdminProductFormValues[K]) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function submit() {
    setError('');
    setIsSaving(true);

    try {
      const response = await fetch(mode === 'create' ? '/api/admin/products' : `/api/admin/products/${productId}`, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const payload = (await response.json().catch(() => ({}))) as { error?: string; id?: string };

      if (!response.ok) {
        setError(payload.error || 'Unable to save product.');
        return;
      }

      router.push(mode === 'create' ? `/admin/products/edit/${payload.id}` : `/admin/products/edit/${productId}`);
      router.refresh();
    } catch {
      setError('Unable to save product right now.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!productId || !window.confirm('Delete this product permanently?')) {
      return;
    }

    const response = await fetch(`/api/admin/products/${productId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      setError('Unable to delete product.');
      return;
    }

    router.push('/admin/products');
    router.refresh();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-5 rounded-[24px] border border-stone-200 bg-[#fffaf2] p-6 shadow-[0_18px_45px_rgba(58,42,26,0.08)]">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="product-name" className="block text-sm font-semibold text-stone-800">Name</label>
            <Input id="product-name" value={values.name} onChange={(event) => updateField('name', event.target.value)} className="h-12 rounded-2xl border-stone-300 bg-white/90" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="product-description" className="block text-sm font-semibold text-stone-800">Description</label>
            <textarea id="product-description" value={values.description} onChange={(event) => updateField('description', event.target.value)} rows={4} className="w-full rounded-2xl border border-stone-300 bg-white/90 px-4 py-3 text-sm text-stone-900 outline-none focus:ring-2 focus:ring-amber-700" />
          </div>
          <div className="space-y-2">
            <label htmlFor="product-tradition" className="block text-sm font-semibold text-stone-800">Tradition</label>
            <select id="product-tradition" value={values.tradition} onChange={(event) => updateField('tradition', event.target.value)} className="h-12 w-full rounded-2xl border border-stone-300 bg-white/90 px-4 text-sm text-stone-900">
              {ADMIN_TRADITION_OPTIONS.map((tradition) => (
                <option key={tradition} value={tradition}>{humanizeTradition(tradition)}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="product-price-range" className="block text-sm font-semibold text-stone-800">Price Range</label>
            <Input id="product-price-range" value={values.priceRange} onChange={(event) => updateField('priceRange', event.target.value)} className="h-12 rounded-2xl border-stone-300 bg-white/90" />
          </div>
          <div className="space-y-2">
            <label htmlFor="product-amazon-asin" className="block text-sm font-semibold text-stone-800">Amazon ASIN</label>
            <Input id="product-amazon-asin" value={values.amazonAsin} onChange={(event) => updateField('amazonAsin', event.target.value.toUpperCase())} maxLength={10} className="h-12 rounded-2xl border-stone-300 bg-white/90" />
          </div>
          <div className="space-y-2">
            <label htmlFor="product-amazon-search" className="block text-sm font-semibold text-stone-800">Amazon Search Query</label>
            <Input id="product-amazon-search" value={values.amazonSearchQuery} onChange={(event) => updateField('amazonSearchQuery', event.target.value)} className="h-12 rounded-2xl border-stone-300 bg-white/90" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="product-image-url" className="block text-sm font-semibold text-stone-800">Image URL</label>
            <Input id="product-image-url" value={values.imageUrl} onChange={(event) => updateField('imageUrl', event.target.value)} className="h-12 rounded-2xl border-stone-300 bg-white/90" />
          </div>
          <div className="space-y-3 md:col-span-2 rounded-[22px] border border-stone-200 bg-white/80 px-4 py-4">
            <label className="flex items-center gap-3 text-sm font-medium text-stone-800">
              <input type="checkbox" checked={values.isEditorsPick} onChange={(event) => updateField('isEditorsPick', event.target.checked)} className="h-4 w-4 rounded border-stone-300 text-amber-700" />
              Editor&apos;s Pick
            </label>
            {values.isEditorsPick ? (
              <div className="space-y-2">
                <label htmlFor="product-editors-pick-author" className="block text-sm font-semibold text-stone-800">Editor&apos;s Pick Author</label>
                <select id="product-editors-pick-author" value={values.editorsPickAuthor} onChange={(event) => updateField('editorsPickAuthor', event.target.value as AdminProductFormValues['editorsPickAuthor'])} className="h-12 w-full rounded-2xl border border-stone-300 bg-white/90 px-4 text-sm text-stone-900">
                  <option value="">Choose an author</option>
                  <option value="Renee K.">Renee K.</option>
                  <option value="Maury B.">Maury B.</option>
                </select>
              </div>
            ) : null}
          </div>
          <div className="space-y-2">
            <label htmlFor="product-sort-order" className="block text-sm font-semibold text-stone-800">Sort Order</label>
            <Input id="product-sort-order" type="number" value={String(values.sortOrder)} onChange={(event) => updateField('sortOrder', Number(event.target.value || 0))} className="h-12 rounded-2xl border-stone-300 bg-white/90" />
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded-[24px] border border-stone-200 bg-[#fffaf2] p-6 shadow-[0_18px_45px_rgba(58,42,26,0.08)]">
          <h2 className="text-2xl text-stone-900">Preview</h2>
          <div className="mt-4 rounded-[22px] border border-stone-200 bg-white/90 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">{humanizeTradition(values.tradition)}</p>
            <h3 className="mt-2 text-2xl text-stone-900">{values.name || 'Untitled product'}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">{values.description || 'Add a short description for this sacred item.'}</p>
            <p className="mt-3 text-xs text-stone-500">{values.priceRange || 'See listing'}</p>
          </div>
        </div>

        <div className="rounded-[24px] border border-stone-200 bg-[#fffaf2] p-6 shadow-[0_18px_45px_rgba(58,42,26,0.08)]">
          <h2 className="text-2xl text-stone-900">Actions</h2>
          <div className="mt-4 space-y-3">
            <Button type="button" onClick={submit} disabled={isSaving} className="h-12 w-full rounded-2xl bg-amber-800 text-amber-50 hover:bg-amber-900">{mode === 'create' ? 'Create Product' : 'Save Changes'}</Button>
            <Button asChild type="button" variant="outline" className="h-12 w-full rounded-2xl border-stone-300 bg-white/80 text-stone-800 hover:bg-stone-100">
              <Link href="/admin/products">Cancel</Link>
            </Button>
            {mode === 'edit' ? (
              <Button type="button" variant="destructive" onClick={handleDelete} className="h-12 w-full rounded-2xl">Delete</Button>
            ) : null}
          </div>
          {error ? <p className="mt-4 text-sm font-medium text-red-700">{error}</p> : null}
          {lastModified ? <p className="mt-4 text-sm text-stone-500">Last modified: {new Date(lastModified).toLocaleString()}</p> : null}
        </div>
      </div>
    </div>
  );
}
