import { AdminArticleForm } from '@/components/admin-article-form';

export const dynamic = 'force-dynamic';

export default function NewArticlePage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">Editorial Workflow</p>
        <h1 className="text-4xl text-stone-900">New Article</h1>
      </div>
      <AdminArticleForm
        mode="create"
        initialValues={{
          title: '',
          slug: '',
          excerpt: '',
          content: '',
          author: 'Renee K.',
          category: 'Beliefs',
          featuredImageUrl: '',
          tags: '',
          status: 'draft',
          publishedDate: new Date().toISOString().slice(0, 10),
        }}
      />
    </div>
  );
}
