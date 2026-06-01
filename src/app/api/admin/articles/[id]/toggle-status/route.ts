import { NextResponse } from 'next/server';
import { requireApiAdminSession, unauthorizedJson } from '@/lib/auth';
import { toggleAdminArticleStatus } from '@/lib/articles';

interface ArticleToggleRouteProps {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, { params }: ArticleToggleRouteProps) {
  const session = await requireApiAdminSession(request);

  if (!session) {
    return unauthorizedJson();
  }

  const { id } = await params;

  try {
    const article = await toggleAdminArticleStatus(id);
    return NextResponse.json({ article });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to update article status.' }, { status: 500 });
  }
}
