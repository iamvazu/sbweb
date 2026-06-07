import { Suspense } from "react";
import type { Metadata } from "next";
import BookClient from "./book-client";

export const metadata: Metadata = {
  title: "Book a Free Consultation — Win Government Bids | Stronger Built",
  description: "Book a free, no-obligation consultation with Stronger Built. We'll review the contracts you want to win, surface real opportunities, give you an honest go/no-go, and explain Pay-When-You-Win — nationwide, veteran-owned.",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-brand-navy-950 text-slate-400">Loading...</div>}>
      <BookClient />
    </Suspense>
  );
}
