"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  Handshake, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Mail,
  Phone,
  Shield,
  MapPin,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { updateApplicationStatus } from "@/app/actions/admin";

export default function PartnersAdminPage() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    async function loadApps() {
      setLoading(true);
      let query = supabase
        .from('partner_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;
      
      if (!error) {
        setApps(data || []);
      }
      setLoading(false);
    }
    loadApps();
  }, [supabase, statusFilter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateApplicationStatus(id, newStatus);
      setApps(apps.map(a => a.id === id ? { ...a, status: newStatus } : a));
      toast({ title: "Status Updated", description: `Application is now ${newStatus}.` });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const filteredApps = apps.filter(a => 
    a.company_name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-navy-900 tracking-tight">Partner Review</h1>
          <p className="text-slate-500 font-medium font-serif italic text-sm">Reviewing and onboarding strategic DVBE partners.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search partners by name or email..." 
            className="pl-10 h-12 bg-white border-slate-200 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'approved', 'rejected'].map((s) => (
            <Button 
              key={s}
              variant={statusFilter === s ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(s)}
              className={cn(
                "rounded-full px-4 text-[10px] font-black uppercase tracking-widest h-10",
                statusFilter === s && "bg-brand-blue-600 text-white border-none"
              )}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="h-48 rounded-3xl animate-pulse bg-slate-50 border-none" />
          ))
        ) : filteredApps.length > 0 ? (
          filteredApps.map((app) => (
            <Card key={app.id} className="border-none shadow-xl shadow-brand-blue-600/5 rounded-3xl overflow-hidden group hover:shadow-brand-blue-600/10 transition-all">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="p-8 flex-1 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-2xl font-black text-brand-navy-900 leading-none">{app.company_name}</h3>
                          <Badge className={cn("text-[10px] font-black uppercase tracking-tight", 
                            app.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                            app.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          )}>
                            {app.status}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-slate-500">{app.contact_name} • {app.years_in_business || 0} years in business</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-slate-400">
                            <MoreVertical className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 rounded-xl border-slate-100">
                          <DropdownMenuItem onClick={() => handleStatusChange(app.id, 'approved')} className="text-green-600 font-bold focus:text-green-700">
                            <CheckCircle2 className="mr-2 h-4 w-4" /> Approve Partner
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(app.id, 'rejected')} className="text-red-600 font-bold focus:text-red-700">
                            <XCircle className="mr-2 h-4 w-4" /> Reject Application
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="flex items-center gap-3 text-slate-600">
                        <Mail className="h-4 w-4 text-brand-blue-600" />
                        <span className="text-xs font-medium truncate">{app.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <Phone className="h-4 w-4 text-brand-blue-600" />
                        <span className="text-xs font-medium">{app.phone || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <Shield className="h-4 w-4 text-brand-blue-600" />
                        <span className="text-xs font-medium uppercase">{app.cslb_license || 'No License'}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <Calendar className="h-4 w-4 text-brand-blue-600" />
                        <span className="text-xs font-medium">Applied {new Date(app.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {app.trade_categories?.map((cat: string) => (
                        <Badge key={cat} variant="outline" className="bg-slate-50 border-slate-200 text-slate-600 text-[10px] font-bold">
                          {cat}
                        </Badge>
                      ))}
                      {app.certifications?.map((cert: string) => (
                        <Badge key={cert} className="bg-brand-blue-600/10 text-brand-blue-600 border-none text-[10px] font-black">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="w-full md:w-64 bg-slate-50 p-8 border-l border-slate-100 flex flex-col justify-between">
                     <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Coverage Area</h4>
                        <div className="flex flex-wrap gap-1.5">
                           {app.coverage_area?.map((area: string) => (
                             <Badge key={area} className="bg-white text-slate-600 text-[9px] border-slate-200">{area}</Badge>
                           ))}
                        </div>
                     </div>
                     <Button className="w-full mt-8 bg-brand-navy-900 text-white text-[10px] font-black uppercase tracking-widest h-10 rounded-xl">View Full Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="p-20 text-center border-dashed border-2 bg-slate-50/50 rounded-3xl">
            <div className="max-w-xs mx-auto space-y-4">
              <Handshake className="h-12 w-12 text-slate-200 mx-auto" />
              <h3 className="text-xl font-black text-brand-navy-900 uppercase tracking-tight">No Partners Found</h3>
              <p className="text-sm text-slate-500 font-medium italic">No partner applications match your current search or filter criteria.</p>
              <Button onClick={() => setStatusFilter('all')} variant="link" className="text-brand-blue-600 font-bold">Reset Filters</Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
