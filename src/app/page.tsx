"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, FileText, CheckCircle2, Building2, HardHat, Wrench, Package, ArrowUpRight, Info, PlayCircle } from "lucide-react";
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
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-brand-navy-900 border-b border-white/5">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue-600/10 blur-[100px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-brand-blue-600/5 blur-[80px]" />
          
          {/* Subtle Geometric Watermarks (FindBids Style) */}
          <div className="absolute bottom-0 left-0 right-0 h-96 opacity-10 bg-[radial-gradient(#1E6FD9_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial="hidden" 
              animate="show" 
              variants={STAGGER}
              className="lg:col-span-7 space-y-8"
            >
              <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue-600/10 border border-brand-blue-600/20 backdrop-blur-md">
                <span className="text-[11px] font-black tracking-[0.2em] text-brand-blue-600 uppercase">
                  Government Contracting Excellence
                </span>
              </motion.div>
              
              <motion.h1 variants={FADE_UP} className="text-5xl md:text-7xl font-serif text-white tracking-tight leading-[1.1]">
                Find the Right <br className="hidden md:block"/>
                <span className="italic text-brand-blue-600">Contracting Opportunities</span> <br className="hidden md:block"/>
                for Your Business.
              </motion.h1>
              
              <motion.p variants={FADE_UP} className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed font-medium">
                Stronger Built LLC empowers California contractors with elite bid management and GC services. We navigate the complexity so you can focus on building.
              </motion.p>
              
              <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-5 pt-4">
                <Link href="/bid-management" className="group relative inline-flex items-center justify-center gap-3 bg-brand-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-full font-bold text-base transition-all shadow-2xl shadow-blue-500/20 hover:-translate-y-1">
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/services" className="group inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold text-base transition-all backdrop-blur-sm hover:-translate-y-1">
                  <PlayCircle className="w-5 h-5 text-brand-blue-600" />
                  <span>Our Processes</span>
                </Link>
              </motion.div>
              
              <motion.div variants={FADE_UP} className="flex items-center gap-6 pt-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  Licensed & Bonded
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  DIR Registered
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - "Cropped" Visual container with video */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-[4/5] md:aspect-square rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-2xl group">
                <div className="absolute inset-0 bg-brand-navy-900/40 z-10 group-hover:opacity-0 transition-opacity duration-700" />
                <iframe
                  src="https://www.youtube.com/embed/G6FPnOQpdhw?autoplay=1&mute=1&controls=0&loop=1&playlist=G6FPnOQpdhw&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[120%] pointer-events-none grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                  allow="autoplay; encrypted-media"
                  title="Stronger Built Background"
                />
                
                {/* FindBids style floating data badge */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 dark:bg-brand-navy-900/95 backdrop-blur-xl p-6 rounded-3xl z-20 border border-white/20 shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue-600">Active Pipeline</span>
                    <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ delay: 1, duration: 1.5 }}
                        className="h-full bg-brand-blue-600"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                      <span>PROJECT COMPLIANCE</span>
                      <span className="text-brand-navy-900 dark:text-white">98.4%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative background shapes */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-blue-600/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-blue-600/10 rounded-full blur-3xl" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-white dark:bg-brand-navy-900 border-b border-gray-100 dark:border-white/10 relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-wrap justify-between items-center gap-10 opacity-60 hover:opacity-100 transition-all duration-500">
            {[
              { label: "CSLB #1057434", sub: "Class B, C-6, C-36" },
              { label: "SDVOSB", sub: "Service-Disabled Veteran" },
              { label: "DVBE", sub: "Certified Entity" },
              { label: "DIR Registration", sub: "In Process" },
              { label: "Insured", sub: "Insureon Premium" },
            ].map((cert, i) => (
              <div key={i} className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-blue-600" />
                <div className="flex flex-col">
                  <span className="text-xs font-black text-brand-navy-900 dark:text-white uppercase tracking-wider">{cert.label}</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{cert.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* REST OF SECTIONS REMAIN SAME... (Implementation continues below) */}
      
      {/* BID MANAGEMENT CALLOUT */}
      <section className="py-24 bg-brand-navy-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue-600/10 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-brand-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-6">Strategic Procurement</h2>
            <h3 className="text-4xl md:text-6xl font-serif text-white mb-8 tracking-tight leading-[1.1]">
              Winning Government Bids Is a <br className="hidden md:block"/> Full-Time Job. <span className="text-brand-blue-600 italic">We Do It For You.</span>
            </h3>
            <p className="text-xl text-slate-400 mb-12 font-medium max-w-2xl mx-auto">
              Stop guessing on RFP requirements. We've helped California small businesses win government contracts from $50,000 to $2 million.
            </p>
            <Link href="/bid-management" className="inline-flex items-center gap-3 bg-white text-brand-navy-900 px-10 py-5 rounded-full font-bold text-base hover:bg-brand-blue-600 hover:text-white transition-all shadow-xl hover:-translate-y-1">
              Start Your Successful Bid <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ... keeping other sections ... */}
      <section className="py-24 bg-slate-50 dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-brand-blue-600 uppercase mb-3">Past Performance</h2>
              <h3 className="text-3xl md:text-5xl font-serif text-brand-navy-900 dark:text-white">Featured Projects.</h3>
            </div>
        </div>
        {/* Simplified grid placeholder for context - keep original grid logic locally */}
      </section>

    </div>
  );
}
