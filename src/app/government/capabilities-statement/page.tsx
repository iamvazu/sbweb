"use client";

import { Printer, Download, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function CapabilitiesStatement() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background-light dark:bg-black/20 print:pt-0 print:pb-0 print:bg-white text-brand-navy-900 dark:text-white print:text-black">
      <div className="max-w-5xl mx-auto px-4 w-full">
        
        {/* Web-only Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 print:hidden bg-white dark:bg-brand-navy-900 p-6 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm">
          <div>
            <h1 className="text-2xl font-black mb-1">Capabilities Statement</h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Real-time generated profile reflecting our most current certifications.</p>
          </div>
          <div className="flex gap-4 mt-6 md:mt-0">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 bg-brand-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all"
            >
              <Printer className="w-5 h-5" /> Print / Save PDF
            </button>
            <Link 
              href="/contact"
              className="flex items-center gap-2 bg-background-light dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-brand-navy-900 dark:text-white border border-gray-200 dark:border-white/10 px-6 py-3 rounded-xl font-bold transition-all"
            >
               Request Formal RFP Bid
            </Link>
          </div>
        </div>

        {/* The Digital / Printable Capabilities Statement Document */}
        <div className="bg-white dark:bg-brand-navy-900 print:bg-white rounded-none md:rounded-3xl shadow-none md:shadow-2xl border-0 md:border md:border-gray-200 dark:border-white/10 p-8 md:p-12 print:p-0 print:border-none print:shadow-none text-brand-navy-900 dark:text-white print:text-black">
          
          {/* Header */}
          <header className="flex justify-between items-start border-b-2 border-brand-blue-600 pb-8 mb-8">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">
                STRONGER<span className="text-brand-blue-600">Built</span>
              </h2>
              <p className="font-semibold text-sm tracking-widest uppercase text-slate-500 mb-4">Group LLC</p>
              <p className="text-brand-blue-600 font-bold italic print:text-brand-blue-600">California's Veteran-Owned Builder. Licensed. Certified. Ready to Bid.</p>
            </div>
            <div className="text-right text-sm space-y-1 font-medium">
              <p>4370 1/2 Oregon St, San Diego, CA 92104</p>
              <p>(831) 760-0806</p>
              <p>info@strongerbuilt.us</p>
              <p>www.strongerbuilt.us</p>
            </div>
          </header>

          {/* 3 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 print:grid-cols-3 gap-8 mb-12">
            
            <div>
              <h3 className="bg-brand-navy-900 text-white print:bg-brand-navy-900 print:text-white font-bold uppercase tracking-widest px-4 py-2 mb-4 text-sm">Core Competencies</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-brand-blue-600 mt-0.5" /> General Building Construction (CSLB Class B)</li>
                <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-brand-blue-600 mt-0.5" /> Tenant Improvements & ADA Specs</li>
                <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-brand-blue-600 mt-0.5" /> Facility Maintenance & Multi-Trade Repair</li>
                <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-brand-blue-600 mt-0.5" /> Janitorial & Commercial Custodial</li>
                <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-brand-blue-600 mt-0.5" /> Project Management & Owner's Rep</li>
                <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-brand-blue-600 mt-0.5" /> C-Class Subcontractor Diversity Supply</li>
                <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-brand-blue-600 mt-0.5" /> Digital Infrastructure & GovTech</li>
              </ul>
            </div>

            <div>
              <h3 className="bg-brand-navy-900 text-white print:bg-brand-navy-900 print:text-white font-bold uppercase tracking-widest px-4 py-2 mb-4 text-sm">Past Performance</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-sm">Caltrans District 11 (<span className="font-normal italic">TI</span>)</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 print:text-slate-700">ADA upgrades & interior routing · 2025</p>
                </div>
                <div>
                  <h4 className="font-bold text-sm">SD County Public Works (<span className="font-normal italic">FM</span>)</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 print:text-slate-700">HVAC/Janitorial MSA · Ongoing</p>
                </div>
                <div>
                  <h4 className="font-bold text-sm">DWR Aqueduct (<span className="font-normal italic">Logistics</span>)</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 print:text-slate-700">Concrete & steel procurement · 2026</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="bg-brand-navy-900 text-white print:bg-brand-navy-900 print:text-white font-bold uppercase tracking-widest px-4 py-2 mb-4 text-sm">Differentiators</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" /> Service-Disabled Veteran Owned (SDVOSB 10%+)</li>
                <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" /> Guaranteed CUF Compliance (CSLB Managed)</li>
                <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" /> Turnkey multi-trade resolution avoiding broker bloat</li>
                <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" /> California SOS Registered (#B20260157630)</li>
                <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" /> GenAI Disclosure Compliant (SAM § 4986.9)</li>
              </ul>
            </div>

          </div>

          {/* Footer Grid */}
          <div className="bg-slate-50 dark:bg-black/30 print:bg-slate-50 border border-t-4 border-t-brand-blue-600 border-slate-200 dark:border-white/10 p-6 grid grid-cols-2 lg:grid-cols-4 print:grid-cols-4 gap-6">
            
            <div>
              <h5 className="font-bold text-sm uppercase mb-2">Company IDs</h5>
              <div className="text-xs space-y-1 font-medium">
                <p>CSLB License: #1057434</p>
                <p>CA SOS: B20260157630</p>
                <p>EIN: 39-4458240</p>
                <p>DIR #: PENDING</p>
                <p>eVAQ Status: IN-PROCESS</p>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-sm uppercase mb-2">Certifications</h5>
              <div className="text-xs space-y-1 font-medium text-amber-600 dark:text-amber-500 print:text-amber-700">
                <p>DVBE: Processing</p>
                <p>Small Business: Processing</p>
                <p>SDVOSB: Qualifying</p>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-sm uppercase mb-2">NAICS Codes</h5>
              <div className="text-xs space-y-1 font-medium">
                <p>236220 Commercial Bldg</p>
                <p>561210 Facility Support</p>
                <p>561720 Janitorial</p>
                <p>541511 Custom Programming</p>
                <p>541512 Systems Design</p>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-sm uppercase mb-2">Insurance Limits</h5>
              <div className="text-xs space-y-1 font-medium">
                <p>GL: $1M / $2M (Insureon)</p>
                <p>Comm. Auto: Active</p>
                <p>Workers Comp: Active</p>
                <p>Emp. Liability: $1M</p>
                <p>Fidelity Bond: Active BOP</p>
              </div>
            </div>

          </div>

        </div>
        
      </div>
    </div>
  );
}
