"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  Users, 
  Briefcase, 
  CreditCard, 
  Handshake, 
  CheckCircle2, 
  Clock, 
  XCircle,
  TrendingUp,
  FileText,
  Search
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { updateApplicationStatus } from "@/app/actions/admin";
import { cn } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [partners, setPartners] = useState<any[]>([]);
  const [engagements, setEngagements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    async function checkAdminAndLoadData() {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user || user.email !== 'info@strongerbuilt.us') {
        window.location.href = "/portal/vendor";
        return;
      }

      setAuthorized(true);

      // Load Stats
      const [
        { count: userCount },
        { count: bidCount },
        { count: hiredCount },
        { data: recentPartners },
        { data: recentEngagements }
      ] = await Promise.all([
        supabase.from('users').select('*', { count: 'exact', head: true }),
        supabase.from('bids').select('*', { count: 'exact', head: true }),
        supabase.from('service_engagements').select('*', { count: 'exact', head: true }),
        supabase.from('partner_applications').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('service_engagements').select('*, users(business_name), bids(event_name)').order('created_at', { ascending: false }).limit(5),
      ]);

      setStats({
        users: userCount,
        bids: bidCount,
        hired: hiredCount,
      });
      setPartners(recentPartners || []);
      setEngagements(recentEngagements || []);
      setLoading(false);
    }

    checkAdminAndLoadData();
  }, [supabase]);

  const handlePartnerAction = async (id: string, status: string) => {
    try {
      await updateApplicationStatus(id, status);
      toast({ title: "Updated", description: `Application ${status}.` });
      setPartners(partners.map(p => p.id === id ? { ...p, status } : p));
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  if (!authorized || loading) return <AdminSkeleton />;

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* Admin Header */}
      <div>
        <h1 className="text-3xl font-black text-brand-navy-900 tracking-tight">Admin Mission Control</h1>
        <p className="text-slate-500 font-medium font-serif italic text-sm">Managing the global DVBE infrastructure network.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Platform Users", value: stats.users, icon: Users, color: "text-blue-600" },
          { label: "Global Bids Indexed", value: stats.bids, icon: Search, color: "text-brand-blue-600" },
          { label: "Hired Engagements", value: stats.hired, icon: CreditCard, color: "text-success" },
        ].map((s) => (
          <Card key={s.label} className="border-none shadow-xl shadow-brand-blue-600/5 rounded-3xl">
             <CardContent className="p-8 flex items-center justify-between">
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                   <p className="text-4xl font-black text-brand-navy-900 leading-none">{s.value}</p>
                </div>
                <div className={cn("h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center", s.color)}>
                   <s.icon className="w-6 h-6" />
                </div>
             </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
         
         {/* Recent Partner Applications */}
         <Card className="border-none shadow-xl shadow-brand-blue-600/5 rounded-[2.5rem] overflow-hidden">
            <CardHeader className="bg-slate-50/50 p-8 flex flex-row items-center justify-between border-b border-slate-100">
               <CardTitle className="text-lg font-black text-brand-navy-900 uppercase tracking-tight flex items-center gap-2">
                  <Handshake className="w-5 h-5 text-brand-blue-600" />
                  Partner Applicants
               </CardTitle>
               <Button variant="ghost" size="sm" className="text-brand-blue-600 font-bold hover:bg-brand-blue-600/5">View All</Button>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-slate-50">
                  {partners.length > 0 ? (
                    partners.map(p => (
                      <div key={p.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50/30 transition-colors">
                         <div className="space-y-1">
                            <h4 className="font-bold text-brand-navy-900">{p.company_name}</h4>
                            <p className="text-xs text-slate-500 font-medium">{p.contact_name} • {p.email}</p>
                            <div className="flex gap-2 pt-1">
                               {p.trade_categories?.slice(0, 3).map((t: string) => (
                                 <Badge key={t} variant="secondary" className="text-[9px] font-bold bg-white">{t}</Badge>
                               ))}
                            </div>
                         </div>
                         <div className="flex gap-2">
                            {p.status === 'pending' ? (
                              <>
                                <Button onClick={() => handlePartnerAction(p.id, 'approved')} size="sm" className="bg-success hover:bg-green-700 h-8 rounded-lg text-[10px] font-black uppercase tracking-tight">Approve</Button>
                                <Button onClick={() => handlePartnerAction(p.id, 'rejected')} variant="outline" size="sm" className="border-red-100 text-red-500 hover:bg-red-50 h-8 rounded-lg text-[10px] font-black uppercase tracking-tight">Deny</Button>
                              </>
                            ) : (
                              <Badge className={cn("text-[9px] font-black uppercase tracking-tight", 
                                p.status === 'approved' ? 'bg-success/10 text-success' : 'bg-red-50 text-red-600'
                              )}>
                                {p.status}
                              </Badge>
                            )}
                         </div>
                      </div>
                    ))
                  ) : (
                    <p className="p-12 text-center text-slate-400 font-bold italic text-sm">No recent applicants.</p>
                  )}
               </div>
            </CardContent>
         </Card>

         {/* Recent Hired Engagements */}
         <Card className="border-none shadow-xl shadow-brand-blue-600/5 rounded-[2.5rem] overflow-hidden">
            <CardHeader className="bg-slate-50/50 p-8 flex flex-row items-center justify-between border-b border-slate-100">
               <CardTitle className="text-lg font-black text-brand-navy-900 uppercase tracking-tight flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-success" />
                  Hired Assignments
               </CardTitle>
               <Button variant="ghost" size="sm" className="text-brand-blue-600 font-bold hover:bg-brand-blue-600/5">View All</Button>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-slate-50">
                  {engagements.length > 0 ? (
                    engagements.map(e => (
                      <div key={e.id} className="p-6 hover:bg-slate-50/30 transition-colors">
                         <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-brand-navy-900">{e.users?.business_name}</h4>
                            <p className="text-xs font-black text-success">Paid: ${(e.price_agreed/1).toLocaleString()}</p>
                         </div>
                         <p className="text-xs text-slate-500 font-medium mb-3 truncate max-w-sm">{e.bids?.event_name}</p>
                         <div className="flex justify-between items-center">
                            <Badge variant="outline" className="text-[9px] font-black uppercase tracking-tight text-brand-blue-600 bg-brand-blue-600/5 border-none">
                               Intake Phase
                            </Badge>
                            <span className="text-[10px] font-bold text-slate-400">
                               {new Date(e.created_at).toLocaleDateString()}
                            </span>
                         </div>
                      </div>
                    ))
                  ) : (
                    <p className="p-12 text-center text-slate-400 font-bold italic text-sm">No active engagements.</p>
                  )}
               </div>
            </CardContent>
         </Card>

      </div>

    </div>
  );
}

function AdminSkeleton() {
  return (
    <div className="space-y-10">
      <Skeleton className="h-10 w-48" />
      <div className="grid grid-cols-3 gap-6">
        <Skeleton className="h-32 rounded-3xl" />
        <Skeleton className="h-32 rounded-3xl" />
        <Skeleton className="h-32 rounded-3xl" />
      </div>
      <div className="grid grid-cols-2 gap-8">
        <Skeleton className="h-[400px] rounded-[2.5rem]" />
        <Skeleton className="h-[400px] rounded-[2.5rem]" />
      </div>
    </div>
  );
}
