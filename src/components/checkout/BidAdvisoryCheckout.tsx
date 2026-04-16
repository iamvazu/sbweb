"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder";

export default function BidAdvisoryCheckout({ 
  priceId, 
  tierName, 
  depositAmount 
}: { 
  priceId: string; 
  tierName: string; 
  depositAmount: string;
}) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);
      
      if (!stripe) throw new Error("Stripe failed to load");

      // Note: In a production environment, you would typically call a backend 
      // API to create a checkout session. For this implementation, we are 
      // preparing the structure for Stripe Checkout integration.
      
      console.log(`Initializing checkout for ${tierName} (${priceId})`);
      
      // Since we are using placeholders for Price IDs, we'll alert the user 
      // for now, but the logic is ready for the real IDs.
      if (priceId.includes("placeholder")) {
        alert(`Checkout logic ready! Please replace the placeholder Price ID (${priceId}) with your real Stripe Price ID in the service data.`);
        setLoading(false);
        return;
      }

      const { error } = await (stripe as any).redirectToCheckout({
        lineItems: [{ price: priceId, quantity: 1 }],
        mode: 'payment',
        successUrl: `${window.location.origin}/contact?service=success`,
        cancelUrl: `${window.location.origin}/services/strategic-bid-advisory`,
      });

      if (error) {
        console.error("Stripe Error:", error);
        alert(error.message);
      }
    } catch (err) {
      console.error("Payment failure:", err);
      alert("There was an issue connecting to the payment gateway.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="group w-full flex items-center justify-center gap-3 bg-brand-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-brand-blue-600/20 disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          Secure {tierName} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </button>
  );
}
