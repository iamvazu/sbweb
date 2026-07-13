"use client";

import { useState } from "react";
import { FAQItem } from "@/lib/faqData";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border rounded-lg bg-card overflow-hidden">
          <button
            className="w-full px-6 py-4 flex items-center justify-between font-semibold text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => toggle(index)}
            aria-expanded={openIndex === index}
          >
            <span>{faq.question}</span>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
            )}
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4 text-muted-foreground">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
