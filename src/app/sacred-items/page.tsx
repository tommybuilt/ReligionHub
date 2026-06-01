import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AffiliateDisclosure } from '@/components/affiliate-disclosure';
import { FeaturedSacredItemsHero, SacredItemGrid } from '@/components/commerce-cards';
import { Reveal } from '@/components/reveal';
import { TraditionHeroBanner } from '@/components/tradition-hero-banner';
import { generateBreadcrumbJsonLd, generateMetadata as genMeta } from '@/lib/seo';
import { getAllSacredItems } from '@/lib/product-catalog';
import { getSacredItemTheme } from '@/lib/sacred-item-themes';
import { cn, stripInlineCitations } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<string, never>>;
}): Promise<Metadata> {
  return genMeta({
    title: 'Sacred Items & Gifts',
    description:
      'Curated sacred items and gifts from world religions, with educational context, affiliate disclosure, and rotating featured picks.',
    path: '/sacred-items',
    type: 'website',
  });
}

export default async function SacredItemsPage() {
  const collections = await getAllSacredItems();

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Sacred Items & Gifts', url: '/sacred-items' },
  ]);

  const featuredEntries = collections.flatMap((collection) =>
    collection.items
      .filter((item) => item.featured)
      .map((item) => ({ traditionName: collection.traditionName, traditionSlug: collection.slug, item }))
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="container py-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li className="text-foreground font-medium" aria-current="page">Sacred Items &amp; Gifts</li>
          </ol>
        </nav>

        <Reveal className="mb-10 overflow-hidden rounded-3xl border border-amber-200/70 bg-gradient-to-br from-amber-50/90 via-background to-orange-50/50 px-6 py-8 shadow-sm md:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start">
            <div className="max-w-4xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <Heart className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h1 className="mb-3 text-3xl font-bold md:text-4xl">Sacred Items &amp; Gifts</h1>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                Sacred items are often easiest to misunderstand when they are removed from the communities that use them. This guide introduces devotional tools,
                ritual objects, and symbolic art across major traditions with brief educational framing so readers can see how material culture supports practice,
                memory, reverence, and identity.
              </p>
              <AffiliateDisclosure className="mt-4 max-w-3xl" />
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="sm">
                  <Link href="/recommended-reading">Pair items with reading lists</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/sacred-texts">Browse sacred texts</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/glossary">Review key terms</Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:max-w-sm lg:grid-cols-1 lg:max-w-none">
              <div className="rounded-2xl border border-amber-200/80 bg-white/80 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">Traditions</p>
                <p className="mt-2 text-2xl font-bold text-foreground">{collections.length}</p>
                <p className="mt-1 text-sm text-muted-foreground">Organized by tradition, with context before commerce.</p>
              </div>
              <div className="rounded-2xl border border-amber-200/80 bg-white/80 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">Catalog</p>
                <p className="mt-2 text-2xl font-bold text-foreground">{collections.reduce((total, collection) => total + collection.items.length, 0)}</p>
                <p className="mt-1 text-sm text-muted-foreground">Items spanning devotional tools, symbols, and household practice.</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mb-10" aria-labelledby="featured-sacred-items-heading" delayMs={80}>
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 id="featured-sacred-items-heading" className="mb-2 text-2xl font-bold">Featured Sacred Items</h2>
              <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                These featured picks rotate on each load and highlight items that are commonly recognized within their traditions, while still pointing readers back to the larger educational context.
              </p>
            </div>
            <div className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs text-muted-foreground">
              Rotates on refresh
            </div>
          </div>
          <FeaturedSacredItemsHero entries={featuredEntries} count={4} />
        </Reveal>

        <section className="mb-10 rounded-2xl border bg-muted/30 p-5" aria-labelledby="browse-tradition-heading">
          <h2 id="browse-tradition-heading" className="mb-3 text-xl font-semibold">Browse by Tradition</h2>
          <div className="flex flex-wrap gap-3">
            {collections.map((collection) => {
              const theme = getSacredItemTheme(collection.slug);

              return (
                <Button key={collection.slug} asChild variant="outline" size="sm" className={cn('gap-2 rounded-full', theme.secondaryButtonClassName)}>
                  <Link href={`#${collection.slug}`}>
                    <span aria-hidden="true">{theme.symbol}</span>
                    {collection.traditionName}
                  </Link>
                </Button>
              );
            })}
          </div>
        </section>

        <div className="space-y-10">
          {collections.map((collection, index) => {
            const theme = getSacredItemTheme(collection.slug);

            return (
              <Reveal
                key={collection.slug}
                id={collection.slug}
                aria-labelledby={`${collection.slug}-heading`}
                delayMs={index * 45}
                className={cn('rounded-3xl border px-5 py-6 md:px-6', theme.sectionClassName)}
              >
                <TraditionHeroBanner
                  slug={collection.slug}
                  title={collection.traditionName}
                  subtitle={`Objects, symbols, and household items commonly associated with ${collection.traditionName}.`}
                  className="mb-5"
                />
                <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div className="max-w-3xl">
                    <div className="flex items-center gap-3">
                      <div className={cn('flex h-11 w-11 items-center justify-center rounded-2xl text-xl ring-1', theme.symbolClassName)} aria-hidden="true">
                        {theme.symbol}
                      </div>
                      <div>
                        <p className={cn('text-xs font-semibold uppercase tracking-[0.18em]', theme.eyebrowClassName)}>{collection.items.length} items</p>
                        <h2 id={`${collection.slug}-heading`} className="text-2xl font-bold">{collection.traditionName}</h2>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {stripInlineCitations(collection.intro || `These items are commonly associated with ${collection.traditionName} in devotional, educational, or household settings.`)}
                    </p>
                  </div>
                  <Button asChild variant="outline" size="sm" className={cn('gap-2 self-start sm:self-auto', theme.secondaryButtonClassName)}>
                    <Link href={`/religions/${collection.slug}`}>
                      Explore {collection.traditionName}
                      <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
                <SacredItemGrid items={collection.items} traditionSlug={collection.slug} traditionName={collection.traditionName} />
              </Reveal>
            );
          })}
        </div>

        <section className="mt-10 rounded-xl border bg-muted/30 p-5" aria-labelledby="sacred-items-notes-heading">
          <h2 id="sacred-items-notes-heading" className="text-xl font-semibold mb-3">Selection Notes</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              The goal of this page is educational, not exhaustive. Many living traditions use objects differently across regions, denominations, schools, or levels of observance, so no single product list should be mistaken for a complete portrait of a religion.
            </p>
            <p>
              Some traditions also place less emphasis on commercially available devotional goods. Where that is the case, this guide keeps the catalog modest rather than forcing false equivalence across traditions.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-muted/30 p-5" aria-labelledby="sacred-items-sources-heading">
          <h2 id="sacred-items-sources-heading" className="text-xl font-semibold mb-3">Sources &amp; Further Reading</h2>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
            <li>Encyclopaedia Britannica entries on ritual, symbols, sacred space, and major religious traditions.</li>
            <li>Oxford Reference entries on material religion, devotion, ritual practice, and religious art.</li>
            <li>Curated ReligionCompare reading lists and religion profiles used for contextual framing across traditions.</li>
          </ol>
        </section>
      </div>
    </>
  );
}
