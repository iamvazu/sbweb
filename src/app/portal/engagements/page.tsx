"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileCheck, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  FileText, 
  ChevronRight,
  Loader2,
  PhoneCall
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function EngagementsPage() {
  const [engagements, setEngagements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadEngagements() {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("service_engagements")
        .select(`
          *,
          bids (*)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setEngagements(data || []);
      setIsLoading(false);
    }
    loadEngagements();
  }, [supabase]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F3A]">Managed Engagements</h1>
          <p className="text-sm text-slate-500">Track the status of bids our team is preparing for you.</p>
        </div>
        <Button variant="outline" className="border-slate-300">
          <PhoneCall className="h-4 w-4 mr-2 text-blue-600" /> Speak with Case Manager
        </Button>
      </div>

      {engagements.length > 0 ? (
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="hover:bg-transparent border-b">
                <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Project / Bid</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Service Tier</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Status</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Due Date</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest py-4 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {engagements.map((eng) => (
                <TableRow key={eng.id} className="group hover:bg-slate-50/50 transition-colors">
                  <TableCell className="py-4">
                    <p className="font-bold text-slate-900 group-hover:text-[#1E6FD9] transition-colors">{eng.bids?.event_name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{eng.bids?.event_id}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] border-slate-200 uppercase bg-white">
                      {eng.tier.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={eng.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                      <Clock className="h-3.5 w-3.5" />
                      {eng.bids?.end_date ? new Date(eng.bids?.end_date).toLocaleDateString() : 'TBD'}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/portal/engagements/${eng.id}`}>
                        View Progress <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <Card className="p-20 text-center border-dashed border-2 bg-slate-50/30">
          <div className="max-w-xs mx-auto space-y-4">
            <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <FileCheck className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No managed bids yet</h3>
            <p className="text-sm text-slate-500">
              When you hire StrongerBuilt to manage a bid, the progress tracking and document uploads will appear here.
            </p>
            <Button asChild className="bg-[#1E6FD9] mt-4">
              <Link href="/portal/matches">Browse My Matches</Link>
            </Button>
          </div>
        </Card>
      )}

      {/* Trust Message */}
      <div className="grid md:grid-cols-2 gap-6 pt-12">
        <div className="flex gap-4 p-6 rounded-2xl border border-blue-100 bg-blue-50/50">
          <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-blue-600 shrink-0">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900">Direct Communication</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Your dedicated bid strategist is available via phone and portal chat for all active engagements.
            </p>
          </div>
        </div>
        <div className="flex gap-4 p-6 rounded-2xl border border-slate-200 bg-white">
          <div className="h-10 w-10 bg-slate-50 rounded-lg flex items-center justify-center shadow-sm text-slate-400 shrink-0">
            <FileText className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900">Document Vault</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              All submitted packages, receipts, and bid Bonds are archived here for 7 years for compliance audits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    intake: "bg-blue-50 text-blue-700 border-blue-200",
    in_progress: "bg-amber-50 text-amber-700 border-amber-200",
    submitted: "bg-teal-50 text-teal-700 border-teal-200",
    complete: "bg-green-50 text-green-700 border-green-200",
    cancelled: "bg-slate-50 text-slate-400 border-slate-200"
  };

  return (
    <Badge variant="outline" className={`${styles[status] || styles.intake} uppercase text-[9px] font-black border tracking-widest`}>
      {status.replace('_', ' ')}
    </Badge>
  );
}
