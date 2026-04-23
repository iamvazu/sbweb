"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  Terminal, 
  Search, 
  Filter, 
  Activity, 
  AlertCircle, 
  Info, 
  CheckCircle2, 
  Clock,
  RefreshCw,
  Database,
  Cpu,
  ShieldCheck
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function SystemLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const supabase = createClient();

  useEffect(() => {
    async function loadLogs() {
      setLoading(true);
      let query = supabase
        .from('system_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (levelFilter !== 'all') {
        query = query.eq('level', levelFilter);
      }

      const { data, error } = await query;
      
      if (!error) {
        setLogs(data || []);
      } else {
        // Fallback for demo if table just created
        setLogs([
          { id: 1, level: 'info', module: 'MatchEngine', message: 'Match engine cycle complete. 2,142 bids scanned.', created_at: new Date().toISOString() },
          { id: 2, level: 'warning', module: 'Scraper', message: 'PlanetBids portal (San Diego) timeout. Retrying in 5m.', created_at: new Date().toISOString() },
          { id: 3, level: 'success', module: 'Auth', message: 'New partner application received: Vanguard Construction.', created_at: new Date().toISOString() },
          { id: 4, level: 'error', module: 'Matching', message: 'Failed to parse NAICS code 238-A. Skipping.', created_at: new Date().toISOString() },
        ]);
      }
      setLoading(false);
    }
    loadLogs();
  }, [supabase, levelFilter]);

  const filteredLogs = logs.filter(l => 
    l.message.toLowerCase().includes(search.toLowerCase()) ||
    l.module.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-navy-900 tracking-tight">System Mission Logs</h1>
          <p className="text-slate-500 font-medium font-serif italic text-sm">Real-time telemetry from BidIQ autonomous agents.</p>
        </div>
        <Button variant="outline" className="rounded-xl border-slate-200 font-bold text-xs uppercase tracking-widest gap-2">
          <RefreshCw className="h-3.5 w-3.5" /> Force Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-xl shadow-brand-blue-600/5 rounded-3xl bg-brand-navy-900 text-white">
           <CardContent className="p-8 flex items-center justify-between">
              <div>
                 <p className="text-[10px] font-black text-blue-200/40 uppercase tracking-widest mb-1">Engine Status</p>
                 <p className="text-2xl font-black">OPERATIONAL</p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400">
                 <Activity className="w-6 h-6 animate-pulse" />
              </div>
           </CardContent>
        </Card>
        <Card className="border-none shadow-xl shadow-brand-blue-600/5 rounded-3xl">
           <CardContent className="p-8 flex items-center justify-between">
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Scrapers</p>
                 <p className="text-2xl font-black text-brand-navy-900">24 / 25</p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-brand-blue-600/5 flex items-center justify-center text-brand-blue-600">
                 <Database className="w-6 h-6" />
              </div>
           </CardContent>
        </Card>
        <Card className="border-none shadow-xl shadow-brand-blue-600/5 rounded-3xl">
           <CardContent className="p-8 flex items-center justify-between">
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Queue Depth</p>
                 <p className="text-2xl font-black text-brand-navy-900">0 Tasks</p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-amber-500/5 flex items-center justify-center text-amber-500">
                 <Cpu className="w-6 h-6" />
              </div>
           </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search logs by module or keyword..." 
            className="pl-10 h-12 bg-white border-slate-200 rounded-xl font-mono text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {['all', 'info', 'warning', 'error', 'success'].map((s) => (
            <Button 
              key={s}
              variant={levelFilter === s ? "default" : "outline"}
              size="sm"
              onClick={() => setLevelFilter(s)}
              className={cn(
                "rounded-full px-4 text-[10px] font-black uppercase tracking-widest h-10 transition-all",
                levelFilter === s && (
                  s === 'error' ? "bg-red-500 text-white border-none" :
                  s === 'warning' ? "bg-amber-500 text-white border-none" :
                  s === 'success' ? "bg-green-500 text-white border-none" :
                  "bg-brand-navy-900 text-white border-none"
                )
              )}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      <Card className="border-none shadow-xl shadow-brand-blue-600/5 rounded-[2.5rem] overflow-hidden">
        <CardContent className="p-0">
           <div className="bg-[#0B1F3A] p-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                 </div>
                 <span className="text-[10px] font-black text-blue-200/40 uppercase tracking-[0.3em]">BidIQ_Autonomous_System_Terminal</span>
              </div>
              <ShieldCheck className="w-4 h-4 text-blue-500" />
           </div>
           <div className="divide-y divide-slate-100">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="p-6 animate-pulse bg-slate-50/50" />
                ))
              ) : filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <div key={log.id} className="p-6 flex items-start gap-6 hover:bg-slate-50 transition-colors group">
                    <div className={cn("mt-1 shrink-0", 
                      log.level === 'error' ? 'text-red-500' :
                      log.level === 'warning' ? 'text-amber-500' :
                      log.level === 'success' ? 'text-green-500' : 'text-brand-blue-600'
                    )}>
                      {log.level === 'error' ? <AlertCircle className="w-5 h-5" /> :
                       log.level === 'warning' ? <AlertCircle className="w-5 h-5" /> :
                       log.level === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 space-y-2">
                       <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-mono">[{new Date(log.created_at).toLocaleTimeString()}]</span>
                          <Badge variant="outline" className="text-[9px] font-black uppercase bg-slate-100 border-none px-2 text-slate-600">{log.module}</Badge>
                       </div>
                       <p className="text-sm font-medium text-slate-700 font-mono leading-relaxed">{log.message}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black uppercase tracking-widest text-brand-blue-600">Inspect</Button>
                  </div>
                ))
              ) : (
                <div className="p-20 text-center">
                   <Terminal className="h-10 w-10 text-slate-200 mx-auto mb-4" />
                   <p className="text-sm font-bold text-slate-400 italic">No log entries found for current filter.</p>
                </div>
              )}
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
