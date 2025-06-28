/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import Container from "@/components/Container";

export default function ConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleConfirmation = async () => {
      try {
        const supabase = createClient();

        // Get all possible parameters
        const token_hash = searchParams.get("token_hash");
        const type = searchParams.get("type");
        const error = searchParams.get("error");
        const errorCode = searchParams.get("error_code");
        const next = searchParams.get("next") || "/dashboard";

        // Handle token_hash-based verification (traditional email verification)
        if (token_hash && type) {
          console.log("Handling token_hash-based verification");

          const { data, error: verifyError } = await supabase.auth.verifyOtp({
            token_hash,
            type: type as any,
          });

          if (verifyError) {
            console.error("Token verification error:", verifyError);

            // Check if user is already verified despite the error
            const {
              data: { user },
            } = await supabase.auth.getUser();
            if (user && user.email_confirmed_at) {
              setStatus("success");
              setMessage("Email verified successfully! Redirecting...");
              setTimeout(() => {
                router.push(next);
                router.refresh();
              }, 1500);
              return;
            }

            setStatus("error");
            setMessage(
              "Verification failed. Your account may already be verified. Please try signing in."
            );
            return;
          }

          if (data.user) {
            console.log("Token verification successful");
            setStatus("success");
            setMessage("Email verified successfully! Redirecting...");
            setTimeout(() => {
              router.push(next);
              router.refresh();
            }, 1500);
            return;
          }
        }

        // If we have error parameters, handle them
        if (error || errorCode) {
          console.log("Handling error parameters");

          // Still check if user is actually verified
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (user && user.email_confirmed_at) {
            setStatus("success");
            setMessage("Email verified successfully! Redirecting...");
            setTimeout(() => {
              router.push(next);
              router.refresh();
            }, 1500);
            return;
          }

          setStatus("error");
          setMessage(
            "Verification link may have expired, but your account might already be verified. Please try signing in."
          );
          return;
        }

        // If no parameters, check current session
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session && session.user && session.user.email_confirmed_at) {
          setStatus("success");
          setMessage("Email already verified! Redirecting...");
          setTimeout(() => {
            router.push(next);
            router.refresh();
          }, 1500);
          return;
        }

        // No valid parameters found
        setStatus("error");
        setMessage(
          "Invalid verification link. Please try signing in or request a new verification email."
        );
      } catch (error) {
        console.error("Confirmation error:", error);
        setStatus("error");
        setMessage(
          "An unexpected error occurred. Please try signing in or contact support."
        );
      }
    };

    handleConfirmation();
  }, [searchParams, router]);

  return (
    <Container className="py-12">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            {status === "loading" && (
              <div className="bg-blue-100 rounded-full p-3">
                <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
              </div>
            )}
            {status === "success" && (
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            )}
            {status === "error" && (
              <div className="bg-red-100 rounded-full p-3">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            )}
          </div>
          <CardTitle className="text-2xl font-bold">
            {status === "loading" && "Verifying Email..."}
            {status === "success" && "Email Verified!"}
            {status === "error" && "Verification Status"}
          </CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {status === "error" && (
            <div className="space-y-3">
              <Button onClick={() => router.push("/login")} className="w-full">
                Try Signing In
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/verify-email")}
                className="w-full"
              >
                Resend Verification Email
              </Button>
            </div>
          )}
          {status === "success" && (
            <div className="text-sm text-muted-foreground">
              You will be redirected automatically...
            </div>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
