"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Building, Calendar, MapPin, DollarSign, CheckCircle2 } from "lucide-react";
import { use } from "react";
import { projects } from "../page";

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const data = projects.find(p => p.slug === resolvedParams.slug);

  if (!data) return notFound();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative px-6 pt-24 pb-12 md:pt-36 md:pb-20 overflow-hidden bg-brand-navy-900 border-b border-white/5">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue-600/10 blur-[100px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-brand-blue-600/5 blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <Link href="/projects" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-10 transition-colors font-bold tracking-wide uppercase text-[10px]">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Projects
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-3xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-brand-blue-600/10 text-brand-blue-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-brand-blue-600/20 mb-6 w-fit backdrop-blur-md"
              >
                <CheckCircle2 className="w-4 h-4" /> Project Performance Record
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-black text-white leading-[1.1] uppercase tracking-tight"
              >
                {data.title.split(' ')[0]} <br className="hidden md:block" />
                <span className="text-brand-blue-600">{data.title.split(' ').slice(1).join(' ')}</span>
              </motion.h1>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 min-w-[280px]"
            >
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Location</p>
              <div className="flex items-center gap-3 text-white font-bold">
                <MapPin className="w-5 h-5 text-brand-blue-600" />
                <span>{data.location}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-24 pt-12 bg-white dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="w-full h-64 md:h-[500px] rounded-[3rem] mb-16 shadow-2xl overflow-hidden relative -mt-24 z-20 border-4 border-white dark:border-brand-navy-900">
            <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 hidden md:block">
               <p className="text-white/60 text-xs font-black uppercase tracking-[0.3em] mb-2">Project Type</p>
               <p className="text-white text-2xl font-bold uppercase tracking-tight">{data.scope}</p>
            </div>
          </div>



        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-black text-brand-navy-900 dark:text-white mb-4">Project Overview</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {data.summary}
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
                This project represents a core competency of Stronger Built Group's deployment matrix. All scopes were delivered exactly to compliance standards mandated by the governing public agency, utilizing our specialized DVBE-driven approach to minimize delay and maximize structural integrity.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-black text-brand-navy-900 dark:text-white mb-4">Services Delivered</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.services.map((srv, i) => (
                  <li key={i} className="flex items-center gap-3 text-brand-navy-900 dark:text-slate-200 font-medium p-4 bg-background-light dark:bg-brand-navy-900 rounded-xl border border-gray-200 dark:border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-brand-blue-600 shrink-0" />
                    <span>{srv}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-background-light dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-3xl p-6 sticky top-28 shadow-xl shadow-brand-blue-600/5">
              <h3 className="text-xs font-black tracking-widest text-slate-400 uppercase mb-6">Contract Details</h3>
              
              <ul className="space-y-6">
                <li>
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-1">
                    <Building className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Client</span>
                  </div>
                  <p className="font-semibold text-brand-navy-900 dark:text-white">{data.client}</p>
                </li>
                <li>
                  <div className="flex items-center gap-2 text-brand-blue-600 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest">Scope</span>
                  </div>
                  <p className="font-bold text-brand-navy-900 dark:text-white text-sm">{data.scope}</p>
                </li>
                <li>
                  <div className="flex items-center gap-2 text-brand-blue-600 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest">Size</span>
                  </div>
                  <p className="font-bold text-brand-navy-900 dark:text-white text-sm">{data.size}</p>
                </li>
                <li>
                  <div className="flex items-center gap-2 text-brand-blue-600 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest">Role</span>
                  </div>
                  <p className="font-bold text-brand-navy-900 dark:text-white text-sm">{data.role}</p>
                </li>
                <li>
                  <div className="flex items-center gap-2 text-brand-blue-600 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest">Work</span>
                  </div>
                  <p className="font-bold text-brand-navy-900 dark:text-white text-sm">{data.work}</p>
                </li>
                <li>
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-1">
                    <MapPin className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Location</span>
                  </div>
                  <p className="font-semibold text-brand-navy-900 dark:text-white">{data.location}</p>
                </li>
                <li>
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-1">
                    <Calendar className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Date</span>
                  </div>
                  <p className="font-semibold text-brand-navy-900 dark:text-white">{data.date}</p>
                </li>
                <li>
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-1">
                    <DollarSign className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Value</span>
                  </div>
                  <p className="font-semibold text-brand-navy-900 dark:text-white">{data.value}</p>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10">
                <Link href="/contact" className="flex items-center justify-center w-full bg-brand-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition-colors">
                  Request References
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
      </section>
    </div>
  );
}
