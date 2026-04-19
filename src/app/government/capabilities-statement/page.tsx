"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Download, 
  ShieldCheck, 
  Award, 
  Building2, 
  CheckCircle2, 
  MapPin, 
  Briefcase,
  Layers,
  FileText,
  BarChart3,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function CapabilitiesStatementPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Actions Bar */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black text-brand-navy-900 tracking-tight">Capabilities Statement</h1>
            <p className="text-slate-500 font-medium">Official procurement document for Stronger Built LLC.</p>
          </div>
          <Button asChild className="bg-brand-blue-600 hover:bg-blue-700 h-12 rounded-xl font-bold shadow-xl shadow-blue-500/20 group">
            <a href="/capabilities-statement.pdf" target="_blank" download>
              <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
              Download PDF Version
            </a>
          </Button>
        </div>

        {/* The "Paper" View */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-2xl rounded-[2.5rem] overflow-hidden border border-slate-200"
        >
          {/* Header Strip */}
          <div className="bg-brand-navy-900 text-white p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue-600/10 rounded-full blur-[80px]" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div>
                <div className="flex flex-col items-start gap-1 group mb-4">
                  <span className="text-3xl font-black tracking-tight leading-none text-white">
                    STRONGER<span className="text-brand-blue-600">built</span>
                  </span>
                  <span className="text-[12px] font-semibold tracking-widest text-slate-400 uppercase leading-none">
                    LLC
                  </span>
                </div>
                <p className="text-blue-100/60 font-bold text-sm tracking-wide uppercase">
                  Licensed General Contractor | Certified DVBE | SBE
                </p>
              </div>
              <div className="text-right space-y-1 text-sm font-medium text-slate-300">
                <p>San Diego, CA</p>
                <p>(831) 760-0806</p>
                <p>info@strongerbuilt.us</p>
                <p className="text-brand-blue-600 font-bold">www.strongerbuilt.us</p>
              </div>
            </div>
          </div>

          <div className="p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Left Column: Core Competencies */}
              <div className="lg:col-span-2 space-y-10">
                
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 bg-brand-blue-600/10 rounded-xl flex items-center justify-center text-brand-blue-600">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-black text-brand-navy-900 border-b-2 border-brand-blue-600 pb-1">Core Competencies</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {[
                      "General Building Construction (Class B)",
                      "Strategic Bid & Procurement Management",
                      "Facility Maintenance & Repair",
                      "Janitorial & Custodial Services",
                      "Project & Construction Management",
                      "Commercial ADA Upgrades",
                      "Subcontractor Network Management",
                      "Construction Material Supply Logistics"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm font-bold text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-brand-blue-600 mt-0.5 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 bg-brand-blue-600/10 rounded-xl flex items-center justify-center text-brand-blue-600">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-black text-brand-navy-900 border-b-2 border-brand-blue-600 pb-1">Past Performance</h2>
                  </div>
                  <div className="space-y-6">
                    {[
                      { client: "State & Municipal Agencies", project: "Various Maintenance & Consulting", year: "2026", scope: "Provided end-to-end facility assessment and maintenance logistics for California agencies." },
                      { client: "Prime Contractor Network", project: "DVBE Compliance & Sub-Management", year: "2025", scope: "Coordinated DVBE participation and multi-trade scheduling for large-scale public infrastructure." },
                      { client: "Commercial Property Managers", project: "Facility Response & T.I.", year: "2025", scope: "Executed high-turnover tenant improvements and emergency repair services for local San Diego portfolios." }
                    ].map((p, i) => (
                      <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 group hover:border-brand-blue-600/20 transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-black text-brand-navy-900">{p.client}</h4>
                          <span className="text-[10px] font-bold text-brand-blue-600 opacity-60 uppercase">{p.year}</span>
                        </div>
                        <p className="text-xs font-bold text-brand-blue-600 mb-2">{p.project}</p>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">{p.scope}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right Column: Company Data & Differentiators */}
              <div className="space-y-10">
                
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 bg-brand-blue-600/10 rounded-xl flex items-center justify-center text-brand-blue-600">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-black text-brand-navy-900 border-b-2 border-brand-blue-600 pb-1">Differentiators</h2>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Veteran-Owned & Operated with Military Precision.",
                      "Exacting Compliance with DIR and Prevailing Wage Laws.",
                      "Rapid Response Team for State-Wide Emergency Callouts.",
                      "Unified Procurement Technology (BidIQ Platform).",
                    ].map((d, i) => (
                      <li key={i} className="text-xs font-bold text-slate-600 leading-relaxed italic">
                        — {d}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="bg-brand-navy-900/5 p-8 rounded-[2rem] border border-brand-navy-900/10 space-y-6">
                  <h2 className="text-xl font-black text-brand-navy-900 text-center">Company Data</h2>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">DUNS / UEI</p>
                      <p className="text-sm font-bold text-brand-navy-900">[PENDING]</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CAGE CODE</p>
                      <p className="text-sm font-bold text-brand-navy-900">[PENDING]</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary NAICS</p>
                      <p className="text-sm font-mono font-bold text-brand-navy-900">236220, 237310, 561720</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CSLB License</p>
                      <p className="text-sm font-bold text-brand-navy-900">1057434 (B, C-6, C-36)</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">EIN / TAX ID</p>
                      <p className="text-sm font-bold text-brand-navy-900">39-4458240</p>
                    </div>
                  </div>
                </section>

                <div className="flex flex-col gap-4">
                   <div className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                      <Award className="w-5 h-5 text-success" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Certified DVBE Firm (In Process)</span>
                   </div>
                   <div className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                      <ShieldCheck className="w-5 h-5 text-brand-blue-600" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Fully Insured & Bonded </span>
                   </div>
                </div>

              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="bg-slate-50 p-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="text-center md:text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Entity Verification</p>
                <p className="text-xs font-bold text-slate-600">CA Secretary of State: B20260157630</p>
             </div>
             <div className="flex gap-4">
                <Button variant="outline" size="sm" className="rounded-xl font-bold bg-white text-brand-blue-600 border-slate-200">
                  <ExternalLink className="w-3.5 h-3.5 mr-2" />
                  View Cal eProcure Profile
                </Button>
             </div>
          </div>
        </motion.div>

        {/* Closing CTA */}
        <div className="mt-16 text-center">
            <h3 className="text-2xl font-serif italic text-brand-navy-900 mb-6">“Ready to partner with a certified veteran infrastructure firm?”</h3>
            <Button asChild className="bg-brand-navy-900 hover:bg-black text-white h-14 px-10 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl">
              <Link href="/contact">Request Official Quote</Link>
            </Button>
        </div>

      </div>
    </div>
  );
}
