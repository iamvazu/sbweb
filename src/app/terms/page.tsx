"use client";

import { motion } from "framer-motion";
import { FileText, Scale, Gavel, AlertTriangle, ShieldAlert, Check } from "lucide-react";

export default function TermsOfUse() {
  const lastUpdated = "April 1, 2026";

  const terms = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using this website (strongerbuilt.us), you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please do not use our site."
    },
    {
      title: "2. Licensure and Credentials",
      content: "Stronger Built LLC is a licensed California General Building Contractor (CSLB #1057434). Our performance and deliverables are governed by the regulations of the California Contractors State License Board and relevant municipal bid requirements. Use of this site for procurement does not constitute a guaranteed contract award."
    },
    {
      title: "3. Intellectual Property",
      content: "The content on this site, including but not limited to text, graphics, logos, and images (such as our Capabilities Statement), is the property of Stronger Built LLC and is protected by United States and international copyright laws."
    },
    {
      title: "4. Professional Disclaimer",
      content: "Information provided on this site is for general informational and procurement purposes. While we strive for accuracy in our NAICS/UNSPSC and certification reporting, users should verify credentials via official state databases (Cal eProcure/DGS)."
    },
    {
      title: "5. Limitation of Liability",
      content: "Stronger Built Group LLC shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the site content or temporary site downtime during maintenance."
    }
  ];

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

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-blue-50/80 dark:bg-brand-blue-600/10 text-brand-blue-600 mb-8 border border-brand-blue-100 dark:border-brand-blue-600/20 backdrop-blur-md"
          >
            <Scale className="w-8 h-8" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-8 leading-[1.1] uppercase"
          >
            Terms of <span className="text-brand-blue-600 dark:text-brand-blue-400">Use.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
          >
            Operating with transparency and accountability. By interacting with our digital infrastructure, you agree to the regulatory standards outlined below.
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
        <div className="max-w-4xl mx-auto px-4 w-full">


        {/* Introduction */}
        <div className="bg-brand-navy-900 text-white rounded-[2.5rem] p-8 md:p-12 mb-12 shadow-xl shadow-brand-blue-600/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 translate-x-1/4 -translate-y-1/4">
            <Scale className="w-64 h-64" />
          </div>
          <div className="relative z-10 flex items-start gap-6">
            <div className="hidden md:flex w-12 h-12 rounded-xl bg-brand-blue-600 items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xl font-bold leading-relaxed mb-4">
                Operating with Transparency and Accountability.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm">
                Stronger Built LLC provides this website as a resource for government procurement officers, prime contractors, and partner subcontractors. By interacting with our digital infrastructure, you agree to the regulatory standards outlined below.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Accordion/List */}
        <div className="space-y-6 mb-20">
          {terms.map((term, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-2xl p-8 hover:border-brand-blue-600/30 transition-all shadow-sm"
            >
              <h2 className="text-xl font-black mb-4 flex items-center gap-3">
                <Check className="w-5 h-5 text-brand-blue-600" /> {term.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm font-medium">
                {term.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Advisory / Compliance Signals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8 rounded-[2rem]">
              <div className="flex items-center gap-3 mb-4 text-warning">
                 <AlertTriangle className="w-5 h-5" />
                 <span className="font-black text-xs uppercase tracking-widest">Notice to Agencies</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-loose">
                 Stronger Built LLC is a Foreign LLC qualified to do business in California (SOS #B20260157630). All bids submitted are subject to standard procurement laws and DIR prevailing wage requirements.
              </p>
           </div>
           
           <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8 rounded-[2rem]">
              <div className="flex items-center gap-3 mb-4 text-brand-blue-600">
                 <ShieldAlert className="w-5 h-5" />
                 <span className="font-black text-xs uppercase tracking-widest">Governing Law</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-loose">
                 These terms are governed by the laws of the State of California. Any disputes arising from the use of this website shall be resolved in the courts of San Diego County, California.
              </p>
           </div>
        </div>

        <div className="mt-20 pt-12 border-t border-gray-100 dark:border-white/5 text-center">
           <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Stronger Built LLC &copy; 2026</p>
        </div>

      </div>
    </section>
  </div>
  );
}
