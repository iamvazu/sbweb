"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Globe, ArrowRight, Building2, Search } from "lucide-react";
import { COUNTIES } from "@/lib/data/counties";
import { useState } from "react";

const CORE_SERVICES = [
  { slug: "construction-consulting", name: "Construction Consulting" },
  { slug: "project-management", name: "Project Management" },
  { slug: "subcontracting-services", name: "Subcontracting Services" },
  { slug: "facility-maintenance", name: "Facility Maintenance" },
  { slug: "janitorial-services", name: "Janitorial Services" },
  { slug: "construction-material-supply", name: "Material Supply & Logistics" },
];

export default function ServiceAreasDirectory() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCounties = COUNTIES.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Hero Section - CONSISTENT WITH BRAND */}
      <section className="relative px-6 pt-24 pb-12 md:pt-36 md:pb-20 overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50/20 to-white dark:from-brand-navy-950 dark:via-brand-navy-900 dark:to-brand-navy-950 border-b border-slate-200/50 dark:border-white/5">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue-600/10 dark:bg-brand-blue-600/15 blur-[100px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-brand-blue-600/5 blur-[80px]" />
          <div className="absolute bottom-0 left-0 right-0 h-96 opacity-[0.03] dark:opacity-10 bg-[radial-gradient(#1E6FD9_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50/80 dark:bg-brand-blue-600/10 border border-brand-blue-100 dark:border-brand-blue-600/20 mb-6 backdrop-blur-md"
          >
            <Globe className="w-3.5 h-3.5 text-brand-blue-600 dark:text-brand-blue-400" />
            <span className="text-[10px] font-black tracking-[0.2em] text-brand-blue-600 dark:text-brand-blue-400 uppercase">Statewide Operations</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-8 leading-[1.1] uppercase"
          >
            Service <span className="text-brand-blue-600 dark:text-brand-blue-400">Areas.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-4 font-medium leading-relaxed"
          >
            Stronger Built LLC provides licensed DVBE/SB solutions across the entire state of California. Explore our localized presence in all 58 counties.
          </motion.p>
        </div>
      </section>

      <div className="pb-24 bg-white dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-4 w-full">


        {/* Search / Filter */}
        <div className="max-w-md mx-auto mb-16 relative">
           <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
           <input 
              type="text" 
              placeholder="Filter by county name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 dark:bg-brand-navy-900 border border-slate-200 dark:border-white/10 px-12 py-4 rounded-2xl text-brand-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue-600 shadow-sm"
           />
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
           {filteredCounties.map((county, idx) => (
              <motion.div 
                 key={county.slug}
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: (idx % 12) * 0.05 }}
                 className="bg-background-light dark:bg-brand-navy-900 border border-gray-100 dark:border-white/10 rounded-3xl p-8 hover:shadow-2xl hover:shadow-brand-blue-600/10 transition-all group"
              >
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue-600/10 flex items-center justify-center text-brand-blue-600 group-hover:bg-brand-blue-600 group-hover:text-white transition-all">
                       <MapPin className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-black text-brand-navy-900 dark:text-white tracking-tight">{county.name} County</h2>
                 </div>

                 <div className="space-y-3 mb-8">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-gray-100 dark:border-white/5 pb-2">Available Core Bids</p>
                    <div className="grid grid-cols-1 gap-2">
                       {CORE_SERVICES.map(srv => (
                          <Link 
                             key={srv.slug} 
                             href={`/services/${srv.slug}/${county.slug}`}
                             className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-brand-blue-600 flex items-center gap-2 transition-colors"
                          >
                             <ArrowRight className="w-3 h-3 text-brand-blue-600" /> {srv.name}
                          </Link>
                       ))}
                    </div>
                 </div>

                 <Link 
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 dark:bg-white/5 text-xs font-black text-brand-navy-900 dark:text-white hover:bg-brand-blue-600 hover:text-white transition-all"
                 >
                    Contact {county.name} Desk
                 </Link>
              </motion.div>
           ))}
        </div>

        {/* Footer State Callout */}
        <div className="bg-brand-navy-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue-600/10 rounded-full blur-[100px]" />
           <div className="relative z-10 max-w-2xl mx-auto">
              <Globe className="w-12 h-12 text-brand-blue-600 mx-auto mb-6" />
              <h2 className="text-3xl font-black mb-4 uppercase italic">Statewide <span className="text-brand-blue-600">Reliability</span></h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                 From the Oregon border to San Diego, Stronger Built Group leverages a distributed network of certified professionals and localized PMs to meet your agency high-stakes project goals.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                 <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"><Building2 className="w-4 h-4 text-brand-blue-600" /> 58 Counties</div>
                 <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"><Globe className="w-4 h-4 text-brand-blue-600" /> California SDVOSB</div>
              </div>
           </div>
        </div>
        </div>
      </div>
    </div>
  );
}

