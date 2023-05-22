import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log('in middleware');

  console.log('request.cookes:', request.cookies);
  const auth = request.cookies.get('fetch-access-token');
  console.log({ auth });
  if (!auth) {
    console.log('auth cookie not found');

    // redirect('/login');
    // const url = request.nextUrl.clone();
    // url.pathname = '/login';

    // return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!_next/static|favicon.ico|login|).*)'],
};
