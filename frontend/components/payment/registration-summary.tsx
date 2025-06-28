/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatEventDateRange } from "@/lib/utils";

interface RegistrationSummaryProps {
  registration: any;
  events: any[];
}

export function RegistrationSummary({
  registration,
  events,
}: RegistrationSummaryProps) {
  // Get the primary currency from the first event (assuming all events in a registration use the same currency)
  const primaryCurrency =
    events.length > 0 ? events[0].currency || "USD" : "USD";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registration Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Registration Type</span>
          <Badge variant="outline">
            {registration.registration_type === "consultancy"
              ? "Consultancy"
              : "Student/Guest"}
          </Badge>
        </div>
        <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
          <SummaryCell
            label="Total"
            value={registration.total_amount}
            currency={primaryCurrency}
          />
          <SummaryCell
            label="Paid"
            value={registration.paid_amount}
            currency={primaryCurrency}
            color="text-green-600"
          />
          <SummaryCell
            label="Remaining"
            value={registration.remaining_amount}
            currency={primaryCurrency}
            color="text-orange-600"
          />
        </div>
        {registration.discount_applied && (
          <div className="flex justify-between p-3 bg-green-50 rounded-lg">
            <span className="text-sm">Discount Applied</span>
            <span className="font-semibold text-green-600">
              -{formatCurrency(registration.discount_amount, primaryCurrency)}
            </span>
          </div>
        )}
        <Separator />
        <div>
          <h4 className="font-semibold mb-3">Registered Events</h4>
          <div className="space-y-3">
            {events.map((ev: any) => (
              <div key={ev.id} className="p-3 border rounded-lg">
                <h5 className="font-medium">{ev.title}</h5>
                <p className="text-sm text-muted-foreground">
                  {formatEventDateRange(ev.start_date, ev.end_date)}
                </p>
                <p className="text-sm text-muted-foreground">{ev.location}</p>
                <p className="text-sm font-medium text-primary">
                  {formatCurrency(ev.price, ev.currency)} per person
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SummaryCell({
  label,
  value,
  currency = "USD",
  color,
}: {
  label: string;
  value: number;
  currency?: string;
  color?: string;
}) {
  return (
    <div className="text-center">
      <div className={`text-lg font-semibold ${color || ""}`}>
        {formatCurrency(value, currency)}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
