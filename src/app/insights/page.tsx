"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Lightbulb } from "lucide-react";

export const insights = [
  {
    slug: "how-were-building-california-state-contracting-guide",
    title: "How We’re Building California: A Guide to State Contracting and Our Commitment to Excellence",
    category: "Government Contracting",
    date: "April 2026",
    readTime: "7 min read",
    excerpt: "A strategic look at doing business with the State of California, focusing on DVBE certification, UNSPSC codes, CUF compliance, and emergency readiness."
  },
  {
    slug: "hiring-dvbe-contractors-california-guide",
    title: "The Ultimate Guide to Hiring DVBE Contractors in California",
    category: "Government Contracting",
    date: "April 2026",
    readTime: "6 min read",
    excerpt: "Learn how prime contractors and state agencies can meet their 3% Disabled Veteran Business Enterprise (DVBE) participation goals while ensuring high-quality CUF compliance."
  },
  {
    slug: "benefits-of-preventative-facility-maintenance",
    title: "Why Preventative Facility Maintenance Saves Municipalities Millions",
    category: "Facility Management",
    date: "April 2026",
    readTime: "4 min read",
    excerpt: "Reactive maintenance costs up to four times more than preventative care. We break down the ROI of regular HVAC, plumbing, and roofing maintenance for public buildings."
  },
  {
    slug: "commercial-janitorial-standards-post-2025",
    title: "Elevating Public Health: Commercial Janitorial Standards for Government Buildings",
    category: "Janitorial Services",
    date: "March 2026",
    readTime: "5 min read",
    excerpt: "High-traffic state and county properties require rigorous, verifiable sanitization protocols. Discover what to look for when procuring DIR-registered custodial services."
  }
];

export default function InsightsBlog() {
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
            <Lightbulb className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-[10px] font-black tracking-[0.2em] text-amber-400 uppercase">Thought Leadership Desk</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight mb-8 leading-[1.1]"
          >
            Insights & <br className="hidden md:block"/>
            <span className="italic text-brand-blue-600">Strategic Guidance.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
          >
            Actionable intelligence for procurement officers, facility directors, and prime contractors navigating the California public works sector.
          </motion.p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-24 w-full">
        <div className="grid grid-cols-1 gap-8 mb-24">
          {insights.map((post, i) => (
            <motion.div 
              key={post.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/insights/${post.slug}`} className="group flex flex-col md:flex-row gap-8 bg-slate-50 dark:bg-brand-navy-900/40 border border-gray-200 dark:border-white/10 rounded-[2rem] p-8 md:p-10 hover:shadow-2xl transition-all duration-300">
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                    <span className="text-amber-600 bg-amber-400/10 px-4 py-1.5 rounded-full">{post.category}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-serif text-brand-navy-900 dark:text-white group-hover:text-brand-blue-600 transition-colors italic leading-tight">
                    {post.title}
                  </h2>
                  
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg font-medium">
                    {post.excerpt}
                  </p>
                  
                  <div className="pt-2 flex items-center gap-2 text-xs font-black text-brand-navy-900 dark:text-white group-hover:text-brand-blue-600 transition-colors uppercase tracking-widest">
                    Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Newsletter / RSS Callout */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-brand-navy-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl"
        >
          <BookOpen className="absolute -right-12 -bottom-12 w-80 h-80 text-white/5" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl font-serif mb-6 italic">Stay Current with Compliance</h3>
            <p className="text-slate-300 mb-10 text-lg leading-relaxed">
              Receive quarterly updates on state contracting requirements, prevailing wage modifications, and DVBE sub-participation opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Business email address" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-blue-600 transition-all font-medium" 
              />
              <button className="bg-brand-blue-600 text-white font-black text-xs uppercase tracking-widest px-10 py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
