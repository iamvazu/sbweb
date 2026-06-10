"use client";

import { useState, useMemo } from "react";
import { Search, ArrowRight, HelpCircle, Phone, BookOpen, Tag, ChevronDown, ShieldCheck, Award, TrendingUp, Users, FileText, CheckCircle2, AlertTriangle, Layers } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NAICS_CODES } from "@/lib/data/naics";

const SECTORS = [
  { id: "11", name: "Agriculture, Forestry, Fishing & Hunting", range: ["11"] },
  { id: "21", name: "Mining, Quarrying, Oil & Gas", range: ["21"] },
  { id: "22", name: "Utilities", range: ["22"] },
  { id: "23", name: "Construction", range: ["23"] },
  { id: "31-33", name: "Manufacturing", range: ["31", "32", "33"] },
  { id: "42", name: "Wholesale Trade", range: ["42"] },
  { id: "44-45", name: "Retail Trade", range: ["44", "45"] },
  { id: "48-49", name: "Transportation & Warehousing", range: ["48", "49"] },
  { id: "51", name: "Information & Media", range: ["51"] },
  { id: "52", name: "Finance & Insurance", range: ["52"] },
  { id: "53", name: "Real Estate & Rental", range: ["53"] },
  { id: "54", name: "Professional & Technical Services", range: ["54"] },
  { id: "55", name: "Management of Companies", range: ["55"] },
  { id: "56", name: "Admin, Support & Waste Management", range: ["56"] },
  { id: "61", name: "Educational Services", range: ["61"] },
  { id: "62", name: "Health Care & Social Assistance", range: ["62"] },
  { id: "71", name: "Arts, Entertainment & Recreation", range: ["71"] },
  { id: "72", name: "Accommodation & Food Services", range: ["72"] },
  { id: "81", name: "Other Services (except Public Admin)", range: ["81"] },
  { id: "92", name: "Public Administration", range: ["92"] }
];

const FAQS = [
  {
    question: "What is the difference between SIC and NAICS codes?",
    answer: "The Standard Industrial Classification (SIC) system was replaced by the North American Industry Classification System (NAICS) in 1997. NAICS provides a more detailed and updated classification of industries, reflecting the modern economy. While SIC codes are still used in some legacy contexts, NAICS codes are the current standard for federal statistical purposes, census data collection, and government contracting."
  },
  {
    question: "How often are NAICS codes updated?",
    answer: "NAICS codes are reviewed and updated every five years to reflect changes in the economy, emerging industries, and new technologies. The most recent revision was published in 2022, which merged or redefined several retail, media, and technology classifications."
  },
  {
    question: "Can a business have more than one NAICS code?",
    answer: "Yes, businesses with diverse operations can have multiple NAICS codes to represent different segments of their activities. However, for government registration (such as SAM.gov), you must select one primary NAICS code that represents your main line of business, and you can add as many secondary NAICS codes as apply to your capabilities."
  },
  {
    question: "How do I change my NAICS code if my business activities have evolved?",
    answer: "To update your NAICS code, you can log in to your System for Award Management (SAM.gov) profile and edit your representations and certifications. You can add or delete secondary NAICS codes or change your primary NAICS code. Keeping these current is crucial to ensure you continue to qualify for solicitations and set-aside programs."
  },
  {
    question: "Is there a NAICS code for non-profit organizations?",
    answer: "Yes, non-profit organizations are classified under the same NAICS codes as for-profit businesses depending on their industry activity. Additionally, many charitable, religious, civic, and professional associations fall under sector 813 (Religious, Grantmaking, Civic, Professional, and Similar Organizations)."
  }
];

export default function NaicsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(60);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Calculate code count per sector
  const sectorCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    SECTORS.forEach((sector) => {
      counts[sector.id] = NAICS_CODES.filter((item) => {
        const firstTwo = item.code.substring(0, 2);
        return sector.range.includes(firstTwo);
      }).length;
    });
    return counts;
  }, []);

  // Filtered NAICS codes based on search and selected sector
  const filteredCodes = useMemo(() => {
    return NAICS_CODES.filter((item) => {
      // 1. Filter by Search Query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesCode = item.code.includes(query);
        const matchesTitle = item.title.toLowerCase().includes(query);
        if (!matchesCode && !matchesTitle) {
          return false;
        }
      }

      // 2. Filter by Sector
      if (selectedSector) {
        const firstTwo = item.code.substring(0, 2);
        const sectorObj = SECTORS.find((s) => s.id === selectedSector);
        if (sectorObj && !sectorObj.range.includes(firstTwo)) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedSector]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedSector(null);
    setVisibleCount(60);
  };

  const handleSectorClick = (sectorId: string) => {
    setSelectedSector(selectedSector === sectorId ? null : sectorId);
    setVisibleCount(60); // Reset visible count on filter
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedSector(null); // Clear sector filter when searching for broad match
    setVisibleCount(60);
  };

  const visibleCodes = useMemo(() => {
    return filteredCodes.slice(0, visibleCount);
  }, [filteredCodes, visibleCount]);

  const showMore = () => {
    setVisibleCount((prev) => prev + 60);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 dark:bg-brand-navy-950 dark:text-slate-100 font-sans">
      
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden sb-hero border-b border-slate-200/50 dark:border-white/5 bg-slate-50 dark:bg-brand-navy-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue-600/10 dark:bg-brand-blue-600/15 blur-[120px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-brand-blue-600/5 blur-[100px]" />
          <div className="absolute bottom-0 left-0 right-0 h-96 opacity-[0.03] dark:opacity-10 bg-[radial-gradient(#1E6FD9_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-50 dark:bg-brand-blue-500/10 border border-brand-blue-100 dark:border-brand-blue-500/20 backdrop-blur-md mb-6">
            <span className="text-[10px] font-black tracking-[0.25em] text-brand-blue-600 dark:text-brand-blue-400 uppercase">
              Procurement Intelligence
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 dark:text-white tracking-tight mb-6 leading-[1.05] font-bold">
            NAICS Codes Directory
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-2xl mx-auto">
            Browse and search all 1,000+ industry classification codes (NAICS 2022). Find size standards, set-aside codes, and federal contracting opportunities.
          </p>
        </div>
      </section>

      {/* Interactive Lookup Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Search Bar */}
        <div className="mb-10 max-w-2xl mx-auto relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-blue-500 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300 pointer-events-none" />
          <div className="relative bg-white dark:bg-brand-navy-900 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center px-4 py-3 shadow-md shadow-black/5">
            <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 mr-3 shrink-0" />
            <input
              type="text"
              placeholder="Search by 6-digit NAICS code or industry keyword (e.g. 541511, paint, clean)..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm md:text-base font-medium"
            />
            {searchQuery && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-slate-400 hover:text-brand-blue-500 dark:text-slate-500 dark:hover:text-brand-blue-400 uppercase cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Sector Quick Filters */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              Filter by Sector
            </span>
            {(selectedSector || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-black text-brand-blue-600 dark:text-brand-blue-400 hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setSelectedSector(null);
                setVisibleCount(60);
              }}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer",
                !selectedSector
                  ? "bg-brand-blue-600/10 border-brand-blue-500 text-brand-blue-600 dark:text-brand-blue-400"
                  : "bg-white border-slate-200 dark:bg-white/5 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"
              )}
            >
              All Sectors ({NAICS_CODES.length})
            </button>
            {SECTORS.map((sector) => (
              <button
                key={sector.id}
                onClick={() => handleSectorClick(sector.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer",
                  selectedSector === sector.id
                    ? "bg-brand-blue-600/10 border-brand-blue-500 text-brand-blue-600 dark:text-brand-blue-400"
                    : "bg-white border-slate-200 dark:bg-white/5 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"
                )}
              >
                <span>{sector.name}</span>
                <span className={cn(
                  "text-[9px] px-1.5 py-0.5 rounded-full",
                  selectedSector === sector.id
                    ? "bg-brand-blue-500/20 text-brand-blue-600 dark:text-brand-blue-400"
                    : "bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400"
                )}>
                  {sectorCounts[sector.id]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-white/5 pb-4">
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
            Showing <span className="text-slate-800 dark:text-white font-black">{filteredCodes.length}</span> industry codes
          </p>
        </div>

        {/* NAICS Cards Grid */}
        {visibleCodes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCodes.map((item) => (
              <div
                key={item.code}
                className="group rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-brand-navy-900/40 p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-brand-blue-200 dark:hover:border-brand-blue-500/30 transition-all duration-300 text-left"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-brand-blue-50 dark:bg-brand-blue-500/10 text-xs text-brand-blue-600 dark:text-brand-blue-400 font-black px-3 py-1 rounded-full border border-brand-blue-100/50 dark:border-brand-blue-500/20 uppercase tracking-widest">
                      Code {item.code}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white group-hover:text-brand-blue-600 dark:group-hover:text-brand-blue-400 transition-colors mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                    Sector: {SECTORS.find(s => s.range.includes(item.code.substring(0, 2)))?.name || "Unknown"}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    SAM.gov Class
                  </span>
                  <a
                    href={`/open-bids?naics=${item.code}`}
                    className="text-xs font-bold text-brand-blue-600 dark:text-brand-blue-400 hover:underline flex items-center gap-1 group/btn"
                  >
                    View Bids <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-brand-navy-900/20 border border-slate-200 dark:border-white/5 rounded-3xl p-8 max-w-xl mx-auto shadow-sm">
            <HelpCircle className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No NAICS codes found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6">
              No results match "{searchQuery}". Try searching for a different keyword or checking the code spelling.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center justify-center bg-brand-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full shadow-md transition-all cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        )}

        {/* Show More Pagination */}
        {filteredCodes.length > visibleCount && (
          <div className="mt-12 text-center">
            <button
              onClick={showMore}
              className="inline-flex items-center justify-center bg-white hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              Show More Codes
            </button>
          </div>
        )}
      </section>

      {/* Educational Copy Section */}
      <div className="border-t border-slate-200 dark:border-white/5 bg-white dark:bg-brand-navy-900/20">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24 space-y-20">
          
          {/* Section 1: What Are NAICS Codes */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
                What Are NAICS Codes?
              </h2>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                NAICS (North American Industry Classification System) codes are 6-digit numbers used to classify businesses by their primary economic activity. These codes are essential for government contracting as they determine your eligibility for specific contracts, set-aside programs, and size standards. The right NAICS codes can unlock millions in contract opportunities and give you access to exclusive programs worth over $150 billion annually.
              </p>
            </div>
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0a1128] to-[#02050d] border border-slate-800/80 rounded-3xl p-8 text-white space-y-4">
              <div className="w-10 h-10 rounded-xl bg-brand-blue-500/10 border border-brand-blue-500/20 flex items-center justify-center text-brand-blue-400">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold">Standard Industry Classification</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Agencies use NAICS codes to define target markets. Registering the correct NAICS codes in your SAM.gov profile is the foundation of a successful bidding strategy.
              </p>
            </div>
          </section>

          {/* Section 2: NAICS Hierarchy */}
          <section className="bg-slate-50 dark:bg-brand-navy-900/40 rounded-3xl border border-slate-200 dark:border-white/5 p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-6">
                The NAICS Code Hierarchy
              </h3>
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 text-base font-bold text-slate-800 dark:text-slate-200">
                    How It Works
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    Each digit level becomes more specific, opening different contract opportunities. The more specific your code, the better your targeting—but broader codes can access more opportunities.
                  </p>
                </div>
                <div className="rounded-2xl bg-white dark:bg-brand-navy-950 p-6 border border-slate-200 dark:border-white/15">
                  <div className="mb-3 text-xs font-black text-brand-blue-600 dark:text-brand-blue-400 uppercase tracking-wider">
                    Example: 541511 (Custom Computer Programming)
                  </div>
                  <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 font-semibold">
                    <div><span className="font-black text-slate-800 dark:text-white">54</span> - Sector (Professional Services)</div>
                    <div><span className="font-black text-slate-800 dark:text-white">541</span> - Subsector (Professional, Scientific & Technical)</div>
                    <div><span className="font-black text-slate-800 dark:text-white">5415</span> - Industry Group (Computer Systems Design)</div>
                    <div><span className="font-black text-slate-800 dark:text-white">54151</span> - NAICS Industry (Computer Systems Design Services)</div>
                    <div><span className="font-black text-slate-800 dark:text-white">541511</span> - National Industry (Custom Computer Programming)</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Why NAICS Codes Matter */}
          <section className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 dark:text-white text-center tracking-tight">
              Why NAICS Codes Matter for Your Business
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-brand-navy-900/40 p-6 md:p-8 space-y-4">
                <h4 className="flex items-center gap-2.5 text-lg font-bold text-slate-900 dark:text-white">
                  <ShieldCheck className="w-5 h-5 text-brand-blue-500" />
                  Unlock Set-Aside Opportunities
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Access small business, woman-owned, veteran-owned, and minority set-aside contracts worth over $150 billion annually. The right NAICS codes determine your eligibility for these exclusive programs.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-brand-navy-900/40 p-6 md:p-8 space-y-4">
                <h4 className="flex items-center gap-2.5 text-lg font-bold text-slate-900 dark:text-white">
                  <TrendingUp className="w-5 h-5 text-brand-blue-500" />
                  Better Contract Targeting
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Match to contracts specifically seeking your industry classification. Agencies specify NAICS codes in solicitations, and having the right codes increases your win rate significantly.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-brand-navy-900/40 p-6 md:p-8 space-y-4">
                <h4 className="flex items-center gap-2.5 text-lg font-bold text-slate-900 dark:text-white">
                  <Users className="w-5 h-5 text-brand-blue-500" />
                  Size Standard Compliance
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Understand qualification thresholds for different contract types. Each NAICS code has specific size standards that determine your small business status and eligibility.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-brand-navy-900/40 p-6 md:p-8 space-y-4">
                <h4 className="flex items-center gap-2.5 text-lg font-bold text-slate-900 dark:text-white">
                  <FileText className="w-5 h-5 text-brand-blue-500" />
                  Market Intelligence
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Track spending trends and opportunities in your NAICS codes. Historical award data reveals which agencies are spending in your industry and helps identify opportunities.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: How to Choose */}
          <section className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 dark:text-white text-center tracking-tight">
              How to Choose the Right NAICS Codes
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-brand-navy-900/40 p-6 space-y-4">
                <div className="w-8 h-8 rounded-lg bg-brand-blue-50 dark:bg-brand-blue-500/10 border border-brand-blue-100 dark:border-brand-blue-500/20 flex items-center justify-center font-bold text-brand-blue-600 dark:text-brand-blue-400 text-sm">
                  1
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Identify Primary Activity</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                  Determine what generates the majority of your revenue. This becomes your primary NAICS code for government registration and size standard calculations.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-brand-navy-900/40 p-6 space-y-4">
                <div className="w-8 h-8 rounded-lg bg-brand-blue-50 dark:bg-brand-blue-500/10 border border-brand-blue-100 dark:border-brand-blue-500/20 flex items-center justify-center font-bold text-brand-blue-600 dark:text-brand-blue-400 text-sm">
                  2
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Research Secondary Codes</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                  Identify 3-5 additional NAICS codes that represent other services or products you can provide to expand your contract opportunities.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-brand-navy-900/40 p-6 space-y-4">
                <div className="w-8 h-8 rounded-lg bg-brand-blue-50 dark:bg-brand-blue-500/10 border border-brand-blue-100 dark:border-brand-blue-500/20 flex items-center justify-center font-bold text-brand-blue-600 dark:text-brand-blue-400 text-sm">
                  3
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Use This NAICS Directory</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                  Search and browse this directory to find relevant codes. Use keywords or browse by sectors to find classifications matching your capabilities.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-brand-navy-900/40 p-6 space-y-4">
                <div className="w-8 h-8 rounded-lg bg-brand-blue-50 dark:bg-brand-blue-500/10 border border-brand-blue-100 dark:border-brand-blue-500/20 flex items-center justify-center font-bold text-brand-blue-600 dark:text-brand-blue-400 text-sm">
                  4
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Verify Size Standards</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                  Check the size standards for each code to ensure you qualify as a small business and understand revenue thresholds for different programs.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Avoid Mistakes */}
          <section className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 dark:text-white text-center tracking-tight">
              Avoid These Costly NAICS Code Mistakes
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8 space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-red-600 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    Using Only One Code
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2 font-medium">
                    Limiting your business to a single NAICS code is a common mistake. It can lead to missing up to 60% of related government solicitations.
                  </p>
                </div>
                <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-4 mt-6">
                  <h5 className="text-[10px] font-black text-green-500 uppercase tracking-wider">The Solution:</h5>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium mt-1">
                    Register 3-5 related codes in SAM.gov to capture all related bid opportunities.
                  </p>
                </div>
              </div>
              <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8 space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-red-600 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    Choosing Too Broad
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2 font-medium">
                    Selecting codes that are too broad puts you in direct competition with massive industry conglomerates and reduces your visibility.
                  </p>
                </div>
                <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-4 mt-6">
                  <h5 className="text-[10px] font-black text-green-500 uppercase tracking-wider">The Solution:</h5>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium mt-1">
                    Find the sweet spot. Use specific 6-digit codes matching your core capabilities.
                  </p>
                </div>
              </div>
              <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8 space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-red-600 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    Ignoring Set-Asides
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2 font-medium">
                    Many businesses register codes without checking if those codes offer set-aside preferences for small, veteran, or woman-owned entities.
                  </p>
                </div>
                <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-4 mt-6">
                  <h5 className="text-[10px] font-black text-green-500 uppercase tracking-wider">The Solution:</h5>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium mt-1">
                    Leverage small business codes. Align your NAICS strategy with federal set-aside goals.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: How Stronger Built / BidIQ Optimizes Your Strategy */}
          <section className="bg-gradient-to-br from-[#0a1128] via-[#050a17] to-[#02050d] rounded-[2.5rem] border border-slate-800 p-8 md:p-16 text-white text-center space-y-8 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
            <div className="max-w-3xl mx-auto space-y-6 relative z-10">
              <h2 className="text-2xl md:text-4xl font-serif font-bold tracking-tight">
                How BidIQ by STRONGERbuilt Optimizes Your NAICS Strategy
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                Our platform integrates intelligence with operational bidding to maximize your competitive positioning and win rate.
              </p>
              <div className="grid gap-6 md:grid-cols-3 text-left pt-6">
                <div className="space-y-2">
                  <div className="text-brand-blue-500"><CheckCircle2 className="w-6 h-6" /></div>
                  <h4 className="font-bold text-sm">AI Code Recommendations</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Our AI analyzes your capabilities statement and recommends the optimal primary and secondary NAICS codes.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-brand-blue-500"><CheckCircle2 className="w-6 h-6" /></div>
                  <h4 className="font-bold text-sm">Contract Opportunity Matching</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Automatically match your NAICS codes to live solicitations and track historical awards in your industry.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-brand-blue-500"><CheckCircle2 className="w-6 h-6" /></div>
                  <h4 className="font-bold text-sm">Set-Aside Qualification</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Get detailed insights into which set-aside programs you qualify for based on size standards.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: FAQs */}
          <section className="space-y-6 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                NAICS Codes FAQ
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-brand-navy-900/20 overflow-hidden divide-y divide-slate-200 dark:divide-white/10">
              {FAQS.map((faq, index) => (
                <div key={index} className="px-6 py-5">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex justify-between items-center w-full text-left font-bold text-slate-800 dark:text-white hover:text-brand-blue-500 dark:hover:text-brand-blue-400 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 shrink-0 transition-transform duration-300 text-slate-400",
                        openFaqIndex === index ? "rotate-180 text-brand-blue-500" : ""
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "transition-all duration-300 overflow-hidden",
                      openFaqIndex === index ? "max-h-[300px] mt-4 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-6 pb-24 pt-12">
        <div className="relative rounded-[2.5rem] overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-500 min-h-[280px] flex flex-col justify-between p-10 md:p-16 bg-brand-blue-600 text-white border border-transparent">
          <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 w-full font-sans">
            <div className="space-y-4 max-w-xl">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
                Ready to Win More Bids?
              </h2>
              <p className="text-sm md:text-base text-blue-100 leading-relaxed font-semibold">
                Use your NAICS codes knowledge to win high-paying RFPs. We handle the proposal writing on a success-aligned model.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 items-center shrink-0">
              <Link
                href="/book-call"
                className="inline-flex items-center gap-2 text-xs font-black text-brand-navy-900 bg-white hover:bg-slate-100 px-6 py-4 rounded-full uppercase tracking-widest shadow-lg transition-all hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                <span>Book a Free Call</span>
              </Link>
              <Link
                href="/open-bids"
                className="inline-flex items-center gap-2 text-xs font-black text-white bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-4 rounded-full uppercase tracking-widest transition-all hover:-translate-y-0.5"
              >
                <Search className="w-4 h-4" />
                <span>Search Open Bids</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
