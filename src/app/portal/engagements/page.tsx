"use client";

import React from "react";
import { CheckCircle2, FileSearch, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function EngagementsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Success Hero */}
      <div className="text-center space-y-4">
        <div className="h-20 w-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-black text-brand-navy-900 tracking-tight">Project Secured</h1>
        <p className="text-slate-500 font-medium max-w-md mx-auto">
          Your deposit has been processed. A StrongerBuilt strategic advisor will contact you within 4 business hours to begin the bid technical response.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-none shadow-xl shadow-brand-blue-600/5 rounded-[2rem] bg-brand-navy-900 text-white p-8">
          <CardContent className="p-0 space-y-4">
            <h3 className="text-xl font-bold">What happens next?</h3>
            <ul className="space-y-4 text-sm font-medium text-blue-100/60">
              <li className="flex gap-3 italic">
                <span className="text-brand-blue-600 font-black">01</span>
                Project Kickoff call within 4 hours.
              </li>
              <li className="flex gap-3 italic">
                <span className="text-brand-blue-600 font-black">02</span>
                Requirements & Timeline validation.
              </li>
              <li className="flex gap-3 italic">
                <span className="text-brand-blue-600 font-black">03</span>
                Technical writing & Compliance audit.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl shadow-brand-blue-600/5 rounded-[2rem] p-8">
          <CardContent className="p-0 space-y-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-brand-blue-600" />
              <h3 className="text-lg font-bold text-brand-navy-900">Engagement Portal</h3>
            </div>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Track the progress of your active bid responses, upload required documents, and chat with your assigned advisor.
            </p>
            <Button asChild className="w-full bg-brand-blue-600 rounded-xl font-bold h-12">
              <Link href="/portal/pipeline">
                View Tracking Pipeline <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Trust Quote */}
      <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 text-center italic text-slate-400 font-medium text-sm">
        "Our mission is to ensure qualified SBE/DVBE firms win more government business through elite technical strategy."
      </div>

    </div>
  );
}
