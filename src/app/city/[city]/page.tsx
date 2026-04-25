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
    <div className="min-h-screen pt-32 pb-24 bg-background-light dark:bg-black/20">
      <div className="max-w-5xl mx-auto px-4 w-full">
        
        <Link href="/service-areas" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-blue-600 mb-8 transition-colors font-bold tracking-wide uppercase text-xs">
          <ArrowLeft className="w-4 h-4" /> Back to Service Areas
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-16 shadow-xl relative overflow-hidden mb-12"
        >
          {/* Decorative Badge */}
          <div className="absolute top-8 right-8 print:hidden">
             <div className="flex items-center gap-2 bg-brand-blue-600/10 text-brand-blue-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" /> City Verified
             </div>
          </div>

          <div className="max-w-3xl relative z-10">
            <h1 className="text-4xl md:text-6xl font-black text-brand-navy-900 dark:text-white mb-6 leading-tight">
              Public Works Contractor in <span className="text-brand-blue-600">{city.name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
              Stronger Built Group LLC is a licensed, DVBE-certified General Contractor serving the {city.name} metropolitan area and throughout {city.county} County. We specialize in high-stakes municipal projects and agency compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10 pt-10 border-t border-gray-100 dark:border-white/5">
             <div className="space-y-6">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Regional Expertise</h3>
                <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                   <div className="flex items-center gap-3 mb-4">
                      <MapPin className="w-5 h-5 text-brand-blue-600" />
                      <span className="font-bold text-brand-navy-900 dark:text-white">{city.name} Hub</span>
                   </div>
                   <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Our localized project management teams understand the specific procurement codes and labor requirements for {city.name} city agencies and {city.county} county departments.
                   </p>
                </div>
                <div className="bg-brand-navy-900 text-white p-6 rounded-2xl shadow-lg">
                   <h4 className="font-bold mb-2 flex items-center gap-2 text-sm">
                      <Building2 className="w-4 h-4 text-brand-blue-600" /> Licensed & Certified
                   </h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      CSLB #1057434. Certified DVBE/SDVOSB. DIR Registered. We ensure full compliance for all {city.name} public works projects.
                   </p>
                </div>
             </div>

             <div className="flex flex-col justify-center">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Services for {city.name} Agencies</h3>
                <ul className="space-y-4 mb-8">
                   {[
                      "General Building Construction",
                      "Facility Maintenance & Repair",
                      "DVBE/SDVOSB Compliance Support",
                      "Project & Construction Management",
                      "Modular Solution Deployment"
                   ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-brand-navy-900 dark:text-slate-200 font-bold">
                         <div className="w-2 h-2 rounded-full bg-brand-blue-600" />
                         {item}
                      </li>
                   ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link href="/government/capabilities-statement" className="flex items-center gap-2 bg-brand-navy-900 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl hover:bg-slate-800 transition-all">
                    <Download className="w-4 h-4" /> Capabilities Statement
                  </Link>
                  <Link href="/contact" className="flex items-center gap-2 bg-brand-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-brand-blue-600/20 hover:bg-blue-500 transition-all">
                    Contact {city.name} Desk <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Local Social Proof Section */}
        <section className="py-12 border-t border-gray-100 dark:border-white/5">
           <h2 className="text-2xl font-serif text-brand-navy-900 dark:text-white mb-8 italic">Localized Performance in {city.name}</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                 { title: "Municipal TI", desc: "Expert interior renovations for city-owned facilities." },
                 { title: "DVBE Partnerships", desc: "Helping {city.name} prime contractors hit diversity goals." },
                 { title: "Emergency Repair", desc: "Rapid response maintenance for {city.county} County assets." }
              ].map((item, i) => (
                 <div key={i} className="p-6 bg-slate-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                    <HardHat className="w-6 h-6 text-brand-blue-600 mb-4" />
                    <h4 className="font-bold text-brand-navy-900 dark:text-white mb-2 uppercase text-xs tracking-widest">{item.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc.replace("{city}", city.name).replace("{county}", city.county)}</p>
                 </div>
              ))}
           </div>
        </section>

      </div>
    </div>
  );
}
