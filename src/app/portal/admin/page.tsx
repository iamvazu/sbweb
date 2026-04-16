"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  FileText, 
  Inbox, 
  CheckCircle2, 
  Search, 
  Bell, 
  Database, 
  Settings, 
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Calendar
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

const INQUIRIES = [
  { id: "1001", type: "gov", name: "Cameron MacGregor", org: "CHP Procurement", status: "New Bid", date: "2 hrs ago", summary: "Requesting pricing for District 5 HVAC maintenance package." },
  { id: "1002", type: "sub", name: "David Chen", org: "Chen Electrical (C-10)", status: "Pending Verification", date: "Yesterday", summary: "Applied to DVBE Partner Network. Uploaded W-9 and Insurance confirms." },
  { id: "1003", type: "general", name: "Sarah Jenkins", org: "Westfield Property Mgmt", status: "In Discussion", date: "Apr 12", summary: "Looking for janitorial bids for 3 commercial properties in SD." },
  { id: "1004", type: "sub", name: "Marcus Torres", org: "Precision Plumbing", status: "Approved Partner", date: "Apr 10", summary: "Approved C-36 partner. DIR valid through 2027." }
];

export default function AdminPortal() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!isLoading && (!user || (user.role !== "admin" && user.role !== "super_admin"))) {
      // router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const filteredInquiries = INQUIRIES.filter(inc => {
    if (filter === "all") return true;
    return inc.type === filter;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-black/90 pb-20">
      
      {/* Admin Nav */}
      <div className="bg-white dark:bg-brand-navy-900 border-b border-gray-200 dark:border-white/10 px-6 py-4 flex justify-between items-center mb-8 sticky top-0 z-40 lg:top-16">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-brand-blue-600 rounded-lg text-white">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-brand-navy-900 dark:text-white uppercase tracking-tighter">
              Admin <span className="font-semibold text-slate-400">Dashboard</span>
            </h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{user?.organization}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search pipeline..." className="bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-600 w-48 lg:w-64" />
          </div>
          <button className="relative text-slate-600 dark:text-slate-300 hover:text-brand-blue-600 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-brand-navy-900"></span>
          </button>
          <button onClick={logout} className="text-xs font-bold text-slate-500 hover:text-brand-navy-900 dark:hover:text-white uppercase tracking-widest px-3 py-1 border border-gray-200 dark:border-white/10 rounded-lg">Logout</button>
          <div className="w-8 h-8 rounded-full bg-brand-blue-600 text-white font-bold flex items-center justify-center text-xs">A</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full">
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-blue-600/10 flex items-center justify-center text-brand-blue-600"><Inbox className="w-5 h-5" /></div>
              <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-md">+3 week</span>
            </div>
            <h3 className="text-3xl font-black text-brand-navy-900 dark:text-white mb-1">14</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Inbound Bids</p>
          </div>
          <div className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-600"><Users className="w-5 h-5" /></div>
              <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-md">1 New</span>
            </div>
            <h3 className="text-3xl font-black text-brand-navy-900 dark:text-white mb-1">28</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Sub Partners</p>
          </div>
          <div className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-600/10 flex items-center justify-center text-amber-600"><FileText className="w-5 h-5" /></div>
            </div>
            <h3 className="text-3xl font-black text-brand-navy-900 dark:text-white mb-1">112</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Cap. Statement DLs</p>
          </div>
          <div className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm flex flex-col justify-center bg-gradient-to-br from-brand-blue-600 to-blue-900 text-white border-none shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4" />
              <h3 className="font-bold text-sm">Site Inspection</h3>
            </div>
            <p className="text-[10px] text-white/80 leading-relaxed">April 20th - SD County Admin Bldg. Ensure safety logs are synced.</p>
          </div>
        </div>

        {/* Action Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main List */}
          <div className="lg:col-span-2 bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-slate-50 dark:bg-white/5">
              <h2 className="font-black text-xs text-brand-navy-900 dark:text-white uppercase tracking-widest">Inbound Pipeline</h2>
              <div className="flex gap-2">
                <button onClick={() => setFilter("all")} className={`px-3 py-1 rounded-md text-[10px] font-black transition-all ${filter === "all" ? "bg-brand-blue-600 text-white" : "text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10"}`}>ALL</button>
                <button onClick={() => setFilter("gov")} className={`px-3 py-1 rounded-md text-[10px] font-black transition-all ${filter === "gov" ? "bg-brand-blue-600 text-white" : "text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10"}`}>GOV</button>
                <button onClick={() => setFilter("sub")} className={`px-3 py-1 rounded-md text-[10px] font-black transition-all ${filter === "sub" ? "bg-brand-blue-600 text-white" : "text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10"}`}>SUBS</button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-white/10 text-[10px] uppercase tracking-widest text-slate-400">
                    <th className="font-bold py-4 px-6 text-[10px]">Contact / Org</th>
                    <th className="font-bold py-4 px-6 text-[10px]">Type</th>
                    <th className="font-bold py-4 px-6 text-[10px]">Status</th>
                    <th className="font-bold py-4 px-6 text-right text-[10px]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInquiries.map((inc) => (
                    <tr key={inc.id} className="border-b border-gray-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                      <td className="py-4 px-6">
                        <p className="font-bold text-sm text-brand-navy-900 dark:text-white mb-0.5">{inc.name}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">{inc.org}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${inc.type === 'gov' ? 'bg-blue-100 text-blue-600' : inc.type === 'sub' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                          {inc.type}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{inc.status}</span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-[10px] font-black text-brand-blue-600 hover:underline uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Review</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Mini Dashboard */}
          <div className="space-y-6">
             <div className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Pipeline Health</h3>
                <div className="space-y-4">
                   <div className="space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase">
                         <span>Bid Conversion</span>
                         <span>42%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-brand-blue-600" style={{ width: '42%' }} />
                      </div>
                   </div>
                   <div className="space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase">
                         <span>Compliance Sync</span>
                         <span>98%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-emerald-500" style={{ width: '98%' }} />
                      </div>
                   </div>
                </div>
             </div>

             <div className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Quick Links</h3>
                <div className="grid grid-cols-1 gap-2">
                   <button className="text-left p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-xs font-bold text-brand-navy-900 dark:text-white border border-transparent hover:border-brand-blue-600 transition-all flex items-center gap-3">
                      <FileText className="w-4 h-4 text-brand-blue-600" /> New Solicitation Trace
                   </button>
                   <button className="text-left p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-xs font-bold text-brand-navy-900 dark:text-white border border-transparent hover:border-brand-blue-600 transition-all flex items-center gap-3">
                      <Users className="w-4 h-4 text-brand-blue-600" /> Verify Sub Documents
                   </button>
                   <button className="text-left p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-xs font-bold text-brand-navy-900 dark:text-white border border-transparent hover:border-brand-blue-600 transition-all flex items-center gap-3">
                      <TrendingUp className="w-4 h-4 text-brand-blue-600" /> Generate Weekly Report
                   </button>
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
