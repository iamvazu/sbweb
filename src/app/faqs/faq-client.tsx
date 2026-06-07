"use client";

import { useState } from "react";
import { ChevronDown, ArrowRight, Phone, Search, HelpCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/seo/json-ld";

interface FAQItemData {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  name: string;
  items: FAQItemData[];
}

export default function FaqClient() {
  // We allow multiple accordions to be open at once by using an object state:
  // e.g., { "about-stronger-built-0": true, "pricing-payment-1": false }
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  const toggleAccordion = (key: string) => {
    setOpenStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const faqCategories: FAQCategory[] = [
    {
      id: "about-stronger-built",
      name: "About Stronger Built",
      items: [
        {
          question: "What does Stronger Built do?",
          answer: "Stronger Built is a proposal-consulting firm. Our expert consultants find, write, and submit winning government bids for businesses — end to end. We handle opportunity research, win strategy, proposal writing, compliance, and on-time submission, so you can focus on running your business."
        },
        {
          question: "Who do you work with?",
          answer: "Small and mid-sized businesses that want to win government contracts but don't have the time or in-house expertise to chase and write proposals — from first-time bidders to companies that bid regularly."
        },
        {
          question: "Where do you operate?",
          answer: "Nationwide. We help clients pursue federal, state, county, and city contracts in all 50 states."
        },
        {
          question: "Is Stronger Built veteran-owned?",
          answer: "Yes. Stronger Built is a veteran-owned firm, and helping fellow small businesses win contracts they'd never land alone is core to why we exist."
        },
        {
          question: "What makes you different from other proposal consultants?",
          answer: "Two things. First, our pricing is aligned with your result — with Pay-When-You-Win, you pay a low bid writing fee plus a success fee only if you're awarded the contract, while most consultants charge thousands whether you win or lose. Second, every proposal is written and owned by a real expert on our team and submitted under your company's name."
        }
      ]
    },
    {
      id: "pricing-payment",
      name: "Pricing & Payment",
      items: [
        {
          question: "How does \"Pay When You Win\" work?",
          answer: "You pay a low bid writing fee to produce your proposal, plus a small success fee that's charged only if you're awarded the contract. If you don't win, you owe nothing beyond the bid writing fee."
        },
        {
          question: "How much is the bid writing fee?",
          answer: "It starts at $450 for contracts up to $1 million and scales with contract size — $750 up to $2M, $1,000 up to $3M, $1,250 up to $4M, $1,500 up to $5M, then $250 more per additional $1M. It covers requirement extraction, win strategy, full proposal writing, compliance review, and on-time submission."
        },
        {
          question: "How is the success fee calculated?",
          answer: "It's a percentage of the awarded contract value, charged only if you win: 1.0% up to $1M, then stepping down to 0.9%, 0.8%, 0.7%, and 0.6% up to $5M, and 0.5% for contracts above $5M. For example, on a $3 million contract you'd pay $1,000 to start and $24,000 only if you win."
        },
        {
          question: "What do I pay if I lose the bid?",
          answer: "Nothing beyond the bid writing fee. The success fee only applies to an awarded contract."
        },
        {
          question: "Are there hourly fees or hidden costs?",
          answer: "No. There's no hourly billing and no surprise charges — just the bid writing fee to start and the success fee if you win."
        },
        {
          question: "Do I have to sign a long-term contract?",
          answer: "No. You can engage us for a single bid. There's no long-term commitment."
        },
        {
          question: "Do you offer pricing for businesses that bid regularly?",
          answer: "Yes. If you pursue contracts often, mention it on your consultation and we'll set up an arrangement that fits your volume."
        }
      ]
    },
    {
      id: "how-it-works",
      name: "How It Works",
      items: [
        {
          question: "What is your process from start to finish?",
          answer: "Five steps. First, we find and qualify opportunities and give you an honest go/no-go. Second, a named consultant builds your win strategy. Third, our writers produce the full proposal and a complete compliance matrix. Fourth, two sets of eyes review every requirement and we submit on time through the buyer's portal. Fifth, we debrief with you — win or lose — so the next bid is stronger."
        },
        {
          question: "Who actually writes my proposal?",
          answer: "A named human consultant and expert writer assigned to your engagement. Every word is written, reviewed, and owned by our team, and the proposal is submitted under your company's name."
        },
        {
          question: "How long does it take to complete a proposal?",
          answer: "It depends on the size of the RFP and its deadline. Bring us the opportunity and we'll tell you honestly whether we can hit the timeline. If you're on a tight deadline, tell us — we'll do everything we can."
        },
        {
          question: "What do you need from me to get started?",
          answer: "Usually a bit about your company, your capabilities and past work, any required certifications or mandatory forms, and pricing details if relevant. We walk you through all of it at kickoff."
        },
        {
          question: "Do you handle the entire submission?",
          answer: "Yes. We manage the writing, formatting, compliance checks, and final submission through the buyer's portal, and we confirm receipt."
        },
        {
          question: "Will the proposal be under my company's name?",
          answer: "Always. We work behind the scenes — the proposal is yours, start to finish."
        }
      ]
    },
    {
      id: "finding-opportunities",
      name: "Finding Opportunities",
      items: [
        {
          question: "Can you help me find bids to go after?",
          answer: "Yes. We search opportunities nationwide and bring you the ones worth your time, with an honest go/no-go before you spend a dollar."
        },
        {
          question: "What is \"Search Open Bids\"?",
          answer: "It's our free tool for browsing open government opportunities. Use it to see what's out there; when you find something worth pursuing, we'll help you win it."
        },
        {
          question: "What if I just want to find opportunities myself?",
          answer: "That's perfectly fine. Use our free bid search, and we'll be here whenever you're ready to turn an opportunity into a winning proposal."
        },
        {
          question: "Do you cover federal, state, and local bids?",
          answer: "Yes — federal, state, county, and city opportunities, nationwide."
        }
      ]
    },
    {
      id: "eligibility-industries",
      name: "Eligibility & Industries",
      items: [
        {
          question: "What industries do you work with?",
          answer: "Nearly all of them — IT and software, healthcare and staffing, professional services, security, education, facilities and maintenance, supply and logistics, and more. If there's a government bid in your field, we can help you win it."
        },
        {
          question: "Do I need certifications to bid on government contracts?",
          answer: "Not always, but certain set-aside contracts require them — for example small business, veteran-owned, women-owned, HUBZone, or 8(a) certifications. We'll tell you which opportunities you're eligible for and help you target them."
        },
        {
          question: "Can you help me if I've never bid on a government contract before?",
          answer: "Absolutely. Many of our clients are first-time bidders. We handle the parts that trip people up — compliance, formatting, and deadlines — and guide you through the rest."
        },
        {
          question: "Can you help with set-aside contracts?",
          answer: "Yes. If you hold or qualify for set-aside certifications, we'll help you target the contracts reserved for businesses like yours."
        }
      ]
    },
    {
      id: "guarantees-quality",
      name: "Guarantees & Quality",
      items: [
        {
          question: "Can you guarantee I'll win?",
          answer: "No — and anyone who promises a guaranteed win isn't being straight with you. What we guarantee is a high-quality, fully compliant, strategically written proposal submitted on time. And because of Pay-When-You-Win, we're financially invested in your result."
        },
        {
          question: "How do you make sure my proposal is compliant?",
          answer: "We build a complete compliance matrix that maps every requirement to a response, and every submission goes through a two-sets-of-eyes review before we file."
        }
      ]
    },
    {
      id: "getting-started",
      name: "Getting Started",
      items: [
        {
          question: "How do I get started?",
          answer: "Book a free consultation. We'll review your opportunity, confirm pricing and timeline in writing, and get to work."
        },
        {
          question: "Is the consultation really free?",
          answer: "Yes. The consultation is free, with no obligation."
        },
        {
          question: "What happens on the consultation call?",
          answer: "We learn about your business and the opportunity, give you an honest go/no-go, walk you through how Pay-When-You-Win works for your specific bid, and confirm next steps. No pressure."
        }
      ]
    }
  ];

  // Flat list of all FAQs for JSON-LD schema
  const allFaqsList = faqCategories.flatMap((cat) =>
    cat.items.map((item) => ({
      question: item.question,
      answer: item.answer,
    }))
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100; // Offset for fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 dark:bg-brand-navy-950 dark:text-slate-100">
      {/* FAQ Schema */}
      <JsonLd type="FAQPage" data={allFaqsList} />

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
              Frequently Asked Questions
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 dark:text-white tracking-tight mb-6 leading-[1.05] font-bold">
            Common Questions
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-2xl mx-auto">
            Everything you need to know about how we find, write, and win government bids for you. Don't see your question? Book a free call.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Navigation Sidebar (Sticky) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 space-y-2">
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-4 px-3">
                Categories
              </span>
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => scrollToSection(category.id)}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:text-brand-blue-600 dark:text-slate-400 dark:hover:text-brand-blue-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all cursor-pointer"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Accordions List */}
          <div className="col-span-1 lg:col-span-3 space-y-12">
            {faqCategories.map((category) => (
              <div key={category.id} id={category.id} className="scroll-mt-28 space-y-6">
                <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-3">
                  {category.name}
                </h2>
                <div className="space-y-4">
                  {category.items.map((item, index) => {
                    const uniqueKey = `${category.id}-${index}`;
                    const isOpen = !!openStates[uniqueKey];
                    return (
                      <div
                        key={uniqueKey}
                        className={cn(
                          "border rounded-[2rem] bg-white dark:bg-brand-navy-900/40 overflow-hidden transition-all duration-300 shadow-sm",
                          isOpen 
                            ? "border-brand-blue-200 dark:border-brand-blue-500/30 shadow-md" 
                            : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                        )}
                      >
                        <button
                          onClick={() => toggleAccordion(uniqueKey)}
                          aria-expanded={isOpen}
                          className="w-full px-6 py-5 md:px-8 md:py-6 flex items-center justify-between text-left group cursor-pointer"
                        >
                          <span className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-blue-600 dark:group-hover:text-brand-blue-400 transition-colors">
                            {item.question}
                          </span>
                          <ChevronDown
                            className={cn(
                              "w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ml-4 motion-reduce:transition-none",
                              isOpen && "rotate-180 text-brand-blue-600 dark:text-brand-blue-400"
                            )}
                          />
                        </button>
                        <div
                          className={cn(
                            "transition-all duration-300 ease-in-out overflow-hidden motion-reduce:transition-none",
                            isOpen 
                              ? "max-h-[500px] border-t border-slate-100 dark:border-white/5" 
                              : "max-h-0"
                          )}
                        >
                          <p className="px-6 py-5 md:px-8 md:py-6 text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solid Brand-Blue CTA Block */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="relative rounded-[2.5rem] overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-500 min-h-[280px] flex flex-col justify-between p-10 md:p-16 bg-brand-blue-600 text-white border border-transparent">
          {/* Subtle background decorative map pattern */}
          <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 w-full">
            <div className="space-y-4 max-w-xl">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
                Still have questions?
              </h2>
              <p className="text-sm md:text-base text-blue-100 leading-relaxed font-semibold">
                We're here to help. Book a free call with our consulting desk or search our open bids database.
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
