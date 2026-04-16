"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Building, Calendar } from "lucide-react";

export const projects = [
  {
    slug: "caltrans-district-11-t-i",
    title: "Caltrans District 11 Tenant Improvement",
    client: "Caltrans (California Department of Transportation)",
    location: "San Diego, CA",
    date: "2025",
    value: "$150,000 - $250,000",
    summary: "Comprehensive interior tenant improvement for a district administrative hub. Included ADA compliance upgrades to breakrooms and secure access routing.",
    services: ["General Building Construction", "ADA Compliance Modifications", "Project Management"],
    imageStyle: "bg-gradient-to-br from-brand-navy-900 to-slate-800"
  },
  {
    slug: "county-courthouse-facility-maintenance",
    title: "County Courthouse Facility Maintenance",
    client: "San Diego County Public Works",
    location: "San Diego County, CA",
    date: "Ongoing (Master Service Agreement)",
    value: "$500,000+ (Annual)",
    summary: "Multi-trade preventative and emergency maintenance encompassing routine HVAC servicing, high-traffic janitorial depth cleaning, and plumbing fault resolution.",
    services: ["Facility Maintenance", "Janitorial Services", "HVAC Maintenance"],
    imageStyle: "bg-gradient-to-br from-brand-blue-600 to-blue-900"
  },
  {
    slug: "dwr-material-logistics",
    title: "DWR Aqueduct Material Logistics",
    client: "Department of Water Resources (DWR)",
    location: "Central Valley, CA",
    date: "2026",
    value: "$75,000 - $100,000",
    summary: "Provided specialized DVBE procurement and just-in-time logistics for critical concrete and heavy steel reinforcement materials along an active aqueduct repair site.",
    services: ["Material Supply & Logistics"],
    imageStyle: "bg-gradient-to-br from-slate-700 to-slate-900"
  }
];

export default function ProjectsPortfolio() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24 bg-white dark:bg-black/20">
      <div className="max-w-7xl mx-auto px-4 w-full">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-brand-navy-900 dark:text-white tracking-tight mb-6">
            Past Performance & <span className="text-brand-blue-600">Projects</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            A transparent look at our executed contracts, ongoing master service agreements, and capabilities across California public works and commercial infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, i) => (
            <motion.div 
              key={proj.slug} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 bg-background-light dark:bg-brand-navy-900 group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Placeholder */}
              <div className={`h-48 w-full ${proj.imageStyle} relative overflow-hidden flex items-center justify-center`}>
                <Building className="w-12 h-12 text-white/20" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-blue-600 mb-3">
                  <MapPin className="w-3 h-3" /> {proj.location}
                </div>
                
                <h3 className="text-xl font-bold text-brand-navy-900 dark:text-white mb-4 line-clamp-2">
                  {proj.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                  {proj.summary}
                </p>
                
                <div className="space-y-2 mb-8">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Building className="w-4 h-4 shrink-0" /> <span className="truncate">{proj.client}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Calendar className="w-4 h-4 shrink-0" /> <span>{proj.date}</span>
                  </div>
                </div>

                <Link href={`/projects/${proj.slug}`} className="mt-auto inline-flex items-center justify-between w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-brand-navy-900 dark:text-white hover:border-brand-blue-600 dark:hover:border-brand-blue-600 hover:text-brand-blue-600 transition-colors">
                  View Case Study <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Future Pipeline Callout */}
        <div className="mt-20 border-t border-gray-200 dark:border-white/10 pt-12 text-center">
          <p className="text-slate-500 dark:text-slate-400 mb-4 font-medium">Looking for specific reference checks or capability verification?</p>
          <Link href="/contact" className="inline-flex items-center gap-2 text-brand-blue-600 hover:text-blue-700 font-bold uppercase tracking-widest text-sm">
            Contact our Procurement Desk <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
