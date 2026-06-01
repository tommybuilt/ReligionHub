CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(8)))),
  name TEXT NOT NULL,
  description TEXT,
  tradition TEXT NOT NULL,
  price_range TEXT,
  amazon_asin TEXT,
  amazon_search_query TEXT,
  image_url TEXT,
  is_editors_pick INTEGER DEFAULT 0,
  editors_pick_author TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_products_tradition ON products(tradition);
