"use client";

import type React from "react";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useSubscribeToNewsletterMutation } from "@/store/services/contactApi";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [subscribeToNewsletter, { isLoading }] =
    useSubscribeToNewsletterMutation();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (value) {
      setIsValid(validateEmail(value));
    } else {
      setIsValid(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !validateEmail(email)) {
      setIsValid(false);
      return;
    }

    try {
      const result = await subscribeToNewsletter({ email }).unwrap();
      toast.success(
        result.message || "Successfully subscribed to the newsletter!"
      );
      setEmail("");
    } catch (error: unknown) {
      console.error("Error subscribing to newsletter:", error);
      const errorMessage =
        error &&
        typeof error === "object" &&
        "data" in error &&
        error.data &&
        typeof error.data === "object" &&
        "error" in error.data
          ? String(error.data.error)
          : "An error occurred. Please try again later.";
      toast.error(errorMessage);
    }
  };

  return (
    <section className="w-full py-12">
      <div className="relative overflow-hidden rounded-xl border bg-background p-2">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
        <div className="relative grid gap-8 p-6 md:grid-cols-2 md:p-10 lg:p-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Stay Updated
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Subscribe to our newsletter to receive updates on new events,
                early bird registrations, and educational insights.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-12 rounded-full bg-primary" />
              <div className="h-1 w-6 rounded-full bg-primary/70" />
              <div className="h-1 w-4 rounded-full bg-primary/40" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 md:items-start">
            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-2">
              <div className="grid gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className={`h-12 bg-background/80 backdrop-blur ${!isValid ? "border-destructive" : ""}`}
                  value={email}
                  onChange={handleEmailChange}
                  disabled={isLoading}
                  required
                />
                {!isValid && (
                  <p className="text-sm text-destructive">
                    Please enter a valid email address
                  </p>
                )}
                <Button
                  type="submit"
                  size="lg"
                  className="mt-2 h-12 w-full group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our terms and privacy policy.
              </p>
            </form>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      </div>
    </section>
  );
}
