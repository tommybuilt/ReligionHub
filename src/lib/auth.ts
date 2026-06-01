import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { dbFirst, dbRun, getRuntimeEnv, type AdminSessionRecord } from '@/lib/db';
import { generateHexId, hashRequestIp, safeCompare, sha256Hex, sleep } from '@/lib/security';

export const ADMIN_SESSION_COOKIE = 'admin_session';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const THIRTY_DAYS_MS = 30 * ONE_DAY_MS;
const LOGIN_WINDOW_MINUTES = '-10 minutes';
const LOGIN_ATTEMPT_LIMIT = 5;
const LOGIN_DELAY_MS = 30_000;

function getAdminPasswordHash() {
  return (getRuntimeEnv().ADMIN_PASSWORD_HASH || '').trim().toLowerCase();
}

export function getSessionExpiry(rememberMe: boolean) {
  return new Date(Date.now() + (rememberMe ? THIRTY_DAYS_MS : ONE_DAY_MS));
}

export function getAdminSessionCookieOptions(expires: Date, path = '/admin') {
  return {
    httpOnly: true,
    secure: true,
    sameSite: 'strict' as const,
    path,
    expires,
  };
}

export async function verifyAdminPassword(password: string) {
  const expectedHash = getAdminPasswordHash();

  if (!expectedHash) {
    throw new Error('ADMIN_PASSWORD_HASH is not configured.');
  }

  const submittedHash = await sha256Hex(password);
  return safeCompare(submittedHash, expectedHash);
}

export async function createAdminSession(rememberMe: boolean) {
  const id = generateHexId(32);
  const expiresAt = getSessionExpiry(rememberMe);

  await dbRun(
    'INSERT INTO admin_sessions (id, expires_at) VALUES (?, ?)',
    [id, expiresAt.toISOString()]
  );

  return {
    id,
    expiresAt,
  };
}

export async function deleteAdminSession(sessionId: string) {
  await dbRun('DELETE FROM admin_sessions WHERE id = ?', [sessionId]);
}

export async function getAdminSessionById(sessionId: string): Promise<AdminSessionRecord | null> {
  try {
    return await dbFirst<AdminSessionRecord>(
      `SELECT id, expires_at, created_at
       FROM admin_sessions
       WHERE id = ? AND datetime(expires_at) > datetime('now')`,
      [sessionId]
    );
  } catch {
    return null;
  }
}

export async function getAdminSessionIdFromCookies() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value || null;
}

export async function getAdminSession() {
  const sessionId = await getAdminSessionIdFromCookies();

  if (!sessionId) {
    return null;
  }

  const session = await getAdminSessionById(sessionId);

  if (!session) {
    return null;
  }

  return session;
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect('/admin/login');
  }

  return session;
}

export async function setAdminSessionCookie(sessionId: string, expiresAt: Date) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, sessionId, getAdminSessionCookieOptions(expiresAt, '/admin'));
  cookieStore.set(ADMIN_SESSION_COOKIE, sessionId, getAdminSessionCookieOptions(expiresAt, '/api/admin'));
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/admin',
    expires: new Date(0),
  });
  cookieStore.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/api/admin',
    expires: new Date(0),
  });
}

export function getAdminSessionIdFromRequest(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const parts = cookieHeader.split(';').map((part) => part.trim());
  const match = parts.find((part) => part.startsWith(`${ADMIN_SESSION_COOKIE}=`));
  return match ? decodeURIComponent(match.slice(ADMIN_SESSION_COOKIE.length + 1)) : null;
}

export async function requireApiAdminSession(request: Request) {
  const sessionId = getAdminSessionIdFromRequest(request);

  if (!sessionId) {
    return null;
  }

  return getAdminSessionById(sessionId);
}

export function unauthorizedJson() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

async function getFailedAttemptCount(request: Request) {
  const ipHash = await hashRequestIp(request, 'admin-login');

  try {
    const row = await dbFirst<{ total: number }>(
      `SELECT COUNT(*) as total
       FROM login_attempts
       WHERE ip_hash = ? AND datetime(created_at) > datetime('now', ?)`,
      [ipHash, LOGIN_WINDOW_MINUTES]
    );

    return Number(row?.total || 0);
  } catch {
    return 0;
  }
}

export async function applyLoginDelayIfNeeded(request: Request) {
  const failedAttemptCount = await getFailedAttemptCount(request);

  if (failedAttemptCount >= LOGIN_ATTEMPT_LIMIT) {
    await sleep(LOGIN_DELAY_MS);
  }
}

export async function recordFailedLoginAttempt(request: Request) {
  const ipHash = await hashRequestIp(request, 'admin-login');

  try {
    await dbRun('INSERT INTO login_attempts (id, ip_hash) VALUES (?, ?)', [generateHexId(16), ipHash]);
  } catch {
    return;
  }
}

export async function clearFailedLoginAttempts(request: Request) {
  const ipHash = await hashRequestIp(request, 'admin-login');

  try {
    await dbRun('DELETE FROM login_attempts WHERE ip_hash = ?', [ipHash]);
  } catch {
    return;
  }
}

export async function buildLoginSuccessResponse(rememberMe: boolean) {
  const { id, expiresAt } = await createAdminSession(rememberMe);
  const response = NextResponse.json({ ok: true, redirectTo: '/admin' });
  response.cookies.set(ADMIN_SESSION_COOKIE, id, getAdminSessionCookieOptions(expiresAt, '/admin'));
  response.cookies.set(ADMIN_SESSION_COOKIE, id, getAdminSessionCookieOptions(expiresAt, '/api/admin'));
  return response;
}

export async function buildLogoutResponse(request: Request) {
  const sessionId = getAdminSessionIdFromRequest(request);

  if (sessionId) {
    await deleteAdminSession(sessionId);
  }

  const response = NextResponse.json({ ok: true, redirectTo: '/admin/login' });
  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/admin',
    expires: new Date(0),
  });
  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/api/admin',
    expires: new Date(0),
  });

  return response;
}
