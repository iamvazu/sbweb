
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
  History,
  Target,
  Mail,
  ExternalLink,
  ChevronRight,
  MousePointer2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdminMatchesPage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, high: 0 });
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    async function loadMatches() {
      const { data, error } = await supabase
        .from('prospect_bid_matches')
        .select(`
          *,
          prospect:prospects(legal_name, email, cert_types, city, dba),
          bid:bids(event_name, department_name, end_date, comments, portal_link)
        `)
        .order('score', { ascending: false })
        .limit(50);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        setMatches(data || []);
        if (data && data.length > 0) setSelectedMatch(data[0]);
        
        const high = (data || []).filter(m => m.score >= 80).length;
        setStats({ total: data?.length || 0, high });
      }
      setLoading(false);
    }
    loadMatches();
  }, [supabase]);

  const handleDeploy = (id: string) => {
    toast({ 
      title: "Outreach Deployed", 
      description: `Personalized email sent to ${(selectedMatch.prospect as any)?.legal_name}.`, 
      variant: "default" 
    });
  };

  if (loading) return <MatchesSkeleton />;

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col space-y-6 animate-in fade-in duration-700">
      
      {/* Header Bar */}
      <div className="flex justify-between items-end border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-brand-navy-900 tracking-tighter uppercase italic">
            Match <span className="text-amber-500 underline decoration-2 underline-offset-4">Mission Control</span>
          </h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">
            21.2k Prospects Scanned • 50 Active High-Confidence Pairs
          </p>
        </div>
        <div className="flex gap-3">
          <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-500 font-bold px-3 py-1.5 rounded-lg flex items-center gap-2">
            <History className="w-3 h-3" /> Last Run: 2 hrs ago
          </Badge>
          <Button className="rounded-xl bg-brand-navy-900 text-white font-black text-[10px] uppercase tracking-widest h-10 px-6 shadow-xl shadow-brand-navy-900/10">
            Re-Sync Engine
          </Button>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="flex-1 overflow-hidden grid grid-cols-12 gap-8">
        
        {/* Left: Opportunity List (5 columns) */}
        <div className="col-span-12 lg:col-span-5 h-full flex flex-col space-y-4">
           <div className="flex justify-between items-center px-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Opportunities</p>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                 <Filter className="w-3 h-3" /> Sorting by Score
              </div>
           </div>
           <ScrollArea className="flex-1 pr-4">
              <div className="space-y-3">
                {matches.map((match) => (
                  <button
                    key={match.id}
                    onClick={() => setSelectedMatch(match)}
                    className={cn(
                      "w-full text-left transition-all duration-200 p-5 rounded-2xl border-2 flex items-center justify-between group",
                      selectedMatch?.id === match.id 
                        ? "bg-white border-amber-500 shadow-xl shadow-amber-500/10 scale-[1.02]" 
                        : "bg-slate-50 border-transparent hover:border-slate-200 text-slate-600"
                    )}
                  >
                    <div className="space-y-1 overflow-hidden">
                       <div className="flex items-center gap-2">
                          <span className={cn(
                            "text-lg font-black tracking-tighter",
                            match.score >= 80 ? "text-amber-600" : "text-slate-400"
                          )}>
                             {match.score}
                          </span>
                          <p className="text-xs font-black text-brand-navy-900 truncate pr-4">
                             {(match.prospect as any)?.legal_name || "Unknown Business"}
                          </p>
                       </div>
                       <p className="text-[10px] font-medium text-slate-400 truncate italic">
                          {(match.bid as any)?.event_name}
                       </p>
                    </div>
                    <ChevronRight className={cn(
                       "w-4 h-4 transition-transform group-hover:translate-x-1",
                       selectedMatch?.id === match.id ? "text-amber-500" : "text-slate-300"
                    )} />
                  </button>
                ))}
              </div>
           </ScrollArea>
        </div>

        {/* Right: Command Panel (7 columns) */}
        <div className="col-span-12 lg:col-span-7 h-full">
           {selectedMatch ? (
             <Card className="h-full border-none shadow-2xl shadow-brand-blue-600/5 rounded-[2.5rem] overflow-hidden flex flex-col">
                <CardHeader className="p-8 bg-slate-50/50 border-b border-slate-100 flex flex-row items-center justify-between">
                   <div className="space-y-2">
                      <div className="flex items-center gap-3">
                         <Badge className="bg-amber-500 text-white border-none text-[8px] font-black uppercase tracking-widest px-2 h-4">High Match</Badge>
                         <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase">
                            <MapPin className="w-3 h-3 text-amber-500" /> {(selectedMatch.prospect as any)?.city || "California"}
                         </p>
                      </div>
                      <h2 className="text-2xl font-black text-brand-navy-900 tracking-tighter leading-none">
                         {(selectedMatch.prospect as any)?.legal_name}
                      </h2>
                      <p className="text-xs text-slate-400 font-bold">{(selectedMatch.prospect as any)?.email}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Match Score</p>
                      <p className="text-5xl font-black text-amber-500 tracking-tighter leading-none">{selectedMatch.score}</p>
                   </div>
                </CardHeader>
                
                <CardContent className="flex-1 p-8 grid grid-cols-2 gap-10 overflow-hidden">
                   
                   {/* Left Col: Logic & Rationale */}
                   <div className="space-y-8 overflow-y-auto pr-4">
                      <section className="space-y-4">
                         <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-success" /> Confidence Rationale
                         </h4>
                         <div className="space-y-2">
                            {selectedMatch.match_reasons?.map((reason: string, i: number) => (
                              <div key={i} className="bg-slate-50 p-3 rounded-xl flex items-center gap-3 border border-slate-100/50">
                                 <div className="h-1 w-1 rounded-full bg-amber-500" />
                                 <p className="text-xs font-bold text-slate-600 tracking-tight">{reason}</p>
                              </div>
                            ))}
                         </div>
                      </section>

                      <section className="space-y-4">
                         <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Briefcase className="w-3 h-3 text-brand-blue-600" /> Professional Fit
                         </h4>
                         <div className="flex flex-wrap gap-2">
                            {(selectedMatch.prospect as any)?.cert_types?.map((c: string) => (
                              <Badge key={c} variant="secondary" className="text-[9px] font-black bg-brand-navy-900 text-white px-2 py-0.5 rounded-md uppercase">
                                 {c}
                              </Badge>
                            ))}
                         </div>
                      </section>
                   </div>

                   {/* Right Col: Target Bid Details */}
                   <div className="space-y-8 overflow-y-auto pr-2">
                      <div className="bg-brand-navy-900 rounded-3xl p-6 text-white space-y-6 shadow-2xl">
                         <div className="flex justify-between items-start">
                            <Badge className="bg-white/10 text-white border-none text-[8px] font-black uppercase tracking-widest px-2 h-4">Subject Bid</Badge>
                            <span className="text-[9px] font-bold text-blue-200/60 uppercase">{(selectedMatch.bid as any)?.department_name}</span>
                         </div>
                         <h4 className="text-sm font-bold leading-tight italic line-clamp-3">
                            {(selectedMatch.bid as any)?.event_name}
                         </h4>
                         <Separator className="bg-white/10" />
                         <div className="space-y-3">
                            <div className="flex justify-between items-center text-[10px] font-bold">
                               <span className="text-blue-200/40">CLOSING DATE</span>
                               <span>{new Date((selectedMatch.bid as any)?.end_date).toLocaleDateString()}</span>
                            </div>
                            <Button variant="ghost" className="w-full text-white hover:bg-white/5 border border-white/10 rounded-xl h-8 text-[9px] font-black uppercase tracking-widest">
                               View Portal Link <ExternalLink className="w-3 h-3 ml-2" />
                            </Button>
                         </div>
                      </div>

                      {/* Email Preview Snippet */}
                      <div className="space-y-4">
                         <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Mail className="w-3 h-3 text-amber-500" /> Outreach Preview
                         </h4>
                         <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-[11px] font-medium text-slate-500 italic leading-relaxed">
                            "Hi {(selectedMatch.prospect as any)?.legal_name?.split(' ')[0]}, we found a {(selectedMatch.bid as any)?.event_name.toLowerCase().substring(0, 30)}... contract matched to your certifications and service area..."
                         </div>
                      </div>
                   </div>

                </CardContent>

                <div className="p-8 bg-slate-50/50 border-t border-slate-100">
                   <Button 
                     onClick={() => handleDeploy(selectedMatch.id)}
                     className="w-full bg-amber-500 text-brand-navy-900 hover:bg-amber-400 rounded-2xl font-black text-sm uppercase tracking-widest h-14 shadow-2xl shadow-amber-500/20 group"
                   >
                     Deploy Personalized Outreach <MousePointer2 className="w-4 h-4 ml-3 group-hover:scale-110 transition-transform" />
                   </Button>
                </div>
             </Card>
           ) : (
             <div className="h-full flex items-center justify-center bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[2.5rem]">
                <div className="text-center space-y-2">
                   <Target className="w-10 h-10 text-slate-200 mx-auto" />
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select an opportunity to command</p>
                </div>
             </div>
           )}
        </div>

      </div>

    </div>
  );
}

function MatchesSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex justify-between items-end border-b border-slate-200 pb-6">
         <div className="space-y-2">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-3 w-48" />
         </div>
         <Skeleton className="h-10 w-32 rounded-xl" />
      </div>
      <div className="flex-1 grid grid-cols-12 gap-8">
        <div className="col-span-5 space-y-4">
           <Skeleton className="h-4 w-32" />
           <Skeleton className="h-20 w-full rounded-2xl" />
           <Skeleton className="h-20 w-full rounded-2xl" />
           <Skeleton className="h-20 w-full rounded-2xl" />
        </div>
        <div className="col-span-7 h-full">
           <Skeleton className="h-full w-full rounded-[2.5rem]" />
        </div>
      </div>
    </div>
  );
}
