// ============================================================
// Core Domain Types - ReligionCompare
// ============================================================

export type Locale = 'en' | 'es' | 'fr' | 'ar';

export type ClaimStatus = 'draft' | 'review' | 'published' | 'archived';

export type SubjectType =
  | 'religion'
  | 'denomination'
  | 'comparison'
  | 'quiz'
  | 'glossary'
  | 'timeline_event';

export type ClaimCategory =
  | 'origins'
  | 'beliefs'
  | 'practices'
  | 'texts'
  | 'demographics'
  | 'holidays'
  | 'leadership'
  | 'ethics'
  | 'symbols'
  | 'afterlife'
  | 'worship'
  | 'key_figures'
  | 'misconceptions';

export type ReliabilityTier = 'primary' | 'secondary' | 'tertiary';

// ============================================================
// Database Row Types
// ============================================================

export interface Religion {
  id: string;
  slug: string;
  parent_id: string | null;
  display_order: number;
  icon_media_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ReligionTranslation {
  id: string;
  religion_id: string;
  locale: Locale;
  name: string;
  summary: string;
  overview: string;
}

export interface Denomination {
  id: string;
  religion_id: string;
  parent_denomination_id: string | null;
  slug: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface DenominationTranslation {
  id: string;
  denomination_id: string;
  locale: Locale;
  name: string;
  summary: string;
  overview: string;
}

export interface Claim {
  id: string;
  claim_text: string;
  subject_type: SubjectType;
  subject_id: string;
  category: ClaimCategory;
  locale: Locale;
  status: ClaimStatus;
  created_by: string;
  updated_by: string;
  last_reviewed_at: string | null;
  notes_for_editors: string | null;
  confidence_flag: number | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Citation {
  id: string;
  title: string;
  publisher: string;
  author: string | null;
  url: string;
  date_published: string | null;
  date_accessed: string;
  excerpt: string | null;
  license_notes: string | null;
  reliability_tier: ReliabilityTier;
  created_by: string;
  created_at: string;
}

export interface ClaimCitation {
  claim_id: string;
  citation_id: string;
  supports_field: string | null;
  added_at: string;
}

export interface MediaAsset {
  id: string;
  r2_key: string;
  filename: string;
  mime_type: string;
  size_bytes: number;
  alt_text: string | null;
  license_type: string;
  license_url: string | null;
  attribution: string;
  source_url: string | null;
  creator: string | null;
  restrictions: string | null;
  uploaded_by: string;
  created_at: string;
}

export interface SourceRegistry {
  id: string;
  domain: string;
  publisher_name: string;
  reliability_tier: ReliabilityTier;
  notes: string | null;
  is_approved: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  diff_json: string | null;
  ip_address: string | null;
  created_at: string;
}

export interface Quiz {
  id: string;
  slug: string;
  quiz_type: 'knowledge' | 'alignment';
  religion_id: string | null;
  is_published: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface QuizTranslation {
  id: string;
  quiz_id: string;
  locale: Locale;
  title: string;
  description: string;
  disclaimer: string;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_type: 'multiple_choice' | 'true_false' | 'scale';
  display_order: number;
  citation_id: string | null;
}

export interface QuizQuestionTranslation {
  id: string;
  question_id: string;
  locale: Locale;
  question_text: string;
  options_json: string;
  explanation: string | null;
}

export interface QuizResult {
  id: string;
  quiz_id: string;
  user_id: string | null;
  answers_json: string;
  score: number | null;
  result_summary: string | null;
  created_at: string;
}

// ============================================================
// API Response Types
// ============================================================

export interface ClaimWithCitations extends Claim {
  citations: Citation[];
}

export interface ReligionWithTranslation extends Religion {
  name: string;
  summary: string;
  overview: string;
}

export interface DenominationWithTranslation extends Denomination {
  name: string;
  summary: string;
  overview: string;
}

export interface ComparisonData {
  religions: ReligionWithTranslation[];
  categories: {
    category: ClaimCategory;
    claims: Record<string, ClaimWithCitations[]>;
  }[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  error: string;
  code: string;
  details?: Record<string, string[]>;
}
