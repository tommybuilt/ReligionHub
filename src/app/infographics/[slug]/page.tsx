import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';
import { generateBreadcrumbJsonLd, generateMetadata as genMeta } from '@/lib/seo';
import { INFOGRAPHICS } from '../data';
import { InfographicVisual } from './infographic-visual';

interface InfographicPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: InfographicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const ig = INFOGRAPHICS.find((i) => i.slug === slug);
  if (!ig) return {};
  return genMeta({
    title: `${ig.title} | Infographics`,
    description: ig.description,
    path: `/infographics/${slug}`,
    type: 'website',
  });
}

export function generateStaticParams() {
  return INFOGRAPHICS.map((ig) => ({ slug: ig.slug }));
}

export default async function InfographicPage({ params }: InfographicPageProps) {
  const { slug } = await params;
  const ig = INFOGRAPHICS.find((i) => i.slug === slug);
  if (!ig) notFound();

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Infographics', url: '/infographics' },
    { name: ig.title, url: `/infographics/${slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="container py-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li><Link href="/infographics" className="hover:text-foreground transition-colors">Infographics</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li className="text-foreground font-medium line-clamp-1" aria-current="page">{ig.title}</li>
          </ol>
        </nav>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{ig.title}</h1>
          <p className="text-muted-foreground mb-8">{ig.description}</p>

          <InfographicVisual slug={slug} />

          <div className="mt-8 pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              <strong>Source:</strong>{' '}
              {ig.sourceUrl ? (
                <a href={ig.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                  {ig.source}
                </a>
              ) : (
                ig.source
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
