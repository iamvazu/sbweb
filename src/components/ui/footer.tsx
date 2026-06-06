import { ShieldCheck, Award, MapPin, Phone, Mail, LayoutDashboard, LogIn } from "lucide-react";
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
    <footer className="bg-brand-navy-900 text-slate-300 pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <Link href="/" className="flex flex-col items-start gap-1 group">
              <span className="text-2xl font-black tracking-tight text-white leading-none">
                STRONGER<span className="text-brand-blue-600">built</span>
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase leading-none">
                LLC
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mt-4">
              Veteran-owned proposal consultants who find, manage, and win government bids for businesses nationwide.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-wide uppercase text-sm mb-4">Credentials & Trust</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Award className="w-5 h-5 text-brand-blue-600 shrink-0" />
                <span><strong className="text-white">Veteran-Owned Firm</strong><br/>Certified Service-Disabled Veteran-Owned Small Business (SDVOSB)</span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-success shrink-0" />
                <span><strong className="text-white">Nationwide Coverage</strong><br/>Finding and winning bids across all 50 states</span>
              </li>
              <li className="flex items-start gap-3">
                <Award className="w-5 h-5 text-brand-blue-600 shrink-0" />
                <span><strong className="text-white">Two-Sets-of-Eyes Review</strong><br/>Every requirement checked twice before submission</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-wide uppercase text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/#pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Results</Link></li>
              <li><Link href="/learning-center" className="hover:text-white transition-colors">Learning Center</Link></li>
              <li><Link href="/#industries" className="hover:text-white transition-colors">Industries</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Desk</Link></li>
              <li className="pt-4 mt-2">
                {session ? (
                  <Link href="/portal/vendor" className="inline-flex items-center justify-center gap-2 w-full bg-brand-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-brand-blue-600/20 transition-all">
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    My Dashboard
                  </Link>
                ) : (
                  <Link href="/login" className="inline-flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg transition-all">
                    <LogIn className="w-3.5 h-3.5" />
                    Portal Login
                  </Link>
                )}
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-wide uppercase text-sm mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-blue-600 shrink-0 mt-0.5" />
                <span>San Diego, CA</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-blue-600 shrink-0" />
                <span>(831) 760-0806</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-blue-600 shrink-0" />
                <span>hello@strongerbuilt.xyz</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold tracking-wide text-slate-500">
          <p>© {currentYear} Stronger Built LLC. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">Accessibility Statement</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
