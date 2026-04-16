"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export default function ContactHub() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background-light dark:bg-black/20">
      <div className="max-w-7xl mx-auto px-4 w-full">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-brand-navy-900 dark:text-white tracking-tight mb-6">
            Get In <span className="text-brand-blue-600">Touch</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Reach out to our procurement desk or general contact center. We guarantee an initial acknowledgement within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-1 space-y-8">
            <div className="glass-card p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-brand-navy-900 dark:text-white mb-6">Contact Info</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-brand-navy-900 shrink-0 flex items-center justify-center shadow-sm">
                    <MapPin className="w-5 h-5 text-brand-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Office</h4>
                    <p className="font-semibold text-brand-navy-900 dark:text-gray-200">4370 1/2 Oregon St<br/>San Diego, CA 92104</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-brand-blue-600/10 flex items-center justify-center text-brand-blue-600">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Call Us</p>
                    <p className="text-xl font-bold text-brand-navy-900 dark:text-white">(831) 760-0806</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-brand-navy-900 shrink-0 flex items-center justify-center shadow-sm">
                    <Mail className="w-5 h-5 text-brand-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Bids & Government</h4>
                    <p className="font-semibold text-brand-navy-900 dark:text-gray-200">bids@strongerbuilt.us</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 p-8 md:p-12 rounded-3xl shadow-xl shadow-brand-blue-600/5">
              {submitted ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-black text-brand-navy-900 dark:text-white mb-4">Request Received.</h3>
                  <p className="text-slate-600 dark:text-slate-400">Thank you. Our team will review your message and reply promptly.</p>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} 
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Name <span className="text-red-500">*</span></label>
                      <input required type="text" className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-brand-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue-600/50" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Email <span className="text-red-500">*</span></label>
                      <input required type="email" className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-brand-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue-600/50" placeholder="john@agency.gov" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Inquiry Type</label>
                    <select className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-brand-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue-600/50 appearance-none">
                      <option>Request a Quote</option>
                      <option>Government Solicitation</option>
                      <option>Subcontractor Application</option>
                      <option>General</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Message <span className="text-red-500">*</span></label>
                    <textarea required rows={5} className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-brand-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue-600/50 resize-none" placeholder="Provide project details or solicitation URL..."></textarea>
                  </div>

                  <button type="submit" className="w-full bg-brand-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <Send className="w-5 h-5" />
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
