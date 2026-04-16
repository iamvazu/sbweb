"use client";

import { motion } from "framer-motion";
import { Download, ShieldCheck, Map, Bookmark, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function GovernmentHub() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background-light dark:bg-black/20">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 w-full mb-20">
        <div className="bg-brand-navy-900 rounded-[2.5rem] p-8 md:p-16 text-center text-white relative overflow-hidden flex flex-col items-center shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue-600/20 rounded-full blur-[100px]" />
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6 relative z-10"
          >
            Government Contracting <span className="text-brand-blue-600">Hub</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 max-w-3xl mb-10 relative z-10"
          >
            Your complete resource for Stronger Built Group LLC procurement details. Evaluate our credentials, download capabilities, and verify our compliance instantly.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative z-10"
          >
            <Link href="/government/capabilities-statement" className="inline-flex items-center gap-3 bg-brand-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl shadow-brand-blue-600/30">
              <Download className="w-5 h-5" />
              Download Full Capabilities Statement
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Primary Credentials Grid */}
      <section className="max-w-7xl mx-auto px-4 w-full mb-24">
        <h2 className="text-3xl font-black text-brand-navy-900 dark:text-white mb-10 text-center">Verified Certifications</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { tag: "Active", color: "bg-success", text: "text-white", title: "CSLB License", desc: "#1057434 (B, C-6, C-36)" },
            { tag: "In Progress", color: "bg-warning", text: "text-white", title: "DIR Registration", desc: "Issuance Pending" },
            { tag: "Qualified", color: "bg-brand-blue-600", text: "text-white", title: "Veteran Owned", desc: "SDVOSB (≥10% VA Rating)" },
            { tag: "Qualified", color: "bg-brand-blue-600", text: "text-white", title: "DVBE/SB", desc: "Status in Processing" },
          ].map((cert, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-brand-navy-900/50 border border-gray-200 dark:border-white/10 p-6 rounded-2xl flex flex-col justify-between items-start"
            >
              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${cert.color} ${cert.text} mb-6`}>
                {cert.tag}
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-navy-900 dark:text-white mb-1">{cert.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium">{cert.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Insurance & Codes */}
      <section className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Insurance */}
        <div className="glass-card p-10 rounded-3xl">
          <div className="flex items-center gap-4 mb-8">
            <ShieldCheck className="w-10 h-10 text-success" />
            <h3 className="text-2xl font-black text-brand-navy-900 dark:text-white">Insurance Policies</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Fully insured and bonded through <strong className="text-brand-navy-900 dark:text-white">Insureon Premium BOP</strong>, meeting or exceeding California state and municipal procurement requirements.
          </p>
          <ul className="space-y-4">
            {[
              "General Liability",
              "Commercial Auto",
              "Workers Compensation",
              "$1M Employer Liability",
              "Fidelity Bond",
              "Business Owner's Policy (BOP)"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-brand-navy-900 dark:text-slate-200 font-medium pb-4 border-b border-gray-100 dark:border-white/5 last:border-0 last:pb-0">
                <CheckCircle className="w-5 h-5 text-success shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* NAICS & UNSPSC Codes */}
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-10 rounded-3xl">
          <div className="flex items-center gap-4 mb-8">
            <Bookmark className="w-10 h-10 text-brand-blue-600" />
            <h3 className="text-2xl font-black text-brand-navy-900 dark:text-white">Classification Codes</h3>
          </div>
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-4">Primary NAICS Codes</h4>
              <div className="flex flex-wrap gap-2">
                {["236220", "237310", "238990", "561210", "561720"].map(code => (
                  <span key={code} className="bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/10 text-brand-navy-900 dark:text-slate-300 px-3 py-1.5 rounded-lg text-sm font-bold font-mono">
                    {code}
                  </span>
                ))}
                {["541511", "541512", "541611"].map(code => (
                  <span key={code} className="bg-brand-blue-600/10 border border-brand-blue-600/20 text-brand-blue-600 px-3 py-1.5 rounded-lg text-sm font-bold font-mono">
                    {code}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-4">IT & Digital Compliance</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-xs font-bold text-brand-navy-900 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-600"></span>
                  eVAQ Status: In-Process (IT Procurement)
                </li>
                <li className="flex items-center gap-2 text-xs font-bold text-brand-navy-900 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-600"></span>
                  GenAI Disclosure: SAM § 4986.9 Compliant
                </li>
                <li className="flex items-center gap-2 text-xs font-bold text-brand-navy-900 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-600"></span>
                  WCAG 2.1 AA Digital Accessibility Commitment
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
