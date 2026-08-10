import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname.startsWith('/login');
  
  // Allow API routes or public assets if needed, but we want strict lockdown
  if (request.nextUrl.pathname.startsWith('/api') && !request.cookies.has('gkos_auth')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const hasAccess = request.cookies.get('gkos_auth')?.value === 'verified_281107';

  if (!hasAccess && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (hasAccess && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
