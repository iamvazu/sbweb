"use client";

import React, { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  Cell
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Info, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";

// --- Types ---
interface BidData {
  category: string;
  total: number;
  setAsides: number;
  closingSoon: number;
  recommendation: string;
  color: string;
}

// --- Configuration ---
const CATEGORIES: Record<string, { label: string; color: string; keywords: string[]; rec: string }> = {
  construction: { 
    label: "General Construction", 
    color: "#185FA5", 
    keywords: ["construction", "remodel", "renovation", "tenant improvement", "paving", "concrete", "asphalt"],
    rec: "HIGH — Review each; bid SB/DVBE first"
  },
  janitorial: { 
    label: "Janitorial / Custodial", 
    color: "#0F6E56", 
    keywords: ["janitorial", "cleaning", "custodial", "housekeeping", "sanitation"],
    rec: "CORE — Bid all SB set-asides immediately"
  },
  maintenance: { 
    label: "Maintenance Services", 
    color: "#5F5E5A", 
    keywords: ["maintenance", "repair", "facility", "building maintenance"],
    rec: "HIGH — Recurring revenue potential"
  },
  concrete: { 
    label: "Concrete / Paving", 
    color: "#64748b", 
    keywords: ["concrete", "pavement", "paving", "asphalt", "curb"],
    rec: "MEDIUM — Bid if you have sub-contractors"
  },
  waste: { 
    label: "Waste / Hauling", 
    color: "#639922", 
    keywords: ["waste", "trash", "hauling", "disposal", "recycling"],
    rec: "MEDIUM — Partner with hauler"
  },
  roofing: { 
    label: "Roofing", 
    color: "#854F0B", 
    keywords: ["roof", "roofing"],
    rec: "CORE — Strong match with CSLB license"
  },
  hvac: { 
    label: "HVAC / Mechanical", 
    color: "#534AB7", 
    keywords: ["hvac", "heating", "ventilation", "air condition", "boiler", "mechanical"],
    rec: "MEDIUM — Subcontract HVAC work"
  },
  windows: { 
    label: "Windows / Doors", 
    color: "#0C447C", 
    keywords: ["window", "door", "glazing", "entrance"],
    rec: "HIGH — SB set-asides available"
  },
  demolition: { 
    label: "Demolition / Abatement", 
    color: "#993C1D", 
    keywords: ["demolition", "abatement", "asbestos", "lead", "hazardous"],
    rec: "HIGH — Lead/asbestos certs needed"
  },
  electrical: { 
    label: "Electrical", 
    color: "#1A56DB", 
    keywords: ["electrical", "electric", "power", "lighting"],
    rec: "LOW — Need licensed electrician"
  },
  painting: { 
    label: "Painting", 
    color: "#D85A30", 
    keywords: ["paint", "painting", "coating"],
    rec: "HIGH — SB/DVBE option available"
  },
};

const DEFAULT_CATEGORY = {
  label: "Other Relevant",
  color: "#94a3b8",
  rec: "REVIEW — Check individually"
};

export default function MarketInsights({ variant = "full" }: { variant?: "full" | "compact" }) {
  const [data, setData] = useState<BidData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAndProcess() {
      setLoading(true);
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const now = new Date();
      const { data: bids, error } = await supabase
        .from("bids")
        .select("event_name, department_name, sbe_only, dvbe_goal, end_date")
        .eq("status", "Posted")
        .gte("end_date", now.toISOString());

      if (error || !bids) {
        console.error("Error fetching bids for insights:", error);
        setLoading(false);
        return;
      }

      // Grouping logic
      const groups: Record<string, BidData> = {};
      
      // Initialize groups
      Object.entries(CATEGORIES).forEach(([key, config]) => {
        groups[key] = {
          category: config.label,
          total: 0,
          setAsides: 0,
          closingSoon: 0,
          recommendation: config.rec,
          color: config.color
        };
      });
      groups["other"] = {
        category: DEFAULT_CATEGORY.label,
        total: 0,
        setAsides: 0,
        closingSoon: 0,
        recommendation: DEFAULT_CATEGORY.rec,
        color: DEFAULT_CATEGORY.color
      };

      const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      bids.forEach(bid => {
        const text = ((bid.event_name || "") + " " + (bid.department_name || "")).toLowerCase();
        let matchedKey = "other";
        
        for (const [key, config] of Object.entries(CATEGORIES)) {
          if (config.keywords.some(kw => text.includes(kw))) {
            matchedKey = key;
            break;
          }
        }

        const group = groups[matchedKey];
        group.total++;
        if (bid.sbe_only || bid.dvbe_goal) group.setAsides++;
        if (bid.end_date && new Date(bid.end_date) <= sevenDaysFromNow) group.closingSoon++;
      });

      // Filter out empty categories and sort by total
      const processedData = Object.values(groups)
        .filter(g => g.total > 0)
        .sort((a, b) => b.total - a.total);

      setData(processedData);
      setLoading(false);
    }

    fetchAndProcess();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-8 animate-pulse">
        <Skeleton className="h-[400px] w-full rounded-[2.5rem]" />
        <Skeleton className="h-[300px] w-full rounded-[2.5rem]" />
      </div>
    );
  }

  const chartData = data.map(d => ({
    name: d.category.split(' ')[0], // Short name for axis
    fullName: d.category,
    "Other Bids": d.total - d.setAsides,
    "SB/DVBE Set-Aside": d.setAsides,
    color: d.color
  }));

  return (
    <div className={cn("space-y-10", variant === "compact" ? "space-y-6" : "")}>
      
      {/* Chart Card */}
      <Card className="border-none shadow-2xl shadow-brand-blue-600/5 rounded-[2.5rem] bg-white/80 dark:bg-brand-navy-900/60 backdrop-blur-xl overflow-hidden">
        <CardHeader className="px-8 pt-8">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl md:text-2xl font-black text-brand-navy-900 dark:text-white uppercase tracking-tight">
                Bid Distribution
              </CardTitle>
              <CardDescription className="text-slate-500 font-medium">
                Live market breakdown by category and certification status
              </CardDescription>
            </div>
            <div className="hidden sm:flex h-12 w-12 rounded-2xl bg-brand-blue-600/10 items-center justify-center text-brand-blue-600">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-8">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  fontSize={10} 
                  fontWeight="bold" 
                  tick={{ fill: '#64748b' }}
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  fontSize={10} 
                  fontWeight="bold" 
                  tick={{ fill: '#64748b' }} 
                />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9', opacity: 0.4 }}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    padding: '12px'
                  }}
                />
                <Legend 
                  verticalAlign="top" 
                  align="right" 
                  iconType="circle"
                  wrapperStyle={{ paddingBottom: '20px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}
                />
                <Bar dataKey="Other Bids" stackId="a" fill="#1E6FD9" radius={[0, 0, 0, 0]} barSize={32} />
                <Bar dataKey="SB/DVBE Set-Aside" stackId="a" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Opportunity Grid */}
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center gap-3 px-2">
          <Info className="h-4 w-4 text-brand-blue-600" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Market Opportunity Analysis</h4>
        </div>
        
        <div className="overflow-x-auto pb-4">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-4">
                <th className="px-6 py-2">Category</th>
                <th className="px-6 py-2 text-center">Total Bids</th>
                <th className="px-6 py-2 text-center">SB/DVBE Set-Asides</th>
                <th className="px-6 py-2 text-center">Closing ≤ 7 Days</th>
                <th className="px-6 py-2">Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.category} className="bg-white/50 dark:bg-brand-navy-900/40 hover:bg-white dark:hover:bg-brand-navy-800 transition-all group">
                  <td className="px-6 py-4 first:rounded-l-2xl border-y border-l border-slate-100 dark:border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: row.color }} />
                      <span className="text-sm font-bold text-brand-navy-900 dark:text-white truncate max-w-[180px]">
                        {row.category}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center border-y border-slate-100 dark:border-white/5">
                    <span className="text-sm font-black text-slate-700 dark:text-slate-300">{row.total}</span>
                  </td>
                  <td className="px-6 py-4 text-center border-y border-slate-100 dark:border-white/5">
                    <Badge variant="secondary" className={cn(
                      "text-[10px] font-bold px-2 py-0.5",
                      row.setAsides > 5 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-slate-100 text-slate-500"
                    )}>
                      {row.setAsides}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-center border-y border-slate-100 dark:border-white/5">
                    <div className="flex items-center justify-center gap-1.5">
                      {row.closingSoon > 0 && <AlertCircle className="h-3 w-3 text-red-500" />}
                      <span className={cn("text-sm font-bold", row.closingSoon > 5 ? "text-red-500" : "text-slate-600")}>
                        {row.closingSoon}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 last:rounded-r-2xl border-y border-r border-slate-100 dark:border-white/5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-blue-600 opacity-40 group-hover:opacity-100 transition-opacity" />
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight italic">
                        {row.recommendation}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
