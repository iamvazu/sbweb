"use client";

import { motion } from "framer-motion";
import { Accessibility, Mail, Phone, Eye, Globe, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AccessibilityPage() {
  const lastUpdated = "April 2026";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative px-6 pt-24 pb-12 md:pt-36 md:pb-20 overflow-hidden bg-brand-navy-900 border-b border-white/5">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue-600/10 blur-[100px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-brand-blue-600/5 blur-[80px]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-blue-600/10 text-brand-blue-600 mb-8 border border-brand-blue-600/20 backdrop-blur-md"
          >
            <Accessibility className="w-8 h-8" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-8 leading-[1.1] uppercase"
          >
            Accessibility <span className="text-brand-blue-600">Statement.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Stronger Built LLC is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone.
          </motion.p>
        </div>
      </section>

      <section className="pb-24 pt-16 bg-white dark:bg-black/20">
        <div className="max-w-4xl mx-auto px-4 w-full">


        {/* Conformance Status */}
        <div className="space-y-8">
          <section className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-brand-blue-600/5 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-brand-navy-900 dark:text-white">Conformance Status</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA.
            </p>
            <div className="bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5 rounded-2xl p-6">
              <p className="text-brand-navy-900 dark:text-white font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                Stronger Built LLC is partially conformant with WCAG 2.1 level AA.
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Partially conformant means that some parts of the content do not fully conform to the accessibility standard.
              </p>
            </div>
          </section>

          {/* Feedback & Contact */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-lg shadow-brand-blue-600/5 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-blue-600/10 text-brand-blue-600 flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-brand-navy-900 dark:text-white">Feedback</h3>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                We welcome your feedback on the accessibility of Stronger Built LLC. Please let us know if you encounter accessibility barriers:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-brand-navy-900 dark:text-slate-200 font-bold text-sm">
                  <Mail className="w-4 h-4 text-brand-blue-600" /> hello@strongerbuilt.xyz
                </li>
                <li className="flex items-center gap-3 text-brand-navy-900 dark:text-slate-200 font-bold text-sm">
                  <Phone className="w-4 h-4 text-brand-blue-600" /> (831) 760-0806
                </li>
              </ul>
            </div>

            <div className="bg-brand-navy-900 rounded-[2.5rem] p-8 md:p-10 text-white shadow-xl shadow-brand-blue-600/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue-600/10 rounded-full blur-3xl group-hover:bg-brand-blue-600/20 transition-all" />
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-brand-blue-600 flex items-center justify-center">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Compatibility</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 relative z-10">
                Our site is designed to be compatible with modern assistive technologies, including popular screen readers such as JAWS, NVDA, and VoiceOver.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-brand-blue-600 font-bold text-xs uppercase tracking-widest hover:translate-x-1 transition-all relative z-10">
                Contact Support <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Technical Specs */}
          <section className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-brand-blue-600/5 transition-all text-sm">
            <h2 className="text-xl font-bold text-brand-navy-900 dark:text-white mb-6">Technical Specifications</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-loose">
              <p>
                Accessibility of Stronger Built LLC relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:
              </p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>HTML / CSS</li>
                <li>JavaScript</li>
                <li>WAI-ARIA Attributes</li>
              </ul>
              <p className="mt-6">
                These technologies are relied upon for conformance with the accessibility standards used. This statement was last updated on <strong className="text-brand-navy-900 dark:text-white">{lastUpdated}</strong>.
              </p>
            </div>
          </section>
        </div>

      </div>
    </section>
  </div>
  );
}
