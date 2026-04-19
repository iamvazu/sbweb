"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { BidCard } from "@/components/portal/bid-ui";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, X, Loader2, ChevronLeft, ChevronRight, LayoutGrid, ListFilter } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const ITEMS_PER_PAGE = 10;

export default function BidsBrowsePage() {
  const [bids, setBids] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("closing_soon");
  const [showClosed, setShowClosed] = useState(false);
  const [page, setPage] = useState(1);
  const supabase = createClient();

  useEffect(() => {
    async function fetchBids() {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      let query = supabase
        .from("bids")
        .select("*, user_bid_matches(*)", { count: "exact" });

      if (search) {
        query = query.ilike("event_name", `%${search}%`);
      }
      if (sourceFilter !== "all") {
        query = query.eq("source", sourceFilter);
      }
      if (statusFilter !== "all") {
        query = query.eq("go_nogo", statusFilter);
      }
      
      if (!showClosed) {
        query = query.gt("end_date", new Date().toISOString());
      }

      // Sorting logic
      if (sortBy === "closing_soon") {
        query = query.order("end_date", { ascending: true });
      } else if (sortBy === "recently_added") {
        query = query.order("created_at", { ascending: false });
      } else if (sortBy === "highest_value") {
        query = query.order("estimated_value_max", { ascending: false });
      }

      const { data, count, error } = await query
        .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1);

      if (!error) {
        setBids(data || []);
        setTotalCount(count || 0);
      }
      setIsLoading(false);
    }

    const timer = setTimeout(() => {
      fetchBids();
    }, 300);

    return () => clearTimeout(timer);
  }, [supabase, search, sourceFilter, statusFilter, sortBy, showClosed, page]);

  const clearFilters = () => {
    setSearch("");
    setSourceFilter("all");
    setStatusFilter("all");
    setSortBy("closing_soon");
    setShowClosed(false);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F3A]">Marketplace Browse</h1>
          <p className="text-sm text-slate-500">{totalCount} available bids found matching your criteria</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search by bid name, agency or ID..." 
              className="pl-10 h-10 border-slate-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <Select value={sourceFilter} onValueChange={(v) => setSourceFilter(v || "all")}>
            <SelectTrigger className="h-10 border-slate-200">
              <SelectValue placeholder="Source Portal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Portals</SelectItem>
              <SelectItem value="caleprocure">CaleProcure</SelectItem>
              <SelectItem value="planetbids">PlanetBids</SelectItem>
              <SelectItem value="caltrans">Caltrans</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v || "all")}>
            <SelectTrigger className="h-10 border-slate-200">
              <SelectValue placeholder="Go/No-Go Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Analysis</SelectItem>
              <SelectItem value="GO">GO (Qualified)</SelectItem>
              <SelectItem value="REVIEW">Needs Review</SelectItem>
              <SelectItem value="PENDING">Analysis Pending</SelectItem>
              <SelectItem value="NO_GO">NO-GO</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-slate-100 mt-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="show-closed" 
              checked={showClosed} 
              onCheckedChange={(checked) => setShowClosed(checked as boolean)}
            />
            <Label htmlFor="show-closed" className="text-sm font-medium text-slate-600 cursor-pointer">
              Show Closed Bids
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sort By</span>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v || "closing_soon")}>
              <SelectTrigger className="w-[180px] h-9 border-slate-200 bg-slate-50/50">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="closing_soon">Closing Soon</SelectItem>
                <SelectItem value="recently_added">Recently Added</SelectItem>
                <SelectItem value="highest_value">Highest Value</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {(search || sourceFilter !== "all" || statusFilter !== "all" || showClosed) && (
          <div className="flex items-center gap-2 pt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="text-xs h-7 text-[#1E6FD9] hover:text-blue-700 hover:bg-blue-50"
            >
              <X className="h-3 w-3 mr-1" /> Clear all filters
            </Button>
          </div>
        )}
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))
        ) : bids.length > 0 ? (
          <>
            <div className="grid gap-4">
              {bids.map((bid) => (
                <BidCard 
                  key={bid.id} 
                  match={bid.user_bid_matches?.[0]} 
                  bid={bid} 
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between py-6">
              <p className="text-sm text-slate-500">
                Showing <span className="font-semibold">{(page - 1) * ITEMS_PER_PAGE + 1}</span> to{" "}
                <span className="font-semibold">{Math.min(page * ITEMS_PER_PAGE, totalCount)}</span> of{" "}
                <span className="font-semibold">{totalCount}</span> bids
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="h-9 w-9 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={page * ITEMS_PER_PAGE >= totalCount}
                  onClick={() => setPage(page + 1)}
                  className="h-9 w-9 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
            <div className="max-w-xs mx-auto space-y-3">
              <Filter className="h-10 w-10 text-slate-200 mx-auto" />
              <h3 className="text-lg font-semibold text-slate-900">No results found</h3>
              <p className="text-sm text-slate-500">
                We couldn't find any bids matching your search criteria. Try broadening your filters.
              </p>
              <Button variant="link" onClick={clearFilters} className="text-[#1E6FD9]">
                Reset search filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
