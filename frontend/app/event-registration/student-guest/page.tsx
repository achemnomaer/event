"use client";

import { MultiStepForm } from "@/components/forms/multi-step-form";

export default function StudentGuestRegistrationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Student/Guest Registration
              </h1>
              <p className="mt-4 text-muted-foreground">
                Complete the form below to register as a student or guest
              </p>
            </div>

            <MultiStepForm registrationType="student-guest" />
          </div>
        </div>
      </main>
    </div>
  );
}
