"use client";

import React, { useState } from "react";
import { 
  Building2, 
  Mail, 
  Phone, 
  User, 
  CheckCircle2, 
  ShieldCheck, 
  Map, 
  HardHat, 
  Award, 
  ArrowRight,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { submitPartnerApplication } from "@/app/actions/admin";
import Link from "next/link";

export default function PartnerJoinPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      companyName: formData.get("companyName"),
      contactName: formData.get("contactName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      cslb: formData.get("cslb"),
      dirNumber: formData.get("dirNumber"),
      years: formData.get("years"),
      hasInsurance: formData.get("hasInsurance"),
      trades: formData.getAll("trades"),
      certifications: formData.getAll("certifications"),
      counties: formData.getAll("counties"),
    };

    try {
      await submitPartnerApplication(data);
      setSubmitted(true);
      toast({ title: "Success", description: "Your application has been received." });
    } catch (error: any) {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to submit application", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <Card className="max-w-md w-full border-none shadow-2xl rounded-[2.5rem] p-12 text-center space-y-6">
          <div className="h-20 w-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-brand-navy-900 tracking-tight">Application Sent</h1>
          <p className="text-slate-500 font-medium">
            Thank you for your interest in the StrongerBuilt Partner Network. Our team will review your capabilities and CSLB standing before reaching out.
          </p>
          <Button asChild className="w-full bg-brand-navy-900 rounded-xl h-12 font-bold">
            <Link href="/">Back to Homepage</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-600/10 border border-brand-blue-600/20 mb-2">
            <HardHat className="w-3.5 h-3.5 text-brand-blue-600" />
            <span className="text-[10px] font-black tracking-widest text-brand-blue-600 uppercase">Subcontractor Enrollment</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-brand-navy-900 tracking-tight">Join Our DVBE Network.</h1>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto">
            StrongerBuilt partners with high-quality subcontractors to deliver on major California state and municipal infrastructure projects. Join our vetted database to receive ITBs (Invitation to Bid).
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <Card className="border-none shadow-xl shadow-brand-blue-600/5 rounded-[2.5rem] overflow-hidden">
            <div className="bg-brand-navy-900 text-white p-8 flex items-center gap-4">
               <Building2 className="w-6 h-6 text-brand-blue-600" />
               <h3 className="text-xl font-bold">Company Intelligence</h3>
            </div>
            <CardContent className="p-8 md:p-12 space-y-10">
              
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-xs font-black uppercase tracking-widest text-slate-400">Company Legal Name</Label>
                  <Input id="companyName" name="companyName" required className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:ring-brand-blue-600" placeholder="e.g. Acme Construction Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactName" className="text-xs font-black uppercase tracking-widest text-slate-400">Primary Contact Name</Label>
                  <Input id="contactName" name="contactName" required className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:ring-brand-blue-600" placeholder="e.g. John Doe" />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-slate-400">Business Email</Label>
                  <Input type="email" id="email" name="email" required className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:ring-brand-blue-600" placeholder="john@acme.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-slate-400">Business Phone</Label>
                  <Input id="phone" name="phone" required className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:ring-brand-blue-600" placeholder="(555) 000-0000" />
                </div>
              </div>

              <Separator className="bg-slate-100" />

              {/* Row 3: Credentials */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="cslb" className="text-xs font-black uppercase tracking-widest text-slate-400">CSLB License #</Label>
                  <Input id="cslb" name="cslb" className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:ring-brand-blue-600" placeholder="000000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dirNumber" className="text-xs font-black uppercase tracking-widest text-slate-400">DIR Registration #</Label>
                  <Input id="dirNumber" name="dirNumber" className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:ring-brand-blue-600" placeholder="1000..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="years" className="text-xs font-black uppercase tracking-widest text-slate-400">Years in Business</Label>
                  <Input type="number" id="years" name="years" className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:ring-brand-blue-600" placeholder="0" />
                </div>
              </div>

              {/* Insurance */}
              <div className="flex items-center space-x-2">
                <Checkbox id="hasInsurance" name="hasInsurance" value="yes" />
                <label htmlFor="hasInsurance" className="text-sm font-bold text-slate-600 leading-none">
                  We have General Liability, Workers Comp, and Commercial Auto insurance policies active.
                </label>
              </div>

            </CardContent>
          </Card>

          {/* Trade Categories */}
          <Card className="border-none shadow-xl shadow-brand-blue-600/5 rounded-[2.5rem] overflow-hidden">
             <div className="bg-slate-50/50 p-8 border-b border-slate-100 flex items-center gap-4">
                <Layers className="w-5 h-5 text-brand-blue-600" />
                <h3 className="text-xl font-bold text-brand-navy-900">Capabilities & Network</h3>
             </div>
             <CardContent className="p-8 md:p-12 space-y-10">
                
                <div className="space-y-4">
                   <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Trade Specialties (Multi-select)</Label>
                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {["Electrical", "Plumbing", "HVAC", "Janitorial", "Landscaping", "Painting", "Framing", "Roofing", "Demolition", "General Building"].map(trade => (
                        <div key={trade} className="flex items-center space-x-2">
                          <Checkbox id={`trade-${trade}`} name="trades" value={trade} />
                          <label htmlFor={`trade-${trade}`} className="text-sm font-semibold text-slate-700">{trade}</label>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="space-y-4">
                   <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Certifications Held</Label>
                   <div className="flex flex-wrap gap-6">
                      {["DVBE", "Small Business (SB)", "Micro Business", "DBE", "SDVOSB"].map(cert => (
                        <div key={cert} className="flex items-center space-x-2">
                          <Checkbox id={`cert-${cert}`} name="certifications" value={cert} />
                          <label htmlFor={`cert-${cert}`} className="text-sm font-semibold text-slate-700">{cert}</label>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Service Coverage (Counties)</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {["San Diego", "Orange", "Los Angeles", "Riverside", "Imperial", "San Bernardino", "Sacramento", "SF Bay Area"].map(county => (
                      <div key={county} className="flex items-center space-x-2">
                        <Checkbox id={`county-${county}`} name="counties" value={county} />
                        <label htmlFor={`county-${county}`} className="text-xs font-bold text-slate-500">{county}</label>
                      </div>
                    ))}
                  </div>
                </div>

             </CardContent>
          </Card>

          <div className="text-center pt-8">
             <Button 
                disabled={loading}
                className="bg-brand-blue-600 hover:bg-blue-700 h-16 px-12 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all disabled:opacity-50"
             >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    Processing Application...
                  </>
                ) : (
                  <>
                    Submit Partner Application <ArrowRight className="w-5 h-5 ml-3" />
                  </>
                )}
             </Button>
             <p className="text-[10px] text-slate-400 font-bold mt-6 uppercase tracking-widest">
                Safe & Secure Submission via StrongerBuilt Compliance Engine
             </p>
          </div>

        </form>

      </div>
    </div>
  );
}
