import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { HOME } from './constants/route-helper';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === HOME) {
    return NextResponse.next();
  }

  const userName = request.cookies.get('user_name');
  const userTeam = request.cookies.get('user_team');

  if (!userName || !userTeam) {
    return NextResponse.redirect(new URL(HOME, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets|public).*)'],
};
