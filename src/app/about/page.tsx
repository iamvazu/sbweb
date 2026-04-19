"use client";

import { motion } from "framer-motion";
import { User2, Briefcase, Bookmark } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black/20">
      
      {/* Premium Dark Navy Hero - HARMONIZED */}
      <section className="relative px-6 pt-24 pb-12 md:pt-36 md:pb-20 overflow-hidden bg-brand-navy-900 border-b border-white/5">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue-600/10 blur-[100px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-brand-blue-600/5 blur-[80px]" />
          <div className="absolute bottom-0 left-0 right-0 h-96 opacity-10 bg-[radial-gradient(#1E6FD9_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 mb-6 backdrop-blur-md"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-[10px] font-black tracking-[0.2em] text-amber-400 uppercase">Executive Mission</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight mb-8 leading-[1.1]"
          >
            Built on Integrity. <br className="hidden md:block"/>
            <span className="italic text-brand-blue-600">Driven by Service.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
          >
            Stronger Built LLC is a premier DVBE contracting firm dedicated to California's public infrastructure. We combine disciplinary excellence with deep technical compliance.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="bg-slate-50 dark:bg-brand-navy-900/40 border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group hover:shadow-2xl transition-all"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue-600/5 rounded-full blur-3xl" />
            <h2 className="text-sm font-bold tracking-widest text-amber-600 uppercase mb-6">Our Mission</h2>
            <p className="text-xl md:text-2xl font-serif text-brand-navy-900 dark:text-white leading-relaxed mb-6 italic">
              To deliver premium general building, facility maintenance, and specialized contracting services that precisely align with California's public infrastructure goals.
            </p>
            <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              We leverage an extensive DVBE/SB partner network combined with CSLB Class B self-performed expertise. This ensures highly compliant, efficient, and transparent project delivery across the state.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="bg-brand-navy-900 rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col justify-center shadow-xl"
          >
            <h2 className="text-xs font-black tracking-widest text-slate-400 uppercase mb-8">Entity Facts & Governance</h2>
            <ul className="space-y-6">
              {[
                { label: "Legal Name", value: "Stronger Built LLC" },
                { label: "Entity Type", value: "Foreign LLC (CA Qualified)" },
                { label: "License", value: "CSLB #1057434 (Class B, C-6, C-36)" },
                { label: "Certifications", value: "SDVOSB (≥ 10% VA), DVBE" },
              ].map((fact, i) => (
                <li key={i} className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">{fact.label}</span>
                  <span className="font-bold text-sm text-right">{fact.value}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Leadership Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-[11px] font-black tracking-widest text-amber-600 uppercase mb-4">Firm Leadership</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-brand-navy-900 dark:text-white">Executive Oversight</h3>
          </div>
          
          <div className="bg-slate-50 dark:bg-brand-navy-900/50 border border-gray-200 dark:border-white/10 rounded-[3rem] p-8 md:p-16 shadow-xl shadow-brand-blue-600/5 flex flex-col md:flex-row gap-12 items-center">
            
            <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-3xl bg-white dark:bg-black/20 flex flex-col items-center justify-center border border-slate-200 dark:border-white/10 overflow-hidden relative group shadow-inner">
              <User2 className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Digital Identification</span>
            </div>

            <div>
              <h3 className="text-3xl md:text-4xl font-serif text-brand-navy-900 dark:text-white mb-2 italic">Roy Krautstrunk</h3>
              <p className="text-amber-600 font-black mb-8 tracking-[0.15em] text-[11px] uppercase">Managing Member & Licensed Contractor</p>
              
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-medium text-lg">
                As a Service-Disabled Veteran with a VA rating ≥ 10%, Roy leverages profound disciplinary excellence to lead Stronger Built Group. Holding CSLB Class B, C-6, and C-36 classifications, he oversees the comprehensive execution of heavy infrastructure and commercial projects. Roy specializes in navigating the complexities of the <strong>California Department of Industrial Relations (DIR)</strong> and <strong>Prevailing Wage</strong> compliance, ensuring Stronger Built remains a high-trust partner for state agencies and prime contractors.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-5 py-3 rounded-2xl text-xs font-bold text-brand-navy-900 dark:text-slate-300 shadow-sm">
                  <Briefcase className="w-4 h-4 text-brand-blue-600" />
                  CSLB #1057434
                </div>
                <div className="flex items-center gap-2 bg-brand-blue-600 text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-lg shadow-blue-500/20">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20">★</span>
                  SDVOSB CERTIFIED
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
