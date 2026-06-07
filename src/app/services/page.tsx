"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  Search, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Laptop, 
  Briefcase, 
  Heart, 
  GraduationCap, 
  Wrench, 
  Package, 
  Shield, 
  ChevronRight,
  TrendingUp,
  FileCheck,
  Check,
  UserPlus,
  Compass
} from "lucide-react";

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const industries = [
  { slug: "janitorial-services", title: "Janitorial & Custodial", icon: Sparkles, desc: "Win government facilities, school districts, and municipal cleaning contracts." },
  { slug: "security-services", title: "Security & Guard Services", icon: Shield, desc: "Win guard services, patrol details, and surveillance monitoring contracts." },
  { slug: "it-software", title: "IT & Software", icon: Laptop, desc: "Win custom software, SaaS, MSP, cybersecurity, and cloud migration bids." },
  { slug: "healthcare-staffing", title: "Healthcare & Staffing", icon: Heart, desc: "Win provider staffing, clinical support, nursing, and medical supply solicitations." },
  { slug: "professional-services", title: "Professional Services", icon: Briefcase, desc: "Win management consulting, legal support, marketing, and design bids." },
  { slug: "education-training", title: "Education & Training", icon: GraduationCap, desc: "Win training, school supplies, and curriculum development contracts." },
  { slug: "facility-maintenance", title: "Facilities & Maintenance", icon: Wrench, desc: "Win building maintenance, plumbing, electrical, and HVAC service contracts." },
  { slug: "construction-material-supply", title: "Material Supply & Logistics", icon: Package, desc: "Win bulk materials, freight, site delivery, and logistics procurement bids." }
];

export default function ServicesOverview() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black/20 font-sans">
      
      {/* Premium Hero Section */}
      <section className="relative px-6 pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50/20 to-white dark:from-brand-navy-950 dark:via-brand-navy-900 dark:to-brand-navy-950 border-b border-slate-200/50 dark:border-white/5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue-600/10 dark:bg-brand-blue-600/15 blur-[100px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-brand-blue-600/5 blur-[80px]" />
          <div className="absolute bottom-0 left-0 right-0 h-96 opacity-[0.03] dark:opacity-10 bg-[radial-gradient(#1E6FD9_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue-50/80 dark:bg-brand-blue-600/10 border border-brand-blue-100 dark:border-brand-blue-600/20 mb-6 backdrop-blur-md"
          >
            <Compass className="w-3.5 h-3.5 text-brand-blue-600 dark:text-brand-blue-400" />
            <span className="text-[10px] font-black tracking-[0.2em] text-brand-blue-600 dark:text-brand-blue-400 uppercase">Core Competencies</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-slate-900 dark:text-white tracking-tight mb-8 leading-[1.1]"
          >
            Services & <br className="hidden md:block"/>
            <span className="italic text-brand-blue-600 dark:text-brand-blue-400">RFP Capabilities.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Stronger Built does one thing: government RFPs. We help you find the right opportunities and win them — nationwide, and built on a simple promise: with Pay-When-You-Win, you mostly pay when you win.
          </motion.p>
        </div>
      </section>

      {/* Main Services - Find & Win */}
      <section className="py-24 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          
          {/* Card 1: Bid Finder */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group flex flex-col justify-between bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[3rem] p-8 md:p-12 shadow-sm hover:shadow-xl hover:bg-white dark:hover:bg-brand-navy-900 transition-all duration-300"
          >
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-brand-blue-600/10 flex items-center justify-center text-brand-blue-600 mb-6">
                <Search className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Service 01</span>
              <h2 className="text-3xl font-serif font-black text-slate-900 dark:text-white leading-tight italic">
                Bid Finder
              </h2>
              <p className="text-sm font-bold text-amber-600 uppercase tracking-widest">We find the right bids for you.</p>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                Every opportunity that fits your business — federal, state, and local — searchable in one place. Fill out your profile in our portal, and we'll automatically match and score active RFPs so you pursue only the ones worth bidding.
              </p>
              
              <div className="space-y-4 pt-4">
                {[
                  "Nationwide opportunity matching (federal, state, county, and city).",
                  "Save searches and receive immediate alerts when matching RFPs drop.",
                  "Honest go/no-go fit assessment so you don't waste time or dollars."
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs font-bold text-slate-700 dark:text-slate-300">
                    <Check className="w-4 h-4 text-brand-blue-600 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-10 flex flex-col sm:flex-row gap-4">
              <Link 
                href="/open-bids" 
                className="flex items-center justify-center gap-2 bg-brand-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-500/10 flex-1"
              >
                Search Open Bids — Free
              </Link>
              <Link 
                href="/login?tab=signup" 
                className="flex items-center justify-center gap-2 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 px-6 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex-1"
              >
                Create Company Profile
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Bid Manager */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group flex flex-col justify-between bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[3rem] p-8 md:p-12 shadow-sm hover:shadow-xl hover:bg-white dark:hover:bg-brand-navy-900 transition-all duration-300"
          >
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-brand-blue-600/10 flex items-center justify-center text-brand-blue-600 mb-6">
                <FileCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Service 02</span>
              <h2 className="text-3xl font-serif font-black text-slate-900 dark:text-white leading-tight italic">
                Bid Manager
              </h2>
              <p className="text-sm font-bold text-amber-600 uppercase tracking-widest">We write it. We submit it. You win it.</p>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                Full-service RFP response managed end-to-end by experienced proposal experts. We translate qualifications, coordinate compliance, author technical narratives, and handle on-time submission. You pay a low flat writing fee and a success fee only when won.
              </p>
              
              <div className="space-y-4 pt-4">
                {[
                  "100% human-authored proposals customized to your unique strengths.",
                  "A named proposal consultant owning your engagement from start to finish.",
                  "Pay-When-You-Win pricing to align our goals with your growth."
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs font-bold text-slate-700 dark:text-slate-300">
                    <Check className="w-4 h-4 text-brand-blue-600 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-10 flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact" 
                className="flex items-center justify-center gap-2 bg-brand-navy-900 text-white hover:bg-slate-800 px-6 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg flex-1"
              >
                Book a Free Consultation
              </Link>
              <Link 
                href="/#pricing" 
                className="flex items-center justify-center gap-2 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 px-6 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex-1"
              >
                See Pricing Model
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Bid Manager Process */}
      <section className="bg-slate-50 dark:bg-black/10 py-24 border-t border-b border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-[11px] font-black text-amber-600 uppercase tracking-[0.3em] mb-4">RFP Response Workflow</h2>
            <h3 className="text-3xl md:text-5xl font-serif text-brand-navy-900 dark:text-white mb-6">Four Steps to a <span className="italic text-brand-blue-600">Compliant Bid</span></h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">From "where do I start" to on-time submission, our consultants manage the entire project pipeline.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Qualify", desc: "We read the full RFP, extract all requirements, deadlines, and evaluation criteria, then give you an honest go/no-go recommendation." },
              { num: "02", title: "Structure", desc: "We build a complete compliance matrix mapping every requirement to a specific response section, finalizing the structure with you." },
              { num: "03", title: "Write", desc: "Our experienced proposal writers draft your technical approach and management narrative. You review and provide feedback before final formatting." },
              { num: "04", title: "Submit & Debrief", desc: "A second consultant reviews the package for compliance and quality, then we submit on time through the portal. Win or lose, we debrief for the next one." }
            ].map((step, i) => (
              <div key={i} className="relative bg-white dark:bg-brand-navy-900 border border-slate-100 dark:border-white/10 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-all">
                <span className="text-3xl font-serif italic font-black text-brand-blue-600/30 dark:text-brand-blue-400/20 block mb-4">{step.num}</span>
                <h4 className="text-lg font-bold text-brand-navy-900 dark:text-white mb-3 uppercase tracking-tight leading-none">{step.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Bid Manager Works */}
      <section className="py-24 max-w-5xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-[11px] font-black text-amber-600 uppercase tracking-[0.3em]">Real Experts. Real Accountability.</h2>
            <h3 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white leading-tight">Winning takes people who have <span className="italic text-brand-blue-600">actually won.</span></h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
              Every consultant on our team has years of proposal experience across multiple sectors. They know procurement rules, evaluator scoring rubrics, and how to position your company's strengths. When strategy, risk, or escalations require expert judgment at 9 PM before a deadline, a real person answers the call.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase">A Named Consultant</h5>
                  <p className="text-[11px] text-slate-500 font-medium">One expert owns your bid engagement start to finish.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase">Human Authorship Only</h5>
                  <p className="text-[11px] text-slate-500 font-medium">Every word is written, edited, and approved by a real person.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4 bg-brand-navy-900 text-white rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue-600/10 rounded-full blur-[80px]" />
            <h4 className="text-xs font-black tracking-widest text-brand-blue-400 uppercase">Who It's For</h4>
            
            <div className="space-y-6 pt-4 relative z-10">
              <div className="space-y-1">
                <h5 className="text-xs font-black uppercase text-slate-200">01. First-time Bidders</h5>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Never responded to an RFP? We guide you through registration, credentials, and compliance from scratch.</p>
              </div>
              <div className="space-y-1">
                <h5 className="text-xs font-black uppercase text-slate-200">02. Teams Without Bandwidth</h5>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Proposal due soon and no one has hours to spare? We step in as your on-demand proposal writing department.</p>
              </div>
              <div className="space-y-1">
                <h5 className="text-xs font-black uppercase text-slate-200">03. Experienced Bidders</h5>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Already bidding but want to increase win rates? We deliver sharper, compliant, and highly competitive packages.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Verticals */}
      <section className="py-24 bg-slate-50 dark:bg-black/20 border-t border-slate-200/50 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-[11px] font-black text-amber-600 uppercase tracking-[0.3em] mb-4">Target Verticals</h2>
            <h3 className="text-3xl md:text-5xl font-serif text-brand-navy-900 dark:text-white mb-6">Win Contracts in <span className="italic text-brand-blue-600">Your Industry</span></h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Select your industry below to learn how we customize Bid Manager proposals to hit the specific evaluation rubrics buyers enforce.</p>
          </div>

          <motion.div 
            variants={STAGGER}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {industries.map((ind) => (
              <motion.div key={ind.slug} variants={FADE_UP} className="h-full">
                <Link href={`/services/${ind.slug}`} className="group flex flex-col h-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[2rem] p-8 hover:shadow-xl hover:border-brand-blue-500/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue-600/10 flex items-center justify-center text-brand-blue-600 mb-6 group-hover:bg-brand-blue-600 group-hover:text-white transition-all shadow-sm">
                    <ind.icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-brand-navy-900 dark:text-white mb-3 group-hover:text-brand-blue-600 transition-colors uppercase leading-tight italic font-serif">
                    {ind.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6 flex-grow font-medium">
                    {ind.desc}
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-amber-600 uppercase tracking-widest mt-auto group-hover:translate-x-1 transition-transform">
                    Explore Vertical <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-navy-900 py-20 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1E6FD9_1px,transparent_1px)] [background-size:40px_40px] opacity-10" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-blue-600/20 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif mb-6 italic">Ready to find and win government bids?</h2>
          <p className="text-slate-300 text-base leading-relaxed mb-10 font-medium max-w-xl mx-auto">
            Create your company profile on our portal to start searching matching bids, or book a free consult to review an active solicitation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/login?tab=signup" 
              className="inline-flex items-center gap-2 bg-brand-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg hover:-translate-y-0.5"
            >
              <UserPlus className="w-4 h-4" /> Create Company Profile
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-white text-brand-navy-900 hover:bg-slate-100 px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg hover:-translate-y-0.5"
            >
              Book a Free Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
