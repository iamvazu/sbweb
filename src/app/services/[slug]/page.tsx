"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle, 
  Briefcase, 
  ChevronRight,
  Search,
  Building2,
  Calendar,
  DollarSign
} from "lucide-react";
import { use } from "react";
import { INDUSTRIES_DATA } from "@/lib/data/industries";
import { JsonLd } from "@/components/seo/json-ld";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const data = INDUSTRIES_DATA[resolvedParams.slug];

  if (!data) return notFound();

  // Create Article schema dynamically
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.title,
    "description": data.lead,
    "datePublished": "2026-06-01T00:00:00Z",
    "dateModified": "2026-06-06T18:24:00Z",
    "author": {
      "@type": "Organization",
      "name": "Stronger Built LLC"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Stronger Built LLC",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.strongerbuilt.us/logo.png"
      }
    },
    "mainEntityOfPage": `https://strongerbuilt.us/services/${resolvedParams.slug}`
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black/20 font-sans">
      
      {/* Dynamic Article JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <JsonLd type="FAQPage" data={data.faqs} />
      
      {/* Premium Light Hero - HARMONIZED */}
      <section className="relative px-6 pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50/20 to-white dark:from-brand-navy-950 dark:via-brand-navy-900 dark:to-brand-navy-950 border-b border-slate-200/50 dark:border-white/5">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue-600/10 dark:bg-brand-blue-600/15 blur-[100px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-brand-blue-600/5 blur-[80px]" />
          <div className="absolute bottom-0 left-0 right-0 h-96 opacity-[0.03] dark:opacity-10 bg-[radial-gradient(#1E6FD9_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          <div className="max-w-4xl mx-auto flex justify-center pb-4">
            <Breadcrumbs items={[
              { label: "Services", href: "/services" },
              { label: data.title, href: `/services/${resolvedParams.slug}` }
            ]} />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50/80 dark:bg-brand-blue-600/10 border border-brand-blue-100 dark:border-brand-blue-600/20 backdrop-blur-md"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-brand-blue-600 dark:text-brand-blue-400" />
            <span className="text-[10px] font-black tracking-[0.2em] text-brand-blue-600 dark:text-brand-blue-400 uppercase">RFP Target Vertical</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 dark:text-white tracking-tight leading-[1.1] capitalize"
          >
            Win <span className="italic text-brand-blue-600 dark:text-brand-blue-400">{data.title.split(' ').slice(1, -2).join(' ')}</span> <br className="hidden md:block"/>
            Government Contracts.
          </motion.h1>

          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-4 pt-2">
            <span>NAICS: {data.naics}</span>
            <span className="text-slate-200 dark:text-slate-800">|</span>
            <span>UNSPSC: {data.unspsc}</span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-4xl mx-auto px-6 py-16 w-full space-y-16">
        
        {/* Intro Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-50 dark:bg-brand-navy-900/40 border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-14 lg:p-16 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue-600/5 rounded-full blur-[80px]" />
          
          <div className="relative z-10 space-y-8">
            <p className="text-xl md:text-2xl font-serif text-brand-navy-900 dark:text-slate-200 leading-relaxed italic border-l-4 border-brand-blue-600 pl-6">
              {data.lead}
            </p>
          </div>
        </motion.div>

        {/* Core Layout - Why bids won/lost & What we do */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-6">
          <div className="space-y-4">
            <h3 className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-600" /> Why Bids Are Won & Lost
            </h3>
            <h4 className="text-xl font-bold text-brand-navy-900 dark:text-white font-serif italic">The specifics evaluators score in this vertical</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {data.whyBidsWonLost}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-brand-blue-600" /> What We Do For Bidders
            </h3>
            <h4 className="text-xl font-bold text-brand-navy-900 dark:text-white font-serif italic">Full-cycle response under your brand</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {data.whatWeDo}
            </p>
          </div>
        </div>

        {/* Who We Help Section */}
        <div className="bg-slate-50 dark:bg-white/5 rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 space-y-2">
            <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest">Eligibility Match</span>
            <h4 className="text-xl font-bold text-brand-navy-900 dark:text-white font-serif italic">Who We Help</h4>
          </div>
          <div className="md:col-span-8">
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {data.whoWeHelp}
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="pt-8 border-t border-slate-100 dark:border-white/5">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-serif text-brand-navy-900 dark:text-white italic">Frequently Asked Questions</h3>
          </div>
          
          <FAQAccordion faqs={data.faqs} />
        </div>

        {/* CTA Area */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-12 border-t border-slate-100 dark:border-white/5">
          <Link 
            href="/book-call" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand-navy-900 hover:bg-slate-800 text-white px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-xl hover:-translate-y-0.5"
          >
            Book a Free Consultation
          </Link>
          <Link 
            href={`/open-bids?search=${encodeURIComponent(data.industryName)}`} 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-brand-blue-600/20 hover:-translate-y-0.5"
          >
            <Search className="w-4 h-4" /> Search Open {data.title.split(' ').slice(1, -2).join(' ')} Bids
          </Link>
        </div>

        {/* Byline / Trust Badges */}
        <div className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest pt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <span>Veteran-owned</span>
          <span>•</span>
          <span>Nationwide Sourcing</span>
          <span>•</span>
          <span>Updated June 2026</span>
        </div>

      </div>
    </div>
  );
}
