import type { Metadata } from "next";
import NaicsClient from "./naics-client";

export const metadata: Metadata = {
  title: "NAICS Codes Directory: Browse & Search Industry Classifications | Stronger Built",
  description: "Browse and search all 1,000+ NAICS codes. Find small business size standards, set-aside codes, and target federal contracting opportunities by industry classification.",
};

export default function Page() {
  return <NaicsClient />;
}
