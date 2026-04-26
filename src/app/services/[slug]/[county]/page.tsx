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
    <div className="flex flex-col min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative px-6 pt-24 pb-12 md:pt-36 md:pb-20 overflow-hidden bg-brand-navy-900 border-b border-white/5">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue-600/10 blur-[100px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-brand-blue-600/5 blur-[80px]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors font-bold tracking-wide uppercase text-[10px]">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Services
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-brand-blue-600/10 text-brand-blue-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-brand-blue-600/20 mb-6 w-fit backdrop-blur-md"
          >
            <ShieldCheck className="w-4 h-4" /> Area Verified: {county.name} County
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight uppercase tracking-tight"
          >
            {service.title} <br className="hidden md:block" />
            <span className="text-brand-blue-600">in {county.name} County</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 leading-relaxed font-medium max-w-3xl"
          >
            {localizedValueProp} Stronger Built Group LLC provides licensed, DVBE-certified solutions tailored to {county.name}'s specific procurement requirements.
          </motion.p>
        </div>
      </section>

      <section className="pb-24 pt-12 bg-white dark:bg-black/20">
        <div className="max-w-5xl mx-auto px-4 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-16 shadow-2xl relative overflow-hidden mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
               <div className="space-y-6">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Procurement Metadata</h3>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-slate-50 dark:bg-white/5 p-5 rounded-2xl border border-gray-100 dark:border-white/5">
                        <p className="text-[9px] font-black text-slate-400 uppercase mb-1">NAICS Code</p>
                        <p className="font-bold text-brand-navy-900 dark:text-brand-blue-600 font-mono text-sm">{service.naics}</p>
                     </div>
                     <div className="bg-slate-50 dark:bg-white/5 p-5 rounded-2xl border border-gray-100 dark:border-white/5">
                        <p className="text-[9px] font-black text-slate-400 uppercase mb-1">UNSPSC Code</p>
                        <p className="font-bold text-brand-navy-900 dark:text-brand-blue-600 font-mono text-sm">{service.unspsc}</p>
                     </div>
                  </div>
                  <div className="bg-brand-navy-900 text-white p-8 rounded-2xl shadow-xl border border-white/5">
                     <h4 className="font-bold mb-3 flex items-center gap-3 text-sm">
                        <Building2 className="w-5 h-5 text-brand-blue-600" /> CSLB License #1057434
                     </h4>
                     <p className="text-xs text-slate-400 leading-relaxed font-medium">
                        All work in {county.name} County is managed under our General Building Class B license, ensuring Commercially Useful Function (CUF) compliance.
                     </p>
                  </div>
               </div>

               <div className="flex flex-col justify-center">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Who We Serve in {county.name}</h3>
                  <ul className="space-y-5 mb-10">
                     {[
                        "Municipal Government Agencies",
                        "County Public Works Departments",
                        "State Agency Local Offices",
                        "Prime Contractors with DVBE Goals"
                     ].map((item, i) => (
                        <li key={i} className="flex items-center gap-4 text-brand-navy-900 dark:text-slate-200 font-bold text-sm">
                           <div className="w-2.5 h-2.5 rounded-full bg-brand-blue-600 shadow-[0_0_10px_rgba(30,111,217,0.5)]" />
                           {item}
                        </li>
                     ))}
                  </ul>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/government/capabilities-statement" className="flex items-center gap-2 bg-brand-navy-900 text-white px-8 py-4 rounded-2xl font-bold text-xs shadow-xl hover:bg-slate-800 transition-all uppercase tracking-widest">
                      <Download className="w-4 h-4" /> Capabilities Statement
                    </Link>
                    <Link href="/contact" className="flex items-center gap-2 bg-brand-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-xs shadow-xl shadow-brand-blue-600/20 hover:bg-blue-500 transition-all uppercase tracking-widest">
                      Contact for Proposal <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
               </div>
            </div>
          </motion.div>

          <div className="text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
             Serving California's Infrastructure · Active in {county.name} County Hub
          </div>
        </div>
      </section>
    </div>

  );
}
