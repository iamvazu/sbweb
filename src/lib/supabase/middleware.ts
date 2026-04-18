import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Safety: If keys are missing or placeholders, skip Supabase calls to avoid 500ing the whole site.
  const isPlaceholder = !process.env.NEXT_PUBLIC_SUPABASE_URL || 
                        process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

  if (isPlaceholder) {
    return { response, user: null };
  }

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({ name, value, ...options })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({ name, value: '', ...options })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({ name, value: '', ...options })
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    return { response, user }
  } catch (error) {
    // If Supabase fails (network, auth, etc.), allow the request to proceed without a session
    // to prevent taking down the marketing site.
    console.error('Middleware Supabase error:', error);
    return { response, user: null }
  }
}
