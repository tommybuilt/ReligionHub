-- ============================================================
-- ReligionCompare — Initial D1 Schema Migration
-- Optimized for claims+citation joins, translations, audit logs
-- ============================================================

-- Religions (top-level; parent_id allows grouping like "Chinese/EA traditions")
CREATE TABLE IF NOT EXISTS religions (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  parent_id TEXT REFERENCES religions(id) ON DELETE SET NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  icon_media_id TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_religions_slug ON religions(slug);
CREATE INDEX idx_religions_parent ON religions(parent_id);

-- Religion translations
CREATE TABLE IF NOT EXISTS religion_translations (
  id TEXT PRIMARY KEY,
  religion_id TEXT NOT NULL REFERENCES religions(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  name TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  overview TEXT NOT NULL DEFAULT '',
  UNIQUE(religion_id, locale)
);
CREATE INDEX idx_religion_translations_locale ON religion_translations(religion_id, locale);

-- Denominations
CREATE TABLE IF NOT EXISTS denominations (
  id TEXT PRIMARY KEY,
  religion_id TEXT NOT NULL REFERENCES religions(id) ON DELETE CASCADE,
  parent_denomination_id TEXT REFERENCES denominations(id) ON DELETE SET NULL,
  slug TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(religion_id, slug)
);
CREATE INDEX idx_denominations_religion ON denominations(religion_id);
CREATE INDEX idx_denominations_parent ON denominations(parent_denomination_id);

-- Denomination translations
CREATE TABLE IF NOT EXISTS denomination_translations (
  id TEXT PRIMARY KEY,
  denomination_id TEXT NOT NULL REFERENCES denominations(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  name TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  overview TEXT NOT NULL DEFAULT '',
  UNIQUE(denomination_id, locale)
);
CREATE INDEX idx_denomination_translations_locale ON denomination_translations(denomination_id, locale);

-- Users
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK(role IN ('admin','editor','moderator','user')),
  bio TEXT,
  avatar_media_id TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  email_verified INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);

-- Sessions
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_sessions_expires ON sessions(expires_at);

-- Claims (atomic factual statements — the core data unit)
CREATE TABLE IF NOT EXISTS claims (
  id TEXT PRIMARY KEY,
  claim_text TEXT NOT NULL,
  subject_type TEXT NOT NULL CHECK(subject_type IN ('religion','denomination','comparison','quiz','glossary','timeline_event')),
  subject_id TEXT NOT NULL,
  category TEXT NOT NULL CHECK(category IN ('origins','beliefs','practices','texts','demographics','holidays','leadership','ethics','symbols','afterlife','worship','key_figures','misconceptions')),
  locale TEXT NOT NULL DEFAULT 'en',
  status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','review','published','archived')),
  created_by TEXT NOT NULL REFERENCES users(id),
  updated_by TEXT NOT NULL REFERENCES users(id),
  last_reviewed_at TEXT,
  notes_for_editors TEXT,
  confidence_flag INTEGER,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_claims_subject ON claims(subject_type, subject_id);
CREATE INDEX idx_claims_category ON claims(category);
CREATE INDEX idx_claims_status ON claims(status);
CREATE INDEX idx_claims_locale ON claims(locale);
CREATE INDEX idx_claims_subject_category ON claims(subject_type, subject_id, category, locale, status);

-- Citations
CREATE TABLE IF NOT EXISTS citations (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  publisher TEXT NOT NULL,
  author TEXT,
  url TEXT NOT NULL,
  date_published TEXT,
  date_accessed TEXT NOT NULL,
  excerpt TEXT,
  license_notes TEXT,
  reliability_tier TEXT NOT NULL DEFAULT 'secondary' CHECK(reliability_tier IN ('primary','secondary','tertiary')),
  created_by TEXT NOT NULL REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_citations_publisher ON citations(publisher);
CREATE INDEX idx_citations_tier ON citations(reliability_tier);

-- Claim-Citation join table (many-to-many)
CREATE TABLE IF NOT EXISTS claim_citations (
  claim_id TEXT NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  citation_id TEXT NOT NULL REFERENCES citations(id) ON DELETE CASCADE,
  supports_field TEXT,
  added_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (claim_id, citation_id)
);
CREATE INDEX idx_claim_citations_citation ON claim_citations(citation_id);

-- Source Registry (approved publishers)
CREATE TABLE IF NOT EXISTS sources_registry (
  id TEXT PRIMARY KEY,
  domain TEXT NOT NULL UNIQUE,
  publisher_name TEXT NOT NULL,
  reliability_tier TEXT NOT NULL DEFAULT 'secondary' CHECK(reliability_tier IN ('primary','secondary','tertiary')),
  notes TEXT,
  is_approved INTEGER NOT NULL DEFAULT 1,
  created_by TEXT NOT NULL REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_sources_registry_domain ON sources_registry(domain);

-- Audit Log
CREATE TABLE IF NOT EXISTS audit_log (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  diff_json TEXT,
  ip_address TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_audit_log_user ON audit_log(user_id);
CREATE INDEX idx_audit_log_entity ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_log_created ON audit_log(created_at);

-- Media Assets (R2 metadata)
CREATE TABLE IF NOT EXISTS media_assets (
  id TEXT PRIMARY KEY,
  r2_key TEXT NOT NULL UNIQUE,
  filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes INTEGER NOT NULL,
  alt_text TEXT,
  license_type TEXT NOT NULL,
  license_url TEXT,
  attribution TEXT NOT NULL,
  source_url TEXT,
  creator TEXT,
  restrictions TEXT,
  uploaded_by TEXT NOT NULL REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_media_assets_r2key ON media_assets(r2_key);

-- Forum Boards
CREATE TABLE IF NOT EXISTS forum_boards (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  religion_id TEXT REFERENCES religions(id) ON DELETE SET NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Forum Board Translations
CREATE TABLE IF NOT EXISTS forum_board_translations (
  id TEXT PRIMARY KEY,
  board_id TEXT NOT NULL REFERENCES forum_boards(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  UNIQUE(board_id, locale)
);

-- Forum Threads
CREATE TABLE IF NOT EXISTS forum_threads (
  id TEXT PRIMARY KEY,
  board_id TEXT NOT NULL REFERENCES forum_boards(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  is_locked INTEGER NOT NULL DEFAULT 0,
  is_pinned INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_forum_threads_board ON forum_threads(board_id);
CREATE INDEX idx_forum_threads_user ON forum_threads(user_id);

-- Forum Posts
CREATE TABLE IF NOT EXISTS forum_posts (
  id TEXT PRIMARY KEY,
  thread_id TEXT NOT NULL REFERENCES forum_threads(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  is_removed INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_forum_posts_thread ON forum_posts(thread_id);
CREATE INDEX idx_forum_posts_user ON forum_posts(user_id);

-- Quizzes
CREATE TABLE IF NOT EXISTS quizzes (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  quiz_type TEXT NOT NULL CHECK(quiz_type IN ('knowledge','alignment')),
  religion_id TEXT REFERENCES religions(id) ON DELETE SET NULL,
  is_published INTEGER NOT NULL DEFAULT 0,
  created_by TEXT NOT NULL REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_quizzes_slug ON quizzes(slug);
CREATE INDEX idx_quizzes_religion ON quizzes(religion_id);

-- Quiz Translations
CREATE TABLE IF NOT EXISTS quiz_translations (
  id TEXT PRIMARY KEY,
  quiz_id TEXT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  disclaimer TEXT NOT NULL DEFAULT '',
  UNIQUE(quiz_id, locale)
);

-- Quiz Questions
CREATE TABLE IF NOT EXISTS quiz_questions (
  id TEXT PRIMARY KEY,
  quiz_id TEXT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  question_type TEXT NOT NULL CHECK(question_type IN ('multiple_choice','true_false','scale')),
  display_order INTEGER NOT NULL DEFAULT 0,
  citation_id TEXT REFERENCES citations(id) ON DELETE SET NULL
);
CREATE INDEX idx_quiz_questions_quiz ON quiz_questions(quiz_id);

-- Quiz Question Translations
CREATE TABLE IF NOT EXISTS quiz_question_translations (
  id TEXT PRIMARY KEY,
  question_id TEXT NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  question_text TEXT NOT NULL,
  options_json TEXT NOT NULL,
  explanation TEXT,
  UNIQUE(question_id, locale)
);

-- Quiz Results
CREATE TABLE IF NOT EXISTS quiz_results (
  id TEXT PRIMARY KEY,
  quiz_id TEXT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  answers_json TEXT NOT NULL,
  score INTEGER,
  result_summary TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_quiz_results_quiz ON quiz_results(quiz_id);
CREATE INDEX idx_quiz_results_user ON quiz_results(user_id);

-- Moderation Reports
CREATE TABLE IF NOT EXISTS moderation_reports (
  id TEXT PRIMARY KEY,
  reporter_id TEXT NOT NULL REFERENCES users(id),
  target_type TEXT NOT NULL CHECK(target_type IN ('post','thread','user','claim')),
  target_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','reviewed','dismissed')),
  reviewed_by TEXT REFERENCES users(id),
  reviewed_at TEXT,
  action_taken TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_moderation_reports_status ON moderation_reports(status);
CREATE INDEX idx_moderation_reports_target ON moderation_reports(target_type, target_id);

-- User Bookmarks
CREATE TABLE IF NOT EXISTS user_bookmarks (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK(entity_type IN ('religion','denomination','comparison','claim')),
  entity_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, entity_type, entity_id)
);

-- Saved Comparisons
CREATE TABLE IF NOT EXISTS saved_comparisons (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  religion_ids_json TEXT NOT NULL,
  categories_json TEXT NOT NULL DEFAULT '[]',
  title TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_saved_comparisons_user ON saved_comparisons(user_id);

-- UI String Translations (for dynamic admin-managed strings)
CREATE TABLE IF NOT EXISTS ui_translations (
  id TEXT PRIMARY KEY,
  translation_key TEXT NOT NULL,
  locale TEXT NOT NULL,
  value TEXT NOT NULL,
  UNIQUE(translation_key, locale)
);
CREATE INDEX idx_ui_translations_key ON ui_translations(translation_key, locale);

-- Blog Posts (scaffolded)
CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  author_id TEXT NOT NULL REFERENCES users(id),
  status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','review','published','archived')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS blog_post_translations (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  UNIQUE(post_id, locale)
);
