"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { BidCard } from "@/components/portal/bid-ui";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Search, Info, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export default function MatchesPage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("fit_score");
  const supabase = createClient();

  useEffect(() => {
    async function loadMatches() {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("user_bid_matches")
        .select(`
          *,
          bids!inner (*)
        `)
        .eq("user_id", user.id)
        .eq("pipeline_stage", "new_match")
        .gte("bids.end_date", new Date().toISOString())
        .order("fit_score", { ascending: false });

      setMatches(data || []);
      setIsLoading(false);
    }
    loadMatches();
  }, [supabase, sortBy]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        {[1,2,3,4].map(i => <Skeleton key={i} className="h-32 w-full" />)}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F3A]">Your Matched Bids</h1>
          <p className="text-sm text-slate-500">Government contracts correlated to your business profile.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Sort by</span>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v || "fit_score")}>
            <SelectTrigger className="w-[180px] h-10 border-slate-200">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fit_score">Highest Fit Score</SelectItem>
              <SelectItem value="matched_at">Recently Matched</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-4 items-start">
        <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0 text-[#1E6FD9]">
          <Info className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-blue-900 uppercase tracking-tight">How matching works</p>
          <p className="text-xs text-blue-700 leading-relaxed">
            BidIQ automatically scans portals for solicitations that match your **CSLB license classes**, **NAICS codes**, and **serving counties**. We provide a "Fit Score" to help you prioritize your reviews.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {matches.length > 0 ? (
          matches.map((match) => (
            <BidCard key={match.id} match={match} />
          ))
        ) : (
          <div className="text-center py-20 bg-white border-2 border-dashed rounded-xl">
            <div className="max-w-xs mx-auto space-y-4">
              <Search className="h-12 w-12 text-slate-200 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">No matches yet</h3>
              <p className="text-sm text-slate-500">
                Our engine is currently analyzing portals. If you haven't yet, ensure your onboarding profile is complete.
              </p>
              <Button asChild className="bg-[#1E6FD9]">
                <Link href="/portal/onboarding">Refine My Profile</Link>
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="pt-8 border-t">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-slate-900 rounded-3xl text-white">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Not finding the right bids?</h3>
            <p className="text-blue-100/60 text-sm max-w-md">
              Update your service areas or NAICS codes to expand your search radius and contract types.
            </p>
          </div>
          <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/5">
            <Link href="/portal/onboarding">Account Settings</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
