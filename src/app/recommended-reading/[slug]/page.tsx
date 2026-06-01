import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { AffiliateDisclosure } from '@/components/affiliate-disclosure';
import { BookRecommendationGrid, FeaturedBookCard } from '@/components/commerce-cards';
import { Button } from '@/components/ui/button';
import { generateBreadcrumbJsonLd, generateMetadata as genMeta } from '@/lib/seo';
import { RELIGION_CONTENT } from '@/app/religions/[slug]/content';
import { RECOMMENDED_READING } from '@/app/religions/[slug]/recommended-reading';
import { getBooks } from '@/lib/product-catalog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const religion = RELIGION_CONTENT[slug];
  const books = RECOMMENDED_READING[slug];

  if (!religion || !books?.length) {
    return genMeta({
      title: 'Recommended Reading',
      description: 'Curated religion reading lists.',
      path: '/recommended-reading',
      type: 'website',
    });
  }

  return genMeta({
    title: `${religion.name} Recommended Reading`,
    description: `Curated ${religion.name} reading recommendations including beginner-friendly introductions, major texts, and deeper study options.`,
    path: `/recommended-reading/${slug}`,
    type: 'website',
  });
}

export function generateStaticParams() {
  return Object.entries(RECOMMENDED_READING)
    .filter(([slug, books]) => RELIGION_CONTENT[slug] && books.length > 0)
    .map(([slug]) => ({ slug }));
}

export default async function RecommendedReadingDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const religion = RELIGION_CONTENT[slug];
  const books = await getBooks(slug);

  if (!religion || !books?.length) {
    notFound();
  }

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Recommended Reading', url: '/recommended-reading' },
    { name: religion.name, url: `/recommended-reading/${slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="container py-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li><Link href="/recommended-reading" className="hover:text-foreground transition-colors">Recommended Reading</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li className="text-foreground font-medium" aria-current="page">{religion.name}</li>
          </ol>
        </nav>

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Link href="/recommended-reading" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to all reading lists
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{religion.name} Recommended Reading</h1>
            <p className="text-muted-foreground max-w-3xl">
              These selections are meant to give you a balanced starting point: accessible introductions, respected academic overviews,
              and major texts that matter inside the tradition itself [1][2][3].
            </p>
            <AffiliateDisclosure className="mt-3 max-w-3xl" />
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild size="sm">
                <Link href={`/religions/${slug}`}>Explore {religion.name}</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/beginner-guides">Beginner guides</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/sacred-texts">Sacred texts</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-xl border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{books.length}</span> curated title{books.length === 1 ? '' : 's'}
          </div>
        </div>

        <div className="space-y-6">
          <FeaturedBookCard books={books} />
          <BookRecommendationGrid books={books} religionSlug={slug} religionName={religion.name} />
        </div>

        <section className="mt-10 rounded-xl border bg-muted/30 p-5" aria-labelledby="reading-method-heading">
          <h2 id="reading-method-heading" className="text-xl font-semibold mb-3">How to use this list</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Start with one broad introduction if you are new to the tradition, then add a primary text or more specialized study.
              That sequence usually makes unfamiliar vocabulary and internal debates much easier to understand [1][2].
            </p>
            <p>
              Buying links are provided only as convenient references. Readers can also look for library editions, local bookstores,
              university presses, or alternate translations when they want a more academic or more devotional angle [2][3].
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-muted/30 p-5" aria-labelledby="reading-detail-sources-heading">
          <h2 id="reading-detail-sources-heading" className="text-xl font-semibold mb-3">Sources &amp; Further Reading</h2>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
            <li>Encyclopaedia Britannica entries on {religion.name}, its scriptures, and major historical developments.</li>
            <li>Oxford Reference entries on {religion.name}, comparative religion vocabulary, and canonical texts.</li>
            <li>The curated titles listed above, which include the main introductions and study editions used for this reading pathway.</li>
          </ol>
        </section>
      </div>
    </>
  );
}
