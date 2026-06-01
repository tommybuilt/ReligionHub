CREATE TABLE IF NOT EXISTS page_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_path TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK(event_type IN ('pageview', 'shop_click', 'outbound_click')),
  referrer TEXT,
  ip_hash TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_events_path ON page_events(page_path);
CREATE INDEX IF NOT EXISTS idx_events_type ON page_events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_date ON page_events(created_at);
