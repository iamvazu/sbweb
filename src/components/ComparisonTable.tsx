import { Check, Minus } from "lucide-react";

export function ComparisonTable() {
  return (
    <div className="w-full max-w-5xl mx-auto my-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl relative">
        {/* Subtle highlight behind STRONGERbuilt column */}
        <div className="absolute top-0 bottom-0 left-[33.33%] w-[33.33%] bg-blue-500/5 pointer-events-none border-x border-white/5" />
        
        <table className="w-full text-sm text-left relative z-10">
          <thead className="text-xs uppercase bg-white/5 text-slate-400 border-b border-white/10">
            <tr>
              <th scope="col" className="px-6 py-5 font-semibold tracking-wider w-1/3">
                Feature
              </th>
              <th scope="col" className="px-6 py-5 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 tracking-wider w-1/3">
                STRONGERbuilt (Pay-When-You-Win)
              </th>
              <th scope="col" className="px-6 py-5 font-semibold tracking-wider w-1/3 text-slate-500">
                Typical Flat-Fee Firm
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/5 hover:bg-white/10 transition-all duration-300">
              <td className="px-6 py-5 font-medium text-slate-200">Pay if you lose</td>
              <td className="px-6 py-5 text-emerald-400 font-semibold drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">Low writing fee only</td>
              <td className="px-6 py-5 text-red-400/80 font-semibold">Full fee regardless</td>
            </tr>
            <tr className="border-b border-white/5 hover:bg-white/10 transition-all duration-300">
              <td className="px-6 py-5 font-medium text-slate-200">Pay if you win</td>
              <td className="px-6 py-5 text-slate-300 font-medium">Writing fee + small %</td>
              <td className="px-6 py-5 text-slate-500 font-medium">Full fee</td>
            </tr>
            <tr className="border-b border-white/5 hover:bg-white/10 transition-all duration-300">
              <td className="px-6 py-5 font-medium text-slate-200">Veteran-owned</td>
              <td className="px-6 py-5"><Check className="h-6 w-6 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]" /></td>
              <td className="px-6 py-5"><Minus className="h-6 w-6 text-slate-600" aria-label="Varies" /> <span className="sr-only">Varies</span></td>
            </tr>
            <tr className="border-b border-white/5 hover:bg-white/10 transition-all duration-300">
              <td className="px-6 py-5 font-medium text-slate-200">All 50 states</td>
              <td className="px-6 py-5"><Check className="h-6 w-6 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]" /></td>
              <td className="px-6 py-5"><Minus className="h-6 w-6 text-slate-600" aria-label="Varies" /> <span className="sr-only">Varies</span></td>
            </tr>
            <tr className="hover:bg-white/10 transition-all duration-300">
              <td className="px-6 py-5 font-medium text-slate-200">Named consultant</td>
              <td className="px-6 py-5"><Check className="h-6 w-6 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]" /></td>
              <td className="px-6 py-5"><Minus className="h-6 w-6 text-slate-600" aria-label="Varies" /> <span className="sr-only">Varies</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
