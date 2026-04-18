"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DropdownMenuProps {
  children: React.ReactNode;
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  return <div className="relative inline-block">{children}</div>;
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  className?: string;
}

// We'll manage state in the parent scope of Navbar for simplicity or use a context if needed.
// For now, let's make it a more standard uncontrolled component pattern or simplified for the Navbar.

export function DropdownMenuTrigger({ children, className, ...props }: any) {
  return (
    <button className={cn("outline-none", className)} {...props}>
      {children}
    </button>
  );
}

export function DropdownMenuContent({ children, className, isOpen }: any) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5, scale: 0.95 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className={cn(
            "absolute top-full left-0 mt-2 min-w-[200px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl dark:border-white/10 dark:bg-brand-navy-900 z-50",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function DropdownMenuItem({ children, className, ...props }: any) {
  return (
    <div
      className={cn(
        "cursor-pointer rounded-xl px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-white/5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
