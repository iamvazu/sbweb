"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function PartnerApplication() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background-light dark:bg-black/20">
      <div className="max-w-3xl mx-auto px-4 w-full">
        
        <Link href="/partners" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-blue-600 mb-8 transition-colors font-bold tracking-wide uppercase text-xs">
          <ArrowLeft className="w-4 h-4" /> Back to Partner Portal
        </Link>
        
        <div className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-brand-blue-600/5">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-black text-brand-navy-900 dark:text-white mb-4">Application Received.</h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg max-w-lg mx-auto">
                Thank you for applying to join the Stronger Built Network. Our procurement team will review your credentials and contact you shortly regarding onboarding and upcoming bid opportunities.
              </p>
            </motion.div>
          ) : (
            <>
              <div className="mb-10 text-center">
                <h1 className="text-3xl md:text-4xl font-black text-brand-navy-900 dark:text-white mb-4">Network Application</h1>
                <p className="text-slate-600 dark:text-slate-400">Complete the form below to be added to our subcontractor vendor index.</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-8">
                
                {/* General Info */}
                <div className="space-y-6">
                  <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase border-b border-gray-100 dark:border-white/10 pb-2">Company Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Company Name <span className="text-red-500">*</span></label>
                      <input required type="text" className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-brand-navy-900 dark:text-white focus:ring-2 focus:ring-brand-blue-600/50 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Contact Person <span className="text-red-500">*</span></label>
                      <input required type="text" className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-brand-navy-900 dark:text-white focus:ring-2 focus:ring-brand-blue-600/50 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Email Address <span className="text-red-500">*</span></label>
                      <input required type="email" className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-brand-navy-900 dark:text-white focus:ring-2 focus:ring-brand-blue-600/50 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Phone Number <span className="text-red-500">*</span></label>
                      <input required type="tel" className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-brand-navy-900 dark:text-white focus:ring-2 focus:ring-brand-blue-600/50 outline-none" />
                    </div>
                  </div>
                </div>

                {/* Licensing & Trade */}
                <div className="space-y-6">
                  <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase border-b border-gray-100 dark:border-white/10 pb-2">Licensure & Trades</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Primary Trade / Service <span className="text-red-500">*</span></label>
                      <select required className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-brand-navy-900 dark:text-white focus:ring-2 focus:ring-brand-blue-600/50 outline-none appearance-none">
                        <option value="">Select Primary Trade</option>
                        <option value="electrical">C-10 Electrical</option>
                        <option value="hvac">C-20 HVAC</option>
                        <option value="landscaping">C-27 Landscaping</option>
                        <option value="painting">C-33 Painting & Decorating</option>
                        <option value="plumbing">C-36 Plumbing</option>
                        <option value="roofing">C-39 Roofing</option>
                        <option value="janitorial">Janitorial Services</option>
                        <option value="supply">Material Supply</option>
                        <option value="other">Other / Specialty</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600 dark:text-slate-300">CSLB License Number (if applicable)</label>
                      <input type="text" className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-brand-navy-900 dark:text-white focus:ring-2 focus:ring-brand-blue-600/50 outline-none" placeholder="e.g. 1234567" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600 dark:text-slate-300">DIR Registration Number <span className="text-slate-400 font-normal text-xs">(Required for Public Works)</span></label>
                      <input type="text" className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-brand-navy-900 dark:text-white focus:ring-2 focus:ring-brand-blue-600/50 outline-none" placeholder="e.g. 1000000123" />
                    </div>
                  </div>
                </div>

                {/* Certifications (Checkboxes) */}
                <div className="space-y-6">
                  <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase border-b border-gray-100 dark:border-white/10 pb-2">Business Certifications</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["DVBE", "Small Business (SB)", "SDVOSB", "DBE", "MBE", "WBE"].map(cert => (
                      <label key={cert} className="flex items-center gap-3 p-3 border border-slate-200 dark:border-white/10 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        <input type="checkbox" className="w-4 h-4 text-brand-blue-600 rounded" />
                        <span className="text-sm font-semibold text-brand-navy-900 dark:text-slate-200">{cert}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Compliance Verification */}
                <div className="space-y-6 bg-slate-50 dark:bg-black/20 p-6 rounded-2xl border border-slate-200 dark:border-white/5">
                  <label className="flex items-start gap-4 cursor-pointer">
                    <input required type="checkbox" className="w-5 h-5 mt-0.5 text-brand-blue-600 rounded border-gray-300 focus:ring-brand-blue-600" />
                    <span className="text-sm font-semibold text-brand-navy-900 dark:text-slate-200 leading-relaxed">
                      I confirm that our company has an active W-9 and current Certificates of Insurance (COI) meeting standard commercial limits on file, and we are ready to supply these documents immediately upon request. <span className="text-red-500">*</span>
                    </span>
                  </label>
                </div>

                <button type="submit" className="w-full bg-brand-blue-600 hover:bg-blue-500 text-white font-black tracking-wide py-4 rounded-xl shadow-lg shadow-brand-blue-600/30 transition-all hover:-translate-y-1">
                  Submit Partnership Application
                </button>
              </form>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
