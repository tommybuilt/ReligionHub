import { NextResponse } from 'next/server';
import { sendContactNotificationEmail } from '@/lib/email';
import { createMessage, getMessageRateLimitCount } from '@/lib/messages';
import { publicContactSchema } from '@/lib/validation';

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = publicContactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Invalid contact form data.' }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const requestCount = await getMessageRateLimitCount(request);

  if (requestCount >= 3) {
    return NextResponse.json({ error: 'Please wait before sending another message.' }, { status: 429 });
  }

  try {
    const message = await createMessage(parsed.data, request);
    await sendContactNotificationEmail({
      name: message.name,
      email: message.email,
      subject: message.subject || '',
      message: message.body,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to send your message.' }, { status: 500 });
  }
}
