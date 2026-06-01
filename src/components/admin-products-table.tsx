'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import type { AdminProductRecord } from '@/lib/db';
import { ADMIN_TRADITION_OPTIONS, humanizeTradition } from '@/lib/products';

interface AdminProductsTableProps {
  products: AdminProductRecord[];
}

export function AdminProductsTable({ products }: AdminProductsTableProps) {
  const router = useRouter();
  const [traditionFilter, setTraditionFilter] = useState('all');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => traditionFilter === 'all' || product.tradition === traditionFilter);
  }, [products, traditionFilter]);

  async function handleDelete(id: string) {
    if (!window.confirm('Delete this product permanently?')) {
      return;
    }

    await fetch(`/api/admin/products/${id}`, {
      method: 'DELETE',
    });

    router.refresh();
  }

  async function handleTogglePick(id: string) {
    await fetch(`/api/admin/products/${id}/toggle-pick`, {
      method: 'POST',
    });

    router.refresh();
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <label htmlFor="product-tradition-filter" className="text-sm font-semibold text-stone-800">Tradition</label>
          <select
            id="product-tradition-filter"
            value={traditionFilter}
            onChange={(event) => setTraditionFilter(event.target.value)}
            className="h-12 rounded-2xl border border-stone-300 bg-white/90 px-4 text-sm text-stone-900"
          >
            <option value="all">All traditions</option>
            {ADMIN_TRADITION_OPTIONS.map((tradition) => (
              <option key={tradition} value={tradition}>{humanizeTradition(tradition)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-[24px] border border-stone-200 bg-[#fffaf2] shadow-[0_18px_45px_rgba(58,42,26,0.08)]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
            <thead className="bg-stone-50/80 font-semibold text-stone-700">
              <tr>
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Tradition</th>
                <th className="px-5 py-4">Price Range</th>
                <th className="px-5 py-4">Amazon Status</th>
                <th className="px-5 py-4">Editor&apos;s Pick</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 bg-white/80 text-stone-700">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t border-stone-200/70 align-top text-sm text-stone-700">
                  <td className="px-5 py-4 font-medium text-stone-900">{product.name}</td>
                  <td className="px-5 py-4">{humanizeTradition(product.tradition)}</td>
                  <td className="px-5 py-4">{product.price_range || 'See listing'}</td>
                  <td className="px-5 py-4">{product.amazon_asin ? 'ASIN' : product.amazon_search_query ? 'Search only' : 'Missing'}</td>
                  <td className="px-5 py-4">{product.is_editors_pick ? <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">Editor&apos;s Pick</span> : 'None'}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Button asChild size="sm" variant="outline" className="rounded-xl border-stone-300 bg-white/80 text-stone-800 hover:bg-stone-100">
                        <Link href={`/admin/products/edit/${product.id}`}>✏️ Edit</Link>
                      </Button>
                      <Button type="button" size="sm" variant="outline" onClick={() => handleTogglePick(product.id)} className="rounded-xl border-stone-300 bg-white/80 text-stone-800 hover:bg-stone-100">
                        ⭐ Toggle Pick
                      </Button>
                      <Button type="button" size="sm" variant="outline" onClick={() => handleDelete(product.id)} className="rounded-xl border-stone-300 bg-white/80 text-stone-800 hover:bg-stone-100">
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
    </div>
  );
}
