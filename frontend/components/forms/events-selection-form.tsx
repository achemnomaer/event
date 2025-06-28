/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
// EventSelectionForm – pill-style two‑column list with title | date | location

"use client";

import { useFormContext } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { CheckCircle, Plus } from "lucide-react";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useGetAllEventsQuery } from "@/store/services/eventsApi";
import { formatEventDateRange } from "@/lib/utils";

type RegistrationType = "consultancy" | "student-guest";

interface EventsSelectionFormProps {
  registrationType: RegistrationType;
}

export function EventsSelectionForm({
  registrationType,
}: EventsSelectionFormProps) {
  const form = useFormContext();
  const searchParams = useSearchParams();
  const { data: events, isLoading } = useGetAllEventsQuery();

  // Get pre-selected event from URL params
  const preSelectedEvent = searchParams.get("event");

  // Pre-select event if coming from event detail page
  useEffect(() => {
    if (preSelectedEvent && events) {
      const eventExists = events.find(
        (event: any) => event.id === preSelectedEvent
      );
      if (eventExists) {
        const currentSelected = form.getValues("events.selectedEvents") || [];
        if (!currentSelected.includes(preSelectedEvent)) {
          form.setValue("events.selectedEvents", [
            ...currentSelected,
            preSelectedEvent,
          ]);
        }
      }
    }
  }, [preSelectedEvent, events, form]);

  if (isLoading) return <div className="text-center py-8">Loading events…</div>;
  if (!events?.length)
    return <div className="text-center py-8">No events available</div>;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Select Events to Attend</h3>
        <p className="text-sm text-muted-foreground">
          Choose the events you'd like to attend.{" "}
          {registrationType === "consultancy" &&
            "Multiple selections may qualify for bundle discounts."}
          {preSelectedEvent && (
            <span className="block mt-1 text-primary font-medium">
              Event pre-selected from your previous selection.
            </span>
          )}
        </p>
      </div>

      {/* ------------ Event Pills ------------- */}
      <FormField
        control={form.control}
        name="events.selectedEvents"
        render={({ field }) => (
          <FormItem>
            <div className="grid gap-4">
              {events.map((event: any) => {
                const selected = field.value?.includes(event.id);
                const isPreSelected = event.id === preSelectedEvent;
                const toggleSelect = () => {
                  const current: string[] = field.value || [];
                  field.onChange(
                    selected
                      ? current.filter((v) => v !== event.id)
                      : [...current, event.id]
                  );
                };

                return (
                  <div
                    key={event.id}
                    onClick={toggleSelect}
                    role="button"
                    className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition-colors cursor-pointer select-none ${
                      selected
                        ? "border-primary/60 bg-primary/5"
                        : "border-border hover:bg-muted/50"
                    } ${isPreSelected && !selected ? "ring-2 ring-primary/30 bg-primary/10" : ""}`}
                  >
                    <div className="flex flex-col text-sm">
                      <span className="font-medium">
                        {event.title} |{" "}
                        {formatEventDateRange(event.start_date, event.end_date)}{" "}
                        | {event.location}
                        {isPreSelected && (
                          <span className="ml-2 text-xs text-primary font-medium">
                            (Recommended)
                          </span>
                        )}
                      </span>
                    </div>
                    <span className="ml-2">
                      {selected ? (
                        <CheckCircle className="w-5 h-5 text-primary" />
                      ) : (
                        <Plus className="w-5 h-5 text-muted-foreground" />
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* ----- Info Blocks ----- */}
      {registrationType === "consultancy" ? (
        <div className="rounded-lg bg-muted/50 p-4 text-sm">
          <p className="font-medium">Consultancy Benefits</p>
          <ul className="mt-1 list-disc list-inside space-y-1 text-muted-foreground">
            <li>Early-bird discounts where available</li>
            <li>Multi-event bundle savings</li>
            <li>Exclusive networking with education providers</li>
          </ul>
        </div>
      ) : (
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-4 text-sm">
          <p className="font-medium">Student / Guest Benefits</p>
          <ul className="mt-1 list-disc list-inside space-y-1 text-muted-foreground">
            <li>50% student discount on all events</li>
            <li>Access to student networking sessions</li>
            <li>Career‑guidance workshops</li>
          </ul>
        </div>
      )}
    </div>
  );
}
