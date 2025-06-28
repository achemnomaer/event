/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { CheckCircle, Calendar, MapPin, Users, CreditCard } from "lucide-react";
import { toast } from "sonner";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useGetRegistrationByIdQuery } from "@/store/services/registrationApi";
import { useGetAllEventsQuery } from "@/store/services/eventsApi";
import { formatCurrency, formatDate, formatEventDateRange } from "@/lib/utils";
import type { Event } from "@/lib/types/events";

function RegistrationSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registrationId = searchParams.get("registrationId");
  const { data: session } = useSession();

  const { data: registration, isLoading: registrationLoading } =
    useGetRegistrationByIdQuery(registrationId || "", {
      skip: !registrationId,
    });

  const { data: events } = useGetAllEventsQuery();

  useEffect(() => {
    if (!registrationId) {
      toast.error("Registration ID not found");
      router.push("/event-registration");
    }
  }, [registrationId, router]);

  if (registrationLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading registration details...</p>
        </div>
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Registration not found</p>
          <Button onClick={() => router.push("/event-registration")}>
            Start New Registration
          </Button>
        </div>
      </div>
    );
  }

  const getRegisteredEvents = (): Event[] => {
    if (!events || !registration.selected_events) return [];
    return registration.selected_events
      .map((eventId: string) => events.find((event) => event.id === eventId))
      .filter((event): event is Event => Boolean(event));
  };

  const registeredEvents = getRegisteredEvents();

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case "partial":
        return <Badge className="bg-yellow-100 text-yellow-800">Partial</Badge>;
      case "pending":
        return <Badge className="bg-red-100 text-red-800">Pending</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Registration Successful!
            </h1>
            <p className="text-gray-600">
              Thank you for registering. Your registration ID is{" "}
              <span className="font-mono font-semibold">{registrationId}</span>
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Registration Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Registration Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-600 uppercase tracking-wide">
                    Personal Information
                  </h4>
                  <p className="text-lg font-medium">
                    {registration.personal_info?.salutation}{" "}
                    {registration.personal_info?.firstName}{" "}
                    {registration.personal_info?.lastName}
                  </p>
                  <p className="text-gray-600">
                    {registration.personal_info?.email}
                  </p>
                  <p className="text-gray-600">
                    {registration.personal_info?.phoneNumber}
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-sm text-gray-600 uppercase tracking-wide">
                    Registration Type
                  </h4>
                  <Badge variant="outline" className="mt-1">
                    {registration.registration_type === "consultancy"
                      ? "Consultancy"
                      : "Student/Guest"}
                  </Badge>
                </div>

                {registration.organization_info && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold text-sm text-gray-600 uppercase tracking-wide">
                        Organization
                      </h4>
                      <p className="text-gray-900">
                        {registration.organization_info.organizationName ||
                          registration.organization_info.companyName}
                      </p>
                      {registration.organization_info.address && (
                        <p className="text-gray-600">
                          {registration.organization_info.address}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {registration.group_participants &&
                  registration.group_participants.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-semibold text-sm text-gray-600 uppercase tracking-wide">
                          Group Members (
                          {registration.group_participants.length})
                        </h4>
                        <div className="space-y-2 mt-2">
                          {registration.group_participants.map(
                            (participant: any, index: number) => (
                              <p key={index} className="text-sm">
                                {participant.firstName} {participant.lastName} -{" "}
                                {participant.email}
                              </p>
                            )
                          )}
                        </div>
                      </div>
                    </>
                  )}
              </CardContent>
            </Card>

            {/* Payment Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Payment Status:</span>
                  {getPaymentStatusBadge(registration.payment_status)}
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Amount:</span>
                  <span className="text-lg font-bold">
                    {formatCurrency(registration.total_amount)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Paid Amount:</span>
                  <span className="text-lg font-semibold text-green-600">
                    {formatCurrency(registration.paid_amount)}
                  </span>
                </div>

                {registration.remaining_amount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Remaining:</span>
                    <span className="text-lg font-semibold text-orange-600">
                      {formatCurrency(registration.remaining_amount)}
                    </span>
                  </div>
                )}

                {registration.discount_applied && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-green-800">
                        Discount Applied:
                      </span>
                      <span className="font-semibold text-green-600">
                        -{formatCurrency(registration.discount_amount || 0)}
                      </span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      {registration.discount_applied.replace("_", " ")} discount
                    </p>
                  </div>
                )}

                {registration.paid_at && (
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Paid At:</span>
                    <span className="text-gray-600">
                      {formatDate(registration.paid_at)}
                    </span>
                  </div>
                )}

                {registration.payment_intent_id && (
                  <div>
                    <span className="font-medium text-sm text-gray-600">
                      Payment ID:
                    </span>
                    <p className="font-mono text-xs text-gray-500 break-all">
                      {registration.payment_intent_id}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Registered Events */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Registered Events ({registeredEvents.length})
              </CardTitle>
              <CardDescription>Events you have registered for</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {registeredEvents.map((event: Event) => (
                  <div key={event.id} className="border rounded-lg p-4">
                    <h4 className="font-semibold text-lg mb-2">
                      {event.title}
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(event.start_date)} - {formatDate(event.end_date)}</span>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="font-semibold">
                          {formatCurrency(event.price)}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/events/${event.slug}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Button onClick={() => router.push("/dashboard")} size="lg">
              View Dashboard
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/events")}
              size="lg"
            >
              Browse More Events
            </Button>
            {registration.remaining_amount > 0 && (
              <Button
                variant="outline"
                onClick={() =>
                  router.push(
                    `/event-registration/payment?registrationId=${registration.id}&installment=true`
                  )
                }
                size="lg"
              >
                Make Payment
              </Button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function RegistrationSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading registration details...</p>
          </div>
        </div>
      }
    >
      <RegistrationSuccessContent />
    </Suspense>
  );
}
