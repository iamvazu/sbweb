import "server-only";
import { createClient } from "@/lib/supabase/server";
import { bidSlug, getBidState } from "./bids";

// Fetch a single bid by slug, matching case-insensitively and resolving special characters
export async function getBidBySlug(slug: string) {
  const supabase = await createClient();
  const parts = slug.split('-');
  const candidates: string[] = [];
  
  // Extract up to 4 possible event_id candidates from the right of the slug
  for (let i = 1; i <= Math.min(parts.length, 4); i++) {
    candidates.push(parts.slice(-i).join('-'));
  }
  
  if (candidates.length === 0) return null;
  
  // Build case-insensitive matches using ILIKE in OR filter, replacing hyphens with wildcards %
  const orCondition = candidates.map(c => `event_id.ilike.${c.replace(/-/g, '%')}`).join(',');
  const { data: bids, error } = await supabase
    .from("bids")
    .select("*")
    .or(orCondition);
    
  if (error || !bids || bids.length === 0) return null;
  
  // Find the exact bid in memory by comparing the computed slug
  const targetBid = bids.find(bid => bidSlug(bid) === slug);
  if (targetBid) {
    targetBid.state = getBidState(targetBid);
  }
  return targetBid || null;
}
