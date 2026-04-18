"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, HardHat, CheckCircle2, Building2, Wrench, ShieldCheck, Package, Trees, Droplets, Navigation, AppWindow, Paintbrush, Hammer, Wind, Zap, Truck, Globe, BrainCircuit, SearchCode, Briefcase } from "lucide-react";

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const services = [
  { icon: HardHat, title: "Construction Consulting", desc: "Navigating complexities with licensed expertise. Feasibility, cost estimation, constructability.", href: "/services/construction-consulting", image: "/images/services/construction-consulting.png" },
  { icon: CheckCircle2, title: "Project Management", desc: "End-to-end schedule oversight and QA/QC programs to protect infrastructure investments.", href: "/services/project-management", image: "/images/services/project-management-team.png" },
  { icon: Building2, title: "Subcontracting Services", desc: "DVBE/SB participation. Rigorous management of C-10, C-20, C-33, C-36 specialized trades.", href: "/services/subcontracting-services", image: "/images/services/subcontracting-logistics.png" },
  { icon: Wrench, title: "Facility Maintenance", desc: "Rapid emergency response, multi-trade preventative care, and work order management.", href: "/services/facility-maintenance", image: "/images/services/hvac-service.png" },
  { icon: ShieldCheck, title: "Janitorial Services", desc: "DIR-registered hard floor care, deep sanitization, and 5-day commercial cleaning schedules.", href: "/services/janitorial-services", image: "/images/services/janitorial-service.png" },
  { icon: Package, title: "Material Supply & Logistics", desc: "Secure supply chains meeting diversity spend goals. Bulk sourcing and JIT fulfillment.", href: "/services/construction-material-supply", image: "/images/services/material-supply.png" },
  { icon: Trees, title: "Landscape & Grounds Maintenance", desc: "Maintaining exterior aesthetics and safety. Caltrans integration and public works expertise.", href: "/services/landscape-grounds-maintenance", image: "/images/services/construction-consulting.png" },
  { icon: Droplets, title: "Graffiti Abatement & Washing", desc: "Rapid-response municipal graffiti removal and high-traffic pressure washing programs.", href: "/services/graffiti-abatement", image: "/images/services/project-management-team.png" },
  { icon: Navigation, title: "Parking Lot Striping & Sealcoating", desc: "Ensuring ADA compliance and extending asphalt lifecycles for state and commercial complexes.", href: "/services/parking-lot-striping", image: "/images/services/subcontracting-logistics.png" },
  { icon: AppWindow, title: "Window Cleaning", desc: "High-rise and continuous commercial window maintenance, easily bundled with janitorial scopes.", href: "/services/window-cleaning", image: "/images/services/janitorial-service.png" },
  { icon: Paintbrush, title: "Painting Services", desc: "C-33 licensed interior and exterior painting services designed for tenant improvements.", href: "/services/painting-services", image: "/images/services/hvac-service.png" },
  { icon: Hammer, title: "Roofing Repair", desc: "High-margin preventative maintenance and leak repair backed by our network of C-39 contractors.", href: "/services/roofing-repair", image: "/images/services/material-supply.png" },
  { icon: Wind, title: "HVAC Maintenance", desc: "Long-term service contracts preserving mechanical systems via C-20 subcontracting.", href: "/services/hvac-maintenance", image: "/images/services/hvac-service.png" },
  { icon: Zap, title: "Electrical Repair", desc: "Fast resolution of public utility and private commercial issues using vetted C-10 partners.", href: "/services/electrical-repair", image: "/images/services/construction-consulting.png" },
  { icon: Wrench, title: "Plumbing Repair", desc: "Comprehensive retrofits and emergency line repairs handled under our C-36 division.", href: "/services/plumbing-repair", image: "/images/services/subcontracting-logistics.png" },
  { icon: Truck, title: "Moving & Relocation Services", desc: "Constant and dependable logistics for state office relocations and agency facility moves.", href: "/services/moving-relocation", image: "/images/services/project-management-team.png" },
];

const digitalServices = [
  { icon: Globe, title: "Website Build & Redesign", desc: "WCAG 2.1 AA compliant, high-performance digital infrastructure for agencies.", href: "/services/website-build-redesign", image: "/images/bid-analysis-hero.png" },
  { icon: BrainCircuit, title: "Strategic Bid & Procurement Management", desc: "Navigating deep procurement complexity with high-precision bidding and RFP support led by Roy Krautstrunk.", href: "/services/strategic-bid-advisory", image: "/images/bid-analysis-hero.png" },
  { icon: SearchCode, title: "Modern Search (SEO/AEO/GEO)", desc: "Semantic authority for AI-driven search environments and answer engines.", href: "/services/search-visibility-seo-aeo", image: "/images/bid-analysis-hero.png" },
];

export default function ServicesOverview() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black/20">
      
      {/* Premium Dark Navy Hero - HARMONIZED */}
      <section className="relative px-6 pt-24 pb-12 md:pt-36 md:pb-20 overflow-hidden bg-brand-navy-900 border-b border-white/5">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue-600/10 blur-[100px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-brand-blue-600/5 blur-[80px]" />
          <div className="absolute bottom-0 left-0 right-0 h-96 opacity-10 bg-[radial-gradient(#1E6FD9_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-600/10 border border-brand-blue-600/20 mb-6 backdrop-blur-md"
          >
            <Briefcase className="w-3.5 h-3.5 text-brand-blue-600 fill-brand-blue-600" />
            <span className="text-[10px] font-black tracking-[0.2em] text-brand-blue-600 uppercase">Core Competencies</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight mb-8 leading-[1.1]"
          >
            Services & <br className="hidden md:block"/>
            <span className="italic text-brand-blue-600">Contracting Capabilities.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
          >
            Delivering exceptional value through a dual-delivery model: elite CSLB Class B self-performance coupled with a rigorously vetted, DVBE-certified subcontractor network.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 w-full">
        <motion.div 
          variants={STAGGER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {services.map((srv, i) => (
            <motion.div key={i} variants={FADE_UP} className="h-full">
              <Link href={srv.href} className="group flex flex-col h-full bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="aspect-[16/9] relative overflow-hidden">
                   <img src={srv.image} alt={srv.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-brand-navy-900/20 group-hover:bg-transparent transition-colors" />
                   <div className="absolute top-6 left-6 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center text-brand-blue-600 shadow-xl rotate-3 group-hover:rotate-0 transition-transform">
                      <srv.icon className="w-6 h-6" />
                   </div>
                </div>
                
                <div className="p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-brand-navy-900 dark:text-white mb-4 tracking-tight group-hover:text-brand-blue-600 transition-colors uppercase leading-none italic font-serif">
                    {srv.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-grow font-medium text-sm">
                    {srv.desc}
                  </p>

                  <div className="mt-auto flex items-center gap-2 text-[10px] font-black text-brand-blue-600 group-hover:text-blue-700 uppercase tracking-widest">
                    View Detail <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Digital Division Section */}
        <div className="mt-32 mb-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-[11px] font-black tracking-widest text-brand-blue-600 uppercase mb-4">New Division</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-brand-navy-900 dark:text-white italic">
                Digital Transformation & <br className="hidden md:block"/>GovTech Solutions
              </h3>
            </div>
            <Link href="/contact" className="text-[11px] font-black text-brand-navy-900 dark:text-white border-b-2 border-brand-blue-600 pb-2 hover:text-brand-blue-600 transition-colors uppercase tracking-widest">
              Request a Tech Consultation
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {digitalServices.map((srv, i) => (
              <motion.div 
                key={srv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="h-full"
              >
                <Link href={srv.href} className="group flex flex-col h-full bg-slate-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-8 hover:bg-white dark:hover:bg-brand-navy-900 transition-all duration-300 hover:shadow-xl">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center mb-6 text-brand-blue-600 group-hover:bg-brand-blue-600 group-hover:text-white transition-all shadow-sm">
                    <srv.icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-xl font-bold text-brand-navy-900 dark:text-white mb-4 group-hover:text-brand-blue-600 transition-colors">{srv.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8 flex-grow font-medium">{srv.desc}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black text-brand-blue-600 uppercase tracking-widest">
                    Solution Detail <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Delivery Model Callout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 bg-brand-navy-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-blue-600/20 rounded-full blur-[100px]" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-success/10 rounded-full blur-[100px]" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif mb-8 italic italic">Our Delivery Philosophy</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-10 font-medium">
              Stronger Built Group strictly adheres to Commercially Useful Function (CUF) regulations—not just in construction, but in our digital solutions. We leverage our SDVOSB status and CSLB #1057434 Class B classification to manage projects with high-integrity oversight.
            </p>
            <Link href="/government" className="inline-flex items-center gap-3 bg-white text-brand-navy-900 hover:bg-slate-100 px-10 py-5 rounded-2xl font-bold transition-all shadow-lg hover:-translate-y-1">
              Explore Government Hub <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
