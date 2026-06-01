import { notFound } from 'next/navigation';
import { AdminArticleForm } from '@/components/admin-article-form';
import { getAdminArticleById } from '@/lib/articles';

export const dynamic = 'force-dynamic';

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = await params;
  const article = await getAdminArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">Editorial Workflow</p>
        <h1 className="text-4xl text-stone-900">Edit Article</h1>
      </div>
      <AdminArticleForm
        mode="edit"
        articleId={article.id}
        lastModified={article.updated_at}
        initialValues={{
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          content: article.content,
          author: article.author as 'Renee K.' | 'Maury B.',
          category: article.category as 'Beliefs' | 'Practices' | 'History' | 'Culture' | 'FAQ' | 'Comparison',
          featuredImageUrl: article.featured_image_url || '',
          tags: article.tags || '',
          status: article.status,
          publishedDate: article.published_date || article.created_at.slice(0, 10),
        }}
      />
    </div>
  );
}
