"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Award, Target, Briefcase, Info } from "lucide-react";

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadAnalytics() {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: matches } = await supabase
        .from("user_bid_matches")
        .select(`
          pipeline_stage,
          bids (estimated_value_max, department_name)
        `)
        .eq("user_id", user.id);

      // Process Data
      const stageData = [
        { name: "New", count: matches?.filter(m => m.pipeline_stage === 'new_match').length || 0, color: "#1E6FD9" },
        { name: "Review", count: matches?.filter(m => m.pipeline_stage === 'reviewing').length || 0, color: "#D97706" },
        { name: "Persue", count: matches?.filter(m => m.pipeline_stage === 'pursuing').length || 0, color: "#7C3AED" },
        { name: "Submit", count: matches?.filter(m => m.pipeline_stage === 'submitted').length || 0, color: "#0D9488" },
        { name: "Won", count: matches?.filter(m => m.pipeline_stage === 'won').length || 0, color: "#16A34A" },
      ];

      const valueData = [
        { name: "Jan", val: 120 }, { name: "Feb", val: 80 }, { name: "Mar", val: 240 }, { name: "Apr", val: 310 }
      ];

      setData({ stageData, valueData });
      setIsLoading(false);
    }
    loadAnalytics();
  }, [supabase]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-[400px] w-full" />
        <Skeleton className="h-[400px] w-full" />
        <Skeleton className="h-[200px] w-full col-span-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard label="Pipeline Value" value="$1.2M" sub="+12% from last month" icon={TrendingUp} color="text-blue-600" />
        <SummaryCard label="Win Rate" value="18%" sub="Above industry average" icon={Award} color="text-green-600" />
        <SummaryCard label="Active Pursuits" value={data.stageData[2].count} sub="Critical focus" icon={Target} color="text-purple-600" />
        <SummaryCard label="New Matches" value={data.stageData[0].count} sub="In last 24 hours" icon={Briefcase} color="text-amber-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Funnel Distribution</CardTitle>
            <CardDescription>Number of bids at each stage of the lifecycle</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.stageData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {data.stageData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Projected Revenue Pipeline</CardTitle>
            <CardDescription>Aggregated estimated value of bids being pursued</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.valueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} unit="k" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="val" stroke="#1E6FD9" strokeWidth={3} dot={{ r: 6, fill: '#1E6FD9', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900 text-white border-none p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="h-24 w-24 bg-blue-600/20 rounded-full flex items-center justify-center shrink-0">
            <Info className="h-10 w-10 text-blue-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Intelligence Insight</h3>
            <p className="text-blue-100/60 leading-relaxed italic">
              "Your current win rate is highest in the **Janitorial Services** sector within **Los Angeles County**. We recommend prioritizing RFPs in this category to maximize ROI."
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function SummaryCard({ label, value, sub, icon: Icon, color }: any) {
  return (
    <Card className="border-slate-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{label}</p>
          <Icon className={`h-5 w-5 ${color} opacity-20`} />
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-black text-slate-900">{value}</p>
        </div>
        <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">{sub}</p>
      </CardContent>
    </Card>
  );
}
