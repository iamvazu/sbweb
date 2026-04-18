"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  ShieldCheck, 
  FileCheck, 
  Zap, 
  Search, 
  Loader2,
  PhoneCall,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function HireContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bidId = searchParams.get("bid");
  const [selectedBid, setSelectedBid] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    async function loadBid() {
      if (!bidId) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      const { data, error } = await supabase
        .from("bids")
        .select("*")
        .eq("id", bidId)
        .single();
      
      if (!error) setSelectedBid(data);
      setIsLoading(false);
    }
    loadBid();
  }, [bidId, supabase]);

  const handleCheckout = async (tier: string, price: number) => {
    setIsProcessing(true);
    // In a real app, this would redirect to a Stripe Checkout Session via API
    toast({
      title: "Redirecting to Stripe...",
      description: `Preparing your ${tier} submission package.`,
    });
    
    // Simulation: Wait 2 seconds and redirect to a success page
    setTimeout(() => {
      router.push("/portal/engagements");
    }, 2000);
  };

  const TIERS = [
    {
      id: "ifb_express",
      name: "IFB Express",
      price: 1500,
      description: "For simple Invitations for Bid (IFBs) under $250K value.",
      features: [
        "Completeness & Compliance Check",
        "Document Packaging & Submission",
        "DIR / CSLB Verification",
        "Mandatory Forms Filing",
        "StrongerBuilt Signature Support",
      ],
      cta: "Hire for Express Bid",
      popular: false
    },
    {
      id: "rfp_standard",
      name: "RFP / IFB Standard",
      price: 2500,
      description: "For complex RFPs or IFBs between $250K and $750K.",
      features: [
        "Everything in Express",
        "Technical Proposal Assistance",
        "SWOT & Strategy Analysis",
        "Site Walk Consultation",
        "Pre-bid Meeting Attendance",
        "Post-Bid Negotiation Support",
      ],
      cta: "Hire for Standard RFP",
      popular: true
    },
    {
      id: "full_cycle",
      name: "High-Value RFP",
      price: 3500,
      description: "Strategic management for projects greater than $750K.",
      features: [
        "Everything in Standard",
        "Full Custom Technical Writing",
        "Subcontractor Search & Outreach",
        "DVBE Participation Coordination",
        "Executive Review & Presentation",
        "Interview Prep & Attendance",
      ],
      cta: "Hire for Enterprise RFP",
      popular: false
    }
  ];

  return (
    <div className="space-y-12 max-w-6xl mx-auto py-8 font-sans">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-[#0B1F3A] tracking-tight">Expert Bid Management</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Scale your government business by letting StrongerBuilt's expert team handle the heavy lifting of compliance and submission.
        </p>
      </div>

      {/* Selected Bid Context */}
      <section>
        {bidId ? (
          <Card className="border-[#1E6FD9] bg-blue-50/50 shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-6 p-6">
              <div className="bg-white p-4 rounded-xl border-2 border-blue-100 shrink-0">
                <FileCheck className="h-8 w-8 text-[#1E6FD9]" />
              </div>
              <div className="flex-1 space-y-1">
                <Badge className="bg-[#1E6FD9] hover:bg-[#1E6FD9] text-white">SELECTED BID</Badge>
                <h2 className="text-lg font-bold text-slate-900">{selectedBid?.event_name || "Loading..."}</h2>
                <p className="text-sm text-slate-500">{selectedBid?.department_name} | {selectedBid?.event_id}</p>
              </div>
              <Button size="sm" variant="outline" className="text-slate-500 border-slate-300" onClick={() => router.push("/portal/bids")}>Change Bid</Button>
            </div>
          </Card>
        ) : (
          <Card className="border-dashed border-2 p-8 text-center bg-slate-50">
            <div className="max-w-xs mx-auto space-y-4">
              <Search className="h-8 w-8 text-slate-300 mx-auto" />
              <p className="text-sm text-slate-500 font-medium italic">No bid selected. Please choose a bid from your matches first.</p>
              <Button asChild size="sm" className="bg-[#1E6FD9]">
                <Link href="/portal/matches">View Matches</Link>
              </Button>
            </div>
          </Card>
        )}
      </section>

      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TIERS.map((tier) => (
          <Card key={tier.id} className={`relative flex flex-col h-full overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1 ${tier.popular ? 'border-[#1E6FD9] ring-2 ring-[#1E6FD9] scale-105 z-10' : 'border-slate-200'}`}>
            {tier.popular && (
              <div className="absolute top-0 right-0 left-0 bg-[#1E6FD9] text-white text-[10px] font-black uppercase py-1 text-center tracking-widest">
                Recommended for growth
              </div>
            )}
            
            <CardHeader className={tier.popular ? 'pt-8' : ''}>
              <CardTitle className="text-xl font-bold">{tier.name}</CardTitle>
              <CardDescription className="min-h-[40px] mt-2">{tier.description}</CardDescription>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-black text-[#0B1F3A]">${tier.price.toLocaleString()}</span>
                <span className="text-slate-400 font-medium">/ bid</span>
              </div>
            </CardHeader>

            <CardContent className="flex-1 space-y-4 py-6">
              <ul className="space-y-3">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 font-medium leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="pt-6 border-t bg-slate-50/50">
              <Button 
                onClick={() => handleCheckout(tier.name, tier.price)}
                disabled={!bidId || isProcessing}
                className={`w-full h-12 font-bold uppercase tracking-widest text-[11px] ${tier.popular ? 'bg-[#1E6FD9] hover:bg-blue-700' : 'bg-slate-900 hover:bg-black'}`}
              >
                {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : tier.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Enterprise / CTA */}
      <div className="bg-[#0B1F3A] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 mt-12 shadow-2xl overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-blue-600/20 transition-all duration-700" />
        
        <div className="space-y-4 relative z-10">
          <Badge className="bg-blue-600/30 text-blue-300 border-none px-3">ENTERPRISE PARTNERSHIP</Badge>
          <h2 className="text-3xl font-bold">Annual Retainer Option</h2>
          <p className="text-blue-100/60 max-w-lg leading-relaxed font-medium">
            Handling 10+ bids per month? Get an unlimited dedicated bid team for a flat monthly retainer. Includes full strategic consultancy and partner outreach.
          </p>
        </div>
        
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-black uppercase tracking-widest text-xs h-14 px-8">
            <Link href="/contact">Get Pricing <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 font-black uppercase tracking-widest text-xs h-14 px-8">
            <PhoneCall className="mr-2 h-4 w-4" /> Schedule Call
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function HireServicePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>}>
      <HireContent />
    </Suspense>
  );
}
