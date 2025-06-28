/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createClient } from "@/lib/supabase/client";
import type {
  ContactFormValues,
  NewsletterFormValues,
} from "@/lib/schemas/contact";

interface MessageResponse {
  message: string;
}

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/contact",
  }),
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    submitContactForm: builder.mutation<MessageResponse, ContactFormValues>({
      queryFn: async (data) => {
        try {
          const supabase = createClient();

          const { error } = await supabase.from("contact_messages").insert({
            name: data.name,
            email: data.email,
            phone: data.phone || null,
            organization: data.organization || null,
            subject: data.subject,
            message: data.message,
          });

          if (error) throw error;

          return {
            data: {
              message: "Message sent successfully",
            },
          };
        } catch (error: any) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error.message || "An unknown error occurred",
              data: null,
            },
          };
        }
      },
    }),
    subscribeToNewsletter: builder.mutation<
      MessageResponse,
      NewsletterFormValues
    >({
      queryFn: async ({ email }) => {
        try {
          const supabase = createClient();

          const { error } = await supabase
            .from("newsletter_subscriptions")
            .insert({ email });

          if (error) {
            if (error.code === "23505") {
              // Unique constraint violation
              return {
                data: {
                  message: "You're already subscribed to our newsletter!",
                },
              };
            }
            throw error;
          }

          return {
            data: {
              message: "Successfully subscribed to the newsletter!",
            },
          };
        } catch (error: any) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error.message || "An unknown error occurred",
              data: null,
            },
          };
        }
      },
    }),
  }),
});

export const {
  useSubmitContactFormMutation,
  useSubscribeToNewsletterMutation,
} = contactApi;
