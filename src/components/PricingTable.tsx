import { payWhenYouWin, pricingNotes } from "@/lib/pricing";
import Link from "next/link";
import { Check } from "lucide-react";

export function PricingTable() {
  return (
    <div className="w-full max-w-5xl mx-auto my-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 fill-mode-both">
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-white/5 text-slate-400 border-b border-white/10">
            <tr>
              <th scope="col" className="px-6 py-5 font-semibold tracking-wider">
                Contract Value (Up to)
              </th>
              <th scope="col" className="px-6 py-5 font-semibold tracking-wider">
                Upfront Writing Fee
              </th>
              <th scope="col" className="px-6 py-5 font-semibold tracking-wider">
                Success Fee (Only if Awarded)
              </th>
            </tr>
          </thead>
          <tbody>
            {payWhenYouWin.map((tier, idx) => (
              <tr
                key={idx}
                className="border-b border-white/5 last:border-b-0 hover:bg-white/10 transition-all duration-300 group"
              >
                <td className="px-6 py-5 font-medium text-slate-200 group-hover:text-white transition-colors">{tier.maxContract}</td>
                <td className="px-6 py-5 text-slate-300">{tier.writingFee}</td>
                <td className="px-6 py-5 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  {tier.successFeePct}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1">
          <p className="text-sm text-slate-300 bg-white/5 border border-white/10 p-5 rounded-xl flex items-start shadow-inner">
            <Check className="h-5 w-5 mr-3 text-cyan-400 shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <span className="leading-relaxed">{pricingNotes}</span>
          </p>
        </div>
        <div className="shrink-0 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-500 group-hover:duration-200"></div>
          <Link
            href="/book-call"
            className="relative inline-flex h-12 items-center justify-center rounded-lg bg-slate-900 px-8 text-sm font-semibold text-white shadow-xl transition-all hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 disabled:pointer-events-none disabled:opacity-50 border border-white/10"
          >
            Book a Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
