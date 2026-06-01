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

  // Pre-defined prices for our service tiers (in cents)
  const prices: Record<string, number> = {
    'scout': 4900,           // $49.00/mo
    'pro': 9900,             // $99.00/mo
    'managed_bid': 45000,    // $450.00 per bid
  };

  const tierNames: Record<string, string> = {
    'scout': "Scout Subscription (Monthly)",
    'pro': "Pro Subscription (Monthly)",
    'managed_bid': "Expert Managed Bid Submission",
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

export async function createSubscriptionSession(formData: FormData) {
  const tier = formData.get("tier") as string; // 'scout' or 'pro'

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to subscribe");
  }

  // Pre-defined monthly prices for our subscriptions (in cents)
  const prices: Record<string, number> = {
    'scout': 4900,
    'pro': 9900,
  };

  const tierNames: Record<string, string> = {
    'scout': "Scout Subscription (Monthly)",
    'pro': "Pro Subscription (Monthly)",
  };

  const amount = prices[tier] || 4900;
  const name = tierNames[tier] || "Subscription Plan";

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
            name: name,
            description: `Access to premium procurement tools and alerts for ${name}.`,
          },
          unit_amount: amount,
          recurring: {
            interval: "month",
          },
        },
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${baseUrl}/portal/settings?status=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/portal/settings?status=cancelled`,
    customer_email: user.email,
    metadata: {
      userId: user.id,
      tier: tier,
    },
  });

  redirect(session.url!);
}
