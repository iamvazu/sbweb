import { createClient } from './supabase/server';
import { redirect } from 'next/navigation';

/**
 * Get current Supabase session user (Server Side)
 */
export async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/**
 * Get current user's profile from 'public.users' table
 */
export async function getUserProfile() {
  const user = await getUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();
  
  return profile;
}

/**
 * Throw redirect if user is not authenticated
 */
export async function requireAuth() {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }
  return user;
}

/**
 * Check if current user is an admin
 */
export function isAdmin(email?: string) {
  if (!email) return false;
  return email === process.env.ADMIN_EMAIL;
}
