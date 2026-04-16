"use client";

import { motion } from "framer-motion";
import { 
  Briefcase, 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ExternalLink,
  Plus
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AVAILABLE_BIDS = [
  {
    id: "BID-2026-042",
    title: "San Diego County Administration Bldg - HVAC Patch",
    trade: "C-20 HVAC",
    dueDate: "April 30, 2026",
    status: "Open for Bidding",
    valueRange: "$10k - $25k"
  },
  {
    id: "BID-2026-039",
    title: "Caltrans District 11 - Exterior Painting",
    trade: "C-33 Painting",
    dueDate: "May 5, 2026",
    status: "In Review",
    valueRange: "$45k - $60k"
  }
];

const COMPLIANCE_DOCS = [
  { name: "W-9 Form", status: "Verified", date: "Jan 2026" },
  { name: "General Liability Insurance", status: "Expiring Soon", date: "May 2026" },
  { name: "Workers Comp", status: "Verified", date: "Jan 2026" }
];

export default function VendorPortal() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "vendor_partner")) {
      // Allow super_admin to view for demo purposes, else redirect
      if (user?.role !== "super_admin") {
         // router.push("/login");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black/90 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-brand-navy-900 dark:text-white uppercase tracking-tighter">
              Vendor <span className="text-brand-blue-600">Partner Portal</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Welcome back, <span className="text-brand-navy-900 dark:text-white">{user?.email}</span> • {user?.organization}
            </p>
          </div>
          <button 
            onClick={logout}
            className="px-4 py-2 text-sm font-bold bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
          >
            Logout session
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column: Bidding */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Available Bids */}
            <section className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black text-brand-navy-900 dark:text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-brand-blue-600" /> Available Bidding Opportunities
                </h2>
                <button className="text-xs font-bold text-brand-blue-600 hover:underline uppercase tracking-widest">View Archives</button>
              </div>
              
              <div className="space-y-4">
                {AVAILABLE_BIDS.map((bid) => (
                  <div key={bid.id} className="border border-gray-100 dark:border-white/5 rounded-2xl p-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-black bg-brand-blue-600/10 text-brand-blue-600 px-2 py-0.5 rounded uppercase">{bid.id}</span>
                          <span className="text-[10px] font-black bg-emerald-600/10 text-emerald-600 px-2 py-0.5 rounded uppercase">{bid.trade}</span>
                        </div>
                        <h3 className="font-bold text-brand-navy-900 dark:text-white group-hover:text-brand-blue-600 transition-colors">{bid.title}</h3>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Due: {bid.dueDate}</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300">Est. Value: {bid.valueRange}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="flex-1 md:flex-none bg-brand-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-brand-blue-600/20 transition-all">
                          Help on Bid
                        </button>
                        <button className="p-2 border border-gray-200 dark:border-white/10 rounded-lg hover:bg-white dark:hover:bg-white/10 transition-colors">
                          <ExternalLink className="w-4 h-4 text-slate-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Resources / FAQ for Bidding */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-brand-blue-600 rounded-3xl p-6 text-white">
                <h3 className="font-bold mb-2">Bid Assistance</h3>
                <p className="text-xs text-white/80 leading-relaxed mb-4">Need help understanding the prevailing wage requirements for a specific RFP? Our project managers are available to assist.</p>
                <button className="bg-white text-brand-blue-600 text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-widest shadow-lg">Request Consultation</button>
              </div>
              <div className="bg-brand-navy-900 rounded-3xl p-6 text-white border border-white/10">
                <h3 className="font-bold mb-2">Document Templates</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">Download blank COIs, W-9s, and safety plan templates required for our standard master service agreements.</p>
                <button className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-widest transition-colors mb-2 w-full text-left flex items-center justify-between">Safety Plan Template <FileText className="w-3 h-3" /></button>
                <button className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-widest transition-colors w-full text-left flex items-center justify-between">COI Requirements <FileText className="w-3 h-3" /></button>
              </div>
            </div>

          </div>

          {/* Sidebar: Compliance & Profile */}
          <div className="space-y-8">
            
            {/* Compliance Status */}
            <section className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
              <h2 className="text-lg font-black text-brand-navy-900 dark:text-white mb-6 uppercase tracking-tight">Compliance Status</h2>
              <div className="space-y-4">
                {COMPLIANCE_DOCS.map((doc) => (
                  <div key={doc.name} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-white/5 last:border-0">
                    <div>
                      <p className="text-sm font-bold text-brand-navy-900 dark:text-white">{doc.name}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">Last Verified: {doc.date}</p>
                    </div>
                    {doc.status === "Verified" ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                    )}
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 bg-slate-50 dark:bg-white/5 border border-dashed border-gray-300 dark:border-white/20 rounded-xl py-3 text-xs font-black text-slate-500 hover:text-brand-blue-600 hover:border-brand-blue-600 transition-all flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" /> Upload New Document
              </button>
            </section>

            {/* Direct PM Contact */}
            <section className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
              <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Assigned PM</h2>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center font-bold text-brand-navy-900 dark:text-white">RK</div>
                <div>
                  <p className="text-sm font-bold text-brand-navy-900 dark:text-white">Roy K.</p>
                  <p className="text-xs text-slate-500">Director of Operations</p>
                </div>
              </div>
              <button className="w-full mt-6 bg-brand-blue-600/10 text-brand-blue-600 py-3 rounded-xl text-xs font-black hover:bg-brand-blue-600 hover:text-white transition-all">Message Operations</button>
            </section>

          </div>

        </div>

      </div>
    </div>
  );
}
