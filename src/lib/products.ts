import type { z } from 'zod';
import { type AdminProductRecord, dbAll, dbFirst, dbRun, getOptionalDb } from '@/lib/db';
import { generateHexId } from '@/lib/security';
import { type ProductBadge, SACRED_ITEMS, type SacredItemCollection, type SacredItemEntry } from '@/lib/sacred-items';
import { adminProductSchema } from '@/lib/validation';

export type AdminProductInput = z.infer<typeof adminProductSchema>;
export const ADMIN_TRADITION_OPTIONS = Object.keys(SACRED_ITEMS).sort();

export function humanizeTradition(slug: string) {
  return slug
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

function recordToBadges(record: AdminProductRecord): ProductBadge[] {
  return record.is_editors_pick ? ['Staff Pick'] : [];
}

export function adminProductToSacredItem(record: AdminProductRecord): SacredItemEntry {
  return {
    id: record.id,
    name: record.name,
    description: record.description || '',
    priceRange: record.price_range || 'See listing',
    amazonProductId: record.amazon_asin || undefined,
    amazonSearchQuery: record.amazon_search_query || undefined,
    badges: recordToBadges(record),
    featured: Boolean(record.is_editors_pick),
    firstSeen: record.created_at.slice(0, 10),
  };
}

export async function getAdminProducts(tradition?: string): Promise<AdminProductRecord[]> {
  if (!getOptionalDb()) {
    return [];
  }

  try {
    if (tradition) {
      return await dbAll<AdminProductRecord>(
        `SELECT *
         FROM products
         WHERE tradition = ?
         ORDER BY sort_order ASC, datetime(updated_at) DESC, name ASC`,
        [tradition]
      );
    }

    return await dbAll<AdminProductRecord>(
      `SELECT *
       FROM products
       ORDER BY tradition ASC, sort_order ASC, datetime(updated_at) DESC, name ASC`
    );
  } catch {
    return [];
  }
}

export async function getAdminProductById(id: string): Promise<AdminProductRecord | null> {
  if (!getOptionalDb()) {
    return null;
  }

  try {
    return await dbFirst<AdminProductRecord>('SELECT * FROM products WHERE id = ?', [id]);
  } catch {
    return null;
  }
}

export async function createAdminProduct(input: AdminProductInput) {
  const id = generateHexId(8);

  await dbRun(
    `INSERT INTO products (
      id, name, description, tradition, price_range, amazon_asin, amazon_search_query, image_url, is_editors_pick, editors_pick_author, sort_order, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
    [
      id,
      input.name,
      input.description || null,
      input.tradition,
      input.priceRange || null,
      input.amazonAsin || null,
      input.amazonSearchQuery || null,
      input.imageUrl || null,
      input.isEditorsPick ? 1 : 0,
      input.editorsPickAuthor || null,
      input.sortOrder,
    ]
  );

  const product = await getAdminProductById(id);

  if (!product) {
    throw new Error('Unable to load the saved product.');
  }

  return product;
}

export async function updateAdminProduct(id: string, input: AdminProductInput) {
  await dbRun(
    `UPDATE products
     SET name = ?, description = ?, tradition = ?, price_range = ?, amazon_asin = ?, amazon_search_query = ?, image_url = ?, is_editors_pick = ?, editors_pick_author = ?, sort_order = ?, updated_at = datetime('now')
     WHERE id = ?`,
    [
      input.name,
      input.description || null,
      input.tradition,
      input.priceRange || null,
      input.amazonAsin || null,
      input.amazonSearchQuery || null,
      input.imageUrl || null,
      input.isEditorsPick ? 1 : 0,
      input.editorsPickAuthor || null,
      input.sortOrder,
      id,
    ]
  );

  const product = await getAdminProductById(id);

  if (!product) {
    throw new Error('Unable to load the saved product.');
  }

  return product;
}

export async function deleteAdminProduct(id: string) {
  await dbRun('DELETE FROM products WHERE id = ?', [id]);
}

export async function toggleAdminProductPick(id: string) {
  const current = await getAdminProductById(id);

  if (!current) {
    throw new Error('Product not found.');
  }

  await dbRun(
    `UPDATE products
     SET is_editors_pick = ?, updated_at = datetime('now')
     WHERE id = ?`,
    [current.is_editors_pick ? 0 : 1, id]
  );

  return getAdminProductById(id);
}

export async function getDbProductsByTradition(tradition: string): Promise<AdminProductRecord[]> {
  return getAdminProducts(tradition);
}

export async function getMergedSacredItemCollection(tradition: string): Promise<SacredItemCollection | null> {
  const staticCollection = SACRED_ITEMS[tradition];
  const dbProducts = await getDbProductsByTradition(tradition);

  if (!staticCollection && !dbProducts.length) {
    return null;
  }

  const baseCollection: SacredItemCollection = staticCollection || {
    slug: tradition,
    traditionName: humanizeTradition(tradition),
    items: [],
  };

  const staticItems = baseCollection.items;
  const dbById = new Map(dbProducts.map((product) => [product.id, product]));
  const seenIds = new Set<string>();

  const mergedStaticItems = staticItems.map((item) => {
    const dbProduct = dbById.get(item.id);
    seenIds.add(item.id);

    if (!dbProduct) {
      return item;
    }

    return {
      ...item,
      ...adminProductToSacredItem(dbProduct),
    };
  });

  const appendedDbItems = dbProducts
    .filter((product) => !seenIds.has(product.id))
    .sort((left, right) => left.sort_order - right.sort_order || left.name.localeCompare(right.name))
    .map(adminProductToSacredItem);

  return {
    ...baseCollection,
    items: [...mergedStaticItems, ...appendedDbItems],
  };
}
