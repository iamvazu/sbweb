"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Headset } from "lucide-react";
import { useState } from "react";

export default function ContactHub() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black/20">
      
      {/* Premium Dark Navy Hero - HARMONIZED */}
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
            <Headset className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-[10px] font-black tracking-[0.2em] text-amber-400 uppercase">Procurement Desk</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight mb-8 leading-[1.1]"
          >
            Get In <br className="hidden md:block"/>
            <span className="italic text-brand-blue-600">Touch.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
          >
            Reach out to our project management desk or general contact center. We guarantee an initial acknowledgement within 24 hours.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 dark:bg-brand-navy-900/40 border border-gray-200 dark:border-white/10 p-10 rounded-[2.5rem] shadow-sm"
            >
              <h3 className="text-xl font-serif text-brand-navy-900 dark:text-white mb-8 italic">Contact Info</h3>
              <ul className="space-y-8">
                <li className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shrink-0 flex items-center justify-center shadow-sm">
                    <MapPin className="w-5 h-5 text-brand-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1.5">Official Headquarters</h4>
                    <p className="font-bold text-brand-navy-900 dark:text-gray-200 text-sm leading-relaxed">4370 1/2 Oregon St<br/>San Diego, CA 92104</p>
                  </div>
                </li>
                <li className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue-600 text-white shrink-0 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1.5">Direct Line</p>
                    <p className="text-lg font-bold text-brand-navy-900 dark:text-white">(831) 760-0806</p>
                  </div>
                </li>
                <li className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shrink-0 flex items-center justify-center shadow-sm">
                    <Mail className="w-5 h-5 text-brand-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1.5">General Inquiries</h4>
                    <p className="font-bold text-brand-navy-900 dark:text-gray-200 text-sm">hello@strongerbuilt.xyz</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-brand-navy-900/50 border border-gray-200 dark:border-white/10 p-8 md:p-14 rounded-[3rem] shadow-2xl shadow-brand-blue-600/5"
            >
              {submitted ? (
                <div className="text-center py-20">
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 bg-success/10 text-success rounded-3xl flex items-center justify-center mx-auto mb-8"
                  >
                    <Send className="w-10 h-10" />
                  </motion.div>
                  <h3 className="text-3xl font-serif text-brand-navy-900 dark:text-white mb-4 italic">Message Transmitted</h3>
                  <p className="text-slate-600 dark:text-slate-400 font-medium">Thank you. Our procurement team will review your inquiry and respond within 24 business hours.</p>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} 
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest">Full Name <span className="text-brand-blue-600">*</span></label>
                      <input required type="text" className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 text-brand-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue-600/50 font-medium transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest">Email Address <span className="text-brand-blue-600">*</span></label>
                      <input required type="email" className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 text-brand-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue-600/50 font-medium transition-all" placeholder="john@agency.gov" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest">Inquiry Type</label>
                    <div className="relative">
                      <select className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 text-brand-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue-600/50 appearance-none font-bold text-sm cursor-pointer">
                        <option>Request a Quote</option>
                        <option>Government Solicitation</option>
                        <option>Subcontractor Application</option>
                        <option>General Support</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <motion.div animate={{ y: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 2 }}>↓</motion.div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest">Message Brief <span className="text-brand-blue-600">*</span></label>
                    <textarea required rows={5} className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 text-brand-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue-600/50 resize-none font-medium transition-all" placeholder="Provide project specifications or solicitation reference..."></textarea>
                  </div>

                  <button type="submit" className="w-full bg-brand-navy-900 hover:bg-brand-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 transition-all group shadow-xl hover:-translate-y-1">
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Transmit Inquiry
                  </button>
                </form>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
