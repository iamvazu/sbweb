"use client";

import { useEffect, useState, useRef } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronUp, ChevronDown, ArrowRight, Activity, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────
interface Bid {
  id: string;
  event_id: string;
  event_name: string;
  department_name: string | null;
  end_date: string | null;
  portal_link: string | null;
  prebid_type: string | null;
  go_nogo: string | null;
  sbe_only: boolean;
  prevailing_wage: boolean;
  category?: string;
  days_left?: number;
}

// ─── Category logic ───────────────────────────────────────────────
const CATEGORIES: Record<string, { label: string; color: string; keywords: string[] }> = {
  janitorial:      { label: "Janitorial",           color: "#0F6E56", keywords: ["janitorial","cleaning","custodial","linen rental","mop","housekeeping"] },
  hvac:            { label: "HVAC & Mechanical",    color: "#534AB7", keywords: ["hvac","heating","ventilation","air condition","boiler","chiller","refriger"] },
  roofing:         { label: "Roofing",              color: "#854F0B", keywords: ["roof","roofing","siding"] },
  landscaping:     { label: "Landscaping",          color: "#3B6D11", keywords: ["landscape","landscaping","weed","vegetation","grounds","mowing","irrigation","tree trimm"] },
  environmental:   { label: "Environmental",        color: "#993C1D", keywords: ["hazardous","asbestos","lead abat","envir","remediat","debris disposal","recycling services"] },
  security:        { label: "Security & Fire",      color: "#A32D2D", keywords: ["security camera","access control","alarm","fire alarm","fire suppression","fire extinguish","fire safety","fire sprinkler"] },
  construction:    { label: "Construction",         color: "#185FA5", keywords: ["construction","demolit","concrete","asphalt","paving","pavement","overlay","bridge","structural","culvert","synthetic turf"] },
  electrical:      { label: "Electrical",           color: "#1A56DB", keywords: ["electrical","ev supply","electric vehicle","generator","condenser","cabling","power supply","ups "] },
  it:              { label: "IT & Technology",      color: "#534AB7", keywords: ["information tech","software","cloud","network","technology","cyber","computer","moderniz","cabling services"] },
  plumbing:        { label: "Plumbing & Water",     color: "#0C447C", keywords: ["plumbing","septic","sewer","water quality","drain","pipe"] },
  building:        { label: "Building Maintenance", color: "#5F5E5A", keywords: ["door","gate","window","roll-up","fence","painting","paint","building repair","building maintenance","exterior"] },
  medical:         { label: "Medical & Health",     color: "#D85A30", keywords: ["medical","health","clinical","occupational","physical therapy","cardiology","non-emergency medical"] },
  waste:           { label: "Waste & Disposal",     color: "#639922", keywords: ["trash","waste","disposal","shredding","destruction","portable toilet","hauling"] },
  fleet:           { label: "Fleet & Equipment",    color: "#BA7517", keywords: ["vehicle","fleet","forklift","truck","equipment","upfitting","hoist","scale"] },
  food:            { label: "Food Services",        color: "#993C1D", keywords: ["food","meal","catering","nutrition","vegetarian","wheat","lunch","sack lunch","juice"] },
  natural:         { label: "Natural Resources",    color: "#3B6D11", keywords: ["timber","forestry","wildlife","fish","hatchery"] },
  professional:    { label: "Professional Svcs",    color: "#444441", keywords: ["audit","financial","accounting","consulting","advisory","professional services"] },
  traffic:         { label: "Traffic & Signage",    color: "#185FA5", keywords: ["signage","striping","pavement mark","delineator","traffic signal","ramp meter","detection camera"] },
};

function categorize(name: string, dept: string): { label: string; color: string } {
  const text = (name + " " + dept).toLowerCase();
  for (const [, cat] of Object.entries(CATEGORIES)) {
    if (cat.keywords.some((kw) => text.includes(kw))) {
      return { label: cat.label, color: cat.color };
    }
  }
  return { label: "Government Services", color: "#888780" };
}

function daysUntil(dateStr: string): number {
  const end = new Date(dateStr);
  const now = new Date();
  const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

function cleanName(name: string): string {
  return name
    .replace(/^\*\*[^*]+\*\*\s*/g, "")
    .replace(/^\*[^*]+\*\s*/g, "")
    .trim();
}

const ALL_CATS = [
  { key: "all", label: "All Portfolio" },
  ...Object.values(CATEGORIES).map((c) => ({ key: c.label, label: c.label })),
];

export default function BidTicker() {
  const [bids, setBids] = useState<Bid[]>([]);
  const [filtered, setFiltered] = useState<Bid[]>([]);
  const [activeCat, setActiveCat] = useState("all");
  const [topIndex, setTopIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const VISIBLE = 4;

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const now = new Date();
      const weekEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      const { data, error } = await supabase
        .from("bids")
        .select(
          "id,event_id,event_name,department_name,end_date,portal_link,prebid_type,go_nogo,sbe_only,prevailing_wage"
        )
        .gte("end_date", now.toISOString())
        .lte("end_date", weekEnd.toISOString())
        .eq("status", "Posted")
        .neq("go_nogo", "NO_GO")
        .order("end_date", { ascending: true })
        .limit(300);

      if (error || !data) {
        setIsLoading(false);
        return;
      }

      setTotal(data.length);

      const enriched: Bid[] = data.map((b) => {
        const cat = categorize(b.event_name, b.department_name ?? "");
        return {
          ...b,
          event_name: cleanName(b.event_name),
          category: cat.label,
          days_left: b.end_date ? daysUntil(b.end_date) : 99,
          _color: cat.color,
        } as Bid & { _color: string };
      });

      setBids(enriched);
      setFiltered(enriched);
      setIsLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    if (isPaused || filtered.length <= VISIBLE) return;
    timerRef.current = setInterval(() => {
      setTopIndex((prev) => {
        const max = Math.max(0, filtered.length - VISIBLE);
        return prev >= max ? 0 : prev + 1;
      });
    }, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPaused, filtered]);

  function handleCatChange(cat: string) {
    setActiveCat(cat);
    setTopIndex(0);
    setFiltered(cat === "all" ? bids : bids.filter((b) => b.category === cat));
  }

  function nudge(dir: "up" | "down") {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
    setTopIndex((prev) => {
      const max = Math.max(0, filtered.length - VISIBLE);
      return dir === "down" ? Math.min(prev + 1, max) : Math.max(prev - 1, 0);
    });
  }

  const visible = filtered.slice(topIndex, topIndex + VISIBLE);

  function getCatColor(catLabel: string): string {
    const found = Object.values(CATEGORIES).find((c) => c.label === catLabel);
    return found?.color ?? "#888";
  }

  function getDaysBadge(days: number) {
    if (days <= 0) return { bg: "bg-red-500/10", text: "text-red-600 dark:text-red-400 border-red-500/20", label: "Closing Now" };
    if (days <= 1) return { bg: "bg-red-500/10", text: "text-red-600 dark:text-red-400 border-red-500/20", label: "Closes today" };
    if (days <= 2) return { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400 border-amber-500/20", label: `${days}d left` };
    if (days <= 5) return { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400 border-emerald-500/20", label: `${days}d left` };
    return { bg: "bg-brand-blue-600/10", text: "text-brand-blue-600 dark:text-brand-blue-400 border-brand-blue-600/20", label: `${days}d left` };
  }

  const catCountMap = bids.reduce((acc, b) => {
    acc[b.category ?? ""] = (acc[b.category ?? ""] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-[11px] font-black text-amber-600 uppercase tracking-[0.3em] mb-4">Live Market Pulse</h2>
        <h3 className="text-3xl md:text-4xl font-serif text-brand-navy-900 dark:text-white mb-2">Bids Closing <span className="italic text-brand-blue-600 text-3xl">This Week.</span></h3>
      </div>

      <div className="w-full rounded-[2.5rem] border border-gray-200 dark:border-white/10 overflow-hidden bg-white dark:bg-brand-navy-900/60 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
          <div className="flex items-center gap-4">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            </div>
            <div>
              <p className="text-sm font-black text-brand-navy-900 dark:text-white uppercase tracking-tight">Active Opportunities</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">
                {isLoading ? "Retrieving market data..." : `${total} Bids Identified · Cal eProcure · CA State Portals`}
              </p>
            </div>
          </div>
          <Link href="/portal/bids" className="text-[10px] font-black text-brand-blue-600 hover:text-blue-700 uppercase tracking-widest flex items-center gap-2 group">
            Analysis Hub <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories */}
        <div className="flex gap-2 px-6 py-3 overflow-x-auto border-b border-gray-100 dark:border-white/5 no-scrollbar">
          {ALL_CATS.filter((c) => c.key === "all" || catCountMap[c.label] > 0).map((c) => {
            const color = getCatColor(c.label);
            const isActive = activeCat === c.key;
            const count = c.key === "all" ? total : catCountMap[c.label];
            
            return (
              <button
                key={c.key}
                onClick={() => handleCatChange(c.key)}
                className={cn(
                  "flex-shrink-0 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-300",
                  isActive 
                    ? "bg-brand-navy-900 dark:bg-white text-white dark:text-brand-navy-900 border-transparent shadow-lg"
                    : "bg-transparent border-gray-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-brand-blue-600/30"
                )}
              >
                {c.label} {count > 0 && <span className="opacity-60 ml-1">({count})</span>}
              </button>
            );
          })}
        </div>

        {/* Bid Rows */}
        <div
          className="min-h-[360px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <div className="h-[360px] flex flex-col items-center justify-center text-center p-12">
                <Activity className="w-12 h-12 text-brand-blue-600/20 animate-pulse mb-4" />
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Aggregating Live Solicitations</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="h-[360px] flex items-center justify-center text-center p-12">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No bids closing in this category today</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-white/5">
                {visible.map((bid, idx) => {
                  const color = getCatColor(bid.category ?? "");
                  const badge = getDaysBadge(bid.days_left ?? 99);
                  const endFormatted = bid.end_date
                    ? new Date(bid.end_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "";

                  return (
                    <motion.div
                      key={bid.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <a
                        href={bid.portal_link ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-5 px-8 py-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-all group"
                      >
                        <div
                          className="mt-2 h-2.5 w-2.5 rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(0,0,0,0.1)] group-hover:scale-125 transition-transform"
                          style={{ background: color }}
                        />

                        <div className="flex-1 min-w-0">
                          <p className="text-base font-bold text-brand-navy-900 dark:text-white truncate group-hover:text-brand-blue-600 transition-colors uppercase tracking-tight">
                            {bid.event_name}
                          </p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold mt-0.5 truncate uppercase tracking-widest">
                            {bid.department_name}
                          </p>
                          
                          <div className="flex gap-2 mt-2.5 flex-wrap">
                            {bid.prebid_type === "M" && (
                              <span className="text-[9px] px-2 py-0.5 rounded-md bg-red-500/10 text-red-600 dark:text-red-400 font-black uppercase tracking-widest border border-red-500/20">
                                Mandatory Pre-Bid
                              </span>
                            )}
                            {bid.sbe_only && (
                              <span className="text-[9px] px-2 py-0.5 rounded-md bg-brand-blue-600/10 text-brand-blue-600 dark:text-brand-blue-400 font-black uppercase tracking-widest border border-brand-blue-600/20">
                                SBE Exclusive
                              </span>
                            )}
                            {bid.prevailing_wage && (
                              <span className="text-[9px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-black uppercase tracking-widest border border-amber-500/20">
                                Prevailing Wage
                              </span>
                            )}
                            <span
                              className="text-[9px] px-2 py-0.5 rounded-md font-black uppercase tracking-widest border"
                              style={{
                                background: color + "18",
                                color: color,
                                borderColor: color + "30"
                              }}
                            >
                              {bid.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                          <span className={cn(
                            "text-[10px] font-black px-3 py-1 rounded-full border uppercase tracking-widest whitespace-nowrap shadow-sm",
                            badge.bg, badge.text, badge.color
                          )}>
                            {badge.label}
                          </span>
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            <Clock size={10} /> {endFormatted}
                          </div>
                        </div>
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between px-8 py-5 bg-slate-50/80 dark:bg-white/5 border-t border-gray-100 dark:border-white/5 backdrop-blur-md">
          <div className="flex gap-2">
            <button
              onClick={() => nudge("up")}
              className="w-10 h-10 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-brand-blue-600 hover:text-white hover:border-transparent transition-all shadow-sm"
              aria-label="Scroll up"
            >
              <ChevronUp size={18} />
            </button>
            <button
              onClick={() => nudge("down")}
              className="w-10 h-10 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-brand-blue-600 hover:text-white hover:border-transparent transition-all shadow-sm"
              aria-label="Scroll down"
            >
              <ChevronDown size={18} />
            </button>
          </div>

          <div className="flex gap-1.5 items-center">
            {Array.from({
              length: Math.min(8, Math.ceil(filtered.length / VISIBLE)),
            }).map((_, i) => {
              const isActive = i === Math.floor(topIndex / VISIBLE);
              return (
                <div
                  key={i}
                  className="h-1 rounded-full transition-all duration-500"
                  style={{
                    width: isActive ? 24 : 8,
                    background: isActive ? "#1E6FD9" : "#CBD5E133",
                  }}
                />
              );
            })}
          </div>

          <Link
            href="/portal/bids"
            className="group relative inline-flex items-center justify-center gap-2 bg-brand-navy-900 dark:bg-white text-white dark:text-brand-navy-900 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:-translate-y-1"
          >
            <span>Live Analysis</span>
            <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Clock({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
