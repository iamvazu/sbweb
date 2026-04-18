import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function proxy(request: NextRequest) {
  let response = NextResponse.next();
  let user = null;

  try {
    // Update session for all requests
    const sessionData = await updateSession(request);
    response = sessionData.response;
    user = sessionData.user;
  } catch (error) {
    console.error('Proxy session update error:', error);
  }
  
  const url = new URL(request.url)
  const isPortalRoute = url.pathname.startsWith('/portal')
  const isLoginRoute = url.pathname === '/login'

  // 1. If user is NOT authenticated and tries to access portal
  if (isPortalRoute && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 2. If user IS authenticated and tries to access login
  if (isLoginRoute && user) {
    return NextResponse.redirect(new URL('/portal/vendor', request.url))
  }

  // 3. Admin-only route protection
  if (url.pathname.startsWith('/portal/admin')) {
    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.redirect(new URL('/portal/vendor', request.url))
    }
  }

  // 4. Old-to-New Redirects
  if (url.pathname === '/admin') {
    return NextResponse.redirect(new URL('/portal/admin', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
