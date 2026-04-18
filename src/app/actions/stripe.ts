"use server";

import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createCheckoutSession(formData: FormData) {
  const bidId = formData.get("bidId") as string;
  const tier = formData.get("tier") as string;
  const bidName = formData.get("bidName") as string;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to create a checkout session");
  }

  // Pre-defined prices for our service tiers
  const prices: Record<string, number> = {
    'ifb_express': 150000,   // $1,500.00
    'rfp_standard': 350000,  // $3,500.00
    'full_cycle': 750000,    // $7,500.00
  };

  const tierNames: Record<string, string> = {
    'ifb_express': "IFB Express Submission Package",
    'rfp_standard': "RFP Strategic Response Package",
    'full_cycle': "Full-Cycle Management & Compliance",
  };

  const amount = prices[tier] || 150000;
  const name = tierNames[tier] || "Bid Management Service";

  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${name}: ${bidName}`,
            description: `Professional bid management and compliance services for solicitation ${bidId}.`,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${baseUrl}/portal/engagements?status=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/portal/bids/${bidId}?status=cancelled`,
    customer_email: user.email,
    metadata: {
      userId: user.id,
      bidId: bidId,
      tier: tier,
    },
  });

  redirect(session.url!);
}
