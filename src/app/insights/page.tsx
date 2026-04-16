"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

export const insights = [
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
    <div className="flex flex-col min-h-screen pt-32 pb-24 bg-white dark:bg-black/20">
      <div className="max-w-5xl mx-auto px-4 w-full">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-brand-navy-900 dark:text-white tracking-tight mb-6">
            Insights & <span className="text-brand-blue-600">Guidance</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Actionable intelligence for procurement officers, facility directors, and prime contractors navigating the California public works sector.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-16">
          {insights.map((post, i) => (
            <motion.div 
              key={post.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/insights/${post.slug}`} className="group flex flex-col md:flex-row gap-8 bg-background-light dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <span className="text-brand-blue-600 bg-brand-blue-600/10 px-3 py-1 rounded-full">{post.category}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-black text-brand-navy-900 dark:text-white group-hover:text-brand-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                    {post.excerpt}
                  </p>
                  
                  <div className="pt-2 flex items-center gap-2 text-sm font-bold text-brand-navy-900 dark:text-white group-hover:text-brand-blue-600 transition-colors uppercase tracking-widest">
                    Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Newsletter / RSS Callout */}
        <div className="bg-brand-blue-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <BookOpen className="absolute -right-10 -bottom-10 w-64 h-64 text-white/10" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-black mb-4">Stay Current with Compliance</h3>
            <p className="text-white/80 mb-6">
              Receive quarterly updates on state contracting requirements, prevailing wage modifications, and DVBE sub-participation opportunities.
            </p>
            <div className="flex gap-2">
              <input type="email" placeholder="Enter your .gov or business email" className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white" />
              <button className="bg-white text-brand-blue-600 font-bold px-6 rounded-xl hover:bg-slate-100 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
