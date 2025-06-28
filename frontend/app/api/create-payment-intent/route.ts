import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

interface CreatePaymentIntentRequest {
  registrationId: string;
  amount: number;
  currency?: string;
  isInstallment?: boolean;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      registrationId,
      amount,
      currency = "eur", // Default to EUR
      isInstallment = false,
    }: CreatePaymentIntentRequest = await request.json();

    console.log("Payment intent request:", {
      registrationId,
      amount,
      currency,
      isInstallment,
    });

    if (!registrationId || !amount || amount < 100) {
      return NextResponse.json(
        { error: "Invalid payment data" },
        { status: 400 }
      );
    }

    // Get registration details
    const { data: registration, error: regError } = await supabase
      .from("event_registrations")
      .select("*")
      .eq("id", registrationId)
      .eq("user_id", user.id)
      .single();

    if (regError || !registration) {
      console.error("Registration fetch error:", regError);
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    // Validate payment amount
    const maxAmount = Math.round((registration.remaining_amount || 0) * 100);
    if (amount > maxAmount) {
      return NextResponse.json(
        { error: "Amount exceeds remaining balance" },
        { status: 400 }
      );
    }

    // Create Stripe payment intent with the specified currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: currency.toLowerCase(), // Stripe expects lowercase currency codes
      metadata: {
        registrationId,
        userId: user.id,
        userEmail: user.email || "",
        isInstallment: isInstallment.toString(),
        originalAmount: (registration.total_amount * 100).toString(),
      },
    });

    console.log("Payment intent created successfully:", paymentIntent.id);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      registrationId,
      currency,
    });
  } catch (error) {
    console.error("Payment intent creation error:", error);
    return NextResponse.json(
      {
        error: "Failed to create payment intent",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
