"use client";

import { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, FileText, CheckCircle2, Building2, HardHat, Wrench, Package, ArrowUpRight, Info, PlayCircle, ClipboardCheck, Search, LineChart, Zap, Clock, ChevronDown } from "lucide-react";
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

export default function Home() {
  const steps = [
    { num: "01", title: "Build Your Profile", desc: "Add NAICS codes, certifications, and service regions. Takes 2 minutes.", icon: ClipboardCheck },
    { num: "02", title: "AI Scans Portals", desc: "Our engine monitors 30+ CA procurement systems 24/7 for you.", icon: Search },
    { num: "03", title: "Score & Rank", desc: "Every bid gets a fit score and win-probability signal instantly.", icon: LineChart },
    { num: "04", title: "Strategic Support", desc: "Expert analysis of RFPs to find hidden landmines and pricing traps.", icon: Zap },
    { num: "05", title: "Compliance Secure", desc: "End-to-end filing for DIR, prevailing wage, and final submission.", icon: ShieldCheck }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section - COMPACTED */}
      <section className="relative px-6 pt-24 pb-12 md:pt-36 md:pb-20 overflow-hidden bg-brand-navy-900 border-b border-white/5">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue-600/10 blur-[100px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-brand-blue-600/5 blur-[80px]" />
          
          <div className="absolute bottom-0 left-0 right-0 h-96 opacity-10 bg-[radial-gradient(#1E6FD9_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial="hidden" 
              animate="show" 
              variants={STAGGER}
              className="lg:col-span-7 space-y-6"
            >
              <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 backdrop-blur-md">
                <span className="text-[10px] font-black tracking-[0.2em] text-amber-400 uppercase">
                  Government Contracting Excellence
                </span>
              </motion.div>
              
              <motion.h1 variants={FADE_UP} className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1]">
                Find the Right <br className="hidden md:block"/>
                <span className="italic text-brand-blue-600">Contracting Opportunities</span> <br className="hidden md:block"/>
                for Your Business.
              </motion.h1>
              
              <motion.p variants={FADE_UP} className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed font-medium">
                Stronger Built LLC empowers California contractors with elite bid management and GC services. We navigate the complexity so you can focus on building.
              </motion.p>
              
              <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/bid-management" className="group relative inline-flex items-center justify-center gap-3 bg-brand-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-sm transition-all shadow-2xl shadow-blue-500/20 hover:-translate-y-1">
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/services" className="group inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-sm transition-all backdrop-blur-sm hover:-translate-y-1">
                  <PlayCircle className="w-5 h-5 text-brand-blue-600" />
                  <span>Our Processes</span>
                </Link>
              </motion.div>
              
              <motion.div variants={FADE_UP} className="flex flex-wrap items-center gap-y-3 gap-x-5 pt-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                  Licensed & Bonded
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                  DIR Registered
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-slate-700 font-black px-1 opacity-20">•</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-blue-600" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-slate-700 font-black px-1 opacity-20">•</span>
                  <Clock className="w-3.5 h-3.5 text-brand-blue-600" />
                  Set up in 10 minutes
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
              className="lg:col-span-5 relative hidden md:block"
            >
              <div className="relative aspect-square rounded-[2.5rem] overflow-hidden border-8 border-white/5 shadow-2xl group">
                <div className="absolute inset-0 bg-brand-navy-900/40 z-10 group-hover:opacity-0 transition-opacity duration-700" />
                <iframe
                  src="https://www.youtube.com/embed/G6FPnOQpdhw?autoplay=1&mute=1&controls=0&loop=1&playlist=G6FPnOQpdhw&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[120%] pointer-events-none grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                  allow="autoplay; encrypted-media"
                  title="Stronger Built Background"
                />
                
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-brand-navy-900/95 backdrop-blur-xl p-5 rounded-2xl z-20 border border-white/20 shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-black uppercase tracking-widest text-brand-blue-600">Active Pipeline</span>
                    <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  </div>
                  <div className="space-y-2.5">
                    <div className="h-1.5 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ delay: 1, duration: 1.5 }}
                        className="h-full bg-brand-blue-600"
                      />
                    </div>
                    <div className="flex justify-between text-[9px] font-bold text-slate-500">
                      <span>PROJECT COMPLIANCE</span>
                      <span className="text-brand-navy-900 dark:text-white">98.4%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-white dark:bg-brand-navy-900 border-b border-gray-100 dark:border-white/10 relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-wrap justify-between items-center gap-8 opacity-60 hover:opacity-100 transition-all duration-500">
            {[
              { label: "CSLB #1057434", sub: "Class B, C-6, C-36", img: "/images/logos/cslb.png" },
              { label: "SDVOSB", sub: "Service-Disabled Veteran", img: "/images/logos/sdvosb.png" },
              { label: "DVBE", sub: "Certified Entity", img: "/images/logos/dvbe.png" },
              { label: "DIR Registration", sub: "In Process", img: "/images/logos/dir.png" },
              { label: "Insured", sub: "Insureon Premium", img: "/images/logos/insureon.png" },
            ].map((cert, i) => (
              <div key={i} className="flex items-center gap-4 group/logo">
                <div className="h-10 w-10 relative flex-shrink-0 flex items-center justify-center grayscale group-hover/logo:grayscale-0 transition-all duration-500">
                  <img src={cert.img} alt={cert.label} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-brand-navy-900 dark:text-white uppercase tracking-wider">{cert.label}</span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tight">{cert.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Bid Pulse */}
      <section className="py-12 bg-white dark:bg-brand-navy-900 border-b border-gray-100 dark:border-white/10 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <BidTicker />
        </div>
      </section>

      {/* Market Intelligence Dashboard - NEW */}
      <section className="py-12 md:py-20 bg-slate-50 dark:bg-black/20">
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
      {/* BID MANAGEMENT CALLOUT */}
      <section className="py-20 bg-brand-navy-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue-600/10 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-amber-400 font-black uppercase tracking-[0.3em] text-[10px] mb-4">Strategic Procurement</h2>
            <h3 className="text-3xl md:text-5xl font-serif text-white mb-6 tracking-tight leading-[1.1]">
              Winning Government Bids Is a <br className="hidden md:block"/> Full-Time Job. <span className="text-brand-blue-600 italic">We Do It For You.</span>
            </h3>
            <p className="text-lg text-slate-400 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
              Stop guessing on RFP requirements. We've helped California small businesses win government contracts from $50,000 to $2 million.
            </p>
            <Link href="/bid-management" className="inline-flex items-center gap-3 bg-white text-brand-navy-900 px-8 py-4 rounded-full font-bold text-sm hover:bg-brand-blue-600 hover:text-white transition-all shadow-xl hover:-translate-y-1">
              Start Your Successful Bid <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* THE WORKFLOW - ADDED PER REQUEST */}
      <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-black/10">
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

      {/* Services Grid - RESTORED FULL */}
      <section className="py-24 bg-background-light dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-[11px] font-bold tracking-widest text-amber-600 uppercase mb-3">Our Core Expertise</h2>
            <h3 className="text-3xl md:text-5xl font-serif text-brand-navy-900 dark:text-white mb-6">Comprehensive Building Solutions.</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">Self-performed and rigorously managed construction, consulting, and facility services for government and commercial sectors.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: FileText, title: "Strategic Bid Management", desc: "End-to-end RFP management, DIR compliance, and pricing strategy.", href: "/bid-management", image: "/images/services/construction-consulting.png" },
              { icon: HardHat, title: "Construction Consulting", desc: "Feasibility studies, cost estimation, and constructability reviews.", href: "/services/construction-consulting", image: "/images/services/construction-consulting.png" },
              { icon: CheckCircle2, title: "Project Management", desc: "CPM scheduling, QA/QC, and rigorous design-build oversight.", href: "/services/project-management", image: "/images/services/project-management-team.png" },
              { icon: Building2, title: "Subcontracting Services", desc: "Certified DVBE partnership managing premium specialized trades.", href: "/services/subcontracting-services", image: "/images/services/subcontracting-logistics.png" },
              { icon: Wrench, title: "Facility Maintenance", desc: "Multi-trade ongoing maintenance. Rapid emergency responses.", href: "/services/facility-maintenance", image: "/images/services/hvac-service.png" },
              { icon: ShieldCheck, title: "Janitorial Services", desc: "DIR-registered commercial cleaning and deep sanitization.", href: "/services/janitorial-services", image: "/images/services/janitorial-service.png" },
              { icon: Package, title: "Material Supply", desc: "Bulk sourcing and logistics to hit diversity spend targets.", href: "/services/construction-material-supply", image: "/images/services/material-supply.png" },
              { icon: Wrench, title: "Plumbing Services", desc: "Specialized C-36 commercial and industrial plumbing solutions.", href: "/services/plumbing", image: "/images/services/plumbing-service.png" },
              { icon: Building2, title: "Modular Construction", desc: "Strategic fabrication and installation of high-efficiency modular units.", href: "/services/modular", image: "/images/services/modular-construction.png" },
            ].map((srv, i) => (
              <div key={i} className="group flex flex-col bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-brand-blue-600/10 transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img src={srv.image} alt={srv.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-brand-navy-900/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 rounded-xl bg-white/90 dark:bg-brand-navy-900/90 backdrop-blur-md flex items-center justify-center text-brand-blue-600 shadow-lg">
                      <srv.icon className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h4 className="text-2xl font-bold text-brand-navy-900 dark:text-white mb-4 tracking-tight group-hover:text-brand-blue-600 transition-colors">
                    {srv.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-grow font-medium text-sm">
                    {srv.desc}
                  </p>
                  <Link href={srv.href} className="inline-flex items-center gap-2 text-xs font-black text-brand-blue-600 uppercase tracking-widest group/link">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link 
              href="/services" 
              className="inline-flex items-center gap-3 bg-brand-navy-900 dark:bg-brand-blue-600 text-white px-10 py-5 rounded-full font-bold text-sm hover:bg-brand-blue-600 dark:hover:bg-blue-700 transition-all shadow-xl hover:-translate-y-1 group"
            >
              <span>Explore All Commercial Services</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects - RESTORED FULL */}
      <section className="py-24 bg-white dark:bg-brand-navy-900 border-t border-gray-100 dark:border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-[11px] font-bold tracking-widest text-amber-600 uppercase mb-3">Past Performance</h2>
              <h3 className="text-3xl md:text-5xl font-serif text-brand-navy-900 dark:text-white">Featured Projects.</h3>
            </div>
            <Link href="/projects" className="text-brand-blue-600 font-bold hover:text-blue-700 flex items-center gap-2 group text-sm">
              View All Pipeline
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                slug: "strategic-bid-advisory",
                title: "Strategic Bid Management",
                client: "Procurement Advisory",
                imageStyle: "bg-gradient-to-br from-brand-blue-600 to-brand-navy-900",
                scope: "High-Precision Bidding",
                size: "Data-Driven RFP Response",
                role: "Executive Oversight",
                work: "Full-Cycle Bid Management"
              },
              {
                slug: "affordable-housing-project",
                title: "Affordable Housing Project",
                client: "City of LA",
                imageStyle: "bg-gradient-to-br from-brand-blue-600 to-slate-900",
                scope: "32 Unit Housing Project",
                size: "150,000 sqft",
                role: "Modular Manufacturer",
                work: "Fabrication / Installation"
              }
            ].map((proj) => (
              <div key={proj.slug} className="flex flex-col rounded-[2.5rem] overflow-hidden border border-gray-200 dark:border-white/10 bg-slate-50 dark:bg-brand-navy-900/50 group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className={`h-64 w-full ${proj.imageStyle} relative overflow-hidden flex items-center justify-center`}>
                  <Building2 className="w-16 h-16 text-white/20" />
                  <div className="absolute top-6 right-6 bg-brand-navy-900/60 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black text-white uppercase tracking-widest border border-white/5">
                    Data Verified
                  </div>
                </div>
                
                <div className="p-10 flex flex-col flex-1">
                  <h3 className="text-3xl font-bold text-brand-navy-900 dark:text-white mb-8 uppercase tracking-tight leading-none group-hover:text-brand-blue-600 transition-colors">
                    {proj.title}
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4 mb-10">
                    {[
                      { label: "Scope", value: proj.scope },
                      { label: "Role", value: proj.role },
                      { label: "Work", value: proj.work },
                      { label: "Lead", value: proj.client }
                    ].map((spec) => (
                      <div key={spec.label} className="flex gap-4 text-[10px] uppercase tracking-widest">
                        <span className="font-black text-brand-blue-600 w-20 shrink-0">{spec.label}:</span>
                        <span className="font-bold text-slate-600 dark:text-slate-300">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-4">
                    <Link href={`/projects/${proj.slug}`} className="flex items-center justify-center gap-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 text-[10px] font-black text-brand-navy-900 dark:text-white hover:border-brand-blue-600 transition-all uppercase tracking-widest">
                      Study <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link href="/contact" className="flex items-center justify-center gap-2 bg-brand-blue-600 text-white rounded-2xl px-6 py-4 text-[10px] font-black hover:bg-blue-700 transition-all uppercase tracking-widest">
                      Refer <Info className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - NEW */}
      <section className="py-24 bg-slate-50 dark:bg-black/10 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[11px] font-black text-amber-600 uppercase tracking-[0.3em] mb-4">Questions from first-time users</h2>
            <h3 className="text-3xl md:text-5xl font-serif text-brand-navy-900 dark:text-white mb-6">Frequently Asked <span className="italic text-brand-blue-600">Questions.</span></h3>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How does BidIQ outperform manual portal searching?",
                a: "Manual searching often results in missed opportunities and hours of wasted time. BidIQ consolidates over 30+ California procurement portals into a single, intelligent feed. We don't just list contracts; we rank them based on your specific NAICS codes, certifications, and past performance. Most users reclaim over 10 hours a week by focusing only on high-fit bids."
              },
              {
                q: "What specific contract sources does BidIQ monitor?",
                a: "Our engine scans a massive array of California-specific sources, including Cal eProcure, PlanetBids, and many municipal hubs like RAMP (LA) and BuyNet (San Diego). While the Starter tier covers core local portals, our Professional and Enterprise plans unlock expanded state-wide and specialized agency feeds."
              },
              {
                q: "What is the typical setup time for a new team?",
                a: "We've optimized onboarding for speed. Most contracting firms are ready to go in under 10 minutes. By simply identifying your service area, NAICS codes, and target agencies, you'll start receiving high-probability matches in your very next daily digest."
              },
              {
                q: "Can I test the platform before committing?",
                a: "Yes. We believe in the power of our intelligence platform, which is why we offer a 100% free account to get you started—no credit card required. You can experience the automated matching engine firsthand before selecting a growth plan that fits your business."
              },
              {
                q: "Which industries and company sizes benefit most?",
                a: "BidIQ is purpose-built for high-growth small businesses and mid-market firms. While we specialize in construction, facilities management, and professional consulting, our platform is equally powerful for IT, engineering, and manufacturing firms looking to dominate their local government market."
              }
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-white/10 rounded-[2rem] bg-white dark:bg-brand-navy-900/40 overflow-hidden transition-all hover:border-brand-blue-600/30">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-bold text-brand-navy-900 dark:text-white group-hover:text-brand-blue-600 transition-colors">{question}</span>
        <ChevronDown 
          className={cn(
            "w-5 h-5 text-slate-400 transition-transform duration-300",
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
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
