"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, FileText, CheckCircle2, Building2, HardHat, Wrench, Package, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, damping: 20, stiffness: 100 } }
};

const STAGGER = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative px-4 pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-brand-navy-900 border-b border-white/5">
        {/* Abstract Background Element for Premium feel */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue-600/10 blur-[100px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-brand-blue-600/5 blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial="hidden" 
            animate="show" 
            variants={STAGGER}
            className="max-w-4xl"
          >
            <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-success"></span>
              <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">Licensed · Certified · Ready to Bid</span>
            </motion.div>
            
            <motion.h1 variants={FADE_UP} className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
              Building California's <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-600 to-blue-400">Public Infrastructure.</span>
            </motion.h1>
            
            <motion.p variants={FADE_UP} className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
              Stronger Built Group LLC is a certified Service-Disabled Veteran Owned (SDVOSB) and DVBE General Contractor (CSLB #1057434). Delivering commercial and government construction excellence across California.
            </motion.p>
            
            <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-4">
              <Link href="/government/capabilities-statement" className="group relative inline-flex items-center justify-center gap-2 bg-brand-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl shadow-brand-blue-600/20 hover:shadow-brand-blue-600/40">
                <FileText className="w-5 h-5" />
                <span>Capabilities Statement</span>
                <ArrowDownIcon className="w-4 h-4 ml-1 opacity-70 group-hover:translate-y-1 transition-transform" />
              </Link>
              <Link href="/services" className="group inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-8 py-4 rounded-xl font-bold transition-all backdrop-blur-sm">
                <span>View Our Services</span>
                <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-white/50 dark:bg-brand-navy-900 border-b border-gray-200 dark:border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500">
            {[
              { label: "CSLB #1057434", sub: "Class B, C-6, C-36" },
              { label: "SDVOSB", sub: "Service-Disabled Veteran" },
              { label: "DVBE", sub: "Certified Entity" },
              { label: "DIR Registration", sub: "Pending Process" },
              { label: "Fully Insured", sub: "Insureon Premium BOP" },
            ].map((cert, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center p-2">
                <ShieldCheck className="w-6 h-6 text-brand-steel-800 dark:text-slate-400 mb-2" />
                <span className="text-sm font-bold text-brand-navy-900 dark:text-white uppercase tracking-wider">{cert.label}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{cert.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background-light dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-sm font-bold tracking-widest text-brand-blue-600 uppercase mb-3">Our Core Expertise</h2>
            <h3 className="text-3xl md:text-5xl font-black text-brand-navy-900 dark:text-white mb-6">Comprehensive Building Solutions.</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400">Self-performed and rigorously managed construction, consulting, and facility services for government and commercial sectors.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: HardHat, title: "Construction Consulting", desc: "Feasibility studies, cost estimation, and constructability reviews.", href: "/services/construction-consulting" },
              { icon: CheckCircle2, title: "Project Management", desc: "CPM scheduling, QA/QC, and rigorous design-build oversight.", href: "/services/project-management" },
              { icon: Building2, title: "Subcontracting Services", desc: "Certified DVBE partnership managing premium specialized trades.", href: "/services/subcontracting-services" },
              { icon: Wrench, title: "Facility Maintenance", desc: "Multi-trade ongoing maintenance. Rapid emergency responses.", href: "/services/facility-maintenance" },
              { icon: ShieldCheck, title: "Janitorial Services", desc: "DIR-registered commercial cleaning and deep sanitization.", href: "/services/janitorial-services" },
              { icon: Package, title: "Material Supply", desc: "Bulk sourcing and logistics to hit diversity spend targets.", href: "/services/construction-material-supply" },
            ].map((srv, i) => (
              <Link key={i} href={srv.href} className="group relative bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 hover:shadow-2xl hover:shadow-brand-blue-600/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-5 h-5 text-brand-blue-600" />
                </div>
                <div className="w-14 h-14 rounded-xl bg-brand-blue-600/10 flex items-center justify-center mb-6 text-brand-blue-600 group-hover:scale-110 group-hover:bg-brand-blue-600 group-hover:text-white transition-all duration-300">
                  <srv.icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-brand-navy-900 dark:text-white mb-3 tracking-wide">{srv.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">{srv.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Placeholder for Projects */}
      <section className="py-24 bg-white dark:bg-brand-navy-900 border-t border-gray-100 dark:border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-brand-blue-600 uppercase mb-3">Past Performance</h2>
              <h3 className="text-3xl md:text-5xl font-black text-brand-navy-900 dark:text-white">Featured Projects.</h3>
            </div>
            <Link href="/projects" className="text-brand-blue-600 font-bold hover:text-blue-700 flex items-center gap-2 group">
              View All Pipeline
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project Placeholders */}
            {[1, 2].map((p) => (
              <div key={p} className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-slate-400 dark:text-slate-500 font-medium tracking-widest uppercase text-sm border border-slate-300 dark:border-white/10 px-4 py-2 rounded-full">Coming Soon: Project Image {p}</p>
                </div>
                <div className="absolute bottom-0 left-0 p-8 z-20 w-full transition-transform duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <div className="flex gap-2 mb-3">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-white bg-brand-blue-600 px-2 py-1 rounded">Government</span>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Facility Improvement placeholder {p}</h4>
                  <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">Scope: General layout, plumbing updates, and modernization.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

function ArrowDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}
