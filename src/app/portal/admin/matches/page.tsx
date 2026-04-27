"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  Star, 
  MapPin, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowRight,
  Filter,
  History,
  Target,
  Mail,
  ChevronDown,
  ChevronUp,
  Building2,
  Calendar,
  Send,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface GroupedMatch {
  bid: {
    id: string;
    event_name: string;
    department_name: string;
    end_date: string;
    estimated_value_max: number;
    portal_link: string;
    dvbe_goal: string;
    sbe_only: boolean;
    comments: string;
  };
  prospects: any[];
}

export default function AdminMatchesPage() {
  const [groupedMatches, setGroupedMatches] = useState<GroupedMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedBids, setExpandedBids] = useState<Set<string>>(new Set());
  const [deployingId, setDeployingId] = useState<string | null>(null);
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    async function loadMatches() {
      const { data, error } = await supabase
        .from('prospect_bid_matches')
        .select(`
          *,
          prospect:prospects(legal_name, email, cert_types, city),
          bid:bids(id, event_name, department_name, end_date, estimated_value_max, portal_link, dvbe_goal, sbe_only, comments)
        `)
        .order('score', { ascending: false });

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        const groups: { [key: string]: GroupedMatch } = {};
        const now = new Date();
        
        // Filter out old bids
        const validData = data?.filter(m => m.bid && new Date(m.bid.end_date) > now);

        validData?.forEach((m) => {
          const bidId = m.bid_id;
          if (!groups[bidId]) {
            groups[bidId] = {
              bid: m.bid as any,
              prospects: []
            };
          }
          groups[bidId].prospects.push({
            id: m.id,
            score: m.score,
            reasons: m.match_reasons,
            details: m.prospect
          });
        });

        const sortedGroups = Object.values(groups).sort((a, b) => {
            const maxA = Math.max(...a.prospects.map(p => p.score));
            const maxB = Math.max(...b.prospects.map(p => p.score));
            return maxB - maxA;
        });

        setGroupedMatches(sortedGroups);
        if (sortedGroups.length > 0) {
            setExpandedBids(new Set([sortedGroups[0].bid.id]));
        }
      }
      setLoading(false);
    }
    loadMatches();
  }, [supabase, toast]);

  const toggleBid = (id: string) => {
    const next = new Set(expandedBids);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedBids(next);
  };

  const handleDeploy = async (matchId: string, prospect: any, bid: any) => {
    setDeployingId(matchId);
    try {
      const res = await fetch("/api/admin/outreach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prospect: prospect.details, bid })
      });
      const result = await res.json();
      
      if (result.success) {
        toast({ 
          title: "Outreach Deployed", 
          description: `Email successfully sent to ${prospect.details?.legal_name}.`,
        });
        
        // Optionally update the status of the match in supabase to "notified"
        await supabase
          .from('prospect_bid_matches')
          .update({ status: 'notified' })
          .eq('id', matchId);
          
      } else {
        throw new Error(result.error);
      }
    } catch (err: any) {
      toast({ title: "Deployment Failed", description: err.message, variant: "destructive" });
    } finally {
      setDeployingId(null);
    }
  };

   const handleSync = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/sync", { method: "POST" });
      const result = await res.json();
      
      if (result.success) {
        toast({ 
          title: "Sync Complete", 
          description: `Generated ${result.userMatches} user matches and ${result.prospectMatches} prospect matches.`,
        });
        window.location.reload();
      } else {
        throw new Error(result.error);
      }
    } catch (err: any) {
      toast({ title: "Sync Failed", description: err.message, variant: "destructive" });
      setLoading(false);
    }
  };

  if (loading) return <MatchesSkeleton />;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F3A]">Solicitation Match Hub</h1>
          <p className="text-sm text-slate-500 mt-1">
             Managing top-tier matches for {groupedMatches.length} active government contracts.
          </p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="border-slate-200 bg-white hover:bg-slate-50">
             <Filter className="w-4 h-4 mr-2" /> Filter RFPs
           </Button>
           <Button 
             onClick={handleSync}
             disabled={loading}
             className="bg-[#1E6FD9] hover:bg-blue-700 text-white"
           >
             {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Target className="w-4 h-4 mr-2" />}
             {loading ? "Syncing..." : "Sync Pipeline"}
           </Button>
        </div>
      </div>

      <div className="space-y-4">
        {groupedMatches.map((group) => (
          <Card key={group.bid.id} className="p-0 border border-slate-200 shadow-sm rounded-xl bg-white overflow-hidden transition-colors hover:border-[#1E6FD9]/30">
            
            {/* Bid Header */}
            <div 
              onClick={() => toggleBid(group.bid.id)}
              className={cn(
                "p-6 cursor-pointer flex flex-col md:flex-row justify-between gap-4",
                expandedBids.has(group.bid.id) ? "bg-slate-50/50 border-b border-slate-100" : ""
              )}
            >
               <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                     <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Active RFP</Badge>
                     <p className="text-xs font-medium text-slate-500 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" /> {group.bid.department_name}
                     </p>
                  </div>
                  <h2 className="text-lg font-semibold text-[#0B1F3A] leading-tight">
                     {group.bid.event_name}
                  </h2>
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                     <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" /> Due: {new Date(group.bid.end_date).toLocaleDateString()}
                     </div>
                     <div className="flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5 text-[#1E6FD9]" /> {group.prospects.length} Direct Matches
                     </div>
                  </div>
               </div>
               <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 bg-white">
                     {expandedBids.has(group.bid.id) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
               </div>
            </div>

            {/* Nested Prospects List */}
            {expandedBids.has(group.bid.id) && (
              <div className="p-6 bg-slate-50/30">
                <div className="grid grid-cols-1 gap-3">
                  {group.prospects.map((p, idx) => (
                    <div key={idx} className="flex flex-col lg:flex-row items-center justify-between p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
                       
                       <div className="flex items-center gap-4 flex-1 w-full lg:w-auto">
                          <div className="flex flex-col items-center justify-center h-12 w-12 rounded-lg bg-blue-50 border border-blue-100">
                             <span className="text-lg font-bold text-blue-700 leading-none">{p.score}</span>
                             <span className="text-[10px] font-medium text-blue-600/70 uppercase">Pts</span>
                          </div>
                          
                          <div className="space-y-1">
                             <h4 className="text-sm font-semibold text-[#0B1F3A]">
                                {p.details?.legal_name}
                             </h4>
                             <div className="flex items-center gap-2">
                                <p className="text-xs text-slate-500">{p.details?.email}</p>
                                <Separator orientation="vertical" className="h-3 bg-slate-300" />
                                <p className="text-xs text-slate-500 flex items-center gap-1">
                                   <MapPin className="w-3 h-3" /> {p.details?.city}
                                </p>
                             </div>
                             <p className="text-[11px] font-medium text-emerald-600 flex items-center gap-1 pt-0.5">
                                <CheckCircle2 className="w-3 h-3" /> {p.reasons?.slice(0, 2).join(" • ")}
                             </p>
                          </div>
                       </div>

                       <div className="flex items-center gap-2 mt-4 lg:mt-0 w-full lg:w-auto">
                          <Button variant="ghost" size="sm" className="hidden lg:flex text-slate-500 hover:text-[#0B1F3A]">
                             <Mail className="w-4 h-4 mr-2" /> Preview
                          </Button>
                          <Button 
                            onClick={() => handleDeploy(p.id, p, group.bid)}
                            disabled={deployingId === p.id}
                            size="sm"
                            className="w-full lg:w-auto bg-[#1E6FD9] hover:bg-blue-700 text-white shadow-sm"
                          >
                             {deployingId === p.id ? (
                               <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                             ) : (
                               <>Deploy Outreach <Send className="w-3.5 h-3.5 ml-2" /></>
                             )}
                          </Button>
                       </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

          </Card>
        ))}
        {groupedMatches.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
            <Target className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-[#0B1F3A]">No Active Matches Found</h3>
            <p className="text-sm text-slate-500">Run the Sync Pipeline to find prospective matches for active bids.</p>
          </div>
        )}
      </div>

    </div>
  );
}

function MatchesSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex justify-between items-end pb-6 border-b border-slate-100">
         <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
         </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    </div>
  );
}
