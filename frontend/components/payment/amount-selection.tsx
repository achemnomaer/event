/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import type React from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

interface AmountSelectionProps {
  registration: any;
  onContinue: (amount: number) => void;
}

export function AmountSelection({
  registration,
  onContinue,
}: AmountSelectionProps) {
  const [paymentMode, setPaymentMode] = useState<"full" | "custom">("full");
  const [customAmount, setCustomAmount] = useState<string>(
    (registration.remaining_amount || 0).toString()
  );
  const paymentAmount =
    paymentMode === "full"
      ? registration.remaining_amount
      : Number.parseFloat(customAmount) || 0;

  // Get currency from registration or default to USD
  const currency = registration.currency || "EUR";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Payment Amount</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <RadioRow
            id="full"
            checked={paymentMode === "full"}
            onChange={() => setPaymentMode("full")}
            label="Pay Full Balance"
            sub="Complete your registration payment"
            amount={registration.remaining_amount}
            currency={currency}
          />
          <RadioRow
            id="custom"
            checked={paymentMode === "custom"}
            onChange={() => setPaymentMode("custom")}
            label="Custom Amount"
            sub="Pay a partial amount (min €1)"
            currency={currency}
            customInput={
              paymentMode === "custom" && (
                <div className="mt-3">
                  <Input
                    type="number"
                    min="1"
                    max={registration.remaining_amount}
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>
              )
            }
          />
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Payment Amount</span>
            <span className="font-medium">
              {formatCurrency(paymentAmount, currency)}
            </span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Remaining After Payment</span>
            <span>
              {formatCurrency(
                (registration.remaining_amount || 0) - paymentAmount,
                currency
              )}
            </span>
          </div>
        </div>
        <Button
          disabled={
            paymentAmount <= 0 || paymentAmount > registration.remaining_amount
          }
          className="w-full"
          size="lg"
          onClick={() => onContinue(paymentAmount)}
        >
          Continue to Payment
        </Button>
      </CardContent>
    </Card>
  );
}

interface RadioRowProps {
  id: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  sub: string;
  amount?: number;
  currency?: string;
  customInput?: React.ReactNode;
}

function RadioRow({
  id,
  checked,
  onChange,
  label,
  sub,
  amount,
  currency = "USD",
  customInput,
}: RadioRowProps) {
  return (
    <div className="p-4 border rounded-lg cursor-pointer" onClick={onChange}>
      <div className="flex space-x-3 items-start">
        <input
          type="radio"
          name="paymentMode"
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 mt-1"
          id={id}
        />
        <div className="flex-1 space-y-1">
          <Label htmlFor={id} className="font-medium cursor-pointer">
            {label}
          </Label>
          <p className="text-sm text-muted-foreground">{sub}</p>
          {customInput}
        </div>
        {amount !== undefined && (
          <p className="text-lg font-semibold text-primary whitespace-nowrap">
            {formatCurrency(amount, currency)}
          </p>
        )}
      </div>
    </div>
  );
}
