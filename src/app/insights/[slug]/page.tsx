"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { use } from "react";
import { insights } from "../page";

export default function InsightDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const data = insights.find(p => p.slug === resolvedParams.slug);

  if (!data) return notFound();

  return (
    <div className="min-h-screen pt-32 pb-24 bg-white dark:bg-black/20">
      <div className="max-w-3xl mx-auto px-4 w-full">
        
        <Link href="/insights" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-blue-600 mb-12 transition-colors font-bold tracking-wide uppercase text-xs">
          <ArrowLeft className="w-4 h-4" /> Back to Insights
        </Link>
        
        <header className="mb-12 border-b border-gray-200 dark:border-white/10 pb-12">
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
            <span className="text-brand-blue-600 font-black">{data.category}</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {data.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {data.readTime}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-brand-navy-900 dark:text-white leading-tight mb-6">
            {data.title}
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            {data.excerpt}
          </p>
        </header>

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
    </div>
  );
}
