import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Event } from "@/lib/types/events";
import type { PricingCalculation } from "@/lib/types/registration";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateEventPricing(
  events: Event[],
  registrationType: "consultancy" | "student-guest",
  groupSize = 1
): PricingCalculation {
  if (!events || events.length === 0) {
    return {
      originalAmount: 0,
      discountAmount: 0,
      finalAmount: 0,
      discountType: null,
      discountPercent: 0,
    };
  }

  // Calculate base amount using event prices
  const baseAmount =
    events.reduce((sum, event) => {
      return sum + (event.price || 0);
    }, 0) * groupSize;

  // For student-guest: only apply student discount
  if (registrationType === "student-guest") {
    const avgStudentDiscount =
      events.reduce(
        (sum, event) => sum + (event.student_discount_percent || 50),
        0
      ) / events.length;

    const discountAmount = baseAmount * (avgStudentDiscount / 100);

    return {
      originalAmount: baseAmount,
      discountAmount,
      finalAmount: Math.max(0, baseAmount - discountAmount),
      discountType: "student_discount",
      discountPercent: avgStudentDiscount,
    };
  }

  // For consultancy: apply either early bird OR multi-event discount (whichever is higher)
  const discounts = [];

  // Check for early bird discount
  const now = new Date();
  const hasEarlyBird = events.some((event) => {
    if (!event.early_bird_date) return false;
    const earlyBirdDate = new Date(event.early_bird_date);
    return now <= earlyBirdDate;
  });

  if (hasEarlyBird) {
    const avgEarlyBirdDiscount =
      events.reduce(
        (sum, event) => sum + (event.early_bird_discount_percent || 0),
        0
      ) / events.length;
    discounts.push({
      type: "early_bird",
      percent: avgEarlyBirdDiscount,
      amount: baseAmount * (avgEarlyBirdDiscount / 100),
    });
  }

  // Check for multi-event discount
  if (events.length >= 2) {
    const avgMultiEventDiscount =
      events.reduce(
        (sum, event) => sum + (event.multi_event_discount_percent || 40),
        0
      ) / events.length;
    discounts.push({
      type: "multi_event",
      percent: avgMultiEventDiscount,
      amount: baseAmount * (avgMultiEventDiscount / 100),
    });
  }

  // Apply the highest discount only (or no discount if none available)
  const bestDiscount = discounts.reduce(
    (best, current) => (current.amount > best.amount ? current : best),
    {
      type: null as string | null,
      percent: 0,
      amount: 0,
    }
  );

  return {
    originalAmount: baseAmount,
    discountAmount: bestDiscount.amount,
    finalAmount: Math.max(0, baseAmount - bestDiscount.amount),
    discountType: bestDiscount.type,
    discountPercent: bestDiscount.percent,
  };
}

// Update currency formatting to handle different currencies
export function formatCurrencyWithCode(
  amount: number,
  currency = "EUR"
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  }).format(amount);
}

export function formatCurrency(amount: number, currency = "EUR"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatEventDateRange(
  startDate: string,
  endDate: string
): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const sameMonth = start.getMonth() === end.getMonth();
  const sameYear = start.getFullYear() === end.getFullYear();

  if (sameMonth && sameYear) {
    return `${format(start, "MMMM d")}-${format(end, "d, yyyy")}`;
  }

  if (sameYear) {
    return `${format(start, "MMMM d")} - ${format(end, "MMMM d, yyyy")}`;
  }

  return `${format(start, "MMMM d, yyyy")} - ${format(end, "MMMM d, yyyy")}`;
}
