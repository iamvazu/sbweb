import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { response, user, supabase } = await updateSession(request)
  if (!supabase) return response;

  const isPortalRoute = request.nextUrl.pathname.startsWith('/portal')
  const isLoginRoute = request.nextUrl.pathname === '/login'

  // If user is NOT authenticated and tries to access portal -> redirect to login
  if (isPortalRoute && !user) {
    return Response.redirect(new URL('/login', request.url))
  }

  // If user IS authenticated and tries to access login -> redirect to correct dashboard
  if (isLoginRoute && user) {
    const isAdmin = user.email?.endsWith('@strongerbuilt.us') || 
                    user.email === 'roy@strongerbuilt.us' || 
                    user.email === 'crazyme2207@gmail.com';
    
    const landingPath = isAdmin ? '/portal/admin' : '/portal/vendor';
    return Response.redirect(new URL(landingPath, request.url))
  }

  // Admin protection
  if (request.nextUrl.pathname.startsWith('/portal/admin')) {
    const isAdmin = user?.email?.endsWith('@strongerbuilt.us') || 
                    user?.email === 'roy@strongerbuilt.us' || 
                    user?.email === 'crazyme2207@gmail.com';
                    
    if (!isAdmin) {
      return Response.redirect(new URL('/portal/vendor', request.url))
    }
  }

  // Onboarding protection for vendors
  if (request.nextUrl.pathname === '/portal/vendor' || request.nextUrl.pathname === '/portal/matches' || request.nextUrl.pathname === '/portal/pipeline') {
    const isAdmin = user?.email?.endsWith('@strongerbuilt.us') || 
                    user?.email === 'roy@strongerbuilt.us' || 
                    user?.email === 'crazyme2207@gmail.com';
    
    if (!isAdmin) {
      const { data: profile } = await supabase
        .from('users')
        .select('onboarding_complete')
        .eq('id', user?.id)
        .single();
        
      if (profile && !profile.onboarding_complete) {
        return Response.redirect(new URL('/portal/onboarding', request.url))
      }
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
