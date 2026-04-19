"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Clock, ExternalLink, Calendar, MapPin, DollarSign, Shield, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatDistanceToNow, isPast } from "date-fns";

/**
 * FitScoreBadge component: colored circle with fit percentage.
 */
export function FitScoreBadge({ score }: { score: number }) {
  const getColor = () => {
    if (score >= 80) return "bg-[#16A34A] shadow-green-500/20";
    if (score >= 60) return "bg-[#D97706] shadow-amber-500/20";
    return "bg-slate-400 shadow-slate-500/20";
  };

  return (
    <div className={cn(
      "h-14 w-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg border-2 border-white/20",
      getColor()
    )}>
      {score}
    </div>
  );
}

/**
 * ComplianceFlags component: row of badge pills for bid requirements.
 */
export function ComplianceFlags({ bid }: { bid: any }) {
  const flags = [];

  if (bid.prebid_type === 'M') {
    const isMissed = bid.prebid_date && isPast(new Date(bid.prebid_date));
    flags.push({
      label: isMissed ? "PRE-BID MISSED — DISQUALIFIED" : `MANDATORY PRE-BID: ${bid.prebid_date ? new Date(bid.prebid_date).toLocaleDateString() : 'TBD'}`,
      variant: isMissed ? "destructive" : "red",
      icon: isMissed ? AlertCircle : Calendar
    });
  } else if (bid.prebid_type === 'NM') {
    flags.push({ label: "NON-MANDATORY PRE-BID", variant: "amber", icon: Calendar });
  }

  if (bid.prevailing_wage) flags.push({ label: "PREVAILING WAGE", variant: "amber", icon: Shield });
  if (bid.dvbe_goal) flags.push({ label: `DVBE GOAL: ${bid.dvbe_goal}`, variant: "purple", icon: Award });
  if (bid.dbe_goal) flags.push({ label: `DBE GOAL: ${bid.dbe_goal}`, variant: "purple", icon: Award });
  if (bid.sbe_only) flags.push({ label: "SBE ONLY", variant: "blue", icon: CheckCircle2 });
  if (bid.bonding_required) flags.push({ label: "BONDING REQ", variant: "slate", icon: DollarSign });

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {flags.map((flag, i) => (
        <Badge 
          key={i} 
          variant="outline" 
          className={cn(
            "flex items-center gap-1.5 py-0.5 px-2 text-[10px] font-semibold border-none rounded-sm",
            flag.variant === "red" && "bg-red-50 text-red-700",
            flag.variant === "destructive" && "bg-red-100 text-red-800 border border-red-300",
            flag.variant === "amber" && "bg-amber-50 text-amber-700",
            flag.variant === "purple" && "bg-purple-50 text-purple-700",
            flag.variant === "blue" && "bg-blue-50 text-blue-700",
            flag.variant === "slate" && "bg-slate-100 text-slate-600"
          )}
        >
          {flag.icon && <flag.icon className="h-3 w-3" />}
          {flag.label}
        </Badge>
      ))}
    </div>
  );
}

const Award = ({ className }: { className?: string }) => <Shield className={className} />; // Fallback

/**
 * BidCard component: horizontal bid card for list views.
 */
export function BidCard({ match, bid: overrideBid }: { match: any; bid?: any }) {
  const bid = overrideBid || match?.bids;
  
  // High resilience fallback
  if (!bid) return null;

  const score = match?.fit_score || 0;
  const daysLeft = bid.end_date ? Math.ceil((new Date(bid.end_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) : null;
  const isUrgent = daysLeft !== null && daysLeft <= 7;
  const isMissed = bid.prebid_type === 'M' && bid.prebid_date && isPast(new Date(bid.prebid_date));

  return (
    <Card className={cn(
      "group relative flex flex-col md:flex-row items-center gap-6 p-4 md:p-6 transition-all border-slate-200 hover:bg-slate-50 hover:shadow-md",
      isMissed && "border-l-4 border-l-red-500 bg-red-50/20"
    )}>
      {/* LEFT: Fit Score */}
      <div className="flex flex-shrink-0">
        <FitScoreBadge score={score} />
      </div>

      {/* CENTER: Details */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="outline" className="text-[10px] font-bold h-5 uppercase tracking-tight bg-white">
            {bid.source}
          </Badge>
          {score > 0 ? (
            <Badge variant="secondary" className="text-[9px] h-5 bg-green-50 text-green-700 border-green-200 font-bold">
              Personalized Match
            </Badge>
          ) : bid.bid_plan ? (
            <Badge variant="secondary" className="text-[9px] h-5 bg-blue-50 text-blue-600 border-blue-100 font-bold">
              AI Scanned
            </Badge>
          ) : (
            <Badge variant="secondary" className="text-[9px] h-5 bg-slate-100 text-slate-500 border-none font-bold">
              Discovery Mode
            </Badge>
          )}
          {daysLeft !== null && (
            <span className={cn("text-xs font-medium flex items-center gap-1", isUrgent ? "text-red-600 animate-pulse" : "text-slate-500")}>
              <Clock className="h-3 w-3" />
              {daysLeft < 0 ? "Closed" : `${daysLeft} days left`}
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 truncate pr-4 leading-tight group-hover:text-[#1E6FD9] transition-colors">
          {bid.event_name}
        </h3>
        
        <p className="text-sm text-slate-500 font-medium">
          {bid.department_name} <span className="mx-1 text-slate-300">|</span> {bid.event_id}
        </p>

        <ComplianceFlags bid={bid} />
      </div>

      {/* RIGHT: Actions */}
      <div className="w-full md:w-auto flex flex-col gap-2 min-w-[160px]">
        <div className="text-right mb-2">
          <p className="text-sm font-semibold text-slate-900">
            {bid.estimated_value_min ? 
              `$${(bid.estimated_value_min/1000).toFixed(0)}K – $${(bid.estimated_value_max/1000).toFixed(0)}K` : 
              "Value TBD"}
          </p>
        </div>
        
        <div className="flex flex-col gap-2">
          <Button asChild variant="outline" size="sm" className="h-9 w-full border-slate-300 text-slate-700 bg-white">
            <Link href={`/portal/bids/${bid.id}`}>Review Details</Link>
          </Button>
          <Button asChild size="sm" className="h-9 w-full bg-[#1E6FD9] hover:bg-blue-700 text-white">
            <Link href={`/portal/hire?bid=${bid.id}`}>Hire Us →</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

/**
 * PipelineSummaryBar component: 5 cards showing counts per stage.
 */
export function PipelineSummaryBar({ counts }: { counts: Record<string, number> }) {
  const stages = [
    { label: "NEW MATCH", stage: "new_match", color: "border-l-[#1E6FD9] text-[#1E6FD9]", bg: "bg-blue-50/50" },
    { label: "REVIEWING", stage: "reviewing", color: "border-l-[#D97706] text-[#D97706]", bg: "bg-amber-50/50" },
    { label: "PURSUING", stage: "pursuing", color: "border-l-[#7C3AED] text-[#7C3AED]", bg: "bg-purple-50/50" },
    { label: "SUBMITTED", stage: "submitted", color: "border-l-[#0D9488] text-[#0D9488]", bg: "bg-teal-50/50" },
    { label: "WON | LOST", stage: "won_lost", color: "border-l-slate-400 text-slate-600", bg: "bg-slate-50/50" },
  ];

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
      {stages.map((s) => (
        <Card key={s.label} className={cn("flex-shrink-0 w-36 md:w-full border-l-4 p-4 transition-all hover:shadow-sm", s.color, s.bg)}>
          <p className="text-[10px] font-bold uppercase tracking-widest">{s.label}</p>
          <p className="text-2xl font-bold mt-1">
            {s.stage === 'won_lost' ? `${counts['won'] || 0} / ${counts['lost'] || 0}` : (counts[s.stage] || 0)}
          </p>
        </Card>
      ))}
    </div>
  );
}
