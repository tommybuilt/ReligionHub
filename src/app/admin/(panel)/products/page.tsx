import Link from 'next/link';
import { AdminProductsTable } from '@/components/admin-products-table';
import { Button } from '@/components/ui/button';
import { getAdminProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">Sacred Items Catalog</p>
          <h1 className="text-4xl text-stone-900">Products</h1>
          <p className="mt-2 max-w-3xl text-base leading-relaxed text-stone-600">
            Manage the sacred-items catalog, tune sorting, and mark editor picks that should surface on the public site.
          </p>
        </div>
        <Button asChild className="rounded-2xl bg-amber-800 text-amber-50 hover:bg-amber-900">
          <Link href="/admin/products/new">New Product</Link>
        </Button>
      </div>

      <AdminProductsTable products={products} />
    </div>
  );
}
