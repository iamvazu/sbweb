
"use client";

import React, { useEffect, useState } from "react";
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
  Info
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription 
} from "@/components/ui/sheet";
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
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
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

  const handleRowClick = (prospect: any) => {
    setSelectedProspect(prospect);
    setIsSheetOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 h-[calc(100vh-10rem)] flex flex-col">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-2xl bg-brand-navy-900 flex items-center justify-center text-white shadow-lg">
               <Users className="w-5 h-5" />
            </div>
            <h1 className="text-4xl font-black text-brand-navy-900 tracking-tighter uppercase italic">
              Prospect <span className="text-amber-500 underline decoration-4 underline-offset-8">Registry</span>
            </h1>
          </div>
          <p className="text-slate-500 font-medium font-serif italic text-sm">
             Exploring the global database of {totalCount.toLocaleString()} high-intent contractors.
          </p>
        </div>
        
        <div className="w-full md:w-96 relative group">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
           <Input 
             placeholder="Search by company name..." 
             value={search}
             onChange={(e) => { setSearch(e.target.value); setPage(0); }}
             className="pl-12 h-12 bg-white border-slate-200 rounded-2xl shadow-sm focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
           />
        </div>
      </div>

      {/* Main Table View */}
      <Card className="border-none shadow-2xl shadow-brand-blue-600/5 rounded-[2.5rem] overflow-hidden flex-1 flex flex-col bg-white">
         <CardContent className="p-0 flex-1 flex flex-col overflow-hidden">
            
            {/* Table Header Labels */}
            <div className="grid grid-cols-12 gap-4 px-8 py-5 bg-slate-50/50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
               <div className="col-span-5 flex items-center gap-2">Company Entity <ArrowUpDown className="w-3 h-3" /></div>
               <div className="col-span-3">Certifications</div>
               <div className="col-span-2 text-center">Geography</div>
               <div className="col-span-2 text-right">Action</div>
            </div>

            <ScrollArea className="flex-1">
               <div className="divide-y divide-slate-50">
                  {loading ? (
                    Array(8).fill(0).map((_, i) => <SkeletonRow key={i} />)
                  ) : prospects.length > 0 ? (
                    prospects.map((p) => (
                      <div 
                        key={p.id} 
                        onClick={() => handleRowClick(p)}
                        className="grid grid-cols-12 gap-4 px-8 py-5 hover:bg-slate-50/30 transition-colors cursor-pointer group items-center"
                      >
                         <div className="col-span-5 space-y-1">
                            <h4 className="font-black text-brand-navy-900 tracking-tight group-hover:text-amber-600 transition-colors">{p.legal_name}</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter truncate">{p.dba || "No DBA"}</p>
                         </div>
                         <div className="col-span-3 flex flex-wrap gap-1.5">
                            {p.cert_types?.slice(0, 3).map((c: string) => (
                              <Badge key={c} variant="secondary" className="bg-brand-navy-900 text-white border-none text-[8px] font-black px-1.5 h-4 uppercase">
                                {c}
                              </Badge>
                            ))}
                         </div>
                         <div className="col-span-2 text-center">
                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-tight flex items-center justify-center gap-1">
                               <MapPin className="w-3 h-3 text-amber-500" /> {p.city || "Unknown"}
                            </p>
                         </div>
                         <div className="col-span-2 text-right">
                            <Button variant="ghost" size="sm" className="rounded-xl h-8 px-4 text-slate-400 group-hover:text-brand-navy-900 font-black text-[9px] uppercase tracking-widest border border-transparent group-hover:border-slate-200">
                               Details <ChevronRight className="w-3 h-3 ml-1" />
                            </Button>
                         </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-20 text-center space-y-4">
                       <Search className="w-12 h-12 text-slate-100 mx-auto" />
                       <p className="text-slate-400 font-bold italic">No contractors found matching "{search}"</p>
                    </div>
                  )}
               </div>
            </ScrollArea>

            {/* Pagination Panel */}
            <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Showing {page * PAGE_SIZE + 1} - {Math.min((page + 1) * PAGE_SIZE, totalCount)} of {totalCount.toLocaleString()}
               </p>
               <div className="flex gap-2">
                  <Button 
                    disabled={page === 0} 
                    onClick={() => setPage(p => p - 1)}
                    variant="outline" className="h-10 rounded-xl px-6 border-slate-200 font-black text-[9px] uppercase tracking-widest"
                  >
                    Previous Page
                  </Button>
                  <Button 
                    disabled={(page + 1) * PAGE_SIZE >= totalCount}
                    onClick={() => setPage(p => p + 1)}
                    className="h-10 rounded-xl px-6 bg-brand-navy-900 text-white font-black text-[9px] uppercase tracking-widest shadow-lg"
                  >
                    Next Page
                  </Button>
               </div>
            </div>
         </CardContent>
      </Card>

      {/* Detail Slide-over */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
         <SheetContent className="w-full sm:max-w-2xl border-none p-0 rounded-l-[3rem] overflow-hidden bg-white shadow-2xl">
            {selectedProspect && (
              <div className="h-full flex flex-col">
                 <div className="p-10 bg-brand-navy-900 text-white space-y-6">
                    <div className="flex justify-between items-start">
                       <Badge variant="outline" className="text-white border-white/20 text-[9px] font-black uppercase tracking-widest">Contractor Profile</Badge>
                       <p className="text-[10px] font-bold text-blue-200/60 uppercase">Registry ID: {selectedProspect.certification_id || "N/A"}</p>
                    </div>
                    <h2 className="text-3xl font-black tracking-tighter leading-none italic">{selectedProspect.legal_name}</h2>
                    <div className="flex flex-wrap gap-2">
                       {selectedProspect.cert_types?.map((c: string) => (
                         <Badge key={c} className="bg-amber-500 text-brand-navy-900 border-none font-black text-[10px] tracking-tight uppercase">{c}</Badge>
                       ))}
                    </div>
                 </div>

                 <ScrollArea className="flex-1 p-10">
                    <div className="space-y-12">
                       
                       {/* Core Data */}
                       <section className="space-y-6">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                             <Info className="w-3 h-3 text-brand-blue-600" /> Executive Overview
                          </h4>
                          <div className="grid grid-cols-2 gap-8">
                             <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase">Primary Email</p>
                                <p className="text-sm font-bold text-brand-navy-900 flex items-center gap-2">
                                   <Mail className="w-3.5 h-3.5 text-amber-500" /> {selectedProspect.email}
                                </p>
                             </div>
                             <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase">Contact Phone</p>
                                <p className="text-sm font-bold text-brand-navy-900 flex items-center gap-2">
                                   <Phone className="w-3.5 h-3.5 text-amber-500" /> {selectedProspect.phone || "Not Provided"}
                                </p>
                             </div>
                             <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase">Website</p>
                                <p className="text-sm font-bold text-blue-600 truncate flex items-center gap-2">
                                   <Globe className="w-3.5 h-3.5" /> 
                                   <a href={selectedProspect.website} target="_blank" className="hover:underline">{selectedProspect.website || "N/A"}</a>
                                </p>
                             </div>
                             <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase">Source Origin</p>
                                <p className="text-xs font-bold text-slate-600 uppercase">{selectedProspect.source?.replace(/_/g, ' ') || "CaleProcure"}</p>
                             </div>
                          </div>
                       </section>

                       <Separator />

                       {/* Industry & Services */}
                       <section className="space-y-6">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                             <Briefcase className="w-3 h-3 text-brand-blue-600" /> Classification & Trade
                          </h4>
                          <div className="space-y-4">
                             <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Industry Type</p>
                                <div className="flex flex-wrap gap-2">
                                   {selectedProspect.industry_type?.map((i: string) => (
                                     <Badge key={i} variant="secondary" className="bg-slate-100 text-slate-600 border-none text-[9px] font-black px-2">{i}</Badge>
                                   ))}
                                </div>
                             </div>
                             <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">NAICS Codes</p>
                                <div className="flex flex-wrap gap-2">
                                   {selectedProspect.naics_codes?.length > 0 ? selectedProspect.naics_codes.map((n: string) => (
                                     <Badge key={n} className="bg-blue-50 text-blue-600 border-none text-[9px] font-black px-2">{n}</Badge>
                                   )) : <p className="text-xs italic text-slate-400">Not provided</p>}
                                </div>
                             </div>
                          </div>
                       </section>

                       <Separator />

                       {/* Geography */}
                       <section className="space-y-6">
                          <div className="flex justify-between items-end">
                             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                <MapPin className="w-3 h-3 text-brand-blue-600" /> Service Areas
                             </h4>
                             <p className="text-[9px] font-bold text-amber-600 uppercase">{selectedProspect.service_areas?.length || 0} Counties</p>
                          </div>
                          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                             <div className="flex flex-wrap gap-3">
                                {selectedProspect.service_areas?.map((s: string) => (
                                  <div key={s} className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                                     <div className="h-1 w-1 rounded-full bg-amber-500" /> {s}
                                  </div>
                                ))}
                             </div>
                          </div>
                       </section>

                    </div>
                 </ScrollArea>

                 <div className="p-10 border-t border-slate-100 bg-slate-50/50">
                    <Button 
                      className="w-full bg-brand-navy-900 text-white rounded-2xl h-14 font-black uppercase text-xs tracking-widest shadow-xl shadow-brand-navy-900/10"
                      onClick={() => {
                        window.open(`https://caleprocure.ca.gov/core/public/search/supplier/profile/${selectedProspect.certification_id}`, '_blank');
                      }}
                    >
                       Open CaleProcure Profile <ExternalLink className="w-4 h-4 ml-3" />
                    </Button>
                 </div>
              </div>
            )}
         </SheetContent>
      </Sheet>

    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="grid grid-cols-12 gap-4 px-8 py-5 items-center">
       <div className="col-span-5 space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-16" />
       </div>
       <div className="col-span-3 flex gap-2">
          <Skeleton className="h-4 w-12 rounded-lg" />
          <Skeleton className="h-4 w-12 rounded-lg" />
       </div>
       <div className="col-span-2 text-center">
          <Skeleton className="h-4 w-20 mx-auto rounded-lg" />
       </div>
       <div className="col-span-2 text-right">
          <Skeleton className="h-8 w-24 ml-auto rounded-xl" />
       </div>
    </div>
  );
}
