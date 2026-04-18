import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request)

  const isPortalRoute = request.nextUrl.pathname.startsWith('/portal')
  const isLoginRoute = request.nextUrl.pathname === '/login'

  // If user is NOT authenticated and tries to access portal -> redirect to login
  if (isPortalRoute && !user) {
    return Response.redirect(new URL('/login', request.url))
  }

  // If user IS authenticated and tries to access login -> redirect to vendor dashboard
  if (isLoginRoute && user) {
    return Response.redirect(new URL('/portal/vendor', request.url))
  }

  // Admin protection
  if (request.nextUrl.pathname.startsWith('/portal/admin')) {
    if (user?.email !== process.env.ADMIN_EMAIL) {
      return Response.redirect(new URL('/portal/vendor', request.url))
    }
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
