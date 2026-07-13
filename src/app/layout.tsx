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
  metadataBase: new URL("https://www.strongerbuilt.us"),
  title: {
    default: "STRONGERbuilt — We Find, Write & Win Gov Bids. You Pay When You Win.",
    template: "%s | STRONGERbuilt",
  },
  description: "Stronger Built's expert consultants find, manage, and win government RFPs for businesses nationwide. Pay-when-you-win pricing. Free consultation.",
  openGraph: {
    type: "website",
    siteName: "STRONGERbuilt",
    url: "https://www.strongerbuilt.us",
    title: "STRONGERbuilt — We Find, Write & Win Gov Bids. You Pay When You Win.",
    description: "Stronger Built's expert consultants find, manage, and win government RFPs for businesses nationwide. Pay-when-you-win pricing. Free consultation.",
    images: ["/og-default.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@strongerbuilt",
    title: "STRONGERbuilt — We Find, Write & Win Gov Bids. You Pay When You Win.",
    description: "Stronger Built's expert consultants find, manage, and win government RFPs for businesses nationwide. Pay-when-you-win pricing. Free consultation.",
    images: ["/og-default.png"],
  },
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
