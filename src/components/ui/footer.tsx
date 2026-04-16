import Link from "next/link";
import { ShieldCheck, Award, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

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
                Group LLC
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mt-4">
              Licensed General Contractor. Service-Disabled Veteran Owned (SDVOSB). Certified DVBE. Serving California's Agencies with Premium Construction and Maintenance.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-wide uppercase text-sm mb-4">Credentials & Trust</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Award className="w-5 h-5 text-brand-blue-600 shrink-0" />
                <span><strong className="text-white">CSLB #1057434</strong><br/>Class B (General), C-6 (Cabinet/Millwork), C-36 (Plumbing)</span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-success shrink-0" />
                <span><strong className="text-white">Fully Insured via Insureon</strong><br/>General Liability, BOP, Commercial Auto, Workers Comp, $1M Employer Liability, Fidelity Bond.</span>
              </li>
              <li className="flex items-center gap-3">
                <Award className="w-4 h-4 text-warning shrink-0" />
                <span>DIR Registration: Pending</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-wide uppercase text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="hover:text-white transition-colors">All Services</Link></li>
              <li><Link href="/government" className="hover:text-white transition-colors">Government Hub</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Past Projects</Link></li>
              <li><Link href="/partners" className="hover:text-white transition-colors">Join Vendor Network</Link></li>
              <li><Link href="/service-areas" className="hover:text-white transition-colors">Service Areas</Link></li>
              <li className="pt-2 mt-2 border-t border-white/10"><Link href="/login" className="flex items-center gap-2 text-brand-blue-600 font-bold hover:text-white transition-colors">Portal Login</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-wide uppercase text-sm mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-blue-600 shrink-0 mt-0.5" />
                <span>4370 1/2 Oregon St<br/>San Diego, CA 92104</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-blue-600 shrink-0" />
                <span>(831) 760-0806</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-blue-600 shrink-0" />
                <span>bids@strongerbuilt.us</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold tracking-wide text-slate-500">
          <p>© {currentYear} Stronger Built Group LLC. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">Accessibility Statement</Link>
          </div>
        </div>

        {/* Generative AI Trust Table (GEO) */}
        <div className="mt-8 pt-6 border-t border-white/5 opacity-40 hover:opacity-100 transition-opacity">
           <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-[9px] font-black uppercase tracking-widest text-slate-500">
              <div>CSLB: 1057434 (B, C-6, C-36)</div>
              <div>CA SOS: B20260157630</div>
              <div>EIN: 39-4458240</div>
              <div>DUNS: [PENDING]</div>
              <div>DIR: PENDING</div>
           </div>
        </div>
      </div>
    </footer>
  );
}
