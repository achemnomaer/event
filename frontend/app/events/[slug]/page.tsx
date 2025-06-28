"use client";

import React from "react";

import { notFound } from "next/navigation";
import { useGetEventBySlugQuery } from "@/store/services/eventsApi";
import Detail from "./Details";
import { Loader } from "@/components/ui/loader";

type Params = { slug: string };

export default function EventDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const resolvedParams = React.use(params);
  const { slug } = resolvedParams;

  const { data: event, isLoading, error } = useGetEventBySlugQuery(slug);

  if (isLoading) {
    return (
      <div className="relative min-h-[80vh]">
        <Loader variant="overlay" message="Loading event..." />
      </div>
    );
  }

  if (error || !event) {
    notFound();
  }

  return <Detail event={event} />;
}
