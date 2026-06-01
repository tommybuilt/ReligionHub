import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, BookOpen, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AffiliateDisclosure } from '@/components/affiliate-disclosure';
import { StaffPicksAcrossTraditions, TrendingReadsSection } from '@/components/commerce-cards';
import { TraditionHeroBanner } from '@/components/tradition-hero-banner';
import { generateBreadcrumbJsonLd, generateMetadata as genMeta } from '@/lib/seo';
import { RELIGION_CONTENT } from '@/app/religions/[slug]/content';
import { RECOMMENDED_READING } from '@/app/religions/[slug]/recommended-reading';
import { getSacredItemTheme } from '@/lib/sacred-item-themes';
import { cn } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<string, never>>;
}): Promise<Metadata> {
  return genMeta({
    title: 'Recommended Reading',
    description:
      'Curated, non-polemical reading lists for the world religions covered on ReligionCompare, with beginner-friendly and academic picks.',
    path: '/recommended-reading',
    type: 'website',
  });
}

const readingEntries = Object.entries(RECOMMENDED_READING)
  .filter(([slug, books]) => RELIGION_CONTENT[slug] && books.length > 0)
  .map(([slug, books]) => ({
    slug,
    religion: RELIGION_CONTENT[slug],
    books,
  }))
  .sort((a, b) => a.religion.name.localeCompare(b.religion.name));

export default function RecommendedReadingPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Recommended Reading', url: '/recommended-reading' },
  ]);

  const allBookEntries = readingEntries.flatMap((entry) =>
    entry.books.map((book) => ({ slug: entry.slug, religionName: entry.religion.name, book }))
  );

  const staffPickEntries = readingEntries
    .slice(0, 6)
    .map((entry) => ({ slug: entry.slug, religionName: entry.religion.name, book: entry.books[0] }))
    .filter((entry) => Boolean(entry.book));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="container py-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li className="text-foreground font-medium" aria-current="page">Recommended Reading</li>
          </ol>
        </nav>

        <Reveal className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Recommended Reading</h1>
          <p className="text-muted-foreground max-w-3xl">
            Curated book lists for the religion pages on this site. These picks favor respected introductions, primary texts in readable translations,
            and widely used academic surveys.
          </p>
          <AffiliateDisclosure className="mt-3 max-w-3xl" />
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild size="sm">
              <Link href="/beginner-guides">Start with beginner guides</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/sacred-texts">Browse sacred texts</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/glossary">Review key terms</Link>
            </Button>
          </div>
        </Reveal>

        <Reveal className="mb-10" aria-labelledby="trending-reads-heading">
          <div className="mb-5">
            <h2 id="trending-reads-heading" className="text-2xl font-bold mb-2">Trending Reads</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              These rotating picks surface books that already stand out as Staff Picks, best sellers, or highly rated introductions.
            </p>
          </div>
          <TrendingReadsSection entries={allBookEntries} />
        </Reveal>

        <Reveal className="mb-10" aria-labelledby="staff-picks-heading" delayMs={80}>
          <div className="mb-5">
            <h2 id="staff-picks-heading" className="text-2xl font-bold mb-2">Staff Picks Across Traditions</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              One strong first book can save a beginner hours of confusion. These picks are the clearest starting points across several major traditions.
            </p>
          </div>
          <StaffPicksAcrossTraditions entries={staffPickEntries} />
        </Reveal>

        <section className="mb-10 rounded-2xl border bg-muted/30 p-5" aria-labelledby="browse-tradition-heading">
          <h2 id="browse-tradition-heading" className="mb-3 text-xl font-semibold">Browse by Tradition</h2>
          <p className="mb-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Jump straight to any tradition that already has a curated reading list on the site. This makes it easier to compare introductory books, primary texts, and deeper study paths side by side.
          </p>
          <div className="flex flex-wrap gap-3">
            {readingEntries.map((entry) => {
              const theme = getSacredItemTheme(entry.slug);

              return (
                <Button key={entry.slug} asChild variant="outline" size="sm" className={cn('gap-2 rounded-full', theme.secondaryButtonClassName)}>
                  <Link href={`#tradition-${entry.slug}`}>
                    <span aria-hidden="true">{theme.symbol}</span>
                    {entry.religion.name}
                  </Link>
                </Button>
              );
            })}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {readingEntries.map((entry, index) => (
            <Reveal key={entry.slug} delayMs={index * 35}>
              <Link id={`tradition-${entry.slug}`} href={`/recommended-reading/${entry.slug}`} className="group scroll-mt-24">
                <Card className="h-full transition-all hover:shadow-md hover:border-primary/30">
                  <div className="px-4 pt-4">
                    <TraditionHeroBanner
                      slug={entry.slug}
                      title={entry.religion.name}
                      subtitle={`${entry.books.length} curated title${entry.books.length === 1 ? '' : 's'} for first steps and deeper study.`}
                      compact
                    />
                  </div>
                  <CardHeader>
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {entry.religion.name}
                    </CardTitle>
                    <CardDescription className="leading-relaxed">
                      {entry.books.length} curated title{entry.books.length === 1 ? '' : 's'} spanning introductions, scripture, and deeper study.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {entry.books.slice(0, 3).map((book) => (
                        <li key={book.title} className="line-clamp-2">
                          <span className="font-medium text-foreground">{book.title}</span>
                          <span>{` by ${book.author}`}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" size="sm" className="mt-4 w-full gap-2">
                      View list <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>

        <section className="mt-10 rounded-xl border bg-muted/30 p-5" aria-labelledby="reading-notes-heading">
          <h2 id="reading-notes-heading" className="text-xl font-semibold mb-3">Selection Notes</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Lists balance introductory books, academically respected overviews, and major primary texts in accessible translations.
              They are meant to help beginners go deeper without steering readers toward anti-tradition or polemical material.
            </p>
            <p>
              Where a tradition contains major internal diversity, the lists lean toward broad, reputable surveys first, then more specific texts.
              Readers should still expect real disagreement within living communities.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-muted/30 p-5" aria-labelledby="reading-sources-heading">
          <h2 id="reading-sources-heading" className="text-xl font-semibold mb-3">Sources &amp; Further Reading</h2>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
            <li>Encyclopaedia Britannica entries on major world religions and scriptures for broad historical framing.</li>
            <li>Oxford Reference entries on comparative religion terms, traditions, and canonical texts.</li>
            <li>Academic and teaching editions already represented in the curated reading lists on this page.</li>
          </ol>
        </section>
      </div>
    </>
  );
}
