import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { brandForHost } from '@/lib/brands';

// Two jobs, in order:
//
// 1. A client's own hostname (forms.<client>.com) is a single-purpose door. It
//    serves their form pages and the two APIs those pages call, and nothing
//    else. The dashboard, the submission viewer and the proposal pages are all
//    404 there, so a client domain can never surface another client's work.
//
// 2. On Maxxlab's own domains, password-gate the dashboard homepage only.
//    Individual form links (/forms/[slug]), client presentation links
//    (/proposals/...) and submission view links (/view/[id]) stay open, since
//    those are the "shared links" people are meant to open directly.

const CLIENT_HOST_ALLOWED = ['/forms/', '/api/submit', '/api/upload'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hostBrand = brandForHost(req.headers.get('host'));
  if (hostBrand) {
    const allowed = CLIENT_HOST_ALLOWED.some(prefix => pathname.startsWith(prefix));
    if (!allowed) return new NextResponse('Not found', { status: 404 });
    return NextResponse.next();
  }

  if (pathname !== '/') return NextResponse.next();

  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;

  // Don't lock anyone out if credentials haven't been configured yet.
  if (!user || !pass) return NextResponse.next();

  const auth = req.headers.get('authorization');
  if (auth?.startsWith('Basic ')) {
    const decoded = atob(auth.slice('Basic '.length));
    const sep = decoded.indexOf(':');
    const u = sep === -1 ? decoded : decoded.slice(0, sep);
    const p = sep === -1 ? '' : decoded.slice(sep + 1);
    if (u === user && p === pass) return NextResponse.next();
  }

  return new NextResponse('Authentication required.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Maxxlab Forms", charset="UTF-8"' },
  });
}

export const config = {
  matcher: [
    // Everything except Next's internals and static files, so the client-host
    // rule above can see each request. The Maxxlab branch still only acts on '/'.
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf)$).*)',
  ],
};
