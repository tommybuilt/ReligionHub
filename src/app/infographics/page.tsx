import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, BarChart3 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { generateBreadcrumbJsonLd, generateMetadata as genMeta } from '@/lib/seo';
import { INFOGRAPHICS } from './data';

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<string, never>>;
}): Promise<Metadata> {
  return genMeta({
    title: 'Infographics, Visual Guides to World Religions',
    description:
      'Data-driven visual guides exploring world religions, populations, timelines, sacred texts, beliefs, and more. All data is citation-backed.',
    path: '/infographics',
    type: 'website',
  });
}

export default function InfographicsPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Infographics', url: '/infographics' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="container py-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li className="text-foreground font-medium" aria-current="page">Infographics</li>
          </ol>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Infographics</h1>
          <p className="text-muted-foreground max-w-2xl">
            Data-driven visual guides exploring the world&apos;s religions. Each infographic is built on citation-backed data and designed for clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INFOGRAPHICS.map((ig) => (
            <Link key={ig.slug} href={`/infographics/${ig.slug}`} className="group">
              <Card className="h-full transition-all hover:shadow-md hover:border-primary/30">
                <CardHeader>
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <BarChart3 className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors leading-snug">
                    {ig.title}
                  </CardTitle>
                  <CardDescription className="leading-relaxed">{ig.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">View Infographic</Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
