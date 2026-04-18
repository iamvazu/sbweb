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
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { getStrategyForBid } from "@/lib/data/bid-strategies";
import { createCheckoutSession } from "@/app/actions/stripe";
import { updateMatchStage } from "@/app/actions/bids";

export default function BidDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function fetchBid() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: bid, error } = await supabase
        .from("bids")
        .select(`
          *,
          user_bid_matches (*)
        `)
        .eq("id", id)
        .eq("user_bid_matches.user_id", user.id)
        .single();

      if (error) {
        toast({ title: "Error", description: "Could not load bid details.", variant: "destructive" });
        router.push("/portal/bids");
      } else {
        setData(bid);
      }
      setLoading(false);
    }
    fetchBid();
  }, [id, supabase, router, toast]);

  const handleStatusUpdate = async (stage: string) => {
    setIsUpdating(true);
    try {
      await updateMatchStage(match.id, stage);
      toast({ title: "Updated", description: `Bid moved to ${stage.replace('_', ' ')}.` });
      // Minor hack to update local state without full refetch
      setData({ ...data, user_bid_matches: [{ ...match, pipeline_stage: stage }] });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
    setIsUpdating(false);
  };

  if (loading) return <BidDetailSkeleton />;

  const bid = data;
  const match = data.user_bid_matches[0];
  const strategy = getStrategyForBid(bid);
  const daysLeft = bid.end_date ? Math.ceil((new Date(bid.end_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) : null;

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-4">
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
              Due: {bid.end_date ? new Date(bid.end_date).toLocaleDateString() : 'TBD'}
            </div>
          </div>
        </div>

        <Card className="border-none shadow-xl shadow-brand-blue-600/5 bg-brand-navy-900 text-white overflow-hidden rounded-[2rem]">
          <CardContent className="p-8 text-center space-y-4 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue-600/10 rounded-full blur-3xl" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200/60">AI Correlation Score</p>
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48" cy="48" r="40"
                  stroke="currentColor" strokeWidth="8"
                  fill="transparent"
                  className="text-blue-200/5"
                />
                <circle
                  cx="48" cy="48" r="40"
                  stroke="currentColor" strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 - (251.2 * match.fit_score) / 100}
                  className="text-brand-blue-600"
                />
              </svg>
              <span className="absolute text-2xl font-black">{match.fit_score}%</span>
            </div>
            <p className="text-xs font-bold text-blue-100/60 max-w-[180px] mx-auto">
              {match.fit_score > 80 ? "Strategic High-Fit Opportunity" : "Moderate Alignment Opportunity"}
            </p>
          </CardContent>
        </Card>
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
              <Card className="border-none shadow-xl shadow-brand-blue-600/5 overflow-hidden rounded-[2rem]">
                <CardHeader className="bg-slate-50/50 p-8 border-b">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-brand-blue-600" />
                    <div>
                      <CardTitle className="text-xl font-black text-brand-navy-900">{strategy.title}</CardTitle>
                      <CardDescription className="font-medium">Curated strategic recommendations generated by BidIQ.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {strategy.strategic_plan.map((step: string, i: number) => (
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
                    {strategy.fit_score_modifiers.map((m: string) => (
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
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <ChevronRight className="w-3 h-3 text-warning" /> Short Turnaround Time
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <ChevronRight className="w-3 h-3 text-warning" /> High DBE Participation Goal
                    </div>
                  </CardContent>
                </Card>
              </div>
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
                    </div>
                  </div>
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
                  <div className="flex justify-center gap-4 pt-4">
                    <Button variant="outline" className="rounded-xl font-bold bg-white" asChild>
                      <a href={bid.portal_link} target="_blank">
                        View Portal <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                    <Button className="bg-brand-blue-600 rounded-xl font-bold">
                      Download All PDFs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right: Hire Us / Action Bar */}
        <div className="space-y-8">
          
          {/* Tracking Status Card */}
          <Card className="border-none shadow-xl shadow-brand-blue-600/5 rounded-[2rem] overflow-hidden">
            <CardHeader className="bg-slate-50/50 p-6 border-b">
              <CardTitle className="text-sm font-black uppercase tracking-[0.1em]">Pipeline Stage</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'new_match', label: 'New Match', color: 'bg-blue-500' },
                  { id: 'reviewing', label: 'Reviewing', color: 'bg-amber-500' },
                  { id: 'pursuing', label: 'Pursuing', color: 'bg-purple-500' },
                  { id: 'submitted', label: 'Submitted', color: 'bg-teal-500' },
                ].map((s) => (
                  <Button
                    key={s.id}
                    variant={match.pipeline_stage === s.id ? 'default' : 'outline'}
                    onClick={() => handleStatusUpdate(s.id)}
                    disabled={isUpdating}
                    className={`justify-start h-11 rounded-xl font-bold ${match.pipeline_stage === s.id ? 'bg-brand-navy-900 border-transparent' : 'border-slate-100 hover:border-brand-blue-600/20'}`}
                  >
                    <div className={`w-2 h-2 rounded-full mr-3 ${s.color}`} />
                    {s.label}
                    {match.pipeline_stage === s.id && <CheckCircle2 className="w-4 h-4 ml-auto text-white" />}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-2xl shadow-brand-blue-600/10 overflow-hidden rounded-[2rem] sticky top-24">
            <div className="h-2 bg-brand-blue-600" />
            <CardHeader className="bg-slate-50/50 p-8">
              <CardTitle className="text-xl font-black">Hire StrongerBuilt</CardTitle>
              <CardDescription className="font-semibold">Let our experts handle your entire government bid response.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              
              <div className="space-y-4">
                {[
                  { id: 'ifb_express', name: 'IFB Express', price: '$1,500', desc: 'Full submission for Invitations for Bid.' },
                  { id: 'rfp_standard', name: 'RFP Pro', price: '$3,500', desc: 'Technical narrative & strategy for RFPs.' },
                ].map((tier) => (
                  <div 
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${selectedTier === tier.id ? 'border-brand-blue-600 bg-brand-blue-600/5 shadow-inner' : 'border-slate-100 hover:border-brand-blue-600/20'}`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-black text-sm uppercase tracking-tighter">{tier.name}</span>
                      <span className="font-black text-brand-blue-600">{tier.price}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold">{tier.desc}</p>
                  </div>
                ))}
              </div>

              <form action={createCheckoutSession} className="space-y-4">
                <input type="hidden" name="bidId" value={bid.id} />
                <input type="hidden" name="bidName" value={bid.event_name} />
                <input type="hidden" name="tier" value={selectedTier || ''} />
                
                <Button 
                  type="submit" 
                  disabled={!selectedTier}
                  className="w-full bg-brand-navy-900 hover:bg-black text-white h-14 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl disabled:opacity-50"
                >
                  Confirm & Secure Project
                </Button>
              </form>

              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                <ShieldCheck className="w-5 h-5 text-success" />
                <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">
                   Secured by Stripe <br/><span className="text-slate-400 font-bold tracking-normal italic">Verified SDVOSB Professional Service</span>
                </p>
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="p-6 bg-slate-50/50">
              <p className="text-[10px] text-slate-400 font-bold text-center w-full">
                Service includes technical writing, compliance review, and submission management.
              </p>
            </CardFooter>
          </Card>
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
        <div className="col-span-2 space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>
        <Skeleton className="h-48 w-full rounded-[2rem]" />
      </div>
      <div className="grid grid-cols-3 gap-8 pt-8">
        <div className="col-span-2 h-[600px] bg-slate-100 rounded-[2rem]" />
        <div className="h-[500px] bg-slate-100 rounded-[2rem]" />
      </div>
    </div>
  );
}
