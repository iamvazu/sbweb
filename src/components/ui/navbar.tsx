"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, LayoutDashboard, LogIn, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

// Custom Premium Dropdown Component
function NavDropdown({ 
  title, 
  href, 
  items, 
  scrolled 
}: { 
  title: string; 
  href: string; 
  items: { name: string; href: string }[];
  scrolled: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        href={href}
        className={cn(
          "flex items-center gap-1 text-[13px] font-bold tracking-tight px-4 py-2 rounded-full transition-all outline-none",
          !scrolled ? "text-white/80 hover:text-white" : "text-slate-600 dark:text-slate-300 hover:text-brand-blue-600",
          isOpen && (scrolled ? "bg-slate-50 dark:bg-white/5 text-brand-blue-600" : "bg-white/10 text-white")
        )}
      >
        {title} <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300", isOpen && "rotate-180")} />
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 mt-2 w-64 bg-white/95 dark:bg-brand-navy-900/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl p-2 z-[60]"
          >
            <div className="flex flex-col gap-1">
              {items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="flex px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-blue-600 dark:hover:text-brand-blue-600 hover:bg-slate-50 dark:hover:bg-white/5 transition-all rounded-xl"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [session, setSession] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

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

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Partners", href: "/partners" },
    { name: "Insights", href: "/insights" },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b",
        scrolled 
          ? "bg-white/95 dark:bg-brand-navy-900/95 backdrop-blur-md py-3 border-gray-200 dark:border-white/10 shadow-sm" 
          : "bg-transparent py-5 border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start gap-0.5 group">
            <span className={cn(
              "text-xl md:text-2xl font-black tracking-tight leading-none transition-colors",
              !scrolled && "text-white",
              scrolled && "text-brand-navy-900 dark:text-white"
            )}>
              STRONGER<span className="text-brand-blue-600 transition-colors group-hover:text-blue-500">built</span>
            </span>
            <span className={cn(
              "text-[9px] md:text-[10px] font-semibold tracking-widest uppercase leading-none transition-colors",
              !scrolled && "text-slate-300",
              scrolled && "text-slate-500 dark:text-slate-400"
            )}>
              LLC
            </span>
          </Link>

          {/* Center Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[13px] font-bold tracking-tight px-4 py-2 rounded-full transition-all",
                  !scrolled ? "text-white/80 hover:text-white hover:bg-white/10" : "text-slate-600 dark:text-slate-300 hover:text-brand-blue-600 hover:bg-slate-50 dark:hover:bg-white/5"
                )}
              >
                {link.name}
              </Link>
            ))}

            <NavDropdown title="Services" href="/services" items={services} scrolled={scrolled} />
            <NavDropdown title="Company" href="/about" items={company} scrolled={scrolled} />
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!session ? (
              <>
                <Link
                  href="/login"
                  className={cn(
                    "text-[13px] font-bold px-5 py-2 transition-all",
                    !scrolled ? "text-white hover:text-white/80" : "text-slate-600 dark:text-slate-300 hover:text-brand-navy-900 dark:hover:text-white"
                  )}
                >
                  Portal Login
                </Link>
                <Link
                  href="/login?tab=signup"
                  className="bg-brand-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-[13px] font-bold transition-all shadow-md shadow-blue-500/10 hover:shadow-blue-500/20"
                >
                  Sign Up Free
                </Link>
              </>
            ) : (
              <Link
                href="/portal/vendor"
                className="bg-brand-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-[13px] font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            )}
            
            {/* Mobile Toggler */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "lg:hidden p-2 rounded-xl transition-colors ml-2",
                !scrolled ? "bg-white/10 text-white" : "bg-slate-100 dark:bg-white/5 text-brand-navy-900 dark:text-white"
              )}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full inset-x-0 bg-white dark:bg-brand-navy-900 border-b border-gray-200 dark:border-white/10 shadow-2xl lg:hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="px-6 py-8 space-y-6">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-lg font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl"
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Mobile Services */}
                <div className="py-2">
                   <p className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Services</p>
                   {services.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-brand-blue-600"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Mobile Company */}
                <div className="py-2">
                   <p className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Company</p>
                   {company.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-brand-blue-600"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100 dark:border-white/10 space-y-3">
                {!session ? (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-center py-4 text-slate-600 dark:text-slate-400 font-bold"
                    >
                      Portal Login
                    </Link>
                    <Link
                      href="/login?tab=signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-center bg-brand-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/20"
                    >
                      Sign Up Free
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/portal/vendor"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center bg-brand-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
