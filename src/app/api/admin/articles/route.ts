import { NextResponse } from 'next/server';
import { createAdminArticle, getAdminArticles } from '@/lib/articles';
import { requireApiAdminSession, unauthorizedJson } from '@/lib/auth';
import { adminArticleSchema } from '@/lib/validation';

export async function GET(request: Request) {
  const session = await requireApiAdminSession(request);

  if (!session) {
    return unauthorizedJson();
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const articles = await getAdminArticles(status === 'draft' || status === 'published' ? status : undefined);
  return NextResponse.json({ articles });
}

export async function POST(request: Request) {
  const session = await requireApiAdminSession(request);

  if (!session) {
    return unauthorizedJson();
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = adminArticleSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Invalid article data.' }, { status: 400 });
  }

  try {
    const article = await createAdminArticle(parsed.data);
    return NextResponse.json({ id: article.id, article }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to create article.' }, { status: 500 });
  }
}
