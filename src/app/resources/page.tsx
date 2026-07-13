import { Metadata } from "next";
import { LeadMagnetCard } from "@/components/LeadMagnetCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Government Contracting Resources | STRONGERbuilt",
  description: "Download free checklists, templates, and guides for federal, state, and local government bidding.",
};

export default function ResourcesPage() {
  const resources = [
    {
      title: "10-Point RFP Checklist",
      description: "Ensure your proposal is 100% compliant before you submit.",
      downloadUrl: "/resources/rfp-checklist"
    },
    {
      title: "Winning Proposal Template",
      description: "A structured outline to make your executive summary and technical volume stand out.",
      downloadUrl: "/resources/proposal-template"
    }
  ];

  return (
    <main className="flex-1 py-12 md:py-24">
      <div className="container px-4 md:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mb-4">
            Free Government Contracting Resources
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tools, templates, and checklists to help you bid better and win more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {resources.map((res, i) => (
            <LeadMagnetCard key={i} {...res} />
          ))}
        </div>

        <div className="bg-muted p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Want us to handle it for you?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our experts will write, format, and submit your proposal. With Pay-When-You-Win pricing, you risk a fraction of the cost of typical consultants.
          </p>
          <Link
            href="/pricing"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            View Pricing <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
