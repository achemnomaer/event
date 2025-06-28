/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Building,
  GraduationCap,
  ChevronRight,
  Check,
  Info,
} from "lucide-react";
import { useAuth } from "@/providers/auth-provider";
import { Loader } from "@/components/ui/loader";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function EventRegistration() {
  const [registrationType, setRegistrationType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();

  // Get pre-selected event from URL params
  const preSelectedEvent = searchParams.get("event");

  useEffect(() => {
    if (loading) return; // Still loading
    setIsLoading(false);
  }, [loading]);

  const handleContinue = () => {
    const baseUrl =
      registrationType === "consultancy"
        ? "/event-registration/consultancy"
        : "/event-registration/student-guest";

    // Pass pre-selected event if available
    const url = preSelectedEvent
      ? `${baseUrl}?event=${preSelectedEvent}`
      : baseUrl;

    router.push(url);
  };

  const handleCardClick = (type: string) => {
    setRegistrationType(type);
  };

  if (isLoading || loading) {
    return (
      <div className="relative min-h-[80vh]">
        <Loader variant="overlay" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-12">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Event Registration
              </h1>
              <p className="mt-4 text-muted-foreground">
                Select your registration type to continue
              </p>
            </div>

            {/* Show info for unauthenticated users */}
            {!user && (
              <Alert className="mb-6">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  You're registering as a guest. We'll create an account for you
                  during the registration process, and you'll receive an email
                  to verify and access your account.
                </AlertDescription>
              </Alert>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Registration Type</CardTitle>
                <CardDescription>
                  Please select the option that best describes you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup
                  value={registrationType || ""}
                  onValueChange={setRegistrationType}
                  className="space-y-4"
                >
                  <div
                    className={`flex items-start space-x-4 rounded-md border p-4 cursor-pointer transition-all duration-200 hover:bg-muted/50 hover:shadow-md ${
                      registrationType === "consultancy"
                        ? "ring-2 ring-primary ring-offset-2 bg-primary/5 border-primary/30"
                        : ""
                    }`}
                    onClick={() => handleCardClick("consultancy")}
                  >
                    <RadioGroupItem
                      value="consultancy"
                      id="consultancy"
                      className="mt-1"
                    />
                    <div className="flex flex-1 flex-col">
                      <Label
                        htmlFor="consultancy"
                        className="flex cursor-pointer items-center gap-2 font-medium text-base"
                      >
                        <Building
                          className={`h-5 w-5 ${
                            registrationType === "consultancy"
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                        Education Consultancy
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        For education consultants, agencies, and representatives
                      </p>
                    </div>
                    {registrationType === "consultancy" && (
                      <Check className="h-5 w-5 text-primary mt-1" />
                    )}
                  </div>

                  <div
                    className={`flex items-start space-x-4 rounded-md border p-4 cursor-pointer transition-all duration-200 hover:bg-muted/50 hover:shadow-md ${
                      registrationType === "student-guest"
                        ? "ring-2 ring-primary ring-offset-2 bg-primary/5 border-primary/30"
                        : ""
                    }`}
                    onClick={() => handleCardClick("student-guest")}
                  >
                    <RadioGroupItem
                      value="student-guest"
                      id="student-guest"
                      className="mt-1"
                    />
                    <div className="flex flex-1 flex-col">
                      <Label
                        htmlFor="student-guest"
                        className="flex cursor-pointer items-center gap-2 font-medium text-base"
                      >
                        <GraduationCap
                          className={`h-5 w-5 ${
                            registrationType === "student-guest"
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                        Student or Guest
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        For students, educators, or individual guests
                      </p>
                    </div>
                    {registrationType === "student-guest" && (
                      <Check className="h-5 w-5 text-primary mt-1" />
                    )}
                  </div>
                </RadioGroup>

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleContinue}
                    disabled={!registrationType}
                    className="w-full sm:w-auto min-w-[140px] transition-all duration-200"
                    size="lg"
                  >
                    {registrationType ? "Continue" : "Select to continue"}
                    <ChevronRight className="ml-2 h-4 w-4" />
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
