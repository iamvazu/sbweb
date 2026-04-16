"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Building, Calendar, Info } from "lucide-react";

export interface Project {
  slug: string;
  title: string;
  client: string;
  location: string;
  date: string;
  value: string;
  summary: string;
  services: string[];
  imageStyle: string;
  // Tech Specs
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
    imageStyle: "bg-gradient-to-br from-brand-navy-900 to-slate-800",
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
    imageStyle: "bg-gradient-to-br from-brand-blue-600 to-blue-900",
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
    imageStyle: "bg-gradient-to-br from-slate-700 to-slate-900",
    scope: "Aqueduct Infrastructure Support",
    size: "Site-Wide Logistics",
    role: "DVBE Supplier",
    work: "Critical Material Fulfillment"
  },
  // New Projects from Screenshots
  {
    slug: "homeless-shelters-ca",
    title: "Homeless Shelters State of California",
    client: "State of California",
    location: "California",
    date: "2024",
    value: "Contract Conf.",
    summary: "Large-scale modular homeless shelter deployment for state-wide housing initiatives.",
    services: ["Modular Manufacturing", "Installation", "Logistics"],
    imageStyle: "bg-gradient-to-br from-slate-800 to-brand-navy-900",
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
    imageStyle: "bg-gradient-to-br from-brand-blue-600/20 to-brand-navy-900",
    scope: "Apartment Complex",
    size: "250,000 sqft",
    role: "General Contractor",
    work: "Complete Manufacturer of Modulars and Sitework"
  },
  {
    slug: "modular-4-plex",
    title: "Modular 4 Plex Under Construction",
    client: "Developer",
    location: "California",
    date: "Active",
    value: "Active",
    summary: "Construction of a modular residential 4-plex property including sitework.",
    services: ["Modular Fabrication", "Site Development", "General Contracting"],
    imageStyle: "bg-gradient-to-br from-slate-600 to-slate-800",
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
    imageStyle: "bg-gradient-to-br from-slate-700 to-brand-blue-600/10",
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
    imageStyle: "bg-gradient-to-br from-brand-navy-900 to-blue-900/30",
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
    imageStyle: "bg-gradient-to-br from-brand-blue-600 to-slate-900",
    scope: "32 Unit Housing Project",
    size: "150,000 sqft",
    role: "Modular Manufacturer / Site Contractor",
    work: "Fabrication / Installation"
  }
];

export default function ProjectsPortfolio() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24 bg-white dark:bg-black/20">
      <div className="max-w-7xl mx-auto px-4 w-full">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-brand-navy-900 dark:text-white tracking-tight mb-6 uppercase">
            Past <span className="text-brand-blue-600">Performance</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
            A comprehensive portfolio of executed modular deployments, municipal infrastructure support, and commercial renovations across California.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, i) => (
            <motion.div 
              key={proj.slug} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 bg-background-light dark:bg-brand-navy-900 group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Placeholder */}
              <div className={`h-56 w-full ${proj.imageStyle} relative overflow-hidden flex items-center justify-center`}>
                <Building className="w-12 h-12 text-white/20" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-4 right-4 bg-brand-navy-900/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                   Project Data Verified
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-black text-brand-navy-900 dark:text-white mb-6 uppercase tracking-tight leading-none h-[2em] flex items-center">
                  {proj.title}
                </h3>
                
                {/* Tech Specs Grid */}
                <div className="grid grid-cols-1 gap-4 mb-8">
                   {[
                      { label: "Scope", value: proj.scope },
                      { label: "Size", value: proj.size },
                      { label: "Role", value: proj.role },
                      { label: "Work", value: proj.work },
                      { label: "Client", value: proj.client }
                   ].map((spec) => (
                      <div key={spec.label} className="flex gap-2 text-xs uppercase tracking-wider">
                         <span className="font-black text-brand-blue-600 w-16 shrink-0">{spec.label}:</span>
                         <span className="font-bold text-slate-600 dark:text-slate-200 line-clamp-1">{spec.value}</span>
                      </div>
                   ))}
                </div>

                <div className="mt-auto grid grid-cols-2 gap-4">
                  <Link href={`/projects/${proj.slug}`} className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-white/5 border border-transparent rounded-xl px-4 py-3 text-[10px] font-black text-brand-navy-900 dark:text-white hover:border-brand-blue-600 transition-all uppercase tracking-widest">
                    Study <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link href="/contact" className="flex items-center justify-center gap-2 bg-brand-blue-600 text-white rounded-xl px-4 py-3 text-[10px] font-black hover:bg-blue-500 transition-all uppercase tracking-widest">
                    Refer <Info className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Future Pipeline Callout */}
        <div className="mt-24 bg-brand-navy-900/5 dark:bg-white/5 rounded-[3rem] p-12 text-center border border-gray-100 dark:border-white/5">
           <MapPin className="w-10 h-10 text-brand-blue-600 mx-auto mb-6" />
           <p className="text-brand-navy-900 dark:text-white text-3xl font-black mb-4 uppercase italic">Statewide <span className="text-brand-blue-600">Performance</span></p>
           <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-2xl mx-auto font-medium">Looking for specific reference checks or capability verification for your local municipality or agency project?</p>
           <Link href="/contact" className="inline-flex items-center gap-2 bg-brand-navy-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform">
             Contact Procurement Desk
           </Link>
        </div>

      </div>
    </div>
  );
}
