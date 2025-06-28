/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    /* ── auth guard ─────────────────────────────────────────────── */
    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();
    if (userErr || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    /* ── payload ───────────────────────────────────────────────── */
    const {
      registrationId,
      paymentIntentId,
      status, // Stripe status, e.g. "succeeded"
      amount, // cents
      isInstallment, // boolean
    } = await req.json();

    const payAmount = amount / 100; // ↲ convert cents → major units

    /* helper to write a payment row */
    const recordPayment = async () => {
      const { error } = await supabase.from("installment_payments").insert({
        registration_id: registrationId,
        payment_intent_id: paymentIntentId,
        amount: payAmount,
        payment_status: status,
        payment_date: status === "succeeded" ? new Date().toISOString() : null,
      });
      if (error) throw error;
    };

    /* ── branch 1: installment (partial) ───────────────────────── */
    if (isInstallment) {
      const { data: reg } = await supabase
        .from("event_registrations")
        .select("paid_amount, total_amount")
        .eq("id", registrationId)
        .single();

      if (!reg) {
        return NextResponse.json(
          { error: "Registration not found" },
          { status: 404 }
        );
      }

      const newPaid = reg.paid_amount + payAmount;
      const newLeft = reg.total_amount - newPaid;
      const newState = newLeft <= 0 ? "succeeded" : "pending";

      const { error: updErr } = await supabase
        .from("event_registrations")
        .update({
          paid_amount: newPaid,
          remaining_amount: Math.max(0, newLeft),
          payment_status: newState,
          updated_at: new Date().toISOString(),
        })
        .eq("id", registrationId);

      if (updErr) throw updErr;

      await recordPayment(); // ← ALWAYS record
    } else {
    /* ── branch 2: one-shot or “final” payment ─────────────────── */
      const updateData: any = {
        payment_status: status,
        payment_intent_id: paymentIntentId,
        updated_at: new Date().toISOString(),
      };

      if (status === "succeeded") {
        updateData.paid_at = new Date().toISOString();

        const { data: reg } = await supabase
          .from("event_registrations")
          .select("total_amount")
          .eq("id", registrationId)
          .single();

        if (reg) {
          updateData.paid_amount = reg.total_amount;
          updateData.remaining_amount = 0;
          updateData.payment_status = "succeeded";
        }
      }

      const { error: updErr } = await supabase
        .from("event_registrations")
        .update(updateData)
        .eq("id", registrationId);

      if (updErr) throw updErr;

      await recordPayment(); // ← ALSO record for auditing
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Payment update error:", err);
    return NextResponse.json(
      { error: "Failed to update payment status" },
      { status: 500 }
    );
  }
}
