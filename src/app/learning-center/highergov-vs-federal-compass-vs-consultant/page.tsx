import { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LeadMagnetCard } from "@/components/LeadMagnetCard";

export const metadata: Metadata = {
  title: "HigherGov vs Federal Compass vs a Consultant: Which Wins for Small Business?",
  description: "Comparing government contracting tools like HigherGov and Federal Compass with a hands-on proposal consultant. Find the right strategy to win.",
};

export default function ComparisonGuidePage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "HigherGov vs Federal Compass vs a Consultant: Which Wins for Small Business?",
    description: "HigherGov and Federal Compass are federal opportunity databases; neither writes your proposal or shares your win risk. For small businesses that need to actually win, pair a discovery tool with a Pay-When-You-Win consultant.",
    author: { "@type": "Organization", name: "STRONGERbuilt" },
    publisher: { "@type": "Organization", name: "STRONGERbuilt" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do these tools write proposals?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. HigherGov and Federal Compass are databases designed to help you find opportunities and market intelligence. They do not write the actual proposal for you. To write and submit a winning bid, you need human expertise or a specialized consultant.",
        },
      },
      {
        "@type": "Question",
        name: "Which is cheaper?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Software tools charge a flat subscription fee (typically thousands per year) whether you win or lose. A Pay-When-You-Win consultant charges a lower upfront writing fee and only takes a success fee if you win the contract.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use both?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. In fact, we recommend it. Use a tool like HigherGov to find the right opportunities and research competitors, then hire a proposal consultant to ensure your bid is compliant, persuasive, and positioned to win.",
        },
      },
    ],
  };

  return (
    <main className="flex-1 py-12 md:py-24">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <article className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mb-8">
            HigherGov vs Federal Compass vs a Consultant: Which Wins for Small Business?
          </h1>
          
          <p className="lead font-medium text-lg border-l-4 border-primary pl-4 py-2">
            HigherGov and Federal Compass are federal opportunity databases; neither writes your proposal or shares your win risk. For small businesses that need to actually win, pair a discovery tool with a Pay-When-You-Win consultant.
          </p>

          <div className="my-8 not-prose">
            <LeadMagnetCard 
              title="Federal Contracting Checklist" 
              description="Download our free 10-point checklist before your next federal bid submission."
              downloadUrl="/#book-call"
            />
          </div>

          <div className="my-12">
            <h2>The Data: What the Tools Actually Do</h2>
            <p>
              Both platforms are excellent at what they do: data aggregation. According to recent public footprint data:
            </p>
            <ul>
              <li><strong>HigherGov:</strong> Contains roughly 6,462 indexed URLs, featuring 261 opportunity pages with a heavy federal focus.</li>
              <li><strong>Federal Compass:</strong> Contains roughly 4,056 indexed URLs, featuring over 1,939 opportunity and RFP pages, also with a federal focus.</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">
              <em>Sources: Public search engine index data. Verify current exact figures directly on the vendor sites.</em>
            </p>
          </div>

          <h2>The Flanking Strategy: Finding vs. Winning</h2>
          <p>
            Tools excel at finding and aggregating opportunities at scale. They provide historical pricing, agency contacts, and teaming data. However, they do NOT write the winning bid, own compliance risk, or share your outcome risk.
          </p>
          <p>
            A consultant closes the "now I found it, how do I win?" gap. With our approach at STRONGERbuilt, we provide human win strategy, compliance review, and operate on a Pay-When-You-Win model. We are veteran-owned and support state and local bids across all 50 states—not just federal.
          </p>

          <div className="bg-muted p-8 rounded-xl my-12 text-center">
            <h3 className="mt-0">Ready to actually win the bids you find?</h3>
            <p className="mb-6">
              Learn how our shared-risk pricing model aligns our success directly with yours.
            </p>
            <Link
              href="/pricing"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              View Pay-When-You-Win Pricing <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-6 mt-8">
            {faqJsonLd.mainEntity.map((faq, idx) => (
              <div key={idx} className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2">{faq.name}</h3>
                <p className="text-muted-foreground">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>

        </article>
      </div>
    </main>
  );
}
