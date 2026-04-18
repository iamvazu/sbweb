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
    <div className="flex flex-col min-h-screen pt-32 pb-24 bg-background-light dark:bg-black/20">
      
      {/* Hero Section */}
      <section className="relative px-4 mb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue-600/10 border border-brand-blue-600/20 mb-8"
          >
            <Star className="w-4 h-4 text-brand-blue-600 fill-brand-blue-600" />
            <span className="text-xs font-black tracking-widest text-brand-blue-600 uppercase">Strategic Procurement Advisory</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black text-brand-navy-900 dark:text-white tracking-tight mb-8 leading-none uppercase italic"
          >
            Winning Government Bids <br className="hidden md:block"/>
            <span className="text-brand-blue-600">Is a Full-Time Job.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto mb-12 font-medium"
          >
            Stop guessing on RFP requirements. We've helped California small businesses win government contracts from <span className="text-brand-navy-900 dark:text-white font-bold">$50,000 to $2 million.</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
             <Link href="/contact" className="bg-brand-navy-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-brand-blue-600 transition-all shadow-2xl">
                Book Royal Advisory
             </Link>
             <Link href="#pricing" className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:border-brand-blue-600 transition-all">
                View Pricing Tiers
             </Link>
          </motion.div>
        </div>
      </section>

      {/* The Service Matrix */}
      <section className="py-24 bg-brand-navy-900 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, i) => (
              <motion.div 
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-10 rounded-[3rem] group hover:bg-white/10 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-blue-600/20 text-brand-blue-600 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <svc.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tight">{svc.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">
                  {svc.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-sm font-black text-brand-blue-600 uppercase tracking-[0.3em] mb-4">Investment Tiers</h2>
            <h3 className="text-4xl md:text-6xl font-black text-brand-navy-900 dark:text-white uppercase italic">Transparent <span className="text-brand-blue-600">Fixed-Fee</span> Modeling.</h3>
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
                  "flex flex-col p-10 rounded-[4rem] border transition-all",
                  tier.featured 
                    ? "bg-brand-navy-900 border-brand-blue-600 shadow-2xl shadow-brand-blue-600/20 scale-105" 
                    : "bg-white dark:bg-brand-navy-900/50 border-gray-200 dark:border-white/10 hover:border-brand-blue-600/50"
                )}
              >
                <h4 className={cn("text-xs font-black uppercase tracking-[0.2em] mb-6", tier.featured ? "text-brand-blue-600" : "text-slate-400")}>
                  {tier.range}
                </h4>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className={cn("text-5xl font-black uppercase italic", tier.featured ? "text-white" : "text-brand-navy-900 dark:text-white")}>
                    {tier.price}
                  </span>
                  <span className="text-slate-500 font-bold">/ Project</span>
                </div>
                <p className={cn("text-sm mb-10 font-medium", tier.featured ? "text-slate-400" : "text-slate-500")}>
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
                  "mt-auto w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2",
                  tier.featured ? "bg-brand-blue-600 text-white hover:bg-blue-500" : "bg-slate-100 dark:bg-white/10 text-brand-navy-900 dark:text-white hover:bg-brand-blue-600 hover:text-white"
                )}>
                  Secure Roy's Desk <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-brand-navy-900/5 dark:bg-white/5 border-y border-gray-100 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
             <div>
                <Quote className="w-16 h-16 text-brand-blue-600/20 mb-8" />
                <h3 className="text-3xl md:text-5xl font-black text-brand-navy-900 dark:text-white leading-tight mb-8 uppercase italic">
                   "If you've never won a bid, you're competing against the system, not just the price."
                </h3>
                <div className="flex items-center gap-5">
                   <div className="w-16 h-16 rounded-full bg-brand-blue-600 flex items-center justify-center font-black text-white text-xl">RK</div>
                   <div>
                      <p className="font-black text-brand-navy-900 dark:text-white text-lg leading-none mb-1">Roy Krautstrunk</p>
                      <p className="text-brand-blue-600 font-bold uppercase tracking-widest text-xs">CEO & Lead Procurement Strategist</p>
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
                    className="bg-white dark:bg-brand-navy-900 p-8 rounded-3xl border border-gray-100 dark:border-white/10 shadow-xl"
                   >
                      <div className="flex gap-1 mb-4">
                         {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-warning fill-warning" />)}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 italic font-medium mb-6">"{t.quote}"</p>
                      <p className="font-black text-brand-navy-900 dark:text-white text-sm">{t.name} — <span className="text-brand-blue-600">{t.role}</span></p>
                   </motion.div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="pt-24 pb-32">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-20 h-20 rounded-3xl bg-brand-blue-600 text-white flex items-center justify-center mx-auto mb-10 shadow-2xl rotate-3">
               <TrendingUp className="w-10 h-10" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-brand-navy-900 dark:text-white mb-8 uppercase italic tracking-tight">Stop Wasting Time on <span className="text-brand-blue-600">Failed Bids.</span></h2>
            <p className="text-lg text-slate-500 mb-12 font-medium">Let us manage the compliance, the portals, and the strategy while you focus on the work.</p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-brand-navy-900 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl">
               Win This Next Bid <ArrowRight className="w-5 h-5" />
            </Link>
         </div>
      </section>

    </div>
  );
}
