import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { generateBreadcrumbJsonLd, generateMetadata as genMeta } from '@/lib/seo';
import { TrendingClient } from './trending-client';

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<string, never>>;
}): Promise<Metadata> {
  return genMeta({
    title: 'Religion in the News, Trending Topics',
    description:
      'Curated trending topics at the intersection of religion and current events, demographics, interfaith dialogue, politics, culture, and human rights. Context-rich, citation-backed.',
    path: '/trending',
    type: 'website',
  });
}

export default function TrendingPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Trending Topics', url: '/trending' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="container py-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li className="text-foreground font-medium" aria-current="page">Trending Topics</li>
          </ol>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Religion in the News</h1>
          <p className="text-muted-foreground max-w-2xl">
            Curated trending topics at the intersection of religion and current events. Each topic includes editorial context, citation-backed facts, and links to deeper content on this site.
          </p>
        </div>

        <TrendingClient />
      </div>
    </>
  );
}
