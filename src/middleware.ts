import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { createClient } from '@/lib/supabase/server'

export async function middleware(request: NextRequest) {
  // Update session for all requests
  const response = await updateSession(request)
  
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

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
