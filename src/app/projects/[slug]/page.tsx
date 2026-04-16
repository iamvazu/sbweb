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
    <div className="min-h-screen pt-32 pb-24 bg-white dark:bg-black/20">
      <div className="max-w-4xl mx-auto px-4 w-full">
        
        <Link href="/projects" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-blue-600 mb-8 transition-colors font-bold tracking-wide uppercase text-xs">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
        
        <div className={`w-full h-64 md:h-96 ${data.imageStyle} rounded-[2.5rem] mb-12 shadow-2xl overflow-hidden relative`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-8 left-8 right-8">
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight drop-shadow-lg">
              {data.title}
            </h1>
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
    </div>
  );
}
