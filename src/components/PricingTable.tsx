import { payWhenYouWin, pricingNotes } from "@/lib/pricing";
import Link from "next/link";
import { Check } from "lucide-react";

export function PricingTable() {
  return (
    <div className="w-full max-w-5xl mx-auto my-12">
      <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-muted text-muted-foreground border-b">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold">
                Contract Value (Up to)
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Upfront Writing Fee
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Success Fee (Only if Awarded)
              </th>
            </tr>
          </thead>
          <tbody>
            {payWhenYouWin.map((tier, idx) => (
              <tr
                key={idx}
                className="border-b last:border-b-0 hover:bg-muted/50 transition-colors"
              >
                <td className="px-6 py-4 font-medium">{tier.maxContract}</td>
                <td className="px-6 py-4">{tier.writingFee}</td>
                <td className="px-6 py-4 text-primary font-semibold">
                  {tier.successFeePct}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground bg-muted p-4 rounded-lg flex items-start">
            <Check className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
            <span>{pricingNotes}</span>
          </p>
        </div>
        <div className="shrink-0">
          <Link
            href="/book-call"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Book a Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
