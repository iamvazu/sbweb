"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { use } from "react";
import { insights } from "../page";

export default function InsightDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const data = insights.find(p => p.slug === resolvedParams.slug);

  if (!data) return notFound();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative px-6 pt-24 pb-12 md:pt-36 md:pb-20 overflow-hidden bg-brand-navy-900 border-b border-white/5">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue-600/10 blur-[100px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-brand-blue-600/5 blur-[80px]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/insights" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-10 transition-colors font-bold tracking-wide uppercase text-[10px]">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Insights
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] mb-8"
          >
            <span className="text-brand-blue-600 px-3 py-1 rounded-md bg-brand-blue-600/10 border border-brand-blue-600/20 backdrop-blur-md">{data.category}</span>
            <span className="flex items-center gap-1.5 text-slate-400"><Calendar className="w-3.5 h-3.5" /> {data.date}</span>
            <span className="flex items-center gap-1.5 text-slate-400"><Clock className="w-3.5 h-3.5" /> {data.readTime}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight mb-8 leading-[1.1] italic"
          >
            {data.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-3xl font-medium leading-relaxed"
          >
            {data.excerpt}
          </motion.p>
        </div>
      </section>

      <section className="pb-24 pt-16 bg-white dark:bg-black/20">
        <div className="max-w-3xl mx-auto px-4 w-full">


        <article className="prose prose-lg dark:prose-invert prose-brand max-w-none text-slate-600 dark:text-slate-400">
          <p>
            The government contracting landscape in California is inherently complex. Understanding the specific compliance regulations, reporting requirements, and threshold parameters is critical to long-term success whether you are a prime contractor bidding on state mega-projects or an agency facility director maintaining critical infrastructure.
          </p>
          <h2>Navigating Compliance Requirements</h2>
          <p>
            State agencies mandate strict tracking of Commercially Useful Function (CUF) elements when selecting DVBE firms. Brokers that do not actually manage their own labor or handle their own procurement are constantly audited and rejected. Stronger Built Group bypasses this by utilizing our Class B license to actively self-perform and strictly control all deployed specialty trades.
          </p>
          <blockquote>
            "True partnerships aren't just about meeting diversity percentages; they are about executing flawless construction and facilities management securely and transparently."
          </blockquote>
          <h2>The Path Forward</h2>
          <p>
            To leverage these strategies, prime contractors and agencies alike must vet their partners immediately at the RFQ stage. Ensuring your partners have their DIR Registration, CSLB bonds, and proper insurance limits drastically decreases the friction of award validation.
          </p>
        </article>
        </div>
      </section>
    </div>
  );
}
