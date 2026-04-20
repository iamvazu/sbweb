
"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  Search, 
  MapPin, 
  Globe, 
  Mail, 
  Phone, 
  Briefcase,
  ChevronDown,
  Filter,
  ArrowUpDown,
  Building2,
  Info,
  ExternalLink,
  Target,
  Hash,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";

const PAGE_SIZE = 50;

export default function ProspectRegistryPage() {
  const [prospects, setProspects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  
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
      setProspects(data || []);
      setTotalCount(count || 0);
    }
    setLoading(false);
  }

  const toggleRow = (id: string) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20">
      
      {/* Refined Minimalist Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Contractor Registry</h1>
          <p className="text-sm text-slate-500 mt-1">
            Managing <span className="font-medium text-slate-900">{totalCount.toLocaleString()}</span> businesses. Click any row to expand details.
          </p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <Input 
               placeholder="Search by company name..." 
               value={search}
               onChange={(e) => { setSearch(e.target.value); setPage(0); }}
               className="pl-10 h-10 bg-white border-slate-200 rounded-lg shadow-sm focus:ring-brand-blue-600/20 text-sm"
             />
          </div>
          <Button variant="outline" className="h-10 rounded-lg px-4 border-slate-200 gap-2 text-sm font-medium text-slate-600">
             <Filter className="w-4 h-4" /> Filters
          </Button>
        </div>
      </div>

      {/* Accordion Data Grid */}
      <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
         <CardContent className="p-0">
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider w-[40%]">Company Identity</th>
                        <th className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Certifications</th>
                        <th className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Geography</th>
                        <th className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Main Trade</th>
                        <th className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {loading ? (
                        Array(10).fill(0).map((_, i) => <SkeletonRow key={i} />)
                     ) : prospects.length > 0 ? (
                        prospects.map((p) => (
                           <React.Fragment key={p.id}>
                             <tr 
                               onClick={() => toggleRow(p.id)}
                               className={cn(
                                 "transition-colors cursor-pointer group hover:bg-slate-50/50",
                                 expandedRowId === p.id && "bg-slate-50/80 border-l-4 border-l-brand-blue-600"
                               )}
                             >
                                <td className="px-6 py-5">
                                   <div className="flex flex-col">
                                      <span className={cn(
                                        "text-sm font-semibold text-slate-900 group-hover:text-brand-blue-600 transition-colors",
                                        expandedRowId === p.id && "text-brand-blue-600"
                                      )}>{p.legal_name}</span>
                                      <span className="text-[11px] text-slate-400 mt-0.5">{p.dba || "No DBA Listed"}</span>
                                   </div>
                                </td>
                                <td className="px-6 py-5">
                                   <div className="flex flex-wrap gap-1.5">
                                      {p.cert_types?.slice(0, 2).map((c: string) => (
                                         <Badge key={c} variant="secondary" className="bg-white text-slate-500 border border-slate-200 text-[10px] font-medium px-2 py-0">
                                            {c}
                                         </Badge>
                                      ))}
                                      {p.cert_types?.length > 2 && (
                                         <span className="text-[10px] text-slate-400 font-medium">+{p.cert_types.length - 2}</span>
                                      )}
                                   </div>
                                </td>
                                <td className="px-6 py-5">
                                   <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                                      <MapPin className="w-3.5 h-3.5 text-slate-300" />
                                      <span>{p.city || "CA Territory"}</span>
                                   </div>
                                </td>
                                <td className="px-6 py-5 hidden lg:table-cell">
                                   <span className="text-xs text-slate-500 italic font-medium">
                                      {p.industry_type?.[0] || "General Works"}
                                   </span>
                                </td>
                                <td className="px-6 py-5 text-right">
                                   <div className={cn(
                                     "h-8 w-8 rounded-full flex items-center justify-center transition-all ml-auto",
                                     expandedRowId === p.id ? "bg-brand-blue-600 text-white rotate-180" : "text-slate-300 group-hover:bg-slate-100 group-hover:text-slate-600"
                                   )}>
                                      <ChevronDown className="w-4 h-4" />
                                   </div>
                                </td>
                             </tr>

                             {/* Inline Expansion Area */}
                             <AnimatePresence>
                               {expandedRowId === p.id && (
                                 <tr>
                                   <td colSpan={5} className="p-0 border-b border-slate-200 bg-white">
                                     <motion.div 
                                       initial={{ height: 0, opacity: 0 }}
                                       animate={{ height: "auto", opacity: 1 }}
                                       exit={{ height: 0, opacity: 0 }}
                                       transition={{ duration: 0.3, ease: "easeInOut" }}
                                       className="overflow-hidden"
                                     >
                                       <div className="p-10 bg-slate-50/30 border-y border-slate-100 shadow-inner">
                                          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                             
                                             {/* Column 1: Contact Detail */}
                                             <div className="space-y-6">
                                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                                   <Building className="w-3 h-3 text-brand-blue-600" /> Reach Out
                                                </h4>
                                                <div className="space-y-4">
                                                   <div className="flex items-center gap-3">
                                                      <div className="h-9 w-9 rounded-xl bg-white flex items-center justify-center border border-slate-200 shadow-sm">
                                                         <Mail className="w-4 h-4 text-slate-400" />
                                                      </div>
                                                      <div className="flex flex-col">
                                                         <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Primary Contact</span>
                                                         <span className="text-sm font-semibold text-slate-700">{p.email}</span>
                                                      </div>
                                                   </div>
                                                   <div className="flex items-center gap-3">
                                                      <div className="h-9 w-9 rounded-xl bg-white flex items-center justify-center border border-slate-200 shadow-sm">
                                                         <Phone className="w-4 h-4 text-slate-400" />
                                                      </div>
                                                      <div className="flex flex-col">
                                                         <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Direct Phone</span>
                                                         <span className="text-sm font-semibold text-slate-700">{p.phone || "Not Listed"}</span>
                                                      </div>
                                                   </div>
                                                   <div className="flex items-center gap-3">
                                                      <div className="h-9 w-9 rounded-xl bg-white flex items-center justify-center border border-slate-200 shadow-sm">
                                                         <Globe className="w-4 h-4 text-slate-400" />
                                                      </div>
                                                      <div className="flex flex-col">
                                                         <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Web Address</span>
                                                         <a href={p.website} target="_blank" className="text-sm font-semibold text-brand-blue-600 hover:underline truncate max-w-[200px]">
                                                            {p.website || "No URL Registered"}
                                                         </a>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>

                                             {/* Column 2: Scope & NAICS */}
                                             <div className="space-y-6">
                                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                                   <Briefcase className="w-3 h-3 text-brand-blue-600" /> Scope of Work
                                                </h4>
                                                <div className="space-y-6">
                                                   <div>
                                                      <p className="text-[9px] font-bold text-slate-400 uppercase mb-2">Industry Categories</p>
                                                      <div className="flex flex-wrap gap-2">
                                                         {p.industry_type?.map((i: string) => (
                                                            <Badge key={i} variant="outline" className="text-[10px] font-medium text-slate-500 border-slate-200 bg-white">
                                                               {i}
                                                            </Badge>
                                                         ))}
                                                      </div>
                                                   </div>
                                                   <div>
                                                      <p className="text-[9px] font-bold text-slate-400 uppercase mb-2">NAICS Codes Reference</p>
                                                      <div className="grid grid-cols-2 gap-2">
                                                         {p.naics_codes?.length > 0 ? p.naics_codes.map((n: string) => (
                                                            <div key={n} className="flex items-center gap-2 px-3 py-1.5 bg-brand-blue-50/50 rounded-lg border border-brand-blue-100/50">
                                                               <Hash className="w-2.5 h-2.5 text-brand-blue-500" />
                                                               <span className="text-[11px] font-bold text-brand-blue-900">#{n}</span>
                                                            </div>
                                                         )) : <p className="text-xs italic text-slate-400">None registered</p>}
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>

                                             {/* Column 3: Stats & External Link */}
                                             <div className="space-y-6">
                                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                                   <MapPin className="w-3 h-3 text-brand-blue-600" /> Coverage Area
                                                </h4>
                                                <ScrollArea className="h-40 rounded-xl border border-slate-200 bg-white p-4">
                                                   <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                                                      {p.service_areas?.map((s: string) => (
                                                         <div key={s} className="flex items-center gap-2 text-[10px] font-medium text-slate-500">
                                                            <div className="w-1 h-1 rounded-full bg-slate-300" /> {s}
                                                         </div>
                                                      ))}
                                                   </div>
                                                </ScrollArea>
                                                <div className="flex gap-2">
                                                   <Button 
                                                      variant="outline" 
                                                      className="flex-1 h-10 rounded-xl text-[10px] font-bold uppercase tracking-wider text-slate-600 border-slate-200"
                                                      onClick={() => window.open(`https://caleprocure.ca.gov/core/public/search/supplier/profile/${p.certification_id}`, '_blank')}
                                                   >
                                                      Registry Profile <ExternalLink className="w-3 h-3 ml-2" />
                                                   </Button>
                                                   <Button 
                                                      className="flex-1 h-10 rounded-xl bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-brand-blue-600/20"
                                                   >
                                                      Match <ShieldCheck className="w-3 h-3 ml-2" />
                                                   </Button>
                                                </div>
                                             </div>

                                          </div>
                                       </div>
                                     </motion.div>
                                   </td>
                                 </tr>
                               )}
                             </AnimatePresence>
                           </React.Fragment>
                        ))
                     ) : (
                        <tr>
                           <td colSpan={5} className="py-20 text-center">
                              <Search className="w-10 h-10 text-slate-100 mx-auto mb-4" />
                              <p className="text-sm text-slate-400 font-medium italic">No businesses match that search criteria.</p>
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>

            {/* Pagination Controls */}
            <div className="px-6 py-5 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
               <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Page <span className="text-slate-900">{page + 1}</span> of {Math.ceil(totalCount / PAGE_SIZE)} • {totalCount.toLocaleString()} Total Records
               </p>
               <div className="flex gap-2">
                  <Button 
                    disabled={page === 0} 
                    onClick={() => setPage(p => p - 1)}
                    variant="outline" size="sm" className="h-9 rounded-lg px-4 text-xs font-semibold border-slate-200"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" /> Prev
                  </Button>
                  <Button 
                    disabled={(page + 1) * PAGE_SIZE >= totalCount}
                    onClick={() => setPage(p => p + 1)}
                    variant="outline" size="sm" className="h-9 rounded-lg px-4 text-xs font-semibold border-slate-200"
                  >
                    Next <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
               </div>
            </div>
         </CardContent>
      </Card>

    </div>
  );
}

function SkeletonRow() {
  return (
    <tr className="border-b border-slate-50">
       <td className="px-6 py-5">
          <div className="space-y-2">
             <Skeleton className="h-4 w-48" />
             <Skeleton className="h-3 w-32" />
          </div>
       </td>
       <td className="px-6 py-5">
          <div className="flex gap-2">
             <Skeleton className="h-4 w-12 rounded" />
             <Skeleton className="h-4 w-12 rounded" />
          </div>
       </td>
       <td className="px-6 py-5">
          <Skeleton className="h-4 w-24 rounded" />
       </td>
       <td className="px-6 py-5 hidden lg:table-cell">
          <Skeleton className="h-4 w-40 rounded" />
       </td>
       <td className="px-6 py-5 text-right">
          <Skeleton className="h-8 w-8 ml-auto rounded-full" />
       </td>
    </tr>
  );
}
