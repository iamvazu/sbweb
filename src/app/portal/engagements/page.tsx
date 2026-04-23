"use client";

import React, { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

// Version: 1.1.0 - Functional Engagements List
import { CheckCircle2, FileSearch, ArrowRight, ShieldCheck, Clock, FileText, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function EngagementsPage() {
  const [engagements, setEngagements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadEngagements() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('service_engagements')
        .select(`
          *,
          bids (event_name, event_id, end_date)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setEngagements(data || []);
      setLoading(false);
    }
    loadEngagements();
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-brand-navy-900 tracking-tight">Active Engagements</h1>
          <p className="text-slate-500 font-medium italic text-sm">Tracking your expert-managed bid submissions.</p>
        </div>
        <Button asChild className="bg-brand-navy-900 rounded-xl font-bold">
          <Link href="/portal/hire">Hire for new bid</Link>
        </Button>
      </div>

      {engagements.length === 0 ? (
        <Card className="border-2 border-dashed border-slate-200 rounded-[2.5rem] p-12 text-center bg-white">
          <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Handshake className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-brand-navy-900 mb-2">No active engagements</h3>
          <p className="text-slate-500 max-w-sm mx-auto mb-8 font-medium">
            You haven't hired us for a bid submission yet. Browse matches to find your next opportunity.
          </p>
          <Button asChild className="bg-brand-blue-600 rounded-xl px-8 h-12 font-bold">
            <Link href="/portal/matches">Browse My Matches</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6">
          {engagements.map((e) => (
            <Card key={e.id} className="border-none shadow-xl shadow-brand-blue-600/5 rounded-[2.5rem] overflow-hidden bg-white hover:shadow-2xl hover:shadow-brand-blue-600/10 transition-all group">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="p-8 flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest bg-slate-50 border-slate-200">
                          {e.tier.replace('_', ' ')}
                        </Badge>
                        <h3 className="text-xl font-black text-brand-navy-900 leading-tight">
                          {e.bids?.event_name || 'Expert Consultation'}
                        </h3>
                        <p className="text-xs font-mono text-slate-400">{e.bids?.event_id || 'N/A'}</p>
                      </div>
                      <Badge className={cn("text-[10px] font-black uppercase px-3 h-6", 
                        e.status === 'intake' ? 'bg-blue-100 text-blue-600' :
                        e.status === 'in_progress' ? 'bg-amber-100 text-amber-600' :
                        e.status === 'complete' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'
                      )}>
                        {e.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-50">
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Paid Amount</p>
                        <p className="text-sm font-bold text-brand-navy-900">${e.price_agreed.toLocaleString()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Date Hired</p>
                        <p className="text-sm font-bold text-brand-navy-900">{new Date(e.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Assigned To</p>
                        <p className="text-sm font-bold text-brand-navy-900">{e.assigned_to || 'Assigning Advisor...'}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Next Step</p>
                        <p className="text-sm font-bold text-brand-blue-600 italic">
                          {e.status === 'intake' ? 'Kickoff Call' : 
                           e.status === 'in_progress' ? 'Technical Writing' : 'Project Complete'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-8 flex flex-col justify-center items-center gap-4 border-l border-slate-100 md:w-64">
                    <Button variant="outline" className="w-full rounded-xl font-bold bg-white border-slate-200">
                      <FileText className="w-4 h-4 mr-2" /> Documents
                    </Button>
                    <Button asChild className="w-full rounded-xl font-bold bg-brand-navy-900 shadow-lg shadow-brand-navy-900/20">
                      <Link href={`/portal/pipeline`}>
                        Track Pipeline <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Trust Quote */}
      <div className="bg-brand-blue-50/50 p-8 rounded-[2.5rem] border border-brand-blue-100 text-center italic text-brand-blue-600/60 font-medium text-sm">
        "Our strategic advisors are now analyzing your selected bids for full DIR and Prevailing Wage compliance."
      </div>
    </div>
  );
}
