"use client";
import { Loader2 } from "lucide-react";
import EventCard from "@/components/event-card";
import Container from "@/components/Container";
import { useGetAllEventsQuery } from "@/store/services/eventsApi";

function EventsList() {
  const { data: events, isLoading, error } = useGetAllEventsQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading events...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Failed to load events. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {events?.map((event) => <EventCard key={event.id} event={event} />)}
    </div>
  );
}

export default function EventsPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-background py-16 md:py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-60 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <Container>
          <div className="mx-auto max-w-3xl text-center relative z-10">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Our Events
            </h1>
            <p className="mt-6 text-muted-foreground md:text-xl max-w-2xl mx-auto">
              Discover our upcoming international education conferences and
              events. Connect with educators, explore innovative teaching
              methods, and stay updated with the latest research.
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="h-1 w-20 bg-gradient-to-r from-primary/80 to-transparent rounded-full" />
              <div className="h-2 w-2 rounded-full bg-primary" />
              <div className="h-1 w-20 bg-gradient-to-l from-primary/80 to-transparent rounded-full" />
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-12">
          <EventsList />
        </div>
      </Container>
    </div>
  );
}
