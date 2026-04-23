"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { BidCard, PipelineSummaryBar } from "@/components/portal/bid-ui";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info, Plus, Search, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MarketInsights from "@/components/market/market-insights";

export default function VendorDashboard() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadDashboard() {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 1. Fetch User Profile
      const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
      setUserProfile(profile);

      // 2. Fetch Matches with Bid Data
      const { data: matchedBids } = await supabase
        .from("user_bid_matches")
        .select(`
          *,
          bids (*)
        `)
        .eq("user_id", user.id)
        .eq("pipeline_stage", "new_match")
        .order("fit_score", { ascending: false })
        .limit(10);
      setMatches(matchedBids || []);

      // 3. Fetch Pipeline Counts
      const { data: allMatches } = await supabase
        .from("user_bid_matches")
        .select("pipeline_stage")
        .eq("user_id", user.id);
      
      const stageCounts: Record<string, number> = {};
      allMatches?.forEach(m => {
        stageCounts[m.pipeline_stage] = (stageCounts[m.pipeline_stage] || 0) + 1;
      });
      setCounts(stageCounts);

      setIsLoading(false);
    }

    loadDashboard();
  }, [supabase]);

  if (isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[1,2,3,4,5].map(i => <Skeleton key={i} className="h-24 w-full" />)}
        </div>
        <div className="space-y-4 pt-8">
          <Skeleton className="h-8 w-48" />
          {[1,2,3].map(i => <Skeleton key={i} className="h-32 w-full" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0B1F3A] tracking-tight">
            Welcome back, {userProfile?.business_name.split(' ')[0] || 'Partner'}.
          </h1>
          <p className="text-slate-500 mt-1 font-medium italic">
            "Your matched government contracts are ready for review."
          </p>
        </div>
        <Button asChild className="bg-[#1E6FD9] hover:bg-blue-700 shadow-md">
          <Link href="/portal/bids">
            <Plus className="h-4 w-4 mr-2" />
            Find More Bids
          </Link>
        </Button>
      </div>

      {/* Pipeline Summary */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-slate-400">
          <Info className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-widest">Active Pipeline Overview</span>
        </div>
        <PipelineSummaryBar counts={counts} />
      </section>

      {/* Profile Completeness Check */}
      {(!userProfile?.naics_codes || userProfile.naics_codes.length === 0) && (
        <Card className="p-6 border-amber-200 bg-amber-50/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
              <ShieldAlert className="h-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-900 uppercase tracking-tight">AI Engine Standby: Profile Incomplete</h3>
              <p className="text-xs text-amber-700 font-medium">Add your NAICS codes and certifications to unlock automated government bid matching.</p>
            </div>
          </div>
          <Button asChild variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-100 shrink-0">
            <Link href="/portal/settings">Setup Your Profile</Link>
          </Button>
        </Card>
      )}

      {/* Main Section: Matches */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#0B1F3A]">Your Top Matched Bids</h2>
          <Button variant="link" asChild className="text-[#1E6FD9] font-semibold text-sm">
            <Link href="/portal/matches" className="flex items-center gap-2">
              View All Matches <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {matches.length > 0 ? (
          <div className="grid gap-4">
            {matches.map((match) => (
              <BidCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center border-dashed border-2 bg-slate-50/50">
            <div className="max-w-md mx-auto space-y-4">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-[#1E6FD9]">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">No New Matches Yet</h3>
              <p className="text-slate-500">
                The AI match engine runs at 3:00 PM Pacific daily. Check back then or browse the marketplace to find bids manually.
              </p>
              <Button asChild variant="outline" className="mt-4 border-slate-300">
                <Link href="/portal/bids">Browse All Open Bids</Link>
              </Button>
            </div>
          </Card>
        )}
      </section>

      {/* Marketing / Analytics Teaser */}
      <div className="grid md:grid-cols-2 gap-6 pt-8">
        <Card className="p-6 bg-[#0B1F3A] text-white border-none shadow-xl">
          <h3 className="text-lg font-bold mb-2">Want to win more?</h3>
          <p className="text-blue-100/60 text-sm mb-6">
            Our strategic advisors can handle your entire bid submission—from technical writing to prevailing wage compliance.
          </p>
          <Button asChild className="bg-[#1E6FD9] hover:bg-blue-600 border-none w-full sm:w-auto">
            <Link href="/portal/hire">Explore Managed Bidding</Link>
          </Button>
        </Card>

        <Card className="p-8 border-slate-200 col-span-full">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Market Opportunity Intelligence</h3>
              <p className="text-sm text-slate-500 font-medium italic">"Data-driven insights to guide your next strategic bid."</p>
            </div>
            <Badge variant="secondary" className="bg-brand-blue-600/10 text-brand-blue-600 border-none font-bold">LIVE MARKET DATA</Badge>
          </div>
          <MarketInsights />
        </Card>
      </div>
    </div>
  );
}
