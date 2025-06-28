"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Settings } from "lucide-react";
import Container from "@/components/Container";
import DashboardContent from "@/components/dashboard/dashboard-content";
import SettingsContent from "@/components/dashboard/settings-content";
import { useAuth } from "@/providers/auth-provider";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { user, loading, refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const searchParams = useSearchParams();

  // Check if we need to refresh auth state after redirect
  useEffect(() => {
    const authRefresh = searchParams.get("auth_refresh");
    if (authRefresh && !user && !loading) {
      refreshUser();
    }
  }, [searchParams, user, loading, refreshUser]);

  if (loading) {
    return (
      <Container className="py-8">
        <div className="space-y-8">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-10 w-full max-w-md" />
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </Container>
    );
  }

  const getUserName = () => {
    if (user?.user_metadata?.first_name) {
      return user.user_metadata.first_name;
    }
    if (user?.email) {
      return user.email.split("@")[0];
    }
    return "User";
  };

  return (
    <Container className="py-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {getUserName()}! Manage your account and
            registrations.
          </p>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <DashboardContent />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <SettingsContent />
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
}
