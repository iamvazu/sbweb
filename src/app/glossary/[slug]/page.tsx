import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Phone, Search, HelpCircle, FileText, CheckCircle, ShieldCheck } from "lucide-react";
import { GLOSSARY_TERMS } from "@/lib/data/glossary";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GLOSSARY_TERMS.map((term) => ({
    slug: term.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const term = GLOSSARY_TERMS.find((t) => t.slug === resolvedParams.slug);

  if (!term) {
    return {
      title: "Term Not Found | Stronger Built",
    };
  }

  const acronymText = term.acronym ? ` (${term.acronym})` : "";
  return {
    title: `${term.term}${acronymText} - GovCon Glossary | Stronger Built`,
    description: `What does ${term.term}${acronymText} mean in government contracting? Read the definition of this ${term.category.toLowerCase()} term and how it affects bidding.`,
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const termIndex = GLOSSARY_TERMS.findIndex((t) => t.slug === resolvedParams.slug);

  if (termIndex === -1) {
    notFound();
  }

  const term = GLOSSARY_TERMS[termIndex];

  // Find previous and next terms for navigation/crawling
  const prevTerm = GLOSSARY_TERMS[termIndex > 0 ? termIndex - 1 : GLOSSARY_TERMS.length - 1];
  const nextTerm = GLOSSARY_TERMS[termIndex < GLOSSARY_TERMS.length - 1 ? termIndex + 1 : 0];

  const acronymText = term.acronym ? ` (${term.acronym})` : "";

  // Prepare schema data for DefinedTerm
  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": term.term,
    "description": term.definition,
    "inDefinedTermSet": "https://www.strongerbuilt.us/glossary",
    "termCode": term.acronym || undefined
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 dark:bg-brand-navy-950 dark:text-slate-100 font-sans">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
      />

      {/* Header Block */}
      <section className="relative px-6 pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden sb-hero border-b border-slate-200/50 dark:border-white/5 bg-[#0a1128] text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue-600/10 dark:bg-brand-blue-600/15 blur-[120px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-indigo-900/10 blur-[100px]" />
          <div className="absolute bottom-0 left-0 right-0 h-96 opacity-[0.02] bg-[radial-gradient(#1E6FD9_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/glossary" className="hover:text-white transition-colors">GovCon Glossary</Link>
            <span>/</span>
            <span className="text-brand-blue-400">{term.acronym || "Term"}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-white/5 border border-white/10 text-[10px] text-slate-300 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {term.category}
            </span>
            {term.acronym && (
              <span className="bg-brand-blue-500/20 text-[10px] text-brand-blue-400 font-black px-3 py-1 rounded-full border border-brand-blue-500/30 uppercase tracking-wider">
                {term.acronym}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight mb-4 font-bold leading-tight">
            {term.term}
          </h1>
          <p className="text-sm md:text-base text-slate-400 font-medium">
            Government Procurement & Contracting Dictionary
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-12">
          {/* Core Definition block */}
          <div className="bg-white dark:bg-brand-navy-900 border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-brand-blue-600" />
            <h2 className="text-xs font-black text-brand-blue-600 dark:text-brand-blue-400 uppercase tracking-widest mb-4">
              Definition
            </h2>
            <p className="text-xl md:text-2xl font-serif leading-relaxed text-slate-900 dark:text-white font-semibold">
              {term.definition}
            </p>
          </div>

          {/* Context and Importance block */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-white/10">
              Understanding {term.term} in GovCon
            </h2>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
              In public procurement, terms like <strong>{term.term}</strong>{term.acronym ? ` (often abbreviated as ${term.acronym})` : ""} dictate how agencies interact with commercial suppliers, issue bids, structure evaluations, and manage compliance. Failing to understand these details can result in non-compliant proposals or missed opportunities.
            </p>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
              Whether you are bidding on federal contracts, state RFPs, or local municipal bids, aligning your operations with standard procurement concepts ensures that your proposal is evaluated fairly and is not immediately disqualified on a pass/fail technicality.
            </p>
          </div>

          {/* Stronger Built Value Pitch */}
          <div className="bg-slate-100 dark:bg-brand-navy-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-8 flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-brand-blue-600/10 p-3 rounded-2xl border border-brand-blue-500/20 text-brand-blue-600 dark:text-brand-blue-400 shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                How Stronger Built Navigates Compliance For You
              </h3>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-semibold">
                Government contracting is full of complicated regulations, strict requirements, and complex acronyms like {term.acronym || term.term}. At Stronger Built, we act as your outsourced proposal writing department. We review the solicitations, build a complete compliance matrix, write professional responses, and submit the package on time. 
              </p>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-semibold">
                Best of all, we work under a shared-risk model: you pay a low commitment fee to start, and we take our success fee only when you win.
              </p>
            </div>
          </div>

          {/* Sequential Crawl Navigation links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-slate-200 dark:border-white/10">
            <Link
              href={`/glossary/${prevTerm.slug}`}
              className="group flex flex-col items-start p-5 rounded-2xl bg-white dark:bg-brand-navy-900/20 border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15 hover:bg-slate-100/50 dark:hover:bg-white/5 transition-all text-left cursor-pointer"
            >
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                Previous Term
              </span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                {prevTerm.term}
              </span>
            </Link>
            <Link
              href={`/glossary/${nextTerm.slug}`}
              className="group flex flex-col items-end p-5 rounded-2xl bg-white dark:bg-brand-navy-900/20 border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15 hover:bg-slate-100/50 dark:hover:bg-white/5 transition-all text-right cursor-pointer"
            >
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                Next Term
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                {nextTerm.term}
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="relative rounded-[2.5rem] overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-500 min-h-[280px] flex flex-col justify-between p-10 md:p-16 bg-brand-blue-600 text-white border border-transparent">
          <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 w-full font-sans">
            <div className="space-y-4 max-w-xl">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
                Have questions about {term.acronym || "this term"}?
              </h2>
              <p className="text-sm md:text-base text-blue-100 leading-relaxed font-semibold">
                Our bidding experts can explain how this requirements matrix fits into your active RFP. Let's write a winning proposal.
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
