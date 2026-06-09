"use client"

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import GeminiChatbot from "@/components/layout/GeminiChatbot";

export function ConditionalWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortal = pathname?.startsWith("/portal");
  const isOnboarding = pathname === "/portal/onboarding";

  // Hide marketing header/footer on all portal routes (except maybe some shared ones, but usually all)
  // Onboarding should also have a clean UI.
  
  if (isPortal) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <GeminiChatbot />
    </>
  );
}
