import { NextResponse } from 'next/server';
import { clearAllAnalyticsData } from '@/lib/admin-data';
import { requireApiAdminSession, unauthorizedJson } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await requireApiAdminSession(request);

  if (!session) {
    return unauthorizedJson();
  }

  await clearAllAnalyticsData();
  return NextResponse.json({ ok: true });
}
