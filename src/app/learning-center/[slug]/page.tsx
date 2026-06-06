"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Building, CreditCard, ExternalLink, Calendar, User, ChevronDown, CheckCircle2 } from "lucide-react";
import { getArticleBySlug, STATE_GUIDES, CATEGORIES, FAQItem } from "@/lib/data/learning-center";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ArticleDetailPage({ params }: PageProps) {
  const { slug } = React.use(params);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Find the article
  const article = useMemo(() => {
    return getArticleBySlug(slug);
  }, [slug]);

  // If this is a state guide, find its index and neighboring state guides
  const neighboringStateGuides = useMemo(() => {
    if (!article?.isStateGuide) return [];
    const currentIndex = STATE_GUIDES.findIndex((s) => s.slug === slug);
    if (currentIndex === -1) return [];

    // Select the next 3 states, wrapping around the end of the array
    return [
      STATE_GUIDES[(currentIndex + 1) % STATE_GUIDES.length],
      STATE_GUIDES[(currentIndex + 2) % STATE_GUIDES.length],
      STATE_GUIDES[(currentIndex + 3) % STATE_GUIDES.length],
    ];
  }, [article, slug]);

  // If it's a standard article, find other standard articles to recommend
  const recommendedArticles = useMemo(() => {
    if (article?.isStateGuide) return [];
    // Just grab up to 3 other guides in the same category or overall
    const allGuides = getArticleBySlug(slug) ? STATE_GUIDES.slice(0, 3) : [];
    return allGuides;
  }, [article, slug]);

  if (!article) {
    return (
      <div className="bg-slate-50 min-h-screen text-slate-800 flex flex-col justify-center items-center py-20 px-6">
        <div className="text-center max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h1 className="text-2xl font-black text-brand-navy-900 mb-2">Guide Not Found</h1>
          <p className="text-slate-500 mb-6 text-sm">
            We couldn't find the requested learning guide. It may have been moved or renamed.
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

  const categoryInfo = CATEGORIES.find((c) => c.slug === article.category);

  // Generate the dynamic content for state guides
  const stateData = article.stateData;
  const faqsToRender: FAQItem[] = article.faqs || stateData?.faqs || [];

  // Construct JSON-LD schemas
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.metaTitle || article.title,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "author": { "@type": "Organization", "name": "Stronger Built LLC" },
    "publisher": {
      "@type": "Organization",
      "name": "Stronger Built LLC",
      "logo": { "@type": "ImageObject", "url": "https://strongerbuilt.us/logo.png" }
    },
    "mainEntityOfPage": `https://strongerbuilt.us/learning-center/${article.slug}`
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Learning Center",
        "item": "https://strongerbuilt.us/learning-center"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": categoryInfo?.name || "Guides",
        "item": `https://strongerbuilt.us/learning-center/category/${article.category}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `https://strongerbuilt.us/learning-center/${article.slug}`
      }
    ]
  };

  const faqSchema = faqsToRender.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqsToRender.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 pt-28 pb-20">
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Breadcrumb Links */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8 overflow-x-auto scrollbar-hide py-1">
          <Link href="/learning-center" className="hover:text-brand-blue-600 transition-colors shrink-0">
            Learning Center
          </Link>
          <span>/</span>
          <Link href={`/learning-center/category/${article.category}`} className="hover:text-brand-blue-600 transition-colors shrink-0">
            {categoryInfo?.name || "Category"}
          </Link>
          <span>/</span>
          <span className="text-slate-700 truncate max-w-[200px] md:max-w-xs">{article.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <main className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-10 border border-slate-200/80 shadow-sm">
            
            {/* Header info */}
            <div className="border-b border-slate-100 pb-6 mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-navy-900 tracking-tight leading-tight mb-4">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/50 text-slate-500">
                  {categoryInfo?.name || "Guide"}
                </span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Updated June 2026</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>Stronger Built Team</span>
                </div>
              </div>
            </div>

            {/* Quick Answer Box */}
            <div className="bg-brand-blue-50/50 border border-brand-blue-100 rounded-3xl p-6 md:p-8 mb-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-brand-blue-600" />
              <h3 className="text-xs font-black uppercase tracking-wider text-brand-blue-600 mb-2">
                Quick Answer
              </h3>
              <p className="text-slate-700 font-medium leading-relaxed text-sm md:text-base">
                {article.quickAnswer}
              </p>
            </div>

            {/* State Bid Guide Content Template */}
            {article.isStateGuide && stateData ? (
              <div className="prose prose-slate max-w-none space-y-8">
                <p className="text-slate-600 leading-relaxed italic">
                  {stateData.hook}
                </p>

                <div>
                  <h2 className="text-xl md:text-2xl font-black text-brand-navy-900 mb-4 border-b border-slate-100 pb-2">
                    Where do I find government RFPs in {stateData.state}?
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base mb-4">
                    <strong className="text-slate-800">{stateData.portal}</strong> is the official eProcurement platform for {stateData.state}'s public sector contracts. The state centralizes bidding information on this portal, making it the primary hub for contractors to discover active request for proposals, tenders, and solicitations.
                  </p>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    State agencies, departments, and public universities advertise their purchasing needs here, ranging from small commercial purchases to multi-million dollar construction and consulting contracts.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl md:text-2xl font-black text-brand-navy-900 mb-4 border-b border-slate-100 pb-2">
                    How do I register as a vendor in {stateData.state}?
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base mb-4">
                    To register as a vendor in {stateData.state}, you must visit the <strong className="text-slate-800">{stateData.registration}</strong> system. You will need to create a supplier account, verify your business details (including your Tax ID and legal name), and configure your notification preferences.
                  </p>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    During registration, pay close attention to commodity classification codes (such as NIGP or UNSPSC codes). Selecting the correct codes ensures that you receive automatic notifications when state buyers post solicitations matching your industry.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl md:text-2xl font-black text-brand-navy-900 mb-4 border-b border-slate-100 pb-2">
                    Which {stateData.state} agencies award the most contracts?
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base mb-4">
                    State-level procurement is distributed across multiple departments. In {stateData.state}, the largest buyers and contracting authorities include <strong className="text-slate-800">{stateData.keyAgencies}</strong>.
                  </p>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    These key organizations procure a continuous volume of professional services, security, healthcare staffing, janitorial support, and IT products. Checking their direct procurement sub-pages or search tags on the main portal will reveal specialized opportunities.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl md:text-2xl font-black text-brand-navy-900 mb-4 border-b border-slate-100 pb-2">
                    What does it take to win a {stateData.state} bid?
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base mb-4">
                    Winning a contract in {stateData.state} requires rigorous attention to detail and compliance. Every proposal is evaluated on a scoring system, where your technical capability, staff experience, and past performance are rated alongside your pricing sheet.
                  </p>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base mb-4">
                    Make sure to download all solicitation attachments, construct a detailed compliance matrix, submit all required affidavits and certs, and upload your proposal well before the deadline.
                  </p>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    Many state contracts offer preference points if your business is certified as a local small business, veteran-owned firm, or minority-owned enterprise.
                  </p>
                </div>

                {/* Facts Table */}
                <div className="my-10 border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                    <h4 className="text-sm font-bold text-brand-navy-900 uppercase tracking-wider">
                      {stateData.state} Procurement Portal & Facts
                    </h4>
                  </div>
                  <div className="divide-y divide-slate-100 text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-2">
                      <span className="font-bold text-brand-navy-900">Official Portal</span>
                      <span className="md:col-span-2 text-slate-600 flex items-center gap-1.5">
                        {stateData.portal}
                        <a
                          href={stateData.officialPortalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex text-brand-blue-600 hover:text-blue-700 font-bold"
                        >
                          Visit Portal <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-2">
                      <span className="font-bold text-brand-navy-900">Vendor Registration</span>
                      <span className="md:col-span-2 text-slate-600">{stateData.registration}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-2">
                      <span className="font-bold text-brand-navy-900">Key Agencies</span>
                      <span className="md:col-span-2 text-slate-600">{stateData.keyAgencies}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-2">
                      <span className="font-bold text-brand-navy-900">Registration Fee</span>
                      <span className="md:col-span-2 text-slate-600">{stateData.fee}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-2">
                      <span className="font-bold text-brand-navy-900">Bid Threshold Notes</span>
                      <span className="md:col-span-2 text-slate-600">Varies by agency, typically $50,000 for formal bids</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Standard Article Content
              <div
                className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6 text-sm md:text-base [&>h2]:text-xl [&>h2]:md:text-2xl [&>h2]:font-black [&>h2]:text-brand-navy-900 [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:border-b [&>h2]:border-slate-100 [&>h2]:pb-2 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            )}

            {/* Pay-when-you-win CTA Block inside Article */}
            <div className="my-12 bg-gradient-to-r from-brand-navy-900 to-[#122c52] text-white rounded-3xl p-8 relative overflow-hidden shadow-lg border border-white/5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_300px_at_80%_120%,rgba(30,111,217,0.15),transparent)] pointer-events-none" />
              <div className="relative z-10">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-brand-blue-600/30 text-brand-blue-400 px-3 py-1 rounded-full border border-brand-blue-500/30 inline-block mb-4">
                  RFP Response Writing
                </span>
                <h3 className="text-2xl font-black mb-3">
                  Need Help Writing Your Proposal?
                </h3>
                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  Our team of professional proposal consultants handles everything—from parsing the SOW to building the compliance matrix and writing the technical response. We operate on a low-upfront, pay-when-you-win model.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/login?tab=signup&redirect=/portal/hire"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all text-center"
                  >
                    Start My Bid — $450 Upfront
                  </Link>
                  <Link
                    href="/#pricing"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-bold transition-all text-center hover:bg-white/5"
                  >
                    View Pricing Structure
                  </Link>
                </div>
              </div>
            </div>

            {/* FAQ Accordion Section */}
            {faqsToRender.length > 0 && (
              <div className="mt-12 border-t border-slate-100 pt-10">
                <h2 className="text-xl md:text-2xl font-black text-brand-navy-900 mb-6 flex items-center gap-2">
                  <span>Frequently Asked Questions</span>
                </h2>
                
                <div className="space-y-4">
                  {faqsToRender.map((faq, index) => {
                    const isOpen = openFaq === index;
                    return (
                      <div
                        key={index}
                        className={cn(
                          "border rounded-2xl transition-all duration-300",
                          isOpen ? "border-brand-blue-200 bg-brand-blue-50/10 shadow-sm" : "border-slate-200 hover:border-slate-300"
                        )}
                      >
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full flex justify-between items-center px-6 py-4 text-left font-bold text-brand-navy-900 text-sm md:text-base focus:outline-none cursor-pointer"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0",
                              isOpen && "transform rotate-180 text-brand-blue-600"
                            )}
                          />
                        </button>
                        
                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-300 ease-in-out",
                            isOpen ? "max-h-96 opacity-100 border-t border-slate-100" : "max-h-0 opacity-0 pointer-events-none"
                          )}
                        >
                          <div className="px-6 py-4 text-sm text-slate-600 leading-relaxed">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Author Byline & E-E-A-T details */}
            <div className="border-t border-slate-100 mt-12 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs font-semibold text-slate-400">
              <div>
                <span>Reviewed by the </span>
                <strong className="text-slate-600">Stronger Built proposal team</strong>
                <span> · Veteran-owned · </span>
                <span>Last updated June 2026</span>
              </div>
              {stateData && (
                <a
                  href={stateData.officialPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-brand-blue-600 transition-colors font-bold"
                >
                  Source: Official Portal <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

          </main>

          {/* Right Sidebar Section */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Sidebar CTA - Start Bid */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm text-center">
              <h3 className="text-lg font-black text-brand-navy-900 mb-2">Ready to Bid?</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Win high-value government contracts. We find, write, and manage bids for you. Pay-when-you-win model.
              </p>
              <Link
                href="/login?tab=signup&redirect=/portal/hire"
                className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-2xl bg-brand-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all text-center mb-3"
              >
                Hire Us to Write Your Bid
              </Link>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all text-center"
              >
                Book Free Consultation
              </Link>
            </div>

            {/* Neighboring States or Recommended Articles */}
            {article.isStateGuide && neighboringStateGuides.length > 0 && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
                <h3 className="text-sm font-black text-brand-navy-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                  Other State Bid Guides
                </h3>
                <div className="space-y-4">
                  {neighboringStateGuides.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/learning-center/${guide.slug}`}
                      className="block p-4 rounded-2xl border border-slate-100 hover:border-brand-blue-200 hover:bg-brand-blue-50/5 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-700 group-hover:text-brand-blue-600 transition-colors text-sm">
                          {guide.state} RFP Guide
                        </span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 rotate-270" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400 block truncate">
                        Portal: {guide.portal}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {!article.isStateGuide && recommendedArticles.length > 0 && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
                <h3 className="text-sm font-black text-brand-navy-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                  State Procurement Guides
                </h3>
                <div className="space-y-4">
                  {recommendedArticles.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/learning-center/${guide.slug}`}
                      className="block p-4 rounded-2xl border border-slate-100 hover:border-brand-blue-200 hover:bg-brand-blue-50/5 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-700 group-hover:text-brand-blue-600 transition-colors text-sm">
                          {guide.state} RFP Guide
                        </span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 rotate-270" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400 block">
                        Get vendor registration steps
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </aside>

        </div>

      </div>
    </div>
  );
}
