"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * Update the pipeline stage of a bid match
 */
export async function updateMatchStage(matchId: string, stage: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("user_bid_matches")
    .update({ 
      pipeline_stage: stage,
      last_updated: new Date().toISOString()
    })
    .eq("id", matchId)
    .eq("user_id", user.id);

  if (error) throw error;

  revalidatePath("/portal/pipeline");
  revalidatePath("/portal/vendor");
  revalidatePath("/portal/matches");
  
  return { success: true };
}

/**
 * Toggle GO/NO-GO status of a bid for the user
 */
export async function updateBidDecision(matchId: string, decision: 'pursue' | 'monitor' | 'pass') {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("user_bid_matches")
    .update({ 
      user_decision: decision,
      last_updated: new Date().toISOString()
    })
    .eq("id", matchId)
    .eq("user_id", user.id);

  if (error) throw error;

  revalidatePath("/portal/pipeline");
  return { success: true };
}

/**
 * Create a new match record to track a global bid
 */
export async function trackBid(bidId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("user_bid_matches")
    .insert({
      user_id: user.id,
      bid_id: bidId,
      fit_score: 0, // Initial score before AI analysis
      pipeline_stage: 'new_match'
    })
    .select()
    .single();

  if (error && error.code !== '23505') { // Ignore unique constraint errors (already tracking)
    throw error;
  }

  revalidatePath("/portal/bids");
  revalidatePath("/portal/matches");
  revalidatePath("/portal/vendor");
  
  return { success: true, matchId: data?.id };
}

/**
 * Fetch all bids from the database securely for public search (bypassing RLS)
 */
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export async function getPublicBids() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!url || !serviceKey) {
    throw new Error("Missing Supabase configuration");
  }

  const supabase = createSupabaseClient(url, serviceKey);
  const { data, error } = await supabase
    .from("bids")
    .select("id, event_id, department_code, department_name, event_name, format, type, end_date, status, contact_name, contact_email, portal_link, prebid_type, prebid_date, prebid_time, prebid_location, comments, source, pdf_urls, estimated_value_min, estimated_value_max, prevailing_wage, dbe_goal, dvbe_goal, sbe_only, bonding_required");

  if (error) {
    console.error("Error fetching public bids:", error);
    throw error;
  }

  return data || [];
}
