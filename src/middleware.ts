import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log('in middleware');

  const auth = request.cookies.get('fetch-access-token');
  console.log({ auth });
  if (!auth) {
    redirect('/login');
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|favicon.ico|login|).*)'],
};
