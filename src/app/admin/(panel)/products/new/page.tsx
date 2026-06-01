import { AdminProductForm } from '@/components/admin-product-form';

export const dynamic = 'force-dynamic';

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">Sacred Items Catalog</p>
        <h1 className="text-4xl text-stone-900">New Product</h1>
      </div>
      <AdminProductForm
        mode="create"
        initialValues={{
          name: '',
          description: '',
          tradition: 'buddhism',
          priceRange: '',
          amazonAsin: '',
          amazonSearchQuery: '',
          imageUrl: '',
          isEditorsPick: false,
          editorsPickAuthor: '',
          sortOrder: 0,
        }}
      />
    </div>
  );
}
