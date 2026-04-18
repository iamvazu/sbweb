"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { 
  FitScoreBadge, 
  ComplianceFlags 
} from "@/components/portal/bid-ui";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Building, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Download, 
  ExternalLink, 
  FileText, 
  Info, 
  Lock, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Trash2, 
  ChevronLeft,
  Loader2,
  FileSearch,
  CheckCircle,
  XCircle,
  HelpCircle
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export default function BidDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [bid, setBid] = useState<any>(null);
  const [match, setMatch] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [isUpdatingStage, setIsUpdatingStage] = useState(false);
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    async function loadBid() {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: bidData, error } = await supabase
        .from("bids")
        .select(`
          *,
          user_bid_matches (*)
        `)
        .eq("id", id)
        .eq("user_bid_matches.user_id", user.id)
        .single();

      if (error || !bidData) {
        toast({ title: "Bid Not Found", variant: "destructive" });
        router.push("/portal/bids");
        return;
      }

      setBid(bidData);
      setMatch(bidData.user_bid_matches[0]);
      setIsLoading(false);
    }
    loadBid();
  }, [id, supabase, router, toast]);

  const updateStage = async (newStage: string) => {
    setIsUpdatingStage(true);
    const { error } = await supabase
      .from("user_bid_matches")
      .update({ pipeline_stage: newStage, last_updated: new Date().toISOString() })
      .eq("id", match.id);

    if (!error) {
      setMatch({ ...match, pipeline_stage: newStage });
      toast({ title: `Moved to ${newStage.replace('_', ' ')}` });
    }
    setIsUpdatingStage(false);
  };

  const saveNotes = async (v: string) => {
    setIsSavingNotes(true);
    await supabase.from("user_bid_matches").update({ notes: v }).eq("id", match.id);
    setIsSavingNotes(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-8 max-w-7xl mx-auto">
        <Skeleton className="h-4 w-32" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-2/3" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-[400px] w-full" />
          </div>
          <Skeleton className="h-[300px] w-full" />
        </div>
      </div>
    );
  }

  const daysLeft = bid.end_date ? Math.ceil((new Date(bid.end_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) : "N/A";

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Breadcrumb */}
      <Link href="/portal/bids" className="flex items-center text-sm font-medium text-slate-500 hover:text-[#1E6FD9] transition-colors">
        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Marketplace
      </Link>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-2 flex-1">
            <h1 className="text-3xl font-extrabold text-[#0B1F3A] leading-tight">{bid.event_name}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 font-medium">
              <span className="flex items-center gap-1.5"><Building className="h-4 w-4" /> {bid.department_name}</span>
              <span className="flex items-center gap-1.5"><FileSearch className="h-4 w-4" /> ID: {bid.event_id}</span>
              <Badge className="bg-slate-100 text-slate-600 border-none uppercase text-[10px] tracking-widest">{bid.source}</Badge>
            </div>
            <ComplianceFlags bid={bid} />
          </div>
          
          <div className="flex flex-shrink-0 gap-4">
            <div className="text-center p-3 px-6 bg-white border rounded-2xl shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Fit Score</p>
              <FitScoreBadge score={match.fit_score} />
            </div>
          </div>
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBox label="Est. Value" value={bid.estimated_value_min ? `$${(bid.estimated_value_min/1000).toFixed(0)}K – $${(bid.estimated_value_max/1000).toFixed(0)}K` : "TBD"} icon={DollarSign} />
          <StatBox label="Days Remaining" value={daysLeft.toString()} icon={Clock} color={Number(daysLeft) <= 7 ? "text-red-600" : "text-slate-900"} />
          <StatBox label="Due Date" value={bid.end_date ? new Date(bid.end_date).toLocaleDateString() : "No Date"} icon={Calendar} />
          <StatBox label="Buyer Email" value={bid.buyer_email || "Not Listed"} icon={Mail} sub={bid.buyer_name} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details & Intelligence */}
        <div className="lg:col-span-2 space-y-8">
          <Tabs defaultValue="plan" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-12 p-0 gap-8">
              <TabsTrigger value="plan" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#1E6FD9] data-[state=active]:bg-transparent data-[state=active]:text-[#1E6FD9] px-0 h-full font-bold">BID PLAN</TabsTrigger>
              <TabsTrigger value="documents" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#1E6FD9] data-[state=active]:bg-transparent data-[state=active]:text-[#1E6FD9] px-0 h-full font-bold">DOCUMENTS</TabsTrigger>
              <TabsTrigger value="compliance" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#1E6FD9] data-[state=active]:bg-transparent data-[state=active]:text-[#1E6FD9] px-0 h-full font-bold">COMPLIANCE</TabsTrigger>
              <TabsTrigger value="notes" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#1E6FD9] data-[state=active]:bg-transparent data-[state=active]:text-[#1E6FD9] px-0 h-full font-bold">PRIVATE NOTES</TabsTrigger>
            </TabsList>

            <TabsContent value="plan" className="pt-6">
              {bid.bid_plan ? (
                <div className="grid gap-8">
                  <section className="space-y-3">
                    <h3 className="text-lg font-bold flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-[#16A34A]" /> Scope of Work</h3>
                    <p className="text-slate-600 leading-relaxed bg-white p-4 rounded-xl border">{bid.bid_plan.scope_summary}</p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-lg font-bold">SWOT Analysis</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <SwotBox type="Strengths" items={bid.bid_plan.swot.strengths} color="bg-green-50 text-green-700" ring="ring-green-100" />
                      <SwotBox type="Weaknesses" items={bid.bid_plan.swot.weaknesses} color="bg-red-50 text-red-700" ring="ring-red-100" />
                      <SwotBox type="Opportunities" items={bid.bid_plan.swot.opportunities} color="bg-blue-50 text-blue-700" ring="ring-blue-100" />
                      <SwotBox type="Threats" items={bid.bid_plan.swot.threats} color="bg-amber-50 text-amber-700" ring="ring-amber-100" />
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-lg font-bold">Technical Requirements & Strategy</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="border-slate-100 shadow-sm">
                        <CardHeader className="pb-2"><CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">Technical requirements</CardTitle></CardHeader>
                        <CardContent><ul className="space-y-2">{bid.bid_plan.technical_requirements.map((r: string, i: number) => <li key={i} className="text-sm text-slate-700 flex gap-2"><div className="h-1.5 w-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" /> {r}</li>)}</ul></CardContent>
                      </Card>
                      <Card className="border-slate-100 shadow-sm bg-blue-50/30">
                        <CardHeader className="pb-2"><CardTitle className="text-sm font-bold uppercase tracking-wider text-blue-400">Recommended approach</CardTitle></CardHeader>
                        <CardContent><p className="text-sm text-slate-700 italic">"{bid.bid_plan.recommended_approach}"</p></CardContent>
                      </Card>
                    </div>
                  </section>
                </div>
              ) : (
                <div className="text-center py-20 bg-slate-50 rounded-xl border-dashed border-2">
                  <div className="max-w-xs mx-auto space-y-2">
                    <Loader2 className="h-10 w-10 text-slate-300 animate-spin mx-auto" />
                    <h3 className="text-lg font-bold text-slate-800 pt-4">AI Analysis Pending</h3>
                    <p className="text-sm text-slate-500">Our strategic analysts are processing this solicitations documents. Check back after 3:00 PM today.</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="documents" className="pt-6">
              <div className="space-y-4">
                {bid.pdf_urls && bid.pdf_urls.length > 0 ? (
                  bid.pdf_urls.map((url: string, i: number) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white border rounded-xl hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center"><FileText className="h-5 w-5" /></div>
                        <div>
                          <p className="font-bold text-slate-900 truncate max-w-[200px] md:max-w-md">Solicitation Document #{i+1}</p>
                          <p className="text-xs text-slate-400 uppercase font-black tracking-widest">PDF Document</p>
                        </div>
                      </div>
                      <Button asChild variant="ghost" size="sm" className="text-[#1E6FD9]">
                        <a href={url} target="_blank" rel="noopener noreferrer"><Download className="h-4 w-4 mr-2" /> Download</a>
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-12 text-slate-400 font-medium italic">No downloadable documents found for this bid.</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="pt-6">
              <Card className="border overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <th className="px-6 py-4">Requirement</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Value / Links</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <ComplianceRow label="Mandatory Pre-Bid" 
                      status={bid.prebid_type === 'M' ? (isPast(new Date(bid.prebid_date)) ? 'disqualified' : 'warning') : 'success'} 
                      value={bid.prebid_type === 'M' ? new Date(bid.prebid_date).toLocaleString() : (bid.prebid_type === 'NM' ? "Non-mandatory" : "None")} 
                    />
                    <ComplianceRow label="Prevailing Wage" status={bid.prevailing_wage ? 'warning' : 'success'} value={bid.prevailing_wage ? "REQUIRED" : "NOT REQUIRED"} sub={bid.prevailing_wage ? "View wage rates →" : null} link={bid.prevailing_wage ? "https://www.dir.ca.gov/oprl/DPreWageDetermination.htm" : null} />
                    <ComplianceRow label="DVBE Participation" status={bid.dvbe_goal ? 'info' : 'success'} value={bid.dvbe_goal || "N/A"} />
                    <ComplianceRow label="SBE Participation" status={bid.sbe_only ? 'info' : 'success'} value={bid.sbe_only ? "SBE-ONLY" : "OPEN BID"} />
                    <ComplianceRow label="Bonding Required" status={bid.bonding_required ? 'warning' : 'success'} value={bid.bonding_required ? "YES" : "NO"} />
                  </tbody>
                </table>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Private Strategy Notes</h3>
                  {isSavingNotes && <span className="text-[10px] text-blue-400 animate-pulse flex items-center gap-1"><Loader2 className="h-3 w-3 animate-spin" /> Saving...</span>}
                </div>
                <Textarea 
                  className="min-h-[300px] border-slate-200 focus:border-[#1E6FD9] h-[400px]"
                  placeholder="Only you can see these notes. Jot down thoughts on pricing, site walks, or partners..."
                  defaultValue={match.notes}
                  onBlur={(e) => saveNotes(e.target.value)}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column: Actions & Meta */}
        <aside className="space-y-6">
          <Card className="border-slate-200 shadow-lg sticky top-24 overflow-hidden">
            <div className={cn(
              "p-4 border-b text-center",
              match.pipeline_stage === 'new_match' && "bg-blue-50 border-blue-100",
              match.pipeline_stage === 'pursuing' && "bg-purple-50 border-purple-100",
              match.pipeline_stage === 'won' && "bg-green-50 border-green-100"
            )}>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Pipeline Stage</p>
              <Badge className="rounded-sm uppercase text-xs px-3">{match.pipeline_stage.replace('_', ' ')}</Badge>
            </div>

            <CardContent className="p-6 space-y-6">
              <div className="space-y-3">
                {match.pipeline_stage === 'new_match' && (
                  <Button fullWidth onClick={() => updateStage('reviewing')} className="bg-[#1E6FD9]">Move to Reviewing</Button>
                )}
                {match.pipeline_stage === 'reviewing' && (
                  <Button fullWidth onClick={() => updateStage('pursuing')} className="bg-[#7C3AED]">Move to Pursuing</Button>
                )}
                {match.pipeline_stage === 'pursuing' && (
                  <div className="space-y-3">
                    <Button fullWidth onClick={() => updateStage('submitted')} className="bg-[#0D9488]">Mark as Submitted</Button>
                    <div className="p-4 bg-gradient-to-br from-[#1E6FD9] to-[#0B1F3A] rounded-xl text-white space-y-3 mt-4">
                      <p className="text-sm font-bold">Ready to submit?</p>
                      <p className="text-[11px] text-blue-100/70 leading-relaxed italic">Let StrongerBuilt handle the analysis, compliance, site walks, and filing for you.</p>
                      <Button asChild fullWidth variant="secondary" className="bg-white text-blue-900 border-none hover:bg-slate-100 font-bold">
                        <Link href={`/portal/hire?bid=${bid.id}`}>Hire StrongerBuilt →</Link>
                      </Button>
                    </div>
                  </div>
                )}
                {match.pipeline_stage === 'submitted' && (
                  <div className="grid grid-cols-2 gap-2">
                    <Button fullWidth onClick={() => updateStage('won')} className="bg-[#16A34A]">Won ✓</Button>
                    <Button fullWidth onClick={() => updateStage('lost')} variant="outline" className="border-red-200 text-red-600">Lost ×</Button>
                  </div>
                )}
                
                {match.pipeline_stage !== 'passed' && (
                  <Button fullWidth variant="ghost" onClick={() => updateStage('passed')} className="text-slate-400 hover:text-red-500 hover:bg-red-50">
                    <Trash2 className="h-4 w-4 mr-2" /> Pass on this bid
                  </Button>
                )}
              </div>

              <div className="space-y-4 pt-6 border-t text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Marketplace Portal</span>
                  <Badge variant="outline" className="text-[10px] rounded-none">{bid.source}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Event ID</span>
                  <span className="font-bold text-slate-700">{bid.event_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Matched At</span>
                  <span className="text-slate-700">{new Date(match.matched_at).toLocaleDateString()}</span>
                </div>
                <Button asChild variant="outline" fullWidth className="h-10 border-slate-200 mt-4 rounded-xl">
                  <a href={bid.portal_link} target="_blank" rel="noopener noreferrer">
                    Open on Portal <ExternalLink className="h-3.5 w-3.5 ml-2" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function StatBox({ label, value, icon: Icon, sub, color = "text-slate-900" }: any) {
  return (
    <div className="bg-white p-4 rounded-2xl border shadow-sm">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5"><Icon className="h-3 w-3" /> {label}</p>
      <p className={cn("text-lg font-bold truncate", color)}>{value}</p>
      {sub && <p className="text-[10px] text-slate-400 truncate mt-1">{sub}</p>}
    </div>
  );
}

function SwotBox({ type, items, color, ring }: any) {
  return (
    <div className={cn("p-4 rounded-2xl ring-4 ring-offset-0 space-y-2", color, ring)}>
      <h4 className="text-xs font-black uppercase tracking-wider opacity-60">{type}</h4>
      <ul className="space-y-1">
        {items.map((it: string, i: number) => <li key={i} className="text-[11px] font-semibold leading-tight flex gap-1.5">
          <ChevronRight className="h-3 w-3 shrink-0" /> {it}
        </li>)}
      </ul>
    </div>
  );
}

function ComplianceRow({ label, status, value, sub, link }: any) {
  const getIcon = () => {
    if (status === 'success') return <CheckCircle className="h-4 w-4 text-[#16A34A]" />;
    if (status === 'warning') return <HelpCircle className="h-4 w-4 text-[#D97706]" />;
    if (status === 'disqualified') return <XCircle className="h-4 w-4 text-red-600" />;
    return <Info className="h-4 w-4 text-blue-500" />;
  };

  return (
    <tr>
      <td className="px-6 py-4 text-xs font-bold text-slate-700">{label}</td>
      <td className="px-6 py-4 whitespace-nowrap">{getIcon()}</td>
      <td className="px-6 py-4">
        <p className="text-xs font-semibold text-slate-900">{value}</p>
        {link && <a href={link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#1E6FD9] hover:underline block mt-0.5">{sub}</a>}
      </td>
    </tr>
  );
}
