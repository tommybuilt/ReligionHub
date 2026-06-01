import { NextResponse } from 'next/server';
import { requireApiAdminSession, unauthorizedJson } from '@/lib/auth';
import { toggleMessageRead } from '@/lib/messages';

interface MessageReadRouteProps {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, { params }: MessageReadRouteProps) {
  const session = await requireApiAdminSession(request);

  if (!session) {
    return unauthorizedJson();
  }

  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as { isRead?: boolean };
  const message = await toggleMessageRead(id, body.isRead);
  return NextResponse.json({ message });
}
