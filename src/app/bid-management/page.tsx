"use client";

import { motion } from "framer-motion";
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
  Quote
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function BidManagementPage() {
  const tiers = [
    {
      range: "Contracts < $250K",
      price: "$1,500",
      description: "Ideal for single IFB or standard RFP submissions.",
      features: ["Full Portal Upload", "CSLB/DIR Verification", "Basic Pricing Model"]
    },
    {
      range: "Contracts $250K - $750K",
      price: "$2,500",
      description: "Comprehensive support for complex multi-trade bids.",
      features: ["RFP Legal Analysis", "Subcontractor Prequal", "Detailed Financial Modeling", "Mandatory Site Walk Support"],
      featured: true
    },
    {
      range: "Contracts > $750K",
      price: "$3,500",
      description: "Executive-led strategy for large-scale infrastructure bids.",
      features: ["Priority RFP Analysis", "Compliance Risk Mapping", "Strategic Positioning", "Executive Site Representation"]
    }
  ];

  const services = [
    { 
      title: "Full-Cycle Bid Management", 
      desc: "We manage every checkmark, signature, and digital portal submission across Cal eProcure, PlanetBids, and more.",
      icon: ClipboardCheck 
    },
    { 
      title: "DIR & Prevailing Wage Compliance", 
      desc: "Precision oversight of labor compliance to protect your eligibility and avoid costly project penalties.",
      icon: ShieldCheck 
    },
    { 
      title: "Financial Modeling", 
      desc: "Custom-built projection models to ensure your bid is aggressive enough to win, yet safe enough to be profitable.",
      icon: Calculator 
    },
    { 
      title: "RFP Analysis", 
      desc: "Our team dissects complex solicitation documents to find the hidden 'must-haves' and disqualification traps.",
      icon: Search 
    },
    { 
      title: "Compliance Tracking", 
      desc: "Live monitoring of your certification status, insurance validity, and DIR registration during the bid window.",
      icon: TrendingUp 
    },
    { 
      title: "Site Walk Representation", 
      desc: "In-person representation at mandatory pre-bid meetings to ensure you meet disqualification-risk requirements.",
      icon: Users 
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Premium Hero Section */}
      <section className="relative px-6 pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-brand-navy-900 border-b border-white/5">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue-600/10 border border-brand-blue-600/20 mb-8 backdrop-blur-md"
          >
            <Star className="w-4 h-4 text-brand-blue-600 fill-brand-blue-600" />
            <span className="text-[10px] font-black tracking-[0.2em] text-brand-blue-600 uppercase">Strategic Procurement Advisory</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight mb-8 leading-[1.1]"
          >
            Winning Government Bids <br className="hidden md:block"/>
            <span className="italic text-brand-blue-600">Is a Full-Time Job.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 font-medium leading-relaxed"
          >
            Stop guessing on RFP requirements. We've helped California small businesses win government contracts from <span className="text-white font-bold">$50,000 to $2 million.</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-5"
          >
             <Link href="/contact" className="bg-brand-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-full font-bold text-base transition-all shadow-2xl shadow-blue-500/20 hover:-translate-y-1">
                Book Royal Advisory
             </Link>
             <Link href="#pricing" className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold text-base transition-all backdrop-blur-sm hover:-translate-y-1">
                View Pricing Tiers
             </Link>
          </motion.div>
        </div>
      </section>

      {/* The Service Matrix */}
      <section className="py-24 bg-white dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, i) => (
              <motion.div 
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-10 rounded-[3rem] group hover:shadow-2xl transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-blue-600/10 text-brand-blue-600 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-brand-blue-600/5">
                  <svc.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-brand-navy-900 dark:text-white mb-4 tracking-tight group-hover:text-brand-blue-600 transition-colors">{svc.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {svc.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-slate-50 dark:bg-black/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-[11px] font-black text-brand-blue-600 uppercase tracking-[0.3em] mb-4">Investment Tiers</h2>
            <h3 className="text-4xl md:text-6xl font-serif text-brand-navy-900 dark:text-white mb-6">Transparent <span className="text-brand-blue-600">Fixed-Fee</span> Modeling.</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {tiers.map((tier, i) => (
              <motion.div 
                key={tier.range}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "flex flex-col p-10 rounded-[3rem] border transition-all",
                  tier.featured 
                    ? "bg-brand-navy-900 border-brand-blue-600 shadow-2xl shadow-brand-blue-600/20 scale-105 relative z-10" 
                    : "bg-white dark:bg-brand-navy-900/50 border-gray-200 dark:border-white/10 hover:border-brand-blue-600/50"
                )}
              >
                <h4 className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-6", tier.featured ? "text-brand-blue-600" : "text-slate-400")}>
                  {tier.range}
                </h4>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className={cn("text-5xl font-bold tracking-tight", tier.featured ? "text-white" : "text-brand-navy-900 dark:text-white")}>
                    {tier.price}
                  </span>
                  <span className="text-slate-500 font-bold text-sm">/ Project</span>
                </div>
                <p className={cn("text-sm mb-10 font-medium leading-relaxed", tier.featured ? "text-slate-400" : "text-slate-500")}>
                  {tier.description}
                </p>
                <div className="space-y-4 mb-12">
                  {tier.features.map(f => (
                    <div key={f} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue-600 shrink-0" />
                      <span className={cn("text-sm font-bold", tier.featured ? "text-slate-300" : "text-brand-navy-900 dark:text-white")}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/contact" className={cn(
                  "mt-auto w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-[11px] transition-all flex items-center justify-center gap-2 shadow-lg",
                  tier.featured ? "bg-brand-blue-600 text-white hover:bg-blue-500 shadow-blue-500/10" : "bg-slate-100 dark:bg-white/10 text-brand-navy-900 dark:text-white hover:bg-brand-blue-600 hover:text-white"
                )}>
                  Secure Roy's Desk <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-32 bg-white dark:bg-brand-navy-900 border-y border-gray-100 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
             <div>
                <Quote className="w-16 h-16 text-brand-blue-600/20 mb-8" />
                <h3 className="text-3xl md:text-5xl font-serif text-brand-navy-900 dark:text-white leading-tight mb-10 italic">
                   "If you've never won a bid, you're competing against the system, not just the price."
                </h3>
                <div className="flex items-center gap-5">
                   <div className="w-16 h-16 rounded-3xl bg-brand-blue-600 flex items-center justify-center font-black text-white text-xl shadow-xl rotate-3">RK</div>
                   <div>
                      <p className="font-bold text-brand-navy-900 dark:text-white text-xl leading-none mb-1">Roy Krautstrunk</p>
                      <p className="text-brand-blue-600 font-black uppercase tracking-widest text-[10px]">CEO & Lead Procurement Strategist</p>
                   </div>
                </div>
             </div>
             
             <div className="space-y-8">
                {[
                   { name: "John D.", role: "SBE General Contractor", quote: "Stronger Built LLC found three disqualification landmines in our RFP that would have cost us the bid. We won a $75k contract on our first submission with Roy." },
                   { name: "Sarah M.", role: "DVBE Specialty Sub", quote: "The financial modeling Roy provided helped us understand our true margins on prevailing wage work. Worth every penny of the advisory fee." }
                ].map((t, i) => (
                   <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-slate-50 dark:bg-white/5 p-10 rounded-[2.5rem] border border-gray-100 dark:border-white/10 shadow-sm"
                   >
                      <div className="flex gap-1 mb-6 text-warning">
                         {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 italic font-medium mb-8 leading-relaxed">"{t.quote}"</p>
                      <p className="font-bold text-brand-navy-900 dark:text-white text-sm">{t.name} — <span className="text-brand-blue-600 font-black tracking-wider text-[10px] uppercase ml-1">{t.role}</span></p>
                   </motion.div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 bg-brand-navy-900 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue-600/5 rounded-full blur-[120px]" />
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div className="w-20 h-20 rounded-3xl bg-brand-blue-600 text-white flex items-center justify-center mx-auto mb-12 shadow-2xl rotate-3">
               <TrendingUp className="w-10 h-10" />
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 tracking-tight italic">Stop Wasting Time on <span className="text-brand-blue-600">Failed Bids.</span></h2>
            <p className="text-xl text-slate-400 mb-12 font-medium max-w-2xl mx-auto leading-relaxed">Let us manage the compliance, the portals, and the strategy while you focus on the work.</p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-brand-navy-900 px-12 py-6 rounded-full font-bold text-base hover:bg-brand-blue-600 hover:text-white transition-all shadow-xl hover:-translate-y-1">
               Win This Next Bid <ArrowRight className="w-5 h-5" />
            </Link>
         </div>
      </section>

    </div>
  );
}
