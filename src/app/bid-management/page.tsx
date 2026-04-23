"use client";

import { motion, Variants } from "framer-motion";
import { 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Search, 
  Calculator, 
  ShieldCheck, 
  ClipboardCheck, 
  Users, 
  TrendingUp, 
  Star,
  Quote,
  Zap,
  LineChart,
  Globe,
  Database,
  PlayCircle,
  X,
  Shield
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import BidTicker from "@/components/market/bid-ticker";
import MarketInsights from "@/components/market/market-insights";

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", damping: 20, stiffness: 100 } }
};

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function BidManagementPage() {

  const services = [
    { 
      title: "Full-Cycle Bid Management", 
      desc: "We manage every checkmark, signature, and digital portal submission across Cal eProcure, PlanetBids, and more.",
      icon: ClipboardCheck,
      image: "/images/services/bid-management.png"
    },
    { 
      title: "DIR & Prevailing Wage Compliance", 
      desc: "Precision oversight of labor compliance to protect your eligibility and avoid costly project penalties.",
      icon: ShieldCheck,
      image: "/images/services/project-management-team.png"
    },
    { 
      title: "Financial Modeling", 
      desc: "Custom-built projection models to ensure your bid is aggressive enough to win, yet safe enough to be profitable.",
      icon: Calculator,
      image: "/images/services/material-supply.png"
    },
    { 
      title: "RFP Analysis", 
      desc: "Our team dissects complex solicitation documents to find the hidden 'must-haves' and disqualification traps.",
      icon: Search,
      image: "/images/services/bid-management.png"
    },
    { 
      title: "Compliance Tracking", 
      desc: "Live monitoring of your certification status, insurance validity, and DIR registration during the bid window.",
      icon: TrendingUp,
      image: "/images/services/subcontracting-logistics.png"
    },
    { 
      title: "Site Walk Representation", 
      desc: "In-person representation at mandatory pre-bid meetings to ensure you meet disqualification-risk requirements.",
      icon: Users,
      image: "/images/services/janitorial-service.png"
    }
  ];

  const steps = [
    { num: "01", title: "Build Your Profile", desc: "Add NAICS codes, certifications, and service regions. Takes 2 minutes.", icon: ClipboardCheck },
    { num: "02", title: "AI Scans Portals", desc: "Our engine monitors 25+ CA procurement systems 24/7 for you.", icon: Search },
    { num: "03", title: "Score & Rank", desc: "Every bid gets a fit score and win-probability signal instantly.", icon: LineChart },
    { num: "04", title: "Strategic Support", desc: "Expert analysis of RFPs to find hidden landmines and pricing traps.", icon: Zap },
    { num: "05", title: "Compliance Secure", desc: "End-to-end filing for DIR, prevailing wage, and final submission.", icon: ShieldCheck }
  ];

  const portals = [
    "Cal eProcure", "PlanetBids", "San Diego BuyNet", "City of Los Angeles (RAMP)", 
    "Port of Long Beach", "Oakland iSupplier", "Orange County Bids", "City of San Jose",
    "Sacramento County", "Riverside County", "Fresno County", "San Bernardino ePro",
    "City of Anaheim", "City of Fullerton", "OCTA", "City of Irvine",
    "CSU System", "UC System", "Metrolink", "BART", "MTS San Diego"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section - COMPACTED */}
      <section className="relative px-6 pt-24 pb-12 md:pt-36 md:pb-20 overflow-hidden bg-brand-navy-900 border-b border-white/5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue-600/10 blur-[100px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-brand-blue-600/5 blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            <motion.div initial="hidden" animate="show" variants={STAGGER} className="lg:col-span-7 space-y-6">
              <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 backdrop-blur-md">
                <span className="text-[10px] font-black tracking-[0.2em] text-amber-400 uppercase">Strategic Procurement Advisory</span>
              </motion.div>
              
              <motion.h1 variants={FADE_UP} className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1]">
                Winning Government Bids <br className="hidden md:block"/>
                <span className="italic text-brand-blue-600">Is a Full-Time Job.</span>
              </motion.h1>
              
              <motion.p variants={FADE_UP} className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed font-medium">
                Stop guessing on RFP requirements. We've helped California small businesses win government contracts from $50,000 to $2 million.
              </motion.p>
              
              <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/contact" className="group relative inline-flex items-center justify-center gap-3 bg-brand-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-sm transition-all shadow-2xl shadow-blue-500/20 hover:-translate-y-1">
                  <span>Start Successful Bidding</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="#how-it-works" className="group inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-sm transition-all backdrop-blur-sm hover:-translate-y-1">
                  <PlayCircle className="w-5 h-5 text-brand-blue-600" />
                  <span>See How It Works</span>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
              className="lg:col-span-5 relative hidden md:block"
            >
               <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border-8 border-white/5 shadow-2xl">
                  <img src="/images/bid-analysis-hero.png" alt="Bid IQ Dashboard" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900/40 via-transparent to-transparent" />
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Bid Pulse */}
      <section className="py-12 bg-white dark:bg-brand-navy-900 border-b border-gray-100 dark:border-white/10 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <BidTicker />
        </div>
      </section>

      {/* Market Intelligence Dashboard - NEW */}
      <section className="py-12 md:py-20 bg-slate-50 dark:bg-black/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-[11px] font-black text-amber-600 uppercase tracking-[0.3em] mb-4">Market Intelligence</h2>
            <h3 className="text-3xl md:text-5xl font-serif text-brand-navy-900 dark:text-white mb-6">Real-Time Opportunity <span className="italic text-brand-blue-600">Analytics.</span></h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium max-w-2xl leading-relaxed">
              We track thousands of solicitations across California. Our AI categorizes and scores each one so you can focus on the most profitable opportunities.
            </p>
          </div>
          <MarketInsights />
        </div>
      </section>

      {/* About & Impact Strip */}
      <section className="bg-white dark:bg-brand-navy-900 border-b border-gray-100 dark:border-white/10 relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div>
                <h2 className="text-[11px] font-black text-amber-600 uppercase tracking-[0.3em] mb-4">About the Service</h2>
                <h3 className="text-3xl md:text-5xl font-serif text-brand-navy-900 dark:text-white mb-6 leading-tight">Giving Small Businesses a <span className="italic text-brand-blue-600">Fair Shot.</span></h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  We believe every qualified small business deserves a fair shot at government work. BidIQ monitors every portal, ranks each opportunity by fit, and provides the strategic oversight needed to win.
                </p>
                <Link href="/portal/onboarding" className="inline-flex items-center gap-2 mt-8 text-brand-blue-600 font-black uppercase tracking-widest text-xs group">
                  Sign Up For Free <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Link>
             </div>
             
             <div className="grid grid-cols-2 gap-8">
                {[
                  { value: "20h+", label: "Saved Weekly", sub: "vs manual searching" },
                  { value: "5+", label: "High-Fit Bids", sub: "daily matches" },
                  { value: "30+", label: "CA Portals", sub: "scanned 24/7" },
                  { value: "5.0", label: "Star Rating", sub: "by CA contractors" }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col border-l-2 border-brand-blue-600/20 pl-6">
                    <span className="text-3xl md:text-4xl font-serif font-black text-brand-navy-900 dark:text-white mb-1">{stat.value}</span>
                    <span className="text-[11px] font-black text-amber-600 uppercase tracking-widest leading-none mb-1">{stat.label}</span>
                    <span className="text-[9px] text-slate-500 font-bold uppercase">{stat.sub}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* How It Works - 5 STEPS */}
      <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-black/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-[11px] font-black text-amber-600 uppercase tracking-[0.3em] mb-4">The Workflow</h2>
            <h3 className="text-3xl md:text-5xl font-serif text-brand-navy-900 dark:text-white mb-6">Start Bidding in <span className="italic text-brand-blue-600">5 Simple Steps</span></h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 shadow-xl flex items-center justify-center text-brand-blue-600 mb-6 group-hover:scale-110 group-hover:border-brand-blue-600 transition-all">
                    <step.icon className="w-7 h-7" />
                  </div>
                  <div className="absolute top-8 left-1/2 w-full h-[2px] bg-slate-200 dark:bg-white/5 -z-0 hidden md:block last:hidden" />
                  <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2">{step.num}</span>
                  <h4 className="text-lg font-bold text-brand-navy-900 dark:text-white mb-3 uppercase tracking-tight leading-none h-[2em]">{step.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upgraded Service Cards */}
      <section className="py-24 bg-white dark:bg-brand-navy-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((svc, i) => (
              <motion.div 
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-[16/9] relative overflow-hidden">
                   <img src={svc.image} alt={svc.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-brand-navy-900/20 group-hover:bg-transparent transition-colors" />
                   <div className="absolute top-6 left-6 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center text-brand-blue-600 shadow-xl rotate-3 group-hover:rotate-0 transition-transform">
                      <svc.icon className="w-6 h-6" />
                   </div>
                </div>
                
                <div className="p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-brand-navy-900 dark:text-white mb-4 tracking-tight group-hover:text-brand-blue-600 transition-colors uppercase leading-none">{svc.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-sm flex-grow">
                    {svc.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Sources Section */}
      <section className="py-24 bg-brand-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#1E6FD9_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
           <h2 className="text-[11px] font-black text-amber-400 uppercase tracking-[0.3em] mb-4">Procurement Intelligence</h2>
           <h3 className="text-5xl md:text-7xl font-serif text-white mb-6 italic">25+ Portals. <span className="text-brand-blue-600">One Feed.</span></h3>
           <p className="text-lg text-slate-400 mb-16 max-w-2xl mx-auto font-medium">We monitor state, county, city, university, and many other procurement systems so you never have to.</p>
           
           <div className="flex flex-wrap justify-center gap-3">
              {portals.map((p, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 border border-white/10 hover:border-brand-blue-600 px-6 py-3 rounded-full text-xs font-bold text-slate-300 hover:text-white transition-all cursor-default"
                >
                  {p}
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* NEW PRICING SECTION - MODEL C */}
      <section id="pricing" className="py-32 bg-white dark:bg-black/20 overflow-hidden">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h3 className="text-3xl md:text-5xl font-serif text-brand-navy-900 dark:text-white mb-4 italic">Simple, transparent pricing</h3>
               <p className="text-lg text-slate-500 font-medium">Start free. Pay as you grow. We only take a success fee when you win.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch mb-20">
               
               {/* CARD 1 — FREE */}
               <div className="order-2 lg:order-1 flex flex-col p-10 rounded-[3rem] border border-gray-200 bg-white hover:shadow-xl transition-all">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 mb-2">ALWAYS FREE</span>
                  <div className="flex items-baseline gap-1 mb-6">
                     <span className="text-5xl font-bold text-brand-navy-900">$0</span>
                     <span className="text-slate-500 font-bold text-sm">forever</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-8 font-medium leading-relaxed">
                     Set up your business profile and see which California government contracts match your certifications and service area. No credit card required.
                  </p>
                  <div className="space-y-4 mb-10 flex-grow">
                     <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-blue-600 shrink-0" />
                        <span className="text-xs font-bold text-brand-navy-900">Business profile</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-blue-600 shrink-0" />
                        <span className="text-xs font-bold text-brand-navy-900">See matched bids</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-blue-600 shrink-0" />
                        <span className="text-xs font-bold text-brand-navy-900">5 bid alerts / mo</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-blue-600 shrink-0" />
                        <span className="text-xs font-bold text-brand-navy-900">Basic compliance flags</span>
                     </div>
                     <div className="flex items-center gap-3 text-slate-300">
                        <X className="w-5 h-5 shrink-0" />
                        <span className="text-xs font-bold">AI bid plans & SWOT</span>
                     </div>
                     <div className="flex items-center gap-3 text-slate-300">
                        <X className="w-5 h-5 shrink-0" />
                        <span className="text-xs font-bold">Prospective bidder data</span>
                     </div>
                  </div>
                  <Link href="/portal/signup" className="w-full inline-flex items-center justify-center py-4 rounded-full border-2 border-brand-navy-900 text-brand-navy-900 font-bold text-sm hover:bg-brand-navy-900 hover:text-white transition-all">
                     Create Free Account
                  </Link>
               </div>

               {/* CARD 2 — SCOUT */}
               <div className="order-3 lg:order-2 flex flex-col p-10 rounded-[3rem] border border-gray-200 bg-white hover:shadow-xl transition-all">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue-600 mb-2">MONTHLY SUBSCRIPTION</span>
                  <div className="flex items-baseline gap-1 mb-6">
                     <span className="text-5xl font-bold text-brand-navy-900">$49</span>
                     <span className="text-slate-500 font-bold text-sm">/ month</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-8 font-medium leading-relaxed">
                     100 bid alerts for your services per month. State portal (Cal eProcure) access. AI fit score matching your business profile.
                  </p>
                  <div className="space-y-4 mb-10 flex-grow">
                     <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-blue-600 shrink-0" />
                        <span className="text-xs font-bold text-brand-navy-900">Everything in Free</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-blue-600 shrink-0" />
                        <span className="text-xs font-bold text-brand-navy-900">100 bid alerts / month</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-blue-600 shrink-0" />
                        <span className="text-xs font-bold text-brand-navy-900">Cal eProcure State Portal</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-blue-600 shrink-0" />
                        <span className="text-xs font-bold text-brand-navy-900">AI fit score matching profile</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-blue-600 shrink-0" />
                        <span className="text-xs font-bold text-brand-navy-900">Daily email digest</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-blue-600 shrink-0" />
                        <span className="text-xs font-bold text-brand-navy-900">Pipeline tracker</span>
                     </div>
                  </div>
                  <Link href="/portal/signup?plan=scout" className="w-full inline-flex items-center justify-center py-4 rounded-full border-2 border-brand-navy-900 text-brand-navy-900 font-bold text-sm hover:bg-brand-navy-900 hover:text-white transition-all">
                     Start Scout — $49/mo
                  </Link>
               </div>

               {/* CARD 3 — PRO */}
               <div className="relative order-1 lg:order-3 flex flex-col p-10 rounded-[3rem] bg-brand-navy-900 border-2 border-brand-blue-600 scale-105 shadow-2xl z-10">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">
                     Most Popular
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-2">MONTHLY SUBSCRIPTION</span>
                  <div className="flex items-baseline gap-1 mb-6 text-white">
                     <span className="text-5xl font-bold">$99</span>
                     <span className="text-slate-400 font-bold text-sm">/ month</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-8 font-medium leading-relaxed">
                     All 25+ California state, city, county and educational portals. Unlimited bid alerts and deep AI analysis.
                  </p>
                  <div className="space-y-4 mb-10 flex-grow">
                     <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-blue-600 shrink-0" />
                        <span className="text-xs font-bold text-white">Everything in Scout</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-blue-600 shrink-0" />
                        <span className="text-xs font-bold text-white">Unlimited bid alerts</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-blue-600 shrink-0" />
                        <span className="text-xs font-bold text-white">All 25+ California portals</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-blue-600 shrink-0" />
                        <span className="text-xs font-bold text-white">AI Analysis (10 unlocked bids)</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-blue-600 shrink-0" />
                        <span className="text-xs font-bold text-white">DIR/Wage compliance screening</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-blue-600 shrink-0" />
                        <span className="text-xs font-bold text-white">Priority email support</span>
                     </div>
                  </div>
                  <Link href="/portal/signup?plan=pro" className="w-full inline-flex items-center justify-center py-4 rounded-full bg-white text-brand-navy-900 font-bold text-sm hover:bg-slate-100 transition-all shadow-xl">
                     Start Pro — $99/mo
                  </Link>
               </div>

               {/* CARD 4 — MANAGED */}
               <div className="order-4 lg:order-4 flex flex-col p-10 rounded-[3rem] border border-gray-200 bg-white hover:shadow-xl transition-all">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-success mb-2">PER SUBMISSION</span>
                  <div className="flex items-baseline gap-1 mb-6">
                     <span className="text-5xl font-bold text-brand-navy-900">$249</span>
                     <span className="text-slate-500 font-bold text-sm">per bid</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-8 font-medium leading-relaxed">
                     We write the complete proposal under your business name and file it on the portal. You focus on the work — we handle the paperwork.
                  </p>
                  <div className="space-y-4 mb-6 flex-grow">
                     <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-blue-600 shrink-0" />
                        <span className="text-xs font-bold text-brand-navy-900">Full RFP / IFB analysis</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-blue-600 shrink-0" />
                        <span className="text-xs font-bold text-brand-navy-900">Proposal writing & filing</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-blue-600 shrink-0" />
                        <span className="text-xs font-bold text-brand-navy-900">Labor compliance review</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-blue-600 shrink-0" />
                        <span className="text-xs font-bold text-brand-navy-900">Pre-bid representation</span>
                     </div>
                  </div>
                  
                  <div className="border-t border-slate-100 pt-6 mb-8">
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">If you win</span>
                     <span className="text-lg font-black text-brand-navy-900 block leading-none">0.75% of contract value</span>
                     <span className="text-[9px] text-slate-400 font-bold leading-tight block mt-1 italic">
                        On a $300,000 contract that is $2,250 — only charged if you are awarded the contract.
                     </span>
                  </div>

                  <Link href="/portal/hire" className="w-full inline-flex items-center justify-center py-4 rounded-full bg-brand-navy-900 text-white font-bold text-sm hover:bg-brand-blue-600 transition-all shadow-lg">
                     Get RFP Help — $249/bid
                  </Link>
               </div>

            </div>

            {/* Trust Callout Box */}
            <div className="max-w-4xl mx-auto bg-brand-blue-50 border-l-4 border-brand-blue-600 rounded-xl p-6 md:p-8 mb-20 shadow-sm">
               <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-brand-blue-600 shrink-0" />
                  <div>
                     <h4 className="text-sm font-bold text-brand-blue-600 uppercase tracking-widest mb-2">Why businesses trust us with their bids</h4>
                     <p className="text-sm text-brand-navy-900 font-medium leading-relaxed">
                        StrongerBuilt LLC is a licensed California general contractor (CSLB #1057434), SDVOSB and DVBE certified. We have personally submitted government bids on CaleProcure, PlanetBids, and Caltrans. We know what gets proposals disqualified — and we make sure yours never is.
                     </p>
                  </div>
               </div>
            </div>

            {/* FAQ Accordion */}
            <div className="max-w-3xl mx-auto mb-20">
               <h3 className="text-2xl font-serif text-brand-navy-900 dark:text-white mb-8 text-center italic">Frequently Asked Questions</h3>
               <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-slate-100 dark:border-white/10">
                     <AccordionTrigger className="text-sm font-bold text-brand-navy-900 dark:text-white hover:text-brand-blue-600">
                        Do I need a subscription to use the managed bid service?
                     </AccordionTrigger>
                     <AccordionContent className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                        No. The $249 managed submission is a standalone service. You can pay per bid with no monthly commitment. A subscription gives you the AI matching and intelligence layer — but it is not required to hire us to write a bid.
                     </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border-slate-100 dark:border-white/10">
                     <AccordionTrigger className="text-sm font-bold text-brand-navy-900 dark:text-white hover:text-brand-blue-600">
                        What is the success fee and when do I pay it?
                     </AccordionTrigger>
                     <AccordionContent className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                        The success fee is 0.75% of the contract value, charged only if your bid is awarded. On a $200,000 contract that is $1,500. If you do not win, the only cost is the $249 submission fee. The success fee is invoiced after the award notice is issued.
                     </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="border-slate-100 dark:border-white/10">
                     <AccordionTrigger className="text-sm font-bold text-brand-navy-900 dark:text-white hover:text-brand-blue-600">
                        What counts as a mandatory pre-bid meeting and can you attend on my behalf?
                     </AccordionTrigger>
                     <AccordionContent className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                        Some California government contracts require all bidders to attend an in-person or virtual meeting before the submission deadline. If your name is not on the sign-in sheet, your bid is automatically disqualified — by law, with no exceptions. BidIQ flags these automatically. For Full-Cycle managed submissions, site walk attendance is included.
                     </AccordionContent>
                  </AccordionItem>
               </Accordion>
            </div>
         </div>

         {/* Final CTA Strip */}
         <div className="bg-brand-navy-900 py-20 px-6 mt-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1E6FD9_1px,transparent_1px)] [background-size:40px_40px] opacity-10" />
            <div className="max-w-4xl mx-auto text-center relative z-10">
               <h3 className="text-3xl md:text-5xl font-serif text-white mb-6 tracking-tight leading-[1.1]">
                  Ready to win your first <br className="hidden md:block"/> government contract?
               </h3>
               <p className="text-lg text-slate-400 mb-10 font-medium">
                  Join thousands of California small businesses using BidIQ to find, prepare, and win.
               </p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                  <Link href="/portal/signup" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-brand-blue-600 text-white font-bold text-sm hover:bg-brand-blue-700 transition-all shadow-2xl shadow-blue-500/20">
                     Create Free Account
                  </Link>
                  <Link href="/portal/hire" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white text-white font-bold text-sm hover:bg-white hover:text-brand-navy-900 transition-all">
                     Get RFP Help — $249
                  </Link>
               </div>
               <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex flex-wrap justify-center gap-x-4 gap-y-2 opacity-60">
                  <span>CSLB #1057434</span>
                  <span>SDVOSB</span>
                  <span>DVBE</span>
                  <span>San Diego, CA</span>
                  <span>831-760-0806</span>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}
