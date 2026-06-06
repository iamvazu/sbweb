"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, BookOpen, ArrowRight, MapPin, Building, CreditCard, ChevronRight } from "lucide-react";
import { CATEGORIES, ALL_ARTICLES, Article, StateData } from "@/lib/data/learning-center";
import { cn } from "@/lib/utils";

export default function LearningCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelect = (categorySlug: string) => {
    setActiveCategory(categorySlug);
  };

  // Filter articles based on category and search query
  const filteredArticles = useMemo(() => {
    return ALL_ARTICLES.filter((article) => {
      const matchesCategory =
        activeCategory === "all" || article.category === activeCategory;
      
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        article.title.toLowerCase().includes(searchLower) ||
        article.metaDescription.toLowerCase().includes(searchLower) ||
        (article.stateData?.state && article.stateData.state.toLowerCase().includes(searchLower)) ||
        (article.stateData?.portal && article.stateData.portal.toLowerCase().includes(searchLower));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Separate standard articles and state guides
  const standardArticles = useMemo(() => {
    return filteredArticles.filter((a) => !a.isStateGuide);
  }, [filteredArticles]);

  const stateGuides = useMemo(() => {
    return filteredArticles.filter((a) => a.isStateGuide);
  }, [filteredArticles]);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 dark:bg-brand-navy-900 dark:text-slate-100">
      {/* Hero Section (Light Background matching Homepage sb-hero style) */}
      <section className="relative px-6 pt-32 pb-20 overflow-hidden sb-hero border-b border-slate-200/50 dark:border-white/5 bg-slate-50 dark:bg-brand-navy-900">
        {/* Background Decorative Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue-600/10 dark:bg-brand-blue-600/15 blur-[120px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-brand-blue-600/5 blur-[100px]" />
          <div className="absolute bottom-0 left-0 right-0 h-96 opacity-[0.03] dark:opacity-10 bg-[radial-gradient(#1E6FD9_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-50 dark:bg-brand-blue-500/10 border border-brand-blue-100 dark:border-brand-blue-500/20 backdrop-blur-md mb-6">
            <BookOpen className="w-3.5 h-3.5 text-brand-blue-600 dark:text-brand-blue-400" />
            <span className="text-[10px] font-black tracking-[0.25em] text-brand-blue-600 dark:text-brand-blue-400 uppercase">
              Resource Hub · Expert Bidding Guides
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 dark:text-white tracking-tight mb-6 leading-tight max-w-4xl mx-auto font-bold">
            Stronger Built <span className="text-brand-blue-600 dark:text-brand-blue-400">Learning Center</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Expert strategies, compliance checklists, and comprehensive state-by-state procurement guides to help your business win government contracts.
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-blue-600 transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search guides, portal names, or state names..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-white/10 shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-blue-600 focus:border-transparent text-sm md:text-base font-medium transition-all"
            />
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 -mt-8 relative z-20">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-3 shadow-lg border border-slate-200/80 dark:border-white/10">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-1">
            <button
              onClick={() => handleCategorySelect("all")}
              className={cn(
                "px-5 py-3 rounded-2xl text-[13px] font-bold tracking-tight transition-all shrink-0 cursor-pointer",
                activeCategory === "all"
                  ? "bg-brand-blue-600 text-white shadow-md shadow-brand-blue-500/10"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5"
              )}
            >
              All Topics
            </button>
            {CATEGORIES.map((category) => (
              <button
                key={category.slug}
                onClick={() => handleCategorySelect(category.slug)}
                className={cn(
                  "px-5 py-3 rounded-2xl text-[13px] font-bold tracking-tight transition-all shrink-0 cursor-pointer",
                  activeCategory === category.slug
                    ? "bg-brand-blue-600 text-white shadow-md shadow-brand-blue-500/10"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5"
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        
        {/* If standard articles match the query */}
        {standardArticles.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-2xl font-black text-brand-navy-900">
                  Featured Bidding & Proposal Guides
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Pillar strategies to level up your procurement success
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {standardArticles.map((article) => {
                const catInfo = CATEGORIES.find(c => c.slug === article.category);
                return (
                  <article
                    key={article.slug}
                    className="bg-white rounded-3xl border border-slate-200/80 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200/50">
                          {catInfo?.name || article.category}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400">
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-brand-navy-900 mb-3 group-hover:text-brand-blue-600 transition-colors">
                        <Link href={`/learning-center/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-3">
                        {article.metaDescription}
                      </p>
                    </div>
                    <div>
                      <Link
                        href={`/learning-center/${article.slug}`}
                        className="inline-flex items-center gap-1.5 text-[13px] font-bold text-brand-blue-600 hover:text-blue-700 group/link"
                      >
                        Read Full Guide
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* State Bid Guides section */}
        {stateGuides.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-2xl font-black text-brand-navy-900">
                  State-by-State RFP Bid Guides
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Direct vendor registration, agency breakdown, and portals for the top U.S. economies
                </p>
              </div>
              <span className="text-xs font-bold bg-brand-blue-50 text-brand-blue-600 px-3 py-1.5 rounded-full border border-brand-blue-100">
                {stateGuides.length} Guides Available
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stateGuides.map((article) => {
                const stateData = article.stateData!;
                return (
                  <div
                    key={article.slug}
                    className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-black text-brand-navy-900 flex items-center gap-1.5">
                          <MapPin className="w-4.5 h-4.5 text-brand-blue-600 shrink-0" />
                          {stateData.state}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200/50">
                          State Guide
                        </span>
                      </div>
                      
                      <div className="space-y-3 mb-6 text-sm">
                        <div className="flex items-start gap-2">
                          <Building className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <span className="text-slate-600 leading-tight">
                            <strong className="text-slate-700 font-semibold">Portal:</strong> {stateData.portal}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CreditCard className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <span className="text-slate-600 leading-tight">
                            <strong className="text-slate-700 font-semibold">Fee:</strong> {stateData.fee}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/learning-center/${article.slug}`}
                      className="w-full inline-flex items-center justify-between px-4 py-3 rounded-2xl bg-slate-50 text-slate-700 text-xs font-bold hover:bg-brand-blue-600 hover:text-white hover:shadow-md hover:shadow-brand-blue-500/10 transition-all group/btn"
                    >
                      <span>Get State Bid Details</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty state */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-brand-navy-900 mb-1">No articles found</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              We couldn't find any resources matching "{searchQuery}". Try searching for another keyword or check back later!
            </p>
          </div>
        )}

        {/* Pay-when-you-win CTA block */}
        <div className="mt-24 bg-gradient-to-r from-brand-navy-900 via-[#102a4e] to-[#0d223f] text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl border border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_80%_120%,rgba(30,111,217,0.15),transparent)] pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-brand-blue-600/30 text-brand-blue-400 px-3.5 py-1.5 rounded-full border border-brand-blue-500/30 inline-block mb-6">
              Our Professional Writing Service
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 leading-tight">
              Don't have time to write the proposal?
            </h2>
            <p className="text-base md:text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl">
              We do. Stronger Built's team of veteran government proposal writers handles your complete RFP response. With our unique success-oriented model, you mostly pay when you win.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/login?tab=signup&redirect=/portal/hire"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-brand-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all text-center"
              >
                Start My Bid — $450 Upfront
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white text-sm font-bold transition-all text-center hover:bg-white/5"
              >
                View Pricing Estimator
              </Link>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
