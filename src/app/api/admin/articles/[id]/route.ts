import { NextResponse } from 'next/server';
import { deleteAdminArticle, getAdminArticleById, updateAdminArticle } from '@/lib/articles';
import { requireApiAdminSession, unauthorizedJson } from '@/lib/auth';
import { adminArticleSchema } from '@/lib/validation';

interface ArticleRouteProps {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: ArticleRouteProps) {
  const session = await requireApiAdminSession(request);

  if (!session) {
    return unauthorizedJson();
  }

  const { id } = await params;
  const article = await getAdminArticleById(id);

  if (!article) {
    return NextResponse.json({ error: 'Article not found.' }, { status: 404 });
  }

  return NextResponse.json({ article });
}

export async function PUT(request: Request, { params }: ArticleRouteProps) {
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

  const { id } = await params;

  try {
    const article = await updateAdminArticle(id, parsed.data);
    return NextResponse.json({ article });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to update article.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: ArticleRouteProps) {
  const session = await requireApiAdminSession(request);

  if (!session) {
    return unauthorizedJson();
  }

  const { id } = await params;
  await deleteAdminArticle(id);
  return NextResponse.json({ ok: true });
}
