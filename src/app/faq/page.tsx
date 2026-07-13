import { Metadata } from "next";
import { FAQAccordion } from "@/components/FAQAccordion";
import { generalFaqs } from "@/lib/faqData";
import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | STRONGERbuilt Government Contracting",
  description: "Answers to common questions about our Pay-When-You-Win model, federal and state bidding, and how our proposal consultants help you win.",
};

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: generalFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="flex-1 py-12 md:py-24 bg-slate-50 dark:bg-transparent">
      <JsonLd data={faqJsonLd} />
      
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about partnering with STRONGERbuilt to win government contracts.
          </p>
        </div>

        <FAQAccordion faqs={generalFaqs} />

        <div className="mt-16 bg-card border rounded-2xl p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            Book a free, no-obligation discovery call with a proposal expert.
          </p>
          <Link
            href="/book-call"
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Book a Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
