"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Handshake, Construction, ClipboardCheck, ArrowRight, ShieldCheck, Share2 } from "lucide-react";

export default function PartnerPortal() {
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
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-600/10 border border-brand-blue-600/20 mb-6 backdrop-blur-md"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-[10px] font-black tracking-[0.2em] text-amber-400 uppercase">Strategic Alliance Network</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight mb-8 leading-[1.1]"
          >
            The Stronger Built <br className="hidden md:block"/>
            <span className="italic text-brand-blue-600">Partner Network.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
          >
            A high-performance ecosystem for prime contractors and independent trade specialists. Together, we fulfill California's most critical infrastructure mandates.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {/* Primes Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-navy-900 rounded-[2.5rem] p-10 md:p-14 text-white relative overflow-hidden group hover:shadow-2xl transition-all"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Handshake className="w-48 h-48" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-serif mb-6 italic">For Prime Contractors</h2>
              <p className="text-slate-300 leading-relaxed mb-10 text-lg font-medium">
                Satisfy your mandate to utilize Disabled Veteran Business Enterprises (DVBE) or Small Businesses (SB) without sacrificing execution quality. We manage the specialty trades so you only have to manage us.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-sm font-bold text-slate-200">
                  <ShieldCheck className="w-5 h-5 text-brand-blue-600" /> CSLB #1057434 Class B Licensed oversight
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-200">
                  <ShieldCheck className="w-5 h-5 text-brand-blue-600" /> Fully insured, bonded, and DIR-registered cohort
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-200">
                  <ShieldCheck className="w-5 h-5 text-brand-blue-600" /> Legitimate Commercially Useful Function (CUF) execution
                </li>
              </ul>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-brand-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/10">
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Subcontractor Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-slate-50 dark:bg-brand-navy-900/40 border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-10 md:p-14 group hover:shadow-2xl transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 group-hover:opacity-10 transition-opacity text-brand-navy-900 dark:text-white">
              <Construction className="w-48 h-48" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-serif text-brand-navy-900 dark:text-white mb-6 italic">For Subcontractors</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-10 text-lg font-medium">
                Grow your business by partnering with us on public works. We are actively expanding our network of DIR-registered, licensed specialty trades (C-10, C-20, C-33, C-36, etc.) to staff our incoming project pipeline.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-sm font-bold text-brand-navy-900 dark:text-slate-200">
                  <ClipboardCheck className="w-5 h-5 text-success" /> Consistent payouts on public works schedules
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-brand-navy-900 dark:text-slate-200">
                  <ClipboardCheck className="w-5 h-5 text-success" /> Integrated project management and safety plans
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-brand-navy-900 dark:text-slate-200">
                  <ClipboardCheck className="w-5 h-5 text-success" /> Preferential bidding for certified DVBE/SB entities
                </li>
              </ul>
              <Link href="/partners/join" className="inline-flex items-center gap-2 bg-white dark:bg-white/5 text-brand-navy-900 dark:text-white border border-gray-200 dark:border-white/10 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm">
                Apply to the Network <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
