"use client";

import { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Building2, 
  Wrench, 
  Package, 
  ArrowUpRight, 
  Info, 
  ClipboardCheck, 
  Search, 
  LineChart, 
  Zap, 
  Clock, 
  ChevronDown,
  X,
  Shield,
  Briefcase,
  Users,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", damping: 20, stiffness: 100 } }
};

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const steps = [
    { num: "01", title: "Find & qualify", desc: "We search opportunities nationwide and bring you only the ones worth your time. Every match gets an honest go/no-go before you spend a dollar.", icon: Search },
    { num: "02", title: "Strategize", desc: "A named consultant builds your win strategy—how to position your strengths, where the disqualification traps are, and how to price to win.", icon: LineChart },
    { num: "03", title: "Write & build", desc: "Expert writers produce the full proposal: every requirement mapped to a response, a complete compliance matrix, clean formatting, all under your company's name.", icon: FileText },
    { num: "04", title: "Review & submit", desc: "Two sets of eyes check every requirement, then we file on time through the buyer's portal and confirm receipt.", icon: ShieldCheck },
    { num: "05", title: "Debrief", desc: "Win or lose, we walk through the result with you, so the next bid is stronger.", icon: Clock }
  ];

  const industries = [
    { name: "IT & Software", desc: "SaaS licenses, custom software development, cloud infrastructure, IT support, cybersecurity audits.", icon: Zap },
    { name: "Healthcare & Staffing", desc: "Medical supplies, nursing services, technical staff augmentation, wellness program administration.", icon: Users },
    { name: "Professional Services", desc: "Management consulting, engineering, financial audits, marketing agencies, legal support services.", icon: Briefcase },
    { name: "Security & Operations", desc: "Armed/unarmed guard services, surveillance installation, alarm monitoring, cybersecurity monitoring.", icon: Shield },
    { name: "Education & Training", desc: "Curriculum design, professional training, educational materials, school district supply services.", icon: Award },
    { name: "Facilities & Maintenance", desc: "Janitorial services, HVAC maintenance, commercial landscaping, multi-trade repairs, electrical audits.", icon: Wrench },
    { name: "Material Supply & Logistics", desc: "Bulk equipment sourcing, specialized materials, office supply networks, delivery services.", icon: Package }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-16 md:pt-40 md:pb-28 overflow-hidden bg-brand-navy-900 border-b border-white/5">
        {/* Background Decorative Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue-600/15 blur-[120px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-brand-blue-600/5 blur-[100px]" />
          <div className="absolute bottom-0 left-0 right-0 h-96 opacity-10 bg-[radial-gradient(#1E6FD9_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div 
            initial="hidden" 
            animate="show" 
            variants={STAGGER}
            className="space-y-8 max-w-4xl mx-auto"
          >
            <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-500/10 border border-brand-blue-500/20 backdrop-blur-md">
              <span className="text-[10px] font-black tracking-[0.25em] text-brand-blue-400 uppercase">
                Expert Proposal Consultants · Nationwide
              </span>
            </motion.div>
            
            <motion.h1 variants={FADE_UP} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.1] font-bold">
              We win government bids for you. <br />
              <span className="italic text-brand-blue-500">You mostly pay when you win.</span>
            </motion.h1>
            
            <motion.p variants={FADE_UP} className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
              Government RFPs are won and lost on the details—the requirements, the compliance, the deadlines. Stronger Built's consultants find the right opportunities, write the winning proposal, and submit it on time. Choose how you pay: a low upfront with a success fee when you win, a flat rate, or a monthly retainer.
            </motion.p>
            
            <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/contact" className="group relative inline-flex items-center justify-center gap-3 bg-brand-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-sm transition-all shadow-2xl shadow-blue-500/20 hover:-translate-y-1">
                <span>Book a Free Consultation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/login?tab=signup" className="group inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-sm transition-all backdrop-blur-sm hover:-translate-y-1">
                <Search className="w-5 h-5 text-brand-blue-500" />
                <span>Search Open Bids — Free</span>
              </Link>
            </motion.div>

            <motion.div variants={FADE_UP} className="flex flex-wrap items-center justify-center gap-y-3 gap-x-6 pt-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
              <div>Nationwide Coverage</div>
              <div className="h-1.5 w-1.5 rounded-full bg-slate-700" />
              <div>All 50 States</div>
              <div className="h-1.5 w-1.5 rounded-full bg-slate-700" />
              <div>No Long-term Contract</div>
              <div className="h-1.5 w-1.5 rounded-full bg-slate-700" />
              <div>Veteran-Owned</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-white dark:bg-brand-navy-900 border-b border-gray-100 dark:border-white/10 relative z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:text-left">
            {[
              "Serving clients in all 50 states",
              "Named consultant on every engagement",
              "On-time submission guaranteed",
              "Two-sets-of-eyes compliance review"
            ].map((text, i) => (
              <div key={i} className="flex items-center justify-center lg:justify-start gap-3 py-2">
                <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 bg-slate-50 dark:bg-black/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.25em]">
                Why this is hard
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-navy-900 dark:text-white font-bold leading-tight">
                Winning government bids is a full-time job.
              </h2>
            </div>
            
            <div className="lg:col-span-7 space-y-6 text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-base md:text-lg">
              <p>
                The opportunities are scattered across thousands of federal, state, county, and city sources. Every RFP is dozens of pages of requirements and formatting rules—and one missed checkbox gets you disqualified before anyone reads your price.
              </p>
              <p>
                Most businesses don't lose because they're the wrong vendor. They lose because bidding well takes time and expertise they can't spare.
              </p>
              <p className="text-brand-blue-600 dark:text-brand-blue-400 font-bold uppercase tracking-wider text-sm">
                That's the part we do.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* D differentiator Section */}
      <section className="py-24 bg-white dark:bg-brand-navy-900 overflow-hidden border-b border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-[3rem] bg-brand-navy-900 p-8 sm:p-12 md:p-16 text-white overflow-hidden shadow-2xl border border-white/5">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue-600/10 rounded-full blur-[80px]" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-[0.25em]">
                  Pricing that's actually on your side
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight leading-tight">
                  Most consultants charge you whether you win or lose. <br />
                  <span className="italic text-brand-blue-400">We'd rather get paid when you win.</span>
                </h2>
              </div>
              <div className="space-y-6 text-slate-300 font-medium leading-relaxed">
                <p>
                  Choose <strong>Pay-When-You-Win</strong>: a low upfront to get started, plus a small percentage of the contract value only if you're awarded. Lose, and you've risked a fraction of what a flat-fee firm charges.
                </p>
                <p>
                  Win, and we both win—which is exactly the point. Prefer predictability? Pick a flat rate or a monthly retainer instead.
                </p>
                <div className="pt-2">
                  <Link href="/#pricing" className="inline-flex items-center gap-2 bg-brand-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5">
                    Compare Pricing Options
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Opportunity Section */}
      <section className="py-24 bg-slate-50 dark:bg-black/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] font-black text-brand-blue-600 uppercase tracking-[0.25em]">
                The big picture
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-navy-900 dark:text-white font-bold leading-tight">
                The federal government alone spends $700+ billion a year.
              </h2>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-base md:text-lg">
                The U.S. government is the largest buyer of goods and services on earth—and by law, a significant share is set aside for small businesses and veteran-owned firms. Add state, county, and city contracts on top, and the opportunity is enormous. The hard part isn't that the work isn't there. It's finding it and winning it. We do both.
              </p>
            </div>
            
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-gray-100 dark:border-white/5 shadow-xl sm:col-span-2">
                <div className="text-5xl font-black text-brand-navy-900 dark:text-white mb-2">$700B+</div>
                <div className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2">Annual federal contract spending</div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                  Trillions more in state, county, city and municipal procurement processes across the United States.
                </p>
              </div>
              
              <div className="p-6 rounded-3xl bg-white dark:bg-brand-navy-900 border border-gray-100 dark:border-white/5 shadow-xl">
                <div className="text-3xl font-black text-brand-blue-600 mb-1">23%</div>
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Small Business Goal</div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                  Federal statutory target set aside for qualified small businesses.
                </p>
              </div>
              
              <div className="p-6 rounded-3xl bg-white dark:bg-brand-navy-900 border border-gray-100 dark:border-white/5 shadow-xl">
                <div className="text-3xl font-black text-brand-blue-600 mb-1">All 50</div>
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">States We Help In</div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                  Broad geographic coverage helping businesses target any locale.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white dark:bg-brand-navy-900 border-b border-gray-100 dark:border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <span className="text-[10px] font-black text-brand-blue-600 uppercase tracking-[0.25em]">
              The process
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-navy-900 dark:text-white font-bold mt-2">
              From "where do I start" to "submitted on time."
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-xl flex items-center justify-center text-brand-blue-600 mb-6 group-hover:scale-110 group-hover:border-brand-blue-600 group-hover:text-brand-blue-600 transition-all duration-300">
                  <step.icon className="w-7 h-7 transition-transform duration-300 group-hover:rotate-6" />
                </div>
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2">{step.num}</span>
                <h4 className="text-lg font-bold text-brand-navy-900 dark:text-white mb-3 uppercase tracking-tight leading-tight h-[2.5em] flex items-center">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-50 dark:bg-black/10 overflow-hidden border-b border-gray-100 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.25em]">
              Transparent pricing
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-navy-900 dark:text-white font-bold leading-tight">
              Three ways to pay. You pick.
            </h2>
            <p className="text-base sm:text-lg text-slate-500 font-medium">
              Same full-service delivery in every option—a named consultant, expert writing, full compliance review, and on-time submission. What changes is how you pay.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
            
            {/* Pay When You Win */}
            <div className="relative flex flex-col p-10 rounded-[3rem] bg-brand-navy-900 border-2 border-brand-blue-600 scale-100 lg:scale-105 shadow-2xl z-10 text-white">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">
                Most Popular
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-2">LOW RISK START</span>
              <div className="mb-4">
                <span className="text-4xl font-bold">$1,500</span>
                <span className="text-slate-400 font-bold text-sm"> upfront</span>
              </div>
              <p className="text-sm text-slate-400 mb-8 font-medium leading-relaxed">
                Low upfront fee to cover initial extraction and strategy setup, plus a small success fee charged only if you win.
              </p>
              
              <div className="space-y-4 flex-grow mb-8 border-t border-white/10 pt-6">
                <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                  <span>Success Fee</span>
                  <span className="text-white font-black">1.0% of contract value</span>
                </div>
                <div className="text-[10px] text-slate-400 leading-relaxed italic">
                  *Example: On a $300,000 contract, you pay a $3,000 success fee only if awarded the contract. Lose, and you pay nothing more.
                </div>
              </div>
              
              <Link href="/contact" className="w-full inline-flex items-center justify-center py-4 rounded-full bg-brand-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30">
                Start a Pay-When-You-Win Bid
              </Link>
            </div>

            {/* Flat Rate */}
            <div className="flex flex-col p-10 rounded-[3rem] border border-gray-200 dark:border-white/5 bg-white dark:bg-brand-navy-900/40 hover:shadow-xl transition-all">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue-600 mb-2">TOTAL CERTAINTY</span>
              <div className="mb-4">
                <span className="text-sm font-black text-slate-400 uppercase tracking-widest block mr-1">One All-Inclusive Price</span>
                <span className="text-4xl font-bold text-brand-navy-900 dark:text-white">Per Bid</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 font-medium leading-relaxed">
                Flat cost per bid with zero success fees. Ideal for businesses with clear budgeting requirements.
              </p>

              <div className="flex flex-col mb-8 bg-slate-50 dark:bg-white/5 p-5 rounded-[2rem] border border-slate-100 dark:border-white/5 space-y-2.5">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1">Pricing by Contract Size</span>
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Contracts up to $1M</span>
                  <span className="text-brand-navy-900 dark:text-white font-black">$450</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Contracts up to $3.5M</span>
                  <span className="text-brand-navy-900 dark:text-white font-black">$850</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Contracts up to $6.5M</span>
                  <span className="text-brand-navy-900 dark:text-white font-black">$1,500</span>
                </div>
              </div>

              <div className="mt-auto">
                <Link href="/contact" className="w-full inline-flex items-center justify-center py-4 rounded-full border-2 border-brand-navy-900 dark:border-white/20 text-brand-navy-900 dark:text-white font-bold text-sm hover:bg-brand-navy-900 dark:hover:bg-white/10 hover:text-white dark:hover:text-white transition-all">
                  Get a Flat-Rate Quote
                </Link>
              </div>
            </div>

            {/* Monthly Retainer */}
            <div className="flex flex-col p-10 rounded-[3rem] border border-gray-200 dark:border-white/5 bg-white dark:bg-brand-navy-900/40 hover:shadow-xl transition-all">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-success mb-2">RECURRING VALUE</span>
              <div className="mb-4">
                <span className="text-sm font-black text-slate-400 uppercase tracking-widest block mr-1">For Active Bidders</span>
                <span className="text-4xl font-bold text-brand-navy-900 dark:text-white">Proposal Team</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 font-medium leading-relaxed">
                Add an entire proposal department to your company. Best for teams bidding on multiple opportunities regularly.
              </p>

              <div className="flex flex-col mb-8 bg-slate-50 dark:bg-white/5 p-5 rounded-[2rem] border border-slate-100 dark:border-white/5 space-y-2.5">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1">Retainer Tiers</span>
                <div className="flex justify-between items-start text-xs font-bold text-slate-700 dark:text-slate-300">
                  <div>
                    <span>Pursue</span>
                    <span className="block text-[9px] text-slate-400 font-medium">1 managed bid / mo</span>
                  </div>
                  <span className="text-brand-navy-900 dark:text-white font-black">$1,500/mo</span>
                </div>
                <div className="flex justify-between items-start text-xs font-bold text-slate-700 dark:text-slate-300">
                  <div>
                    <span>Compete</span>
                    <span className="block text-[9px] text-slate-400 font-medium">2 managed bids / mo</span>
                  </div>
                  <span className="text-brand-navy-900 dark:text-white font-black">$2,800/mo</span>
                </div>
                <div className="flex justify-between items-start text-xs font-bold text-slate-700 dark:text-slate-300">
                  <div>
                    <span>Dominate</span>
                    <span className="block text-[9px] text-slate-400 font-medium">High volume & custom</span>
                  </div>
                  <span className="text-brand-navy-900 dark:text-white font-black">Custom</span>
                </div>
              </div>

              <div className="mt-auto">
                <Link href="/contact" className="w-full inline-flex items-center justify-center py-4 rounded-full border-2 border-brand-navy-900 dark:border-white/20 text-brand-navy-900 dark:text-white font-bold text-sm hover:bg-brand-navy-900 dark:hover:bg-white/10 hover:text-white dark:hover:text-white transition-all">
                  Talk to Us About a Retainer
                </Link>
              </div>
            </div>

          </div>

          {/* What You Get Grid */}
          <div className="max-w-4xl mx-auto bg-white dark:bg-brand-navy-900 rounded-[2.5rem] border border-gray-100 dark:border-white/10 p-8 sm:p-10 shadow-lg text-left">
            <h4 className="text-lg font-bold text-brand-navy-900 dark:text-white mb-6 uppercase tracking-tight border-b border-slate-100 dark:border-white/5 pb-4">
              What you get on every bid
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "A named consultant who owns your bid end to end",
                "Eligibility and honest go/no-go assessment",
                "Full requirement extraction and compliance matrix",
                "Proposal writing, formatting, and design under your name",
                "Two-sets-of-eyes compliance and quality review",
                "On-time submission through the buyer's portal",
                "Post-award debrief session"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-normal">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Operator Credibility */}
      <section className="py-24 bg-white dark:bg-brand-navy-900 overflow-hidden border-b border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.25em]">
                Why clients trust us with their bids
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-navy-900 dark:text-white font-bold leading-tight">
                We've filed these bids ourselves. We know what gets you disqualified.
              </h2>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-base md:text-lg">
                Stronger Built is a veteran-owned firm that has personally navigated government procurement portals and submitted winning bids. We know the requirements buyers actually enforce, the formatting that gets proposals tossed, and the deadlines that don't forgive. When you choose Pay-When-You-Win, our reward depends on your result—so we treat your bid like our own.
              </p>
            </div>
            
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square bg-slate-50 dark:bg-white/5 rounded-[2.5rem] border border-gray-100 dark:border-white/10 shadow-2xl flex items-center justify-center p-8 text-center overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-brand-blue-600/10 rounded-full blur-3xl" />
                <div className="relative z-10 space-y-4">
                  <ShieldCheck className="w-16 h-16 text-brand-blue-600 mx-auto" />
                  <h3 className="text-xl font-bold text-brand-navy-900 dark:text-white uppercase tracking-tight">Veteran-Owned Firm</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                    Personally navigated complex government procurement channels. Built on discipline, compliance, and precision.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Case Studies / Results */}
      <section className="py-24 bg-slate-50 dark:bg-black/10 overflow-hidden border-b border-gray-100 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-[10px] font-black text-brand-blue-600 uppercase tracking-[0.25em]">
                The results speak for themselves
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-navy-900 dark:text-white font-bold mt-2">
                Real bids. Real wins.
              </h2>
            </div>
            
            <Link href="/projects" className="text-brand-blue-600 font-bold hover:text-blue-700 flex items-center gap-2 group text-sm">
              <span>View Case Studies</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              {
                slug: "case-study-1",
                industry: "Information Technology",
                client: "Federal Agency RFP",
                challenge: "RFP required complex cybersecurity clearances and strict compliance metrics on a 10-day turnaround.",
                outcome: "Won proposal. Secured $1.2M multi-year service contract under the Pay-When-You-Win model."
              },
              {
                slug: "case-study-2",
                industry: "Professional Staffing",
                client: "State Procurement Authority",
                challenge: "Highly competitive bid with a complex pricing sheet and strict small business set-aside requirements.",
                outcome: "Successfully qualified and selected as prime vendor. Estimated contract value of $2.4M."
              }
            ].map((study, i) => (
              <div key={i} className="flex flex-col rounded-[2.5rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-brand-navy-900/50 p-8 sm:p-10 shadow-lg group hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue-600">{study.industry}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 px-3 py-1 rounded-full">
                    {study.client}
                  </span>
                </div>
                <div className="space-y-4 mb-8 flex-grow">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <strong className="text-brand-navy-900 dark:text-white text-sm block mb-1">Challenge:</strong>
                    {study.challenge}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <strong className="text-brand-blue-600 dark:text-brand-blue-400 text-sm block mb-1">Result:</strong>
                    {study.outcome}
                  </div>
                </div>
                <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-black text-brand-blue-600 uppercase tracking-widest group/link mt-auto">
                  <span>View Case Study details</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto bg-brand-blue-600/5 rounded-3xl p-8 border border-brand-blue-600/10 text-center">
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-medium italic mb-4">
              "[Real client quote, with permission.]"
            </p>
            <div className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
              [Name, Title, Company]
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-24 bg-white dark:bg-brand-navy-900 overflow-hidden border-b border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-[10px] font-black text-brand-blue-600 uppercase tracking-[0.25em]">
              Wherever there's an RFP
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-navy-900 dark:text-white font-bold mt-2">
              We go where your business goes.
            </h2>
            <p className="text-slate-500 font-medium mt-4">
              If there are government bids in your field, we have a way to win them—nationwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => (
              <div key={i} className="p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 hover:bg-white dark:hover:bg-brand-navy-800 transition-all duration-300 hover:shadow-xl group">
                <div className="w-10 h-10 rounded-xl bg-brand-blue-600/10 flex items-center justify-center text-brand-blue-600 mb-6 group-hover:scale-110 transition-transform">
                  <ind.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-brand-navy-900 dark:text-white mb-2 uppercase tracking-tight">
                  {ind.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                  {ind.desc}
                </p>
              </div>
            ))}
            
            <div className="p-8 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-white/10 flex flex-col justify-center items-center text-center">
              <h3 className="text-lg font-bold text-brand-navy-900 dark:text-white mb-2 uppercase tracking-tight">
                Don't see your industry?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold mb-6 max-w-[200px]">
                We handle bids across almost all sectors. Let's discuss your specific RFP.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-black text-brand-blue-600 uppercase tracking-widest group">
                <span>Let's talk</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50 dark:bg-black/10 border-b border-gray-100 dark:border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.25em]">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-navy-900 dark:text-white font-bold mt-2">
              Common Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How does \"Pay When You Win\" work?",
                a: "You pay a low upfront engagement fee to cover the compliance extraction, compliance matrix setup, and proposal strategy. The remaining success fee is a percentage of the contract value, charged only if your bid is awarded. We confirm exact numbers in writing on your free consultation, before any work starts."
              },
              {
                q: "Who actually writes my proposal?",
                a: "A named human consultant and expert writer is assigned to your engagement. They handle all drafting, compliance tracking, and submission under your company's name. There is no automated or AI drafting; it is entirely human-led expertise."
              },
              {
                q: "Do I have to sign a long-term contract?",
                a: "No. You can engage us for a single bid or sign up for a month-to-month retainer. You are never locked in."
              },
              {
                q: "What if I just want to find opportunities myself?",
                a: "You can use our free nationwide bid search by registering on the portal. When you find an opportunity you want to pursue, you can hire us to handle the strategy, proposal writing, and submission."
              },
              {
                q: "How fast can you turn a bid around?",
                a: "Turnaround times depend on the RFP's size and complexity. Bring us the opportunity as early as possible, and we will give you an honest go/no-go assessment and timeline on our free call."
              }
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 bg-brand-navy-900 overflow-hidden text-white border-t border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-8">
          <span className="text-[10px] font-black text-amber-400 uppercase tracking-[0.25em]">
            Ready to win?
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight leading-tight">
            Let's win your next bid.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto font-medium leading-relaxed">
            Free consultation. Clear terms. And with Pay-When-You-Win, you don't carry the risk alone.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/contact" className="group relative inline-flex items-center justify-center gap-3 bg-brand-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-sm transition-all shadow-xl hover:-translate-y-1">
              <span>Book a Free Consultation</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/login?tab=signup" className="group inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-sm transition-all backdrop-blur-sm hover:-translate-y-1">
              <span>Search Open Bids — Free</span>
            </Link>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-center items-center gap-y-2 gap-x-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <div>📞 (831) 760-0806</div>
            <div className="hidden sm:block">·</div>
            <div>✉️ info@strongerbuilt.us</div>
          </div>
        </div>
      </section>

    </div>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-white/10 rounded-[2rem] bg-white dark:bg-brand-navy-900/40 overflow-hidden transition-all hover:border-brand-blue-600/30 shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between text-left group"
      >
        <span className="text-base sm:text-lg font-bold text-brand-navy-900 dark:text-white group-hover:text-brand-blue-600 transition-colors">{question}</span>
        <ChevronDown 
          className={cn(
            "w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ml-4",
            isOpen && "rotate-180 text-brand-blue-600"
          )} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-8 pb-8">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
