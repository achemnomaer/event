import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Container from "@/components/Container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { getServerUser } from "@/lib/supabase/server-auth";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your password",
};

export default async function ForgotPasswordPage() {
  const user = await getServerUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <Container className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address and we&apos;ll send you a link to reset
            your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </Container>
  );
}
