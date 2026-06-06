"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  const lastUpdated = "April 1, 2026";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative px-6 pt-24 pb-12 md:pt-36 md:pb-20 overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50/20 to-white dark:from-brand-navy-950 dark:via-brand-navy-900 dark:to-brand-navy-950 border-b border-slate-200/50 dark:border-white/5">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue-600/10 dark:bg-brand-blue-600/15 blur-[100px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-brand-blue-600/5 blur-[80px]" />
          <div className="absolute bottom-0 left-0 right-0 h-96 opacity-[0.03] dark:opacity-10 bg-[radial-gradient(#1E6FD9_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-blue-50/80 dark:bg-brand-blue-600/10 text-brand-blue-600 mb-8 border border-brand-blue-100 dark:border-brand-blue-600/20 backdrop-blur-md"
          >
            <Shield className="w-8 h-8" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-8 leading-[1.1] uppercase"
          >
            Privacy <span className="text-brand-blue-600 dark:text-brand-blue-400">Policy.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
          >
            At Stronger Built LLC, we value your privacy and are committed to protecting your professional and personal data.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400"
          >
            Last Updated: {lastUpdated}
          </motion.div>
        </div>
      </section>

      <section className="pb-24 pt-16 bg-white dark:bg-black/20">
        <div className="max-w-5xl mx-auto px-4 w-full">


        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Policy Content */}
          <div className="lg:col-span-2 space-y-12">
            <section className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
              <h2 className="text-2xl font-black text-brand-navy-900 dark:text-white mb-8 flex items-center gap-3">
                <Lock className="w-6 h-6 text-brand-blue-600" /> Information Collection
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 space-y-6">
                <p>
                  We collect information that you provide directly to us when you fill out forms on our website, such as our "Request a Quote" form or our "Partner Network Application." This information may include:
                </p>
                <ul className="list-disc pl-5 space-y-2 font-medium">
                  <li>Full Name and Professional Title</li>
                  <li>Company/Organization Name</li>
                  <li>Email address and Phone number</li>
                  <li>CSLB License and DIR Registration details</li>
                  <li>Project location and budget parameters</li>
                </ul>
              </div>
            </section>

            <section className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
              <h2 className="text-2xl font-black text-brand-navy-900 dark:text-white mb-8 flex items-center gap-3">
                <Database className="w-6 h-6 text-brand-blue-600" /> How We Use Data
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 space-y-6">
                <p>
                  Stronger Built LLC uses the collected data for various professional purposes, specifically focused on procurement and project execution:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "To respond to your bid solicitations or RFPs.",
                    "To evaluate subcontractor credentials for our network.",
                    "To comply with California DIR reporting requirements.",
                    "To provide project updates and critical safety alerts.",
                    "To analyze site performance via Vercel Analytics.",
                    "To prevent fraudulent form submissions."
                  ].map((use, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-black/20 rounded-xl border border-slate-100 dark:border-white/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue-600 mt-2 shrink-0"></div>
                      <span className="text-sm font-semibold">{use}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
              <h2 className="text-2xl font-black text-brand-navy-900 dark:text-white mb-8 flex items-center gap-3">
                <Globe className="w-6 h-6 text-brand-blue-600" /> Third-Party Services
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                We do not sell your data. However, we leverage industry-standard service providers to maintain our operations:
              </p>
              <div className="space-y-4">
                {[
                  { name: "Vercel", use: "Hosting and infrastructure performance monitoring." },
                  { name: "Resend", use: "Transactional email delivery for form confirmations." },
                  { name: "Google reCAPTCHA", use: "Spam protection and security." }
                ].map((service, i) => (
                  <div key={i} className="flex flex-col p-6 border border-slate-100 dark:border-white/5 rounded-2xl">
                    <span className="text-brand-navy-900 dark:text-white font-black text-lg">{service.name}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-sm mt-1">{service.use}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Side Info / CTA */}
          <div className="space-y-8">
            <div className="bg-brand-blue-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-brand-blue-600/20 sticky top-32">
              <Eye className="w-12 h-12 mb-6" />
              <h3 className="text-2xl font-black mb-4">CCPA Compliance</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-8">
                California residents have the right to request access to their data, request deletion, and opt-out of data sharing. As a California-registered LLC, Stronger Built Group respects these rights.
              </p>
              <Link href="/contact" className="group flex items-center justify-between bg-white text-brand-navy-900 px-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all">
                Submit Data Request <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="text-lg font-black text-brand-navy-900 dark:text-white mb-4 italic">Questions?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-loose mb-6">
                If you have questions about our handling of your data, please contact our privacy desk at:
              </p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Stronger Built LLC &copy; 2026</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  </div>
  );
}
