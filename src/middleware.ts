import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CANONICAL_HOSTNAME = 'www.religioncompare.com';
const LEGACY_LOCALE_PREFIXES = ['/en', '/es', '/fr', '/ar'];

function applySecurityHeaders(request: NextRequest, response: NextResponse): NextResponse {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), browsing-topics=()');

  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  return response;
}

function findLegacyLocalePrefix(pathname: string): string | null {
  for (const prefix of LEGACY_LOCALE_PREFIXES) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return prefix;
    }
  }
  return null;
}

function isLocalHost(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1';
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const forwardedHost = request.headers.get('x-forwarded-host');
  const publicHostname = forwardedHost ?? request.nextUrl.hostname;
  const localHost = isLocalHost(publicHostname);
  const needsCanonicalHostRedirect =
    !localHost && publicHostname !== CANONICAL_HOSTNAME;
  const legacyLocalePrefix = findLegacyLocalePrefix(pathname);
  const hasTrailingSlash = pathname.length > 1 && pathname.endsWith('/');

  if (needsCanonicalHostRedirect || legacyLocalePrefix || hasTrailingSlash) {
    const url = request.nextUrl.clone();

    if (!localHost) {
      url.protocol = 'https:';
      url.hostname = CANONICAL_HOSTNAME;
    }

    let nextPath = pathname;

    if (legacyLocalePrefix) {
      nextPath = nextPath.slice(legacyLocalePrefix.length);
      if (nextPath.length === 0) {
        nextPath = '/';
      }
    }

    if (nextPath.length > 1 && nextPath.endsWith('/')) {
      nextPath = nextPath.replace(/\/+$/, '') || '/';
    }

    url.pathname = nextPath;

    return applySecurityHeaders(request, NextResponse.redirect(url, 301));
  }

  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    if (pathname === '/admin/login') {
      return applySecurityHeaders(request, NextResponse.next());
    }

    const adminSession = request.cookies.get('admin_session')?.value?.trim();

    if (!adminSession) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      loginUrl.search = '';
      return applySecurityHeaders(request, NextResponse.redirect(loginUrl, 302));
    }

    return applySecurityHeaders(request, NextResponse.next());
  }

  return applySecurityHeaders(request, NextResponse.next());
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|_vercel|favicon\\.ico|.*\\..*).*)',
  ],
};
