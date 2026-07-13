import { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PricingTable } from "@/components/PricingTable";
import { ComparisonTable } from "@/components/ComparisonTable";
import { payWhenYouWin } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Government Bid Pricing — Pay When You Win",
  description: "STRONGERbuilt's Pay-When-You-Win pricing for government proposals. Low writing fee upfront, and a small success fee only if you are awarded the contract.",
};

export default function PricingPage() {
  const offers = payWhenYouWin.map((t) => ({
    "@context": "https://schema.org",
    "@type": "Offer",
    name: `Proposal writing — ${t.maxContract}`,
    priceCurrency: "USD",
    price: t.writingFee.replace(/[^0-9.]/g, ""), // numeric seed
    description: `Bid writing fee for contracts ${t.maxContract}; success fee ${t.successFeePct} only if awarded.`,
  }));

  return (
    <main className="flex-1 py-12 md:py-24">
      {offers.map((offer, idx) => (
        <JsonLd key={idx} data={offer} />
      ))}
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Pay-When-You-Win Pricing
          </h1>
          <p className="max-w-[800px] text-lg text-muted-foreground sm:text-xl">
            We partner with you to win. With STRONGERbuilt, you risk a fraction of the cost compared to flat-fee firms. Win, and we both win.
          </p>
        </div>

        <PricingTable />

        <div className="mt-24 mb-12 flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">
            How We Compare
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">
            See the difference between our shared-risk model and typical flat-fee agencies.
          </p>
        </div>

        <ComparisonTable />
        
      </div>
    </main>
  );
}
