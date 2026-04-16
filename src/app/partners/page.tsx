"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Handshake, Construction, ClipboardCheck, ArrowRight, ShieldCheck } from "lucide-react";

export default function PartnerPortal() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24 bg-white dark:bg-black/20">
      <div className="max-w-7xl mx-auto px-4 w-full">
        
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-brand-navy-900 dark:text-white tracking-tight mb-6">
            The Stronger Built <span className="text-brand-blue-600">Partner Network</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            We operate a dual-channel ecosystem. For Prime Contractors, we are a powerful DVBE partner managing a suite of specific trades to help you hit diversity requirements. For independent Subcontractors, we provide access to state/county contracts under our leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {/* Primes Section */}
          <div className="bg-brand-navy-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden group hover:shadow-xl transition-all">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Handshake className="w-48 h-48" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-black mb-4">For Prime Contractors</h2>
              <p className="text-slate-300 leading-relaxed mb-8">
                Satisfy your mandate to utilize Disabled Veteran Business Enterprises (DVBE) or Small Businesses (SB) without sacrificing execution quality. We manage the specialty trades so you only have to manage us.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm font-semibold">
                  <ShieldCheck className="w-5 h-5 text-brand-blue-600" /> CSLB #1057434 Class B Licensed oversight
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold">
                  <ShieldCheck className="w-5 h-5 text-brand-blue-600" /> Fully insured, bonded, and DIR-registered cohort
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold">
                  <ShieldCheck className="w-5 h-5 text-brand-blue-600" /> Legitimate Commercially Useful Function (CUF) execution
                </li>
              </ul>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-brand-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-colors">
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Subcontractor Section */}
          <div className="bg-background-light dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-3xl p-8 md:p-12 group hover:shadow-xl transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 group-hover:opacity-10 transition-opacity text-brand-navy-900 dark:text-white">
              <Construction className="w-48 h-48" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-brand-navy-900 dark:text-white mb-4">For Subcontractors</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                Grow your business by partnering with us on public works. We are actively expanding our network of DIR-registered, licensed specialty trades (C-10, C-20, C-33, C-36, etc.) to staff our incoming project pipeline.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm font-semibold text-brand-navy-900 dark:text-slate-200">
                  <ClipboardCheck className="w-5 h-5 text-success" /> Consistent payouts on public works schedules
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-brand-navy-900 dark:text-slate-200">
                  <ClipboardCheck className="w-5 h-5 text-success" /> Integrated project management and safety plans
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-brand-navy-900 dark:text-slate-200">
                  <ClipboardCheck className="w-5 h-5 text-success" /> Preferential bidding for certified DVBE/SB entities
                </li>
              </ul>
              <Link href="/partners/join" className="inline-flex items-center gap-2 bg-white dark:bg-white text-brand-navy-900 border border-gray-200 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm">
                Apply to the Network <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
