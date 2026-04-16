"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Settings, 
  Database, 
  Users, 
  FileText, 
  TrendingUp, 
  Zap, 
  Bell, 
  Search,
  Lock,
  Globe,
  DollarSign
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SuperAdminPortal() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "super_admin")) {
       // Only allow super_admin
       // router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-black/95 pb-20">
      
      {/* Super Admin Nav */}
      <div className="bg-brand-navy-900 border-b border-white/10 px-6 py-4 flex justify-between items-center mb-8 sticky top-0 z-40 lg:top-16 text-white">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-brand-blue-600 rounded-lg text-white shadow-lg shadow-brand-blue-600/30">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black uppercase tracking-tighter">
              StrongerBuilt <span className="text-brand-blue-600">Super</span> <span className="font-semibold text-slate-400">Admin</span>
            </h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-1">Global System Oversight</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6">
          <button className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest px-3 py-1 border border-white/10 rounded-lg transition-colors">Audit Logs</button>
          <button onClick={logout} className="text-xs font-bold text-slate-400 hover:text-brand-blue-600 uppercase tracking-widest">Logout</button>
          <div className="w-8 h-8 rounded-full bg-brand-blue-600 text-white font-bold flex items-center justify-center text-xs border-2 border-white/20">RK</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full">
        
        {/* Global Financials & Health */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-brand-navy-900 border border-white/10 rounded-3xl p-8 text-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <DollarSign className="w-24 h-24" />
             </div>
             <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Total Contract Value (FY26)</p>
             <h3 className="text-4xl font-black mb-4">$3.2M <span className="text-xs font-bold text-success ml-2">+12% vs LY</span></h3>
             <div className="flex gap-2">
                <div className="h-1 flex-1 bg-brand-blue-600 rounded-full" />
                <div className="h-1 flex-1 bg-brand-blue-600 rounded-full" />
                <div className="h-1 flex-1 bg-white/10 rounded-full" />
             </div>
          </div>
          <div className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-sm">
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Active DVBE Partners</p>
             <h3 className="text-4xl font-black text-brand-navy-900 dark:text-white mb-4">42 <span className="text-xs font-bold text-brand-blue-600 ml-2">9 Verified Pending</span></h3>
             <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 border-2 border-white dark:border-brand-navy-900 flex items-center justify-center text-[10px] font-bold">P{i}</div>
                ))}
                <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/10 border-2 border-white dark:border-brand-navy-900 flex items-center justify-center text-[10px] font-bold text-slate-500">+37</div>
             </div>
          </div>
          <div className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-sm">
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Bid Success Rate</p>
             <h3 className="text-4xl font-black text-brand-navy-900 dark:text-white mb-4">24%</h3>
             <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-relaxed">System-wide across all 11 NAICS monitored codes.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Controls */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Scraper Config */}
            <section className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-sm">
               <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-black text-brand-navy-900 dark:text-white flex items-center gap-3">
                     <Zap className="w-5 h-5 text-brand-blue-600" /> Procurement Scraper Config
                  </h2>
                  <span className="text-[10px] font-black bg-success/10 text-success px-2 py-1 rounded">SYSTEM ACTIVE</span>
               </div>
               
               <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                     <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-brand-navy-900 dark:text-white">NAICS Code Watchlist</h4>
                        <button className="text-[10px] font-black text-brand-blue-600 uppercase tracking-widest">+ Add Code</button>
                     </div>
                     <div className="flex flex-wrap gap-2">
                        {["236220", "238990", "561210", "561720", "561730"].map(code => (
                          <span key={code} className="px-3 py-1.5 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-lg text-xs font-bold flex items-center gap-2">
                            {code} <span className="text-[8px] text-slate-400">×</span>
                          </span>
                        ))}
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Automation Frequency</label>
                        <select className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-blue-600">
                           <option>Real-time (Active Tracking)</option>
                           <option>Daily Digest</option>
                           <option>Weekly Bulk Sweep</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Notification Webhook</label>
                        <input type="text" placeholder="https://api.strongerbuilt.us/v1/..." className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-blue-600" />
                     </div>
                  </div>
                  
                  <button className="w-full bg-brand-blue-600 text-white font-black py-4 rounded-xl shadow-lg shadow-brand-blue-600/30">Force Sync All CalProcure Portals</button>
               </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <section className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-sm">
               <h3 className="text-sm font-black text-brand-navy-900 dark:text-white uppercase tracking-widest mb-6 border-b border-gray-50 dark:border-white/5 pb-4">Global User Admin</h3>
               <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">RK</div>
                        <div>
                           <p className="text-xs font-bold text-brand-navy-900 dark:text-white">Roy K.</p>
                           <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Super Admin</p>
                        </div>
                     </div>
                     <Settings className="w-3 h-3 text-slate-300" />
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brand-blue-600/10 text-brand-blue-600 flex items-center justify-center font-bold text-xs">ST</div>
                        <div>
                           <p className="text-xs font-bold text-brand-navy-900 dark:text-white">Staff Member</p>
                           <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Admin</p>
                        </div>
                     </div>
                     <Settings className="w-3 h-3 text-slate-300" />
                  </div>
               </div>
               <button className="w-full py-3 rounded-xl border border-dashed border-gray-200 dark:border-white/10 text-[10px] font-black text-slate-400 hover:text-brand-blue-600 hover:border-brand-blue-600 transition-all">+ INVITE NEW USER</button>
            </section>

            <section className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-sm">
               <h3 className="text-sm font-black text-brand-navy-900 dark:text-white uppercase tracking-widest mb-4">System Settings</h3>
               <div className="space-y-2">
                  <button className="w-full text-left p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 flex items-center gap-3 text-xs font-bold transition-colors">
                     <Database className="w-4 h-4 text-slate-400" /> Backup Database
                  </button>
                  <button className="w-full text-left p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 flex items-center gap-3 text-xs font-bold transition-colors">
                     <Globe className="w-4 h-4 text-slate-400" /> Domain & DNS Config
                  </button>
                  <button className="w-full text-left p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 flex items-center gap-3 text-xs font-bold transition-colors">
                     <ShieldCheck className="w-4 h-4 text-slate-400" /> Security Keys (API)
                  </button>
               </div>
            </section>
          </div>

        </div>

      </div>
    </div>
  );
}
