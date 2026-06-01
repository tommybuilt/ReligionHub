import { NextResponse } from 'next/server';
import { recordTrackEvent } from '@/lib/analytics';
import { trackEventSchema } from '@/lib/validation';

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  const parsed = trackEventSchema.safeParse(payload);

  if (!parsed.success) {
    return new NextResponse(null, { status: 204 });
  }

  await recordTrackEvent(parsed.data, request).catch(() => undefined);
  return new NextResponse(null, { status: 204 });
}
