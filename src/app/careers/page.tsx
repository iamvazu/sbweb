"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Mail, 
  MapPin, 
  Award, 
  TrendingUp, 
  Check, 
  PenTool, 
  Search, 
  Palette, 
  Layers, 
  FileText, 
  Users,
  Target
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface RoleItem {
  title: string;
  tags: string[];
  description: string;
  requirements: string[];
  emailSubject: string;
}

export default function CareersPage() {
  const [openRole, setOpenRole] = useState<number | null>(null);

  const stats = [
    { label: "100% Remote", desc: "Work from anywhere in the US", icon: MapPin },
    { label: "Veteran-Owned", desc: "Mission-driven from day one", icon: Award },
    { label: "Growing Team", desc: "New roles opening as we scale", icon: TrendingUp },
  ];

  const benefits = [
    { title: "Mission that matters", desc: "We help small businesses win government contracts they'd never land on their own." },
    { title: "Fully remote", desc: "Work from anywhere in the US, on a team that trusts you to own your work." },
    { title: "Tools that kill busywork", desc: "We invest in the systems that take grunt work off your plate, so your time goes to craft." },
    { title: "Grow with us", desc: "We promote from within — early team members lead teams." },
    { title: "Aligned incentives", desc: "Our pay-when-you-win model means the whole team wins when our clients do." },
    { title: "Real ownership", desc: "Fast-paced and deadline-driven, but genuinely supportive — performance gets noticed." },
  ];

  const roles: RoleItem[] = [
    {
      title: "Proposal Specialist",
      tags: ["Full-time", "Remote", "Writing"],
      description: "Own proposals from kickoff to submission — strategy, structure, executive summaries, and persuasive narrative. You'll partner with a Capture Strategist and a Client Partner so you can focus on what actually wins: writing that's clear, compliant, and compelling.",
      requirements: [
        "3+ years proposal, technical, or grant writing experience",
        "Hands-on experience with federal, state, or local RFPs",
        "Exceptional writing and editing instincts",
        "Calm, organized, and reliable under deadline pressure"
      ],
      emailSubject: "Application: Proposal Specialist"
    },
    {
      title: "Capture Strategist",
      tags: ["Full-time", "Remote", "Strategy"],
      description: "Read incoming RFPs, make the go/no-go call, and build the win strategy our writers execute. You'll shape positioning, pricing approach, and compliance up front — and work directly with leadership on high-stakes pursuits.",
      requirements: [
        "Background in capture, pursuit, or proposal strategy",
        "Analytical mindset — comfortable with scoring frameworks and evaluation criteria",
        "A sharp eye for the disqualifier that sinks a bid before pricing is even read"
      ],
      emailSubject: "Application: Capture Strategist"
    },
    {
      title: "Proposal Production Designer",
      tags: ["Full-time", "Remote", "Design"],
      description: "Turn finished proposals into polished, compliant, submission-ready documents. You'll design in InDesign and Word, build reusable templates, and work shoulder-to-shoulder with writers so every submission looks as sharp as it reads.",
      requirements: [
        "Adobe InDesign and Microsoft Word proficiency (required)",
        "Document design experience — not just marketing collateral",
        "An eye for compliant formatting, tables, and accessibility"
      ],
      emailSubject: "Application: Proposal Production Designer"
    },
    {
      title: "Client Partner",
      tags: ["Full-time", "Remote", "Client Success"],
      description: "Own the client relationship from the first call through award — onboarding, updates, gathering feedback, and keeping every engagement on schedule. You're the steady, proactive voice clients trust when deadlines stack up.",
      requirements: [
        "2+ years client management or account management experience",
        "Clear, proactive communicator — especially under deadline pressure",
        "Organized and unflappable; you make clients feel in good hands"
      ],
      emailSubject: "Application: Client Partner"
    }
  ];

  const recruitingPools = [
    { emoji: "✍️", title: "Proposal Writers", desc: "Proposal, technical, or grant writers with 2+ years experience", icon: PenTool },
    { emoji: "🔍", title: "Opportunity Researchers", desc: "Market research, bid intelligence, or competitive-analysis backgrounds", icon: Search },
    { emoji: "🎨", title: "Production Designers", desc: "Document and visual design specialists — InDesign a must", icon: Palette },
    { emoji: "📊", title: "Capture Strategists", desc: "Capture, pursuit, or bid-strategy experience", icon: Layers },
    { emoji: "✅", title: "Compliance Specialists", desc: "Detail-driven QA for requirements, formatting, and on-time submission", icon: FileText },
    { emoji: "🤝", title: "Business Development", desc: "Outbound, relationship management, or public-sector / SMB sales", icon: Users }
  ];

  const toggleRole = (index: number) => {
    setOpenRole(openRole === index ? null : index);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 dark:bg-brand-navy-950 dark:text-slate-100">
      
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden sb-hero border-b border-slate-200/50 dark:border-white/5 bg-slate-50 dark:bg-brand-navy-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue-600/10 dark:bg-brand-blue-600/15 blur-[120px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-brand-blue-600/5 blur-[100px]" />
          <div className="absolute bottom-0 left-0 right-0 h-96 opacity-[0.03] dark:opacity-10 bg-[radial-gradient(#1E6FD9_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-50 dark:bg-brand-blue-500/10 border border-brand-blue-100 dark:border-brand-blue-500/20 backdrop-blur-md mb-6">
            <span className="text-[10px] font-black tracking-[0.25em] text-brand-blue-600 dark:text-brand-blue-400 uppercase">
              Join Our Team
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 dark:text-white tracking-tight mb-6 leading-[1.05] font-bold">
            Do the work that <span className="text-brand-blue-600 dark:text-brand-blue-400 italic">wins.</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-2xl mx-auto">
            We're building a team of proposal experts who love sharp writing, smart strategy, and helping small businesses win contracts they'd never land alone. Fully remote, anywhere in the US.
          </p>
        </div>
      </section>

      {/* Stat Tiles Section */}
      <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div 
                key={i} 
                className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-lg flex flex-col items-center text-center group hover:shadow-xl transition-all"
              >
                <div className="w-10 h-10 rounded-2xl bg-brand-blue-50 dark:bg-brand-blue-500/10 border border-brand-blue-100 dark:border-brand-blue-500/20 flex items-center justify-center mb-4 text-brand-blue-600 dark:text-brand-blue-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-brand-navy-900 dark:text-white mb-1">
                  {stat.label}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Us Section */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-navy-900 dark:text-white font-bold mb-4">
            Why Stronger Built?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-lg mx-auto font-medium">
            A small, sharp, fully remote team where good work is seen — and rewarded.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-brand-blue-500 to-blue-700 text-white flex items-center justify-center shadow-md">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-brand-navy-900 dark:text-white mb-1">
                  {benefit.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="max-w-5xl mx-auto px-6 py-12 border-t border-slate-200/60 dark:border-white/5" id="open-roles">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-navy-900 dark:text-white font-bold mb-4">
            Open positions.
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium">
            Find your role. Every position is full-time and fully remote.
          </p>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {roles.map((role, i) => {
            const isOpen = openRole === i;
            return (
              <div 
                key={i}
                className={cn(
                  "bg-white dark:bg-slate-800 border rounded-3xl overflow-hidden shadow-sm transition-all duration-300",
                  isOpen ? "border-brand-blue-200 dark:border-brand-blue-500/30 shadow-md" : "border-slate-200 dark:border-white/10 hover:border-slate-300"
                )}
              >
                <button
                  onClick={() => toggleRole(i)}
                  className="w-full text-left p-6 md:p-8 flex items-start gap-4 justify-between focus:outline-none cursor-pointer group"
                >
                  <div className="space-y-3">
                    <span className="text-lg md:text-xl font-bold text-brand-navy-900 dark:text-white group-hover:text-brand-blue-600 dark:group-hover:text-brand-blue-400 transition-colors">
                      {role.title}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {role.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex} 
                          className="text-[9px] font-black tracking-wider uppercase bg-brand-blue-50 dark:bg-brand-blue-500/10 text-brand-blue-600 dark:text-brand-blue-400 border border-brand-blue-100 dark:border-brand-blue-500/20 px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center text-brand-blue-600 dark:text-brand-blue-400 shrink-0">
                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isOpen && "transform rotate-180")} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 md:px-8 md:pb-8 border-t border-slate-100 dark:border-white/5 pt-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        <p className="mb-6">{role.description}</p>
                        
                        <div className="mb-6">
                          <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
                            <Target className="w-3.5 h-3.5 text-brand-blue-500" />
                            What you bring
                          </h4>
                          <ul className="space-y-2.5 pl-1">
                            {role.requirements.map((req, reqIndex) => (
                              <li key={reqIndex} className="flex gap-2 items-start text-slate-700 dark:text-slate-200 font-medium">
                                <span className="text-brand-blue-600 font-bold shrink-0">→</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <a 
                          href={`mailto:careers@strongerbuilt.us?subject=${encodeURIComponent(role.emailSubject)}`}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 hover:-translate-y-0.5"
                        >
                          <Mail className="w-4 h-4" />
                          Apply for this role
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Always Recruiting Section */}
      <section className="max-w-5xl mx-auto px-6 py-24 border-t border-slate-200/60 dark:border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-navy-900 dark:text-white font-bold mb-4">
            No open role? Still reach out.
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium max-w-md mx-auto">
            We're always looking for exceptional people. If you're one of these, send us a note.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {recruitingPools.map((pool, i) => {
            const Icon = pool.icon;
            return (
              <div 
                key={i} 
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-3xl p-6 flex flex-col justify-between shadow-sm group hover:shadow-md transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center mb-4 text-slate-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="text-sm font-bold text-brand-navy-900 dark:text-white mb-2">
                    {pool.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {pool.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <a 
            href="mailto:careers@strongerbuilt.us?subject=General%20Application"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/15 hover:-translate-y-0.5"
          >
            <Mail className="w-4.5 h-4.5" />
            Send a General Application
          </a>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-r from-brand-navy-900 to-[#122c52] text-white rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden shadow-xl border border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_80%_120%,rgba(30,111,217,0.15),transparent)] pointer-events-none" />
          <div className="relative z-10 max-w-xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
              Ready to win with us?
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Fully remote. Mission-driven. A team that wins together.
            </p>
            <div className="pt-4">
              <a 
                href="mailto:careers@strongerbuilt.us?subject=Application"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5"
              >
                Send Your Application
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
