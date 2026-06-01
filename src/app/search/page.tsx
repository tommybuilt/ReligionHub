import Link from 'next/link';
import type { Metadata } from 'next';
import { SearchBar } from '@/components/search-bar';
import { SEARCH_TYPE_LABELS, searchIndex } from '@/lib/search-index';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronRight } from 'lucide-react';
 import { generateMetadata as genMeta } from '@/lib/seo';

 export async function generateMetadata({
   params,
 }: {
   params: Promise<Record<string, never>>;
 }): Promise<Metadata> {
   return genMeta({
     title: 'Search',
     description: 'Search sitewide across religions, comparisons, legal pages, guides, and quizzes.',
     path: '/search',
     type: 'website',
   });
 }

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q: rawQ } = await searchParams;
  const q = (rawQ || '').trim();
  const results = q.length >= 2 ? searchIndex(q, 30) : [];

  return (
    <div className="container py-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
          <li className="text-foreground font-medium" aria-current="page">Search</li>
        </ol>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Search Results</h1>
        <p className="text-muted-foreground">
          {q.length >= 2
            ? `Showing results for "${q}"`
            : 'Type at least 2 characters in the search bar to get suggestions and results.'}
        </p>
      </div>

      <div className="mb-8 max-w-3xl">
        <SearchBar
          size="lg"
          defaultValue={q}
          placeholder="Search religions, comparisons, quizzes, articles, sacred places, and more..."
        />
      </div>

      {results.length > 0 && (
        <p className="mb-4 text-sm text-muted-foreground">
          {results.length} result{results.length === 1 ? '' : 's'} found.
        </p>
      )}

      {q.length >= 2 && results.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">No results found</CardTitle>
            <CardDescription>
              Try broader terms like <strong>islam</strong>, <strong>buddhism</strong>, <strong>quiz</strong>, or <strong>editorial policy</strong>.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((r) => (
            <Link key={`${r.type}-${r.href}`} href={r.href} className="group">
              <Card className="h-full transition-all hover:shadow-md hover:border-primary/30">
                <CardHeader>
                  <div className="mb-1 flex items-start justify-between gap-3">
                    <Badge variant="secondary" className="shrink-0">{SEARCH_TYPE_LABELS[r.type]}</Badge>
                    <Search className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                  </div>
                  <CardTitle className="break-words text-lg group-hover:text-primary transition-colors">{r.label}</CardTitle>
                  <CardDescription className="break-words">{r.summary}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
