"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  ExternalLink, 
  AlertCircle,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Download,
  Info,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export default function BidDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function fetchBid() {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const adminEmails = ['roy@strongerbuilt.us', 'crazyme2207@gmail.com'];
        setIsAdmin(user.email?.endsWith('@strongerbuilt.us') || adminEmails.includes(user.email || ''));
      } else {
        setIsAdmin(false);
      }

      const { data: bid, error } = await supabase
        .from("bids")
        .select(`
          *,
          prospect_bid_matches (
            id,
            score,
            match_reasons,
            prospect:prospects (
              id,
              legal_name,
              email,
              city,
              cert_types
            )
          )
        `)
        .eq("id", id)
        .single();

      if (error) {
        toast({ title: "Error", description: "Could not load bid details.", variant: "destructive" });
        router.push("/portal/bids");
      } else {
        // Sort matches by score descending
        if (bid.prospect_bid_matches) {
          bid.prospect_bid_matches.sort((a: any, b: any) => b.score - a.score);
        }
        setData(bid);
      }
      setLoading(false);
    }
    fetchBid();
  }, [id, supabase, router, toast]);

  if (loading) return <BidDetailSkeleton />;

  const bid = data;
  const matches = bid.prospect_bid_matches || [];
  
  // REAL DATA PRIORITY: Only show AI plan if it exists in DB
  const aiPlan = bid.bid_plan;
  const hasValidPlan = !!aiPlan && !!aiPlan.title;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Back & Breadcrumb */}
      <button 
        onClick={() => router.back()} 
        className="flex items-center gap-2 text-slate-500 hover:text-brand-blue-600 font-bold text-xs uppercase tracking-widest transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Results
      </button>

      {/* Hero Header */}
      <div className="grid grid-cols-1 gap-8 items-start">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="bg-white text-slate-500 uppercase font-black text-[9px] h-5 mb-1">
              {bid.source}
            </Badge>
            <Badge className="bg-brand-blue-600/10 text-brand-blue-600 border-brand-blue-600/20 uppercase font-black text-[9px] h-5 mb-1">
              {bid.status}
            </Badge>
          </div>
          <h1 className="text-3xl font-black text-brand-navy-900 leading-tight">
            {bid.event_name}
          </h1>
          <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-500">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-blue-600" />
              {bid.department_name}
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-blue-600" />
              ID: {bid.event_id}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-blue-600" />
              Published: {bid.published_date ? bid.published_date : 'TBD'}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-blue-600" />
              Due: {bid.end_date ? new Date(bid.end_date).toLocaleString('en-US', { timeZone: 'UTC', month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' PDT' : 'TBD'}
            </div>
            {bid.event_version && (
              <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-bold px-2 py-0 h-5">
                v{bid.event_version}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Main Content & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Deep Analysis */}
        <div className="lg:col-span-2 space-y-8">
          <Tabs defaultValue="intelligence" className="w-full">
            <TabsList className="bg-slate-100 p-1 rounded-2xl h-12 w-full max-w-md">
              <TabsTrigger value="intelligence" className="rounded-xl flex-1 text-xs font-bold uppercase tracking-widest">
                <Lightbulb className="w-3.5 h-3.5 mr-2" />
                Intelligence
              </TabsTrigger>
              <TabsTrigger value="requirements" className="rounded-xl flex-1 text-xs font-bold uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5 mr-2" />
                Compliance
              </TabsTrigger>
              <TabsTrigger value="docs" className="rounded-xl flex-1 text-xs font-bold uppercase tracking-widest">
                <Download className="w-3.5 h-3.5 mr-2" />
                Docs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="intelligence" className="mt-8 space-y-8">
              {/* RAW SOLICITATION SNAPPET */}
              <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem]">
                <CardHeader className="p-8 pb-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Official Solicitation Summary</h3>
                    <CardTitle className="text-xl font-black text-brand-navy-900">Project Description</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                    <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-line text-sm bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        {bid.comments || "No full description provided by agency."}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className="bg-white border rounded-xl p-4 flex items-center gap-3">
                            <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                                <Info className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-black text-slate-400">Main Contact</p>
                                <p className="text-sm font-bold text-slate-800">{bid.contact_name || "Check Official Portal"}</p>
                            </div>
                        </div>
                        <div className="bg-white border rounded-xl p-4 flex items-center gap-3">
                            <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                                <FileText className="h-5 w-5" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-[10px] uppercase font-black text-slate-400">Contact Details</p>
                                <p className="text-sm font-bold text-slate-800 truncate">{bid.contact_email || "N/A"}</p>
                                {bid.contact_phone && (
                                    <p className="text-[10px] font-bold text-brand-blue-600">{bid.contact_phone}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        {/* UNSPSC CODES */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">UNSPSC Classifications</h3>
                            <div className="space-y-2">
                                {bid.unspsc_codes && bid.unspsc_codes.length > 0 ? (
                                    bid.unspsc_codes.map((item: any, i: number) => (
                                        <div key={i} className="flex flex-col p-3 bg-slate-50 border border-slate-100 rounded-xl">
                                            <span className="text-[10px] font-black text-brand-blue-600">{item.code}</span>
                                            <span className="text-xs font-bold text-slate-700">{item.description}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs font-bold text-slate-400 italic">No specific codes identified.</p>
                                )}
                            </div>
                        </div>

                        {/* SERVICE AREAS */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Geographic Service Areas</h3>
                            <div className="flex flex-wrap gap-2">
                                {bid.service_areas && bid.service_areas.length > 0 ? (
                                    bid.service_areas.map((area: any, i: number) => (
                                        <Badge key={i} variant="secondary" className="bg-white border-slate-200 text-slate-600 font-bold">
                                            {area.county || area.id}
                                        </Badge>
                                    ))
                                ) : (
                                    <p className="text-xs font-bold text-slate-400 italic">Location details pendng.</p>
                                )}
                            </div>
                            
                            {bid.event_format_type && (
                                <div className="pt-4">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Event Format / Type</h3>
                                    <Badge className="bg-brand-navy-900/5 text-brand-navy-900 border-none font-bold uppercase text-[10px]">
                                        {bid.event_format_type}
                                    </Badge>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
              </Card>

              {/* ONLY RENDER AI IF IT EXISTS */}
              {hasValidPlan && (
                <>
                  <Card className="border-none shadow-xl shadow-brand-blue-600/5 overflow-hidden rounded-[2rem]">
                    <CardHeader className="bg-slate-50/50 p-8 border-b">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-6 h-6 text-brand-blue-600" />
                        <div>
                          <CardTitle className="text-xl font-black text-brand-navy-900">{aiPlan.title}</CardTitle>
                          <CardDescription className="font-medium">Curated strategic recommendations generated by BidIQ Agentic AI.</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8">
                      <div className="space-y-6">
                        {(aiPlan.strategic_plan || aiPlan.strategy || []).map((step: string, i: number) => (
                          <div key={i} className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-blue-600/10 text-brand-blue-600 flex items-center justify-center font-black text-xs">
                              {i + 1}
                            </div>
                            <p className="text-slate-600 font-medium leading-relaxed">{step}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-none shadow-sm bg-success/5 border-success/10 rounded-2xl">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-black flex items-center gap-2 text-success uppercase tracking-widest">
                          <CheckCircle2 className="w-4 h-4" /> Strong Fit Indicators
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {(aiPlan.fit_indicators || aiPlan.strengths || []).map((m: string) => (
                          <div key={m} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                            <ChevronRight className="w-3 h-3 text-success" /> {m}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm bg-warning/5 border-warning/10 rounded-2xl">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-black flex items-center gap-2 text-warning uppercase tracking-widest">
                          <AlertCircle className="w-4 h-4" /> Potential Risks
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {(aiPlan.risks || []).map((risk: string) => (
                            <div key={risk} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                <ChevronRight className="w-3 h-3 text-warning" /> {risk}
                            </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="requirements" className="mt-8">
              <Card className="border-none shadow-xl shadow-brand-blue-600/5 rounded-[2rem]">
                <CardContent className="p-8 space-y-6 font-medium text-slate-600">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Project Requirements</h3>
                      <div className="flex items-center justify-between py-2 border-b border-dashed">
                        <span>Prevailing Wage</span>
                        <Badge variant={bid.prevailing_wage ? "default" : "outline"} className={bid.prevailing_wage ? "bg-amber-100 text-amber-700" : ""}>
                          {bid.prevailing_wage ? "YES" : "NO"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-dashed">
                        <span>Bonding Required</span>
                        <Badge variant={bid.bonding_required ? "default" : "outline"}>
                          {bid.bonding_required ? "YES" : "NO"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-dashed">
                        <span>Mandatory Pre-Bid</span>
                        <Badge variant={bid.mandatory_prebid ? "default" : "outline"}>
                          {bid.mandatory_prebid ? "YES" : "NO"}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Participation Goals</h3>
                      <div className="flex items-center justify-between py-2 border-b border-dashed">
                        <span>DVBE Goal</span>
                        <span className="font-bold text-brand-navy-900">{bid.dvbe_goal || "0%"}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-dashed">
                        <span>DBE Goal</span>
                        <span className="font-bold text-brand-navy-900">{bid.dbe_goal || "0%"}</span>
                      </div>
                      {bid.contractor_license_type && (
                        <div className="flex items-center justify-between py-2 border-b border-dashed">
                            <span>License Required</span>
                            <span className="font-bold text-brand-blue-600 text-[10px] uppercase">{bid.contractor_license_type}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* PRE-BID DETAILS */}
                  {bid.prebid_date && (
                    <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Pre-Bid Conference Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase">Date & Time</p>
                                <p className="text-sm font-bold text-slate-700">{bid.prebid_date} @ {bid.prebid_time || "TBD"}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase">Location</p>
                                <p className="text-sm font-bold text-slate-700 leading-tight">{bid.prebid_location || "Check Official Portal"}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase">Requirement</p>
                                <Badge variant={bid.mandatory_prebid ? "default" : "outline"} className={bid.mandatory_prebid ? "bg-red-50 text-red-600 border-red-100" : ""}>
                                    {bid.mandatory_prebid ? "MANDATORY" : "NON-MANDATORY"}
                                </Badge>
                            </div>
                        </div>
                        {bid.prebid_comments && (
                            <div className="pt-2 border-t border-slate-200/50">
                                <p className="text-[10px] font-black text-slate-400 uppercase">Instruction / Comments</p>
                                <p className="text-xs font-medium text-slate-600 italic">"{bid.prebid_comments}"</p>
                            </div>
                        )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="docs" className="mt-8">
              <Card className="border-none shadow-xl shadow-brand-blue-600/5 rounded-[2rem]">
                <CardContent className="p-12 text-center space-y-4">
                  <div className="h-16 w-16 bg-brand-blue-600/10 rounded-full flex items-center justify-center mx-auto text-brand-blue-600">
                    <Download className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold">Solicitation Documents</h3>
                  <p className="text-slate-500 max-w-sm mx-auto">Access the full tender documentation and technical specifications for this bid.</p>
                  
                  <div className="grid grid-cols-1 gap-2 max-w-md mx-auto pt-6">
                    {bid.doc_links && bid.doc_links.length > 0 ? (
                        bid.doc_links.map((doc: any, i: number) => (
                            <a 
                                key={i}
                                href={doc.url || doc} 
                                target="_blank"
                                className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <FileText className="w-4 h-4 text-slate-400 group-hover:text-brand-blue-600" />
                                    <span className="text-sm font-bold text-slate-700 truncate max-w-[200px]">
                                        {doc.name || `Solicitation Document ${i+1}`}
                                    </span>
                                </div>
                                <Download className="w-4 h-4 text-slate-300 group-hover:text-brand-blue-600" />
                            </a>
                        ))
                    ) : (
                        <p className="text-xs font-bold text-slate-400 tracking-tight italic">No direct document links identified. Check official portal below.</p>
                    )}
                  </div>

                  <div className="flex justify-center gap-4 pt-8">
                    <Button variant="outline" className="rounded-xl font-bold bg-white h-12 px-6" asChild>
                      <a href={bid.portal_url || bid.portal_link || "#"} target="_blank">
                        View Official Portal <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right: Contextual Sidebar */}
        <div className="space-y-8">
          {isAdmin ? (
            <Card className="border-none shadow-2xl shadow-brand-blue-600/10 overflow-hidden rounded-[2rem] sticky top-24">
              <div className="h-2 bg-brand-blue-600" />
              <CardHeader className="bg-slate-50/50 p-8 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-black">Matched Prospects</CardTitle>
                    <CardDescription className="font-semibold">{matches.length} businesses matched this bid.</CardDescription>
                  </div>
                  <div className="h-10 w-10 bg-brand-blue-600/10 rounded-full flex items-center justify-center text-brand-blue-600">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto">
                  {matches.length === 0 ? (
                    <div className="p-8 text-center">
                      <p className="text-sm text-slate-500 font-medium">No matches found for this bid.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {matches.map((m: any) => (
                        <div key={m.id} className="p-6 hover:bg-slate-50 transition-colors">
                          <div className="flex justify-between items-start gap-4">
                            <div className="space-y-1">
                              <h4 className="text-sm font-bold text-brand-navy-900 leading-snug">
                                {m.prospect?.legal_name || "Unknown Business"}
                              </h4>
                              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                                <MapPin className="w-3 h-3" /> {m.prospect?.city || "Unknown Location"}
                              </div>
                              {m.prospect?.cert_types && m.prospect.cert_types.length > 0 && (
                                <div className="flex gap-1 mt-2">
                                  {m.prospect.cert_types.slice(0, 2).map((cert: string) => (
                                    <Badge key={cert} variant="secondary" className="text-[9px] bg-slate-100 text-slate-600">
                                      {cert}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col items-center justify-center h-10 w-10 rounded-lg bg-blue-50 border border-blue-100 flex-shrink-0">
                               <span className="text-sm font-bold text-blue-700 leading-none">{m.score}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-none shadow-2xl shadow-brand-blue-600/10 overflow-hidden rounded-[2rem] sticky top-24">
              <div className="h-2 bg-brand-blue-600" />
              <CardHeader className="bg-slate-50/50 p-8 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-black text-brand-navy-900">Hire Stronger Built</CardTitle>
                    <CardDescription className="font-semibold mt-1">Unlock RFP/IFB writing services</CardDescription>
                  </div>
                  <div className="h-10 w-10 bg-brand-blue-600/10 rounded-full flex items-center justify-center text-brand-blue-600 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="space-y-2">
                  <h3 className="text-4xl font-black text-brand-navy-900 tracking-tighter">$249.00 <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">flat fee</span></h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">Let our expert procurement team handle the complex compliance, documentation, and proposal writing required for this bid.</p>
                </div>
                <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div className="flex items-start gap-3 text-sm font-bold text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Executive Summary Generation
                  </div>
                  <div className="flex items-start gap-3 text-sm font-bold text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Compliance Document Review
                  </div>
                  <div className="flex items-start gap-3 text-sm font-bold text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Pricing Strategy Consultation
                  </div>
                </div>
                <Button className="w-full h-14 rounded-xl text-base font-black uppercase tracking-wide bg-brand-blue-600 hover:bg-brand-blue-700 shadow-xl shadow-brand-blue-600/20 transition-all hover:scale-[1.02]" asChild>
                  <a href={`/portal/hire?bid=${bid.id}`}>
                    Secure This Bid <ChevronRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function BidDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-pulse p-8">
      <Skeleton className="h-6 w-32" />
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-3 space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 pt-8">
        <div className="col-span-2 h-[600px] bg-slate-100 rounded-[2rem]" />
        <div className="h-[500px] bg-slate-100 rounded-[2rem]" />
      </div>
    </div>
  );
}
