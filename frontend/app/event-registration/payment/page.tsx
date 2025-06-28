/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Progress } from "@/components/ui/progress";
import { Loader2, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetRegistrationByIdQuery } from "@/store/services/registrationApi";
import { useGetAllEventsQuery } from "@/store/services/eventsApi";
import { RegistrationSummary } from "@/components/payment/registration-summary";
import { AmountSelection } from "@/components/payment/amount-selection";
import { PaymentForm } from "@/components/payment/payment-form";
import { PaymentSummaryCard } from "@/components/payment/payment-summary-card";
import { useAuth } from "@/providers/auth-provider";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function PaymentPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { user, loading } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentAmount, setPaymentAmount] = useState(0);

  const registrationId = params.get("registrationId") || "";

  // Get the registration data from the database
  const { data: registration, isLoading: regLoading } =
    useGetRegistrationByIdQuery(registrationId, { skip: !registrationId });

  // Get the events data from the database
  const { data: events } = useGetAllEventsQuery();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (registration) setPaymentAmount(registration.remaining_amount);
  }, [registration]);

  if (loading || regLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  if (!registration)
    return (
      <div className="container py-12 text-center">
        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
        <h1 className="text-2xl font-bold mb-4">Registration Not Found</h1>
        <Button onClick={() => router.push("/dashboard")}>
          Go to Dashboard
        </Button>
      </div>
    );

  const registeredEvents = events
    ? registration.selected_events
        .map((id: string) => events.find((e: any) => e.id === id))
        .filter(Boolean)
    : [];
  const progress = (step / 3) * 100;

  return (
    <div className="container py-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 mx-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Complete Payment</h1>
        <p className="text-muted-foreground">Registration #{registration.id}</p>
      </div>
      <div className="mb-8 mx-4">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span className={step >= 1 ? "text-primary font-medium" : ""}>
            Select Amount
          </span>
          <span className={step >= 2 ? "text-primary font-medium" : ""}>
            Payment
          </span>
          <span className={step >= 3 ? "text-primary font-medium" : ""}>
            Complete
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {step === 1 && (
        <div className="grid gap-8 lg:grid-cols-2">
          <AmountSelection
            registration={registration}
            onContinue={(amt) => {
              setPaymentAmount(amt);
              setStep(2);
            }}
          />
          <RegistrationSummary
            registration={registration}
            events={registeredEvents}
          />
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col lg:flex-row w-full gap-8">
          <div className="w-full">
            <Elements stripe={stripePromise}>
              <PaymentForm
                registration={registration}
                paymentAmount={paymentAmount}
                onSuccess={() => setStep(3)}
              />
            </Elements>
          </div>
          <div className="w-full">
            <PaymentSummaryCard
              remaining={registration.remaining_amount}
              amount={paymentAmount}
              onChange={() => setStep(1)}
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="text-center py-12">
          <CheckCircle className="h-16 w-16 mx-auto mb-6 text-green-500" />
          <h2 className="text-3xl font-bold mb-4">Payment Successful!</h2>
          <p className="text-muted-foreground mb-6">
            Your payment of{" "}
            {paymentAmount.toLocaleString("en-US", {
              style: "currency",
              currency: "EUR",
            })}{" "}
            has been processed.
          </p>
          <Button onClick={() => router.push("/dashboard")} size="lg">
            Go to Dashboard
          </Button>
        </div>
      )}
    </div>
  );
}
