import { NextResponse } from 'next/server';
import { requireApiAdminSession, unauthorizedJson } from '@/lib/auth';
import { deleteMessage } from '@/lib/messages';

interface MessageRouteProps {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: Request, { params }: MessageRouteProps) {
  const session = await requireApiAdminSession(request);

  if (!session) {
    return unauthorizedJson();
  }

  const { id } = await params;
  await deleteMessage(id);
  return NextResponse.json({ ok: true });
}
