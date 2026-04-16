"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, CheckCircle2, ShieldAlert, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function MagicLinkLogin() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setIsError(true);
      return;
    }
    setIsError(false);
    setIsSubmitted(true);
    
    // Auto-login to bypass inbox check for rapid demo testing
    await login(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-black/90 px-4 py-24">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-brand-navy-900 dark:text-white uppercase tracking-tighter mb-2">
            STRONGER<span className="text-brand-blue-600">Built</span>
          </h1>
          <p className="text-sm font-bold tracking-widest text-slate-500 uppercase">Secure Portal Access</p>
        </div>

        <div className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle BG styling */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue-600/10 rounded-full blur-[40px] pointer-events-none" />

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="login-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSubmit}
                className="space-y-6 relative z-10"
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-black text-brand-navy-900 dark:text-white mb-2">Welcome Back</h2>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Enter your work email. We'll send a magic link to instantly securely log you in without requiring a password.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email Address
                  </label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@agency.gov"
                    className={`w-full bg-slate-50 dark:bg-black/30 border ${isError ? 'border-red-500' : 'border-slate-200 dark:border-white/10'} rounded-xl px-4 py-3 text-brand-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue-600 transition-colors`}
                  />
                  {isError && <p className="text-xs text-red-500 font-bold flex items-center gap-1 mt-1"><ShieldAlert className="w-3 h-3" /> Please enter a valid email.</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-brand-blue-600 hover:bg-blue-500 disabled:bg-blue-300 text-white font-black py-4 rounded-xl shadow-lg shadow-brand-blue-600/30 transition-all hover:-translate-y-1"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">Connecting <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/></span>
                  ) : (
                    <>Send Magic Link <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>

                {/* Dev Helper */}
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 p-4 rounded-xl text-xs text-slate-500 font-medium">
                  <p className="font-bold text-slate-700 dark:text-slate-300 mb-2">Demo RBAC Simulator:</p>
                  <ul className="space-y-1 opacity-80">
                    <li><span className="text-brand-blue-600 font-bold">gov/mil</span> {"->"} Gov Client Portal</li>
                    <li><span className="text-brand-blue-600 font-bold">@strongerbuilt.us</span> {"->"} Admin CRM</li>
                    <li><span className="text-brand-blue-600 font-bold">super@</span> {"->"} Super Admin</li>
                    <li><span className="text-brand-blue-600 font-bold">anything else</span> {"->"} Vendor Portal</li>
                  </ul>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="success-message"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 relative z-10"
              >
                <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-black text-brand-navy-900 dark:text-white mb-2">Check Your Inbox</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                  We sent a magic link to <strong className="text-brand-navy-900 dark:text-white">{email}</strong>. Click the link to instantly log in.
                </p>
                <button 
                  onClick={() => { setIsSubmitted(false); setEmail(""); }}
                  className="text-xs font-bold text-brand-blue-600 hover:text-blue-800 uppercase tracking-widest"
                >
                  Use a different email
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
