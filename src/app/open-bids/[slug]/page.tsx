import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { bidSlug, generateHowToWin, getBidState } from "@/lib/bids";
import { getBidBySlug } from "@/lib/bids-server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  DollarSign, 
  Target, 
  BarChart3, 
  ShieldCheck, 
  ChevronRight, 
  FileText, 
  ExternalLink,
  Sparkles,
  Info
} from "lucide-react";

export const revalidate = 86400; // Cache page for 24 hours (ISR)

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const bid = await getBidBySlug(slug);
  if (!bid) return {};

  const title = `${bid.event_id || 'RFP'} | ${bid.event_name} (${bid.state}) — Stronger Built`;
  const description = `${bid.event_name}. Agency: ${bid.department_name || 'Government'}. Location: ${bid.state}. Closes ${bid.end_date ? new Date(bid.end_date).toLocaleDateString() : 'soon'}. Win this bid with Stronger Built proposal advisory.`;
  const canonicalUrl = `https://www.strongerbuilt.us/open-bids/${slug}`;

  return {
    title,
    description: description.slice(0, 158),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description: description.slice(0, 158),
      url: canonicalUrl,
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const bid = await getBidBySlug(slug);
  if (!bid) notFound();

  const howToWinText = generateHowToWin(bid);
  const nowTime = new Date().getTime();
  const bidTime = bid.end_date ? new Date(bid.end_date).getTime() : null;
  const isPastDue = bidTime !== null && bidTime < nowTime;
  const daysLeft = bidTime !== null ? Math.ceil((bidTime - nowTime) / (1000 * 3600 * 24)) : null;

  // Retrieve related bids
  const supabase = await createClient();
  let relatedQuery = supabase
    .from("bids")
    .select("id, event_id, event_name, department_name, end_date, source")
    .gt("end_date", new Date().toISOString())
    .neq("id", bid.id);

  if (bid.state && bid.state !== "California") {
    relatedQuery = relatedQuery.ilike("department_name", `%(${bid.state})%`);
  } else if (bid.source) {
    relatedQuery = relatedQuery.eq("source", bid.source);
  }

  const { data: relatedBidsData } = await relatedQuery.limit(6);
  let relatedBids = relatedBidsData || [];

  if (relatedBids.length < 3) {
    const { data: fallbackBids } = await supabase
      .from("bids")
      .select("id, event_id, event_name, department_name, end_date, source")
      .gt("end_date", new Date().toISOString())
      .neq("id", bid.id)
      .limit(6 - relatedBids.length);
    relatedBids = [...relatedBids, ...(fallbackBids || [])];
  }

  const relatedWithSlug = relatedBids.map(b => ({
    ...b,
    slug: bidSlug(b),
    state: getBidState(b)
  }));

  // Format money
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

  // Structured Data (JSON-LD)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Open Bids",
        "item": "https://www.strongerbuilt.us/open-bids"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": bid.state,
        "item": `https://www.strongerbuilt.us/open-bids?state=${encodeURIComponent(bid.state)}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": bid.event_name,
        "item": `https://www.strongerbuilt.us/open-bids/${slug}`
      }
    ]
  };

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": bid.event_name,
    "description": bid.comments || `Solicitation details for ${bid.event_name} by ${bid.department_name}.`,
    "datePublished": bid.first_seen,
    "dateModified": bid.first_seen,
    "publisher": {
      "@type": "Organization",
      "name": "Stronger Built LLC",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.strongerbuilt.us/logo.png"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-indigo-50/20 to-white pt-28 pb-20 relative overflow-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />

      {/* Atmospheric backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-1/4 w-[700px] h-[700px] rounded-full bg-brand-blue-600/5 blur-[120px]" />
        <div className="absolute bottom-20 left-10 w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 space-y-8">
        
        {/* Navigation Back */}
        <div>
          <Link 
            href="/open-bids" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-bold tracking-wide uppercase text-[10px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Open Bids
          </Link>
        </div>

        {/* Expired / Closed Warning Banner */}
        {isPastDue && (
          <div className="p-6 rounded-3xl bg-red-50 border border-red-200 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-10 h-10 rounded-2xl bg-red-500 text-white flex items-center justify-center shrink-0 shadow-lg">
              <Info className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-red-900">This Solicitation Has Closed</h4>
              <p className="text-xs text-red-700 font-medium">
                The submission deadline was {bid.end_date ? new Date(bid.end_date).toLocaleDateString() : "in the past"}. You can search for other active opportunities in {bid.state} or view related bids below.
              </p>
            </div>
          </div>
        )}

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Main Content */}
          <main className="lg:col-span-8 space-y-8">
            
            {/* Header Card */}
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-100/50 space-y-6">
              
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="outline" className="text-[10px] font-bold h-5 uppercase tracking-tight bg-slate-50 border-slate-200 text-slate-500 rounded-sm">
                  {bid.source}
                </Badge>
                <Badge variant="outline" className="text-[10px] font-bold h-5 uppercase tracking-tight bg-blue-50 border-blue-100 text-brand-blue-600 rounded-sm">
                  {bid.state}
                </Badge>
                {bidTime !== null && (
                  <span className={`text-xs font-semibold flex items-center gap-1 shrink-0 ${isPastDue ? 'text-red-600' : daysLeft === 0 ? 'text-red-600' : 'text-slate-500'}`}>
                    <Clock className="h-3.5 w-3.5" />
                    {isPastDue ? "Closed" : daysLeft === 0 ? "Closing today" : `${daysLeft} days left`}
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-black text-brand-navy-900 leading-tight uppercase tracking-tight">
                {bid.event_name}
              </h1>

              <div className="text-slate-500 font-medium text-sm space-y-2 border-t pt-6">
                <p>
                  <span className="text-brand-navy-900 font-black uppercase tracking-wide text-[10px] mr-2">Issuing Agency:</span>
                  {bid.department_name}
                </p>
                <p>
                  <span className="text-brand-navy-900 font-black uppercase tracking-wide text-[10px] mr-2">Solicitation ID:</span>
                  <span className="font-mono text-xs">{bid.event_id}</span>
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-2 border-t">
                <Badge variant="outline" className={`text-[10px] font-semibold py-1 px-3 border-none rounded-md ${bid.prevailing_wage ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-400'}`}>
                  {bid.prevailing_wage ? "Prevailing Wage Required" : "Standard Labor Wages"}
                </Badge>
                <Badge variant="outline" className={`text-[10px] font-semibold py-1 px-3 border-none rounded-md ${bid.sbe_only ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-400'}`}>
                  {bid.sbe_only ? "SBE/DVBE Preference" : "Open Market Bidding"}
                </Badge>
                {bid.bonding_required && (
                  <Badge variant="outline" className="text-[10px] font-semibold py-1 px-3 border-none rounded-md bg-purple-50 text-purple-700">
                    Bonding Required
                  </Badge>
                )}
              </div>
            </div>

            {/* Facts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex items-center gap-4">
                <div className="h-11 w-11 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-700 border shrink-0">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">Estimated Value</span>
                  <span className="text-base font-black text-brand-navy-900">
                    {bid.estimated_value_min ? 
                      `${formatMoneyShorthand(bid.estimated_value_min)} – ${formatMoneyShorthand(bid.estimated_value_max)}` : 
                      "Value TBD"}
                  </span>
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex items-center gap-4">
                <div className="h-11 w-11 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-700 border shrink-0">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">Response Deadline</span>
                  <span className="text-base font-black text-brand-navy-900">
                    {bid.end_date ? new Date(bid.end_date).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex items-center gap-4">
                <div className="h-11 w-11 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-700 border shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">Original Source</span>
                  <span className="text-base font-black text-brand-navy-900 uppercase">
                    {bid.source}
                  </span>
                </div>
              </div>
            </div>

            {/* Description & How to Win */}
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm space-y-8">
              
              <div className="space-y-4">
                <h2 className="text-xl font-black text-brand-navy-900 border-b pb-2 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-slate-400" />
                  RFP Description
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed font-medium whitespace-pre-line">
                  {bid.comments || "No description was provided for this solicitation record. Please refer to the official portal page or contact the procurement desk for additional details."}
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <h2 className="text-xl font-black text-brand-navy-900 border-b pb-2 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-brand-blue-600 animate-pulse" />
                  How to Win This Contract
                </h2>
                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-blue-600" />
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    {howToWinText}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Converter Card */}
            <div className="bg-gradient-to-tr from-[#0F2042] to-[#1E3A6E] text-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden border border-white/5 space-y-6">
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-brand-blue-600/40 text-blue-300 px-3 py-1 rounded-full border border-brand-blue-500/30 inline-block">
                  RFP Response Writing & Bid Management
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  Want to submit a winning proposal for this contract?
                </h2>
              </div>
              
              <p className="text-sm text-slate-300 max-w-2xl font-medium leading-relaxed">
                Stronger Built's proposal consulting team acts as your in-house bid desk. We parse the statement of work, draft compliant responses, compile set-aside certs, and manage submission. With our Pay-When-You-Win model, you mostly pay us only when your business wins.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button 
                  asChild
                  className="bg-brand-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest h-14 px-8 rounded-full shadow-lg shadow-blue-500/20"
                >
                  <Link href={`/login?tab=signup&redirect=/portal/hire?bid=${bid.id}`}>
                    Get Started on This Bid
                  </Link>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/5 font-black text-xs uppercase tracking-widest h-14 px-8 rounded-full"
                >
                  <Link href="/book-call">
                    Book Free Consultation
                  </Link>
                </Button>
              </div>
            </div>
          </main>

          {/* Right Side: Related Bids Sidebar */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 h-fit">
            
            <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm space-y-6">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Target className="h-4 w-4 text-brand-blue-600" />
                Related Opportunities
              </h3>
              
              <div className="space-y-4">
                {relatedWithSlug.map((relBid) => (
                  <Link 
                    key={relBid.id}
                    href={`/open-bids/${relBid.slug}`}
                    className="block p-4 border border-slate-100 rounded-2xl hover:border-brand-blue-200 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-50 text-[9px] uppercase tracking-wide font-bold">
                        {relBid.source}
                      </Badge>
                      <Badge className="bg-blue-50 border-blue-100 text-brand-blue-600 hover:bg-blue-50 text-[9px] uppercase tracking-wide font-bold">
                        {relBid.state}
                      </Badge>
                    </div>
                    
                    <h4 className="text-xs font-bold text-slate-700 group-hover:text-brand-blue-600 line-clamp-2 leading-snug transition-colors">
                      {relBid.event_name}
                    </h4>
                    
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold mt-3 pt-2 border-t border-slate-50">
                      <span>Agency: {relBid.department_name ? relBid.department_name.substring(0, 15) + '...' : 'Gov'}</span>
                      <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" /> {relBid.end_date ? new Date(relBid.end_date).toLocaleDateString() : 'Soon'}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
