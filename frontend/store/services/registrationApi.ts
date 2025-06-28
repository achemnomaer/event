/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createClient } from "@/lib/supabase/client";
import type {
  RegistrationRecord,
  RegistrationData,
} from "@/lib/types/registration";
import type {
  PaymentIntentRequest,
  PaymentIntentResponse,
} from "@/lib/types/payment";
import { calculateEventPricing } from "@/lib/utils";

export const registrationApi = createApi({
  reducerPath: "registrationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Registration", "UserRegistrations"],
  endpoints: (builder) => ({
    createRegistration: builder.mutation<
      { registrationId: string },
      RegistrationData
    >({
      queryFn: async (data) => {
        try {
          const supabase = createClient();

          // Get current user
          const {
            data: { user },
            error: userError,
          } = await supabase.auth.getUser();
          if (userError || !user) {
            throw new Error("User not authenticated");
          }

          // Get the events to calculate pricing (include currency field)
          const { data: events, error: eventsError } = await supabase
            .from("events")
            .select(
              "id, title, price, currency, early_bird_date, early_bird_discount_percent, student_discount_percent, multi_event_discount_percent"
            )
            .in("id", data.events.selectedEvents);

          if (eventsError) throw eventsError;

          // Calculate pricing
          const groupSize =
            (data.groupParticipants?.participants?.length || 0) + 1;
          const pricing = calculateEventPricing(
            events || [],
            data.registrationType,
            groupSize
          );

          const registrationRecord = {
            user_id: user.id,
            registration_type: data.registrationType,
            personal_info: data.personalInfo,
            organization_info: data.organizationInfo || null,
            selected_events: data.events.selectedEvents,
            group_participants: data.groupParticipants?.participants || [],
            payment_status: "pending" as const,
            total_amount: pricing.finalAmount,
            paid_amount: 0,
            remaining_amount: pricing.finalAmount,
            group_size: groupSize,
            discount_applied: pricing.discountType,
            discount_amount: pricing.discountAmount,
          };

          const { data: registration, error } = await supabase
            .from("event_registrations")
            .insert(registrationRecord)
            .select()
            .single();

          if (error) throw error;

          return { data: { registrationId: registration.id } };
        } catch (error: any) {
          console.error("Registration creation error:", error);
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error.message || "Registration failed",
              data: null,
            },
          };
        }
      },
      invalidatesTags: [{ type: "UserRegistrations", id: "LIST" }],
    }),

    getUserRegistrations: builder.query<RegistrationRecord[], void>({
      queryFn: async () => {
        try {
          const supabase = createClient();

          // Get current user
          const {
            data: { user },
            error: userError,
          } = await supabase.auth.getUser();
          if (userError || !user) {
            throw new Error("User not authenticated");
          }

          const { data, error } = await supabase
            .from("event_registrations")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

          if (error) throw error;

          return { data: data || [] };
        } catch (error: any) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error.message || "Failed to fetch registrations",
              data: null,
            },
          };
        }
      },
      providesTags: [{ type: "UserRegistrations", id: "LIST" }],
    }),

    getRegistrationById: builder.query<RegistrationRecord, string>({
      queryFn: async (id) => {
        try {
          const supabase = createClient();

          const { data, error } = await supabase
            .from("event_registrations")
            .select("*")
            .eq("id", id)
            .single();

          if (error) throw error;

          return { data };
        } catch (error: any) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error.message || "Registration not found",
              data: null,
            },
          };
        }
      },
      providesTags: (result, error, id) => [{ type: "Registration", id }],
    }),

    createPaymentIntent: builder.mutation<
      PaymentIntentResponse,
      PaymentIntentRequest
    >({
      query: (data) => ({
        url: "/create-payment-intent",
        method: "POST",
        body: data,
      }),
    }),

    updatePaymentStatus: builder.mutation<
      RegistrationRecord,
      {
        registrationId: string;
        paymentIntentId: string;
        status: string;
        amount?: number;
        isInstallment?: boolean;
      }
    >({
      query: (data) => ({
        url: "/update-registration-payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { registrationId }) => [
        { type: "Registration", id: registrationId },
        { type: "UserRegistrations", id: "LIST" },
      ],
    }),

    deleteRegistration: builder.mutation<void, string>({
      queryFn: async (registrationId) => {
        try {
          const supabase = createClient();

          // Get current user
          const {
            data: { user },
            error: userError,
          } = await supabase.auth.getUser();
          if (userError || !user) {
            throw new Error("User not authenticated");
          }

          // Delete the registration (this will cascade delete installment_payments)
          const { error } = await supabase
            .from("event_registrations")
            .delete()
            .eq("id", registrationId)
            .eq("user_id", user.id); // Ensure user can only delete their own registrations

          if (error) throw error;

          return { data: undefined };
        } catch (error: any) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error.message || "Failed to delete registration",
              data: null,
            },
          };
        }
      },
      invalidatesTags: [{ type: "UserRegistrations", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateRegistrationMutation,
  useGetUserRegistrationsQuery,
  useGetRegistrationByIdQuery,
  useCreatePaymentIntentMutation,
  useUpdatePaymentStatusMutation,
  useDeleteRegistrationMutation,
} = registrationApi;
