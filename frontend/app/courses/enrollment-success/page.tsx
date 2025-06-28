import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";

export const metadata = {
  title: "Enrollment Successful | EduConf Courses",
  description: "Your course enrollment has been successfully submitted.",
};

export default function EnrollmentSuccessPage() {
  return (
    <div className="min-h-screen py-16">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <CheckCircle className="h-16 w-16 text-primary" />
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Enrollment Successful!
          </h1>

          <div className="space-y-4 mb-8">
            <p className="text-muted-foreground">
              Thank you for enrolling in our course. Your enrollment has been
              successfully submitted.
            </p>
            <p className="text-muted-foreground">
              Our team will contact you shortly with further instructions and
              payment details. Please check your email for confirmation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/courses">Browse More Courses</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
