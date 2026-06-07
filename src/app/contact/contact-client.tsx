"use client";

import React, { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  ChevronDown, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Calendar,
  Compass,
  FileCheck2,
  PhoneCall,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

// FAQ Item Component with smooth height transition
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200/60 dark:border-white/5 rounded-2xl bg-white dark:bg-brand-navy-900/40 overflow-hidden transition-all hover:border-brand-blue-600/30 shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full px-6 py-5 flex items-center justify-between text-left group cursor-pointer focus:outline-none"
      >
        <h3 className="text-sm sm:text-base font-bold text-brand-navy-900 dark:text-white group-hover:text-brand-blue-600 transition-colors">
          {question}
        </h3>
        <ChevronDown 
          className={cn(
            "w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ml-4",
            isOpen && "rotate-180 text-brand-blue-600"
          )} 
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-1 border-t border-slate-100 dark:border-white/5">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactClient() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("service") === "success";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-indigo-50/10 to-white dark:from-brand-navy-950 dark:via-brand-navy-900 dark:to-brand-navy-950 pt-28 pb-16 relative overflow-hidden font-sans">
      
      {/* Background glow elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-1/4 w-[700px] h-[700px] rounded-full bg-brand-blue-600/5 blur-[120px]" />
        <div className="absolute bottom-20 left-10 w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 space-y-16">
        
        {/* Stripe Success Message */}
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-teal-50 border border-teal-200 dark:bg-teal-950/40 dark:border-teal-900/50 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/10">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-teal-900 dark:text-teal-200">
                Payment Completed Successfully!
              </h4>
              <p className="text-xs text-teal-700 dark:text-teal-400 font-medium">
                Thank you for your business. Please select an available consultation slot below to schedule your kick-off session.
              </p>
            </div>
          </motion.div>
        )}

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-4">
          
          {/* Copy Left */}
          <div className="lg:col-span-7 space-y-6 lg:pr-6">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block"
            >
              <span className="text-[10px] font-black text-brand-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 px-4 py-1.5 rounded-full uppercase tracking-widest">
                Free Consultation · No Obligation
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-navy-900 dark:text-white leading-[1.05] tracking-tight"
            >
              Let's find your next bid — and <span className="italic text-brand-blue-600 dark:text-blue-400 font-serif">win it.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 dark:text-slate-400 font-medium text-base sm:text-lg leading-relaxed max-w-2xl"
            >
              Book a free call with a real Stronger Built proposal consultant. In about 20 minutes we'll look at the contracts you want, surface opportunities that actually fit, and give you a straight answer on what's worth pursuing. No pressure, no sales script.
            </motion.p>

            <motion.ul 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4 pt-2"
            >
              {[
                "Talk to an expert consultant — not a salesperson.",
                "Get an honest go/no-go on a bid you're eyeing.",
                "See exactly how Pay-When-You-Win would work for you."
              ].map((checkText, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-brand-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{checkText}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Booking Card Right */}
          <motion.aside 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 bg-white dark:bg-brand-navy-900/90 border border-slate-200/60 dark:border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl shadow-indigo-100/30 dark:shadow-none lg:sticky lg:top-24"
            id="book"
          >
            <div className="text-[10px] font-black uppercase text-brand-blue-600 dark:text-blue-400 tracking-widest mb-1.5">
              Pick a time
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-brand-navy-900 dark:text-white tracking-tight">
              Book your free consultation
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mb-5">
              ~20 minutes · Phone or video · Nationwide
            </p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {["100% Free", "No Obligation", "Veteran-Owned"].map((pill) => (
                <span key={pill} className="text-[10px] font-black uppercase tracking-tight px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-brand-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
                  {pill}
                </span>
              ))}
            </div>

            {/* Live Scheduler Embed */}
            <div className="calendly-container min-h-[400px]">
              <div 
                className="calendly-inline-widget w-full rounded-2xl border border-slate-100 dark:border-slate-800" 
                data-url="https://calendly.com/strongerbuilt/consult" 
                style={{ minWidth: "290px", height: "450px" }} 
              />
              <Script 
                src="https://assets.calendly.com/assets/external/widget.js" 
                strategy="afterInteractive" 
              />
            </div>

            {/* Alternates */}
            <div className="border-t border-slate-100 dark:border-white/5 pt-5 mt-5 text-center space-y-3">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Prefer to talk now?
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-y-2 gap-x-6 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                <a href="tel:+18317600806" className="flex items-center gap-1.5 hover:text-brand-blue-600 transition-colors">
                  <Phone className="w-4 h-4 text-brand-blue-600" />
                  (831) 760-0806
                </a>
                <span className="hidden sm:block text-slate-300">|</span>
                <a href="mailto:hello@strongerbuilt.us" className="flex items-center gap-1.5 hover:text-brand-blue-600 transition-colors">
                  <Mail className="w-4 h-4 text-brand-blue-600" />
                  hello@strongerbuilt.us
                </a>
              </div>
            </div>
          </motion.aside>

        </div>

        {/* TRUST STRIP */}
        <div className="border-t border-b border-slate-200/60 dark:border-white/5 bg-white/40 dark:bg-transparent backdrop-blur-sm -mx-6 md:-mx-10 py-5">
          <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center">
            {["Veteran-Owned", "Nationwide · All 50 States", "No Long-Term Contract", "Pay When You Win", "Free & No Obligation"].map((item, idx, arr) => (
              <span key={item} className="flex items-center gap-2">
                <span>{item}</span>
                {idx < arr.length - 1 && <span className="text-slate-300 dark:text-slate-800 hidden md:inline">•</span>}
              </span>
            ))}
          </div>
        </div>

        {/* WHAT WE'LL COVER SECTION */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy-900 dark:text-white tracking-tight">
              What we'll cover on the call.
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
              A focused working session — not a pitch. Come with a bid you're considering, or just your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* We'll Review */}
            <div className="bg-white dark:bg-brand-navy-900/40 border border-slate-200/60 dark:border-white/5 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-black text-brand-navy-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-blue-600" />
                We'll review
              </h3>
              <ul className="space-y-4">
                {[
                  "The contracts and agencies you want to win with",
                  "Open opportunities that fit your business right now",
                  "Your certifications and which set-asides you qualify for",
                  "A specific RFP you're weighing — and whether it's worth it",
                  "How Pay-When-You-Win would apply to your next bid"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
                    <span className="text-brand-blue-600 font-bold shrink-0 mt-0.5">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* You'll Walk Away With */}
            <div className="bg-white dark:bg-brand-navy-900/40 border border-slate-200/60 dark:border-white/5 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-black text-brand-navy-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-600" />
                You'll walk away with
              </h3>
              <ul className="space-y-4">
                {[
                  "A shortlist of real opportunities worth pursuing",
                  "A straight go/no-go on the bid you're considering",
                  "Clear, upfront pricing for your next proposal",
                  "A simple next step — and zero obligation to take it"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
                    <span className="text-teal-600 font-bold shrink-0 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SERVICES OFFERED */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy-900 dark:text-white tracking-tight">
              What we can do for you.
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
              Two services, one goal: find the right government bids and win them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Bid Finder */}
            <div className="bg-white dark:bg-brand-navy-900/40 border border-slate-200/60 dark:border-white/5 rounded-3xl p-8 shadow-sm space-y-4">
              <div className="text-[10px] font-black uppercase text-brand-blue-600 tracking-wider">
                Bid Finder
              </div>
              <h3 className="text-xl font-bold text-brand-navy-900 dark:text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-brand-blue-600" />
                We find the right bids for you.
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                Every opportunity that fits your business — federal, state, and local — searched nationwide, matched to what you do, and scored for fit so you pursue only the ones worth your time. Free to search.
              </p>
            </div>

            {/* Bid Manager */}
            <div className="bg-white dark:bg-brand-navy-900/40 border border-slate-200/60 dark:border-white/5 rounded-3xl p-8 shadow-sm space-y-4">
              <div className="text-[10px] font-black uppercase text-brand-blue-600 tracking-wider">
                Bid Manager
              </div>
              <h3 className="text-xl font-bold text-brand-navy-900 dark:text-white flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-brand-blue-600" />
                We write it. We submit it. You win it.
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                Full-service proposal response from qualification to on-time submission, handled by a named consultant. A low bid writing fee plus a success fee only if you win — you mostly pay when you win.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy-900 dark:text-white tracking-tight">
              How the call works.
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
              Simple, fast, and free.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { num: 1, title: "Pick a time", desc: "Grab a slot that works for you — about 20 minutes, phone or video." },
              { num: 2, title: "Tell us your goals", desc: "Share your business, the contracts you want, and any bid you're eyeing." },
              { num: 3, title: "We review fit", desc: "We surface real opportunities and give you an honest go/no-go." },
              { num: 4, title: "Get your plan", desc: "You leave with clear next steps and pricing. Whether to move forward is entirely your call." }
            ].map((step) => (
              <div key={step.num} className="bg-white dark:bg-brand-navy-900/20 border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-brand-navy-900 text-white flex items-center justify-center font-bold text-lg">
                  {step.num}
                </div>
                <h4 className="text-base font-bold text-brand-navy-900 dark:text-white">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="space-y-12 max-w-3xl mx-auto">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy-900 dark:text-white tracking-tight">
              Before you book.
            </h2>
          </div>

          <div className="space-y-4">
            <FAQItem 
              question="Is the consultation really free?" 
              answer="Yes — completely free, with no obligation to hire us afterward." 
            />
            <FAQItem 
              question="Who will I be talking to?" 
              answer="A real proposal consultant who has worked on government bids — not a sales rep reading a script." 
            />
            <FAQItem 
              question="How long does it take?" 
              answer="About 20 minutes. Bring a specific RFP if you have one, and we'll give you a straight read on it." 
            />
            <FAQItem 
              question="Do I have to commit to anything?" 
              answer="No. You'll leave with a clear plan and pricing; whether you move forward is entirely up to you." 
            />
            <FAQItem 
              question="What should I have ready?" 
              answer="Helpful but not required: your industry/NAICS, any certifications you hold, and a bid you're considering. If you have none of that yet, we'll start from your goals." 
            />
          </div>
        </section>

        {/* CLOSING CALL-TO-ACTION */}
        <section className="bg-gradient-to-tr from-[#1a2f63] to-[#0b1736] text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 shadow-xl relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Your next contract starts with a conversation.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto font-medium">
            Free, ~20 minutes, no obligation. And with Pay-When-You-Win, you don't carry the risk alone.
          </p>
          <div className="pt-2">
            <Link 
              href="#book" 
              className="inline-flex items-center gap-2 bg-brand-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5"
            >
              <PhoneCall className="w-4 h-4" />
              Book Your Free Call
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
