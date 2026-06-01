ALTER TABLE messages ADD COLUMN ip_hash TEXT;
CREATE INDEX IF NOT EXISTS idx_messages_ip_hash_created ON messages(ip_hash, created_at);
