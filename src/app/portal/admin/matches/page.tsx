
"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  Star, 
  Search, 
  MapPin, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowRight,
  Filter,
  Users,
  Briefcase,
  History
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export default function AdminMatchesPage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, high: 0, notified: 0 });
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    async function loadMatches() {
      // Load Matches with Bid and Prospect details
      const { data, error } = await supabase
        .from('prospect_bid_matches')
        .select(`
          *,
          prospects:prospect_id(legal_name, email, cert_types, city),
          bids:bid_id(event_name, department_name, end_date)
        `)
        .order('score', { ascending: false })
        .limit(50);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        setMatches(data || []);
        
        // Calculate basic stats
        const high = (data || []).filter(m => m.score >= 80).length;
        setStats({ total: data?.length || 0, high, notified: 0 });
      }
      setLoading(false);
    }

    loadMatches();
  }, [supabase]);

  const handleNotify = (id: string) => {
    toast({ title: "Mock Notification", description: "This would trigger a Resend email to the prospect." });
  };

  if (loading) return <MatchesSkeleton />;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-brand-navy-900 tracking-tighter uppercase italic">
            Prospect <span className="text-amber-500 underline decoration-4 underline-offset-8">Matches</span>
          </h1>
          <p className="text-slate-500 font-medium font-serif italic text-sm mt-2">
            Pairing {stats.total}+ high-intent prospects with available government solicitations.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl border-slate-200 font-bold text-xs uppercase tracking-widest h-10 px-6">
            <Filter className="w-3 h-3 mr-2" /> Filter
          </Button>
          <Button className="rounded-xl bg-amber-500 hover:bg-amber-600 font-black text-xs uppercase tracking-widest h-10 px-6 shadow-lg shadow-amber-500/20">
            Run Matcher
          </Button>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Active Pairs", value: stats.total, icon: Star, color: "text-amber-500" },
          { label: "High Confidence (80+)", value: stats.high, icon: CheckCircle2, color: "text-success" },
          { label: "Daily Output", value: "~2.4k", icon: History, color: "text-blue-500" },
        ].map((s) => (
          <Card key={s.label} className="border-none shadow-xl shadow-brand-blue-600/5 rounded-3xl bg-white/50 backdrop-blur-sm">
             <CardContent className="p-6 flex items-center justify-between">
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                   <p className="text-3xl font-black text-brand-navy-900 leading-none">{s.value}</p>
                </div>
                <div className={cn("h-12 w-12 rounded-2xl bg-white shadow-inner flex items-center justify-center", s.color)}>
                   <s.icon className="w-5 h-5" />
                </div>
             </CardContent>
          </Card>
        ))}
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {matches.map((match) => (
          <Card key={match.id} className="border-none shadow-lg shadow-brand-blue-600/5 hover:shadow-xl transition-all duration-300 rounded-[2rem] overflow-hidden group">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                
                {/* Score Panel */}
                <div className={cn(
                  "p-8 lg:w-48 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-100",
                  match.score >= 80 ? "bg-amber-50" : "bg-slate-50"
                )}>
                  <div className="relative">
                     <span className={cn(
                       "text-5xl font-black tracking-tighter",
                       match.score >= 80 ? "text-amber-600" : "text-slate-400"
                     )}>
                       {match.score}
                     </span>
                     <span className="text-[10px] font-black absolute -top-1 -right-4 text-slate-400">PTS</span>
                  </div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Similarity</p>
                </div>

                {/* Content Panel */}
                <div className="p-8 flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  
                  {/* Prospect Detail */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                       <Badge variant="outline" className="text-[9px] font-black uppercase tracking-tighter text-blue-600 bg-blue-50 border-none">Prospect</Badge>
                       <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {match.prospects?.city}
                       </p>
                    </div>
                    <h3 className="text-xl font-black text-brand-navy-900 tracking-tight leading-tight group-hover:text-amber-600 transition-colors">
                       {match.prospects?.legal_name}
                    </h3>
                    <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                       {match.prospects?.cert_types?.map((c: string) => (
                         <Badge key={c} variant="secondary" className="text-[8px] font-black bg-slate-100/50 text-slate-500 border-none whitespace-nowrap">
                            {c}
                         </Badge>
                       ))}
                    </div>
                  </div>

                  {/* Match Logic Visualization */}
                  <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100/50">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                       <ShieldAlert className="w-3 h-3" /> Match Rationale
                    </p>
                    <div className="space-y-2">
                       {match.match_reasons?.map((reason: string, i: number) => (
                         <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                            {reason}
                         </div>
                       ))}
                    </div>
                  </div>

                </div>

                {/* Target Bid Panel */}
                <div className="p-8 lg:w-80 bg-brand-navy-900 text-white flex flex-col justify-between">
                   <div className="space-y-4">
                      <div className="flex justify-between items-start">
                         <Badge className="bg-white/10 text-white border-none text-[9px] font-bold uppercase hover:bg-white/20">Target Solicitation</Badge>
                         <p className="text-[10px] font-bold text-blue-200/60 uppercase">{match.bids?.department_name}</p>
                      </div>
                      <h4 className="text-sm font-black leading-tight line-clamp-2 italic">
                         {match.bids?.event_name}
                      </h4>
                      <Separator className="bg-white/10" />
                      <div className="flex justify-between items-center text-[10px] font-bold text-blue-200/60">
                         <span>CLOSING DATE</span>
                         <span className="text-white">{new Date(match.bids?.end_date).toLocaleDateString()}</span>
                      </div>
                   </div>
                   <Button 
                     onClick={() => handleNotify(match.id)}
                     className="w-full mt-6 bg-white text-brand-navy-900 hover:bg-slate-100 rounded-xl font-black text-[10px] uppercase tracking-widest h-10 shadow-lg shadow-black/20"
                   >
                     Approve outreach <ArrowRight className="w-3 h-3 ml-2" />
                   </Button>
                </div>

              </div>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}

function MatchesSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
         <div className="space-y-2">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-4 w-48" />
         </div>
         <Skeleton className="h-10 w-32 rounded-xl" />
      </div>
      <div className="grid grid-cols-3 gap-6">
        <Skeleton className="h-28 rounded-3xl" />
        <Skeleton className="h-28 rounded-3xl" />
        <Skeleton className="h-28 rounded-3xl" />
      </div>
      <div className="space-y-6">
        <Skeleton className="h-64 rounded-[2rem]" />
        <Skeleton className="h-64 rounded-[2rem]" />
      </div>
    </div>
  );
}
