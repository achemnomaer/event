/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { PersonalInfoForm } from "./personal-info-form";
import { ConsultancyOrganizationForm } from "./consultancy-organization-form";
import { EventsSelectionForm } from "./events-selection-form";
import { GroupParticipantsForm } from "./group-participants-form";

import {
  consultancyFormSchema,
  studentGuestFormSchema,
  type ConsultancyFormValues,
  type StudentGuestFormValues,
} from "@/lib/schemas/registration";
import { useCreateRegistrationMutation } from "@/store/services/registrationApi";
import { calculateEventPricing, formatCurrencyWithCode } from "@/lib/utils";
import { useGetAllEventsQuery } from "@/store/services/eventsApi";
import { useAuth } from "@/providers/auth-provider";
import { signUp } from "@/lib/supabase/auth";

interface MultiStepFormProps {
  registrationType: "consultancy" | "student-guest";
}

export function MultiStepForm({ registrationType }: MultiStepFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createRegistration] = useCreateRegistrationMutation();
  const { data: events } = useGetAllEventsQuery();
  const { user } = useAuth();

  const schema =
    registrationType === "consultancy"
      ? consultancyFormSchema
      : studentGuestFormSchema;

  const form = useForm<ConsultancyFormValues | StudentGuestFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      personalInfo: {
        gender: undefined,
        salutation: undefined,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
      },
      ...(registrationType === "consultancy" && {
        organizationInfo: {
          organizationName: "",
          website: "",
          address: "",
        },
      }),
      events: {
        selectedEvents: [],
      },
      groupParticipants: { participants: [] },
    },
  });

  const steps = [
    {
      title: "Personal Information",
      component: <PersonalInfoForm />,
      fields: ["personalInfo"],
    },
    ...(registrationType === "consultancy"
      ? [
          {
            title: "Organization Details",
            component: <ConsultancyOrganizationForm />,
            fields: ["organizationInfo"],
          },
        ]
      : []),
    {
      title: "Select Events",
      component: <EventsSelectionForm registrationType={registrationType} />,
      fields: ["events"],
    },
    {
      title: "Group Participants",
      component: <GroupParticipantsForm />,
      fields: ["groupParticipants"],
    },
  ];

  const validateCurrentStep = async () => {
    const currentStepConfig = steps[currentStep];
    const fieldsToValidate = currentStepConfig.fields;

    const isValid = await form.trigger(fieldsToValidate as any);
    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const createUserAccount = async (personalInfo: any) => {
    try {
      // Generate a temporary password
      const tempPassword = Math.random().toString(36).slice(-12) + "A1!";

      const { data, error } = await signUp(
        personalInfo.email,
        tempPassword,
        personalInfo.firstName,
        personalInfo.lastName
      );

      if (error) {
        throw new Error(error.message);
      }

      return data.user;
    } catch (error: any) {
      console.error("User creation error:", error);
      throw new Error("Failed to create user account: " + error.message);
    }
  };

  const onSubmit = async (
    data: ConsultancyFormValues | StudentGuestFormValues
  ) => {
    setIsSubmitting(true);

    try {
      let userId = user?.id;

      // If user is not authenticated, create an account
      if (!user) {
        toast.info("Creating your account...");
        const newUser = await createUserAccount(data.personalInfo);
        userId = newUser?.id;

        if (!userId) {
          throw new Error("Failed to create user account");
        }
      }

      // Add registration type and user ID to the data
      const registrationData = {
        ...data,
        registrationType,
        userId,
      };

      // Create registration in database
      const result = await createRegistration(registrationData).unwrap();

      if (result.registrationId) {
        if (!user) {
          // For new users, redirect to verification page
          toast.success(
            "Account created! Please check your email to verify your account before proceeding to payment."
          );
          router.push(
            `/event-registration/verify-account?registrationId=${result.registrationId}`
          );
        } else {
          // For existing users, proceed to payment
          toast.success("Registration saved successfully!");

          // Calculate pricing for payment
          const selectedEventData =
            events?.filter((event) =>
              data.events.selectedEvents.includes(event.id)
            ) || [];

          const groupSize =
            (data.groupParticipants?.participants?.length || 0) + 1;
          const pricing = calculateEventPricing(
            selectedEventData,
            registrationType,
            groupSize
          );

          // Get the currency from the first event (assuming all events have the same currency)
          const currency = selectedEventData[0]?.currency || "EUR";

          // Redirect to payment with registration ID and amount
          const amountInCents = Math.round(pricing.finalAmount * 100);
          router.push(
            `/event-registration/payment?registrationId=${result.registrationId}&amount=${amountInCents}&currency=${currency}`
          );
        }
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get current form values for pricing calculation
  const watchedValues = form.watch();
  const selectedEvents = watchedValues.events?.selectedEvents || [];
  const groupParticipants = watchedValues.groupParticipants?.participants || [];
  const groupSize = groupParticipants.length + 1;

  // Calculate pricing
  const selectedEventData =
    events?.filter((event) => selectedEvents.includes(event.id)) || [];
  const pricing =
    selectedEventData.length > 0
      ? calculateEventPricing(selectedEventData, registrationType, groupSize)
      : null;

  // Get currency from selected events
  const currency = selectedEventData[0]?.currency || "EUR";

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Progress indicator */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.title} className="flex items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                index <= currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index + 1}
            </div>
            <div className="ml-2 hidden sm:block">
              <div className="text-sm font-medium">{step.title}</div>
            </div>
            {index < steps.length - 1 && (
              <div className="mx-4 h-px w-8 bg-muted sm:w-16" />
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep].title}</CardTitle>
            </CardHeader>
            <CardContent>
              <FormProvider {...form}>
                <div className="space-y-6">
                  {steps[currentStep].component}

                  {/* Navigation buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-between pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>

                    {currentStep === steps.length - 1 ? (
                      <Button
                        type="button"
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {!user
                              ? "Creating Account & Registration..."
                              : "Saving Registration..."}
                          </>
                        ) : (
                          "Complete Registration"
                        )}
                      </Button>
                    ) : (
                      <Button type="button" onClick={handleNext}>
                        Next
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </FormProvider>
            </CardContent>
          </Card>
        </div>

        {/* Summary sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Registration Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {registrationType === "consultancy"
                      ? "Consultancy"
                      : "Student/Guest"}
                  </Badge>
                  {!user && <Badge variant="secondary">New Account</Badge>}
                </div>
              </div>

              {selectedEvents.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Selected Events</h4>
                  <div className="space-y-2">
                    {selectedEventData.map((event) => (
                      <div key={event.id} className="text-sm">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-muted-foreground">
                          {formatCurrencyWithCode(event.price, event.currency)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {groupSize > 1 && (
                <div>
                  <div className="text-sm">
                    <span className="font-medium">Group Size:</span> {groupSize}{" "}
                    people
                  </div>
                </div>
              )}

              {pricing && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Base Price</span>
                      <span>
                        {formatCurrencyWithCode(
                          pricing.originalAmount,
                          currency
                        )}
                      </span>
                    </div>
                    {pricing.discountAmount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>
                          Discount (
                          {registrationType === "student-guest"
                            ? "Student"
                            : pricing.discountType}
                          )
                        </span>
                        <span>
                          -
                          {formatCurrencyWithCode(
                            pricing.discountAmount,
                            currency
                          )}
                        </span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>
                        {formatCurrencyWithCode(pricing.finalAmount, currency)}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {!user && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    We'll create an account for you and send verification
                    instructions to your email.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
