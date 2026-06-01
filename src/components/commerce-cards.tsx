'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProductBadge } from '@/components/product-badge';
import type { BookRecommendation } from '@/app/religions/[slug]/recommended-reading';
import { buildAmazonAffiliateUrl, buildAmazonSearchUrl } from '@/lib/affiliate-links';
import { getSacredItemTheme } from '@/lib/sacred-item-themes';
import type { SacredItemEntry } from '@/lib/sacred-items';
import { getTraditionVisual } from '@/lib/tradition-visuals';
import { cn, stripInlineCitations } from '@/lib/utils';

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function prioritizeStaffPick<T extends { badges?: string[] }>(items: T[]): T[] {
  const staffPick = items.find((item) => item.badges?.includes('Staff Pick'));
  const shuffled = shuffleArray(items);

  if (!staffPick) {
    return shuffled;
  }

  return [staffPick, ...shuffled.filter((item) => item !== staffPick)];
}

function getBookCommerceLinks(book: BookRecommendation) {
  return {
    amazonUrl: book.amazonUrl.trim(),
  };
}

function getSacredItemCommerceLinks(item: SacredItemEntry) {
  const explicitAmazonUrl = item.amazonUrl?.trim() || '';
  const directAmazonUrl = explicitAmazonUrl || buildAmazonAffiliateUrl(item.amazonProductId || '');
  const amazonUrl = directAmazonUrl || buildAmazonSearchUrl(item.amazonSearchQuery || item.name);

  return {
    amazonUrl,
    amazonLabel: directAmazonUrl && !directAmazonUrl.includes('/s?') ? 'Buy on Amazon' : 'Search Amazon',
  };
}

interface SacredItemCardProps {
  item: SacredItemEntry;
  traditionSlug?: string;
  traditionName?: string;
  footerHref?: string;
  footerLabel?: string;
  featured?: boolean;
}

function SacredItemCard({
  item,
  traditionSlug,
  traditionName,
  footerHref,
  footerLabel,
  featured = false,
}: SacredItemCardProps) {
  const theme = getSacredItemTheme(traditionSlug);
  const visual = getTraditionVisual(traditionSlug);
  const { amazonUrl, amazonLabel } = getSacredItemCommerceLinks(item);

  return (
    <Card
      className={cn(
        'group flex h-full flex-col overflow-hidden border transition-all duration-300 hover:-translate-y-1',
        theme.cardClassName,
        featured ? 'lg:min-h-[320px]' : ''
      )}
    >
      <div className={cn('h-1.5 w-full', visual.accentBarClassName)} aria-hidden="true" />
      <CardHeader className="space-y-4 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <div
              aria-hidden="true"
              className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xl ring-1', theme.symbolClassName)}
            >
              {theme.symbol}
            </div>
            <div className="min-w-0 space-y-2">
              {traditionName ? (
                <p className={cn('text-xs font-semibold uppercase tracking-[0.18em]', theme.eyebrowClassName)}>{traditionName}</p>
              ) : null}
              <CardTitle className={cn('leading-snug', featured ? 'text-xl' : 'text-lg')}>{item.name}</CardTitle>
              <div className="flex flex-wrap items-center gap-2">
                <CardDescription className={cn('inline-flex rounded-full border px-2.5 py-1 text-xs font-medium', theme.pricePillClassName)}>
                  {item.priceRange}
                </CardDescription>
                {item.firstSeen ? <span className="text-[11px] text-muted-foreground">Added {item.firstSeen}</span> : null}
              </div>
            </div>
          </div>
          {(item.badges || []).length ? (
            <div className="flex max-w-[40%] flex-wrap justify-end gap-2">
              {(item.badges || []).map((badge) => (
                <ProductBadge key={badge} badge={badge} />
              ))}
            </div>
          ) : null}
        </div>
        <div className={cn('rounded-2xl border px-3 py-3 text-sm leading-relaxed', theme.noteClassName)}>{stripInlineCitations(item.description)}</div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col gap-4 pt-0">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          {amazonUrl ? (
            <Button asChild size="sm" className={cn('w-full gap-2 sm:w-auto', theme.primaryButtonClassName)}>
              <a href={amazonUrl} target="_blank" rel="noreferrer">
                {amazonLabel}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          ) : null}
        </div>
        {footerHref && footerLabel ? (
          <Button asChild variant="ghost" size="sm" className="w-full justify-between px-0 text-sm sm:w-auto">
            <Link href={footerHref}>
              {footerLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}

interface FeaturedBookCardProps {
  books: BookRecommendation[];
}

export function FeaturedBookCard({ books }: FeaturedBookCardProps) {
  const [featuredBook, setFeaturedBook] = useState<BookRecommendation | null>(books[0] || null);

  useEffect(() => {
    const pool = shuffleArray(books);
    setFeaturedBook(pool[0] || null);
  }, [books]);

  if (!featuredBook) {
    return null;
  }

  const { amazonUrl } = getBookCommerceLinks(featuredBook);

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-amber-50/70 via-background to-background">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            {featuredBook.badges.map((badge) => (
              <ProductBadge key={badge} badge={badge} />
            ))}
          </div>
        </div>
        <CardTitle className="text-xl">{featuredBook.title}</CardTitle>
        <CardDescription>{featuredBook.author}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">{stripInlineCitations(featuredBook.description)}</p>
        <p className="rounded-lg border bg-background/70 px-3 py-2 text-sm text-muted-foreground leading-relaxed">
          <span className="font-medium text-foreground">Why we recommend this:</span> {stripInlineCitations(featuredBook.featuredNote)}
        </p>
        <div className="flex flex-wrap gap-3">
          {amazonUrl ? (
            <Button asChild size="sm" className="gap-2">
              <a href={amazonUrl} target="_blank" rel="noreferrer">
                Buy on Amazon
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

interface BookRecommendationGridProps {
  books: BookRecommendation[];
  religionSlug?: string;
  religionName?: string;
}

export function BookRecommendationGrid({ books, religionSlug, religionName }: BookRecommendationGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {books.map((book, index) => {
        const { amazonUrl } = getBookCommerceLinks(book);

        return (
          <Card key={`${book.title}-${index}`} className="h-full">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div className="flex flex-wrap justify-end gap-2">
                  {book.badges.map((badge) => (
                    <ProductBadge key={badge} badge={badge} />
                  ))}
                  <span className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground">{book.level}</span>
                </div>
              </div>
              <CardTitle className="text-xl leading-snug mt-3">{book.title}</CardTitle>
              <CardDescription>{book.author}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{stripInlineCitations(book.description)}</p>
              {book.badges.includes('Staff Pick') ? (
                <p className="rounded-lg border bg-muted/30 px-3 py-2 text-sm text-muted-foreground leading-relaxed">
                  <span className="font-medium text-foreground">Why we recommend this:</span> {stripInlineCitations(book.featuredNote)}
                </p>
              ) : null}
              <div className="flex flex-wrap gap-3">
                {amazonUrl ? (
                  <Button asChild size="sm" className="gap-2">
                    <a href={amazonUrl} target="_blank" rel="noreferrer">
                      Buy on Amazon
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                ) : null}
                {religionSlug && religionName ? (
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/religions/${religionSlug}`}>Explore {religionName}</Link>
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

interface TrendingReadsSectionProps {
  entries: { slug: string; religionName: string; book: BookRecommendation }[];
}

export function TrendingReadsSection({ entries }: TrendingReadsSectionProps) {
  const [visibleEntries, setVisibleEntries] = useState(entries.slice(0, 6));

  useEffect(() => {
    const prioritized = shuffleArray(entries).sort((left, right) => {
      const leftPriority = Number(left.book.badges.includes('Best Seller') || left.book.badges.includes('Top Rated'));
      const rightPriority = Number(right.book.badges.includes('Best Seller') || right.book.badges.includes('Top Rated'));
      return rightPriority - leftPriority;
    });
    setVisibleEntries(prioritized.slice(0, 6));
  }, [entries]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {visibleEntries.map((entry) => {
        const { amazonUrl } = getBookCommerceLinks(entry.book);

        return (
          <Card key={`${entry.slug}-${entry.book.title}`} className="h-full">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-lg leading-snug">{entry.book.title}</CardTitle>
                  <CardDescription>{entry.book.author}</CardDescription>
                </div>
                <div className="flex flex-wrap justify-end gap-2">
                  {entry.book.badges.map((badge) => (
                    <ProductBadge key={badge} badge={badge} />
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{entry.religionName}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{stripInlineCitations(entry.book.description)}</p>
              <div className="flex flex-wrap gap-3">
                {amazonUrl ? (
                  <Button asChild size="sm" className="gap-2">
                    <a href={amazonUrl} target="_blank" rel="noreferrer">
                      Amazon
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                ) : null}
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/recommended-reading/${entry.slug}`}>View list</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

interface StaffPicksAcrossTraditionsProps {
  entries: { slug: string; religionName: string; book: BookRecommendation }[];
}

export function StaffPicksAcrossTraditions({ entries }: StaffPicksAcrossTraditionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {entries.map((entry) => {
        const { amazonUrl } = getBookCommerceLinks(entry.book);

        return (
          <Card key={`${entry.slug}-${entry.book.title}`} className="h-full">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-lg leading-snug">{entry.book.title}</CardTitle>
                  <CardDescription>{entry.book.author}</CardDescription>
                </div>
                <ProductBadge badge="Staff Pick" />
              </div>
              <p className="text-xs text-muted-foreground">{entry.religionName}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{stripInlineCitations(entry.book.featuredNote)}</p>
              <div className="flex flex-wrap gap-3">
                {amazonUrl ? (
                  <Button asChild size="sm" className="gap-2">
                    <a href={amazonUrl} target="_blank" rel="noreferrer">
                      Amazon
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

interface FeaturedSacredItemsHeroProps {
  entries: { traditionName: string; traditionSlug: string; item: SacredItemEntry }[];
  count?: number;
}

export function FeaturedSacredItemsHero({ entries, count = 4 }: FeaturedSacredItemsHeroProps) {
  const [visibleEntries, setVisibleEntries] = useState(entries.slice(0, count));

  useEffect(() => {
    setVisibleEntries(shuffleArray(entries).slice(0, count));
  }, [count, entries]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {visibleEntries.map((entry) => {
        return (
          <SacredItemCard
            key={`${entry.traditionSlug}-${entry.item.id}`}
            item={entry.item}
            traditionSlug={entry.traditionSlug}
            traditionName={entry.traditionName}
            footerHref={`/sacred-items#${entry.traditionSlug}`}
            footerLabel={`More from ${entry.traditionName}`}
            featured
          />
        );
      })}
    </div>
  );
}

interface RotatingSacredItemsProps {
  items: SacredItemEntry[];
  count: number;
  traditionSlug?: string;
  traditionName?: string;
}

interface SacredItemGridProps {
  items: SacredItemEntry[];
  traditionSlug?: string;
  traditionName?: string;
}

export function SacredItemGrid({ items, traditionSlug, traditionName }: SacredItemGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {items.map((item) => {
        return (
          <SacredItemCard
            key={item.id}
            item={item}
            traditionSlug={traditionSlug}
            traditionName={traditionName}
          />
        );
      })}
    </div>
  );
}

export function RotatingSacredItems({ items, count, traditionSlug, traditionName }: RotatingSacredItemsProps) {
  const [visibleItems, setVisibleItems] = useState(items.slice(0, count));

  useEffect(() => {
    const prioritized = prioritizeStaffPick(items);
    setVisibleItems(prioritized.slice(0, count));
  }, [count, items]);

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {visibleItems.map((item) => {
        return (
        <SacredItemCard
          key={item.id}
          item={item}
          traditionSlug={traditionSlug}
          traditionName={traditionName}
        />
        );
      })}
    </div>
  );
}

export function useRandomizedSacredItems(items: SacredItemEntry[]) {
  return useMemo(() => prioritizeStaffPick(items), [items]);
}
