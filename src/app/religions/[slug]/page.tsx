import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { generateMetadata as genMeta, generateBreadcrumbJsonLd } from '@/lib/seo';
import { AffiliateDisclosure } from '@/components/affiliate-disclosure';
import { BookRecommendationGrid, FeaturedBookCard, RotatingSacredItems } from '@/components/commerce-cards';
import { TraditionHeroBanner } from '@/components/tradition-hero-banner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { getSacredItemTheme } from '@/lib/sacred-item-themes';
import { cn, collapseInlineCitations } from '@/lib/utils';
import { RELIGION_CONTENT } from './content';
import { getBooks, getSacredItems } from '@/lib/product-catalog';

/* SOURCE LOG: /religions/[slug] */
/* Last updated: 2026-02-15 (full content build) */
/* References consulted for fact verification (no text copied):
   - Pew Research Center religion reports and datasets
   - CIA World Factbook demographic data (public domain)
   - Sacred-texts.com public domain scripture translations
   - UNESCO World Heritage Centre site listings
   - Academic consensus from widely published reference works
*/
/* ALL VISIBLE TEXT IS ORIGINAL. */

interface ReligionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ReligionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = RELIGION_CONTENT[slug];
  const name = content?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return genMeta({
    title: name,
    description: `Learn about ${name}, origins, beliefs, practices, sacred texts, demographics, and more. All facts are citation-backed.`,
    path: `/religions/${slug}`,
  });
}

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'beliefs', label: 'Core Beliefs' },
  { key: 'practices', label: 'Practices & Rituals' },
  { key: 'texts', label: 'Sacred Texts' },
  { key: 'demographics', label: 'Demographics' },
  { key: 'timeline', label: 'Timeline' },
  { key: 'denominations', label: 'Denominations' },
  { key: 'holidays', label: 'Holidays' },
  { key: 'leadership', label: 'Leadership' },
  { key: 'symbols', label: 'Symbols' },
  { key: 'key_figures', label: 'Key Figures' },
  { key: 'ethics', label: 'Ethics' },
  { key: 'afterlife', label: 'Afterlife' },
  { key: 'origins', label: 'Origins' },
  { key: 'recommended-reading', label: 'Reading' },
  { key: 'sacred-items', label: 'Sacred Items' },
  { key: 'sources', label: 'Sources' },
] as const;

export default async function ReligionPage({ params }: ReligionPageProps) {
  const { slug } = await params;
  const content = RELIGION_CONTENT[slug];
  if (!content) notFound();

  const books = await getBooks(slug);
  const sacredItems = await getSacredItems(slug);
  const sacredItemTheme = getSacredItemTheme(slug);

  const religionName = content.name;

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Religions', url: '/religions' },
    { name: religionName, url: `/religions/${slug}` },
  ]);

  function renderParagraphs(text: string) {
    return text.split('\n\n').filter(Boolean).map((p, i) => (
      <p key={i} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">{collapseInlineCitations(p.trim())}</p>
    ));
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="container py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li><Link href="/religions" className="hover:text-foreground transition-colors">Religions</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li className="break-words text-foreground font-medium" aria-current="page">{religionName}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <h1 className="break-words text-3xl md:text-4xl font-bold">{religionName}</h1>
            <div className="mt-2">
              <Badge variant="outline">{content.family}</Badge>
            </div>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Factual, citation-backed information about {religionName}. All claims are sourced from reputable publishers.
            </p>
          </div>
          <Button className="w-full md:w-auto" asChild>
            <Link href="/compare">
              Compare with another religion
              <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b mb-8 overflow-x-auto">
          <nav className="flex min-w-max gap-1 -mb-px" aria-label="Religion sections">
            {TABS.map((tab) => (
              <a
                key={tab.key}
                href={`#${tab.key}`}
                className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground border-b-2 border-transparent hover:border-primary/50 transition-colors whitespace-nowrap"
              >
                {tab.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Overview */}
          <section id="overview" aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="text-2xl font-bold mb-4">Overview</h2>
            <Card>
              <CardContent className="pt-6">
                {renderParagraphs(content.overview)}
              </CardContent>
            </Card>
          </section>

          {/* Beliefs */}
          <section id="beliefs" aria-labelledby="beliefs-heading">
            <h2 id="beliefs-heading" className="text-2xl font-bold mb-4">Core Beliefs</h2>
            <Card>
              <CardContent className="pt-6">
                {renderParagraphs(content.beliefs)}
              </CardContent>
            </Card>
          </section>

          <section id="practices" aria-labelledby="practices-heading">
            <h2 id="practices-heading" className="text-2xl font-bold mb-4">Practices &amp; Rituals</h2>
            <Card>
              <CardContent className="pt-6">
                {renderParagraphs(content.practices)}
              </CardContent>
            </Card>
          </section>

          <section id="texts" aria-labelledby="texts-heading">
            <h2 id="texts-heading" className="text-2xl font-bold mb-4">Sacred Texts</h2>
            <Card>
              <CardContent className="pt-6">
                {renderParagraphs(content.texts)}
              </CardContent>
            </Card>
          </section>

          <section id="demographics" aria-labelledby="demographics-heading">
            <h2 id="demographics-heading" className="text-2xl font-bold mb-4">Demographics</h2>
            <Card>
              <CardContent className="pt-6">
                {renderParagraphs(content.demographics)}
              </CardContent>
            </Card>
          </section>

          <section id="timeline" aria-labelledby="timeline-heading">
            <h2 id="timeline-heading" className="text-2xl font-bold mb-4">Timeline</h2>
            <Card>
              <CardContent className="pt-6">
                {renderParagraphs(content.timeline)}
              </CardContent>
            </Card>
          </section>

          {/* Denominations */}
          <section id="denominations" aria-labelledby="denominations-heading">
            <h2 id="denominations-heading" className="text-2xl font-bold mb-4">Denominations</h2>
            <Card>
              <CardContent className="pt-6">
                {renderParagraphs(content.denominations)}
              </CardContent>
            </Card>
          </section>

          <section id="holidays" aria-labelledby="holidays-heading">
            <h2 id="holidays-heading" className="text-2xl font-bold mb-4">Holidays</h2>
            <Card>
              <CardContent className="pt-6">
                {renderParagraphs(content.holidays)}
              </CardContent>
            </Card>
          </section>

          <section id="leadership" aria-labelledby="leadership-heading">
            <h2 id="leadership-heading" className="text-2xl font-bold mb-4">Leadership</h2>
            <Card>
              <CardContent className="pt-6">
                {renderParagraphs(content.leadership)}
              </CardContent>
            </Card>
          </section>

          <section id="symbols" aria-labelledby="symbols-heading">
            <h2 id="symbols-heading" className="text-2xl font-bold mb-4">Symbols</h2>
            <Card>
              <CardContent className="pt-6">
                {renderParagraphs(content.symbols)}
              </CardContent>
            </Card>
          </section>

          <section id="key_figures" aria-labelledby="key-figures-heading">
            <h2 id="key-figures-heading" className="text-2xl font-bold mb-4">Key Figures</h2>
            <Card>
              <CardContent className="pt-6">
                {renderParagraphs(content.keyFigures)}
              </CardContent>
            </Card>
          </section>

          <section id="ethics" aria-labelledby="ethics-heading">
            <h2 id="ethics-heading" className="text-2xl font-bold mb-4">Ethics</h2>
            <Card>
              <CardContent className="pt-6">
                {renderParagraphs(content.ethics)}
              </CardContent>
            </Card>
          </section>

          <section id="afterlife" aria-labelledby="afterlife-heading">
            <h2 id="afterlife-heading" className="text-2xl font-bold mb-4">Afterlife</h2>
            <Card>
              <CardContent className="pt-6">
                {renderParagraphs(content.afterlife)}
              </CardContent>
            </Card>
          </section>

          <section id="origins" aria-labelledby="origins-heading">
            <h2 id="origins-heading" className="text-2xl font-bold mb-4">Origins</h2>
            <Card>
              <CardContent className="pt-6">
                {renderParagraphs(content.origins)}
              </CardContent>
            </Card>
          </section>

          {/* Recommended Reading */}
          {books.length > 0 && (
            <section id="recommended-reading" aria-labelledby="reading-heading">
              <h2 id="reading-heading" className="text-2xl font-bold mb-4">Recommended Reading</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-3">
                    Curated books for deeper exploration, including beginner-friendly introductions, strong study editions, and broader academic overviews.
                  </p>
                  <AffiliateDisclosure className="mb-5" />
                  <div className="space-y-6">
                    <FeaturedBookCard books={books} />
                    <BookRecommendationGrid books={books} religionSlug={slug} religionName={content.name} />
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button asChild size="sm" className="gap-2">
                      <Link href={`/recommended-reading/${slug}`}>
                        View full {content.name} list
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/recommended-reading">Browse all reading lists</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {sacredItems && sacredItems.items.length > 0 ? (
            <section id="sacred-items" aria-labelledby="sacred-items-heading">
              <h2 id="sacred-items-heading" className="text-2xl font-bold mb-4">Sacred Items &amp; Gifts</h2>
              <Card className={cn('overflow-hidden border', sacredItemTheme.sectionClassName)}>
                <CardContent className="pt-6">
                  <TraditionHeroBanner
                    slug={slug}
                    title={content.name}
                    subtitle={`A visual preview of items commonly associated with ${content.name}.`}
                    compact
                    className="mb-5"
                  />
                  <div className="mb-4 flex items-center gap-3">
                    <div className={cn('flex h-10 w-10 items-center justify-center rounded-2xl text-lg ring-1', sacredItemTheme.symbolClassName)} aria-hidden="true">
                      {sacredItemTheme.symbol}
                    </div>
                    <div>
                      <p className={cn('text-xs font-semibold uppercase tracking-[0.18em]', sacredItemTheme.eyebrowClassName)}>Tradition-aware selection</p>
                      <p className="text-sm text-muted-foreground">Preview items commonly associated with {content.name}.</p>
                    </div>
                  </div>
                  <p className="mb-3 text-sm text-muted-foreground">
                    This preview highlights objects commonly associated with {content.name}, including devotional tools, ritual items, and symbolic art used in religious life.
                  </p>
                  <AffiliateDisclosure className="mb-5" />
                  <RotatingSacredItems items={sacredItems.items} count={4} traditionSlug={slug} traditionName={content.name} />
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button asChild size="sm" className="gap-2">
                      <Link href={`/sacred-items#${slug}`}>
                        See all {content.name} items
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/sacred-items">Browse all sacred items</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>
          ) : null}

          {/* Sources */}
          <section id="sources" aria-labelledby="sources-heading">
            <h2 id="sources-heading" className="text-2xl font-bold mb-4">Sources &amp; Further Reading</h2>
            <Card>
              <CardContent className="pt-6">
                <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
                  <li>
                    Pew Research Center, religion reports and data portal.
                    <a href="https://www.pewresearch.org/religion/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
                      https://www.pewresearch.org/religion/
                    </a>
                  </li>
                  <li>
                    Encyclopaedia Britannica, religion reference entries.
                    <a href="https://www.britannica.com/topic/religion" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
                      https://www.britannica.com/topic/religion
                    </a>
                  </li>
                  <li>
                    Oxford Reference, comparative religion resources.
                    <a href="https://www.oxfordreference.com/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
                      https://www.oxfordreference.com/
                    </a>
                  </li>
                  <li>
                    World Religion Database, global religion estimates.
                    <a href="https://www.worldreligiondatabase.org/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
                      https://www.worldreligiondatabase.org/
                    </a>
                  </li>
                  <li>
                    CIA World Factbook, country-level demographic context.
                    <a href="https://www.cia.gov/the-world-factbook/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
                      https://www.cia.gov/the-world-factbook/
                    </a>
                  </li>
                  <li>
                    {content.sourceSix}
                    <a href={content.sourceSixUrl} target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
                      {content.sourceSixUrl}
                    </a>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </>
  );
}
