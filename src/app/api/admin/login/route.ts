import { NextResponse } from 'next/server';
import {
  applyLoginDelayIfNeeded,
  buildLoginSuccessResponse,
  clearFailedLoginAttempts,
  recordFailedLoginAttempt,
  verifyAdminPassword,
} from '@/lib/auth';
import { adminLoginSchema } from '@/lib/validation';

export async function POST(request: Request) {
  await applyLoginDelayIfNeeded(request);

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const parsed = adminLoginSchema.safeParse(payload);

  if (!parsed.success) {
    await recordFailedLoginAttempt(request);
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  try {
    const isValid = await verifyAdminPassword(parsed.data.password);

    if (!isValid) {
      await recordFailedLoginAttempt(request);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    await clearFailedLoginAttempts(request);
    return buildLoginSuccessResponse(parsed.data.rememberMe);
  } catch {
    return NextResponse.json({ error: 'Admin login is not configured yet.' }, { status: 500 });
  }
}
