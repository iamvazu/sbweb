import type { Metadata } from "next";
import FaqClient from "./faq-client";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Stronger Built",
  description: "Answers about Stronger Built's Pay-When-You-Win pricing, our proposal process, turnaround times, industries, and how to get started winning government bids.",
};

export default function Page() {
  return <FaqClient />;
}
