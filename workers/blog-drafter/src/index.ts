type ArticleAuthor = 'Renee K.' | 'Maury B.';
type ArticleCategory = 'Beliefs' | 'Practices' | 'History' | 'Culture' | 'FAQ';

interface Env {
  ANTHROPIC_API_KEY: string;
  DRAFTER_TOKEN?: string;
  ANTHROPIC_MODEL?: string;
  ALLOWED_ORIGIN?: string;
}

interface DraftRequestBody {
  topic: string;
  angle?: string;
  category?: ArticleCategory;
  primaryReligionSlugs?: string[];
  relatedComparisons?: string[];
  sourceHints?: string[];
  audience?: string;
  preferredAuthor?: ArticleAuthor;
  publishDate?: string;
}

interface DraftSource {
  id: number;
  label: string;
  url?: string;
}

interface DraftPayload {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  readTime: string;
  content: string;
  sources: DraftSource[];
  relatedSlugs: string[];
  relatedReligions: string[];
  relatedComparisons: string[];
}

interface AnthropicBlock {
  type: string;
  text?: string;
}

interface AnthropicResponse {
  content: AnthropicBlock[];
}

const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return withCors(new Response(null, { status: 204 }), env);
    }

    const url = new URL(request.url);

    if (request.method === 'GET' && url.pathname === '/health') {
      return withCors(jsonResponse({ ok: true, service: 'blog-drafter' }), env);
    }

    if (request.method === 'POST' && url.pathname === '/draft') {
      return withCors(await handleDraftRequest(request, env), env);
    }

    return withCors(jsonResponse({ ok: false, error: 'Not found' }, 404), env);
  },
};

async function handleDraftRequest(request: Request, env: Env): Promise<Response> {
  if (!isAuthorized(request, env)) {
    return jsonResponse({ ok: false, error: 'Unauthorized' }, 401);
  }

  if (!env.ANTHROPIC_API_KEY) {
    return jsonResponse({ ok: false, error: 'ANTHROPIC_API_KEY is required' }, 500);
  }

  let body: DraftRequestBody;

  try {
    body = (await request.json()) as DraftRequestBody;
  } catch {
    return jsonResponse({ ok: false, error: 'Request body must be valid JSON' }, 400);
  }

  if (!body.topic?.trim()) {
    return jsonResponse({ ok: false, error: 'A topic is required' }, 400);
  }

  const publishDate = body.publishDate || new Date().toISOString().slice(0, 10);
  const author = resolveAuthor(body.topic, body.preferredAuthor);
  const prompt = buildPrompt(body, author, publishDate);
  let modelText = '';

  try {
    modelText = await requestAnthropicDraft(prompt, env);
  } catch (error) {
    return jsonResponse({ ok: false, error: error instanceof Error ? error.message : 'Anthropic request failed' }, 502);
  }

  const parsedDraft = parseDraftJson(modelText);

  if (!parsedDraft) {
    return jsonResponse({ ok: false, error: 'Anthropic response did not contain valid draft JSON', raw: modelText }, 502);
  }

  const normalizedDraft = normalizeDraft(parsedDraft, body, publishDate);
  const articleModule = buildArticleModule(normalizedDraft, author, publishDate);

  return jsonResponse({
    ok: true,
    author,
    publishDate,
    draft: normalizedDraft,
    articleModule,
  });
}

function isAuthorized(request: Request, env: Env): boolean {
  if (!env.DRAFTER_TOKEN) {
    return true;
  }

  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${env.DRAFTER_TOKEN}`;
}

function buildPrompt(body: DraftRequestBody, author: ArticleAuthor, publishDate: string): string {
  const category = body.category || 'FAQ';
  const relatedReligions = body.primaryReligionSlugs?.join(', ') || 'none provided';
  const relatedComparisons = body.relatedComparisons?.join(', ') || 'none provided';
  const sources = body.sourceHints?.join('; ') || 'Encyclopaedia Britannica; Oxford Reference; Pew Research Center; primary texts where relevant';
  const audience = body.audience || 'general readers who want clear, neutral explanation';

  return [
    'Create a ReligionCompare article draft as JSON only.',
    `Topic: ${body.topic}`,
    `Angle: ${body.angle || 'clear explanatory overview'}`,
    `Category: ${category}`,
    `Audience: ${audience}`,
    `Author: ${author}`,
    `Publish date: ${publishDate}`,
    `Related religions: ${relatedReligions}`,
    `Related comparisons: ${relatedComparisons}`,
    `Source hints: ${sources}`,
    'Rules:',
    '1. Do not use em dashes.',
    '2. Use inline numeric citations like [1] and [2] throughout the content.',
    '3. Include a visible Sources & Further Reading section inside the content body as the final heading.',
    '4. Keep tone neutral, factual, and accessible.',
    '5. Return JSON with keys slug, title, excerpt, category, content, sources, relatedSlugs, relatedReligions, relatedComparisons.',
    '6. The content field must be markdown-ish text using ## and ### headings, matching ReligionCompare article style.',
    '7. sources must be an array of objects with id, label, and optional url.',
    '8. relatedSlugs should be plausible existing or planned article slugs, but keep the array short.',
    '9. relatedReligions should use site slugs such as christianity, islam, hinduism, buddhism, judaism, sikhism, catholicism, protestantism, orthodox-christianity.',
    '10. relatedComparisons should be site paths like /compare/christianity-vs-islam.',
    '11. The article must be original and ready for human review, not publication without checking.',
  ].join('\n');
}

async function requestAnthropicDraft(prompt: string, env: Env): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      temperature: 0.3,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Anthropic request failed: ${response.status} ${errorText}`);
  }

  const payload = (await response.json()) as AnthropicResponse;
  return payload.content.map((block) => block.text || '').join('\n').trim();
}

function parseDraftJson(modelText: string): DraftPayload | null {
  const start = modelText.indexOf('{');
  const end = modelText.lastIndexOf('}');

  if (start === -1 || end === -1 || end <= start) {
    return null;
  }

  try {
    return JSON.parse(modelText.slice(start, end + 1)) as DraftPayload;
  } catch {
    return null;
  }
}

function normalizeDraft(parsed: DraftPayload, body: DraftRequestBody, publishDate: string): DraftPayload {
  const slug = slugify(parsed.slug || body.topic);
  const title = parsed.title?.trim() || body.topic.trim();
  const excerpt = parsed.excerpt?.trim() || `A clear, citation-backed draft about ${body.topic.trim()}.`;
  const content = parsed.content?.trim() || `${body.topic.trim()} [1][2]`;
  const category = parsed.category || body.category || 'FAQ';
  const readTime = parsed.readTime || estimateReadTime(content);

  return {
    slug,
    title,
    excerpt,
    category,
    readTime,
    content,
    sources: normalizeSources(parsed.sources),
    relatedSlugs: parsed.relatedSlugs || [],
    relatedReligions: parsed.relatedReligions || body.primaryReligionSlugs || [],
    relatedComparisons: parsed.relatedComparisons || body.relatedComparisons || [],
  };
}

function normalizeSources(sources: DraftSource[] | undefined): DraftSource[] {
  if (!sources?.length) {
    return [{ id: 1, label: 'Add verified scholarly sources before publication.' }];
  }

  return sources.map((source, index) => ({
    id: source.id || index + 1,
    label: source.label,
    ...(source.url ? { url: source.url } : {}),
  }));
}

function resolveAuthor(seed: string, preferredAuthor?: ArticleAuthor): ArticleAuthor {
  if (preferredAuthor) {
    return preferredAuthor;
  }

  return hashString(seed) % 2 === 0 ? 'Renee K.' : 'Maury B.';
}

function hashString(value: string): number {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) % 2147483647;
  }

  return Math.abs(hash);
}

function estimateReadTime(content: string): string {
  const words = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(4, Math.round(words / 200));
  return `${minutes} min read`;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toDisplayDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function toIdentifier(slug: string): string {
  return slug
    .split('-')
    .map((segment, index) => index === 0 ? segment : segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');
}

function escapeTemplateLiteral(value: string): string {
  return value.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function escapeSingleQuoted(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function buildArticleModule(draft: DraftPayload, author: ArticleAuthor, publishDate: string): string {
  const identifier = toIdentifier(draft.slug);
  const displayDate = toDisplayDate(publishDate);
  const sourceLines = draft.sources
    .map((source) => `    { id: ${source.id}, label: '${escapeSingleQuoted(source.label)}'${source.url ? `, url: '${escapeSingleQuoted(source.url)}'` : ''} },`)
    .join('\n');

  return [
    "import type { Article } from './types';",
    '',
    `export const ${identifier}: Article = {`,
    `  slug: '${escapeSingleQuoted(draft.slug)}',`,
    `  title: '${escapeSingleQuoted(draft.title)}',`,
    `  author: '${author}',`,
    `  publishDate: '${publishDate}',`,
    `  displayDate: '${displayDate}',`,
    `  category: '${draft.category}',`,
    `  readTime: '${draft.readTime}',`,
    `  excerpt: '${escapeSingleQuoted(draft.excerpt)}',`,
    `  relatedSlugs: ${JSON.stringify(draft.relatedSlugs)},`,
    `  relatedReligions: ${JSON.stringify(draft.relatedReligions)},`,
    `  relatedComparisons: ${JSON.stringify(draft.relatedComparisons)},`,
    `  content: \`${escapeTemplateLiteral(draft.content)}\`,`,
    '  sources: [',
    sourceLines,
    '  ],',
    '};',
  ].join('\n');
}

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: JSON_HEADERS,
  });
}

function withCors(response: Response, env: Env): Response {
  const headers = new Headers(response.headers);
  headers.set('access-control-allow-origin', env.ALLOWED_ORIGIN || '*');
  headers.set('access-control-allow-methods', 'GET,POST,OPTIONS');
  headers.set('access-control-allow-headers', 'authorization,content-type');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
