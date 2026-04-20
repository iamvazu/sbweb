
"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  Users, 
  Search, 
  MapPin, 
  Globe, 
  Mail, 
  Phone, 
  Briefcase,
  ChevronRight,
  Filter,
  ArrowUpDown,
  Building2,
  Table as TableIcon,
  Info,
  ExternalLink,
  Target,
  Hash,
  ChevronLeft,
  MoreHorizontal,
  Plus,
  ShieldCheck
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
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
    setIsDialogOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Refined Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Contractor Registry</h1>
          <p className="text-sm text-slate-500 mt-1">
            Managing <span className="font-medium text-slate-900">{totalCount.toLocaleString()}</span> certified businesses in the StrongerBuilt database.
          </p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <Input 
               placeholder="Search contractors..." 
               value={search}
               onChange={(e) => { setSearch(e.target.value); setPage(0); }}
               className="pl-10 h-10 bg-white border-slate-200 rounded-lg shadow-sm focus:ring-brand-blue-600/20 text-sm"
             />
          </div>
          <Button variant="outline" className="h-10 rounded-lg px-4 border-slate-200 gap-2 text-sm font-medium">
             <Filter className="w-4 h-4" /> Filters
          </Button>
        </div>
      </div>

      {/* Clean Data Grid */}
      <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
         <CardContent className="p-0">
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-slate-50/50 border-b border-slate-200">
                        <th className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Company Name</th>
                        <th className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Certifications</th>
                        <th className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Main Industry</th>
                        <th className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {loading ? (
                        Array(10).fill(0).map((_, i) => <SkeletonRow key={i} />)
                     ) : prospects.length > 0 ? (
                        prospects.map((p) => (
                           <tr 
                             key={p.id} 
                             onClick={() => handleRowClick(p)}
                             className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                           >
                              <td className="px-6 py-4">
                                 <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-slate-900 group-hover:text-brand-blue-600 transition-colors">{p.legal_name}</span>
                                    <span className="text-[11px] text-slate-400 mt-0.5">{p.dba || "No DBA on file"}</span>
                                 </div>
                              </td>
                              <td className="px-6 py-4">
                                 <div className="flex flex-wrap gap-1.5">
                                    {p.cert_types?.slice(0, 2).map((c: string) => (
                                       <Badge key={c} variant="secondary" className="bg-slate-100 text-slate-600 border-none text-[10px] font-medium px-2 py-0">
                                          {c}
                                       </Badge>
                                    ))}
                                    {p.cert_types?.length > 2 && (
                                       <span className="text-[10px] text-slate-400 font-medium">+{p.cert_types.length - 2} more</span>
                                    )}
                                 </div>
                              </td>
                              <td className="px-6 py-4">
                                 <div className="flex items-center gap-1.5 text-slate-600 text-sm italic">
                                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                    <span>{p.city || "Various"}</span>
                                 </div>
                              </td>
                              <td className="px-6 py-4 hidden lg:table-cell">
                                 <span className="text-xs text-slate-500 truncate max-w-[200px] inline-block font-serif italic">
                                    {p.industry_type?.[0] || "General Contracting"}
                                 </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-md text-slate-400">
                                    <ChevronRight className="w-4 h-4" />
                                 </Button>
                              </td>
                           </tr>
                        ))
                     ) : (
                        <tr>
                           <td colSpan={5} className="py-20 text-center">
                              <div className="flex flex-col items-center gap-3">
                                 <Search className="w-10 h-10 text-slate-100" />
                                 <p className="text-sm text-slate-400 font-medium">No contractors found matching your search.</p>
                              </div>
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>

            {/* Simple Pagination */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
               <p className="text-xs text-slate-500">
                  Showing <span className="font-medium text-slate-900">{page * PAGE_SIZE + 1}</span> to <span className="font-medium text-slate-900">{Math.min((page + 1) * PAGE_SIZE, totalCount)}</span> of <span className="font-medium text-slate-900">{totalCount.toLocaleString()}</span> entries
               </p>
               <div className="flex gap-2">
                  <Button 
                    disabled={page === 0} 
                    onClick={() => setPage(p => p - 1)}
                    variant="outline" size="sm" className="h-8 rounded-md px-3 text-xs gap-1"
                  >
                    <ChevronLeft className="w-3 h-3" /> Previous
                  </Button>
                  <Button 
                    disabled={(page + 1) * PAGE_SIZE >= totalCount}
                    onClick={() => setPage(p => p + 1)}
                    variant="outline" size="sm" className="h-8 rounded-md px-3 text-xs gap-1"
                  >
                    Next <ChevronRight className="w-3 h-3" />
                  </Button>
               </div>
            </div>
         </CardContent>
      </Card>

      {/* Elegant Centered Detail Vault */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
         <DialogContent className="max-w-3xl p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
            {selectedProspect && (
               <div className="flex flex-col max-h-[90vh]">
                  {/* Modal Header Overlay */}
                  <div className="p-8 bg-slate-900 text-white relative">
                     <div className="flex justify-between items-start mb-4">
                        <Badge className="bg-brand-blue-600 text-white hover:bg-brand-blue-600 border-none text-[10px] font-semibold px-2">Verified Prospect</Badge>
                        <span className="text-[10px] font-mono text-slate-400">SYS_ID: {selectedProspect.id.slice(0,8)}</span>
                     </div>
                     <h2 className="text-2xl font-bold tracking-tight">{selectedProspect.legal_name}</h2>
                     <p className="text-sm text-slate-400 mt-1 uppercase tracking-wider font-medium">{selectedProspect.dba || "Legal Entity"}</p>
                     
                     <div className="mt-6 flex flex-wrap gap-2">
                        {selectedProspect.cert_types?.map((c: string) => (
                           <Badge key={c} className="bg-white/10 text-white hover:bg-white/20 border-white/10 text-[10px] font-medium backdrop-blur-sm">
                              {c}
                           </Badge>
                        ))}
                     </div>
                  </div>

                  <ScrollArea className="flex-1 overflow-y-auto bg-white p-8">
                     <div className="space-y-10">
                        
                        {/* Section: Contact & Identity */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-4">
                              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                 <Mail className="w-3 h-3 text-brand-blue-500" /> Communication
                              </h4>
                              <div className="space-y-3">
                                 <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                                       <Mail className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700">{selectedProspect.email}</span>
                                 </div>
                                 <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                                       <Phone className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700">{selectedProspect.phone || "No phone listed"}</span>
                                 </div>
                                 <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                                       <Globe className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <a href={selectedProspect.website} target="_blank" className="text-sm font-medium text-brand-blue-600 hover:underline truncate">
                                       {selectedProspect.website || "No website available"}
                                    </a>
                                 </div>
                              </div>
                           </div>

                           <div className="space-y-4">
                              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                 <Target className="w-3 h-3 text-brand-blue-500" /> Business Metadata
                              </h4>
                              <div className="space-y-3">
                                 <div className="px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mb-1">State Certification ID</p>
                                    <p className="text-sm font-semibold text-slate-900">{selectedProspect.certification_id || "N/A"}</p>
                                 </div>
                                 <div className="px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mb-1">Origin Source</p>
                                    <p className="text-sm font-semibold text-slate-900 capitalize">{selectedProspect.source?.replace(/_/g, ' ') || "CaleProcure Registry"}</p>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <Separator className="bg-slate-100" />

                        {/* Section: Industry & Expertise */}
                        <div className="space-y-4">
                           <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                              <Briefcase className="w-3 h-3 text-brand-blue-500" /> Industry Scope
                           </h4>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">Trade Classifications</p>
                                 <div className="flex flex-wrap gap-2">
                                    {selectedProspect.industry_type?.map((i: string) => (
                                       <Badge key={i} variant="outline" className="text-[10px] font-medium text-slate-600 border-slate-200">
                                          {i}
                                       </Badge>
                                    ))}
                                 </div>
                              </div>
                              <div>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">NAICS Registry</p>
                                 <div className="flex flex-wrap gap-2">
                                    {selectedProspect.naics_codes?.length > 0 ? selectedProspect.naics_codes.map((n: string) => (
                                       <Badge key={n} className="bg-blue-50 text-brand-blue-700 hover:bg-blue-100 border-none text-[10px] font-bold">
                                          #{n}
                                       </Badge>
                                    )) : <p className="text-xs italic text-slate-400 font-serif">None provided</p>}
                                 </div>
                              </div>
                           </div>
                        </div>

                        <Separator className="bg-slate-100" />

                        {/* Section: Service Footprint */}
                        <div className="space-y-4">
                           <div className="flex justify-between items-end">
                              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                 <MapPin className="w-3 h-3 text-brand-blue-500" /> Service Footprint
                              </h4>
                              <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-50 px-2 py-0.5 rounded border border-slate-100">{selectedProspect.service_areas?.length || 0} CA Counties</span>
                           </div>
                           <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                 {selectedProspect.service_areas?.map((s: string) => (
                                    <div key={s} className="flex items-center gap-2 group">
                                       <div className="h-1 w-1 rounded-full bg-brand-blue-400" />
                                       <span className="text-[11px] font-medium text-slate-600 truncate">{s}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>

                     </div>
                  </ScrollArea>

                  {/* Actions Footer */}
                  <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3 justify-end">
                     <Button 
                       variant="outline" 
                       className="rounded-lg h-11 px-6 text-xs font-semibold uppercase tracking-wider text-slate-600"
                       onClick={() => window.open(`https://caleprocure.ca.gov/core/public/search/supplier/profile/${selectedProspect.certification_id}`, '_blank')}
                     >
                        View External Profile <ExternalLink className="w-3.5 h-3.5 ml-2" />
                     </Button>
                     <Button 
                       className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white rounded-lg h-11 px-8 text-xs font-semibold uppercase tracking-wider shadow-lg shadow-brand-blue-600/20"
                     >
                        Engage Prospect <ShieldCheck className="w-3.5 h-3.5 ml-2" />
                     </Button>
                  </div>
               </div>
            )}
         </DialogContent>
      </Dialog>

    </div>
  );
}

function SkeletonRow() {
  return (
    <tr className="border-b border-slate-50">
       <td className="px-6 py-4">
          <div className="space-y-2">
             <Skeleton className="h-4 w-40" />
             <Skeleton className="h-3 w-20" />
          </div>
       </td>
       <td className="px-6 py-4">
          <div className="flex gap-2">
             <Skeleton className="h-4 w-12 rounded" />
             <Skeleton className="h-4 w-12 rounded" />
          </div>
       </td>
       <td className="px-6 py-4">
          <Skeleton className="h-4 w-24 rounded" />
       </td>
       <td className="px-6 py-4 lg:table-cell">
          <Skeleton className="h-4 w-32 rounded" />
       </td>
       <td className="px-6 py-4 text-right">
          <Skeleton className="h-8 w-8 ml-auto rounded" />
       </td>
    </tr>
  );
}
