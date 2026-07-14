import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Password-gates the dashboard homepage only — individual form links
// (/forms/[slug]), client presentation links (/proposals/...), and
// submission view links (/view/[id]) stay open since those are the
// "shared links" people are meant to open directly, unauthenticated.
export function middleware(req: NextRequest) {
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
  matcher: '/',
};
