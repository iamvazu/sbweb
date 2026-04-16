"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ShieldCheck, MapPin, Download, ArrowRight, Building2 } from "lucide-react";
import { use } from "react";
import { COUNTIES } from "@/lib/data/counties";

// PSEO Metadata mapping for Top 6 Core Services
const PSEO_DATA: Record<string, any> = {
  "construction-consulting": {
    title: "Construction Consulting",
    naics: "236220",
    unspsc: "80101601",
    valueProp: "Licensed engineering and feasibility reviews specifically for public infrastructure in {county} County."
  },
  "project-management": {
    title: "Project Management",
    naics: "236220",
    unspsc: "80101601",
    valueProp: "Professional project oversight and QA/QC management tailored for {county} County municipal projects."
  },
  "subcontracting-services": {
    title: "Subcontracting Services",
    naics: "238990",
    unspsc: "72101500",
    valueProp: "DVBE-certified specialty trade management ensuring CUF compliance for {county} County prime contractors."
  },
  "facility-maintenance": {
    title: "Facility Maintenance",
    naics: "561210",
    unspsc: "72101507",
    valueProp: "Turnkey multi-trade facility repair and preventative maintenance for {county} County government buildings."
  },
  "janitorial-services": {
    title: "Janitorial Services",
    naics: "561720",
    unspsc: "76111501",
    valueProp: "DIR-registered commercial cleaning and hard floor care serving agencies across {county} County."
  },
  "construction-material-supply": {
    title: "Material Supply & Logistics",
    naics: "236220",
    unspsc: "30000000",
    valueProp: "Bulk material sourcing and logistics fulfillment to meet diversity spending goals in {county} County."
  }
};

export default function PseoPage({ params }: { params: Promise<{ slug: string, county: string }> }) {
  const resolvedParams = use(params);
  const service = PSEO_DATA[resolvedParams.slug];
  const county = COUNTIES.find(c => c.slug === resolvedParams.county);

  if (!service || !county) return notFound();

  const localizedValueProp = service.valueProp.replace("{county}", county.name);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background-light dark:bg-black/20">
      <div className="max-w-5xl mx-auto px-4 w-full">
        
        <Link href="/services" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-blue-600 mb-8 transition-colors font-bold tracking-wide uppercase text-xs">
          <ArrowLeft className="w-4 h-4" /> Back to All Services
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-16 shadow-xl relative overflow-hidden mb-12"
        >
          {/* Decorative Badge */}
          <div className="absolute top-8 right-8 print:hidden">
             <div className="flex items-center gap-2 bg-brand-blue-600/10 text-brand-blue-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" /> Area Verified
             </div>
          </div>

          <div className="max-w-3xl relative z-10">
            <h1 className="text-4xl md:text-6xl font-black text-brand-navy-900 dark:text-white mb-6 leading-tight">
              {service.title} in <span className="text-brand-blue-600">{county.name} County</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
              {localizedValueProp} Stronger Built Group LLC provides licensed, DVBE-certified solutions tailored to {county.name}'s specific procurement requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10 pt-10 border-t border-gray-100 dark:border-white/5">
             <div className="space-y-6">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Procurement Metadata</h3>
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">NAICS Code</p>
                      <p className="font-bold text-brand-navy-900 dark:text-brand-blue-600 font-mono">{service.naics}</p>
                   </div>
                   <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">UNSPSC Code</p>
                      <p className="font-bold text-brand-navy-900 dark:text-brand-blue-600 font-mono">{service.unspsc}</p>
                   </div>
                </div>
                <div className="bg-brand-navy-900 text-white p-6 rounded-2xl shadow-lg">
                   <h4 className="font-bold mb-2 flex items-center gap-2 text-sm">
                      <Building2 className="w-4 h-4 text-brand-blue-600" /> CSLB License #1057434
                   </h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      All work in {county.name} County is managed under our General Building Class B license, ensuring Commercially Useful Function (CUF) compliance.
                   </p>
                </div>
             </div>

             <div className="flex flex-col justify-center">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Who We Serve in {county.name}</h3>
                <ul className="space-y-4 mb-8">
                   {[
                      "Municipal Government Agencies",
                      "County Public Works Departments",
                      "State Agency Local Offices",
                      "Prime Contractors with DVBE Goals"
                   ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-brand-navy-900 dark:text-slate-200 font-bold">
                         <div className="w-2 h-2 rounded-full bg-brand-blue-600" />
                         {item}
                      </li>
                   ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link href="/government/capabilities-statement" className="flex items-center gap-2 bg-brand-navy-900 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl hover:bg-slate-800 transition-all">
                    <Download className="w-4 h-4" /> Capabilities Statement
                  </Link>
                  <Link href="/contact" className="flex items-center gap-2 bg-brand-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-brand-blue-600/20 hover:bg-blue-500 transition-all">
                    Contact for Proposal <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Localized Footer Note */}
        <div className="text-center text-slate-400 text-xs font-medium uppercase tracking-widest">
           Serving California's Infrastructure · Active in {county.name} County Hub
        </div>

      </div>
    </div>
  );
}
