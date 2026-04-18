import { createClient } from './supabase/server'
import { redirect } from 'next/navigation'

/**
 * Gets the current Supabase session user (server-side).
 */
export async function getUser() {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null
  return user
}

/**
 * Gets the full users table row for the current authenticated user.
 */
export async function getUserProfile() {
  const user = await getUser()
  if (!user) return null

  const supabase = createClient()
  const { data: profile, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) return null
  return profile
}

/**
 * Throws a redirect to /login if the user is not authenticated.
 */
export async function requireAuth() {
  const user = await getUser()
  if (!user) {
    redirect('/login')
  }
  return user
}

/**
 * Checks if a given email is the designated system administrator.
 */
export function isAdmin(email?: string) {
  if (!email) return false
  return email === process.env.ADMIN_EMAIL
}
