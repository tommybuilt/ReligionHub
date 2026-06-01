import { notFound } from 'next/navigation';
import { AdminProductForm } from '@/components/admin-product-form';
import { getAdminProductById } from '@/lib/products';

export const dynamic = 'force-dynamic';

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await getAdminProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">Sacred Items Catalog</p>
        <h1 className="text-4xl text-stone-900">Edit Product</h1>
      </div>
      <AdminProductForm
        mode="edit"
        productId={product.id}
        lastModified={product.updated_at}
        initialValues={{
          name: product.name,
          description: product.description || '',
          tradition: product.tradition,
          priceRange: product.price_range || '',
          amazonAsin: product.amazon_asin || '',
          amazonSearchQuery: product.amazon_search_query || '',
          imageUrl: product.image_url || '',
          isEditorsPick: Boolean(product.is_editors_pick),
          editorsPickAuthor: (product.editors_pick_author as '' | 'Renee K.' | 'Maury B.') || '',
          sortOrder: product.sort_order,
        }}
      />
    </div>
  );
}
