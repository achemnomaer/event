/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader } from "@/components/ui/loader";
import { Mail, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { resendVerification } from "@/lib/supabase/auth";
import { useAuth } from "@/providers/auth-provider";

export default function VerifyAccountPage() {
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();

  const registrationId = searchParams.get("registrationId");

  useEffect(() => {
    if (!loading && user?.email_confirmed_at) {
      // User is verified, redirect to payment
      if (registrationId) {
        router.push(
          `/event-registration/payment?registrationId=${registrationId}`
        );
      } else {
        router.push("/dashboard");
      }
    }
  }, [user, loading, registrationId, router]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleResendVerification = async () => {
    if (!user?.email) {
      toast.error("No email address found");
      return;
    }

    setIsResending(true);
    try {
      const { error } = await resendVerification(user.email);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Verification email sent! Please check your inbox.");
        setResendCooldown(60); // 60 second cooldown
      }
    } catch (error: any) {
      toast.error("Failed to resend verification email");
    } finally {
      setIsResending(false);
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-[80vh]">
        <Loader variant="overlay" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <div className="container py-12">
            <div className="mx-auto max-w-md">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  No user session found. Please try registering again.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-12">
          <div className="mx-auto max-w-md">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Verify Your Email</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-2">
                  <p className="text-muted-foreground">
                    We've sent a verification email to:
                  </p>
                  <p className="font-medium">{user.email}</p>
                </div>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Your registration has been saved! Please verify your email
                    to proceed with payment.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <p>
                      Please check your email and click the verification link to
                      continue.
                    </p>
                    <p className="mt-2">
                      After verification, you'll be automatically redirected to
                      complete your payment.
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={handleResendVerification}
                    disabled={isResending || resendCooldown > 0}
                  >
                    {isResending ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : resendCooldown > 0 ? (
                      `Resend in ${resendCooldown}s`
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Resend Verification Email
                      </>
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => router.push("/")}
                    className="text-sm"
                  >
                    Return to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
