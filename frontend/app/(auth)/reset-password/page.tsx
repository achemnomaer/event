import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ResetPasswordForm from "./ResetPasswordForm";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Reset Password | ANTGEC",
  description: "Reset your ANTGEC account password",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();

  // Await the searchParams promise
  const params = await searchParams;

  // Check if this is a password reset flow by looking for URL parameters
  const hasResetParams = params.token_hash || params.code;

  // If user is already logged in and not in a password reset flow, redirect to dashboard
  if (data?.session && !hasResetParams) {
    redirect("/dashboard");
  }

  return (
    <Container className="max-w-md py-16">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p className="text-muted-foreground">Enter your new password below</p>
        </div>
        <ResetPasswordForm />
      </div>
    </Container>
  );
}
