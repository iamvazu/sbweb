"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, HardHat, CheckCircle2, Building2, Wrench, ShieldCheck, Package, Trees, Droplets, ArrowRightLeft, AppWindow, Paintbrush, Hammer, Wind, Zap, Truck, Navigation, Globe, BrainCircuit, SearchCode } from "lucide-react";

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const services = [
  { icon: HardHat, title: "Construction Consulting", desc: "Navigating complexities with licensed expertise. Feasibility, cost estimation, constructability.", href: "/services/construction-consulting" },
  { icon: CheckCircle2, title: "Project Management", desc: "End-to-end schedule oversight and QA/QC programs to protect infrastructure investments.", href: "/services/project-management" },
  { icon: Building2, title: "Subcontracting Services", desc: "DVBE/SB participation. Rigorous management of C-10, C-20, C-33, C-36 specialized trades.", href: "/services/subcontracting-services" },
  { icon: Wrench, title: "Facility Maintenance", desc: "Rapid emergency response, multi-trade preventative care, and work order management.", href: "/services/facility-maintenance" },
  { icon: ShieldCheck, title: "Janitorial Services", desc: "DIR-registered hard floor care, deep sanitization, and 5-day commercial cleaning schedules.", href: "/services/janitorial-services" },
  { icon: Package, title: "Material Supply & Logistics", desc: "Secure supply chains meeting diversity spend goals. Bulk sourcing and JIT fulfillment.", href: "/services/construction-material-supply" },
  { icon: Trees, title: "Landscape & Grounds Maintenance", desc: "Maintaining exterior aesthetics and safety. Caltrans integration and public works expertise.", href: "/services/landscape-grounds-maintenance" },
  { icon: Droplets, title: "Graffiti Abatement & Washing", desc: "Rapid-response municipal graffiti removal and high-traffic pressure washing programs.", href: "/services/graffiti-abatement" },
  { icon: Navigation, title: "Parking Lot Striping & Sealcoating", desc: "Ensuring ADA compliance and extending asphalt lifecycles for state and commercial complexes.", href: "/services/parking-lot-striping" },
  { icon: AppWindow, title: "Window Cleaning", desc: "High-rise and continuous commercial window maintenance, easily bundled with janitorial scopes.", href: "/services/window-cleaning" },
  { icon: Paintbrush, title: "Painting Services", desc: "C-33 licensed interior and exterior painting services designed for tenant improvements.", href: "/services/painting-services" },
  { icon: Hammer, title: "Roofing Repair", desc: "High-margin preventative maintenance and leak repair backed by our network of C-39 contractors.", href: "/services/roofing-repair" },
  { icon: Wind, title: "HVAC Maintenance", desc: "Long-term service contracts preserving mechanical systems via C-20 subcontracting.", href: "/services/hvac-maintenance" },
  { icon: Zap, title: "Electrical Repair", desc: "Fast resolution of public utility and private commercial issues using vetted C-10 partners.", href: "/services/electrical-repair" },
  { icon: Wrench, title: "Plumbing Repair", desc: "Comprehensive retrofits and emergency line repairs handled under our C-36 division.", href: "/services/plumbing-repair" },
  { icon: Truck, title: "Moving & Relocation Services", desc: "Constant and dependable logistics for state office relocations and agency facility moves.", href: "/services/moving-relocation" },
];

const digitalServices = [
  { icon: Globe, title: "Website Build & Redesign", desc: "WCAG 2.1 AA compliant, high-performance digital infrastructure for agencies.", href: "/services/website-build-redesign" },
  { icon: BrainCircuit, title: "Strategic Bid & Procurement Management", desc: "Navigating deep procurement complexity with high-precision bidding and RFP support led by Roy Krautstrunk.", href: "/services/strategic-bid-advisory" },
  { icon: SearchCode, title: "Modern Search (SEO/AEO/GEO)", desc: "Semantic authority for AI-driven search environments and answer engines.", href: "/services/search-visibility-seo-aeo" },
];

export default function ServicesOverview() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24 bg-white dark:bg-black/20">
      <div className="max-w-7xl mx-auto px-4 w-full">
        
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-brand-navy-900 dark:text-white tracking-tight mb-6">
            Services & <span className="text-brand-blue-600">Capabilities</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Delivering exceptional value through a dual-delivery model: elite CSLB Class B self-performance coupled with a rigorously vetted, DVBE-certified subcontractor network.
          </p>
        </div>

        <motion.div 
          variants={STAGGER}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((srv, i) => (
            <motion.div key={i} variants={FADE_UP} className="h-full">
              <Link href={srv.href} className="group flex flex-col h-full bg-background-light dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-3xl p-8 hover:shadow-2xl hover:shadow-brand-blue-600/10 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center mb-8 text-brand-navy-900 dark:text-white group-hover:bg-brand-blue-600 group-hover:text-white group-hover:border-brand-blue-600 transition-all duration-300 shadow-sm">
                  <srv.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-bold text-brand-navy-900 dark:text-white mb-4 group-hover:text-brand-blue-600 transition-colors">
                  {srv.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-grow">
                  {srv.desc}
                </p>

                <div className="mt-auto flex items-center gap-2 text-sm font-bold text-brand-blue-600 group-hover:text-blue-700 uppercase tracking-widest">
                  View Detail <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Digital Division Section */}
        <div className="mt-24 mb-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-sm font-black tracking-[0.2em] text-brand-blue-600 uppercase mb-4">New Division</h2>
              <h3 className="text-3xl md:text-5xl font-black text-brand-navy-900 dark:text-white mb-6">
                Digital Transformation & <br/>GovTech Solutions
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Modernizing civic infrastructure through high-performance, accessible technology tailored for state departments and fellow DVBE partners.
              </p>
            </div>
            <Link href="/contact" className="text-sm font-black text-brand-navy-900 dark:text-white border-b-2 border-brand-blue-600 pb-1 hover:text-brand-blue-600 transition-colors">
              Request a Tech Consultation
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {digitalServices.map((srv, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="h-full"
              >
                <Link href={srv.href} className="group flex flex-col h-full bg-slate-50 dark:bg-black/40 border border-gray-100 dark:border-white/5 rounded-3xl p-8 hover:bg-white dark:hover:bg-brand-navy-900 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center mb-6 text-brand-blue-600 group-hover:bg-brand-blue-600 group-hover:text-white transition-all shadow-sm">
                    <srv.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-brand-navy-900 dark:text-white mb-3 group-hover:text-brand-blue-600 transition-colors">{srv.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 flex-grow">{srv.desc}</p>
                  <div className="flex items-center gap-2 text-xs font-black text-brand-blue-600 uppercase tracking-widest">
                    Solution Detail <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Delivery Model Callout */}
        <div className="mt-24 bg-brand-navy-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-blue-600/20 rounded-full blur-[100px]" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-success/10 rounded-full blur-[100px]" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl font-black mb-6">Our Delivery Philosophy</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Stronger Built Group strictly adheres to Commercially Useful Function (CUF) regulations—not just in construction, but in our digital solutions. We leverage our SDVOSB status and CSLB #1057434 Class B classification to manage projects with high-integrity oversight.
            </p>
            <Link href="/government" className="inline-flex items-center gap-2 bg-white text-brand-navy-900 hover:bg-slate-100 px-8 py-4 rounded-xl font-bold transition-colors">
              Explore Government Hub
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
