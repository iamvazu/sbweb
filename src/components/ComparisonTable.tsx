import { Check, Minus } from "lucide-react";

export function ComparisonTable() {
  return (
    <div className="w-full max-w-5xl mx-auto my-12">
      <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-muted text-muted-foreground border-b">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold">
                Feature
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-primary">
                STRONGERbuilt (Pay-When-You-Win)
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Typical Flat-Fee Firm
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4 font-medium">Pay if you lose</td>
              <td className="px-6 py-4 text-emerald-600 font-semibold">Low writing fee only</td>
              <td className="px-6 py-4 text-red-500 font-semibold">Full fee regardless</td>
            </tr>
            <tr className="border-b hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4 font-medium">Pay if you win</td>
              <td className="px-6 py-4">Writing fee + small %</td>
              <td className="px-6 py-4">Full fee</td>
            </tr>
            <tr className="border-b hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4 font-medium">Veteran-owned</td>
              <td className="px-6 py-4"><Check className="h-5 w-5 text-emerald-600" /></td>
              <td className="px-6 py-4"><Minus className="h-5 w-5 text-muted-foreground" aria-label="Varies" /> <span className="sr-only">Varies</span></td>
            </tr>
            <tr className="border-b hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4 font-medium">All 50 states</td>
              <td className="px-6 py-4"><Check className="h-5 w-5 text-emerald-600" /></td>
              <td className="px-6 py-4"><Minus className="h-5 w-5 text-muted-foreground" aria-label="Varies" /> <span className="sr-only">Varies</span></td>
            </tr>
            <tr className="hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4 font-medium">Named consultant</td>
              <td className="px-6 py-4"><Check className="h-5 w-5 text-emerald-600" /></td>
              <td className="px-6 py-4"><Minus className="h-5 w-5 text-muted-foreground" aria-label="Varies" /> <span className="sr-only">Varies</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
