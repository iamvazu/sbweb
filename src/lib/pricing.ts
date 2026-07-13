export interface PricingTier {
  maxContract: string;
  writingFee: string;
  successFeePct: string;
}

export const payWhenYouWin: PricingTier[] = [
  { maxContract: "Up to $1M", writingFee: "$450", successFeePct: "1.00%" },
  { maxContract: "$2M", writingFee: "$750", successFeePct: "0.90%" },
  { maxContract: "$3M", writingFee: "$1,000", successFeePct: "0.80%" },
  { maxContract: "$4M", writingFee: "$1,250", successFeePct: "0.70%" },
  { maxContract: "$5M", writingFee: "$1,500", successFeePct: "0.60%" },
  { maxContract: "Above $5M", writingFee: "$1,500 + $250 per additional $1M", successFeePct: "0.50%" },
];

export const pricingNotes =
  "Writing fee covers requirement extraction, win strategy, full proposal, compliance matrix, and on-time submission. " +
  "Success fee charged ONLY if you are awarded the contract. Flat-rate and monthly-retainer options also available.";
