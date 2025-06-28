import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Event } from "@/lib/types/events";

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Event"],
  endpoints: (builder) => ({
    getAllEvents: builder.query<Event[], void>({
      query: () => "/events",
      providesTags: ["Event"],
    }),

    getEventBySlug: builder.query<Event, string>({
      query: (slug) => `/events/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Event", id: slug }],
    }),

    getFeaturedEvents: builder.query<Event[], number>({
      query: (limit = 2) => `/events/featured?limit=${limit}`,
      providesTags: ["Event"],
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetEventBySlugQuery,
  useGetFeaturedEventsQuery,
} = eventsApi;
