"use client";

import { motion } from "framer-motion";
import { 
  Activity, 
  ClipboardList, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText,
  User,
  ShieldCheck
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ACTIVE_PROJECTS = [
  {
    id: "PROJ-772",
    name: "San Diego County Administration Bldg - HVAC Patch",
    status: "In Progress",
    completion: 65,
    location: "1600 Pacific Hwy, San Diego",
    lastInspection: "April 14, 2026",
    nextInspection: "April 20, 2026"
  }
];

const INSPECTION_LOGS = [
  { 
    id: "INS-901", 
    date: "April 14, 2026", 
    inspector: "Sarah J. (Agency)", 
    outcome: "Passed", 
    notes: "Phase 2 ductwork installation meets specs. Pressure test verified.",
    project: "PROJ-772"
  },
  { 
    id: "INS-894", 
    date: "April 08, 2026", 
    inspector: "Michael R. (Stronger Built)", 
    outcome: "Self-Correction", 
    notes: "Found minor sealing gap in south riser. Remedied immediately.",
    project: "PROJ-772"
  }
];

export default function GovPortal() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "gov")) {
       // Allow super_admin for demo
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
              Client & <span className="text-brand-blue-600">Agency Portal</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Verified Agency Access: <span className="text-brand-navy-900 dark:text-white">{user?.email}</span> • {user?.organization}
            </p>
          </div>
          <button 
            onClick={logout}
            className="px-4 py-2 text-sm font-bold bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column: Active Projects */}
          <div className="lg:col-span-2 space-y-8">
            
            <section className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-black text-brand-navy-900 dark:text-white mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-brand-blue-600" /> Active Contract Tracking
              </h2>
              
              <div className="space-y-6">
                {ACTIVE_PROJECTS.map((proj) => (
                  <div key={proj.id} className="border border-gray-100 dark:border-white/5 rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black bg-brand-navy-900 text-white dark:bg-white/10 dark:text-brand-blue-600 px-2 py-0.5 rounded uppercase">{proj.id}</span>
                        <h3 className="text-lg font-bold text-brand-navy-900 dark:text-white">{proj.name}</h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> {proj.location}</p>
                      </div>
                      <span className="text-xs font-bold text-brand-blue-600 bg-brand-blue-600/10 px-3 py-1 rounded-full">{proj.status}</span>
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                        <span>Project Completion</span>
                        <span>{proj.completion}%</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${proj.completion}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-brand-blue-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50 dark:border-white/5">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Inspection</p>
                        <p className="text-sm font-bold text-brand-navy-900 dark:text-white">{proj.lastInspection}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Next Inspection</p>
                        <p className="text-sm font-bold text-brand-navy-900 dark:text-white flex items-center gap-2"><Clock className="w-4 h-4 text-brand-blue-600" /> {proj.nextInspection}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Inspection Logs */}
            <section className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-black text-brand-navy-900 dark:text-white mb-6 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-brand-blue-600" /> Compliance & Inspection Logs
              </h2>
              
              <div className="space-y-4">
                {INSPECTION_LOGS.map((log) => (
                  <div key={log.id} className="flex gap-6 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${log.outcome === "Passed" ? "bg-success/10 text-success" : "bg-amber-100 text-amber-600"}`}>
                        {log.outcome === "Passed" ? <CheckCircle2 className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
                      </div>
                      <div className="flex-grow w-px bg-slate-200 dark:bg-white/10 my-2" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-brand-navy-900 dark:text-white">{log.outcome} - {log.id}</h4>
                        <span className="text-xs text-slate-500 font-medium">{log.date}</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">{log.notes}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inspected By: {log.inspector}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar: Documents & Contact */}
          <div className="space-y-8">
            
            {/* Project Documents */}
            <section className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
              <h2 className="text-lg font-black text-brand-navy-900 dark:text-white mb-6 uppercase tracking-tight">Active Documents</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-brand-blue-600 transition-colors">
                  <span className="flex items-center gap-3 text-sm font-bold text-brand-navy-900 dark:text-white"><FileText className="w-4 h-4 text-brand-blue-600" /> Executed Contract</span>
                  <Activity className="w-3 h-3 text-slate-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-brand-blue-600 transition-colors">
                  <span className="flex items-center gap-3 text-sm font-bold text-brand-navy-900 dark:text-white"><FileText className="w-4 h-4 text-brand-blue-600" /> Certified Payroll Logs</span>
                  <Activity className="w-3 h-3 text-slate-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-brand-blue-600 transition-colors">
                  <span className="flex items-center gap-3 text-sm font-bold text-brand-navy-900 dark:text-white"><FileText className="w-4 h-4 text-brand-blue-600" /> Site Safety Plan (DHA)</span>
                  <Activity className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </section>

            {/* Direct Project Lead */}
            <section className="bg-brand-navy-900 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue-600/20 rounded-full blur-[40px]" />
              <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 relative z-10">Project Lead</h2>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-xl">RK</div>
                <div>
                  <p className="font-bold">Roy K.</p>
                  <p className="text-xs text-slate-400 italic">Direct Contact for Operations</p>
                </div>
              </div>
              <div className="space-y-4 relative z-10">
                <button className="w-full bg-brand-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition-colors">Contact via Portal</button>
                <button className="w-full bg-white/5 hover:bg-white/10 py-3 rounded-xl font-bold border border-white/10 transition-colors">Call Office Line</button>
              </div>
            </section>

            <div className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-sm text-center">
              <p className="text-xs text-slate-500 mb-2">Need to submit a change order or new RFP?</p>
              <button className="text-sm font-black text-brand-blue-600 hover:underline uppercase tracking-widest">Procurement Desk</button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
