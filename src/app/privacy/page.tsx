"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  const lastUpdated = "April 1, 2026";

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background-light dark:bg-black/20">
      <div className="max-w-5xl mx-auto px-4 w-full">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-navy-900 rounded-[2.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden mb-12 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue-600/10 rounded-full blur-[100px]" />
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-blue-600/20 text-brand-blue-600 mb-8 relative z-10">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight relative z-10">
            Privacy <span className="text-brand-blue-600">Policy</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto relative z-10">
            At Stronger Built LLC, we value your privacy and are committed to protecting your professional and personal data.
          </p>
          <div className="mt-10 inline-block bg-white/5 border border-white/10 rounded-full px-6 py-2 text-xs font-bold uppercase tracking-widest relative z-10">
            Last Updated: {lastUpdated}
          </div>
        </motion.div>

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
    </div>
  );
}
