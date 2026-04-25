"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Building, Calendar, Info, ShieldCheck } from "lucide-react";

export interface Project {
  slug: string;
  title: string;
  client: string;
  location: string;
  date: string;
  value: string;
  summary: string;
  services: string[];
  image: string;
  scope: string;
  size: string;
  role: string;
  work: string;
}

export const projects: Project[] = [
  {
    slug: "caltrans-district-11-t-i",
    title: "Caltrans District 11 Tenant Improvement",
    client: "Caltrans",
    location: "San Diego, CA",
    date: "2025",
    value: "$150,000 - $250,000",
    summary: "Comprehensive interior tenant improvement for a district administrative hub. Included ADA compliance upgrades to breakrooms and secure access routing.",
    services: ["General Building Construction", "ADA Compliance", "Project Management"],
    image: "/images/projects/caltrans-district-11-ti.png",
    scope: "District Administrative TI",
    size: "15,000 sqft",
    role: "General Contractor",
    work: "ADA Upgrades & Interior Renovation"
  },
  {
    slug: "county-courthouse-facility-maintenance",
    title: "County Courthouse Facility Maintenance",
    client: "San Diego County Public Works",
    location: "San Diego County, CA",
    date: "Ongoing",
    value: "$500,000+ (Annual)",
    summary: "Multi-trade preventative and emergency maintenance encompassing routine HVAC servicing, high-traffic janitorial depth cleaning, and plumbing fault resolution.",
    services: ["Facility Maintenance", "Janitorial Services", "HVAC"],
    image: "/images/projects/courthouse-maintenance.png",
    scope: "Master Service Agreement",
    size: "1.2M sqft Portfolio",
    role: "Prime Contractor",
    work: "Multi-trade Maintenance & Compliance"
  },
  {
    slug: "dwr-material-logistics",
    title: "DWR Aqueduct Material Logistics",
    client: "Department of Water Resources",
    location: "Central Valley, CA",
    date: "2026",
    value: "$75,000 - $100,000",
    summary: "Provided specialized DVBE procurement and just-in-time logistics for critical concrete and heavy steel reinforcement materials along an active aqueduct repair site.",
    services: ["Material Supply & Logistics"],
    image: "/images/projects/dwr-aqueduct.png",
    scope: "Aqueduct Infrastructure Support",
    size: "Site-Wide Logistics",
    role: "DVBE Supplier",
    work: "Critical Material Fulfillment"
  },
  {
    slug: "homeless-shelters-ca",
    title: "Homeless Shelters State of California",
    client: "State of California",
    location: "California",
    date: "2024",
    value: "Contract Conf.",
    summary: "Large-scale modular homeless shelter deployment for state-wide housing initiatives.",
    services: ["Modular Manufacturing", "Installation", "Logistics"],
    image: "/images/projects/homeless-shelters.png",
    scope: "49 Units",
    size: "42,140 sqft",
    role: "Modular Manufacturer / Installation",
    work: "Factory Fabrication"
  },
  {
    slug: "interior-bathroom-ti",
    title: "Interior Bathroom TI",
    client: "City of Los Angeles",
    location: "Los Angeles, CA",
    date: "2024",
    value: "Varies",
    summary: "Extensive bathroom tenant improves for a large apartment complex project.",
    services: ["General Contracting", "Modular Sitework", "Interior Finishes"],
    image: "/images/projects/bathroom-ti.png",
    scope: "Apartment Complex",
    size: "250,000 sqft",
    role: "General Contractor",
    work: "Complete Manufacturer of Modulars and Sitework"
  },
  {
    slug: "modular-4-plex",
    title: "Modular 4 Plex",
    client: "Developer",
    location: "California",
    date: "Active",
    value: "Active",
    summary: "Construction of a modular residential 4-plex property including sitework.",
    services: ["Modular Fabrication", "Site Development", "General Contracting"],
    image: "/images/projects/modular-4-plex.png",
    scope: "4 Plex",
    size: "10,500 sqft",
    role: "Modular Manufacturer / General Contractor",
    work: "Modular Fabrication / Sitework"
  },
  {
    slug: "interior-ti",
    title: "Interior TI",
    client: "Resident",
    location: "California",
    date: "2024",
    value: "Varies",
    summary: "Precision interior finishing for a residential accessory dwelling project.",
    services: ["Interior Finishes", "Modular Design", "Installation"],
    image: "/images/projects/interior-ti.png",
    scope: "ADU Project Interior Finishes",
    size: "480 sqft",
    role: "Modular Manufacturer",
    work: "Fabrication and Installation"
  },
  {
    slug: "480-sqft-adu",
    title: "480 Square Foot ADU",
    client: "Resident",
    location: "California",
    date: "2024",
    value: "Completed",
    summary: "End-to-end modular construction and site installation of a standard ADU.",
    services: ["Modular Construction", "Site Contracting", "Utility Connectivity"],
    image: "/images/projects/adu-480.png",
    scope: "Complete Construction",
    size: "480 sqft",
    role: "Modular Manufacturer / Site Contractor",
    work: "Fabrication and Installation"
  },
  {
    slug: "affordable-housing-project",
    title: "Affordable Housing Project",
    client: "City of LA",
    location: "Los Angeles, CA",
    date: "2025",
    value: "Municipal Bids",
    summary: "Substantial 32-unit affordable housing development using modular solutions.",
    services: ["Modular Manufacturing", "Site Management", "Compliance"],
    image: "/images/projects/affordable-housing.png",
    scope: "32 Unit Housing Project",
    size: "150,000 sqft",
    role: "Modular Manufacturer / Site Contractor",
    work: "Fabrication / Installation"
  }
];


export default function ProjectsPortfolio() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Premium Hero Section - HARMONIZED & COMPACT */}
      <section className="relative px-6 pt-24 pb-12 md:pt-36 md:pb-20 overflow-hidden bg-brand-navy-900 border-b border-white/5">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue-600/10 blur-[100px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-brand-blue-600/5 blur-[80px]" />
          <div className="absolute bottom-0 left-0 right-0 h-96 opacity-10 bg-[radial-gradient(#1E6FD9_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-600/10 border border-brand-blue-600/20 mb-6 backdrop-blur-md"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-[10px] font-black tracking-[0.2em] text-amber-400 uppercase">Trusted Delivery History</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight mb-8 leading-[1.1]"
          >
            Past <br className="hidden md:block"/>
            <span className="italic text-brand-blue-600">Performance.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
          >
            A comprehensive portfolio of executed modular deployments, municipal infrastructure support, and commercial renovations across California.
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-white dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj, i) => (
              <motion.div 
                key={proj.slug} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col rounded-[2.5rem] overflow-hidden border border-gray-200 dark:border-white/10 bg-slate-50 dark:bg-brand-navy-900/50 group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-64 w-full relative overflow-hidden flex items-center justify-center bg-slate-200">
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-brand-navy-900/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-6 right-6 bg-brand-navy-900/60 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black text-white uppercase tracking-widest border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                     Data Verified
                  </div>
                </div>
                
                <div className="p-10 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold text-brand-navy-900 dark:text-white mb-8 uppercase tracking-tight leading-tight group-hover:text-brand-blue-600 transition-colors h-[2.2em] flex items-center">
                    {proj.title}
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4 mb-10">
                    {[
                      { label: "Scope", value: proj.scope },
                      { label: "Size", value: proj.size },
                      { label: "Role", value: proj.role },
                      { label: "Work", value: proj.work },
                      { label: "Client", value: proj.client }
                    ].map((spec) => (
                      <div key={spec.label} className="flex gap-4 text-[10px] uppercase tracking-widest">
                        <span className="font-black text-amber-600 w-16 shrink-0">{spec.label}:</span>
                        <span className="font-bold text-slate-600 dark:text-slate-300 line-clamp-1">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-4">
                    <Link href={`/projects/${proj.slug}`} className="flex items-center justify-center gap-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 text-[10px] font-black text-brand-navy-900 dark:text-white hover:border-brand-blue-600 transition-all uppercase tracking-widest">
                      Study <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link href="/contact" className="flex items-center justify-center gap-2 bg-brand-blue-600 text-white rounded-2xl px-6 py-4 text-[10px] font-black hover:bg-blue-700 transition-all uppercase tracking-widest">
                      Refer <Info className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Footer */}
      <section className="py-24 bg-slate-50 dark:bg-black/10 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <MapPin className="w-12 h-12 text-brand-blue-600 mx-auto mb-8" />
           <h4 className="text-3xl md:text-5xl font-serif text-brand-navy-900 dark:text-white mb-6 italic tracking-tight">Statewide Performance</h4>
           <p className="text-lg text-slate-500 mb-10 font-medium leading-relaxed">Looking for specific reference checks or capability verification for your local municipality or agency project?</p>
           <Link href="/contact" className="inline-flex items-center gap-3 bg-brand-navy-900 text-white px-12 py-6 rounded-full font-bold text-sm hover:bg-brand-blue-600 transition-all shadow-xl hover:-translate-y-1">
             Contact Procurement Desk <ArrowRight className="w-5 h-5" />
           </Link>
        </div>
      </section>

    </div>
  );
}
