"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { BidCard } from "@/components/portal/bid-ui";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Kanban, FileText, CheckCircle2, Clock, Trash2, ArrowRightCircle } from "lucide-react";
import { updateMatchStage } from "@/app/actions/bids";
import { useToast } from "@/hooks/use-toast";

export default function PipelinePage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadPipeline() {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("user_bid_matches")
        .select(`
          *,
          bids (*)
        `)
        .eq("user_id", user.id)
        .neq("pipeline_stage", "passed")
        .order("last_updated", { ascending: false });

      setMatches(data || []);
      setIsLoading(false);
    }
    loadPipeline();
  }, [supabase]);

  const handleMove = async (matchId: string, nextStage: string) => {
    try {
      await updateMatchStage(matchId, nextStage);
      // Update local state for immediate feedback
      setMatches(matches.map(m => m.id === matchId ? { ...m, pipeline_stage: nextStage } : m));
    } catch (error) {
      console.error("Failed to move bid:", error);
    }
  };

  const stages = [
    { id: "new_match", label: "New Matches", icon: Clock, color: "text-blue-500" },
    { id: "reviewing", label: "Reviewing", icon: FileText, color: "text-amber-500" },
    { id: "pursuing", label: "Pursuing", icon: Kanban, color: "text-purple-500" },
    { id: "submitted", label: "Submitted", icon: CheckCircle2, color: "text-teal-500" },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[600px]">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-full w-full rounded-xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0B1F3A]">Bid Pipeline</h1>
        <Badge variant="outline" className="font-bold text-slate-400">
          {matches.length} ACTIVE BIDS
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stages.map((stage) => {
          const stageMatches = matches.filter(m => m.pipeline_stage === stage.id);
          return (
            <div key={stage.id} className="flex flex-col h-[700px] bg-slate-100/50 rounded-2xl border p-3 border-transparent hover:border-slate-200 transition-colors">
              <div className="flex items-center justify-between px-2 mb-4">
                <div className="flex items-center gap-2">
                  <stage.icon className={`h-4 w-4 ${stage.color}`} />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">{stage.label}</h3>
                </div>
                <Badge className="bg-white text-slate-600 border shadow-sm text-[10px] h-5 px-1.5">{stageMatches.length}</Badge>
              </div>

              <ScrollArea className="flex-1 pr-3">
                <div className="space-y-3 pb-4">
                  {stageMatches.length > 0 ? (
                    stageMatches.map((m) => (
                      <PipelineCard 
                        key={m.id} 
                        match={m} 
                        onMove={(next) => handleMove(m.id, next)}
                        stages={stages}
                      />
                    ))
                  ) : (
                    <div className="py-12 text-center">
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">Empty Stage</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PipelineCard({ match, onMove, stages }: { match: any, onMove: (next: string) => void, stages: any[] }) {
  const bid = match.bids;
  const currentIndex = stages.findIndex(s => s.id === match.pipeline_stage);
  const nextStage = stages[currentIndex + 1];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-[#1E6FD9]/30 transition-all group flex flex-col">
      <div className="cursor-pointer" onClick={() => window.location.href = `/portal/bids/${bid.id}`}>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="text-[9px] font-bold h-4 px-1 rounded-none text-slate-400 border-slate-100">{bid.source}</Badge>
          <span className="text-[10px] font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">FIT: {match.fit_score}%</span>
        </div>
        <h4 className="text-xs font-bold text-slate-800 leading-tight group-hover:text-[#1E6FD9] line-clamp-2 mb-3">
          {bid.event_name}
        </h4>
      </div>

      <div className="flex items-center justify-between pt-2 border-t mt-auto">
        <span className="text-[9px] font-semibold text-slate-400 flex items-center gap-1 uppercase tracking-tighter">
          <Clock className="h-2.5 w-2.5" /> 
          Due {bid.end_date ? new Date(bid.end_date).toLocaleDateString() : 'TBD'}
        </span>
        {nextStage && (
          <button 
            onClick={() => onMove(nextStage.id)}
            className="text-[#1E6FD9] hover:text-blue-700 transition-colors p-1"
            title={`Move to ${nextStage.label}`}
          >
            <ArrowRightCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
