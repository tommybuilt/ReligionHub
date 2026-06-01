import { NextResponse } from 'next/server';
import { requireApiAdminSession, unauthorizedJson } from '@/lib/auth';
import { bulkUpdateMessages } from '@/lib/messages';

export async function POST(request: Request) {
  const session = await requireApiAdminSession(request);

  if (!session) {
    return unauthorizedJson();
  }

  const body = (await request.json().catch(() => ({}))) as { ids?: string[]; action?: 'mark-read' | 'delete' };
  const ids = Array.isArray(body.ids) ? body.ids.filter((id): id is string => typeof id === 'string' && id.length > 0) : [];
  const action = body.action === 'delete' ? 'delete' : 'mark-read';

  await bulkUpdateMessages(ids, action);
  return NextResponse.json({ ok: true });
}
