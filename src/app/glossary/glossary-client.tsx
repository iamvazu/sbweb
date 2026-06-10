"use client";

import { useState, useMemo } from "react";
import { Search, ArrowRight, HelpCircle, Phone, BookOpen, Tag } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GLOSSARY_TERMS, GlossaryTerm } from "@/lib/data/glossary";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function GlossaryClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(60);

  // Extract unique categories and their counts
  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    GLOSSARY_TERMS.forEach((term) => {
      counts[term.category] = (counts[term.category] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  // Filtered terms based on search, letter, and category
  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((term) => {
      // 1. Filter by Search Query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesTerm = term.term.toLowerCase().includes(query);
        const matchesAcronym = term.acronym.toLowerCase().includes(query);
        const matchesDef = term.definition.toLowerCase().includes(query);
        if (!matchesTerm && !matchesAcronym && !matchesDef) {
          return false;
        }
      }

      // 2. Filter by Letter
      if (selectedLetter) {
        // Get first character of the term (ignoring special chars like 8(a))
        const firstChar = term.term.trim().charAt(0).toUpperCase();
        const isDigit = /^\d$/.test(firstChar);
        if (selectedLetter === "#") {
          if (!isDigit) return false;
        } else {
          if (firstChar !== selectedLetter) return false;
        }
      }

      // 3. Filter by Category
      if (selectedCategory) {
        if (term.category !== selectedCategory) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedLetter, selectedCategory]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedLetter(null);
    setSelectedCategory(null);
    setVisibleCount(60);
  };

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(selectedLetter === letter ? null : letter);
    setSelectedCategory(null); // Clear category filter to prevent zero results
    setVisibleCount(500); // Show all when filtering by letter
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setSelectedLetter(null); // Clear letter filter to prevent zero results
    setVisibleCount(500); // Show all when filtering by category
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedLetter(null);
    setSelectedCategory(null);
    setVisibleCount(500); // Show all search results
  };

  // Slice visible terms for the main list (avoid loading all 495 if no filters active)
  const visibleTerms = useMemo(() => {
    const isFiltered = searchQuery || selectedLetter || selectedCategory;
    if (isFiltered) {
      return filteredTerms;
    }
    return filteredTerms.slice(0, visibleCount);
  }, [filteredTerms, searchQuery, selectedLetter, selectedCategory, visibleCount]);

  const showMore = () => {
    setVisibleCount((prev) => prev + 60);
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
              Procurement Resources
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 dark:text-white tracking-tight mb-6 leading-[1.05] font-bold">
            GovCon Glossary
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-2xl mx-auto">
            Demystify federal, state, and local contracting jargon. Search and filter over 490+ procurement terms, acronyms, and industry definitions.
          </p>
        </div>
      </section>

      {/* Main Filter and Directory Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Search Input Card */}
        <div className="mb-10 max-w-2xl mx-auto relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-blue-500 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300 pointer-events-none" />
          <div className="relative bg-white dark:bg-brand-navy-900 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center px-4 py-3 shadow-md shadow-black/5">
            <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 mr-3 shrink-0" />
            <input
              type="text"
              placeholder="Search by term, acronym (e.g. SBA, ACAT) or definition..."
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

        {/* Alphabet quick-nav */}
        <div className="border-b border-slate-200 dark:border-white/10 pb-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Directory A-Z
            </span>
            {(selectedLetter || selectedCategory || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-black text-brand-blue-600 dark:text-brand-blue-400 hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
            <button
              onClick={() => {
                setSelectedLetter(null);
                setVisibleCount(60);
              }}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                !selectedLetter
                  ? "bg-brand-blue-600 text-white shadow-md shadow-brand-blue-600/10"
                  : "bg-white border border-slate-200 dark:bg-white/5 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"
              )}
            >
              All
            </button>
            <button
              onClick={() => handleLetterClick("#")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                selectedLetter === "#"
                  ? "bg-brand-blue-600 text-white shadow-md shadow-brand-blue-600/10"
                  : "bg-white border border-slate-200 dark:bg-white/5 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"
              )}
            >
              0-9
            </button>
            {ALPHABET.map((letter) => (
              <button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                  selectedLetter === letter
                    ? "bg-brand-blue-600 text-white shadow-md shadow-brand-blue-600/10"
                    : "bg-white border border-slate-200 dark:bg-white/5 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"
                )}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Category quick-nav */}
        <div className="mb-10">
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-4 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" />
            Filter by Category
          </span>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border",
                  selectedCategory === category.name
                    ? "bg-brand-blue-600/10 border-brand-blue-500 text-brand-blue-600 dark:text-brand-blue-400 shadow-sm"
                    : "bg-white border-slate-200 dark:bg-white/5 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"
                )}
              >
                <span>{category.name}</span>
                <span className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-full",
                  selectedCategory === category.name
                    ? "bg-brand-blue-500/20 text-brand-blue-600 dark:text-brand-blue-400"
                    : "bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400"
                )}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid Header / Summary */}
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-white/5 pb-4">
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
            Showing <span className="text-slate-800 dark:text-white font-black">{filteredTerms.length}</span> terms
          </p>
        </div>

        {/* Glossary Terms Cards Grid */}
        {visibleTerms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTerms.map((term) => (
              <Link
                key={term.slug}
                href={`/glossary/${term.slug}`}
                className="group rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-brand-navy-900/40 p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-brand-blue-200 dark:hover:border-brand-blue-500/30 hover:-translate-y-0.5 transition-all duration-300 text-left cursor-pointer"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="bg-slate-100 dark:bg-white/10 text-[10px] text-slate-500 dark:text-slate-400 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {term.category}
                    </span>
                    {term.acronym && (
                      <span className="bg-brand-blue-50 dark:bg-brand-blue-500/10 text-[10px] text-brand-blue-600 dark:text-brand-blue-400 font-black px-2.5 py-1 rounded-full border border-brand-blue-100/50 dark:border-brand-blue-500/20 uppercase tracking-wider">
                        {term.acronym}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white group-hover:text-brand-blue-600 dark:group-hover:text-brand-blue-400 transition-colors mb-3">
                    {term.term}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-semibold line-clamp-3">
                    {term.definition}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 group-hover:text-brand-blue-600 dark:group-hover:text-brand-blue-400 transition-colors">
                    Read full guide
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-brand-blue-600 dark:group-hover:text-brand-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-brand-navy-900/20 border border-slate-200 dark:border-white/5 rounded-3xl p-8 max-w-xl mx-auto shadow-sm">
            <HelpCircle className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No matching terms found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6">
              We couldn't find any glossary terms matching your search criteria. Try checking spelling or resetting filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center justify-center bg-brand-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full shadow-md transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Show More Pagination (only if no filters applied) */}
        {!searchQuery && !selectedLetter && !selectedCategory && filteredTerms.length > visibleCount && (
          <div className="mt-12 text-center">
            <button
              onClick={showMore}
              className="inline-flex items-center justify-center bg-white hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              Show More Terms
            </button>
          </div>
        )}
      </section>

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
                Use your knowledge of government contracting to win high-paying RFPs. We handle the proposal writing on a success-aligned model.
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
