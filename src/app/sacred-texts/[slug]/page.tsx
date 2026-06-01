import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ExternalLink, ShoppingCart } from 'lucide-react';
import { AffiliateDisclosure } from '@/components/affiliate-disclosure';
import { BookRecommendationGrid } from '@/components/commerce-cards';
import { ResourceDetailPage } from '@/components/resource-detail-page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getBooks } from '@/lib/product-catalog';
import { generateMetadata as genMeta } from '@/lib/seo';
import { SACRED_TEXT_DETAILS } from '@/lib/resource-details/sacred-texts';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = SACRED_TEXT_DETAILS.find((item) => item.slug === slug);

  if (!entry) {
    return { title: 'Sacred Texts', description: 'Introductory guides to major sacred texts.' };
  }

  return genMeta({
    title: entry.title,
    description: entry.description,
    path: `/sacred-texts/${entry.slug}`,
    type: 'website',
  });
}

export function generateStaticParams() {
  return SACRED_TEXT_DETAILS.map((entry) => ({ slug: entry.slug }));
}

export default async function SacredTextDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = SACRED_TEXT_DETAILS.find((item) => item.slug === slug);

  if (!entry) {
    notFound();
  }

  const traditionHref = entry.relatedLinks.find((link) => link.href.startsWith('/religions/'))?.href;
  const traditionSlug = traditionHref?.replace('/religions/', '');
  const books = traditionSlug ? await getBooks(traditionSlug) : [];

  return (
    <ResourceDetailPage hubTitle="Sacred Texts" hubPath="/sacred-texts" entry={entry}>
      <section className="mt-10 rounded-xl border bg-muted/30 p-5" aria-labelledby="get-this-text-heading">
        <div className="mb-4 flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-primary/10 p-2 text-primary">
            <ShoppingCart className="h-4 w-4" aria-hidden="true" />
          </div>
          <div>
            <h2 id="get-this-text-heading" className="text-xl font-semibold">Get This Text</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              These links point to beginner-friendly translations, study editions, or search results for {entry.title}. Search availability can vary by region, so compare edition notes before buying.
            </p>
          </div>
        </div>
        <AffiliateDisclosure className="mb-5" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {entry.editions.map((edition) => (
            <Card key={edition.label} className="flex h-full flex-col overflow-hidden border-border/70 bg-background/80 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base leading-snug">{edition.label}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <p className="flex-1 text-sm text-muted-foreground leading-relaxed">{edition.note}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button asChild size="sm" className="w-full justify-center gap-2 !bg-amber-700 !text-amber-50 shadow-sm hover:!bg-amber-800">
                  <a href={edition.amazonUrl} target="_blank" rel="noopener noreferrer sponsored">
                    View on Amazon
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      {books.length > 0 ? (
        <section className="mt-10 rounded-xl border bg-muted/30 p-5" aria-labelledby="recommended-translations-heading">
          <h2 id="recommended-translations-heading" className="text-xl font-semibold mb-3">Recommended Translations &amp; Study Editions</h2>
          <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
            Beginners usually learn sacred texts more accurately when they pair the text with one readable translation or study edition and one broader introduction to the tradition [1][2][3].
          </p>
          <AffiliateDisclosure className="mb-5" />
          <BookRecommendationGrid books={books.slice(0, 2)} />
        </section>
      ) : null}
    </ResourceDetailPage>
  );
}
