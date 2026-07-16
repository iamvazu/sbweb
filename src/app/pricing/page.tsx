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
    <main className="flex-1 py-16 md:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-50 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none opacity-50" />
      
      {offers.map((offer, idx) => (
        <JsonLd key={idx} data={offer} />
      ))}
      <div className="container px-4 md:px-6 max-w-6xl mx-auto relative z-10">
        
        <div className="flex flex-col items-center text-center space-y-6 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm text-blue-300 font-medium mb-2">
            Pricing
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Pay-When-You-Win
          </h1>
          <p className="max-w-[800px] text-lg text-slate-400 sm:text-xl leading-relaxed">
            We partner with you to win. With STRONGERbuilt, you risk a fraction of the cost compared to flat-fee firms. <span className="text-white font-semibold">Win, and we both win.</span>
          </p>
        </div>

        <PricingTable />

        <div className="mt-32 mb-16 flex flex-col items-center text-center space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            How We Compare
          </h2>
          <p className="max-w-[700px] text-slate-400 md:text-lg">
            See the difference between our shared-risk model and typical flat-fee agencies.
          </p>
        </div>

        <ComparisonTable />
        
      </div>
    </main>
  );
}
