import Link from 'next/link';
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Calendar, Clock, User } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { generateBreadcrumbJsonLd, generateMetadata as genMeta } from '@/lib/seo';
import { getAllPublicArticles } from '@/lib/articles';
import { ArticleFilters } from './article-filters';

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<string, never>>;
}): Promise<Metadata> {
  return genMeta({
    title: 'Articles, Exploring World Religions',
    description:
      'In-depth, citation-backed articles on world religions, beliefs, practices, history, culture, and frequently asked questions. Written by subject-matter researchers.',
    path: '/articles',
    type: 'website',
  });
}

const ARTICLES_PER_PAGE = 10;

interface ArticlesPageProps {
  searchParams: Promise<{ category?: string; page?: string }>;
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const { category, page } = await searchParams;
  const allArticles = await getAllPublicArticles();
  const categories: string[] = Array.from(new Set(allArticles.map((article) => article.category))).sort();
  const currentPage = Math.max(1, parseInt(page || '1', 10) || 1);
  const activeCategory = category && categories.includes(category)
    ? category
    : undefined;

  const filtered = activeCategory
    ? allArticles.filter((article) => article.category === activeCategory)
    : allArticles;

  const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE);
  const safePage = Math.min(currentPage, totalPages || 1);
  const paged = filtered.slice((safePage - 1) * ARTICLES_PER_PAGE, safePage * ARTICLES_PER_PAGE);

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Articles', url: '/articles' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="container py-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li className="text-foreground font-medium" aria-current="page">Articles</li>
          </ol>
        </nav>

        <Reveal className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Articles, Exploring World Religions</h1>
          <p className="text-muted-foreground max-w-2xl">
            In-depth, citation-backed articles on beliefs, practices, history, and culture across the world&apos;s religious traditions.
          </p>
        </Reveal>

        <ArticleFilters
          categories={categories}
          activeCategory={activeCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {paged.map((article, index) => (
            <Reveal key={article.slug} delayMs={index * 45}>
              <Link href={`/articles/${article.slug}`} className="group">
                <Card className="h-full transition-all hover:shadow-md hover:border-primary/30">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="text-xs">{article.category}</Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors leading-snug">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="leading-relaxed mt-1">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" aria-hidden="true" />
                        {article.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" aria-hidden="true" />
                        {article.displayDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        {article.readTime}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>

        {paged.length === 0 && (
          <p className="text-muted-foreground text-center py-12">No articles found for this category.</p>
        )}

        {totalPages > 1 && (
          <Reveal delayMs={120}>
            <nav aria-label="Article pagination" className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              const params = new URLSearchParams();
              if (activeCategory) params.set('category', activeCategory);
              if (p > 1) params.set('page', String(p));
              const href = params.toString() ? `/articles?${params.toString()}` : '/articles';
              return (
                <Link
                  key={p}
                  href={href}
                  className={`inline-flex items-center justify-center h-9 w-9 rounded-md text-sm font-medium transition-colors ${
                    p === safePage
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border hover:bg-muted'
                  }`}
                  aria-current={p === safePage ? 'page' : undefined}
                >
                  {p}
                </Link>
              );
            })}
            </nav>
          </Reveal>
        )}
      </div>
    </>
  );
}
