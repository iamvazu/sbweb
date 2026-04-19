"use client";

import { motion } from "framer-motion";
import { Download, ShieldCheck, Map, Bookmark, CheckCircle, Star } from "lucide-react";
import Link from "next/link";

export default function GovernmentHub() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Premium Hero Section - HARMONIZED & COMPACT */}
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
            <span className="text-[10px] font-black tracking-[0.2em] text-amber-400 uppercase">Official Procurement Resource</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight mb-8 leading-[1.1]"
          >
            Government <br className="hidden md:block"/>
            <span className="italic text-brand-blue-600">Contracting Hub.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
          >
            Your complete resource for Stronger Built LLC procurement details. Evaluate our credentials, download capabilities, and verify our compliance instantly.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative z-10"
          >
            <Link href="/government/capabilities-statement" className="inline-flex items-center gap-3 bg-brand-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-2xl shadow-blue-500/20 uppercase tracking-widest text-[11px]">
              <Download className="w-5 h-5" />
              Download Capabilities Statement
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Primary Credentials Grid */}
      <section className="py-24 bg-white dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[11px] font-black text-amber-600 uppercase tracking-[0.3em] mb-4">Authority & Compliance</h2>
            <h3 className="text-3xl md:text-5xl font-serif text-brand-navy-900 dark:text-white">Verified Certifications</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { tag: "Active", color: "bg-success", text: "text-white", title: "CSLB License", desc: "#1057434 (B, C-6, C-36)" },
              { tag: "In Process", color: "bg-warning", text: "text-white", title: "DIR Registration", desc: "Issuance Pending" },
              { tag: "Qualified", color: "bg-brand-blue-600", text: "text-white", title: "Veteran Owned", desc: "SDVOSB (≥10% VA Rating)" },
              { tag: "Qualified", color: "bg-brand-blue-600", text: "text-white", title: "DVBE/SB", desc: "Status in Processing" },
            ].map((cert, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 dark:bg-brand-navy-900/50 border border-gray-200 dark:border-white/10 p-8 rounded-[2rem] flex flex-col justify-between items-start group hover:shadow-xl transition-all"
              >
                <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${cert.color} ${cert.text} mb-8`}>
                  {cert.tag}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brand-navy-900 dark:text-white mb-2 tracking-tight group-hover:text-brand-blue-600 transition-colors leading-none">{cert.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">{cert.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance & Codes */}
      <section className="py-32 bg-slate-50 dark:bg-black/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Insurance */}
          <div className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 p-12 rounded-[3rem] shadow-sm">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-16 h-16 rounded-2xl bg-success/10 text-success flex items-center justify-center">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-serif text-brand-navy-900 dark:text-white italic tracking-tight">Insurance Policies</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium text-lg">
              Fully insured and bonded through <strong className="text-brand-navy-900 dark:text-white">Insureon Premium BOP</strong>, meeting or exceeding California state and municipal procurement requirements.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "General Liability",
                "Commercial Auto",
                "Workers Compensation",
                "$1M Employer Liability",
                "Fidelity Bond",
                "Business Owner's Policy (BOP)"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-brand-navy-900 dark:text-slate-200 font-bold text-sm">
                  <CheckCircle className="w-5 h-5 text-success shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* NAICS & UNSPSC Codes */}
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-12 rounded-[3rem] shadow-sm">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-16 h-16 rounded-2xl bg-brand-blue-600/10 text-brand-blue-600 flex items-center justify-center">
                <Bookmark className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-serif text-brand-navy-900 dark:text-white italic tracking-tight">Classification Codes</h3>
            </div>
            <div className="space-y-12">
              <div>
                <h4 className="text-[10px] font-black tracking-[0.2em] text-amber-600 uppercase mb-6">Primary NAICS Codes</h4>
                <div className="flex flex-wrap gap-2">
                  {["236220", "237310", "238990", "561210", "561720"].map(code => (
                    <span key={code} className="bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/10 text-brand-navy-900 dark:text-slate-300 px-4 py-2 rounded-xl text-sm font-bold font-mono">
                      {code}
                    </span>
                  ))}
                  {["541511", "541512", "541611"].map(code => (
                    <span key={code} className="bg-brand-blue-600/10 border border-brand-blue-600/20 text-brand-blue-600 px-4 py-2 rounded-xl text-sm font-bold font-mono">
                      {code}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-[10px] font-black tracking-[0.2em] text-amber-600 uppercase mb-6">IT & Digital Compliance</h4>
                <ul className="space-y-4">
                  {[
                    "eVAQ Status: In-Process (IT Procurement)",
                    "GenAI Disclosure: SAM § 4986.9 Compliant",
                    "WCAG 2.1 AA Digital Accessibility Commitment"
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-3 text-[13px] font-bold text-brand-navy-900 dark:text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-brand-blue-600 shrink-0" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
