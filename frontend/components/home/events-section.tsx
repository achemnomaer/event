"use client";

import EventCard from "../event-card";
import { useGetAllEventsQuery } from "@/store/services/eventsApi";
import { Loader2 } from "lucide-react";

export default function EventsSection() {
  const { data: events, isLoading, error } = useGetAllEventsQuery();
  return (
    <section className="w-full py-12 md:py-24">
      <div className="">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Upcoming Events
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Discover top international education conferences and events from
              around the world.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <div className="col-span-full flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Loading events...</span>
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  Failed to load events. Please try again later.
                </p>
              </div>
            ) : (
              events
                ?.slice(0, 6)
                .map((event) => <EventCard key={event.id} event={event} />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
