"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Bid Management", href: "/bid-management" },
    { name: "Bid Services", href: "/government" },
    { name: "Contract Wins", href: "/projects" },
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
                Group LLC
              </span>
            </Link>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex flex-1 justify-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-bold tracking-wide text-brand-navy-900 dark:text-white hover:text-brand-blue-600 dark:hover:text-brand-blue-600 transition-colors duration-200 px-3 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center ml-4">
              <Link
                href="/contact"
                className="bg-brand-navy-900 dark:bg-white hover:bg-brand-blue-600 dark:hover:bg-brand-blue-600 text-white dark:text-brand-navy-900 dark:hover:text-white px-6 py-2.5 rounded-full font-bold text-sm tracking-wide shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                Request a Quote
              </Link>
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
