"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  Users, 
  Briefcase, 
  Handshake, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  Search,
  Target,
  Shield,
  Download,
  MoreVertical,
  ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { updateEngagementStatus, updateApplicationStatus } from "@/app/actions/admin";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({
    engagements: [],
    users: [],
    bids: [],
    partners: [],
    metrics: {}
  });
  const [search, setSearch] = useState("");
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || (!user.email?.endsWith('@strongerbuilt.us') && user.email !== 'roy@strongerbuilt.us' && user.email !== 'crazyme2207@gmail.com')) {
        window.location.href = "/portal/vendor";
        return;
      }

      // 1. Load Data in Parallel
      const [
        { data: engagements },
        { data: users },
        { data: bids },
        { data: partners }
      ] = await Promise.all([
        supabase.from('service_engagements').select('*, users(business_name, email), bids(event_name, end_date)').order('created_at', { ascending: false }),
        supabase.from('users').select('*, user_bid_matches(fit_score), service_engagements(count)').order('created_at', { ascending: false }),
        supabase.from('bids').select('*').order('last_updated', { ascending: false }).limit(200),
        supabase.from('partner_applications').select('*').order('created_at', { ascending: false }).limit(10)
      ]);

      // 2. Calculate Metrics
      const totalUsers = users?.length || 0;
      const proUsers = users?.filter(u => u.subscription_tier === 'pro').length || 0;
      const scoutUsers = users?.filter(u => u.subscription_tier === 'scout').length || 0;
      const activeEngagements = engagements?.filter(e => ['intake', 'in_progress'].includes(e.status)).length || 0;
      
      // Calculate Revenue breakdowns
      const totalRevenue = engagements?.filter(e => e.payment_status === 'paid').reduce((sum, e) => sum + (e.price_agreed || 0), 0) || 0;
      const scoutRevenue = (scoutUsers * 49);
      const proRevenue = (proUsers * 99);
      const serviceRevenue = engagements?.filter(e => e.payment_status === 'paid' && e.tier === 'rfp_writing').reduce((sum, e) => sum + (e.price_agreed || 0), 0) || 0;

      const allMatches = users?.flatMap(u => u.user_bid_matches || []) || [];
      const fitScores = allMatches.map(m => m.fit_score).filter(s => s !== null);
      const avgFit = fitScores.length > 0 ? Math.round(fitScores.reduce((a, b) => a + b, 0) / fitScores.length) : 0;

      setData({
        engagements: engagements || [],
        users: users || [],
        bids: bids || [],
        partners: partners || [],
        metrics: {
          totalUsers,
          proUsers,
          scoutUsers,
          activeEngagements,
          revenue: totalRevenue,
          scoutRevenue,
          proRevenue,
          serviceRevenue,
          avgFit,
          prospectCount: 21255 // Hardcoded as per screenshot request for prospect DB
        }
      });
      setLoading(false);
    }
    loadData();
  }, [supabase]);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await updateEngagementStatus(id, status);
      setData((prev: any) => ({
        ...prev,
        engagements: prev.engagements.map((e: any) => e.id === id ? { ...e, status } : e)
      }));
      toast({ title: "Status Updated", description: `Engagement is now ${status}.` });
    } catch (err: any) {
      toast({ title: "Update Failed", description: err.message, variant: "destructive" });
    }
  };

  const handlePartnerAction = async (id: string, status: string) => {
    try {
      await updateApplicationStatus(id, status);
      toast({ title: "Updated", description: `Application ${status}.` });
      setData((prev: any) => ({
        ...prev,
        partners: prev.partners.map((p: any) => p.id === id ? { ...p, status } : p)
      }));
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  if (loading) return <AdminSkeleton />;

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-brand-navy-900 tracking-tighter uppercase italic">
            Admin <span className="text-brand-blue-600">Mission Control</span>
          </h1>
          <p className="text-slate-500 font-medium font-serif italic text-sm mt-1">Managing the global DVBE infrastructure network.</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="rounded-xl font-bold text-[10px] uppercase tracking-widest gap-2 h-11 border-slate-200 bg-white">
              <Download className="w-3.5 h-3.5" /> Export Report
           </Button>
           <Button className="bg-brand-navy-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest gap-2 h-11 shadow-xl">
              <Shield className="w-3.5 h-3.5" /> Security Audit
           </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Total Platform Users" value={data.metrics.totalUsers} icon={Users} color="text-blue-600" />
        <MetricCard label="Global Bids Indexed" value={data.bids.length > 0 ? 638 : 0} icon={Search} color="text-brand-blue-600" />
        <MetricCard label="Prospect Database" value={data.metrics.prospectCount.toLocaleString()} icon={Target} color="text-amber-500" />
        <MetricCard label="Hired Engagements" value={data.metrics.activeEngagements} icon={Briefcase} color="text-green-600" />
      </div>

      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="bg-slate-100/50 p-1.5 rounded-2xl h-14 mb-8 backdrop-blur-sm border border-white/20">
          <TabsTrigger value="overview" className="rounded-xl px-6 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-brand-navy-900 data-[state=active]:shadow-lg transition-all">
            Overview
          </TabsTrigger>
          <TabsTrigger value="engagements" className="rounded-xl px-6 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-brand-navy-900 data-[state=active]:shadow-lg transition-all">
            Fulfillment
          </TabsTrigger>
          <TabsTrigger value="users" className="rounded-xl px-6 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-brand-navy-900 data-[state=active]:shadow-lg transition-all">
            Ecosystem
          </TabsTrigger>
          <TabsTrigger value="pipeline" className="rounded-xl px-6 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-brand-navy-900 data-[state=active]:shadow-lg transition-all">
            Bid Pipeline
          </TabsTrigger>
          <TabsTrigger value="metrics" className="rounded-xl px-6 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-brand-navy-900 data-[state=active]:shadow-lg transition-all">
            KPI Metrics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
           <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Recent Partner Applications */}
              <Card className="border-none shadow-2xl shadow-brand-blue-600/5 rounded-[2.5rem] overflow-hidden">
                <CardHeader className="bg-slate-50/50 p-8 flex flex-row items-center justify-between border-b border-slate-100">
                  <CardTitle className="text-lg font-black text-brand-navy-900 uppercase tracking-tight flex items-center gap-2">
                    <Handshake className="w-5 h-5 text-brand-blue-600" />
                    Partner Applicants
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-brand-blue-600 font-bold hover:bg-brand-blue-600/5">View All</Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-50">
                    {data.partners.length > 0 ? (
                      data.partners.map((p: any) => (
                        <div key={p.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50/30 transition-colors">
                          <div className="space-y-1">
                            <h4 className="font-bold text-brand-navy-900">{p.company_name}</h4>
                            <p className="text-xs text-slate-500 font-medium">{p.contact_name} • {p.email}</p>
                          </div>
                          <div className="flex gap-2">
                            {p.status === 'pending' ? (
                              <>
                                <Button onClick={() => handlePartnerAction(p.id, 'approved')} size="sm" className="bg-green-600 hover:bg-green-700 h-8 rounded-lg text-[10px] font-black uppercase tracking-tight">Approve</Button>
                                <Button onClick={() => handlePartnerAction(p.id, 'rejected')} variant="outline" size="sm" className="border-red-100 text-red-500 hover:bg-red-50 h-8 rounded-lg text-[10px] font-black uppercase tracking-tight">Deny</Button>
                              </>
                            ) : (
                              <Badge className={cn("text-[9px] font-black uppercase tracking-tight", 
                                p.status === 'approved' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
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
              <Card className="border-none shadow-2xl shadow-brand-blue-600/5 rounded-[2.5rem] overflow-hidden">
                <CardHeader className="bg-slate-50/50 p-8 flex flex-row items-center justify-between border-b border-slate-100">
                  <CardTitle className="text-lg font-black text-brand-navy-900 uppercase tracking-tight flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Hired Assignments
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-brand-blue-600 font-bold hover:bg-brand-blue-600/5">View All</Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-50">
                    {data.engagements.slice(0, 5).map((e: any) => (
                      <div key={e.id} className="p-6 hover:bg-slate-50/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-brand-navy-900">{e.users?.business_name}</h4>
                          <p className="text-xs font-black text-green-600">Paid: ${(e.price_agreed || 0).toLocaleString()}</p>
                        </div>
                        <p className="text-xs text-slate-500 font-medium mb-3 truncate max-w-sm">{e.bids?.event_name}</p>
                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className="text-[9px] font-black uppercase tracking-tight text-brand-blue-600 bg-brand-blue-600/5 border-none">
                            {e.status}
                          </Badge>
                          <span className="text-[10px] font-bold text-slate-400">
                            {new Date(e.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
           </div>
        </TabsContent>

        <TabsContent value="engagements">
          <Card className="border-none shadow-2xl shadow-brand-blue-600/5 rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8 border-b border-slate-50">
               <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-black text-brand-navy-900 uppercase tracking-tight">Active Fulfillment</CardTitle>
                    <CardDescription className="text-xs font-medium italic">Managing {data.engagements.length} active service contracts.</CardDescription>
                  </div>
                  <div className="relative w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input placeholder="Filter by client or bid..." className="pl-10 rounded-xl bg-slate-50 border-none h-10 text-sm" />
                  </div>
               </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-none">
                    <TableHead className="pl-8 text-[10px] font-black uppercase tracking-widest">Client</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Bid Name</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Tier</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-right pr-8">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.engagements.map((e: any) => (
                    <TableRow key={e.id} className="hover:bg-slate-50/50 border-slate-50 group">
                      <TableCell className="pl-8 py-5">
                        <div className="space-y-1">
                          <p className="font-bold text-brand-navy-900 text-sm">{e.users?.business_name || 'N/A'}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{e.users?.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="font-medium text-sm truncate">{e.bids?.event_name || 'Manual Engagement'}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[9px] font-black uppercase tracking-tight bg-white">
                          {e.tier.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-[9px] font-black uppercase", 
                          e.status === 'intake' ? 'bg-blue-100 text-blue-600' :
                          e.status === 'in_progress' ? 'bg-amber-100 text-amber-600' :
                          e.status === 'complete' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'
                        )}>
                          {e.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl w-48">
                            <DropdownMenuItem onClick={() => handleUpdateStatus(e.id, 'in_progress')}>
                               <Clock className="mr-2 h-4 w-4" /> Mark In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(e.id, 'submitted')}>
                               <CheckCircle2 className="mr-2 h-4 w-4" /> Mark Submitted
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(e.id, 'complete')} className="text-green-600 font-bold">
                               <CheckCircle2 className="mr-2 h-4 w-4" /> Complete Project
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="border-none shadow-2xl shadow-brand-blue-600/5 rounded-[2.5rem] overflow-hidden">
             <CardHeader className="p-8 border-b border-slate-50">
               <CardTitle className="text-xl font-black text-brand-navy-900 uppercase tracking-tight">Ecosystem Directory</CardTitle>
             </CardHeader>
             <CardContent className="p-0">
               <Table>
                 <TableHeader className="bg-slate-50/50">
                   <TableRow className="border-none">
                     <TableHead className="pl-8 text-[10px] font-black uppercase tracking-widest">Business</TableHead>
                     <TableHead className="text-[10px] font-black uppercase tracking-widest">Tier</TableHead>
                     <TableHead className="text-[10px] font-black uppercase tracking-widest">Certs</TableHead>
                     <TableHead className="text-[10px] font-black uppercase tracking-widest">Matches</TableHead>
                     <TableHead className="text-[10px] font-black uppercase tracking-widest">Engagements</TableHead>
                     <TableHead className="text-[10px] font-black uppercase tracking-widest text-right pr-8">Joined</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {data.users.map((u: any) => (
                     <TableRow key={u.id} className="hover:bg-slate-50/50 border-slate-50 group">
                       <TableCell className="pl-8 py-5">
                          <div className="space-y-1">
                            <p className="font-bold text-brand-navy-900 text-sm">{u.business_name || 'Incomplete Profile'}</p>
                            <p className="text-[10px] text-slate-400 font-mono">{u.email}</p>
                          </div>
                       </TableCell>
                       <TableCell>
                         <Badge className={cn("text-[9px] font-black uppercase", u.subscription_tier === 'pro' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-500')}>
                           {u.subscription_tier}
                         </Badge>
                       </TableCell>
                       <TableCell>
                          <div className="flex gap-1">
                             {u.certifications?.slice(0, 2).map((c: string) => (
                               <Badge key={c} className="bg-brand-blue-600/10 text-brand-blue-600 text-[8px] h-4 px-1">{c}</Badge>
                             ))}
                             {u.certifications?.length > 2 && <span className="text-[8px] text-slate-400">+{u.certifications.length - 2}</span>}
                          </div>
                       </TableCell>
                       <TableCell className="font-mono text-xs font-bold text-slate-600">{u.user_bid_matches?.[0]?.count || 0}</TableCell>
                       <TableCell className="font-mono text-xs font-bold text-slate-600">{u.service_engagements?.[0]?.count || 0}</TableCell>
                       <TableCell className="text-right pr-8 text-xs text-slate-400">{new Date(u.created_at).toLocaleDateString()}</TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline">
          <Card className="border-none shadow-2xl shadow-brand-blue-600/5 rounded-[2.5rem] overflow-hidden">
             <CardHeader className="p-8 border-b border-slate-50">
                <div className="flex items-center justify-between">
                   <div>
                      <CardTitle className="text-xl font-black text-brand-navy-900 uppercase tracking-tight">Global Bid Pipeline</CardTitle>
                      <div className="flex gap-4 mt-2">
                         <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-[10px] font-black uppercase text-slate-400">GO: {data.bids.filter((b: any) => b.go_nogo === 'GO').length}</span>
                         </div>
                         <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <span className="text-[10px] font-black uppercase text-slate-400">NO-GO: {data.bids.filter((b: any) => b.go_nogo === 'NO_GO').length}</span>
                         </div>
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <Input placeholder="Search global bids..." className="w-64 h-10 rounded-xl bg-slate-50 border-none text-sm" />
                   </div>
                </div>
             </CardHeader>
             <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="border-none">
                      <TableHead className="pl-8 text-[10px] font-black uppercase tracking-widest">Solicitation</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest">Portal</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest">Agency</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-right pr-8">Due Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.bids.map((b: any) => (
                      <TableRow key={b.id} className="hover:bg-slate-50/50 border-slate-50 group">
                        <TableCell className="pl-8 py-5 max-w-md">
                          <div className="space-y-1">
                            <p className="font-bold text-brand-navy-900 text-sm truncate">{b.event_name}</p>
                            <p className="text-[10px] text-slate-400 font-mono">{b.event_id}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[9px] font-black uppercase bg-white">{b.source}</Badge>
                        </TableCell>
                        <TableCell className="text-xs font-medium text-slate-500 max-w-[150px] truncate">{b.department_name}</TableCell>
                        <TableCell>
                          <Badge className={cn("text-[9px] font-black uppercase", 
                            b.go_nogo === 'GO' ? 'bg-green-100 text-green-600' :
                            b.go_nogo === 'NO_GO' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'
                          )}>
                            {b.go_nogo}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-8 text-xs font-mono">
                          {b.end_date ? new Date(b.end_date).toLocaleDateString() : 'N/A'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
             </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in zoom-in-95 duration-500">
             <Card className="border-none shadow-2xl rounded-[2.5rem] bg-brand-navy-900 text-white p-8">
                <CardHeader className="p-0 mb-8">
                   <CardTitle className="text-2xl font-black uppercase italic tracking-tight text-white">Revenue MTD</CardTitle>
                   <CardDescription className="text-blue-200/40 font-medium">Monthly fulfillment billing performance.</CardDescription>
                </CardHeader>
                <div className="space-y-8">
                   <div className="flex items-end gap-4">
                      <span className="text-6xl font-black">${(data.metrics.revenue || 0).toLocaleString()}</span>
                      <span className="text-green-400 font-bold mb-2 flex items-center gap-1"><ArrowUpRight className="w-4 h-4" /> +12%</span>
                   </div>
                   <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-blue-600 w-[65%]" />
                   </div>
                   <div className="grid grid-cols-3 gap-4">
                      <div>
                         <p className="text-[10px] font-black text-blue-200/30 uppercase tracking-widest">Scout ($49)</p>
                         <p className="text-lg font-bold">${data.metrics.scoutRevenue.toLocaleString()}</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-blue-200/30 uppercase tracking-widest">Pro ($99)</p>
                         <p className="text-lg font-bold">${data.metrics.proRevenue.toLocaleString()}</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-blue-200/30 uppercase tracking-widest">RFP ($450)</p>
                         <p className="text-lg font-bold">${data.metrics.serviceRevenue.toLocaleString()}</p>
                      </div>
                   </div>
                </div>
             </Card>

             <Card className="border-none shadow-2xl rounded-[2.5rem] p-8 bg-white">
                <CardHeader className="p-0 mb-8">
                   <CardTitle className="text-2xl font-black text-brand-navy-900 uppercase italic tracking-tight">User Conversion</CardTitle>
                   <CardDescription className="text-slate-400 font-medium italic">Trial to PRO transition metrics.</CardDescription>
                </CardHeader>
                <div className="space-y-8">
                    <div className="grid grid-cols-3 gap-4">
                       <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scout</p>
                          <p className="text-2xl font-black text-brand-navy-900">{data.metrics.scoutUsers}</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pro</p>
                          <p className="text-2xl font-black text-brand-navy-900">{data.metrics.proUsers}</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CVR</p>
                          <p className="text-2xl font-black text-brand-blue-600">8.4%</p>
                       </div>
                    </div>
                   <div className="space-y-4">
                      <div className="flex justify-between items-center">
                         <span className="text-xs font-bold text-slate-600 uppercase">Pro Expansion</span>
                         <span className="text-xs font-bold text-brand-blue-600">65% to Goal</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                         <div className="h-full bg-brand-blue-600 w-[65%]" />
                      </div>
                   </div>
                </div>
             </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MetricCard({ label, value, icon: Icon, color }: any) {
  return (
    <Card className="border-none shadow-2xl shadow-brand-blue-600/5 rounded-3xl overflow-hidden hover:scale-[1.02] transition-all bg-white">
      <CardContent className="p-8 flex items-center gap-6">
        <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shrink-0", color.replace('text-', 'bg-').replace('-600', '-500/10'))}>
          <Icon className={cn("w-7 h-7", color)} />
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{label}</p>
          <p className="text-3xl font-black text-brand-navy-900 leading-none">{typeof value === 'number' ? value.toLocaleString() : value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function AdminSkeleton() {
  return (
    <div className="space-y-10 animate-pulse">
      <div className="flex justify-between">
        <div className="space-y-3">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {[1,2,3,4].map(i => <Skeleton key={i} className="h-32 rounded-3xl" />)}
      </div>
      <Skeleton className="h-14 w-full rounded-2xl" />
      <div className="grid grid-cols-2 gap-8">
        <Skeleton className="h-[400px] rounded-[2.5rem]" />
        <Skeleton className="h-[400px] rounded-[2.5rem]" />
      </div>
    </div>
  );
}
