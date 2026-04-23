import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import Stripe from "stripe";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    if (!sig || !endpointSecret) {
      throw new Error("Missing stripe-signature or endpointSecret");
    }
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const supabase = await createClient();

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.CheckoutSession;
      const metadata = session.metadata;

      if (!metadata || !metadata.userId) {
        console.error("Missing metadata in checkout session");
        break;
      }

      // 1. Handle Managed Bid Payment
      if (session.mode === "payment" && metadata.bidId) {
        const { error: engagementError } = await supabase
          .from("service_engagements")
          .insert({
            user_id: metadata.userId,
            bid_id: metadata.bidId,
            tier: metadata.tier || 'managed_bid',
            price_agreed: session.amount_total ? session.amount_total / 100 : 249,
            payment_status: 'paid',
            stripe_payment_id: session.payment_intent as string,
            status: 'intake'
          });

        if (engagementError) {
          console.error("Error creating service engagement:", engagementError);
        } else {
          // Also update the match stage to 'pursuing' or similar
          await supabase
            .from("user_bid_matches")
            .update({ pipeline_stage: 'pursuing', hire_us_requested: true })
            .eq("user_id", metadata.userId)
            .eq("bid_id", metadata.bidId);
        }
      }

      // 2. Handle Subscription Payment
      if (session.mode === "subscription" && metadata.tier) {
        const { error: userError } = await supabase
          .from("users")
          .update({
            subscription_tier: metadata.tier,
            subscription_status: 'active'
          })
          .eq("id", metadata.userId);

        if (userError) {
          console.error("Error updating user subscription:", userError);
        }
      }

      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
