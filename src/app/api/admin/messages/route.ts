import { NextResponse } from 'next/server';
import { requireApiAdminSession, unauthorizedJson } from '@/lib/auth';
import { getAdminMessages } from '@/lib/messages';

export async function GET(request: Request) {
  const session = await requireApiAdminSession(request);

  if (!session) {
    return unauthorizedJson();
  }

  const { searchParams } = new URL(request.url);
  const statusParam = searchParams.get('status');
  const status = statusParam === 'read' || statusParam === 'unread' ? statusParam : 'all';
  const messages = await getAdminMessages(status);
  return NextResponse.json({ messages });
}
