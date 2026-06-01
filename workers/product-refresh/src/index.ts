interface Env {
  PRODUCT_CATALOG: KVNamespace;
  REFRESH_SECRET?: string;
  BOOKS_SOURCE_URL?: string;
  SACRED_ITEMS_SOURCE_URL?: string;
  UPSTREAM_TOKEN?: string;
}

interface CatalogRecord<T> {
  lastUpdated: string;
  items: T[];
}

type CatalogMap<T> = Record<string, T[]>;

interface BookCatalogItem {
  title: string;
  author: string;
  description: string;
  amazonUrl: string;
  amazonProductId: string;
  badges?: string[];
  featuredNote?: string;
  level?: 'Introductory' | 'Primary Text' | 'Academic';
}

interface SacredItemCatalogItem {
  id: string;
  name?: string;
  description?: string;
  priceRange?: string;
  amazonProductId?: string;
  badges?: string[];
  firstSeen?: string;
  featured?: boolean;
}

const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
};

const AMAZON_AFFILIATE_TAG = 'religioncompa-20';
const AMAZON_PRODUCT_ID_REGEX = /^[A-Z0-9]{10}$/;
const PLACEHOLDER_MARKER_REGEX = /(placeholder|fake|dummy|sample|todo|test)/i;
const SUSPICIOUS_AMAZON_MARKER_REGEX = /(?:BUDDHA|HINDU|ISLAM|CHRIST|JUDA|SIKH|SHIN|JAIN|ZORO|BAHAI|CONF|TAO)/i;

function extractAmazonProductId(url: string): string | null {
  const match = url.match(/\/dp\/([A-Z0-9]{9,10})/i);
  return match?.[1]?.toUpperCase() ?? null;
}

function isValidAmazonProductId(productId: string): boolean {
  const normalized = productId.trim().toUpperCase();
  return (
    AMAZON_PRODUCT_ID_REGEX.test(normalized) &&
    !PLACEHOLDER_MARKER_REGEX.test(normalized) &&
    !SUSPICIOUS_AMAZON_MARKER_REGEX.test(normalized)
  );
}

function buildAmazonAffiliateUrl(productId: string): string {
  const normalized = productId.trim().toUpperCase();
  return isValidAmazonProductId(normalized)
    ? `https://www.amazon.com/dp/${normalized}?tag=${AMAZON_AFFILIATE_TAG}`
    : '';
}

function normalizeBookCatalogMap(catalog: CatalogMap<BookCatalogItem>): CatalogMap<BookCatalogItem> {
  return Object.fromEntries(
    Object.entries(catalog).map(([slug, items]) => [
      slug,
      items.map((item) => {
        const amazonProductId = item.amazonProductId || extractAmazonProductId(item.amazonUrl) || '';

        return {
          ...item,
          amazonProductId,
          amazonUrl: buildAmazonAffiliateUrl(amazonProductId),
        };
      }),
    ])
  );
}

function normalizeSacredItemCatalogMap(catalog: CatalogMap<SacredItemCatalogItem>): CatalogMap<SacredItemCatalogItem> {
  return Object.fromEntries(
    Object.entries(catalog).map(([slug, items]) => [
      slug,
      items.map((item) => {
        const amazonProductId = item.amazonProductId?.trim().toUpperCase() ?? '';

        return {
          ...item,
          amazonProductId: isValidAmazonProductId(amazonProductId) ? amazonProductId : '',
        };
      }),
    ])
  );
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'GET' && url.pathname === '/health') {
      return jsonResponse({
        ok: true,
        service: 'product-refresh',
        sources: {
          books: Boolean(env.BOOKS_SOURCE_URL),
          sacredItems: Boolean(env.SACRED_ITEMS_SOURCE_URL),
        },
      });
    }

    if (request.method === 'POST' && url.pathname === '/refresh') {
      if (!isAuthorized(request, env)) {
        return jsonResponse({ ok: false, error: 'Unauthorized' }, 401);
      }

      const body = await safeJson<Record<string, unknown>>(request);
      const result = await refreshCatalog(env, {
        books: normalizeCatalogMap<BookCatalogItem>(body?.books),
        sacredItems: normalizeCatalogMap<SacredItemCatalogItem>(body?.sacredItems),
        dryRun: body?.dryRun === true,
      });

      return jsonResponse({ ok: true, ...result });
    }

    return jsonResponse({ ok: false, error: 'Not found' }, 404);
  },

  async scheduled(_controller: ScheduledController, env: Env): Promise<void> {
    await refreshCatalog(env, { dryRun: false });
  },
};

async function refreshCatalog(
  env: Env,
  input: {
    books?: CatalogMap<BookCatalogItem>;
    sacredItems?: CatalogMap<SacredItemCatalogItem>;
    dryRun?: boolean;
  }
) {
  const timestamp = new Date().toISOString();
  const books = normalizeBookCatalogMap(input.books || await fetchCatalogMap<BookCatalogItem>(env.BOOKS_SOURCE_URL, env));
  const sacredItems = normalizeSacredItemCatalogMap(input.sacredItems || await fetchCatalogMap<SacredItemCatalogItem>(env.SACRED_ITEMS_SOURCE_URL, env));

  const writes = {
    books: countCatalogItems(books),
    sacredItems: countCatalogItems(sacredItems),
  };

  if (!input.dryRun) {
    await Promise.all([
      writeCatalogMap(env.PRODUCT_CATALOG, 'books', books, timestamp),
      writeCatalogMap(env.PRODUCT_CATALOG, 'items', sacredItems, timestamp),
      env.PRODUCT_CATALOG.put('catalog:meta', JSON.stringify({ lastUpdated: timestamp, writes })),
    ]);
  }

  return {
    lastUpdated: timestamp,
    dryRun: Boolean(input.dryRun),
    writes,
    notes: [
      'This worker expects normalized JSON payloads or upstream JSON feeds.',
      'Point BOOKS_SOURCE_URL and SACRED_ITEMS_SOURCE_URL to vendor adapters or scheduled export endpoints to automate refreshes.',
    ],
  };
}

async function writeCatalogMap<T>(kv: KVNamespace, prefix: string, catalog: CatalogMap<T>, timestamp: string): Promise<void> {
  await Promise.all(
    Object.entries(catalog).map(([slug, items]) =>
      kv.put(`${prefix}:${slug}`, JSON.stringify({ lastUpdated: timestamp, items } satisfies CatalogRecord<T>))
    )
  );
}

async function fetchCatalogMap<T>(url: string | undefined, env: Env): Promise<CatalogMap<T>> {
  if (!url) {
    return {};
  }

  const response = await fetch(url, {
    headers: env.UPSTREAM_TOKEN
      ? {
          authorization: `Bearer ${env.UPSTREAM_TOKEN}`,
        }
      : undefined,
  });

  if (!response.ok) {
    throw new Error(`Catalog source failed: ${url} ${response.status}`);
  }

  const raw = (await response.json()) as unknown;
  return normalizeCatalogMap<T>(raw);
}

function normalizeCatalogMap<T>(raw: unknown): CatalogMap<T> {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return {};
  }

  const entries = Object.entries(raw as Record<string, unknown>)
    .filter(([, value]) => Array.isArray(value))
    .map(([slug, value]) => [slug, value as T[]]);

  return Object.fromEntries(entries);
}

function countCatalogItems<T>(catalog: CatalogMap<T>): number {
  return Object.values(catalog).reduce((total, items) => total + items.length, 0);
}

function isAuthorized(request: Request, env: Env): boolean {
  if (!env.REFRESH_SECRET) {
    return true;
  }

  return request.headers.get('authorization') === `Bearer ${env.REFRESH_SECRET}`;
}

async function safeJson<T>(request: Request): Promise<T | null> {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: JSON_HEADERS,
  });
}
