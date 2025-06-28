/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar, Loader2 } from "lucide-react"
import { useGetUserRegistrationsQuery, useDeleteRegistrationMutation } from "@/store/services/registrationApi"
import { useGetAllEventsQuery } from "@/store/services/eventsApi"
import { useAuth } from "@/providers/auth-provider"
import { DashboardStats } from "./dashboard-stats"
import { RegistrationCard } from "./registration-card"

type FilterType = "all" | "completed" | "pending" | "total"

export default function DashboardContent() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const { data: registrations, isLoading } = useGetUserRegistrationsQuery()
  const { data: events } = useGetAllEventsQuery()
  const [deleteRegistration] = useDeleteRegistrationMutation()

  const getRegisteredEvents = (registration: any) => {
    if (!events || !registration.selected_events) return []
    return registration.selected_events
      .map((eventId: string) => events.find((event) => event.id === eventId))
      .filter(Boolean)
  }

  const handleMakePayment = (registration: any, isFullPayment = false) => {
    const amount = isFullPayment ? Math.round((registration.remaining_amount || 0) * 100) : undefined

    const url = amount
      ? `/event-registration/payment?registrationId=${registration.id}&amount=${amount}`
      : `/event-registration/payment?registrationId=${registration.id}`

    router.push(url)
  }

  const handleDeleteRegistration = async (registrationId: string) => {
    await deleteRegistration(registrationId).unwrap()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading your registrations...</p>
        </div>
      </div>
    )
  }

  if (!registrations || registrations.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">No registrations yet</h3>
        <p className="text-muted-foreground mb-6">You haven&apos;t registered for any events yet.</p>
        <Button onClick={() => router.push("/events")} size="lg">
          Browse Events
        </Button>
      </div>
    )
  }

  // Calculate summary statistics
  const totalRegistrations = registrations.length
  const completedPayments = registrations.filter((r) => r.payment_status === "succeeded").length
  const pendingPayments = registrations.filter((r) => r.remaining_amount > 0).length
  const totalSpent = registrations.reduce((sum, r) => sum + (r.paid_amount || 0), 0)

  // Filter registrations based on active filter
  const filteredRegistrations = registrations.filter((registration) => {
    switch (activeFilter) {
      case "completed":
        return registration.payment_status === "succeeded"
      case "pending":
        return registration.remaining_amount > 0
      case "total":
        return true
      default:
        return true
    }
  })

  // Get user name from Supabase user metadata
  const userName =
    user?.user_metadata?.full_name || user?.user_metadata?.first_name || user?.email?.split("@")[0] || "User"

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {userName}! Manage your event registrations and payments.</p>
      </div>

      {/* Dashboard Stats */}
      <DashboardStats
        totalRegistrations={totalRegistrations}
        completedPayments={completedPayments}
        pendingPayments={pendingPayments}
        totalSpent={totalSpent}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Registrations List */}
      <div className="space-y-4 lg:space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl lg:text-2xl font-semibold">Your Registrations ({filteredRegistrations.length})</h2>
        </div>

        {filteredRegistrations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No registrations match the current filter.</p>
            <Button variant="outline" onClick={() => setActiveFilter("all")} className="mt-4">
              Show All Registrations
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRegistrations.map((registration: any) => (
              <RegistrationCard
                key={registration.id}
                registration={registration}
                registeredEvents={getRegisteredEvents(registration)}
                onMakePayment={handleMakePayment}
                onDeleteRegistration={handleDeleteRegistration}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
