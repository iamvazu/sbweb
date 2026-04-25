import type { Metadata } from "next";
import { Inter, Geist, Lora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ConditionalWrapper } from "@/components/layout/ConditionalWrapper";
import { Toaster } from "@/components/ui/toaster";
import { Schema } from "@/components/seo/Schema";


const geist = Geist({subsets:['latin'],variable:'--font-sans'});
const lora = Lora({ subsets: ['latin'], variable: '--font-serif' });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Stronger Built LLC | California Public Works & DVBE Contractor",
  description: "Stronger Built LLC is your high-authority partner for California public works. Whether you need a licensed GC for heavy civil projects or expert bid management to win your next RFP, we deliver executive-level performance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable, lora.variable)}>
      <body className={`${inter.variable} min-h-screen flex flex-col`}>
        <Schema />
        <TooltipProvider>

          <ConditionalWrapper>
            {children}
          </ConditionalWrapper>
          <Analytics />
          <SpeedInsights />
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
