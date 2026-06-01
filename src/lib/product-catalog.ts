import { RECOMMENDED_READING, type BookRecommendation } from '@/app/religions/[slug]/recommended-reading';
import { SACRED_ITEMS, type ProductBadge, type SacredItemCollection, type SacredItemEntry } from '@/lib/sacred-items';
import { buildAmazonAffiliateUrl, extractAmazonProductId, isValidAmazonProductId } from '@/lib/affiliate-links';
import { getMergedSacredItemCollection } from '@/lib/products';

interface KvLike {
  get(key: string): Promise<string | null>;
}

interface ProductCatalogRecord<T> {
  lastUpdated?: string;
  items: T[];
}

const VALID_PRODUCT_BADGES: ProductBadge[] = ['Staff Pick', 'Best Seller', 'Top Rated', 'New'];

function normalizeSacredItemBadges(badges?: string[]): ProductBadge[] {
  return (badges || []).filter((badge): badge is ProductBadge => VALID_PRODUCT_BADGES.includes(badge as ProductBadge));
}

function normalizeBook(book: BookRecommendation): BookRecommendation {
  const amazonProductId = book.amazonProductId || extractAmazonProductId(book.amazonUrl) || '';

  return {
    ...book,
    amazonProductId,
    amazonUrl: buildAmazonAffiliateUrl(amazonProductId),
  };
}

function normalizeSacredItem(item: SacredItemEntry): SacredItemEntry {
  const rawAmazonProductId = item.amazonProductId || '';
  const amazonProductId = isValidAmazonProductId(rawAmazonProductId)
    ? rawAmazonProductId.trim().toUpperCase()
    : '';

  return {
    ...item,
    amazonProductId,
    amazonUrl: item.amazonUrl?.trim() || '',
    amazonSearchQuery: item.amazonSearchQuery?.trim() || '',
    badges: normalizeSacredItemBadges(item.badges),
  };
}

function getOptionalCatalogKv(): KvLike | undefined {
  const scope = globalThis as typeof globalThis & { PRODUCT_CATALOG?: KvLike };
  return scope.PRODUCT_CATALOG;
}

async function readCatalogRecord<T>(key: string): Promise<ProductCatalogRecord<T> | null> {
  const kv = getOptionalCatalogKv();

  if (!kv) {
    return null;
  }

  try {
    const raw = await kv.get(key);

    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as ProductCatalogRecord<T>;
  } catch {
    return null;
  }
}

export async function getBooks(religionSlug: string): Promise<BookRecommendation[]> {
  const kvRecord = await readCatalogRecord<BookRecommendation>(`books:${religionSlug}`);
  const books = kvRecord?.items?.length ? kvRecord.items : RECOMMENDED_READING[religionSlug] || [];
  return books.map(normalizeBook);
}

export async function getSacredItems(religionSlug: string): Promise<SacredItemCollection | null> {
  const staticCollection = await getMergedSacredItemCollection(religionSlug);
  const amazonRecord = await readCatalogRecord<SacredItemEntry>(`items:${religionSlug}`);

  if (!staticCollection) {
    return null;
  }

  const refreshedItems = amazonRecord?.items || [];

  if (!refreshedItems.length) {
    return {
      ...staticCollection,
      items: staticCollection.items.map(normalizeSacredItem),
    };
  }

  const byId = new Map(refreshedItems.map((item) => [item.id, item]));

  return {
    ...staticCollection,
    items: staticCollection.items.map((item) => {
      const refreshed = byId.get(item.id);
      if (!refreshed) {
        return normalizeSacredItem(item);
      }

      return normalizeSacredItem({
        ...normalizeSacredItem(item),
        ...refreshed,
        description: item.description,
        badges: Array.from(new Set([...normalizeSacredItemBadges(item.badges), ...normalizeSacredItemBadges(refreshed.badges)])),
      });
    }),
  };
}

export async function getAllSacredItems(): Promise<SacredItemCollection[]> {
  const collections = await Promise.all(Object.keys(SACRED_ITEMS).map((slug) => getSacredItems(slug)));
  return collections.filter((collection): collection is SacredItemCollection => Boolean(collection));
}
