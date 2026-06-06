"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowLeft, MapPin, Building, CreditCard, ChevronRight, BookOpen } from "lucide-react";
import { CATEGORIES, ALL_ARTICLES, getArticlesByCategory } from "@/lib/data/learning-center";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryHubPage({ params }: PageProps) {
  const { category: categorySlug } = React.use(params);
  const [searchQuery, setSearchQuery] = useState("");

  // Find the category info
  const categoryInfo = useMemo(() => {
    return CATEGORIES.find((c) => c.slug === categorySlug);
  }, [categorySlug]);

  // Get and filter articles for this category
  const filteredArticles = useMemo(() => {
    const articles = ALL_ARTICLES.filter((a) => a.category === categorySlug);
    if (!searchQuery) return articles;

    const searchLower = searchQuery.toLowerCase();
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(searchLower) ||
        a.metaDescription.toLowerCase().includes(searchLower) ||
        (a.stateData?.state && a.stateData.state.toLowerCase().includes(searchLower)) ||
        (a.stateData?.portal && a.stateData.portal.toLowerCase().includes(searchLower))
    );
  }, [categorySlug, searchQuery]);

  if (!categoryInfo) {
    return (
      <div className="bg-slate-50 min-h-screen text-slate-800 flex flex-col justify-center items-center py-20 px-6">
        <div className="text-center max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h1 className="text-2xl font-black text-brand-navy-900 mb-2">Category Not Found</h1>
          <p className="text-slate-500 mb-6 text-sm">
            We couldn't find a learning center category matching "{categorySlug}".
          </p>
          <Link
            href="/learning-center"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Learning Center
          </Link>
        </div>
      </div>
    );
  }

  // Separate state guides and standard articles within the category
  const isStateCategory = categorySlug === "state-bid-guides";

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 pt-28">
      {/* Breadcrumbs & Header Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <Link
          href="/learning-center"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-blue-600 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Learning Center
        </Link>

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/80 shadow-sm relative overflow-hidden mb-12">
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-brand-blue-50/20 to-transparent pointer-events-none" />
          <div className="max-w-3xl relative z-10">
            <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full bg-brand-blue-50 text-brand-blue-600 border border-brand-blue-100 mb-4 inline-block">
              Category Hub
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-navy-900 tracking-tight mb-4">
              {categoryInfo.name}
            </h1>
            <p className="text-base md:text-lg text-slate-500 leading-relaxed font-medium mb-8">
              {categoryInfo.description}
            </p>

            {/* Search within Category */}
            <div className="max-w-md relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-blue-500 transition-colors">
                <Search className="w-4.5 h-4.5" />
              </div>
              <input
                type="text"
                placeholder={`Search inside ${categoryInfo.name}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-200/80 focus:outline-none focus:ring-2 focus:ring-brand-blue-600 focus:bg-white text-xs font-bold transition-all"
              />
            </div>
          </div>
        </div>

        {/* Content list */}
        {filteredArticles.length > 0 ? (
          <div>
            {isStateCategory ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => {
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
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <article
                    key={article.slug}
                    className="bg-white rounded-3xl border border-slate-200/80 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4">
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
                        <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-xl mx-auto">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-4" />
            <h3 className="text-base font-bold text-brand-navy-900 mb-1">No articles found</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              No articles in this category match "{searchQuery}". Try a different keyword.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
