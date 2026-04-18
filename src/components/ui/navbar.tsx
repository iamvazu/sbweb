"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Bid Management", href: "/bid-management" },
    { name: "Bid Services", href: "/government" },
    { name: "Portfolio", href: "/projects" },
  ];

  const services = [
    { name: "Construction Consulting", href: "/services/construction-consulting" },
    { name: "Project Management", href: "/services/project-management" },
    { name: "DVBE Subcontracting", href: "/services/subcontracting-services" },
    { name: "Facility Maintenance", href: "/services/facility-maintenance" },
    { name: "Janitorial Services", href: "/services/janitorial-services" },
  ];

  const companyLinks = [
    { name: "About", href: "/about" },
    { name: "Partners", href: "/partners" },
    { name: "Insights", href: "/insights" },
  ];

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      <motion.header
        className={cn(
          "pointer-events-auto w-full max-w-6xl transition-all duration-300 backdrop-blur-xl border",
          mobileMenuOpen ? "rounded-3xl bg-white/95 dark:bg-brand-navy-900/95 border-gray-200 dark:border-white/10 shadow-2xl" : "rounded-full",
          !mobileMenuOpen && scrolled 
            ? "bg-white/90 dark:bg-brand-navy-900/90 shadow-xl border-gray-200 dark:border-white/10" 
            : !mobileMenuOpen && "bg-white/70 dark:bg-brand-navy-900/50 shadow-lg border-white/40 dark:border-white/20"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="px-6 sm:px-8">
          <div className="flex justify-between items-center h-16 md:h-18">
            <Link href="/" className="flex flex-col items-start gap-0.5 group">
              <span className="text-xl md:text-2xl font-black tracking-tight text-brand-navy-900 dark:text-white leading-none">
                STRONGER<span className="text-brand-blue-600 transition-colors group-hover:text-blue-500">built</span>
              </span>
              <span className="text-[9px] md:text-[10px] font-semibold tracking-widest text-brand-steel-800 dark:text-gray-400 uppercase leading-none">
                LLC
              </span>
            </Link>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex flex-1 justify-center items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[11px] font-black tracking-widest text-brand-navy-900 dark:text-white hover:text-brand-blue-600 dark:hover:text-brand-blue-600 transition-colors duration-200 px-3 py-2 rounded-full uppercase italic"
                >
                  {link.name}
                </Link>
              ))}

              {/* Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown("services")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <DropdownMenuTrigger className="flex items-center gap-1 text-[11px] font-black tracking-widest text-brand-navy-900 dark:text-white hover:text-brand-blue-600 dark:hover:text-brand-blue-600 transition-colors px-3 py-2 rounded-full uppercase italic outline-none">
                  Services <ChevronDown className="w-3 h-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  isOpen={activeDropdown === "services"} 
                  className="bg-white dark:bg-brand-navy-900 border-gray-200 dark:border-white/10 rounded-2xl p-2 shadow-2xl"
                >
                  {services.map((item) => (
                    <DropdownMenuItem key={item.name}>
                      <Link href={item.href} className="flex px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-brand-blue-600 transition-colors">
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </div>

              {/* Company Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown("company")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <DropdownMenuTrigger className="flex items-center gap-1 text-[11px] font-black tracking-widest text-brand-navy-900 dark:text-white hover:text-brand-blue-600 dark:hover:text-brand-blue-600 transition-colors px-3 py-2 rounded-full uppercase italic outline-none">
                  Company <ChevronDown className="w-3 h-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  isOpen={activeDropdown === "company"}
                  className="bg-white dark:bg-brand-navy-900 border-gray-200 dark:border-white/10 rounded-2xl p-2 shadow-2xl"
                >
                  {companyLinks.map((item) => (
                    <DropdownMenuItem key={item.name}>
                      <Link href={item.href} className="flex px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-brand-blue-600 transition-colors">
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </div>
            </nav>

            <div className="hidden md:flex items-center gap-4 ml-4">
              <a 
                href="tel:+18317600806" 
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-brand-navy-900 dark:text-white hover:bg-brand-blue-600 hover:text-white transition-all shadow-sm"
                title="Call Us"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a 
                href="mailto:info@strongerbuilt.us" 
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-brand-navy-900 dark:text-white hover:bg-brand-blue-600 hover:text-white transition-all shadow-sm"
                title="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full bg-black/5 dark:bg-white/10 text-brand-navy-900 dark:text-white hover:bg-black/10 transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 dark:border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-base font-bold text-brand-navy-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 px-2">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center bg-brand-navy-900 dark:bg-white text-white dark:text-brand-navy-900 px-6 py-4 rounded-2xl font-black tracking-wide shadow-md"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </motion.header>
    </div>
  );
}
