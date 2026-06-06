"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const supabase = createClient();
  const pathname = usePathname();

  const isDarkBgPage = pathname === "/login";

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
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Results", href: "/projects" },
    { name: "Industries", href: "/#industries" },
    { name: "About", href: "/about" },
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
              isDarkBgPage && !scrolled ? "text-white" : "text-brand-navy-900 dark:text-white"
            )}>
              STRONGER<span className="text-brand-blue-600 transition-colors group-hover:text-blue-500">built</span>
            </span>
            <span className={cn(
              "text-[9px] md:text-[10px] font-semibold tracking-widest uppercase leading-none transition-colors",
              isDarkBgPage && !scrolled ? "text-slate-400" : "text-slate-500 dark:text-slate-400"
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
                  isDarkBgPage && !scrolled
                    ? "text-slate-300 hover:text-white hover:bg-white/5"
                    : !scrolled 
                      ? "text-slate-600 dark:text-slate-300 hover:text-brand-blue-600 hover:bg-slate-100/50 dark:hover:bg-white/5" 
                      : "text-slate-600 dark:text-slate-300 hover:text-brand-blue-600 hover:bg-slate-50 dark:hover:bg-white/5"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!session ? (
              <>
                <Link
                  href="/login"
                  className={cn(
                    "text-[13px] font-bold px-4 py-2 transition-all",
                    isDarkBgPage && !scrolled
                      ? "text-slate-300 hover:text-white"
                      : "text-slate-600 dark:text-slate-300 hover:text-brand-navy-900 dark:hover:text-white"
                  )}
                >
                  Portal Login
                </Link>
                <Link
                  href="/open-bids"
                  className={cn(
                    "px-5 py-2.5 rounded-full text-[13px] font-bold transition-all border",
                    isDarkBgPage && !scrolled
                      ? "border-white/15 text-slate-300 hover:bg-white/5"
                      : "border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                  )}
                >
                  Search Open Bids
                </Link>
                <Link
                  href="/contact"
                  className="bg-brand-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-[13px] font-bold transition-all shadow-md shadow-blue-500/10 hover:shadow-blue-500/20"
                >
                  Book a Free Call
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
          </div>

          {/* Mobile Toggler */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "p-2 rounded-xl transition-colors ml-2",
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
                      href="/open-bids"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-center bg-transparent border border-gray-200 dark:border-white/15 text-slate-900 dark:text-white py-4 rounded-2xl font-bold shadow-sm"
                    >
                      Search Open Bids
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-center bg-brand-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/20"
                    >
                      Book a Free Call
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
