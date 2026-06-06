"use client";

import { ShieldCheck, Award, MapPin, Phone, Mail, LayoutDashboard, LogIn, FileText } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [session, setSession] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  return (
    <footer className="relative bg-gradient-to-b from-[#0a1128] via-[#050a17] to-[#02050d] text-slate-400 pt-20 pb-10 border-t border-slate-800/60 overflow-hidden font-sans">
      
      {/* Decorative top border glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-brand-blue-500/40 to-transparent" />
      
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute bottom-0 right-10 w-[300px] h-[300px] rounded-full bg-brand-blue-600/5 blur-[80px]" />
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-900/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-slate-800/50">
          
          {/* Brand Info (5 columns on large screen) */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="flex flex-col items-start gap-1.5 group select-none">
              <span className="text-2xl font-black tracking-tight text-white leading-none group-hover:text-brand-blue-500 transition-colors">
                STRONGER<span className="text-brand-blue-500 group-hover:text-white transition-colors">built</span>
              </span>
              <span className="text-[9px] font-black tracking-[0.25em] text-slate-500 uppercase leading-none">
                Strategic Bids Portal
              </span>
            </Link>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              We find, write, and file winning proposals for state, local, and federal government contracts. Our rewards are aligned with your success.
            </p>

            {/* Veteran Owned SDVOSB Badge */}
            <div className="inline-flex items-center gap-3 bg-white/5 border border-slate-800/80 rounded-2xl p-4 max-w-xs shadow-lg shadow-black/10">
              <div className="bg-brand-blue-600/10 p-2 rounded-xl border border-brand-blue-500/20 shrink-0">
                <ShieldCheck className="h-6 w-6 text-brand-blue-500" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-black tracking-widest text-brand-blue-400 uppercase">Certified SDVOSB</p>
                <p className="text-xs text-slate-200 font-bold leading-tight">Service-Disabled Veteran-Owned Small Business</p>
              </div>
            </div>
          </div>

          {/* Quick Links Column (2 columns) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-xs font-black tracking-[0.15em] text-slate-200 uppercase pb-2 border-b border-slate-800/50">Services</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link href="/open-bids" className="hover:text-brand-blue-400 transition-colors flex items-center gap-1.5 hover:translate-x-0.5 transform duration-200">
                  Open Bids
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-brand-blue-400 transition-colors flex items-center gap-1.5 hover:translate-x-0.5 transform duration-200">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/bid-management" className="hover:text-brand-blue-400 transition-colors flex items-center gap-1.5 hover:translate-x-0.5 transform duration-200">
                  Bid Management
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-brand-blue-400 transition-colors flex items-center gap-1.5 hover:translate-x-0.5 transform duration-200">
                  Our Results
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column (2 columns) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-xs font-black tracking-[0.15em] text-slate-200 uppercase pb-2 border-b border-slate-800/50">Company</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link href="/about" className="hover:text-brand-blue-400 transition-colors flex items-center gap-1.5 hover:translate-x-0.5 transform duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-brand-blue-400 transition-colors flex items-center gap-1.5 hover:translate-x-0.5 transform duration-200">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-brand-blue-400 transition-colors flex items-center gap-1.5 hover:translate-x-0.5 transform duration-200">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-blue-400 transition-colors flex items-center gap-1.5 hover:translate-x-0.5 transform duration-200">
                  Contact Desk
                </Link>
              </li>
              <li>
                <Link href="/llms.txt" className="hover:text-brand-blue-400 transition-colors flex items-center gap-1.5 hover:translate-x-0.5 transform duration-200" target="_blank">
                  <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  LLM Docs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Portal Info (3 columns) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-5">
              <h4 className="text-xs font-black tracking-[0.15em] text-slate-200 uppercase pb-2 border-b border-slate-800/50">Contact Info</h4>
              <ul className="space-y-3.5 text-sm font-medium">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-blue-500 shrink-0 mt-0.5" />
                  <span className="text-slate-300">San Diego, CA</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-brand-blue-500 shrink-0" />
                  <span className="text-slate-300 hover:text-white transition-colors">(831) 760-0806</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-brand-blue-500 shrink-0" />
                  <span className="text-slate-300 hover:text-white transition-colors">hello@strongerbuilt.xyz</span>
                </li>
              </ul>
            </div>

            {/* Portal CTA */}
            <div className="pt-2">
              {session ? (
                <Link href="/portal/vendor" className="inline-flex items-center justify-center gap-2.5 w-full bg-brand-blue-600 hover:bg-blue-500 text-white py-3 px-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-brand-blue-600/15 hover:shadow-brand-blue-600/35 hover:-translate-y-0.5 transform duration-300 transition-all border border-brand-blue-500/20">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  My Dashboard
                </Link>
              ) : (
                <Link href="/login" className="inline-flex items-center justify-center gap-2.5 w-full bg-white/5 hover:bg-white/10 text-white border border-slate-800 py-3 px-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:-translate-y-0.5 transform duration-300 transition-all">
                  <LogIn className="w-3.5 h-3.5 text-brand-blue-500" />
                  Portal Login
                </Link>
              )}
            </div>
          </div>

        </div>

        {/* Credentials trust bar (Horizontal banner) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-b border-slate-800/40">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.01] border border-white/[0.02] hover:bg-white/[0.02] hover:border-white/[0.04] transition-all duration-300">
            <Award className="w-8 h-8 text-brand-blue-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="text-xs font-black text-white uppercase tracking-wider">Veteran-Owned Firm</h5>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Certified Service-Disabled Veteran-Owned Small Business (SDVOSB) with years of defense & civil bidding experience.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.01] border border-white/[0.02] hover:bg-white/[0.02] hover:border-white/[0.04] transition-all duration-300">
            <ShieldCheck className="w-8 h-8 text-brand-blue-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="text-xs font-black text-white uppercase tracking-wider">Nationwide Coverage</h5>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Sourcing and managing federal, state, city, and county opportunities across all 50 US states.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.01] border border-white/[0.02] hover:bg-white/[0.02] hover:border-white/[0.04] transition-all duration-300">
            <Award className="w-8 h-8 text-brand-blue-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="text-xs font-black text-white uppercase tracking-wider">Two-Sets-of-Eyes Review</h5>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Every requirement and qualification matrix undergoes multi-tier peer reviews to ensure zero-defect compliance.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-5 text-[11px] font-bold tracking-wider text-slate-600">
          <p>© {currentYear} Stronger Built LLC. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors uppercase">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors uppercase">Terms of Use</Link>
            <Link href="/accessibility" className="hover:text-slate-300 transition-colors uppercase">Accessibility Statement</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
