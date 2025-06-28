"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

export default function DashboardContent() {
  const { data: session } = useSession();
  const router = useRouter();

  // For now, we'll show a placeholder since we don't have the registration system connected yet
  const registrations = []; // This would come from your API
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading your registrations...</p>
        </div>
      </div>
    );
  }

  if (!registrations || registrations.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">No registrations yet</h3>
        <p className="text-muted-foreground mb-6">You haven't registered for any events yet.</p>
        <Button onClick={() => router.push("/events")} size="lg">
          Browse Events
        </Button>
      </div>
    );
  }

  // Get user name from session
  const userName = session?.user?.name?.split(" ")[0] || session?.user?.email?.split("@")[0] || "User";

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {userName}! Manage your event registrations and payments.</p>
      </div>

      {/* Placeholder content - this would be replaced with actual registration data */}
      <div className="text-center py-12">
        <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">No registrations yet</h3>
        <p className="text-muted-foreground mb-6">You haven't registered for any events yet.</p>
        <Button onClick={() => router.push("/events")} size="lg">
          Browse Events
        </Button>
      </div>
    </div>
  );
}