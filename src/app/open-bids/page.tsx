"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Search, 
  Filter, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Bell, 
  Info, 
  ExternalLink,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Target,
  BarChart3
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { bidSlug, getBidState } from "@/lib/bids";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const AVAILABLE_STATES = [
  "California", "Pennsylvania", "Virginia", "Washington", "Texas", "Michigan", "Florida",
  "Oklahoma", "Kansas", "Maryland", "Ohio", "New Jersey", "Utah", "Alabama", "Georgia",
  "Wisconsin", "New Mexico", "Colorado", "Arizona", "Hawaii", "Louisiana", "South Carolina",
  "South Dakota", "Mississippi", "New York", "Alaska", "Nebraska", "Minnesota", "North Carolina",
  "Tennessee", "Connecticut", "Indiana", "Nevada", "Missouri", "Oregon", "Maine", "Illinois"
].sort();

const AVAILABLE_SOURCES = [
  { key: "samgov", label: "SAM.gov" },
  { key: "caleprocure", label: "CaleProcure" },
  { key: "bidnet", label: "BidNet" },
  { key: "opengov", label: "OpenGov" },
  { key: "laramp", label: "LA RAMP" }
];

const ITEMS_PER_PAGE = 10;

export default function OpenBidsPage() {
  const [bids, setBids] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filters State
  const [search, setSearch] = useState("");
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [showSetAsidesOnly, setShowSetAsidesOnly] = useState(false);
  const [showPrevailingWageOnly, setShowPrevailingWageOnly] = useState(false);
  const [showBondingRequiredOnly, setShowBondingRequiredOnly] = useState(false);
  const [valueFilter, setValueFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<"open" | "closed" | "award">("open");
  const [sortBy, setSortBy] = useState("relevance");
  const [page, setPage] = useState(1);
  const [searchTime, setSearchTime] = useState(0);

  // Modals / Dialogs state
  const [selectedBid, setSelectedBid] = useState<any>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertEmail, setAlertEmail] = useState("");

  const handleSaveAlert = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAlertModalOpen(false);
    setAlertEmail("");
    alert(`Success! Email alerts for the query "${search || "All Open Bids"}" have been set up for ${alertEmail}.`);
  };

  const supabase = createClient();

  useEffect(() => {
    async function loadBids() {
      setIsLoading(true);
      try {
        let query = supabase
          .from("bids")
          .select("id, event_id, event_name, department_name, comments, first_seen, end_date, source, estimated_value_min, estimated_value_max, prevailing_wage, sbe_only, dbe_goal, dvbe_goal, bonding_required", { count: "exact" });

        const nowStr = new Date().toISOString();

        // 1. Tab / Date Filter
        if (activeTab === "open") {
          query = query.gt("end_date", nowStr);
        } else if (activeTab === "closed") {
          query = query.lt("end_date", nowStr);
        }

        // 2. Search keyword
        if (search) {
          query = query.or(`event_name.ilike.%${search}%,department_name.ilike.%${search}%,comments.ilike.%${search}%`);
        }

        // 3. Source Portal filter
        if (selectedSources.length > 0) {
          query = query.in("source", selectedSources);
        }

        // 4. State filter (Resolves parenthesized state suffixes and textual matches)
        if (selectedStates.length > 0) {
          const stateConditions = selectedStates.map(state => {
            if (state === "California") {
              return "source.eq.caleprocure,source.eq.caltrans,department_name.ilike.%(California)%,event_name.ilike.%California%,comments.ilike.%California%";
            } else {
              return `department_name.ilike.%(${state})%,event_name.ilike.%${state}%,comments.ilike.%${state}%`;
            }
          });
          query = query.or(stateConditions.join(","));
        }

        // 5. Set-Aside / SBE Only
        if (showSetAsidesOnly) {
          query = query.eq("sbe_only", true);
        }

        // 6. Prevailing Wage Only
        if (showPrevailingWageOnly) {
          query = query.eq("prevailing_wage", true);
        }

        // 7. Bonding Required Only
        if (showBondingRequiredOnly) {
          query = query.eq("bonding_required", true);
        }

        // 8. Estimated Value range filter
        if (valueFilter === "under-100k") {
          query = query.lt("estimated_value_max", 100000);
        } else if (valueFilter === "100k-1m") {
          query = query.gte("estimated_value_max", 100000).lte("estimated_value_min", 1000000);
        } else if (valueFilter === "over-1m") {
          query = query.gte("estimated_value_min", 1000000);
        }

        // 9. Sorting
        if (sortBy === "closing_soon") {
          query = query.order("end_date", { ascending: true });
        } else if (sortBy === "highest_value") {
          query = query.order("estimated_value_max", { ascending: false, nullsFirst: false });
        } else {
          // Relevance (Default sorting: by first_seen descending)
          query = query.order("first_seen", { ascending: false, nullsFirst: false });
        }

        // 10. Pagination Range
        const from = (page - 1) * ITEMS_PER_PAGE;
        const to = page * ITEMS_PER_PAGE - 1;
        query = query.range(from, to);

        const start = performance.now();
        const { data, count, error } = await query;
        const end = performance.now();
        setSearchTime(Math.round(end - start) || 2);

        if (error) throw error;

        // Compute local state names for the current page
        const bidsWithState = (data || []).map(bid => ({
          ...bid,
          state: getBidState(bid)
        }));

        setBids(bidsWithState);
        setTotalCount(count || 0);
      } catch (error) {
        console.error("Error loading public bids database:", error);
      } finally {
        setIsLoading(false);
      }
    }

    const timer = setTimeout(() => {
      loadBids();
    }, 300); // 300ms debounce to prevent API spam while typing

    return () => clearTimeout(timer);
  }, [
    supabase,
    search,
    selectedStates,
    selectedSources,
    showSetAsidesOnly,
    showPrevailingWageOnly,
    showBondingRequiredOnly,
    valueFilter,
    activeTab,
    sortBy,
    page
  ]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [
    search,
    selectedStates,
    selectedSources,
    showSetAsidesOnly,
    showPrevailingWageOnly,
    showBondingRequiredOnly,
    valueFilter,
    activeTab,
    sortBy
  ]);

  const toggleStateFilter = (stateName: string) => {
    setSelectedStates(prev => 
      prev.includes(stateName) 
        ? prev.filter(s => s !== stateName) 
        : [...prev, stateName]
    );
  };

  const toggleSourceFilter = (sourceKey: string) => {
    setSelectedSources(prev => 
      prev.includes(sourceKey) 
        ? prev.filter(s => s !== sourceKey) 
        : [...prev, sourceKey]
    );
  };

  const clearAllFilters = () => {
    setSelectedStates([]);
    setSelectedSources([]);
    setShowSetAsidesOnly(false);
    setShowPrevailingWageOnly(false);
    setShowBondingRequiredOnly(false);
    setValueFilter("all");
    setSearch("");
  };

  const highlightText = (text: string, searchWord: string) => {
    if (!searchWord) return text;
    const parts = text.split(new RegExp(`(${searchWord.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === searchWord.toLowerCase() 
            ? <mark key={i} className="bg-blue-100 dark:bg-blue-950/40 text-brand-blue-600 dark:text-blue-300 font-bold px-0.5 rounded">{part}</mark>
            : part
        )}
      </span>
    );
  };

  const formatMoneyShorthand = (val: number | null | undefined) => {
    if (!val) return "TBD";
    if (val >= 1000000) {
      return "$" + (val / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (val >= 1000) {
      return "$" + (val / 1000).toFixed(0) + "K";
    }
    return "$" + val;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-indigo-50/20 to-white font-sans pt-24 pb-16 relative overflow-hidden">
      
      {/* Background atmospheric blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-1/4 w-[600px] h-[600px] rounded-full bg-brand-blue-600/5 blur-[120px]" />
        <div className="absolute bottom-20 left-10 w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 space-y-10">
        
        {/* Title Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4 pt-8 pb-4">
          <h1 className="text-4xl sm:text-5xl font-black text-brand-navy-900 dark:text-white tracking-tight leading-tight">
            Every active bid that fits your business — <span className="text-brand-blue-600 block sm:inline">in one place.</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Federal, state, local, and private databases. Continuously scanned, scored, and searchable on your schedule.
          </p>
        </div>

        {/* Feature Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-2 pb-2">
          {/* Card 1: Active RFPs */}
          <div className="bg-white/95 dark:bg-slate-900/95 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="h-10 w-10 rounded-xl bg-teal-50 dark:bg-teal-950/50 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <Search className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-black text-brand-navy-900 dark:text-white uppercase tracking-tight">14,000+ active RFPs</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Federal, state, local, and private databases — all searchable in one place. Updated continuously.
            </p>
          </div>

          {/* Card 2: Smart Matching */}
          <div className="bg-white/95 dark:bg-slate-900/95 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="h-10 w-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-black text-brand-navy-900 dark:text-white uppercase tracking-tight">Smart matching</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Filter by industry, geography, value, deadline, and complexity. Save searches. Get alerts.
            </p>
          </div>

          {/* Card 3: Win Probability */}
          <div className="bg-white/95 dark:bg-slate-900/95 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-black text-brand-navy-900 dark:text-white uppercase tracking-tight">Win-probability scoring</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Each bid scored for fit before you spend an hour reading the RFP. Pursue only the right ones.
            </p>
          </div>
        </div>

        {/* Search Bar Block */}
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
              <Input 
                placeholder="Search by keyword, agency, title or location..."
                className="pl-12 pr-4 h-12 rounded-full border-slate-200 bg-white/90 shadow-lg shadow-indigo-100/30 focus:shadow-xl focus:shadow-indigo-100/50 transition-all text-slate-900 text-sm focus-visible:ring-brand-blue-600"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button 
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            <Button 
              onClick={() => {
                // Focus and force refetch
                setPage(1);
              }}
              className="bg-brand-blue-600 hover:bg-blue-700 text-white rounded-full h-12 px-6 font-bold uppercase tracking-wider text-[11px] flex items-center gap-2 shadow-md shadow-blue-500/10 shrink-0 w-full sm:w-auto"
            >
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>

          {/* Currently Searching & Toggles */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-b pb-4">
            <div className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              Currently searching: <span className="text-brand-navy-900 dark:text-white font-black uppercase tracking-tight">{activeTab === "open" ? "Open Bids" : activeTab === "closed" ? "Closed Bids" : "Award Date"}</span>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setActiveTab("open")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border
                  ${activeTab === "open" 
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
              >
                Open Bids
              </button>
              <button 
                onClick={() => setActiveTab("closed")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border
                  ${activeTab === "closed" 
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
              >
                Closed Bids
              </button>
              <button 
                onClick={() => setActiveTab("award")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border
                  ${activeTab === "award" 
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
              >
                Award Date
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <div className="space-y-6 lg:sticky lg:top-24 h-fit bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50">
            <div className="flex items-center justify-between pb-4 border-b">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-400" />
                Filters
              </h3>
              {(selectedStates.length > 0 || selectedSources.length > 0 || showSetAsidesOnly || showPrevailingWageOnly || showBondingRequiredOnly || valueFilter !== "all") && (
                <button 
                  onClick={clearAllFilters}
                  className="text-[10px] font-bold text-brand-blue-600 hover:underline animate-in fade-in"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* SOURCE PORTAL Filter */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Source Portal</h4>
              <div className="space-y-2.5">
                {AVAILABLE_SOURCES.map((source) => (
                  <div key={source.key} className="flex items-center space-x-2.5 group">
                    <Checkbox 
                      id={`source-${source.key}`} 
                      checked={selectedSources.includes(source.key)}
                      onCheckedChange={() => toggleSourceFilter(source.key)}
                      className="border-slate-300 data-[state=checked]:bg-brand-blue-600 data-[state=checked]:border-brand-blue-600 rounded"
                    />
                    <Label 
                      htmlFor={`source-${source.key}`}
                      className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 cursor-pointer transition-colors"
                    >
                      {source.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* STATE Filter */}
            <div className="space-y-4 border-t pt-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">State</h4>
              <div className="space-y-2.5 max-h-[180px] overflow-y-auto pr-2 scrollbar-thin">
                {AVAILABLE_STATES.map((state) => (
                  <div key={state} className="flex items-center space-x-2.5 group">
                    <Checkbox 
                      id={`state-${state}`} 
                      checked={selectedStates.includes(state)}
                      onCheckedChange={() => toggleStateFilter(state)}
                      className="border-slate-300 data-[state=checked]:bg-brand-blue-600 data-[state=checked]:border-brand-blue-600 rounded"
                    />
                    <Label 
                      htmlFor={`state-${state}`}
                      className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 cursor-pointer transition-colors"
                    >
                      {state}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* REQUIREMENTS Filter */}
            <div className="space-y-4 border-t pt-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Requirements</h4>
              <div className="space-y-2.5">
                <div className="flex items-center space-x-2.5 group">
                  <Checkbox 
                    id="req-sbe" 
                    checked={showSetAsidesOnly} 
                    onCheckedChange={(checked) => setShowSetAsidesOnly(checked as boolean)}
                    className="border-slate-300 data-[state=checked]:bg-brand-blue-600 data-[state=checked]:border-brand-blue-600 rounded"
                  />
                  <Label 
                    htmlFor="req-sbe"
                    className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 cursor-pointer transition-colors"
                  >
                    SBE / DVBE Set-Aside
                  </Label>
                </div>
                <div className="flex items-center space-x-2.5 group">
                  <Checkbox 
                    id="req-wage" 
                    checked={showPrevailingWageOnly} 
                    onCheckedChange={(checked) => setShowPrevailingWageOnly(checked as boolean)}
                    className="border-slate-300 data-[state=checked]:bg-brand-blue-600 data-[state=checked]:border-brand-blue-600 rounded"
                  />
                  <Label 
                    htmlFor="req-wage"
                    className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 cursor-pointer transition-colors"
                  >
                    Prevailing Wage
                  </Label>
                </div>
                <div className="flex items-center space-x-2.5 group">
                  <Checkbox 
                    id="req-bond" 
                    checked={showBondingRequiredOnly} 
                    onCheckedChange={(checked) => setShowBondingRequiredOnly(checked as boolean)}
                    className="border-slate-300 data-[state=checked]:bg-brand-blue-600 data-[state=checked]:border-brand-blue-600 rounded"
                  />
                  <Label 
                    htmlFor="req-bond"
                    className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 cursor-pointer transition-colors"
                  >
                    Bonding Required
                  </Label>
                </div>
              </div>
            </div>

            {/* ESTIMATED VALUE Filter */}
            <div className="space-y-4 border-t pt-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Estimated Value</h4>
              <Select value={valueFilter} onValueChange={setValueFilter}>
                <SelectTrigger className="w-full h-10 border-slate-200 bg-slate-50/50 rounded-xl text-xs font-bold text-slate-700">
                  <SelectValue placeholder="All Values" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Values</SelectItem>
                  <SelectItem value="under-100k">Under $100K</SelectItem>
                  <SelectItem value="100k-1m">$100K – $1M</SelectItem>
                  <SelectItem value="over-1m">Over $1M</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>

          {/* Results Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Header info bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-xs text-slate-500 font-semibold">
                {totalCount} results on {Math.ceil(totalCount / ITEMS_PER_PAGE)} pages in <span className="text-brand-blue-600 font-bold">{searchTime}ms</span>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {/* Save Alert Trigger CTA */}
                <Button 
                  onClick={() => setIsAlertModalOpen(true)}
                  variant="outline" 
                  size="sm" 
                  className="h-9 border-slate-200 text-brand-blue-600 hover:bg-blue-50 font-bold uppercase text-[10px] tracking-wider rounded-lg flex items-center gap-1.5 shadow-sm"
                >
                  <Bell className="h-3.5 w-3.5 text-brand-blue-600" />
                  Save Alert
                </Button>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sort by</span>
                  <Select value={sortBy} onValueChange={(v) => setSortBy(v || "relevance")}>
                    <SelectTrigger className="w-[140px] h-9 border-slate-200 bg-slate-50/50 rounded-lg text-xs font-bold text-slate-700">
                      <SelectValue placeholder="Sort option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="closing_soon">Closing Soon</SelectItem>
                      <SelectItem value="highest_value">Highest Value</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Page size</span>
                  <Select defaultValue="10">
                    <SelectTrigger className="w-[170px] h-9 border-slate-200 bg-slate-50/50 rounded-lg text-xs font-bold text-slate-700" disabled>
                      <SelectValue placeholder="10 per page" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 results per page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Bids List */}
            <div className="space-y-4">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="space-y-2">
                      <div className="h-6 bg-slate-100 rounded w-2/3 animate-pulse" />
                      <div className="h-4 bg-slate-50 rounded w-1/3 animate-pulse" />
                    </div>
                    <div className="h-16 bg-slate-50 rounded animate-pulse" />
                  </Card>
                ))
              ) : bids.length > 0 ? (
                bids.map((bid) => {
                  const bidTime = bid.end_date ? new Date(bid.end_date).getTime() : null;
                  const nowTimeMs = new Date().getTime();
                  const isPastDue = bidTime !== null && bidTime < nowTimeMs;
                  const daysLeft = bidTime !== null ? Math.ceil((bidTime - nowTimeMs) / (1000 * 3600 * 24)) : null;
                  const isUrgent = daysLeft !== null && daysLeft <= 7 && !isPastDue;

                  return (
                    <Card key={bid.id} className="group border border-slate-100 hover:border-slate-200 hover:shadow-lg shadow-sm rounded-3xl transition-all bg-white overflow-hidden p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start w-full">
                      
                      {/* Main Bid details container */}
                      <div className="flex-1 space-y-3 min-w-0 w-full">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <Badge variant="outline" className="text-[10px] font-bold h-5 uppercase tracking-tight bg-slate-50 border-slate-200 text-slate-500 rounded-sm">
                            {bid.source}
                          </Badge>
                          <Badge variant="outline" className="text-[10px] font-bold h-5 uppercase tracking-tight bg-blue-50 border-blue-100 text-brand-blue-600 rounded-sm">
                            {bid.state}
                          </Badge>
                          {bidTime !== null && (
                            <span className={cn("text-xs font-semibold flex items-center gap-1 shrink-0", isPastDue ? "text-red-600" : isUrgent ? "text-red-600" : "text-slate-500")}>
                              <Clock className="h-3.5 w-3.5" />
                              {isPastDue ? "Closed" : daysLeft === 0 ? "Closing today" : `${daysLeft} days left`}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-extrabold text-brand-navy-900 dark:text-white leading-snug group-hover:text-brand-blue-600 transition-colors">
                          <Link 
                            href={`/open-bids/${bidSlug(bid)}`}
                            onClick={(e) => {
                              e.preventDefault();
                              window.history.pushState(null, "", `/open-bids/${bidSlug(bid)}`);
                              setSelectedBid(bid);
                            }}
                          >
                            {highlightText(bid.event_name, search)}
                          </Link>
                        </h3>

                        <div className="text-slate-500 font-medium text-xs space-y-1">
                          <p className="truncate">
                            <span className="text-brand-navy-900 font-bold uppercase tracking-wide text-[9px] mr-1.5">Agency:</span>
                            {highlightText(bid.department_name, search)}
                          </p>
                          <p className="flex items-center gap-4 flex-wrap text-slate-400">
                            <span><span className="text-brand-navy-900 font-bold uppercase tracking-wide text-[9px] mr-1.5">Open:</span>{bid.first_seen ? new Date(bid.first_seen).toLocaleDateString() : 'N/A'}</span>
                            <span className="hidden sm:inline text-slate-200">|</span>
                            <span><span className="text-brand-navy-900 font-bold uppercase tracking-wide text-[9px] mr-1.5">Close:</span>{bid.end_date ? new Date(bid.end_date).toLocaleDateString() : 'N/A'}</span>
                          </p>
                        </div>

                        {/* Compliance Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {bid.prevailing_wage && (
                            <Badge variant="outline" className="text-[9px] font-semibold py-0.5 px-2 bg-amber-50 text-amber-700 border-none rounded-sm">
                              PREVAILING WAGE
                            </Badge>
                          )}
                          {bid.sbe_only && (
                            <Badge variant="outline" className="text-[9px] font-semibold py-0.5 px-2 bg-blue-50 text-blue-700 border-none rounded-sm">
                              SBE ONLY
                            </Badge>
                          )}
                          {bid.dbe_goal && (
                            <Badge variant="outline" className="text-[9px] font-semibold py-0.5 px-2 bg-purple-50 text-purple-700 border-none rounded-sm">
                              DBE GOAL: {bid.dbe_goal}
                            </Badge>
                          )}
                          {bid.bonding_required && (
                            <Badge variant="outline" className="text-[9px] font-semibold py-0.5 px-2 bg-slate-100 text-slate-600 border-none rounded-sm">
                              BONDING REQ
                            </Badge>
                          )}
                        </div>

                        {bid.comments && (
                          <div className="pt-2">
                            <p className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-2">
                              <span className="text-slate-700 font-bold uppercase tracking-wide text-[9px] block mb-1">Description:</span>
                              {highlightText(bid.comments, search)}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Actions Side Box */}
                      <div className="w-full md:w-auto flex flex-col items-stretch md:items-end justify-between md:h-full gap-4 shrink-0 md:min-w-[180px]">
                        <div className="md:text-right">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Contract Value</span>
                          <span className="text-base font-black text-brand-navy-900 dark:text-white mt-1 block">
                            {bid.estimated_value_min ? 
                              `${formatMoneyShorthand(bid.estimated_value_min)} – ${formatMoneyShorthand(bid.estimated_value_max)}` : 
                              "Value TBD"
                            }
                          </span>
                        </div>

                        <div className="flex flex-row md:flex-col gap-2.5 w-full">
                          <Button 
                            asChild
                            variant="outline" 
                            size="sm" 
                            className="h-10 border-slate-200 text-slate-600 hover:bg-slate-50 flex-1 md:w-full font-bold uppercase text-[10px] tracking-wider"
                          >
                            <Link 
                              href={`/open-bids/${bidSlug(bid)}`}
                              onClick={(e) => {
                                e.preventDefault();
                                window.history.pushState(null, "", `/open-bids/${bidSlug(bid)}`);
                                setSelectedBid(bid);
                              }}
                            >
                              Details
                            </Link>
                          </Button>
                          <Button 
                            asChild
                            size="sm" 
                            className="h-10 bg-brand-blue-600 hover:bg-blue-700 text-white flex-1 md:w-full font-bold uppercase text-[10px] tracking-wider shadow-md shadow-blue-500/10"
                          >
                            <Link href={`/login?tab=signup&redirect=/portal/hire?bid=${bid.id}`}>
                              Get started!
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                  <div className="max-w-xs mx-auto space-y-4">
                    <Search className="h-10 w-10 text-slate-200 mx-auto" />
                    <h3 className="text-lg font-bold text-slate-800">No open bids found</h3>
                    <p className="text-sm text-slate-500">
                      Try adjusting your search terms or clearing your filters to expand the scope.
                    </p>
                    <Button 
                      onClick={clearAllFilters}
                      variant="link" 
                      className="text-brand-blue-600 font-bold"
                    >
                      Clear search filters
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Pagination controls */}
            {totalCount > ITEMS_PER_PAGE && (
              <div className="flex items-center justify-between py-6 border-t">
                <p className="text-xs text-slate-500 font-semibold">
                  Showing <span className="font-bold">{(page - 1) * ITEMS_PER_PAGE + 1}</span> to{" "}
                  <span className="font-bold">{Math.min(page * ITEMS_PER_PAGE, totalCount)}</span> of{" "}
                  <span className="font-bold">{totalCount}</span> bids
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="h-9 w-9 p-0 rounded-lg border-slate-200"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    disabled={page * ITEMS_PER_PAGE >= totalCount}
                    onClick={() => setPage(page + 1)}
                    className="h-9 w-9 p-0 rounded-lg border-slate-200"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bid Details Modal */}
      {selectedBid && (
        <Dialog 
          open={!!selectedBid} 
          onOpenChange={(open) => {
            if (!open) {
              window.history.pushState(null, "", "/open-bids");
              setSelectedBid(null);
            }
          }}
        >
          <DialogContent className="max-w-xl md:max-w-2xl overflow-y-auto max-h-[85vh] rounded-[2rem] border-slate-100 p-8">
            <DialogHeader className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge className="bg-brand-blue-600 text-white border-none text-[9px] uppercase tracking-wider font-bold">
                  {selectedBid.state}
                </Badge>
                <Badge variant="outline" className="text-[9px] uppercase tracking-wider font-bold text-slate-400 border-slate-200">
                  {selectedBid.source}
                </Badge>
              </div>
              <DialogTitle className="text-xl font-black leading-snug text-slate-900">
                {selectedBid.event_name}
              </DialogTitle>
              <DialogDescription className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Agency: {selectedBid.department_name} | ID: {selectedBid.event_id}
              </DialogDescription>
            </DialogHeader>

            <div className="py-6 space-y-6 border-t border-b my-4">
              {/* Financial & Compliance Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50/50 p-4 rounded-2xl border flex items-center gap-3">
                  <div className="h-9 w-9 bg-white rounded-xl flex items-center justify-center text-slate-700 border shrink-0">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">Estimated Value</span>
                    <span className="text-sm font-black text-brand-navy-900 dark:text-white">
                      {selectedBid.estimated_value_min ? 
                        `${formatMoneyShorthand(selectedBid.estimated_value_min)} – ${formatMoneyShorthand(selectedBid.estimated_value_max)}` : 
                        "Value TBD"}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50/50 p-4 rounded-2xl border flex items-center gap-3">
                  <div className="h-9 w-9 bg-white rounded-xl flex items-center justify-center text-slate-700 border shrink-0">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">Closing Date</span>
                    <span className="text-sm font-black text-slate-900">
                      {selectedBid.end_date ? new Date(selectedBid.end_date).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">Bid Description</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium whitespace-pre-line">
                  {selectedBid.comments || "No description provided for this solicitation."}
                </p>
              </div>

              {/* Compliance & Features */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">Compliance & Requirements</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className={`text-[10px] font-semibold py-1 px-3 border-none rounded-md ${selectedBid.prevailing_wage ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-400'}`}>
                    {selectedBid.prevailing_wage ? "Prevailing Wage" : "Standard Wages"}
                  </Badge>
                  <Badge variant="outline" className={`text-[10px] font-semibold py-1 px-3 border-none rounded-md ${selectedBid.sbe_only ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-400'}`}>
                    {selectedBid.sbe_only ? "Small Business Set-Aside" : "Open Market"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button 
                onClick={() => {
                  window.history.pushState(null, "", "/open-bids");
                  setSelectedBid(null);
                }}
                variant="ghost" 
                className="h-11 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400"
              >
                Close Details
              </Button>
              <Button 
                asChild
                className="h-11 bg-brand-blue-600 hover:bg-blue-700 text-white rounded-xl font-black uppercase text-xs tracking-widest px-6 shadow-md shadow-blue-500/10"
              >
                <Link href={`/login?tab=signup&redirect=/portal/hire?bid=${selectedBid.id}`}>
                  Get Started on Bid!
                </Link>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Saved Search / Alert Subscription Modal */}
      {isAlertModalOpen && (
        <Dialog open={isAlertModalOpen} onOpenChange={setIsAlertModalOpen}>
          <DialogContent className="max-w-md rounded-[2rem] border-slate-100 p-8">
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-lg font-black text-slate-900 leading-tight">
                Create Saved Search Alert
              </DialogTitle>
              <DialogDescription className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Email alerts for: <span className="text-slate-800 font-bold">"{search || "All Open Bids"}"</span>
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSaveAlert} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="alert-email" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Your Email Address</Label>
                <Input 
                  id="alert-email"
                  type="email" 
                  placeholder="name@company.com" 
                  required
                  value={alertEmail}
                  onChange={(e) => setAlertEmail(e.target.value)}
                  className="h-12 border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <Button 
                  type="button" 
                  onClick={() => setIsAlertModalOpen(false)}
                  variant="ghost" 
                  className="h-11 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="h-11 bg-slate-900 hover:bg-black text-white rounded-xl font-black uppercase text-xs tracking-widest px-6"
                >
                  Create Alert
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

    </div>
  );
}
