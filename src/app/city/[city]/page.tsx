"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ShieldCheck, MapPin, Download, ArrowRight, Building2, HardHat } from "lucide-react";
import { use } from "react";

// List of major CA cities for SEO
const MAJOR_CITIES: Record<string, { name: string, county: string }> = {
  "los-angeles": { name: "Los Angeles", county: "Los Angeles" },
  "san-diego": { name: "San Diego", county: "San Diego" },
  "san-jose": { name: "San Jose", county: "Santa Clara" },
  "san-francisco": { name: "San Francisco", county: "San Francisco" },
  "fresno": { name: "Fresno", county: "Fresno" },
  "sacramento": { name: "Sacramento", county: "Sacramento" },
  "long-beach": { name: "Long Beach", county: "Los Angeles" },
  "oakland": { name: "Oakland", county: "Alameda" },
  "bakersfield": { name: "Bakersfield", county: "Kern" },
  "anaheim": { name: "Anaheim", county: "Orange" },
};

export default function CityPseoPage({ params }: { params: Promise<{ city: string }> }) {
  const resolvedParams = use(params);
  const city = MAJOR_CITIES[resolvedParams.city];

  if (!city) return notFound();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative px-6 pt-24 pb-12 md:pt-36 md:pb-20 overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50/20 to-white dark:from-brand-navy-950 dark:via-brand-navy-900 dark:to-brand-navy-950 border-b border-slate-200/50 dark:border-white/5">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue-600/10 dark:bg-brand-blue-600/15 blur-[100px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-brand-blue-600/5 blur-[80px]" />
          <div className="absolute bottom-0 left-0 right-0 h-96 opacity-[0.03] dark:opacity-10 bg-[radial-gradient(#1E6FD9_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <Link href="/service-areas" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white mb-8 transition-colors font-bold tracking-wide uppercase text-[10px]">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Service Areas
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-brand-blue-50/80 dark:bg-brand-blue-600/10 text-brand-blue-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-brand-blue-100 dark:border-brand-blue-600/20 mb-6 w-fit backdrop-blur-md"
          >
            <ShieldCheck className="w-4 h-4 text-brand-blue-600 dark:text-brand-blue-400" /> City Verified: {city.name}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight uppercase tracking-tight"
          >
            Public Works Contractor <br className="hidden md:block" />
            <span className="text-brand-blue-600 dark:text-brand-blue-400">in {city.name}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-3xl"
          >
            Stronger Built Group LLC is a licensed, DVBE-certified General Contractor serving the {city.name} metropolitan area and throughout {city.county} County. We specialize in high-stakes municipal projects and agency compliance.
          </motion.p>
        </div>
      </section>

      <section className="pb-24 pt-12 bg-white dark:bg-black/20">
        <div className="max-w-5xl mx-auto px-4 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-16 shadow-2xl relative overflow-hidden mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
               <div className="space-y-6">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Regional Expertise</h3>
                  <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-3xl border border-gray-100 dark:border-white/5">
                     <div className="flex items-center gap-4 mb-4">
                        <MapPin className="w-6 h-6 text-brand-blue-600" />
                        <span className="font-bold text-brand-navy-900 dark:text-white text-lg">{city.name} Hub</span>
                     </div>
                     <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                        Our localized project management teams understand the specific procurement codes and labor requirements for {city.name} city agencies and {city.county} county departments.
                     </p>
                  </div>
                  <div className="bg-brand-navy-900 text-white p-8 rounded-3xl shadow-xl border border-white/5">
                     <h4 className="font-bold mb-3 flex items-center gap-3 text-sm">
                        <Building2 className="w-5 h-5 text-brand-blue-600" /> Licensed & Certified
                     </h4>
                     <p className="text-xs text-slate-400 leading-relaxed font-medium">
                        CSLB #1057434. Certified DVBE/SDVOSB. DIR Registered. We ensure full compliance for all {city.name} public works projects.
                     </p>
                  </div>
               </div>

               <div className="flex flex-col justify-center">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Services for {city.name} Agencies</h3>
                  <ul className="space-y-5 mb-10">
                     {[
                        "General Building Construction",
                        "Facility Maintenance & Repair",
                        "DVBE/SDVOSB Compliance Support",
                        "Project & Construction Management",
                        "Modular Solution Deployment"
                     ].map((item, i) => (
                        <li key={i} className="flex items-center gap-4 text-brand-navy-900 dark:text-slate-200 font-bold text-sm">
                           <div className="w-2.5 h-2.5 rounded-full bg-brand-blue-600 shadow-[0_0_10px_rgba(30,111,217,0.5)]" />
                           {item}
                        </li>
                     ))}
                  </ul>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/government/capabilities-statement" className="flex items-center gap-2 bg-brand-navy-900 text-white px-8 py-4 rounded-2xl font-bold text-xs shadow-xl hover:bg-slate-800 transition-all uppercase tracking-widest">
                      <Download className="w-4 h-4" /> Capabilities Statement
                    </Link>
                    <Link href="/contact" className="flex items-center gap-2 bg-brand-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-xs shadow-xl shadow-brand-blue-600/20 hover:bg-blue-500 transition-all uppercase tracking-widest">
                      Contact {city.name} Desk <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Local Social Proof Section */}
          <section className="py-16 border-t border-gray-100 dark:border-white/5">
             <h2 className="text-3xl font-serif text-brand-navy-900 dark:text-white mb-12 italic">Localized Performance in {city.name}</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                   { title: "Municipal TI", desc: "Expert interior renovations for city-owned facilities." },
                   { title: "DVBE Partnerships", desc: "Helping {city.name} prime contractors hit diversity goals." },
                   { title: "Emergency Repair", desc: "Rapid response maintenance for {city.county} County assets." }
                ].map((item, i) => (
                   <div key={i} className="p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5 hover:shadow-xl transition-all group">
                      <HardHat className="w-8 h-8 text-brand-blue-600 mb-6 group-hover:scale-110 transition-transform" />
                      <h4 className="font-bold text-brand-navy-900 dark:text-white mb-3 uppercase text-[10px] tracking-widest">{item.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{item.desc.replace("{city}", city.name).replace("{county}", city.county)}</p>
                   </div>
                ))}
             </div>
          </section>
        </div>
      </section>
    </div>

  );
}
