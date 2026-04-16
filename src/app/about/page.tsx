"use client";

import { motion } from "framer-motion";
import { User2, Calendar, MapPin, Briefcase } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24 bg-background-light dark:bg-black/20">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-black text-brand-navy-900 dark:text-white tracking-tight mb-6">Built on Integrity. <br/><span className="text-brand-blue-600">Driven by Service.</span></h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Stronger Built Group LLC is a newly registered California firm strategically built to serve state, county, and municipal agencies with specialized construction operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue-600/5 rounded-full blur-3xl" />
            <h2 className="text-sm font-bold tracking-widest text-brand-blue-600 uppercase mb-4">Our Mission</h2>
            <p className="text-xl md:text-2xl font-semibold text-brand-navy-900 dark:text-white leading-relaxed mb-6">
              To deliver premium general building, facility maintenance, and specialized contracting services that precisely align with California's public infrastructure goals.
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              We leverage an extensive DVBE/SB partner network combined with CSLB Class B self-performed expertise. This ensures highly compliant, efficient, and transparent project delivery.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="bg-brand-navy-900 rounded-3xl p-8 md:p-12 text-white flex flex-col justify-center"
          >
            <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-8">Entity Facts</h2>
            <ul className="space-y-6">
              {[
                { label: "Legal Name", value: "Stronger Built Group LLC" },
                { label: "Entity Type", value: "Foreign LLC (CA Qualified)" },
                { label: "License", value: "CSLB #1057434 (Class B, C-6, C-36)" },
                { label: "Certifications", value: "SDVOSB (≥ 10% VA), DVBE" },
              ].map((fact, i) => (
                <li key={i} className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-slate-400">{fact.label}</span>
                  <span className="font-bold text-right">{fact.value}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Leadership Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-brand-navy-900 dark:text-white">Leadership</h2>
          </div>
          
          <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-xl shadow-brand-blue-600/5 flex flex-col md:flex-row gap-10 items-center">
            
            <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-2xl bg-slate-100 dark:bg-black/20 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-white/20 overflow-hidden relative group">
              <User2 className="w-16 h-16 text-slate-400 dark:text-slate-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Placeholder Headshot</span>
              {/* Actual Image Tag for future */}
              {/* <Image src="/images/roy-headshot.jpg" alt="Roy Krautstrunk" fill className="object-cover" /> */}
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-black text-brand-navy-900 dark:text-white mb-2">Roy Krautstrunk</h3>
              <p className="text-brand-blue-600 font-bold mb-6 tracking-wide text-sm uppercase">Managing Member & Licensed Contractor</p>
              
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                As a Service-Disabled Veteran with a VA rating ≥ 10%, Roy leverages profound disciplinary excellence to lead Stronger Built Group. Holding CSLB Class B, C-6, and C-36 classifications, he oversees the comprehensive execution of heavy infrastructure and commercial projects. Roy specializes in navigating the complexities of the <strong>California Department of Industrial Relations (DIR)</strong> and <strong>Prevailing Wage</strong> compliance, ensuring Stronger Built remains a high-trust partner for state agencies and prime contractors.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-400">
                  <Briefcase className="w-4 h-4 text-brand-blue-600" />
                  CSLB #1057434
                </div>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-400">
                  <User2 className="w-4 h-4 text-success" />
                  SDVOSB
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
