/* eslint-disable @typescript-eslint/no-explicit-any */
// ────────────────────────────────────────────────────────────────
//  components/payment/PaymentForm.tsx – stacked Stripe split fields
// ────────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";

interface PaymentFormProps {
  registration: any;
  paymentAmount: number;
  onSuccess: () => void;
}

export function PaymentForm({
  registration,
  paymentAmount,
  onSuccess,
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return toast.error("Payment system not ready");

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) return toast.error("Card input not ready");

    setIsProcessing(true);
    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationId: registration.id,
          amount: Math.round(paymentAmount * 100),
          isInstallment: paymentAmount < registration.remaining_amount,
        }),
      });
      const { clientSecret, error } = await res.json();
      if (error) throw new Error(error);

      const { error: confirmErr, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${registration.personal_info?.firstName} ${registration.personal_info?.lastName}`,
              email: registration.personal_info?.email,
            },
          },
        });
      if (confirmErr) throw new Error(confirmErr.message);

      if (paymentIntent.status === "succeeded") {
        await fetch("/api/update-registration-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            registrationId: registration.id,
            paymentIntentId: paymentIntent.id,
            status: "succeeded",
            amount: paymentIntent.amount,
            isInstallment: paymentAmount < registration.remaining_amount,
          }),
        });
        toast.success("Payment successful!");
        onSuccess();
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const inputWrapper = "p-3 border rounded-md bg-white";
  const baseStyle = { base: { fontSize: "16px" } };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" /> Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className={inputWrapper}>
                <CardNumberElement
                  id="cardNumber"
                  options={{ showIcon: true, style: baseStyle }}
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="cardExpiry">Expiry</Label>
              <div className={inputWrapper}>
                <CardExpiryElement
                  id="cardExpiry"
                  options={{ style: baseStyle }}
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="cardCvc">CVC</Label>
              <div className={inputWrapper}>
                <CardCvcElement id="cardCvc" options={{ style: baseStyle }} />
              </div>
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>{formatCurrency(paymentAmount)}</span>
          </div>

          <Button
            disabled={!stripe || isProcessing}
            className="w-full"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing…
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Pay {formatCurrency(paymentAmount)}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// ────────────────────────────────────────────────────────────────
