"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

interface PaymentSummaryCardProps {
  remaining: number;
  amount: number;
  currency?: string;
  onChange: () => void;
}

export function PaymentSummaryCard({
  remaining,
  amount,
  currency = "EUR",
  onChange,
}: PaymentSummaryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Payment Amount</span>
          <span className="text-2xl font-bold">
            {formatCurrency(amount, currency)}
          </span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Payment Type</span>
          <span>{amount >= remaining ? "Full" : "Installment"}</span>
        </div>
        <Separator />
        <div className="flex justify-between text-sm">
          <span>Remaining After Payment</span>
          <span>{formatCurrency(remaining - amount, currency)}</span>
        </div>
        <Button variant="outline" onClick={onChange} className="w-full">
          Change Amount
        </Button>
      </CardContent>
    </Card>
  );
}
