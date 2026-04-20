
"use client";

import React, { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  Users, 
  Search, 
  MapPin, 
  Award, 
  Globe, 
  Mail, 
  Phone, 
  Briefcase,
  ChevronRight,
  Filter,
  ArrowUpDown,
  Building2,
  Table as TableIcon,
  LayoutGrid,
  Info,
  ExternalLink,
  Target,
  FileText,
  BadgeCheck,
  Navigation,
  Globe2,
  Hash
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const PAGE_SIZE = 50;

export default function ProspectRegistryPage() {
  const [prospects, setProspects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedProspect, setSelectedProspect] = useState<any>(null);
  
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    loadProspects();
  }, [page, search]);

  async function loadProspects() {
    setLoading(true);
    let query = supabase
      .from('prospects')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.ilike('legal_name', `%${search}%`);
    }

    const { data, count, error } = await query
      .order('legal_name', { ascending: true })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      const results = data || [];
      setProspects(results);
      setTotalCount(count || 0);
      
      // Auto-select first one if nothing is selected
      if (results.length > 0 && !selectedProspect) {
        setSelectedProspect(results[0]);
      }
    }
    setLoading(false);
  }

  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col gap-6 animate-in fade-in duration-700 overflow-hidden">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-black text-brand-navy-900 tracking-tighter uppercase italic">
            Prospect <span className="text-amber-500 underline decoration-2 underline-offset-4">Registry Hub</span>
          </h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">
             Command Center for {totalCount.toLocaleString()} high-intent contractors
          </p>
        </div>
        
        <div className="w-full md:w-80 relative group">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
           <Input 
             placeholder="Seach by name..." 
             value={search}
             onChange={(e) => { setSearch(e.target.value); setPage(0); }}
             className="pl-11 h-10 bg-white border-slate-200 rounded-xl shadow-sm focus:ring-amber-500/20 focus:border-amber-500 font-bold text-xs"
           />
        </div>
      </div>

      {/* Split Pane Container */}
      <div className="flex-1 flex gap-8 min-h-0 overflow-hidden">
        
        {/* Left Pane: The Master List (40%) */}
        <div className="w-full lg:w-[40%] flex flex-col min-h-0 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-brand-blue-600/5 overflow-hidden">
           
           <div className="p-5 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center shrink-0">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Master Feed</span>
              <div className="flex gap-1">
                 <Button 
                   disabled={page === 0} 
                   onClick={() => setPage(p => p - 1)}
                   variant="ghost" className="h-6 w-6 p-0"
                 >
                   <ChevronRight className="w-4 h-4 rotate-180" />
                 </Button>
                 <span className="text-[10px] font-bold text-slate-400 px-2 py-0.5">{page+1}</span>
                 <Button 
                   disabled={(page + 1) * PAGE_SIZE >= totalCount}
                   onClick={() => setPage(p => p + 1)}
                   variant="ghost" className="h-6 w-6 p-0"
                 >
                   <ChevronRight className="w-4 h-4" />
                 </Button>
              </div>
           </div>

           <ScrollArea className="flex-1 overflow-y-auto">
              <div className="divide-y divide-slate-50">
                 {loading ? (
                    Array(10).fill(0).map((_, i) => <SkeletonRow key={i} />)
                 ) : prospects.length > 0 ? (
                    prospects.map((p) => (
                      <button 
                        key={p.id} 
                        onClick={() => setSelectedProspect(p)}
                        className={cn(
                          "w-full text-left px-6 py-5 transition-all flex items-center justify-between group",
                          selectedProspect?.id === p.id 
                            ? "bg-slate-50 border-r-4 border-amber-500" 
                            : "hover:bg-slate-50/50 border-r-4 border-transparent"
                        )}
                      >
                         <div className="space-y-1 min-w-0 pr-4">
                            <h4 className={cn(
                              "font-black text-sm tracking-tighter truncate leading-none capitalize",
                              selectedProspect?.id === p.id ? "text-amber-600" : "text-brand-navy-900"
                            )}>
                               {p.legal_name.toLowerCase()}
                            </h4>
                            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter italic">
                               <span className="flex items-center gap-1"><MapPin className="w-2.5 h-2.5" /> {p.city || "CA"}</span>
                               <span className="truncate">{p.cert_types?.slice(0,2).join(", ")}</span>
                            </div>
                         </div>
                         <ChevronRight className={cn(
                            "w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0",
                            selectedProspect?.id === p.id ? "text-amber-500" : "text-slate-200"
                         )} />
                      </button>
                    ))
                 ) : (
                    <div className="p-20 text-center space-y-4">
                       <Search className="w-8 h-8 text-slate-200 mx-auto" />
                       <p className="text-[10px] text-slate-400 font-bold uppercase italic tracking-widest leading-relaxed">No contractors matched<br/>"{search}"</p>
                    </div>
                 )}
              </div>
           </ScrollArea>
        </div>

        {/* Right Pane: Tactical Detail Board (60%) */}
        <div className="hidden lg:flex flex-1 flex-col min-h-0 bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-brand-blue-600/5 overflow-hidden">
           {selectedProspect ? (
             <div className="h-full flex flex-col min-h-0">
                {/* Board Header */}
                <div className="p-8 bg-brand-navy-900 text-white space-y-6 shrink-0 shadow-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -translate-y-16 translate-x-16 blur-3xl" />
                   <div className="flex justify-between items-start relative z-10">
                      <Badge className="bg-white/10 text-white border-none text-[8px] font-black uppercase tracking-widest px-2 h-4">Contractor Portfolio</Badge>
                      <div className="flex items-center gap-2">
                        <p className="text-[9px] font-black text-amber-500 uppercase tracking-widest">ID: {selectedProspect.certification_id || "PENDING"}</p>
                      </div>
                   </div>
                   <div className="space-y-4 relative z-10">
                      <h2 className="text-4xl font-black tracking-tighter leading-none italic uppercase pr-10">
                         {selectedProspect.legal_name}
                      </h2>
                      <div className="flex flex-wrap gap-2">
                         {selectedProspect.cert_types?.map((c: string) => (
                           <Badge key={c} className="bg-amber-500 text-brand-navy-900 border-none font-black text-[10px] tracking-tight uppercase px-3 h-6 rounded-lg">
                              {c}
                           </Badge>
                         ))}
                      </div>
                   </div>
                </div>

                {/* Scrolled Content */}
                <div className="flex-1 p-10 overflow-y-auto bg-white">
                   <div className="space-y-12 pb-10">
                      
                      {/* Section: Executive Data */}
                      <section className="space-y-8">
                         <div className="flex items-center gap-4">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                               <Info className="w-3 h-3 text-brand-blue-600" /> Executive Overview
                            </h4>
                            <Separator className="flex-1" />
                         </div>
                         
                         <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                            {[
                              { label: "Primary Email", value: selectedProspect.email, icon: Mail },
                              { label: "Phone", value: selectedProspect.phone || "Not Provided", icon: Phone },
                              { label: "Corporate Link", value: selectedProspect.website || "No Website", icon: Globe, isLink: true },
                              { label: "Registry Source", value: selectedProspect.source?.replace(/_/g, ' '), icon: Building2, isCapitalize: true }
                            ].map((item, i) => (
                              <div key={i} className="space-y-2">
                                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em]">{item.label}</p>
                                 <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center text-amber-600 border border-slate-100">
                                       <item.icon className="w-3.5 h-3.5" />
                                    </div>
                                    <p className={cn(
                                      "text-sm font-black tracking-tight",
                                      item.isLink ? "text-brand-blue-600 hover:underline cursor-pointer" : "text-brand-navy-900",
                                      item.isCapitalize && "capitalize"
                                    )}>
                                       {item.value || "N/A"}
                                    </p>
                                 </div>
                              </div>
                            ))}
                         </div>
                      </section>

                      {/* Section: NAICS & Industry */}
                      <section className="space-y-8">
                         <div className="flex items-center gap-4">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                               <Briefcase className="w-3 h-3 text-brand-blue-600" /> Trade Classifications
                            </h4>
                            <Separator className="flex-1" />
                         </div>

                         <div className="space-y-6">
                            <div>
                               <p className="text-[9px] font-black text-slate-400 uppercase mb-3 px-1">Industry Type</p>
                               <div className="flex flex-wrap gap-2">
                                  {selectedProspect.industry_type?.map((i: string) => (
                                    <Badge key={i} variant="secondary" className="bg-slate-100/50 text-slate-500 border border-slate-200/50 text-[10px] font-bold px-3 py-1 rounded-xl">
                                       {i}
                                    </Badge>
                                  ))}
                               </div>
                            </div>
                            <div>
                               <p className="text-[9px] font-black text-slate-400 uppercase mb-3 px-1">NAICS Codes</p>
                               <div className="grid grid-cols-3 gap-3">
                                  {selectedProspect.naics_codes?.length > 0 ? selectedProspect.naics_codes.map((n: string) => (
                                    <div key={n} className="flex items-center gap-3 bg-brand-blue-50/30 p-3 rounded-2xl border border-brand-blue-100/30">
                                       <Hash className="w-3 h-3 text-brand-blue-600" />
                                       <span className="text-xs font-black text-brand-blue-900">{n}</span>
                                    </div>
                                  )) : <p className="text-xs italic text-slate-300">No NAICS codes on file</p>}
                               </div>
                            </div>
                         </div>
                      </section>

                      {/* Section: Geography Coverage */}
                      <section className="space-y-8">
                          <div className="flex items-center gap-4">
                             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Navigation className="w-3 h-3 text-brand-blue-600" /> Service Blueprint
                             </h4>
                             <Separator className="flex-1" />
                             <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50 text-[10px] font-black h-6">{selectedProspect.service_areas?.length || 0} Counties</Badge>
                          </div>
                          
                          <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100 backdrop-blur-sm">
                             <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2">
                                {selectedProspect.service_areas?.map((s: string) => (
                                  <div key={s} className="flex items-center gap-3 text-[11px] font-bold text-slate-600">
                                     <div className="h-1.5 w-1.5 rounded-full bg-amber-500 shadow-lg shadow-amber-500/40" /> {s}
                                  </div>
                                ))}
                             </div>
                          </div>
                      </section>

                   </div>
                </div>

                {/* Sticky Action View */}
                <div className="p-8 bg-slate-50/80 border-t border-slate-100 backdrop-blur-md shrink-0">
                   <div className="flex gap-4">
                      <Button 
                        variant="outline"
                        className="flex-1 h-14 bg-white border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-brand-navy-900 hover:bg-slate-50 transition-all shadow-sm"
                        onClick={() => window.open(`https://caleprocure.ca.gov/core/public/search/supplier/profile/${selectedProspect.certification_id}`, '_blank')}
                      >
                         Source Certification <ExternalLink className="w-3.5 h-3.5 ml-3" />
                      </Button>
                      <Button 
                        className="flex-1 h-14 bg-amber-500 hover:bg-amber-400 text-brand-navy-900 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-amber-500/20"
                      >
                         Match with RFP <Target className="w-4 h-4 ml-3" />
                      </Button>
                   </div>
                </div>
             </div>
           ) : (
             <div className="h-full flex items-center justify-center bg-slate-50/30">
                <div className="text-center space-y-4">
                   <Users className="w-16 h-16 text-slate-100 mx-auto" />
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Command Board Offline</p>
                </div>
             </div>
           )}
        </div>

      </div>

    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="px-6 py-5 flex items-center justify-between">
       <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-24" />
       </div>
       <Skeleton className="h-4 w-4" />
    </div>
  );
}
