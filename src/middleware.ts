import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('fetch-access-token');
  // console.log('cookie: ', cookie);
  const allCookies = request;
  // console.log('allCookies: ', allCookies);

  const response = NextResponse.next();

  const Rescookie = response;

  console.log('Rescookie: ', Rescookie);

  // console.log('response: ', response);

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
