"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, FileText, CheckCircle2, Building2, HardHat, Wrench, Package, ArrowUpRight, Info } from "lucide-react";
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
      <section className="relative px-4 pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-brand-navy-900 border-b border-white/5">
        {/* Background Video / Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* YouTube Video Background */}
          <div className="absolute inset-0 w-full h-full">
            <iframe
              src="https://www.youtube.com/embed/G6FPnOQpdhw?autoplay=1&mute=1&controls=0&loop=1&playlist=G6FPnOQpdhw&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[48%] w-[177.77vh] min-w-full h-[115%] min-h-[65vw] pointer-events-none opacity-60 grayscale-[0.1]"
              allow="autoplay; encrypted-media"
              title="Stronger Built Background"
            />
            {/* Dark Overlay for Text Legibility - Lightened for visibility */}
            <div className="absolute inset-0 bg-brand-navy-900/20 bg-gradient-to-r from-brand-navy-900/80 via-brand-navy-900/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-900/30 via-transparent to-brand-navy-900/60" />
          </div>
          
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: HardHat, title: "Construction Consulting", desc: "Feasibility studies, cost estimation, and constructability reviews.", href: "/services/construction-consulting", image: "/images/services/construction-consulting.jpg" },
              { icon: CheckCircle2, title: "Project Management", desc: "CPM scheduling, QA/QC, and rigorous design-build oversight.", href: "/services/project-management", image: "/images/services/project-management-team.jpg" },
              { icon: Building2, title: "Subcontracting Services", desc: "Certified DVBE partnership managing premium specialized trades.", href: "/services/subcontracting-services", image: "/images/services/subcontracting-logistics.jpg" },
              { icon: Wrench, title: "Facility Maintenance", desc: "Multi-trade ongoing maintenance. Rapid emergency responses.", href: "/services/facility-maintenance", image: "/images/services/hvac-service.jpg" },
              { icon: ShieldCheck, title: "Janitorial Services", desc: "DIR-registered commercial cleaning and deep sanitization.", href: "/services/janitorial-services", image: "/images/services/janitorial-service.jpg" },
              { icon: Package, title: "Material Supply", desc: "Bulk sourcing and logistics to hit diversity spend targets.", href: "/services/construction-material-supply", image: "/images/services/material-supply.jpg" },
            ].map((srv, i) => (
              <div key={i} className="group flex flex-col bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-brand-blue-600/10 transition-all duration-300 hover:-translate-y-2">
                {/* Image Section */}
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img 
                    src={srv.image} 
                    alt={srv.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 rounded-xl bg-white/90 dark:bg-brand-navy-900/90 backdrop-blur-md flex items-center justify-center text-brand-blue-600 shadow-lg">
                      <srv.icon className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-grow">
                  <h4 className="text-2xl font-bold text-brand-navy-900 dark:text-white mb-4 tracking-tight group-hover:text-brand-blue-600 transition-colors">
                    {srv.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-grow">
                    {srv.desc}
                  </p>
                  
                  <Link 
                    href={srv.href} 
                    className="inline-flex items-center gap-2 text-sm font-black text-brand-blue-600 uppercase tracking-widest group/link"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
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
            {[
              {
                slug: "480-sqft-adu",
                title: "480 Square Foot ADU",
                client: "Resident",
                imageStyle: "bg-gradient-to-br from-brand-navy-900 to-blue-900/30",
                scope: "Complete Construction",
                size: "480 sqft",
                role: "Modular Manufacturer / Site...",
                work: "Fabrication and Installation"
              },
              {
                slug: "affordable-housing-project",
                title: "Affordable Housing Project",
                client: "City of LA",
                imageStyle: "bg-gradient-to-br from-brand-blue-600 to-slate-900",
                scope: "32 Unit Housing Project",
                size: "150,000 sqft",
                role: "Modular Manufacturer / Site...",
                work: "Fabrication / Installation"
              }
            ].map((proj) => (
              <div key={proj.slug} className="flex flex-col rounded-[2.5rem] overflow-hidden border border-gray-200 dark:border-white/10 bg-background-light dark:bg-brand-navy-900 group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                {/* Image Placeholder */}
                <div className={`h-64 w-full ${proj.imageStyle} relative overflow-hidden flex items-center justify-center`}>
                  <Building2 className="w-16 h-16 text-white/20" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-6 right-6 bg-brand-navy-900/60 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/5">
                    Project Data Verified
                  </div>
                </div>
                
                <div className="p-10 flex flex-col flex-1">
                  <h3 className="text-3xl font-black text-brand-navy-900 dark:text-white mb-8 uppercase tracking-tight leading-none">
                    {proj.title}
                  </h3>
                  
                  {/* Tech Specs Grid */}
                  <div className="grid grid-cols-1 gap-5 mb-10">
                    {[
                      { label: "Scope", value: proj.scope },
                      { label: "Size", value: proj.size },
                      { label: "Role", value: proj.role },
                      { label: "Work", value: proj.work },
                      { label: "Client", value: proj.client }
                    ].map((spec) => (
                      <div key={spec.label} className="flex gap-4 text-xs uppercase tracking-widest">
                        <span className="font-black text-brand-blue-600 w-20 shrink-0">{spec.label}:</span>
                        <span className="font-bold text-slate-600 dark:text-slate-200">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-4">
                    <Link href={`/projects/${proj.slug}`} className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-white/5 border border-transparent rounded-2xl px-6 py-4 text-[11px] font-black text-brand-navy-900 dark:text-white hover:border-brand-blue-600 transition-all uppercase tracking-widest">
                      Study <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link href="/contact" className="flex items-center justify-center gap-2 bg-brand-blue-600 text-white rounded-2xl px-6 py-4 text-[11px] font-black hover:bg-blue-500 transition-all uppercase tracking-widest">
                      Refer <Info className="w-4 h-4" />
                    </Link>
                  </div>
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
