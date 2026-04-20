
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
  Send
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
  };
  prospects: any[];
}

export default function AdminMatchesPage() {
  const [groupedMatches, setGroupedMatches] = useState<GroupedMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedBids, setExpandedBids] = useState<Set<string>>(new Set());
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    async function loadMatches() {
      // Fetch matches with joined data
      const { data, error } = await supabase
        .from('prospect_bid_matches')
        .select(`
          *,
          prospect:prospects(legal_name, email, cert_types, city),
          bid:bids(id, event_name, department_name, end_date)
        `)
        .order('score', { ascending: false });

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        // Group by Bid ID
        const groups: { [key: string]: GroupedMatch } = {};
        data?.forEach((m) => {
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
            // Sort by highest average score or just date? 
            // Let's sort by the highest single match score in the group
            const maxA = Math.max(...a.prospects.map(p => p.score));
            const maxB = Math.max(...b.prospects.map(p => p.score));
            return maxB - maxA;
        });

        setGroupedMatches(sortedGroups);
        // Expand first bid by default
        if (sortedGroups.length > 0) {
            setExpandedBids(new Set([sortedGroups[0].bid.id]));
        }
      }
      setLoading(false);
    }
    loadMatches();
  }, [supabase]);

  const toggleBid = (id: string) => {
    const next = new Set(expandedBids);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedBids(next);
  };

  const handleDeploy = (prospectName: string) => {
    toast({ 
      title: "Outreach Deployed", 
      description: `Targeting ${prospectName} for this solicitation.`,
    });
  };

  if (loading) return <MatchesSkeleton />;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Header View */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-100 pb-8">
        <div>
          <h1 className="text-4xl font-black text-brand-navy-900 tracking-tighter uppercase italic">
            Solicitation <span className="text-amber-500 underline decoration-4 underline-offset-8">Match Hub</span>
          </h1>
          <p className="text-slate-500 font-medium font-serif italic text-sm mt-3">
             Managing top-tier matches for {groupedMatches.length} active government contracts.
          </p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="rounded-xl border-slate-200 h-10 font-bold text-[10px] uppercase tracking-widest px-6 bg-white hover:bg-slate-50">
             <Filter className="w-3 h-3 mr-2" /> Filter RFPs
           </Button>
           <Button className="rounded-xl bg-brand-navy-900 text-white font-black text-[10px] uppercase tracking-widest h-10 px-6 shadow-xl">
             Sync Pipeline
           </Button>
        </div>
      </div>

      {/* Grouped Feed */}
      <div className="space-y-6">
        {groupedMatches.map((group) => (
          <Card key={group.bid.id} className="border-none shadow-xl shadow-brand-blue-600/5 rounded-[2rem] overflow-hidden bg-white group/card">
            
            {/* Bid Header Card */}
            <div 
              onClick={() => toggleBid(group.bid.id)}
              className={cn(
                "p-8 cursor-pointer transition-colors flex flex-col md:flex-row justify-between gap-6",
                expandedBids.has(group.bid.id) ? "bg-slate-50/50" : "hover:bg-slate-50/30"
              )}
            >
               <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                     <Badge className="bg-brand-navy-900 text-white border-none text-[8px] font-black uppercase tracking-widest px-2 h-4">Active RFP</Badge>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <Building2 className="w-3 h-3" /> {group.bid.department_name}
                     </p>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-brand-navy-900 tracking-tighter leading-none italic max-w-4xl">
                     {group.bid.event_name}
                  </h2>
                  <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                     <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-amber-500" /> Due: {new Date(group.bid.end_date).toLocaleDateString()}
                     </div>
                     <div className="flex items-center gap-2">
                        <Target className="w-3 h-3 text-blue-500" /> {group.prospects.length} Direct Matches
                     </div>
                  </div>
               </div>
               <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full border-2 border-slate-100 flex items-center justify-center text-slate-300 group-hover/card:border-amber-500 group-hover/card:text-amber-500 transition-all">
                     {expandedBids.has(group.bid.id) ? <ChevronUp /> : <ChevronDown />}
                  </div>
               </div>
            </div>

            {/* Nested Prospects List */}
            {expandedBids.has(group.bid.id) && (
              <div className="px-8 pb-8 animate-in slide-in-from-top-2 duration-300">
                <Separator className="mb-8" />
                <div className="grid grid-cols-1 gap-4">
                  {group.prospects.map((p, idx) => (
                    <div key={idx} className="flex flex-col lg:flex-row items-center justify-between p-6 bg-slate-50/50 rounded-3xl border border-slate-100 group/row hover:bg-white hover:shadow-lg hover:shadow-brand-blue-600/5 transition-all">
                       
                       <div className="flex items-center gap-6 flex-1 w-full lg:w-auto">
                          {/* Score Circle */}
                          <div className="flex flex-col items-center justify-center h-14 w-14 rounded-2xl bg-white border border-slate-100 shadow-inner">
                             <span className="text-xl font-black text-amber-500 leading-none">{p.score}</span>
                             <span className="text-[8px] font-black text-slate-400 uppercase">Pts</span>
                          </div>
                          
                          {/* Business Info */}
                          <div className="space-y-1">
                             <h4 className="text-base font-black text-brand-navy-900 uppercase tracking-tighter leading-none">
                                {p.details?.legal_name}
                             </h4>
                             <div className="flex items-center gap-2">
                                <p className="text-[10px] font-bold text-slate-400 italic">{p.details?.email}</p>
                                <Separator orientation="vertical" className="h-2 bg-slate-200" />
                                <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase">
                                   <MapPin className="w-2.5 h-2.5" /> {p.details?.city}
                                </p>
                             </div>
                             {/* Reasons Preview */}
                             <p className="text-[9px] font-bold text-success uppercase tracking-widest pt-1">
                                ✓ {p.reasons?.slice(0, 2).join(" • ")}
                             </p>
                          </div>
                       </div>

                       {/* Action Panel */}
                       <div className="flex items-center gap-3 mt-4 lg:mt-0 w-full lg:w-auto">
                          <Button variant="ghost" className="hidden lg:flex h-10 px-4 rounded-xl text-slate-400 hover:text-brand-navy-900 font-bold text-[10px] uppercase tracking-widest">
                             <Mail className="w-3 h-3 mr-2" /> Preview Email
                          </Button>
                          <Button 
                            onClick={() => handleDeploy(p.details?.legal_name)}
                            className="flex-1 lg:flex-none h-11 px-8 rounded-xl bg-amber-500 text-brand-navy-900 hover:bg-amber-400 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-amber-500/10 group/btn"
                          >
                             Deploy Outreach <Send className="w-3 h-3 ml-2 group-hover/btn:translate-x-0.5 transition-transform" />
                          </Button>
                       </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

          </Card>
        ))}
      </div>

    </div>
  );
}

function MatchesSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex justify-between items-end pb-8 border-b border-slate-100">
         <div className="space-y-3">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-4 w-48" />
         </div>
      </div>
      <div className="space-y-6">
        <Skeleton className="h-40 w-full rounded-[2rem]" />
        <Skeleton className="h-40 w-full rounded-[2rem]" />
      </div>
    </div>
  );
}
